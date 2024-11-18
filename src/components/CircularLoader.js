import React from 'react';

export function CircularLoader(props) {
  const { progress = 0, ...restProps } = props;

  return (
    <div
      className="circular-loader w-36 relative"
      {...restProps}>
      <svg viewBox="0 0 36 36">
        <path
          className="circular-loader__path"
          stroke="white"
          strokeWidth="1"
          fill="none"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="circular-loader__path-progress"
          stroke="rgb(0, 218, 158)"
          strokeWidth="1"
          strokeDasharray={100 + progress}
          strokeDashoffset="100"
          fill="none"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div className="circular-loader-progress absolute top-0 text-green font-sans font-bold w-full h-full flex items-center justify-center bottom-0 m-auto">
        {progress || 0}%
      </div>
    </div>
  );
}
