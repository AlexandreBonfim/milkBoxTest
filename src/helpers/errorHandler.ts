/**
 * A simple function to handle the errors.
 */
 export default function getErrorResponse(errorMessage: string) {
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: errorMessage,
    }),
  };
};
