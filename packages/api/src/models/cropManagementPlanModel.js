/*
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 *  This file (managementPlanModel.js) is part of LiteFarm.
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

const Model = require('objection').Model;


class CropManagementPlanModel {
  static get tableName() {
    return 'crop_management_plan';
  }

  static get idColumn() {
    return 'crop_management_plan_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['location_id', 'management_plan_id', 'planting_type'],
      properties: {
        crop_management_plan_id: { type: 'string' },
        management_plan_id: { type: 'integer' },
        location_id: { type: 'string' },
        planting_type: {
          type: 'string',
          enum: ['BROADCAST', 'CONTAINER', 'BEDS', 'ROWS'],
        },
        notes: { type: 'string' },
      },
      additionalProperties: false,
    };
  }

  static get relationMappings() {
    return {
      broadcast: {
        modelClass: require('./broadcastModel'),
        relation: Model.HasOneRelation,
        join: {
          from: 'crop_management_plan.crop_management_plan_id',
          to: 'broadcast.crop_management_plan_id',
        },
      },
    };
  }
}

module.exports = CropManagementPlanModel;
