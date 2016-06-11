import * as dataService from '../../services/data';
import { mapToIds } from '../../lib/utils';

const REQUEST_PRODUCTS = 'salsify/product/REQUEST_PRODUCTS';
const RECEIVE_PRODUCTS = 'salsify/product/RECEIVE_PRODUCTS';
const FAILED_PRODUCTS = 'salsify/product/FAILED_PRODUCTS';
const FILTER_PRODUCTS = 'salsify/product/FILTER_PRODUCTS';

const REQUEST_PROPERTIES = 'salsify/product/REQUEST_PROPERTIES';
const RECEIVE_PROPERTIES = 'salsify/product/RECEIVE_PROPERTIES';
const FAILED_PROPERTIES = 'salsify/product/FAILED_PROPERTIES';

// exporting for testing purposes
export const equals = (a, b) => a === b;
export const greater_than = (a, b) => a > b;
export const less_than = (a, b) => a < b;
export const any = val => val || val === 0;
export const none = val => typeof val === 'undefined';
export const isIn = (val, enumerated) => enumerated.indexOf(val) > -1;
export const contains = (b, a) => b.toString().includes(a.toString());

export const propertyTypeOperatorMap = {
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
  allProducts: [],

  properties: [],
  propertiesMap: {},
};

export function filterProductList(products, name, operator, value, type, propertyTypeOperatorMap) {
  if (!name && !operator && !value) return products;
  if (operator === 'in') value = value.split(',').map(val => val.trim());
  const filterFunc = propertyTypeOperatorMap[type][operator];

  return products.filter(product => {
    let productProperty = product.properties[name];
    if (!productProperty) productProperty = {};
    return filterFunc(productProperty.value, value);
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
      const allProducts = [...action.products]; // neat way to copy an array
      const products = action.products.map(p => {
        const product = {...p};
        product.properties = product.properties.reduce((prev, curr) => {
          prev[curr.property_id] = Object.assign(curr, { name: state.propertiesMap[curr.property_id].name });
          return prev;
        }, {});
        return product;
      });

      return {
        ...state,
        products,
        allProducts,
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
      const { propertyName, operator, propertyValue, updateWithoutAllFields } = action;
      const update = (propertyName && operator && propertyValue) || updateWithoutAllFields || (!propertyName && !operator && !propertyValue);
      const property = state.propertiesMap[propertyName] || {};
      return {
        ...state,
        products: update ? filterProductList(state.allProducts, propertyName, operator, propertyValue, property.type, propertyTypeOperatorMap) : state.allProducts,
      };

    case REQUEST_PROPERTIES:
      return {
        ...state,
        isFetchingProperties: true,
      };
    case RECEIVE_PROPERTIES:
      const properties = [...action.properties];
      const propertiesMap = mapToIds(properties, 'id');
      return {
        ...state,
        isFetchingProperties: false,
        properties,
        propertiesMap,
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
        throw new Error(error.message);
        if (error.message.includes('properties')) dispatch(_failedProperties(error))
        if (error.message.includes('products')) dispatch(_failedProducts(error));
      });
  };
}

export function filterProducts(propertyName, operator, propertyValue, updateWithoutAllFields) {
  return {
    type: FILTER_PRODUCTS,
    propertyName,
    operator,
    propertyValue,
    updateWithoutAllFields,
  };
}

export const _loadPropertiesPromise = state => (state.product.properties.length > 0) ? Promise.resolve(state.product.properties) : dataService.loadProperties();

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