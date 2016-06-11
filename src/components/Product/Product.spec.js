import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import TestUtils from 'react-addons-test-utils';

import Product from './Product';

describe('Product component', () => {
  it('should render correctly', () => {
    const properties = {
      1: { id: 1, name: 'Name', value: 'Value' },
      2: { id: 2, name: 'Another Name', value: 'Another Value' },
    };
    const renderer = TestUtils.createRenderer();
    renderer.render(<Product properties={properties} />);
    const output = renderer.getRenderOutput();

    const expected1 = (
      <div className="product__property">
        <strong>Name: </strong><em>Value</em>
      </div>
    );

    const expected2 = (
      <div className="product__property">
        <strong>Another Name: </strong><em>Another Value</em>
      </div>
    );

    expect(output).toIncludeJSX(expected1);
    expect(output).toIncludeJSX(expected2);
  });
});