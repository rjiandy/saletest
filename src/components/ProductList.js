// @flow
import React, { Component } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import InfiniteScroll from 'react-infinite-scroller';
import autobind from 'class-autobind';
import {connect} from 'react-redux';

import ProductItem from './ProductItem';

import type {Product} from '../types/Product-type';
import type {Dispatch, RootState} from '../stores/createStore';

type Props = {
  products: Array<Product>;
  isLoading: boolean;
  error?: Error;
  fetchMoreData: (page: number) => void;
  fetchInitialData: () => void;
};

type State = {
  dataIndex: number;
  hasMore: boolean;
  isFetchMore: boolean;
};

class ProductList extends Component<Props, State> {

  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      dataIndex: 1,
      hasMore: true,
      isFetchMore: false,
    };
  }

  componentWillMount() {
    this.props.fetchInitialData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      hasMore: true,
      isFetchMore: false,
    });
  }

  onLoadMore() {
    this.setState({
      dataIndex: this.state.dataIndex + 1,
      hasMore: false,
      isFetchMore: true,
    }, this.props.fetchMoreData(this.state.dataIndex));
  }

  render() {
    let {products, isLoading, error} = this.props;
    if (error) { // TODO: Add better error message
      return (
        <div>
          Error Getting Initial Data
        </div>
      )
    }
    if (isLoading) { // TODO: Add Spinner
      return (
        <div>
          <RefreshIndicator
            size={100}
            left={window.innerWidth / 2 - 50}
            top={window.innerHeight / 2 - 50}
            loadingColor='rgb(215, 60, 60)'
            status="loading"
            style={{display: 'inline-block', position: 'relative'}}
          />
        </div>
      )
    }
    let items = products.map((product, idx) => {
      return (
        <ProductItem key={idx} product={product} />
      );
    });
    return (
      <div style={styles.productList}>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.onLoadMore}
          hasMore={this.state.hasMore}
          treshold={250}
          initialLoad={false}
          useWindow={true}
          loader={null}
        >
          {items}
        </InfiniteScroll> 
        {
          this.state.isFetchMore ? (
            <RefreshIndicator
              size={50}
              left={0}
              top={0}
              loadingColor='rgb(215, 60, 60)'
              status="loading"
              style={{marginTop: 20, display: 'inline-block', position: 'relative'}}
            />
          ) : null
        }
        
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  let {products, isProductListLoading, error} = state;
  return {
    products,
    isLoading: isProductListLoading,
    error,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchInitialData() {
      dispatch({
        type: 'FETCH_INITIAL_DATA_REQUESTED',
      });
    },
    fetchMoreData(page: number) {
      dispatch({
        type: 'FETCH_MORE_DATA_REQUESTED',
        page,
      });
    }
  }    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

const styles = {
  productList: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '450px',
    flexDirection: 'column',
    display: 'flex',
    marginLeft: '37%',
    marginRight: '37%',
  },
}