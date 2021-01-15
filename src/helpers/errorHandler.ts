/**
 * A simple function to handle the errors.
 */
 export default function getErrorResponse(code: number, errorMessage: string) {
  return {
    statusCode: code,
    body: JSON.stringify({
      message: errorMessage,
    }),
  };
};
