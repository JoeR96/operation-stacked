import React from 'react';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

interface TextFieldProps extends Omit<MuiTextFieldProps, 'InputProps' | 'InputLabelProps'> {
  InputProps?: React.ComponentProps<typeof MuiTextField>['InputProps'] & {
    style?: React.CSSProperties;
  };
  InputLabelProps?: React.ComponentProps<typeof MuiTextField>['InputLabelProps'] & {
    style?: React.CSSProperties;
  };
}

const TextField: React.FC<TextFieldProps> = ({
                                               InputProps,
                                               InputLabelProps,
                                               ...props
                                             }) => {
  // Define the common style you want to apply
  const commonStyle = { color: 'white' };

  // Apply the common style along with any specific styles provided via props
  const customInputProps = {
    ...InputProps,
    style: { ...commonStyle, ...InputProps?.style },
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
