import React from 'react';
import { render } from '@testing-library/react';
import App from '../../pages/_app';
import Index from '../../pages/index';

vi.mock('next/router', () => ({
  useRouter: () => ({ pathname: '/' }),
}));

describe('<App/>', () => {
  it('should render', async () => {
    const { container } = render(<App Component={Index} pageProps={{}} />);
    expect(container).toMatchSnapshot();
  });
});
