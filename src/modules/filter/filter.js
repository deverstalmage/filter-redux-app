const REQUEST_PROPERTIES = 'salsify/filter/REQUEST_PROPERTIES';
const RECEIVE_PROPERTIES = 'salsify/filter/RECEIVE_PROPERTIES';
const FAILED_PROPERTIES = 'salsify/filter/FAILED_PROPERTIES';

const REQUEST_OPERATORS = 'salsify/filter/REQUEST_OPERATORS';
const RECEIVE_OPERATORS = 'salsify/filter/RECEIVE_OPERATORS';
const FAILED_OPERATORS = 'salsify/filter/FAILED_OPERATORS';

const UPDATE_FILTER = 'salsify/filter/UPDATE_FILTER';

// import data from 'services/data';

const propertyTypeOperatorMap = {
  string: {
    equals: true,

  }
};

const initialState = {

};

export default function filter(state = initialState, action) {
  switch(action.type) {
    case REQUEST_PROPERTIES:
      return {
        ...state,
        isFetchingProperties: true,
      };
    case RECEIVE_PROPERTIES:
      return {
        ...state,
        isFetchingProperties: false,
        properties: [...action.properties],
      };
    case FAILED_PROPERTIES:
      return {
        ...state,
        isFetchingProperties: false,
        properties: [],
        error: action.error,
      };
    case REQUEST_OPERATORS:
      return {
        ...state,
        isFetchingOperators: true,
      };
    case RECEIVE_OPERATORS:
      const operatorIdMap = action.operators.reduce((prev, curr) => {
        prev[curr.id] = curr.text;
        return prev;
      }, {});
      return {
        ...state,
        isFetchingOperators: false,
        operators: operatorIdMap,
      };
    default:
      return state;
  }
};

// export function
export function requestProducts() {
  return {
    type: REQUEST_PROPERTIES,
  };
}

export function receiveProducts(properties) {
  return {
    type: RECEIVE_PROPERTIES,
    properties,
  };
}

export function fetchProductsFailed(error) {
  return {
    type: FAILED_PROPERTIES,
    error,
  };
}

export function fetchProducts() {

}