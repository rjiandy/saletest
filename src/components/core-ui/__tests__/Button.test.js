import React from 'react';

import Button from '../Button';
import renderer from 'react-test-renderer';


it('renders correctly with props', () => {
    const component = renderer
      .create(<Button text="asd" onClick={() => null} style={{flex: 1}} />);

    expect(component.toJSON()).toMatchSnapshot();
    let tree = component.toJSON();

    tree.props.onClick();
    expect(tree).toMatchSnapshot();
  });