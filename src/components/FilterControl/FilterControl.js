import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Component } from 'react';

export default class FilterControls extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = ::PureRenderMixin.shouldComponentUpdate;
  }

  render() {
    const { properties, onChangePropertyName, onChangeOperator, onChangePropertyValue } = this.props;

    return (
      <div>
        <div>
          <select value="A" onChange={onChangePropertyName}>
            <option value="A">Letter A</option>
            <option value="B">Letter B</option>
            <option value="C">Letter C</option>
          </select>
        </div>
        <div>
          <select value="A" onChange={onChangeOperator}>
            <option value="A">Letter A</option>
            <option value="B">Letter B</option>
            <option value="C">Letter C</option>
          </select>
        </div>
        <div>
          <input type="text" value="Property Value" onChange={onChangePropertyValue} />
        </div>
      </div>
    );
  }
}