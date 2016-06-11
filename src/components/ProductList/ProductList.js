import { Component, PropTypes } from 'react';

import Product from 'components/Product/Product';

export default class ProductList extends Component {
  static propTypes = {
    products: PropTypes.array,
  }

  render() {
    const { products } = this.props;
    console.log('products', products);
    return (
      <div>
        {products.map(product => {
          return (
            <div>
              {product.properties.map(property => {
                return (
                  <div>
                    <em>{property.value}</em>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}