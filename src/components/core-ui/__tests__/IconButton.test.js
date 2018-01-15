import React from 'react';
import IconButton from '../IconButton';
import renderer from 'react-test-renderer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

it('renders correctly with props', () => {
    let temp = (
        <MuiThemeProvider>
            <IconButton text="asd" icon="close" />
        </MuiThemeProvider>
    );
    const tree = renderer
      .create(temp)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });