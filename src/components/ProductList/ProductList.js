import { Component, PropTypes } from 'react';

import Product from 'components/Product/Product';

export default class ProductList extends Component {
  static propTypes = {
    products: PropTypes.array,
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        {products.map(product => {
          return (
            <div>
              {Object.keys(product.properties).map(propertyId => {
                const property = product.properties[propertyId];
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