import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../../pages/_app';
import Index from '../../pages/index';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementation(() => ({
  pathname: '/',
}));

describe('<App/>', () => {
  it('should render', async () => {
    const { container } = render(
      <App Component={Index} pageProps={{}} />,
    );
    expect(container).toMatchSnapshot();
  });
});
