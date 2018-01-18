// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';

import type {Product} from '../../types/Product-type';

let noImageSrc = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';

type Props = {
  insert?: boolean; // True: Blank Form, False: Need Product as a props
  product?: ?Product;
  onSubmit: (Product) => void;
};

type State = {
  file?: ?File;
  imagePreview?: string | ArrayBuffer | null;
  productID: number;
  productName: string;
  productPrice: string;
  productDescription: string;
  productImage: string;
};

export default class CMSProductDetail extends Component<Props, State> {
  constructor() {
    super(...arguments);
    autobind(this);
    let {product} = this.props;
    if (product) {
      this.state = {
        productName: product.name,
        productPrice: product.price.split('.')[0],
        productID: product.id,
        productDescription: product.description,
        productImage: product.image,
      };
    } else {
      this.state = {
        productID: Math.floor(Math.random() * 1000),
        productName: '',
        productPrice: '',
        productDescription: '',
        productImage: '',
      };
    }
  }

  onSubmit(e: Event) {
    let {productID, productName, productPrice, productDescription} = this.state;
    let {product} = this.props;
    e.preventDefault();
    this.props.onSubmit({
      id: productID,
      name: productName,
      price: productPrice.toString() + '.000',
      description: productDescription,
      image: 'https://source.unsplash.com/880x880/?car,bike',
      likes: product && product.likes ? product.likes : 0,
    })
    this.setState({
      productID: Math.floor(Math.random() * 1000),
      productName: '',
      productPrice: '',
      productDescription: '',
      productImage: '',
      file: null,
      imagePreview: null,
    });
  }

  onFileUpload(e: Event) {
    e.preventDefault();

    let reader = new FileReader();
    //$FlowFixMe
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreview: reader.result,
      });
    }
    reader.readAsDataURL(file)
  }

  onNameChangeText(e: Event) {
    this.setState({
      //$FlowFixMe
      productName: e.target.value,
    });
  }

  onPriceChangeText(e: Event) {
    this.setState({
      //$FlowFixMe
      productPrice: e.target.value,
    });
  }

  onDescriptionChangeText(e: Event) {
    this.setState({
      //$FlowFixMe
      productDescription: e.target.value,
    });
  }

  render() {
    let {insert, product} = this.props;
    let {
      productID,
      productName,
      productDescription,
      productImage,
      productPrice,
      imagePreview,
    } = this.state;
    let title = '';
    if (insert) {
      title = 'Add New Product';
    } else {
      title = product ? `Update ${product.name} Detail` : `Error Occurred`;
    }
    return (
      <div style={styles.container}>
        <div style={styles.title}>
          {title}
        </div>
          <div style={styles.formContainer}>
            <form method="submit" onSubmit={this.onSubmit}>
              <div style={styles.field}>
                <span style={styles.inputName}>#ID</span>
                <div style={styles.inputContainer}>
                  <input 
                    type="text" 
                    disabled 
                    value={productID} 
                    style={{...styles.inputStyle, width: '32px', textAlign: 'center'}} 
                  />
                </div>
              </div>
              <div style={styles.field}>
                <span style={styles.inputName}>Product Name</span>
                <div style={styles.inputContainer}>
                  <input 
                    type="text" 
                    value={productName} 
                    style={styles.inputStyle} 
                    onChange={this.onNameChangeText}                    
                  />                
                </div>
              </div>
              <div style={styles.field}>
                <span style={styles.inputName}>Product Price ('000')</span>
                <div style={styles.inputContainer}>
                  <input 
                    type="text" 
                    value={productPrice} 
                    style={styles.inputStyle}
                    onChange={this.onPriceChangeText}
                  /> 
                </div>
              </div>
              <div style={styles.descContainer}>
                <span style={styles.inputName}>Product Description</span>
                <div style={styles.inputContainer}>
                  <textarea 
                    value={productDescription} 
                    onChange={this.onDescriptionChangeText} 
                    style={styles.descInputStyle} 
                    rows={5}
                    cols={36}
                  />                
                </div> 
              </div>
              <div style={styles.field}>
                <span style={styles.inputName}>Product Image</span>
                <div style={styles.inputContainer}>
                  <input 
                    type="text"
                    disabled
                    value={productImage} 
                    style={styles.inputStyle}
                    onChange={this.onPriceChangeText}
                  />
                </div>
              </div>
              <div style={{...styles.field, height: 'auto'}}>
                <div style={{width: '30%'}} />
                <img alt="" src={insert ? imagePreview ? imagePreview : noImageSrc : productImage} width={150} height={150} />
                <input type="file" accept="image/png" style={styles.inputFile} onChange={this.onFileUpload} />
              </div>
              <div style={styles.submitContainer}>
                <input type="Submit" value="SUBMIT" style={styles.submitButtonStyle} />
              </div>
            </form>
          </div>
      </div>
    )
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgb(200, 60, 60)',
  },
  formContainer: {
    marginTop: '20px',
    width: '60%',
    maxHeight: '500px',
    display: 'flex',
    borderRadius: '4px',
    padding: '20px',
    flex: 1,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 0px 0.1rem, rgba(0, 0, 0, 0.12) 0px 0.1rem 0.2rem',
  },
  field: {
    display: 'flex',
    flex: 1,
    width: '100%',
    // borderBottom: '1px solid gray',
    height: '40px',
    alignItems: 'center',
  },
  inputStyle: {
    borderRadius: '4px',
    display: 'flex',
    width: '100%',
    color: 'rgba(100, 100, 100, 0.8)',
    border: '1px solid rgba(100, 100, 100, 0.5)',
    boxShadow: 0,
  },
  descContainer: {
    display: 'flex', 
    width: '100%', 
    marginTop: '8px',
    marginBottom: '8px',
  },
  descInputStyle: {
    color: 'rgba(100, 100, 100, 0.8)',
    border: '1px solid rgba(100, 100, 100, 0.5)',
  },
  inputContainer: {
    display: 'flex',
    flex: 1,
    width: '500px',
  },
  inputName: {
    color: 'rgba(100, 100, 100, 0.8)',
    fontSize: 14,
    display: 'flex',
    width: '30%',
  },
  inputFile: {
    borderRadius: '4px',
    color: 'rgba(100, 100, 100, 0.8)',
  },
  submitContainer: {
    display: 'flex',
    backgroundColor: 'red',
    flex: 1,
    width: '100%',
    marginTop: '10px',
    position: 'relative',
  },
  submitButtonStyle: {
    position: 'absolute',
    right: 0,
    width: '80px',
    height: '40px',
    backgroundColor: 'rgb(200, 60, 60)',
    color: 'white',
    fontSize: 18,
    border: 0,
    borderRadius: '4px',
  },
};