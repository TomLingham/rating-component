// @flow

import * as React from 'react';

import RatingPure from './RatingPure';
import { type RatingIconType } from '../RatingIcons';

type State = {
  rating: number,
  indicativeRating: number,
};

// This is the public API for this component.
// TODO: add/generate docs
type Props = {
  average?: number,
  max?: number,
  color?: string,

  // Icon is compulsory so that we don't automatically import an icon that the
  // user does not need so that we can eventually take advantage of tree
  // shaking.
  icon: RatingIconType,
  onChangeRating: number => void,
};

export default class Rating extends React.Component<Props, State> {
  static defaultProps = {
    // We can noop this instead of erroring for a better dev experience.
    onChangeRating: () => {},
  };

  state = {
    rating: 0,
    indicativeRating: 0,
  };

  onChangeIndicativeRating = (indicativeRating: number) => {
    this.setState({ indicativeRating });
  };

  onSelectRating = (rating: number) => {
    this.setState({ rating }, () => this.props.onChangeRating(rating));
  };

  render() {
    const { icon, max = 5, average = 0, color = '#ffd60b' } = this.props;

    if (__DEV__) {
      if (!icon) throw new Error('`icon` prop must be provided.');
      if (max < 1) throw new Error('`max` prop must be greater than or equal to 1.');
      if (average < 0) throw new Error('`average` prop must be greater than or equal to 0.');
    }

    return (
      <RatingPure
        icon={icon}
        color={color}
        max={max}
        average={average}
        rating={this.state.rating}
        indicativeRating={this.state.indicativeRating}
        onChangeIndicativeRating={this.onChangeIndicativeRating}
        onChangeRating={this.onSelectRating}
      />
    );
  }
}
