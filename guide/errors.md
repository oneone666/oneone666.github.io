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

| Error Code | Description              |
| ---------- | ------------------------ |
| 2000       | Success                  |
| 2001       | Transaction created      |
| 2002       | Callback accepted        |
| 4000       | Unknown error            |
| 4001       | Too many request         |
| 4002       | Missing signature header |
| 4003       | Invalid HMAC signature   |
| 4004       | Invalid token            |
| 4005       | Validation failed        |
| 4006       | Transaction not found    |
| 5001       | Payment failed           |
