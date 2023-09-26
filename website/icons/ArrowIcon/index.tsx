import React from 'react';

interface Props {
  direction?: 'left' | 'right';
  size: string;
}

const ArrowIcon = ({ direction, size }: Props): JSX.Element => {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024">
      <path
        d={direction === 'left' ? 'm736 64-448 448 416 448' : 'm288 64 448 448-416 448'}
        fill="none"
        stroke="#01575c"
        strokeWidth="128"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowIcon;
