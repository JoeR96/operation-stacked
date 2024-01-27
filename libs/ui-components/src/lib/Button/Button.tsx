import React from 'react';
import { Button as MuiButton, Box } from '@mui/material';
import { commonStyles } from '@operation-stacked/shared-styles';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  isSquare?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', isSquare = false }) => {
  const buttonStyle = {
    ...commonStyles.button,
    ...(isSquare && {
      width: '200px',
      height: '200px',
      padding: 0,
      aspectRatio: '1 / 1',
    }),
  };

  return (
    <Box style={{ width: isSquare ? '200px' : 'auto' }}>
      <MuiButton
        style={buttonStyle}
        onClick={onClick}
        type={type}
      >
        {children}
      </MuiButton>
    </Box>
  );
};

export default Button;
