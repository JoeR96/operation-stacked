import React from 'react';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

interface TextFieldProps extends Omit<MuiTextFieldProps, 'InputProps' | 'InputLabelProps'> {
  InputProps?: React.ComponentProps<typeof MuiTextField>['InputProps'] & {
    style?: React.CSSProperties;
  };
  InputLabelProps?: React.ComponentProps<typeof MuiTextField>['InputLabelProps'] & {
    style?: React.CSSProperties;
  };
  borderColor?: string;
}

const TextField: React.FC<TextFieldProps> = ({
                                               InputProps,
                                               InputLabelProps,
                                               borderColor,
                                               ...props
                                             }) => {
  const commonStyle = { color: 'white' };

  const borderStyle = borderColor ? { border: `1px solid ${borderColor}` } : {};

  const customInputProps = {
    ...InputProps,
    style: { ...commonStyle, ...borderStyle, ...InputProps?.style },
  };

  const customInputLabelProps = {
    ...InputLabelProps,
    style: { ...commonStyle, ...InputLabelProps?.style },
    shrink: true,
  };

  return (
    <MuiTextField
      {...props}
      InputProps={customInputProps}
      InputLabelProps={customInputLabelProps}
    />
  );
};

export default TextField;
