/*
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 *  This file (fertilizerController.js) is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */

const organicCertifierSurveyModel = require('../models/organicCertifierSurveyModel');
const certificationModel = require('../models/certificationModel');
const certifierModel = require('../models/certifierModel');
const userModel = require('../models/userModel');
const farmModel = require('../models/farmModel');
const documentModel = require('../models/documentModel');
const knex = require('./../util/knex');
const Queue = require('bull');
const redisConf = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
}

const organicCertifierSurveyController = {
  getCertificationSurveyByFarmId() {
    return async (req, res) => {
      try {
        const farm_id = req.params.farm_id;
        const result = await organicCertifierSurveyModel.query().whereNotDeleted().where({ farm_id })
          .first();
        if (!result) {
          res.sendStatus(404);
        } else {
          res.status(200).send(result);
        }
      } catch (error) {
        //handle more exceptions
        console.error(error);
        res.status(400).json({
          error,
        });
      }
    };
  },

  getAllSupportedCertifications() {
    return async (req, res) => {
      try {
        const result = await certificationModel.query().select('*');
        if (!result) {
          res.sendStatus(404);
        } else {
          res.status(200).send(result);
        }
      } catch (error) {
        //handle more exceptions
        console.error(error);
        res.status(400).json({
          error,
        });
      }
    };
  },

  getAllSupportedCertifiers() {
    return async (req, res) => {
      try {
        const { farm_id, certification_id } = req.params;
        const result = await certifierModel.query().select('certifiers.certifier_id', 'certifiers.certification_id', 'certifiers.certifier_name', 'certifiers.certifier_acronym', 'certifier_country.country_id', 'certifier_country.certifier_country_id').from('certifiers').join('certifier_country', 'certifiers.certifier_id', '=', 'certifier_country.certifier_id').join('farm', 'farm.country_id', '=', 'certifier_country.country_id').where('farm.farm_id', farm_id).andWhere('certifiers.certification_id', certification_id);
        if (!result) {
          res.sendStatus(404);
        } else {
          res.status(200).send(result);
        }
      } catch (error) {
        //handle more exceptions
        console.error(error);
        res.status(400).json({
          error,
        });
      }
    };
  },

  addOrganicCertifierSurvey() {
    return async (req, res) => {
      try {
        const user_id = req.user.user_id;
        const result = await organicCertifierSurveyModel.query().context({ user_id }).insert(req.body).returning('*');
        res.status(201).send(result);
      } catch (error) {
        res.status(400).json({
          error,
        });
      }
    };
  },

  patchCertifiers() {
    return async (req, res) => {
      const survey_id = req.params.survey_id;
      try {
        const user_id = req.user.user_id;
        const certifiers = req.body.certifiers || [];
        const result = await organicCertifierSurveyModel.query().context({ user_id }).findById(survey_id).patch({ certifiers });
        res.sendStatus(200);
      } catch (error) {
        res.status(400).json({
          error,
        });
      }
    };
  },

  patchRequestedCertifiers() {
    return async (req, res) => {
      const survey_id = req.params.survey_id;
      try {
        const user_id = req.user.user_id;
        const requested_certifier = req.body.data.requested_certifier || null;
        const certifier_id = req.body.data.certifier_id || null;
        const result = await organicCertifierSurveyModel.query().context({ user_id }).findById(survey_id).patch({
          requested_certifier,
          certifier_id,
        });
        res.sendStatus(200);
      } catch (error) {
        console.log(error);
        res.status(400).json({
          error,
        });
      }
    };
  },

  patchRequestedCertification() {
    return async (req, res) => {
      const survey_id = req.params.survey_id;
      try {
        const user_id = req.user.user_id;
        const requested_certification = req.body.data.requested_certification || null;
        const certification_id = req.body.data.certification_id || null;
        const result = await organicCertifierSurveyModel.query().context({ user_id }).findById(survey_id).patch({
          certification_id,
          requested_certification,
        });

        res.sendStatus(200);
      } catch (error) {
        console.log(error);
        res.status(400).json({
          error,
        });
      }
    };
  },


  patchInterested() {
    return async (req, res) => {
      const survey_id = req.params.survey_id;
      try {
        const user_id = req.user.user_id;
        const interested = req.body.interested;
        const result = await organicCertifierSurveyModel.query().context({ user_id }).findById(survey_id).patch({ interested });
        res.sendStatus(200);
      } catch (error) {
        res.status(400).json({
          error,
        });
      }
    };
  },

  triggerExport() {
    return async (req, res) => {
      const { farm_id, from_date, to_date, email } = req.body;
      const invalid = [farm_id, from_date, to_date, email].some(property => !property)
      if(invalid) {
        return res.status(400).json({
          message: 'Bad request. Missing properties',
        })
      }
      const documents = await documentModel.query().withGraphJoined('files').whereBetween('valid_until', [from_date, to_date]).orWhere({ no_expiration: true }).andWhere({ farm_id });
      const user_id = req.user.user_id;
      const files = documents.map(({ files }) => files.map(({ url, file_name }) => ({ url, file_name }))).reduce((a, b) => a.concat(b), []);
      const records = await knex.raw(`SELECT cp.crop_variety_name, cp.supplier, cp.organic, cp.searched, cp.treated, 
            CASE cp.treated WHEN 'NOT_SURE' then 'NO' ELSE cp.treated END AS treated_doc,
            cp.genetically_engineered
            FROM management_plan mp JOIN crop_variety cp ON mp.crop_variety_id = cp.crop_variety_id JOIN farm f ON cp.farm_id = f.farm_id
            WHERE mp.seed_date < ?::date 
            AND (mp.completed_date IS NULL OR mp.completed_date > ?::date)
            AND (mp.abandoned_date IS NULL OR mp.abandoned_date > ?::date)
            AND cp.organic IS NOT NULL AND cp.farm_id  = ?`, [to_date, from_date, from_date, farm_id]);
      const { first_name } = await userModel.query().where({ user_id }).first();
      const { farm_name } = await farmModel.query().where({ farm_id }).first();
      const body = { records: records.rows,
        files, farm_id, email, first_name, farm_name,
        from_date, to_date, submission: '60e455b2fdef070001d06b6c' };
      res.status(200).json({ message: 'Processing' });
      const retrieveQueue = new Queue('retrieve', redisConf);
      retrieveQueue.add(body, { removeOnComplete: true })
    }
  },

  delOrganicCertifierSurvey() {
    return async (req, res) => {
      const survey_id = req.params.survey_id;
      try {
        const user_id = req.user.user_id;
        await organicCertifierSurveyModel.query().context({ user_id }).findById(survey_id).delete();
        res.sendStatus(200);
      } catch (error) {
        console.error(error);
        res.status(400).json({
          error,
        });
      }
    };
  },

};

module.exports = organicCertifierSurveyController;
