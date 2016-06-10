import chai from 'chai';
chai.should();

import product, { requestProducts, receiveProducts, failedProducts } from './product';
const reducer = product;

describe('product reducer', () => {
  it('should set isFetching to true on request product', () => {
    reducer({}, requestProducts()).should.have.property('isFetching', true);
  });

  it('should set isFetching to false on receive product', () => {
    reducer({}, receiveProducts({})).should.have.property('isFetching', false);
  });

  it('should set isFetching to false on failed product', () => {
    reducer({}, failedProducts('error')).should.have.property('isFetching', false);
  });
});
