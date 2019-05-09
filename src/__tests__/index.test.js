import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TypeMe from '../index';

const div = document.createElement('div');

it('renders without crashing', () => {
  ReactDOM.render(<TypeMe />, div);
});

it('renders text passed as children', () => {
  const tree = renderer
    .create(<TypeMe>Hello, there!</TypeMe>)
    .toJSON();
  expect(tree).toMatchSnapshot();
})

// it('renders text passed as props', () => {
//   ReactDOM.render(<TypeMe strings={['>Hello, there!']} />, div);
// })
