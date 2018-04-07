// @flow

import * as React from 'react';
import styled from 'styled-components';

import RatingItem from './RatingItem';
import { type RatingIconType } from '../RatingIcons';

const RatingItemsContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
`;

type Props = {
  average: number,
  color: string,
  icon: RatingIconType,
  indicativeRating: number,
  max: number,
  rating: number,
  onChangeIndicativeRating?: number => void,
  onChangeRating?: number => void,
  onSelectRating?: number => void,
};

const noop = () => {};

export default ({
  average,
  color,
  icon,
  indicativeRating,
  max,
  rating,

  // we can default these callbacks to noop so that they don't error if they
  // aren't provided. Documentation is the best place for this behaviour.
  onChangeIndicativeRating = noop,
  onChangeRating = noop,
  onSelectRating = noop,
}: Props) => {
  const ratingItems = [];

  // TODO: Improve this
  // This could put the index in a data attribute, then we could pass through a
  // generic function that reads the attribute instead of creating a new
  // function for each rating item, but it's possibly a premature optimisation
  // in this case.
  for (let ratingItemIndex = 1; ratingItemIndex <= max; ratingItemIndex++) {
    const isSelected = rating >= ratingItemIndex;
    const isActive = indicativeRating >= ratingItemIndex;
    let fillPercentage = 1;

    if (!isActive && !isSelected) {
      // Bound the values here too just to make the api a little nicer to test
      fillPercentage = Math.max(Math.min(average - ratingItemIndex + 1, 1), 0);
    }

    ratingItems.push(
      <RatingItem
        key={ratingItemIndex}
        active={isActive}
        selected={isSelected}
        fillPercentage={fillPercentage}
        color={color}
        icon={icon}
        onClick={() => onChangeRating(ratingItemIndex)}
        onMouseEnter={() => onChangeIndicativeRating(ratingItemIndex)}
      />
    );
  }

  return (
    <RatingItemsContainer onMouseLeave={() => onChangeIndicativeRating(0)}>
      {ratingItems}
    </RatingItemsContainer>
  );
};
