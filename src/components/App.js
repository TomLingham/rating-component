// @flow

import * as React from 'react';
import styled from 'styled-components';

import * as api from '../api';
import Rating from './Rating';
import StarIcon from './RatingIcons/Star';

type ApplicationState = {
  average: number,
  contentId: number,
  error: boolean,
  loaded: boolean,
  ratingSubmitted: boolean,
  userId: number,
  userRatings: { [mixed]: number },
  maxStarRating: number,
};

const RatingResponse = styled.div`
  margin: 40px auto;
  width: 400px;
`;

const Container = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 260px;
`;

const RatingContainer = styled.div`
  background-image: linear-gradient(#000000aa, #000);
  border-radius: 8px;
  padding: 18px;
`;

const Headline = styled.h3`
  color: white;
  margin-top: 0;
  text-align: center;
`;

const AverageRating = styled.p`
  margin-bottom: 0;
  text-align: right;
  color: white;
  font-size: 0.8em;
`;

export default class App extends React.Component<{}, ApplicationState> {
  state = {
    average: 0,
    contentId: 562135,
    userId: 4132246,
    error: false,
    loaded: false,
    ratingSubmitted: false,
    userRatings: {}, // A Map may be more appropriate
    maxStarRating: 5,
  };

  onChangeRating = (rating: number) => {
    console.log('Submitting the rating:', rating);

    api.rating
      .submitRating(this.state.userId, this.state.contentId, rating)
      .then(result => console.log('Rating submitted!', result))
      .catch(error => {
        console.error(error);
        // TODO: Maybe an error case. User might prefer to just not know about
        // it, however. Probably just log or throw for capturing metrics.
      });

    // setState before worrying about what comes back from the server so that
    // the user experience is not interrupted.
    const userRatings = {
      ...this.state.userRatings,
      [this.state.contentId]: rating,
    };

    this.setState({ userRatings, ratingSubmitted: true });
  };

  componentDidMount() {
    api.rating
      .fetchRating(this.state.contentId)
      .then(({ average }) => this.setState({ average, loaded: true }))
      .catch(error => {
        console.error(error);
        // TODO: Perhaps an error case here. However, it may be safe to assume
        // that the user would prefer not to notice if there is an error, and
        // just display the rating stars without displaying an average.
      });
  }

  render() {
    // TODO: Handle the loading state with a HOC
    const {
      average,
      contentId,
      loaded,
      maxStarRating,
      ratingSubmitted,
      userRatings,
    } = this.state;

    const rating = userRatings[contentId];
    const isPositiveRating = rating >= 4;

    if (!loaded) {
      return <div>Loading your rating</div>;
    }

    return (
      <Container>
        <RatingContainer>
          <Headline>So... what did you think?</Headline>
          <Rating
            average={average}
            icon={StarIcon}
            max={maxStarRating}
            onChangeRating={this.onChangeRating}
          />
          <AverageRating>Average: {average}/{maxStarRating}</AverageRating>
        </RatingContainer>
        {ratingSubmitted ? (
          <RatingResponse>
            <h3>
              You rated the movie {rating}/{maxStarRating} stars!
            </h3>
            {isPositiveRating ? (
              <>
                <p>If you liked that, you might like these:</p>
                <ul>
                  <li>Movie 1</li>
                  <li>Movie 2</li>
                </ul>
              </>
            ) : (
              <p>
                Thank you for your valuable feeedback. We will use this to help
                improve your experience.
              </p>
            )}
          </RatingResponse>
        ) : null}
      </Container>
    );
  }
}
