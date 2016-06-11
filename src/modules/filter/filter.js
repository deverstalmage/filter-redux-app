import { operators } from 'data/operators';

const UPDATE_OPERATOR = 'salsify/filter/UPDATE_OPERATOR';
const UPDATE_PROPERTY_NAME = 'salsify/filter/UPDATE_PROPERTY_NAME';
const UPDATE_PROPERTY_VALUE = 'salsify/filter/UPDATE_PROPERTY_VALUE';
const CLEAR = 'salsify/filter/CLEAR';

const initialState = {
  operator: '',
  propertyType: '',
  propertyValue: '',
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
    case CLEAR:
      return {
        ...state,
        operator: null,
        propertyName: null,
        propertyValue: null,
      };

    default:
      return state;
  }
};

export function updateOperator(operator) {
  return {
    type: UPDATE_OPERATOR,
    operator,
  };
}

export function updateProperyName(propertyName) {
  return {
    type: UPDATE_PROPERTY_NAME,
    propertyName,
  };
}

export function updatePropertyValue(propertyValue) {
  return {
    type: UPDATE_PROPERTY_VALUE,
    propertyValue,
  };
}

export function clearFilter() {
  return {
    type: CLEAR,
  };
}