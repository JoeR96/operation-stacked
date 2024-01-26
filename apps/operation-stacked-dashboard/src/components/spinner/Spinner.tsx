import React from 'react';
import './spinner.css'; // Importing CSS for keyframes only

const spinnerStyle = {
    border: '5px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTop: '5px solid #000',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite'
};

const Spinner: React.FC = () => {
    return <div style={spinnerStyle}></div>;
};

export default Spinner;
