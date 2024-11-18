import React, { useEffect, useRef } from 'react';
import { Link } from 'gatsby-plugin-react-i18next';

const Button = (props) => {
  const { className, to, href, children, variant, handleRef = () => {}, ...restProps } = props;
  const ref = useRef();

  useEffect(() => {
    handleRef(ref.current);
  }, [ref.current?.scrollWidth, handleRef]);

  let variantStyle = '';

  switch (variant) {
    case 'black':
      variantStyle =
        'text-black border-black [&.active]:bg-black [&.active]:text-white hover:bg-black hover:text-white ';
      break;
    case 'green':
      variantStyle =
        'text-green border-green [&.active]:bg-green [&.active]:text-black hover:bg-green hover:text-black ';
      break;
    case 'green-invert':
      variantStyle = 'text-black bg-green border-green hover:bg-transparent hover:text-green ';
      break;

    default:
      variantStyle = 'text-white border-white';
      break;
  }

  const defaultStyle = 'button whitespace-nowrap text-center border rounded-full uppercase py-3 px-6 cursor-pointer';

  return (
    <>
      {to ? (
        <Link
          ref={ref}
          {...restProps}
          to={to}
          className={`${defaultStyle} ${variantStyle} ${className}`}>
          {children}
        </Link>
      ) : href ? (
        <a
          ref={ref}
          {...restProps}
          href={href}
          className={`${defaultStyle} ${variantStyle} ${className}`}>
          {children}
        </a>
      ) : (
        <button
          ref={ref}
          {...restProps}
          className={`${defaultStyle} ${variantStyle} ${className}`}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
