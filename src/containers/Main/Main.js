import { Component } from 'react';

import FilterControl from 'components/FilterControl/FilterControl';
import ProductList from 'components/ProductList/ProductList';

require('./Main.scss');

export default class Main extends Component {
  render() {
    return (
      <div className="main">
        <aside className="sidebar">
          <FilterControl />
        </aside>
        <main className="content">
          <ProductList />
        </main>
      </div>
    );
  }
};