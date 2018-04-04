// @flow

import * as React from 'react';
import RatingPure from './RatingPure';
import { type IconType } from '../Icons';

type State = {
  rating: number,
  indicativeRating: number,
};

// This is the public API for this component.
// TODO: add docs
type Props = {
  average: number,
  icon: IconType,
  max: number,
  onChangeRating: number => void,
};

export default class Rating extends React.Component<Props, State> {
  state = {
    rating: 0,
    indicativeRating: 0,
  };

  onChangeIndicativeRating = (indicativeRating: number) =>
    this.setState({ indicativeRating });

  onSelectRating = (rating: number) => {
    this.setState({ rating }, () => this.props.onChangeRating(rating));
  };

  render() {
    return (
      <RatingPure
        icon={this.props.icon}
        max={this.props.max}
        rating={this.state.rating}
        indicativeRating={this.state.indicativeRating}
        onChangeIndicativeRating={this.onChangeIndicativeRating}
        onChangeRating={this.onSelectRating}
      />
    );
  }
}
