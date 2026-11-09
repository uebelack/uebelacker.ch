import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '../../i18n';
import Impressum from '../../pages/impressum';

vi.mock('next/router', () => ({
  useRouter: () => ({ pathname: '/' }),
}));

describe('<Impressum/>', () => {
  it('should render', async () => {
    const { container } = render(
      <IntlProvider locale="en" defaultLocale="en" messages={messages.en}>
        <Impressum />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
