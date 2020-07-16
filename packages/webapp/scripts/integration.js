/* 
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>   
 *  This file (integration.js) is part of LiteFarm.
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

'use strict';
// Do this as the first thing so that any code reading it knows the right env..
// TODO: change env to integration (can't do that due to babel-preset-react-app right now)
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
const initialize = require('./initialize');

process.on('unhandledRejection', err => {
  throw err;
});

initialize();
