import * as dataService from 'services/data';

import { fetchProperties } from 'modules/filter/filter';

const REQUEST_PRODUCTS = 'salsify/product/REQUEST_PRODUCTS';
const RECEIVE_PRODUCTS = 'salsify/product/RECEIVE_PRODUCTS';
const FAILED_PRODUCTS = 'salsify/product/FAILED_PRODUCTS';

// import data from 'services/data';

const initialState = {
  products: [],
  productMap: {},
};

export default function product(state = initialState, action) {
  switch(action.type) {
    case REQUEST_PRODUCTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
        // productMap: action.products.map(product => {
        //   product.properties = product.properties.reduce((prev, curr) => prev[curr.property] = )
        // }).reduce((prev, curr) => {
        //   prev[curr.id] = curr;
        //   return prev;
        // }, {}),
        isFetching: false,
      };
    case FAILED_PRODUCTS:
      return {
        ...state,
        products: [],
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

// export function
export function requestProducts() {
  return {
    type: REQUEST_PRODUCTS,
  };
}

export function receiveProducts(products) {
  return {
    type: RECEIVE_PRODUCTS,
    products,
  };
}

export function failedProducts(error) {
  return {
    type: FAILED_PRODUCTS,
    error,
  };
}

export function fetchProducts() {
  return (dispatch, getState) => {
    dispatch(requestProducts());

    // Using async actions here to simulate a request across the network.
    // Coordinating loading properties and products, skipping properties if
    // already loaded.
    const loadProducts = dataService.loadProducts();
    let loadProperties = fetchProperties();
    if (getState().filter.properties.length > 0) loadProperties = Promise.resolve();

    return Promise.all([loadProperties(dispatch, getState), loadProducts])
      .then(results => {
        const properties = getState().filter.properties;
        const products = results[1];
        dispatch(receiveProducts(products));
      })
      .catch(error => {
        console.log('Error', error);
        dispatch(failedProducts(error))
      });
  };
}