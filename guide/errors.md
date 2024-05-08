# Error Codes

## HTTP Status Codes Summary

The following HTTP status codes are used in the response of the payment API.

| Status Code | Description       | Details                                    |
| ----------- | ----------------- | ------------------------------------------ |
| 200         | OK                | Everything worked as expected.             |
| 401         | Unauthorized      | No valid authentication provided.          |
| 403         | Forbidden         | Lack of permission to access the resource. |
| 404         | Not Found         | The requested resource could not be found. |
| 422         | Bad Request       | Failed due to validation errors.           |
| 429         | Too Many Requests | Too many requests hit the API too quickly. |
| 500         | Server Error      | Something went wrong on the server.        |

## Error Codes Summary

The following error codes are used in the response of the payment API.

| Error Code            | Description              |
| --------------------- | ------------------------ |
| UNKNOWN_ERROR         | Unknown error            |
| UNAUTHORIZED          | Unauthorized request     |
| TOO_MANY_REQUESTS     | Too many request         |
| MISSING_HMAC          | Missing signature header |
| INVALID_HMAC          | Invalid HMAC signature   |
| VALIDATION_ERROR      | Validation failed        |
| UNPROCESSABLE_CONTENT | Validation error         |
| RESOURCE_NOT_FOUND    | Resource not found       |
| PAYMENT_ERROR         | Payment failed           |
| LIST_ERROR            | List resources error     |
| SHOW_ERROR            | Show resource error      |
| CREATE_ERROR          | Create resource error    |
| UPDATE_ERROR          | Update resource error    |
| DELETE_ERROR          | Delete resource error    |
