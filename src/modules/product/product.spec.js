import chai from 'chai';
chai.should();

import product, {
  _requestProducts,
  _receiveProducts,
  _failedProducts,
  equals,
  greater_than,
  less_than,
  any,
  none,
  isIn,
  contains,
  filterProductList,
  propertyTypeOperatorMap,
} from './product';
const reducer = product;

describe('product reducer', () => {
  const initialState = {
    products: [],
    allProductMap: {},
    allProducts: [],
    properties: [{ id: 1, name: 'foo' }, { id: 2, name: 'baz' }],
    propertiesMap: {
      1: { id: 1, value: 'bar', name: 'foo' },
      2: { id: 2, value: 'bat', name: 'baz' },
    },
  };

  const products = [
    {
      id: 1,
      properties: [
        { property_id: 1, value: 'bar' },
        { property_id: 2, value: 'bat' },
      ],
    }, {
      id: 2,
      properties: [
        { property_id: 1, value: 'blah' },
        { property_id: 2, value: 'blurgh' },
      ],
    },
  ];

  describe('request products', () => {
    it('should set isFetching to true', () => {
      reducer({}, _requestProducts()).should.have.property('isFetching', true);
    });
  });

  describe('receive products', () => {

    it('should set isFetching to false', () => {
      reducer(initialState, _receiveProducts(products)).should.have.property('isFetching', false);
    });

    it('should have an array of products', () => {
      reducer(initialState, _receiveProducts(products)).should.have.deep.property('products[0].id', 1);
      reducer(initialState, _receiveProducts(products)).should.have.deep.property('products[1].id', 2);
    });

    it('should map property arrays to a property map', () => {
      reducer(initialState, _receiveProducts(products)).should.have.deep.property('products[0].properties[1].name', 'foo');
      reducer(initialState, _receiveProducts(products)).should.have.deep.property('products[1].properties[2].name', 'baz');
    });
  });

  describe('failed product', () => {
    it('should set isFetching to false', () => {
      reducer({}, _failedProducts('error')).should.have.property('isFetching', false);
    });
  });

  describe('filterProductList', () => {
    it('should filter products by properties', () => {
      const results = filterProductList(products, 0, 'equals', 'bar', 'string', propertyTypeOperatorMap);
      results.length.should.equal(1);
      results[0].should.have.property('id', 1);
    });

    it('should handle empty product array', () => {
      filterProductList([], 0, 'equals', 'bar', 'string', propertyTypeOperatorMap).length.should.equal(0);
    });
  });

  describe('filter functions', () => {

    describe('equals', () => {
      it('should compare two values correctly', () => {
        equals(1, 1).should.be.true;
        equals(1, 2).should.be.false;
        equals({}, {}).should.be.false;
        equals(null, null).should.be.true;
      });
    });
    describe('greater_than', () => {});
    describe('less_than', () => {});
    describe('any', () => {});
    describe('none', () => {});
    describe('isIn', () => {
      it('should find the element in an array', () => {
        isIn(1, [1, 2, 3]).should.be.true;
        isIn(1, []).should.be.false;
        isIn(1, [2]).should.be.false;
      });
    });
    describe('contains', () => {});

  });

});
