import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FilterControl from 'components/FilterControl/FilterControl';
import ProductList from 'components/ProductList/ProductList';
import * as productActions from 'modules/product/product';
import * as filterActions from 'modules/filter/filter';

require('./Main.scss');

class Main extends Component {
  render() {
    const { product, filter, actions } = this.props;
    console.log(this.props);

    return (
      <div className="main">
        <aside className="sidebar">
          <FilterControl />
        </aside>
        <main className="content">
          <ProductList products={product.products} />
        </main>
      </div>
    );
  }
};

export default connect(
  state => ({
    filter: state.filter,
    product: state.product,
  }),
  dispatch => ({
    actions: {
      product: bindActionCreators(productActions, dispatch),
      filter: bindActionCreators(filterActions, dispatch),
    },
  })
)(Main);