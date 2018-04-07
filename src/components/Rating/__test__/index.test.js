import * as React from 'react';
import renderer from 'react-test-renderer';

import Rating from '../';

const MockIcon = () => <div>+</div>;

describe('<Rating />', () => {
  it('should render the default snapshot', () => {
    const tree = renderer.create(<Rating icon={MockIcon} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render 2 rating items', () => {
    const tree = renderer.create(<Rating max={2} icon={MockIcon} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
