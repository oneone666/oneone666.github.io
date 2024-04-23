# Authentication

Accessing the API requires authentication using an authentication token.

All endpoints that require authentication are marked with a "requires authentication" badge in the documentation.

## Authentication Token

To obtain an authentication token, you must first sign up for an account and retrieve the token from the login endpoint.

## How to Use

To authenticate your request, include an Authorization header with the following value:

```plaintext
Bearer {YOUR_AUTH_TOKEN}
```

For example, if your authentication token is 123|lN7SSRDMDAvpJGve4VWabxanL5fZPN9vv6OCJ6IKee413ad8, your request would look like this:

```bash
curl --request GET 'https://games.oneone.com/demo-api/orders' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer 123|lN7SSRDMDAvpJGve4VWabxanL5fZPN9vv6OCJ6IKee413ad8' \
```

## Invalid Token

An expired or invalid token will result in a 401 Unauthorized response.

Each time you obtain a new token, all previous tokens associated with your account will be invalidated.
