import { Component, PropTypes } from 'react';

import Product from 'components/Product/Product';

require('./ProductList.scss')

export default class ProductList extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
  }

  render() {
    const { products } = this.props;
    return (
      <div className="product-list">
        {products.map((product, i) => <Product properties={product.properties} key={`product-${product.id}`} />)}
      </div>
    );
  }
}