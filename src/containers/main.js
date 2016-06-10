import { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = ::PureRenderMixin.shouldComponentUpdate;
  }

  render() {
    return (
      <h1>HEY</h1>
    );
  }
};