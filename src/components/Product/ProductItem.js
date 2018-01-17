// @flow

import React, { Component } from 'react';
import autobind from 'class-autobind';

import {Modal, Button, IconButton, Image} from '../core-ui';

import type {Product} from '../../types/Product-type';

type Props = {
    product: Product;
};

type State = {
    isDisplayingDetail: boolean;
    isDisplayingModal: boolean;
};

export default class ProductItem extends Component<Props, State> {

    constructor() {
        super(...arguments);
        autobind(this);
        this.state = {
            isDisplayingDetail: false,
            isDisplayingModal: false,
        };
    }

    onProductPress() {
        this.setState({
            isDisplayingDetail: true,
        });
    }

    onImageClick() {
        this.setState({
            isDisplayingModal: true,
        });
    }

    render() {
        let {isDisplayingDetail} = this.state;
        let {product} = this.props;
        return (
            <div style={styles.container} onClick={this.onProductPress}>
                <Modal 
                    onClose={() => {
                        this.setState({
                            isDisplayingModal: false,
                        });
                    }}
                    content={<img src={product.image} alt="" />}
                    isModalOpen={this.state.isDisplayingModal}
                />
                <Image
                    src={product.image}
                    height="450px"
                    width="100%"
                    alt=""
                    style={{imageRendering: 'pixelated'}}
                    onClick={() => {
                        this.state.isDisplayingDetail ? 
                            this.onImageClick() :
                            this.onProductPress()
                    }}
                />
                <div><span style={styles.productName}>{product.name}</span></div>
                <div><span style={styles.productPrice}>{product.price}</span></div>
                {
                    isDisplayingDetail ? (
                        <div style={styles.productDetail}>
                            {product.description.split(';').map((sent, idx) => <div key={idx}>{sent}</div>)}
                        </div>
                    ): null
                }
                <div style={styles.likesContainer}>
                    <span style={styles.like}>{product.likes} sista naksir ini</span>
                </div>
                {
                    isDisplayingDetail ? (
                        <div style={{...styles.interactionButtons, flexDirection: 'column', height: '100px'}}>
                            <div style={{...styles.likeShareContainer, width: '100%'}}>
                                <IconButton text="Naksir" icon="favorite" />
                                <IconButton text="Bagikan" icon="share" />
                            </div>
                            <Button text="Cek stok yang ready" style={{width: '100%', height: '40px', marginBottom: '10px'}}/>
                        </div>
                    ) : (
                        <div style={styles.interactionButtons}>
                            <div style={styles.likeShareContainer}>
                                <IconButton text="Naksir" icon="favorite" />
                                <IconButton text="Bagikan" icon="share" />
                            </div>
                            <Button text="BELI" onClick={this.onProductPress} style={{marginBottom: 10, marginTop: 10}}/>
                        </div>
                    )
                }
                
            </div>
        )
    }
}

const styles = {
    container: {
        width: '100%',
        padding: '10px',
        marginBottom: '30px',
        borderRadius: '0.2rem',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 0px 0.1rem, rgba(0, 0, 0, 0.12) 0px 0.1rem 0.2rem',
    },
    productName: {
        color: 'rgb(0, 0, 0)',
        fontSize: '1.2rem',
        fontWeight: 700,
        letterSpacing: '-0.04rem',
        marginTop: '15px',
    },
    productPrice: {
        marginTop: '8px',
        color: 'rgb(215, 60, 60)',
        fontWeight: 600,
        fontSize: '1.2rem',
    },
    likesContainer: {
        marginTop: '20px',
        padding: '5px 0 5px 0',
        borderTop: '1px solid rgba(225, 225, 225, 0.5)',
        height: '30px',
        width: '100%',
    },
    interactionButtons: {
        display: 'flex',
        flexDirection: 'row',
        margin: '-10px',
        flex: 1,
        paddingLeft: '10px',
        paddingRight: '10px',
        borderTop: '1px solid rgba(225, 225, 225, 0.5)',
        alignItems: 'center',
    },
    likeShareContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    like: {
        fontSize: '12px',
        color: 'rgba(100, 100, 100, 0.6)',
        marginLeft: '8px',
    },
    productDetail: {
        fontSize: 13,
        marginTop: '10px',
        lineHeight: '20px',
    },
}