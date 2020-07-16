/* 
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>   
 *  This file (diseaseController.js) is part of LiteFarm.
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

const baseController = require('../controllers/baseController');
const DiseaseModel = require('../models/diseaseModel');
const { transaction, Model } = require('objection');

class diseaseController extends baseController {
  constructor() {
    super();
  }

  static getDisease() {
    return async (req, res) => {
      try {
        const farm_id = req.params.farm_id;
        const rows = await diseaseController.get(farm_id);
        res.status(200).send(rows);
      }
      catch (error) {
        //handle more exceptions
        res.status(400).json({
          error,
        });
      }
    }
  }
  static addDisease(){
    return async (req, res) => {
      const trx = await transaction.start(Model.knex());
      try {
        const result = await baseController.postWithResponse(DiseaseModel, req.body, trx);
        await trx.commit();
        res.status(201).send(result);
      } catch (error) {
        //handle more exceptions
        await trx.rollback();
        res.status(400).json({
          error,
        });
      }
    };
  }

  static async get(farm_id){
    //return await super.get(FertilizerModel);
    return await DiseaseModel.query().where('farm_id', null).orWhere('farm_id', farm_id);
  }
}

module.exports = diseaseController;
