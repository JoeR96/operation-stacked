// RegistrationForm.stories.tsx
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import RegistrationForm, { RegistrationFormProps } from './RegistrationForm';

export default {
  title: 'Components/RegistrationForm',
  component: RegistrationForm,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ],
} as Meta;

const mockApiCall = (scenario:ScenarioType) => {
  return async (email : string, password : string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        switch (scenario) {
          case 'success':
            resolve({ data: { emailTaken: false, message: 'Registration successful' } });
            break;
          case 'userExists':
            resolve({ data: { emailTaken: true, message: 'User already registered. Please try a different email.' } });
            break;
          case 'error':
            reject(new Error('An error occurred. Please try again.'));
            break;
          default:
            reject(new Error('Unknown error'));
        }
      }, 1000);
    });
  };
};

const Template: Story<RegistrationFormProps> = (args) => <RegistrationForm {...args} />;
type ScenarioType = 'success' | 'userExists' | 'error';
export const Default = Template.bind({});

export const SuccessfulRegistration = Template.bind({});
SuccessfulRegistration.decorators = [
  (Story) => <Story apiCall={mockApiCall('success')} />
];

export const UserAlreadyExists = Template.bind({});
UserAlreadyExists.decorators = [
  (Story) => <Story apiCall={mockApiCall('userExists')} />
];

export const RegistrationError = Template.bind({});
RegistrationError.decorators = [
  (Story) => <Story apiCall={mockApiCall('error')} />
];

// Add more scenarios as needed
