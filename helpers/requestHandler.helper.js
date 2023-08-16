export const RequestHandler = {
    Success: ({ res, statusCode = 200, message = "Success", data }) => {
      if (statusCode >= 300) {
        throw Error(
          "User HandleError() function instead to serve error responses"
        );
      }
      res.status(statusCode).send({
        result: 1,
        statusCode,
        message,
        data,
      });
    },
    Error: ({
      res,
      statusCode = 500,
      message = "Error",
      data,
      error = "No specific error data provided",
    }) => {
      if (statusCode === 401) {
        throw Error(
          "User Unauthorized() function instead to serve Unauthorized responses"
        );
      }
      res.status(statusCode).send({
        result: 0,
        statusCode,
        err_msg: error instanceof Error ? error.message : error.msg || error,
        message,
        data,
      });
    },
    Unauthorized: ({
      res,
      statusCode = 401,
      error = "Unauthorized",
    }) => {
      res.status(statusCode).send({
        result: 0,
        statusCode: 401,
        err_msg: error instanceof Error ? error.message : error.msg || error,
      });
    },
  }; 