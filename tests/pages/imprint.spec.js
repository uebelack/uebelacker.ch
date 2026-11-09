import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '../../i18n';
import Imprint from '../../pages/imprint';

vi.mock('next/router', () => ({
  useRouter: () => ({ pathname: '/' }),
}));

describe('<Imprint/>', () => {
  it('should render', async () => {
    const { container } = render(
      <IntlProvider locale="en" defaultLocale="en" messages={messages.en}>
        <Imprint />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
