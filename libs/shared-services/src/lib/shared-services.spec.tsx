import { render } from '@testing-library/react';

import SharedServices from './shared-services';

describe('SharedServices', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedServices />);
    expect(baseElement).toBeTruthy();
  });
});
