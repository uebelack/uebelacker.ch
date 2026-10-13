import React, { useEffect, useState } from 'react';

const BASE_DATE = new Date('2004-01-01').getTime();
const CUPS_PER_MS = 3 / (24 * 60 * 60 * 1000); // ~3 cups per day

/*
  Rendered null until the first effect runs: the count depends on Date.now(),
  so computing it during render would produce different markup on the server
  and the client and break hydration.
*/
export default function CoffeeCounter() {
  const [cups, setCups] = useState(null);

  useEffect(() => {
    const update = () => setCups(Math.floor((Date.now() - BASE_DATE) * CUPS_PER_MS));
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);

  if (cups === null) return null;

  return (
    <div className="coffee-counter">
      {'Powered by '}
      <span className="coffee-counter__value">{cups.toLocaleString('en-US')}</span>
      {' cups of coffee and counting ☕'}
    </div>
  );
}
