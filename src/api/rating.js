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
type SubmitResponse = {
  error: number,
  message?: string,
  resource?: mixed,
};

// userId would best be pulled from the session rather than being set in the
// call to /rating.
export const submit = (
  userId: number,
  contentId: number
): Promise<SubmitResponse> => Promise.resolve({ error: 0 });
