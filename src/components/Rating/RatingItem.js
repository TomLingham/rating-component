// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';

import { type RatingIconType } from '../RatingIcons';

const zoomMixin = css`
  svg {
    transform: scale(1.2);
  }
`;

const Container = styled.span`
  cursor: pointer;
  padding: 0 4px;
  width: 100%;
  transition: zoom 180ms, opacity 180ms;
  opacity: ${p => (p.selected || p.active ? 1 : 0.5)};
  ${p => p.active && zoomMixin};
`;

type Props = {
  color: string,
  icon: RatingIconType,
  active: boolean,
  selected: boolean,
  fillPercentage: number,
};

export default ({
  color = '#fff',
  icon: Icon,
  fillPercentage,
  ...props
}: Props) => {
  return (
    <Container {...props}>
      <Icon color={color} fillPercentage={fillPercentage} />
    </Container>
  );
};
