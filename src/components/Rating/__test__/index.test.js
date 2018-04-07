// @flow

import * as React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

import Rating from '../';
import RatingPure from '../';
import RatingItem from '../RatingItem';

const MockIcon = () => <div>+</div>;

describe('<Rating />', () => {
  it('should render the default snapshot', () => {
    const tree = renderer.create(<Rating icon={MockIcon} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have the same number rating items as the value passed in the prop "max"', () => {
    // Dive down so that the RatingPure component is expanded.
    const comp = shallow(<Rating max={8} icon={MockIcon} />).dive();

    expect(comp.find(RatingItem)).toHaveLength(8);
  });

  it('should call onChangeRating with the rating value that was selected', () => {
    const onChangeRating = jest.fn();
    const comp = shallow(
      <Rating max={8} onChangeRating={onChangeRating} icon={MockIcon} />
    ).dive();

    comp.childAt(2).simulate('click');

    expect(onChangeRating).toHaveBeenCalledWith(3);
  });

  it('should display the average rating that was passed in.', () => {
    const comp = shallow(
      <Rating max={8} average={5.3} icon={MockIcon} />
    ).dive();

    // Loop over all the rating items. `fillPercentage` should add up to the
    // average rating.
    const result = comp
      .find(RatingItem)
      .reduce((avg, next) => avg + next.props().fillPercentage, 0);

    expect(result).toBe(5.3);
  });

  it('should throw if no `icon` prop is passed.', () => {
    // $FlowFixMe : supress Flow error.
    expect(() => shallow(<Rating />)).toThrowErrorMatchingSnapshot();
  });

  it('should throw if `max` prop is less than 1.', () => {
    expect(() =>
      shallow(<Rating icon={MockIcon} max={0} />)
    ).toThrowErrorMatchingSnapshot();
  });

  it('should throw if `average` prop is less than 0.', () => {
    expect(() =>
      shallow(<Rating icon={MockIcon} average={-1} />)
    ).toThrowErrorMatchingSnapshot();
  });
});
