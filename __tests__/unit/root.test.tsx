import React from 'react';
import { mount } from 'enzyme';
import App from '../../src/App';
import Landing from '../../src/pages/Landing';

it('renders without crashing', () => {
  const app = mount(<App />);

  expect(app.find(Landing)).toHaveLength(0);
});