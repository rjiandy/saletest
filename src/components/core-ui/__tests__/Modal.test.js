import React from 'react';
import Modal from '../Modal';
import renderer from 'react-test-renderer';

it('renders correctly with props', () => {
    const tree = renderer
      .create(<Modal content={<div />} isModalOpen={true} onClose={() => null}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });