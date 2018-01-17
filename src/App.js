// @flow

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';

import Home from './Home';

import store from './stores/createStore';

class App extends Component<any, any> {
  render() {
    return (
      <MuiThemeProvider uiTheme={{}}>
        <Provider store={store}>
          <div style={styles.app}>
            <Home />
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;

const styles = {
  app: {
    display: 'flex',
    flex: 1,
  },
}