// @flow

import React, {Component} from 'react';
import ProductList from './components/Product/ProductList';
import CMSHome from './components/CMS/CMSHome';

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
          ) : <CMSHome />
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
    position: 'fixed',
    backgroundColor: 'white',
    width: '26%',
    height: '40px',
    paddingLeft: '37%',
    paddingRight: '37%',
    borderBottom: '1px solid rgba(175, 175, 175, 0.5)',
    borderRadius: '2px',
  },
  buttonContainer: {
    marginLeft: '55%',
    height: '100%',
    display: 'flex',
  },
}