import chai from 'chai';
chai.should();

import product, { requestProducts, receiveProducts, failedProducts } from './product';
const reducer = product;

describe('product reducer', () => {

  describe('request products', () => {
    it('should set isFetching to true', () => {
      reducer({}, requestProducts()).should.have.property('isFetching', true);
    });
  });

  describe('receive products', () => {
    it('should set isFetching to false', () => {
      reducer({}, receiveProducts([])).should.have.property('isFetching', false);
    });

    it('should have an array of products on receive product', () => {
      reducer({}, receiveProducts([1, 2, 3])).should.have.property('products', [1, 2, 3]);
    });
  });

  describe('failed product', () => {
    it('should set isFetching to false', () => {
      reducer({}, failedProducts('error')).should.have.property('isFetching', false);
    });
  });

});
