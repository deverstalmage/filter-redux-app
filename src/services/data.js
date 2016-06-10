import products from 'data/products';
import properties from 'data/properties';
import operators from 'data/operators';

export function loadProducts() {
  return new Promise((resolve, reject) => resolve(products));
}
