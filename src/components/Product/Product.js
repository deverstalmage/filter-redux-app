import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, { Component, PropTypes } from 'react';

require('./Product.scss');

export default class Product extends Component {

  static propTypes = {
    properties: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = ::PureRenderMixin.shouldComponentUpdate;
  }

  render() {
    const { properties } = this.props;

    return (
      <div className="product">
        {Object.keys(properties).map(propertyId => {
          const property = properties[propertyId];
          return (
            <div className="product__property" key={`property-${propertyId}`}>
              <strong>{property.name}: </strong><em>{property.value}</em>
            </div>
          );
        })}
      </div>
    );
  }
}