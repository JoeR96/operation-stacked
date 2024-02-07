import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

// Mock the useNavigate function
jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
}));

// Mock the useApi hook
jest.mock('@operation-stacked/api-hooks', () => ({
    useApi: (callback) => ({
        apiStatus: 'IDLE', // Set the initial status
        exec: async (email, password) => {
            // Mock the API call
            const response = await
              (email, password);
            return response;
        },
        error: null,
    }),
}));

// Mock the useUserStore hook
jest.mock('../../state/userState', () => ({
    useUserStore: () => ({
        setUserId: jest.fn(),
    }),
}));

describe('LoginForm', () => {
    it('should handle login form submission', async () => {
        const { getByLabelText, getByText } = render(<LoginForm onToggleForm={jest.fn()} authApi={{}} />);

        // Fill in the form inputs
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByText('Submit');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        // Simulate form submission
        fireEvent.click(submitButton);

        // Wait for the login to complete
        await waitFor(() => expect(getByText('Loading...')).toBeInTheDocument());

        // Verify that the setUserId function was called
        // This is just an example, you should customize this based on your actual implementation
        // For example, you can mock the setUserId function and check if it's called with the expected arguments
        // Mocked implementation of useUserStore would be useful here
        expect(useUserStore().setUserId).toHaveBeenCalledWith('mockUserId');
    });
});
