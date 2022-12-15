import React from 'react';
import { scroller } from 'react-scroll';
import { useIntl } from 'react-intl';

export default function ScrollButton({ target }: { target: string }) {
  const { formatMessage } = useIntl();
  return (
    <button
      className="scroll-button"
      type="button"
      aria-label={formatMessage({ id: 'common.scroll_down' })}
      onClick={() => scroller.scrollTo(target, { offset: -94, duration: 500, smooth: true })}
    />
  );
}
