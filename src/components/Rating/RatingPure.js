// @flow

import * as React from 'react';
import styled from 'styled-components';
import RatingItem from './RatingItem';
import { type IconType } from '../Icons';

const Container = styled.div`
  background-image: linear-gradient(#000000aa, #000);
  border-radius: 8px;
  padding: 18px;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 240px;
`;

const StarItemsContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
`;

const Headline = styled.h3`
  color: white;
  margin-top: 0;
  text-align: center;
`;

type Props = {
  // Icon is compulsory so that we don't automatically import an icon that the
  // user does not need so that we can eventually take advantage of tree
  // shaking.
  icon: React.ComponentType<{ color: string }>,
  max?: number,
  average?: number,
  rating?: number,
  indicativeRating?: number,
  onChangeIndicativeRating?: number => void,
  onChangeRating?: number => void,
  onSelectRating?: number => void,
};

const STAR_COLOR = '#6af';
const NOOP = () => {};

export default ({
  icon,
  max = 5,
  average = 0,
  rating = 0,
  indicativeRating = 0,

  // we can noop these so that they don't error if they aren't provided.
  // Documentation is the best place for this behaviour.
  onChangeIndicativeRating = NOOP,
  onChangeRating = NOOP,
  onSelectRating = NOOP,
}: Props) => {
  const ratingItems = [];

  // This could put the index in a data attribute, then we could pass through a
  // generic function that reads the attribute instead of creating a new
  // function for each rating item, but it's possibly a premature optimisation in this
  // case.
  for (let ratingItemIndex = 1; ratingItemIndex <= max; ratingItemIndex++) {
    ratingItems.push(
      <RatingItem
        key={ratingItemIndex}
        active={indicativeRating >= ratingItemIndex}
        selected={rating >= ratingItemIndex}
        color={STAR_COLOR}
        icon={icon}
        onClick={() => onChangeRating(ratingItemIndex)}
        onMouseEnter={() => onChangeIndicativeRating(ratingItemIndex)}
      />
    );
  }

  return (
    <Container>
      <Headline>So... what did you think? {rating}</Headline>
      <StarItemsContainer onMouseLeave={() => onChangeIndicativeRating(0)}>
        {ratingItems}
      </StarItemsContainer>
    </Container>
  );

  // shouldComponentUpdate
};
