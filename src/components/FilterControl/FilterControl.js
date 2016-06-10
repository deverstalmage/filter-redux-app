import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Component } from 'react';

export default class FilterControls extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = ::PureRenderMixin.shouldComponentUpdate;
  }

  render() {
    return (
      <div>Control</div>
    );
  }
}