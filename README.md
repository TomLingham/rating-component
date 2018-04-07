# Star Rating Component

This is a super-simple star rating component.

## To run the example

Run `npm install` in the project directory. Then, run `npm start` to boot up
the demo locally using webpack on [localhost:8080](http://localhost:8080)

Enjoy!

## How to use

```javascript
<Rating
  average={3.2}
  icon={StarIcon}
  max={MAX}
  onChangeRating={rating => console.log(`Rating ${rating}/${MAX} selected.`)}
/>
```

## Props

#### `average` : `number`

Displays and indication to the user what the average rating for the
associated item is.

#### `icon` : `Component`

The icon to use for the rating. Stars are a common choice!

#### `max` : `number`

The maxmium value of the rating that the user can select.

#### `onChangeRating` : `(rating: number) => void`

Callback fired each time the rating is changed by the user.

## Next Steps

* Better mobile support.
* See if `shouldComponentUpdate` can be utilised to prevent unecessary rerenders.
* Is SVG the best choice for file size? (Especially if doing server side rendering)
* More enzyme tests around the `mouseenter` and `mouseleave` events.
* Generate proptypes from flow types for consumers who aren't using flow.