import { operators } from 'data/operators';

const UPDATE_OPERATOR = 'salsify/filter/UPDATE_OPERATOR';
const UPDATE_PROPERTY_NAME = 'salsify/filter/UPDATE_PROPERTY_NAME';
const UPDATE_PROPERTY_VALUE = 'salsify/filter/UPDATE_PROPERTY_VALUE';

const initialState = {
  operator: null,
  propertyType: null,
  propertyValue: null,
};

export default function filter(state = initialState, action) {
  switch(action.type) {
    case UPDATE_OPERATOR:
      return {
        ...state,
        operator: action.operator,
      };

    case UPDATE_PROPERTY_NAME:
      return {
        ...state,
        propertyName: action.propertyName,
      };
    case UPDATE_PROPERTY_VALUE:
      return {
        ...state,
        propertyValue: action.propertyValue,
      };

    default:
      return state;
  }
};

export function setFilter(name, operator, value) {
  return {
    
  };
}