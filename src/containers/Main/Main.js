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
    const { actions, filter } = this.props;
    actions.filter.updateOperator(val);
    actions.product.filterProducts(filter.propertyName, val, filter.propertyValue, (val === 'any' || val === 'none') && filter.propertyName);
  }

  setPropertyName(e) {
    const val = e.target.value;
    const { actions, filter, propertiesMap } = this.props;
    actions.filter.updatePropertyName(val, propertiesMap[val].type);
    actions.product.filterProducts(val, filter.operator, filter.propertiesValue);
  }

  setPropertyValue(e) {
    const val = e.target.value;
    const { actions, filter } = this.props;
    actions.filter.updatePropertyValue(val);
    actions.product.filterProducts(filter.propertyName, filter.operator, val);
  }

  render() {
    const { products, properties, filter } = this.props;


    return (
      <div className="main">
        <aside className="sidebar">
          <FilterControl
            properties={properties}
            propertyName={filter.propertyName}
            propertyValue={filter.propertyValue}
            operator={filter.operator}
            operators={filter.operators}
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
    properties: state.product.properties,
    propertiesMap: state.product.propertiesMap,
    propertyTypeOperatorMap: state.product.propertyTypeOperatorMap,
  }),
  dispatch => ({
    actions: {
      product: bindActionCreators(productActions, dispatch),
      filter: bindActionCreators(filterActions, dispatch),
    },
  })
)(Main);