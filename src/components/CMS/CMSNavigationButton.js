// @flow

import React from 'react';
import {IconButton} from '../core-ui';

type CMSNavigationButtonProps = {
  isSelected: boolean; 
  onClick: () => void;
  text: string, 
  icon: string;
  disabled?: boolean;
}

export default function CMSNavigationButton(props: CMSNavigationButtonProps) {
  let {isSelected, text, icon, onClick, disabled} = props;
  let containerSelectedStyle = {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: isSelected ? 'rgba(215, 215, 215, 0.3)' : disabled ? 'rgba(120, 120, 120, 0.4)' : 'white',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };
  let iconTextSelectedStyle = {
    color: isSelected ? 'rgb(215, 60, 60)' : 'rgba(100, 100, 100, 0.6)',
  };
  return (
    <div style={styles.CMSNavigationButton}>
      <IconButton 
        text={text}
        icon={icon}
        onClick={disabled ? () => null : onClick}
        style={containerSelectedStyle}
        iconStyle={iconTextSelectedStyle}
        textStyle={iconTextSelectedStyle}
      />
    </div>
  )
}

const styles = {
  CMSNavigationButton: {
    display: 'flex',
    borderBottom: '1px solid rgba(175, 175, 175, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
  },
}