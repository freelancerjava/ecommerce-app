import React from 'react';
import { shallow } from 'enzyme';
import { Products } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Products />);
  expect(renderedComponent.find('.home-products').length).toBe(1);
});
