//src/app/Components/Buttons MaroonButton.tsx
import React from 'react';

const MaroonButton = ({ children, href }) => {
  return (
    <a href={href}>
      <button className="ctaFindButton rounded bg-maroon-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-maroon-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon-600">
        {children}
      </button>
    </a>
  );
};

export default MaroonButton;
