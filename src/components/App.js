// @flow

import * as React from 'react';
import styled from 'styled-components';

import * as api from '../api';
import Rating from './Rating';
import StarIcon from './Icons/Star';

type ApplicationState = {
  average: number,
  contentId: number,
  error: boolean,
  loaded: boolean,
  ratingSubmitted: boolean,
  userId: number,
  userRatings: { [mixed]: number },
};

const MockContent = styled.div`
  margin: 40px auto;
  width: 400px;
`;

export default class App extends React.Component<{}, ApplicationState> {
  state = {
    userId: 4132246,
    contentId: 562135,
    average: 0,
    loaded: false,
    error: false,
    ratingSubmitted: false,
    userRatings: {}, // A Map may be more appropriate
  };

  onChangeRating = (rating: number) => {
    console.log('Submitting the rating:', rating);

    api.rating
      .submit(this.state.userId, this.state.contentId, rating)
      .then(result => console.log('Rating submitted!', result))
      .catch(error => {
        // TODO: Maybe an error case. User might prefer to just not know about it,
        // however. Probably just log or throw for capturing metrics.
      });

    // setState before worrying about what comes back from the server so that
    // the user experience is not interrupted.
    const userRatings = {
      ...this.state.userRatings,
      [this.state.contentId]: rating,
    };

    this.setState({ ratingSubmitted: true, userRatings });
  };

  componentDidMount() {
    api.rating
      .fetch(this.state.contentId)
      .then(({ average }) => this.setState({ average, loaded: true }))
      .catch(error => {
        // TODO: Perhaps an error case here.
        // However, it may be safe to assume that the user would prefer not to
        // notice if there is an error, and just display the rating stars
        // without displaying an average.
      });
  }

  render() {
    // TODO: Make this a HOC
    const { loaded, ratingSubmitted, userRatings, contentId } = this.state;
    if (!loaded) {
      return <div>Loading your rating</div>;
    }

    if (ratingSubmitted && userRatings[contentId] >= 4) {
      return (
        <MockContent>
          <p>If you liked that, you might like these:</p>
          <ul>
            <li>Movie 1</li>
            <li>Movie 2</li>
          </ul>
        </MockContent>
      );
    }

    if (ratingSubmitted) {
      return (
        <MockContent>
          <p>
            Thank you for your valuable feeedback. We will use this to help
            improve your experience.
          </p>
        </MockContent>
      );
    }

    return (
      <Rating
        icon={StarIcon}
        max={5}
        average={this.state.average}
        onChangeRating={this.onChangeRating}
      />
    );
  }
}
