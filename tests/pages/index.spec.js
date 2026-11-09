import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '../../i18n';
import Home from '../../pages/index';

vi.mock('next/router', () => ({
  useRouter: () => ({ pathname: '/' }),
}));

describe('<Home/>', () => {
  it('should render', async () => {
    const { container } = render(
      <IntlProvider locale="en" defaultLocale="en" messages={messages.en}>
        <Home />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
