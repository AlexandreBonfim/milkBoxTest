/**
 * A simple function to handle the responses.
 */
const responseHandler = {
  Gateway(statusCode = 502, data = {}) {
      return {
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Origin': '*',
          },
          statusCode,
          body: JSON.stringify(data),
      };
  },

  Ok(data = {}) {
      return this.Gateway(200, data);
  },
  Created(data = {}) {
      return this.Gateway(201, data);
  },
  BadRequest(data = {}) {
      return this.Gateway(400, data);
  },
  NotFound(data = {}) {
      return this.Gateway(404, data);
  },
};

export default responseHandler;
