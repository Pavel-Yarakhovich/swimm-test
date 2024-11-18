import { withPrefix } from 'gatsby';
import * as React from 'react';

import { CircularLoader } from './CircularLoader';

const Loader = () => {
  const pathPrefix = withPrefix('/');

  // IntlProvider
  return (
    <>
      <div
        data-path-prefix={pathPrefix}
        id="preloader"
        className={`fixed w-full h-full top-0 three_spinner_container pointer-events-none transition-opacity duration-500`}
        style={{
          zIndex: 60,
        }}>
        <div
          className="absolute pointer-events-none w-full f-full -z-10"
          style={{
            height: `calc(100% + 200px)`,
            backgroundImage: `linear-gradient(#00000040,#00000040), url("${withPrefix(
              '/img/MZ1-Erfgoedinkomjaren90.jpg'
            )}")`,
            marginTop: '200px',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}></div>
        <div
          id="preloader-main"
          className="w-full h-full flex justify-center items-center flex-col bg-darkgray transition-colors duration-1000">
          <CircularLoader
            id="circular-loader"
            style={{ marginBottom: '1.5rem' }}
            data-preload-progress="0"
          />
        </div>
      </div>
    </>
  );
};

export default Loader;
