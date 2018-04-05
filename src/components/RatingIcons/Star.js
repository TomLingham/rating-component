// @flow

import * as React from 'react';

import { type RatingIconProps } from './';

// TODO: jsDoc
function calcStarFill(percentage = 1) {
  return 15.5 * Math.min(Math.max(0, percentage), 1);
}

export default ({ color, fillPercentage = 1 }: RatingIconProps) => (
  <svg fill={color} viewBox="0 0 24 24">
    <defs>
      <path
        id="a"
        d="M12,17.3l6.2,3.7l-1.6-7L22,9.2l-7.2-0.6L12,2L9.2,8.6L2,9.2L7.5,14l-1.6,7L12,17.3z"
      />
    </defs>
    <clipPath id="b">
      <use href="#a" style={{ overflow: 'visible' }} />
    </clipPath>
    <rect
      x="4.3"
      y="2"
      style={{ clipPath: 'url(#b)' }}
      width={calcStarFill(fillPercentage)}
      height="19"
    />
    <path
      d="M12,4.6L13.9,9l0.2,0.6l0.6,0.1l4.8,0.4l-3.7,3.2l-0.5,0.4l0.1,0.6l1.1,4.7l-4.2-2.5L12,16.1l-0.5,0.3l-4.2,2.5l1.1-4.7
		l0.1-0.6l-0.5-0.4L4.4,10l4.8-0.4l0.6-0.1L10.1,9L12,4.6 M12,2L9.2,8.6L2,9.2L7.5,14l-1.6,7l6.2-3.7l6.2,3.7l-1.6-7L22,9.2
		l-7.2-0.6L12,2L12,2z"
    />
  </svg>
);
