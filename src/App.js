import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import InfiniteScroll from 'react-infinite-scroller';
import autobind from 'class-autobind';

import ProductItem from './components/ProductItem';

let products = [];
let product = {
  name: 'Nomania Diamond Simple Tee',
  price: '79.000',
  likes: 129,
  image: 'https://ss-imager-prod.freetls.fastly.net/www-images/480/product_images/c1c16e62b3fbaa738b5a8b7fd656fa5c.jpg',
  description: `Warna Black and White;Satu ukuran muat sampai size M;Lingkar dada 86 cm, Lebar bahu 36 cm, Panjang lengan 15 cm, Lingkar lengan 32 cm, Panjang 62 cm, Lingkar pinggang 86 cm;Bahan Kaos`
}
for (let i = 0; i < 6; i++) {
  products.push(product);
}

class App extends Component {

  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      products,
    };
  }

  onLoadMore() {
    setTimeout(() => {
      this.setState({
        products: [...this.state.products, ...this.state.products],
      });
    }, 1000);
  }
  render() {
    let items = this.state.products.map((product, idx) => {
      return (
        <ProductItem key={idx} product={product} />
      );
    });
    return (
      <MuiThemeProvider uiTheme={{}}>
        <div style={styles.app}>
          <div style={styles.productList}>
            <InfiniteScroll
                pageStart={0}
                loadMore={this.onLoadMore}
                hasMore={true || false}
                loader={
                  <RefreshIndicator
                    size={50}
                    left={((window.innerWidth * 0.23) / 2)}
                    top={0}
                    loadingColor='rgb(215, 60, 60)'
                    status="loading"
                    style={{marginTop: 20, display: 'inline-block', position: 'relative'}}
                  />
                }
                treshold={10}
                useWindow={true}
            >
                {items}
            </InfiniteScroll> 
          </div>
        </div>
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