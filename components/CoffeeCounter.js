import React, { useEffect, useState } from 'react';

const BASE_DATE = new Date('2004-01-01').getTime();
const CUPS_PER_MS = 3 / (24 * 60 * 60 * 1000); // ~3 cups per day

export default function CoffeeCounter() {
  const [cups, setCups] = useState(null);

  useEffect(() => {
    const update = () => {
      const elapsed = Date.now() - BASE_DATE;
      setCups(Math.floor(elapsed * CUPS_PER_MS));
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);

  if (cups === null) return null;

  return (
    <div className="text-gray-dark dark:text-gray text-sm mt-2">
      Powered by {cups.toLocaleString()} cups of coffee and counting ☕
    </div>
  );
}
