import { operators } from 'data/operators';
import { mapToIds } from 'lib/utils';
import { propertyTypeOperatorMap } from 'modules/product/product';

const UPDATE_OPERATOR = 'filterApp/filter/UPDATE_OPERATOR';
const UPDATE_PROPERTY_NAME = 'filterApp/filter/UPDATE_PROPERTY_NAME';
const UPDATE_PROPERTY_VALUE = 'filterApp/filter/UPDATE_PROPERTY_VALUE';
const CLEAR = 'filterApp/filter/CLEAR';

const initialState = {
  operator: '',
  propertyType: '',
  propertyValue: '',

  operators,
  allOperators: [...operators],
  allOperatorsMap: mapToIds(operators, 'id'),
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
        operators: state.allOperators.filter(op => propertyTypeOperatorMap[action.propertyType][op.id]),
      };
    case UPDATE_PROPERTY_VALUE:
      return {
        ...state,
        propertyValue: action.propertyValue,
      };
    case CLEAR:
      return {
        ...state,
        operator: '',
        propertyName: '',
        propertyValue: '',
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

export function updatePropertyName(propertyName, propertyType) {
  return {
    type: UPDATE_PROPERTY_NAME,
    propertyName,
    propertyType,
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