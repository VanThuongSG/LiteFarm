/* 
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>   
 *  This file (reducer.js) is part of LiteFarm.
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

import {
  SET_CROPS_IN_STATE,
  SET_EXPIRED_CROPS_IN_STATE,
} from './constants';

const initialState = {
  crops: null,
  expiredCrops: null,
  selectedField: null,
};

function fieldReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CROPS_IN_STATE:
      return Object.assign({}, state, {
        crops: action.crops,
      });
    case SET_EXPIRED_CROPS_IN_STATE:
      return Object.assign({}, state, {
        expiredCrops: action.expiredCrops
      });
    default:
      return state
  }
}

export default fieldReducer;
