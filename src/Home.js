// @flow

import React, {Component} from 'react';
import ProductList from './components/ProductList';

import {IconButton} from './components/core-ui.js';

import autobind from 'class-autobind';

type State = {
  displaying: 'products' | 'CMS';
};

export default class Home extends Component<any, State> {
  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      displaying: 'products',
    };
  }

  render() {
    let {displaying} = this.state;
    return (
      <div style={styles.homeContainer}>
        <div style={styles.headerContainer}>
          <img 
            src="https://www.salestockindonesia.com/assets/images/logo-ss-34f2d4dd.png" 
            width={119} 
            height={37.75}
          />
          <div style={styles.buttonContainer}>
            <IconButton 
              icon="list" 
              style={{marginRight: '14px'}}
              iconStyle={{
                fontSize: 24,
                color: displaying === 'products' ? 'rgb(215, 60, 60)' : 'rgba(100, 100, 100, 0.6)',
              }}
              onClick={() => this.setState({displaying: 'products'})}
            />
            <IconButton 
              icon="create" 
              iconStyle={{
                fontSize: 20,
                color: displaying === 'CMS' ? 'rgb(215, 60, 60)' : 'rgba(100, 100, 100, 0.6)',
              }}
              onClick={() => this.setState({displaying: 'CMS'})}              
            />
          </div>
        </div>
        {
          this.state.displaying === 'products' ? (
            <ProductList />
          ) : <div>CMS</div>
        }
      </div>
    )
  }
}

const styles={
  homeContainer: {
    flexDirection: 'column',
    display: 'flex',
    flex: 1,
  },
  headerContainer: {
    display: 'flex',
    width: '100%',
    height: '40px',
    paddingLeft: '37%',
    paddingRight: '37%',
    marginBottom: '15px',
    borderBottom: '1px solid rgba(175, 175, 175, 0.5)',
    borderRadius: '2px',
  },
  buttonContainer: {
    marginLeft: '15%',
    height: '100%',
    display: 'flex',
  },
}