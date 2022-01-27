import React from 'react';
import { shallow } from 'enzyme';
import { SearchProducts } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SearchProducts />);
  expect(renderedComponent.find('.home-search-products').length).toBe(1);
});
