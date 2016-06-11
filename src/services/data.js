import { products } from '../../data/products';
import { properties } from '../../data/properties';
import { operators } from '../../data/operators';

/* let's pretend this makes a real HTTP request */
export function loadProducts() {
  return new Promise((resolve, reject) => resolve(products));
}

export function loadProperties() {
  return new Promise((resolve, reject) => resolve(properties));
}
