import * as dataService from 'services/data';

const REQUEST_PRODUCTS = 'salsify/product/REQUEST_PRODUCTS';
const RECEIVE_PRODUCTS = 'salsify/product/RECEIVE_PRODUCTS';
const FAILED_PRODUCTS = 'salsify/product/FAILED_PRODUCTS';
const FILTER_PRODUCTS = 'salsify/product/FILTER_PRODUCTS';

const REQUEST_PROPERTIES = 'salsify/product/REQUEST_PROPERTIES';
const RECEIVE_PROPERTIES = 'salsify/product/RECEIVE_PROPERTIES';
const FAILED_PROPERTIES = 'salsify/product/FAILED_PROPERTIES';

const equals = (a, b) => a === b;
const greater_than = (a, b) => a > b;
const less_than = (a, b) => a < b;
const any = val => val || val === 0;
const none = val => !val;
const isIn = (val, enumerated) => enumerated.indexOf(val) > -1;
const contains = (b, a) => b.toString().includes(a.toString());

const propertyTypeOperatorMap = {
  string: {
    equals,
    any,
    none,
    in: isIn,
    contains,
  },
  number: {
    equals,
    greater_than,
    less_than,
    any,
    none,
    in: isIn,
    contains,
  },
  enumerated: {
    equals,
    any,
    none,
    in: isIn,
  }
};

const initialState = {
  products: [],
  allProductMap: {},
  allProducts: [],

  properties: [],
  propertiesMap: {},
};

export function filterProductList(products, name, operator, value) {
  if (operator === 'in') value = value.split(',').map(val => val.trim());
  return products.map(product => {
    const filterFunc = propertyTypeOperatorMap[product.properties[name].type];
    return filterFunc(value, product.properties[name].value);
  });
}

export default function product(state = initialState, action) {
  switch(action.type) {
    case REQUEST_PRODUCTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_PRODUCTS:
      const products = action.products;
      const allProducts = [...action.products]; // neat way to copy an array
      const allProductsMap = products.map(product => {
        return product.properties = product.properties.reduce((prev, curr) => {
          prev[curr.property_id] = Object.assign(curr, { name: state.propertyMap[curr.property_id].name });
          return prev;
        }, {});
      });

      return {
        ...state,
        products,
        allProducts,
        allProductsMap,
        isFetching: false,
      };
    case FAILED_PRODUCTS:
      return {
        ...state,
        products: [],
        isFetching: false,
        error: action.error,
      };

    case FILTER_PRODUCTS:
      return {
        ...state,
        products: filterProductList(state.allProducts, action.propertyName, action.operator, action.propertyValue),
      };

    case REQUEST_PROPERTIES:
      return {
        ...state,
        isFetchingProperties: true,
      };
    case RECEIVE_PROPERTIES:
      const properties = [...action.properties];
      const propertyMap = properties.reduce((prev, curr) => {
        prev[curr.id] = curr;
        return prev;
      }, {});

      return {
        ...state,
        isFetchingProperties: false,
        properties,
        propertyMap,
      };
    case FAILED_PROPERTIES:
      return {
        ...state,
        isFetchingProperties: false,
        properties: [],
        error: action.error,
      };

    default:
      return state;
  }
};

// exporting the following three functions so we can test them
// that is, don't call them in a component, please!
export function _requestProducts() {
  return {
    type: REQUEST_PRODUCTS,
  };
}

export function _receiveProducts(products) {
  return {
    type: RECEIVE_PRODUCTS,
    products,
  };
}

export function _failedProducts(error) {
  return {
    type: FAILED_PRODUCTS,
    error,
  };
}

export function fetchProducts() {
  return (dispatch, getState) => {
    dispatch(_requestProperties());
    dispatch(_requestProducts());

    // Using async actions here to simulate a request across the network.
    // Coordinating loading properties and products, skipping properties if
    // already loaded.
    const loadProducts = dataService.loadProducts();

    return Promise.all([_loadPropertiesPromise(getState()), loadProducts])
      .then(results => {
        const properties = results[0];
        const products = results[1];
        dispatch(_receiveProperties(properties));
        dispatch(_receiveProducts(products));
      })
      .catch(error => {
        console.log('Error', error);
        if (error.message.includes('properties')) dispatch(_failedProperties(error))
        if (error.message.includes('products')) dispatch(_failedProducts(error));
      });
  };
}

export const _loadPropertiesPromise = state => (state.product.properties.length > 0) ? Promise.resolve(state.filter.properties) : dataService.loadProperties();

export function _requestProperties() {
  return {
    type: REQUEST_PROPERTIES,
  };
}

export function _receiveProperties(properties) {
  return {
    type: RECEIVE_PROPERTIES,
    properties,
  };
}

export function _failedProperties(error) {
  return {
    type: FAILED_PROPERTIES,
    error,
  };
}

export function fetchProperties() {
  return (dispatch, getState) => {
    dispatch(_requestProperties());
    return _loadPropertiesPromise(getState())
      .then(properties => dispatch(_receiveProperties(properties)))
      .catch(error => {
        console.log('Error', error);
        dispatch(_failedProperties(error));
      });
  };
}