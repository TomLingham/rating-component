// @flow

// Simulate GET /rating/:contentId
type RatingResponse = {
  contentId: number,
  average: number,
};

export const fetch = (contentId: number): Promise<RatingResponse> =>
  Promise.resolve({
    contentId,
    average: 3.2,
  });

// Simulate POST /rating
// userId would best be pulled from the session rather than being set in the
// call to /rating.
export const submit = (
  userId: number,
  contentId: number,
  rating: number
): Promise<RatingResponse> => Promise.resolve({ contentId, average: 3.4 });
