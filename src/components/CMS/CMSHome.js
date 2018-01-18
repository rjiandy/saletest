// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import {connect} from 'react-redux';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import CMSNavigationButton from './CMSNavigationButton';
import CMSProductList from './CMSProductList';
import CMSProductDetail from './CMSProductDetail';

import type {Product} from '../../types/Product-type';
import type {Dispatch, RootState} from '../../stores/createStore';


type Props = any;
type State = {
  displaying: 'dashboard' | 'insert' | 'update';
  selectedProduct: ?Product;
};

export class CMSHome extends Component<Props, State> {

  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      displaying: 'insert',
      selectedProduct: null,
    };
  }

  componentWillMount() {
    if (this.props.products.length === 0) {
      this.props.fetchInitialData();
    }
  }
  onSubmitProduct(product: Product) {
    let {displaying} = this.state;
    this.setState({
      displaying: 'dashboard',
    }, this.props.manageProduct(product, displaying === 'insert'));
  }
  render() {
    let {displaying} = this.state;
    let {products, isLoading} = this.props;
    if (isLoading) {
      return (
        <div>
          <RefreshIndicator
            size={50}
            left={window.innerWidth / 2 - 25}
            top={window.innerHeight / 2 - 25}
            loadingColor='rgb(215, 60, 60)'
            status="loading"
            style={{display: 'inline-block', position: 'relative'}}
          />
        </div>
      );
    }
    let CMSContent = null;
    if (displaying === 'dashboard') {
      CMSContent = (
        <CMSProductList 
          products={products} 
          onDetailPress={(product) => this.setState({displaying: 'update', selectedProduct: product})}
        />
      );
    } else if (displaying === 'insert') {
      CMSContent = (
        <CMSProductDetail 
          insert 
          onSubmit={this.onSubmitProduct}
        />
      );
    } else if (displaying === 'update' && this.state.selectedProduct != null) {
      CMSContent = (
        <CMSProductDetail 
          product={this.state.selectedProduct} 
          onSubmit={this.onSubmitProduct}
        />
      );
    } else {
      CMSContent = null;
    }

    return (
      <div style={styles.CMSContainer}>
        <div style={styles.CMSNavigations}>
          <CMSNavigationButton 
            text="Dashboard"
            icon="dashboard"
            isSelected={displaying === 'dashboard'}
            onClick={() => this.setState({displaying: 'dashboard'})}
          />
          <CMSNavigationButton 
            text="Add New Product"
            icon="add"
            isSelected={displaying === 'insert'}
            onClick={() => this.setState({displaying: 'insert'})}
          />
          <CMSNavigationButton 
            text="Edit Product"
            icon="edit"
            isSelected={displaying === 'update'}
            disabled
            onClick={() => this.setState({displaying: 'dashboard'})}
          />
        </div>
        <div style={styles.CMSContent}>
          {CMSContent}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: RootState) {
  let {products, isProductListLoading} = state;
  return {
    products,
    isLoading: isProductListLoading,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchInitialData() {
      dispatch({
        type: 'FETCH_INITIAL_DATA_REQUESTED',
      });
    },
    manageProduct(product: Product, isInsert: boolean) {
      isInsert ? 
        dispatch({
          type: 'INSERT_NEW_DATA_REQUESTED',
          newProduct: product,
        }) :
        dispatch({
          type: 'UPDATE_DATA_REQUESTED',
          product
        });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CMSHome);

const styles = {
  CMSContainer: {
    display: 'flex',
    width: '70%',
    marginLeft: '15%',
    marginRight: '15%',
    marginTop: '60px',
    height: '700px',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 0px 0.1rem, rgba(0, 0, 0, 0.12) 0px 0.1rem 0.2rem',
  },
  CMSNavigations: {
    minWidth: '18%',
    height: '100%',
    borderRight: '1px solid rgba(175, 175, 175, 0.5)',
    display: 'flex',
    flexDirection: 'column',
  },
  CMSContent: {
    padding: '10px',
    display: 'flex',
    flex: 1,
  },
};