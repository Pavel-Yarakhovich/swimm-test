import React, { useEffect, useRef } from 'react';
import { Link } from 'gatsby';

const ButtonLink = ({ to, href, children, handleRef, ...restProps }) => {
  const ref = useRef();

  useEffect(() => {
    if (typeof handleRef !== 'function') return;
    handleRef(ref.current);
  }, [ref.current?.scrollWidth, handleRef]);

  return (
    <>
      {to ? (
        <Link
          ref={ref}
          {...restProps}
          to={to}>
          {children}
        </Link>
      ) : href ? (
        <a
          ref={ref}
          {...restProps}
          href={href}>
          {children}
        </a>
      ) : (
        <button
          ref={ref}
          {...restProps}>
          {children}
        </button>
      )}
    </>
  );
};

export default ButtonLink;
