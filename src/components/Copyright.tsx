import React from 'react';
import { Stack } from 'rsuite';

const Copyright = () => {
  return (
    <Stack className="copyright" justifyContent="center" style={{ height: 40, marginTop: 20 }}>
      <div className="container">
        <p>
          Made with ❤️ by{' '}
          <a href="https://developerb2.com" target="_blank" rel="noreferrer">
            developerb2
          </a>
        </p>
      </div>
    </Stack>
  );
};

export default Copyright;
