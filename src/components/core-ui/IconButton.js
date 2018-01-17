// @flow

import React from 'react';
import {FontIcon} from 'material-ui';

type Props = {
    text?: string;
    icon: string;
    style?: {[key: string]: any};
    iconStyle?: {[key: string]: any};
};

export default function IconButton(props: Props) {
    let {text, icon, style, iconStyle, ...otherProps} = props;
    let composedStyle = {...styles.iconButton, ...style};
    let composedIconStyle = {...styles.icon, ...iconStyle}
    return (
        <div style={composedStyle} {...otherProps}>
            <FontIcon className="material-icons" style={composedIconStyle}>{icon}</FontIcon>
            {
                text ? (
                    <span style={styles.text}>{text}</span>
                ) : null
            }
        </div>
    )
}

const styles = {
    iconButton: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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