const REQUEST_PRODUCTS = 'salsify/product/REQUEST_PRODUCTS';
const RECEIVE_PRODUCTS = 'salsify/product/RECEIVE_PRODUCTS';
const FAILED_PRODUCTS = 'salsify/product/FAILED_PRODUCTS';

// import data from 'services/data';

const initialState = {
  products: [],
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

}