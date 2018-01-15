// @flow

import React from 'react';
import {FontIcon} from 'material-ui';

type Props = {
    text: string;
    icon: string;
    style?: {[key: string]: any};
};

export default function IconButton(props: Props) {
    let {text, icon, style, ...otherProps} = props;
    let composedStyle = {...styles.iconButton, ...style};
    return (
        <div style={composedStyle} {...otherProps}>
            <FontIcon className="material-icons" style={styles.icon}>{icon}</FontIcon>
            <span style={styles.text}>{text}</span>
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