// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';

type Props = any;
type State = any;

export default class Modal extends Component<Props, State> {
    constructor() {
        super(...arguments);
        autobind(this);
    }

    render() {
        let {content, isModalOpen, onClose} = this.props;
        if (isModalOpen) {
            // $FlowFixMe
            document.body.style.overflow = "hidden" 
        } else {
            // $FlowFixMe
            document.body.style.overflow = "scroll"
        }
        return isModalOpen ? (
            <div style={styles.overlay} onClick={onClose}>
                <div style={styles.content}>
                    {content}
                </div>
            </div>
        ) : null;
    }
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        overflow: 'hidden',
    },
    content: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'red',
    },
}