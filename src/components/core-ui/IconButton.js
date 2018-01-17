// @flow

import React, {Component} from 'react';
import {FontIcon} from 'material-ui';
import autobind from 'class-autobind';

type Props = {
    text?: string;
    icon: string;
    style?: {[key: string]: any};
    iconStyle?: {[key: string]: any};
    textStyle?: {[key: string]: any};
};

type State = {
    isHovered: boolean;
};

export default class IconButton extends Component<Props, State> {
    constructor() {
        super(...arguments);
        autobind(this);
        this.state = {
            isHovered: false,
        };
    }

    render() {
        let {text, icon, textStyle, style, iconStyle, ...otherProps} = this.props;
        let composedStyle = {...styles.iconButton, ...style};
        let composedIconStyle = {
            ...styles.icon, 
            color: this.state.isHovered ? 'rgb(200, 60, 60)' : 'rgba(100, 100, 100, 0.6)',
            ...iconStyle,
        };
        let composedTextStyle = {
            ...styles.text, 
            color: this.state.isHovered ? 'rgb(200, 60, 60)' : 'rgba(100, 100, 100, 0.6)',
            ...textStyle,
        };
        return (
            <div 
                style={composedStyle} 
                onMouseOver={() => this.setState({isHovered: true})} 
                onMouseOut={() => this.setState({isHovered: false})}
                {...otherProps}
            >
                <FontIcon className="material-icons" style={composedIconStyle}>{icon}</FontIcon>
                {
                    text ? (
                        <span style={composedTextStyle}>{text}</span>
                    ) : null
                }
            </div>
        )
    }
}

const styles = {
    iconButton: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        paddingLeft: '20px',
        color: 'rgba(100, 100, 100, 0.6)',
        cursor: 'pointer',
    },
    icon: {
        fontSize: 16,
        color: 'rgba(100, 100, 100, 0.6)',
    },
    text: {
        marginLeft: '6px',
    },
};