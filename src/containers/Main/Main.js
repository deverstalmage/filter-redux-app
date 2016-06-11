import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FilterControl from 'components/FilterControl/FilterControl';
import ProductList from 'components/ProductList/ProductList';
import * as productActions from 'modules/product/product';
import * as filterActions from 'modules/filter/filter';

require('./Main.scss');

class Main extends Component {
  componentDidMount() {
    this.props.actions.product.fetchProducts();
  }

  render() {
    const { products, filter, actions } = this.props;

    return (
      <div className="main">
        <aside className="sidebar">
          <FilterControl />
        </aside>
        <main className="content">
          <ProductList products={products} />
        </main>
      </div>
    );
  }
};

export default connect(
  state => ({
    filter: state.filter,
    products: state.product.products,
  }),
  dispatch => ({
    actions: {
      product: bindActionCreators(productActions, dispatch),
      filter: bindActionCreators(filterActions, dispatch),
    },
  })
)(Main);