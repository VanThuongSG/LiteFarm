require('dotenv').config();

export const DEFAULT_CENTER = {
  lat: 49.24966,
  lng: -123.237421,
};
export const DEFAULT_ZOOM = 15;
export const GMAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
export const ENVIRONMENT = process.env.NODE_ENV;

export const isArea = (type) => {
  return [
    'barn',
    'ceremonial',
    'farmBound',
    'field',
    'greenhouse',
    'groundwater',
    'natural',
    'residence',
  ].includes(type);
};

export const isLine = (type) => {
  return ['creek', 'fence'].includes(type);
};

export const isPoint = (type) => {
  return ['gate', 'waterValve'].includes(type);
};

export const locationEnum = {
  field: 'field',
  barn: 'barn',
  ceremonial_area: 'ceremonial_area',
  greenhouse: 'greenhouse',
  ground_water: 'ground_water',
  natural_area: 'natural_area',
  buffer_zone: 'buffer_zone',
  creek: 'creek',
  fence: 'fence',
  gate: 'gate',
  water_valve: 'water_valve',
  farmBound: 'farmBound',
};
