// @flow

import React from 'react';

type Props = {
    text: string;
    onClick?: () => void;
    style?: {[key: string]: any};
};

export default function Button(props: Props) {
    let {text, onClick, style} = props;
    let composedStyle = {...styles.buttonContainer, ...style};
    return (
        <div onClick={onClick} style={composedStyle}>
            <span style={styles.buttonText}>{text}</span>
        </div>
    )
}

const styles = {
    buttonContainer: {
        display: 'flex',
        width: '100px',
        height: '40px',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        backgroundColor: 'rgb(215, 60, 60)',
    },
    buttonText: {
        fontSize: 12,
        color: 'white',
        fontWeight: '700',
    },
}