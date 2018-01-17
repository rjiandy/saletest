// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';

import {IconButton} from '../core-ui';

import type {Product} from '../../types/Product-type';


type State = any;
type Props = any;

type ProductRowProps = {
  product: Product;
  onDetailPress: (product: Product) => void;
};

function ProductRow(props: ProductRowProps) {
  let {product, onDetailPress} = props;
  return (
    <div style={styles.productRow}>
      <div style={{...styles.rowContent, maxWidth: '60px'}}>
        {product.id}
      </div>
      <div style={{...styles.rowContent, maxWidth: '240px'}}>
        {product.name}
      </div>
      <div style={{...styles.rowContent, maxWidth: '140px'}}>
        {product.price}
      </div>
      <div style={{...styles.rowContent, maxWidth: '80px'}}>
        {product.likes}
      </div>
      <div style={{...styles.rowContent, maxWidth: '240px'}}>
        {product.image}
      </div>
      <div style={{...styles.rowContent, maxWidth: '300px'}}>
        {product.description.slice(0, 40) + '. . .'}
      </div>
      <div style={{...styles.tableHeaderText, borderRight: '0px', maxWidth: '50px'}}>
        <IconButton icon="edit" style={{paddingLeft: '6px', marginRight: '3px'}} onClick={onDetailPress} />
        <IconButton icon="delete" style={{paddingLeft: '0px'}} />
      </div>
    </div>
  )
}
// NOTE: Didn't build the functional through redux saga yet. It simply dispatch an action, let saga handle the side effect and communicate to server
//       By using this method we can etiher provide an optimistic update by only changing the redux or reset the store based on the effects and wait for new data
//       from server


export default class CMSProductList extends Component<Props, State> {
  constructor() {
    super(...arguments);
    autobind(this);
  }
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.title}>
          Product List
        </div>
        <div style={styles.productTable}>
          <div style={styles.tableHeader}>
            <div style={{...styles.tableHeaderText, maxWidth: '60px'}}>
              #ID
            </div>
            <div style={{...styles.tableHeaderText, maxWidth: '240px'}}>
              NAME
            </div>
            <div style={{...styles.tableHeaderText, maxWidth: '140px'}}>
              PRICE
            </div>
            <div style={{...styles.tableHeaderText, maxWidth: '80px'}}>
              LIKES
            </div>
            <div style={{...styles.tableHeaderText, maxWidth: '240px'}}>
              IMAGE
            </div>
            <div style={{...styles.tableHeaderText, maxWidth: '300px'}}>
              DESC.
            </div>
            <div style={{...styles.tableHeaderText, borderRight: '0px', maxWidth: '50px'}}>
            </div>
          </div>
          {
            this.props.products.map((product) => <ProductRow product={product} key={product.id} onDetailPress={() => this.props.onDetailPress(product)} />)
          }
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'column',
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  productTable: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'column',
    overflowY: 'scroll',
    borderTop: '1px solid rgba(175, 175, 175, 0.5)',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'rgb(200, 60, 60)',
  },
  tableHeader: {
    width: '100%',
    borderBottom: '1px solid rgba(175, 175, 175, 0.5)',
    height: '30px',
    alignItems: 'center',
    display: 'flex',
  },
  tableHeaderText: {
    fontWeight: '600',
    fontSize: 16,
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    color: 'rgba(200, 60, 60, 0.6)',
    borderRight: '1px solid rgba(175, 175, 175, 0.5)',
  },
  productRow: {
    display: 'flex',
    borderBottom: '1px solid rgba(175, 175, 175, 0.5)',
    textOverflow: 'ellipsis',
    alignItems: 'center',
  },
  rowContent: {
    fontSize: 12,
    minHeight: '30px',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(100, 100, 100, 0.5)',
    borderRight: '1px solid rgba(175, 175, 175, 0.5)',
  },
}