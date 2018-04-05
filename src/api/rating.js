// @flow

// Simulate GET /rating/:contentId
type RatingResponse = {
  contentId: number,
  average: number,
};

export const fetchRating = (contentId: number): Promise<RatingResponse> =>
  Promise.resolve({
    contentId,
    average: 3.5,
  });

// Simulate POST /rating
// userId would best be pulled from the session rather than being set in the
// call to /rating.
export const submitRating = (
  userId: number,
  contentId: number,
  rating: number
): Promise<RatingResponse> => Promise.resolve({ contentId, average: 3.0 });
