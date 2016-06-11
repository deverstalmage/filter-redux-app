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
    this.setOperator = ::this.setOperator;
    this.setPropertyName = ::this.setPropertyName;
    this.setPropertyValue = ::this.setPropertyValue;
  }

  setOperator(e) {
    const val = e.target.value;
    console.log(val);
  }

  setPropertyName(e) {
    const val = e.target.value;
    console.log(val);
  }

  setPropertyValue(e) {
    const val = e.target.value;
    console.log(val);
  }

  render() {
    const { products, properties, operators, filter, actions } = this.props;

    return (
      <div className="main">
        <aside className="sidebar">
          <FilterControl
            propertyName={filter.propertyName}
            propertyValue={filter.propertyValue}
            operator={filter.operator}
            properties={properties}
            operators={operators}
            onChangeOperator={this.setOperator}
            onChangePropertyName={this.setPropertyName}
            onChangePropertyValue={this.setPropertyValue}
          />
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
    operators: state.product.operators,
    properties: state.product.properties,
  }),
  dispatch => ({
    actions: {
      product: bindActionCreators(productActions, dispatch),
      filter: bindActionCreators(filterActions, dispatch),
    },
  })
)(Main);