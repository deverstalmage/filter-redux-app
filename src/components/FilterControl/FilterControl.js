import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Component, PropTypes } from 'react';

require('./FilterControl.scss');

export default class FilterControls extends Component {

  static propTypes = {
    properties: PropTypes.array.isRequired,
    operators: PropTypes.array.isRequired,
    onChangeOperator: PropTypes.func.isRequired,
    onChangePropertyName: PropTypes.func.isRequired,
    onChangePropertyValue: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = ::PureRenderMixin.shouldComponentUpdate;
  }

  render() {
    const {
      properties,
      operators,
      propertyName,
      operator,
      propertyValue,
      onChangePropertyName,
      onChangeOperator,
      onChangePropertyValue,
      onClear,
    } = this.props;

    return (
      <div className="filter-control">
        <label for="property-name">Property Name:</label>
        <select className="filter-control__select" value={propertyName} onChange={onChangePropertyName} id="property-name">
          <option value="">-- select property name --</option>
          {properties.map(prop => <option key={`property-name-${prop.id}`} value={prop.id}>{prop.name}</option>)}
        </select>
        <label for="operator">Operator</label>
        <select className="filter-control__select" value={operator} onChange={onChangeOperator} id="operator">
          <option value="">-- select operator --</option>
          {operators.map(op => <option key={`operator-${op.id}`} value={op.id}>{op.text}</option>)}
        </select>
        <label for="property-value">Property Value:</label>
        <input
          className="filter-control__input"
          type="text"
          value={propertyValue}
          onChange={onChangePropertyValue}
          placeholder="enter property value here"
          id="property-value"
        />
      <button onClick={onClear}>Clear</button>
      </div>
    );
  }
}