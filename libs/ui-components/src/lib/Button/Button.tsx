import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { commonStyles } from '@operation-stacked/shared-styles';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset'; // Add this line
};

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button' }) => {
  return (
    <MuiButton
      style={commonStyles.button}
      onClick={onClick}
      type={type} // Add this line
    >
      {children}
    </MuiButton>
  );
};

export default Button;
