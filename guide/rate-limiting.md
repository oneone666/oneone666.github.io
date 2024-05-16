# Rate Limiting

Oneverse API includes rate limiting information in its response headers to facilitate efficient management of API usage. The rate limit is configured at 60 requests per minute. Exceeding this limit will trigger a `429 Too Many Requests` response.

Example response when no remaining attempts are available:

```json
{
  "status": "error",
  "code": 429,
  "error": {
    "code": "TOO_MANY_REQUESTS",
    "message": "Too Many Attempts."
  },
  "data": null
}
```

## X-RateLimit-Limit

The `X-RateLimit-Limit` header specifies the maximum number of requests allowed within the defined time window. For our API, this limit is set to 60 requests per minute.

## X-RateLimit-Remaining

The `X-RateLimit-Remaining` header indicates the number of requests that can still be made before reaching the rate limit within the current time window. This value dynamically updates with each request, decreasing as requests are made, and resets when the time window elapses.
