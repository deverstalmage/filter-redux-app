import { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Product from 'components/Product/Product';

require('./ProductList.scss')

export default class ProductList extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
  }

  render() {
    const { products } = this.props;
    return (
      <div >
        <ReactCSSTransitionGroup component="div" className="product-list" transitionName="fade-slide" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {products.map((product, i) => <Product properties={product.properties} key={`product-${product.id}`} />)}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}