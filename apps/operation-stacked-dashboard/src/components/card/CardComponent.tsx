import React from 'react';
import { Card as MuiCard, CardProps as MuiCardProps, CardContent, Typography } from '@mui/material';
import { theme } from '@operation-stacked/shared-styles';

interface CardComponentProps extends MuiCardProps {
  title?: string;
  subtitle?: string;
  contentStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

const CardComponent: React.FC<CardComponentProps> = ({ title, subtitle, contentStyle, children, ...props }) => {
  return (
    <MuiCard sx={styles.card} {...props}>
      <CardContent sx={{ ...styles.cardContent, ...contentStyle }}>
        {title && <Typography sx={styles.cardText}>{title}</Typography>}
        {subtitle && <Typography sx={styles.cardText}>{subtitle}</Typography>}
        {children}
      </CardContent>
    </MuiCard>
  );
};
const styles = {
  card: {
    backgroundColor: theme.colors.secondary,
    width: '23%',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px', // Added padding around the content
  },
  cardText: {
    color: 'white',
    fontWeight: 'bold',
  },
};

export default CardComponent;
