import { setupWorker } from 'msw';
import { mockHandlers } from './handlers';

export const worker = setupWorker(...mockHandlers);
