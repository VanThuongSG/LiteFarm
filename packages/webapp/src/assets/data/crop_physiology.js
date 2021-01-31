/*
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 *  This file (crop_physiology.js) is part of LiteFarm.
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

export const crop_physiology_data = {
  Berries: {
    initial_kc: 0.4,
    mid_kc: 0.85,
    end_kc: 0.75,
    max_rooting_depth: 0.25,
    depletion_fraction: 0.2,
    max_height: 0.2,
  },
  Cereals: {
    initial_kc: 0.443333333,
    mid_kc: 1.073333333,
    end_kc: 0.433333333,
    max_rooting_depth: 1.303333333,
    depletion_fraction: 0.5072,
    max_height: 1.253333333,
  },
  'Citrus fruits': {
    initial_kc: 0.3,
    mid_kc: 0.85,
    end_kc: 0.45,
    max_rooting_depth: 1.5,
    depletion_fraction: 0.35,
    max_height: 2,
  },
  'Fibre crops': {
    initial_kc: 0.35,
    mid_kc: 0.95,
    end_kc: 0.483333333,
    max_rooting_depth: 1.116666667,
    depletion_fraction: 0.65,
    max_height: 1.333333333,
  },
  'Fruit-bearing vegetables': {
    initial_kc: 0.54,
    mid_kc: 1.0004,
    end_kc: 0.75,
    max_rooting_depth: 1.13,
    depletion_fraction: 0.42,
    max_height: 0.4,
  },
  Grapes: {
    initial_kc: 0.3,
    mid_kc: 0.85,
    end_kc: 0.45,
    max_rooting_depth: 1.5,
    depletion_fraction: 0.35,
    max_height: 2,
  },
  'High starch Root/tuber crops': {
    initial_kc: 0.433333333,
    mid_kc: 1.034333333,
    end_kc: 0.602666667,
    max_rooting_depth: 0.583333333,
    depletion_fraction: 0.36,
    max_height: 0.733333333,
  },
  'Leafy or stem vegetables': {
    initial_kc: 0.683333333,
    mid_kc: 1.020466667,
    end_kc: 0.913333333,
    max_rooting_depth: 0.76,
    depletion_fraction: 0.393333333,
    max_height: 1.133333333,
  },
  Legumes: {
    initial_kc: 0.4,
    mid_kc: 1.05,
    end_kc: 0.325,
    max_rooting_depth: 0.75,
    depletion_fraction: 0.5,
    max_height: 0.45,
  },
  Nuts: {
    initial_kc: 0.433333333,
    mid_kc: 1.033333333,
    end_kc: 0.584533333,
    max_rooting_depth: 1.6,
    depletion_fraction: 0.433333333,
    max_height: 4.5,
  },
  'Permanent oilseed crops': {
    initial_kc: 0.65,
    mid_kc: 0.7,
    end_kc: 0.7,
    max_rooting_depth: 1.45,
    depletion_fraction: 0.65,
    max_height: 4,
  },
  'Pome fruits and stone fruits': {
    initial_kc: 0.55,
    mid_kc: 0.7625,
    end_kc: 0.58885,
    max_rooting_depth: 1.2375,
    depletion_fraction: 0.5,
    max_height: 2.7,
  },
  'Root, bulb, or tuberous vegetables': {
    initial_kc: 0.725,
    mid_kc: 1.016666667,
    end_kc: 0.866666667,
    max_rooting_depth: 0.525,
    depletion_fraction: 0.308333333,
    max_height: 0.383333333,
  },
  Rubber: {
    initial_kc: 0.95,
    mid_kc: 1,
    end_kc: 1,
    max_rooting_depth: 1.25,
    depletion_fraction: 0.4,
    max_height: 10,
  },
  'Sugar crops (other)': {
    initial_kc: 0.4,
    mid_kc: 1.25,
    end_kc: 0.75,
    max_rooting_depth: 1.6,
    depletion_fraction: 0.65,
    max_height: 3,
  },
  'Temporary oilseed crops': {
    initial_kc: 0.37,
    mid_kc: 1.14,
    end_kc: 0.37,
    max_rooting_depth: 1.19,
    depletion_fraction: 0.56,
    max_height: 0.74,
  },
  'Temporary spice crops': {
    initial_kc: 0.75,
    mid_kc: 1.04,
    end_kc: 0.99,
    max_rooting_depth: 0.99,
    depletion_fraction: 0.4,
    max_height: 0.7,
  },
  'Tropical and subtropical fruits': {
    initial_kc: 0.62,
    mid_kc: 0.85,
    end_kc: 0.78,
    max_rooting_depth: 0.97,
    depletion_fraction: 0.5,
    max_height: 3.12,
  },
  'Grasses and other fodder crops': {
    initial_kc: 0.5,
    mid_kc: 0.9625,
    end_kc: 0.6125,
    max_rooting_depth: 1.15,
    depletion_fraction: 0.5875,
    max_height: 3.5,
  },
  'Mushrooms and truffles': {
    initial_kc: 0.506666667,
    mid_kc: 0.863333333,
    end_kc: 0.643933333,
    max_rooting_depth: 1.19,
    depletion_fraction: 0.446666667,
    max_height: 2.94,
  },
  'Other crops': {
    initial_kc: 0.5,
    mid_kc: 0.9625,
    end_kc: 0.6125,
    max_rooting_depth: 1.15,
    depletion_fraction: 0.5875,
    max_height: 3.5,
  },
  'Other fruits': {
    initial_kc: 0.506666667,
    mid_kc: 0.863333333,
    end_kc: 0.643933333,
    max_rooting_depth: 1.19,
    depletion_fraction: 0.446666667,
    max_height: 2.94,
  },
  'Permanent spice crops': {
    initial_kc: 0.75,
    mid_kc: 1.04,
    end_kc: 0.99,
    max_rooting_depth: 0.99,
    depletion_fraction: 0.4,
    max_height: 2.54,
  },
  'Sugar crops (root)': {
    initial_kc: 0.4,
    mid_kc: 1.25,
    end_kc: 0.75,
    max_rooting_depth: 1.6,
    depletion_fraction: 0.65,
    max_height: 3,
  },
  Tobacco: {
    initial_kc: 0.5,
    mid_kc: 0.9625,
    end_kc: 0.6125,
    max_rooting_depth: 1.15,
    depletion_fraction: 0.5875,
    max_height: 3.5,
  },
};
