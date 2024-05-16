# Error Codes

When an API request encounters an error, Oneverse API returns a response message containing error details and a corresponding HTTP status code. This guide provides a summary of the error codes and HTTP status codes used across the Oneverse API.

## HTTP Status Codes Summary

Oneverse returns specific HTTP status codes in the response header.

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

The following error codes are used in the response body.

| Error Code            | Description                          |
| --------------------- | ------------------------------------ |
| UNKNOWN_ERROR         | Unknown error                        |
| UNAUTHORIZED          | Unauthorized request                 |
| TOO_MANY_REQUESTS     | Too many request                     |
| TOO_MANY_ATTEMPTS     | Too many login attempts              |
| MISSING_HMAC          | Missing signature header             |
| INVALID_HMAC          | Invalid HMAC signature               |
| INVALID_CREDENTIALS   | Invalid login credentials            |
| VALIDATION_ERROR      | Validation failed                    |
| UNPROCESSABLE_CONTENT | Validation error                     |
| RESOURCE_NOT_FOUND    | Could not find the specific resource |
| PAYMENT_ERROR         | Payment failed                       |
| LIST_ERROR            | List resources error                 |
| SHOW_ERROR            | Show resource error                  |
| CREATE_ERROR          | Create resource error                |
| UPDATE_ERROR          | Update resource error                |
| DELETE_ERROR          | Delete resource error                |

## Example Response Body

```json
{
  "status": "error",
  "code": 401,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Unauthenticated."
  },
  "data": null
}
```
