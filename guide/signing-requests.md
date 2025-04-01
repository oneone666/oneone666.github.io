# Signing API Requests

The signed request adds an extra layer of security by signing your API requests with a secret key. This guide explains how to sign your requests and send them to the server.

::: tip
Your secret key, unique to your account, serves as your signature key and must be kept confidential.
:::

## Signature Algorithm

The signature algorithm uses the HMAC SHA256 hashing algorithm to sign your API requests. The signature ensures the integrity and authenticity of your requests.

::: warning
To ensure the security of your API credentials, it's recommended that API signatures are not generated on the frontend, as this could lead to potential exposure of sensitive information.
:::

## How It Works

1. **Get your secret key:** First, get a secret key specific to your account.
2. **Build the data string:** Construct the data string with the request method, URL, and payload.
3. **Sign your request:** Use your secret key to sign the data string.
4. **Send the signed request:** Transmit the signed request to the server.

::: tip
Ensure that you sign your requests using the `HMACSHA256` algorithm.
:::

## Examples

- [Request With Payload](#request-with-payload)
- [Request Without Payload](#request-without-payload)
- [Add the Signature to Request Header](#x-signature-header)

### Request With Payload

If your request contains payload like this:

```json
{
  "foo": "bar",
  "baz": "qux"
}
```

Sort the payload's JSON keys alphabetically and compact it:

```plaintext
{"baz":"qux","foo":"bar"}
```

Construct the data string by concatenating the HTTP method, URL, and JSON-encoded payload in this format:

```plaintext
<HTTP-Method>\n<HTTP-URI>\n<payload>
```

For example, when sending a POST request to https://games.oneone.com/demo-api/orders with the provided payload, the data string should be:

```plaintext
POST\n
https://games.oneone.com/demo-api/orders\n
{"baz":"qux","foo":"bar"}
```

Hash the data string with the secret key using the HMAC SHA256 algorithm:

```php
hash_hmac('sha256', $data, 'secret_value');
```

The hashed value from the example should be `d46691367c13a98fe93e9cb2d4de6010792bb670e2e5a63b24765e950a1c9d73`.

### Request Without Payload

If your request does not contain a payload, construct the data string by concatenating the HTTP method and URL in this format:

```plaintext
<HTTP-Method>\n<HTTP-URI>
```

For instance, when sending a GET request to https://games.oneone.com/demo-api/orders, the data string should be:

```plaintext
GET\n
https://games.oneone.com/demo-api/orders
```

Hash the data string with the secret key using the HMAC SHA256 algorithm:

```php
hash_hmac('sha256', $data, 'secret_value');
```

The hashed value from the example should be `c6056f6fbd2ba8016373619de793b37eb4f45c975af49b2919e3809a7ffe816f`.

## X-Signature Header

Once you have the hashed value, include it in the `X-Signature` header for every API request. For example:

```bash
curl --request GET 'https://games.oneone.com/demo-api/orders' \
--header 'Content-Type: application/json' \
--header 'X-Signature: d46691367c13a98fe93e9cb2d4de6010792bb670e2e5a63b24765e950a1c9d73' \
--header 'Authorization: Bearer 123|lN7SSRDMDAvpJGve4VWabxanL5fZPN9vv6OCJ6IKee413ad8' \
--data-raw '{"foo": "bar", "baz": "qux"}'
```

This method ensures the integrity and authenticity of your API requests.

## Invalid Signature

An invalid signature will result in a `403 Unauthorized` response. Ensure that the signature is correctly generated and included in the request header.

Example response of missing signature:

```json
{
  "status": "error",
  "code": 403,
  "error": {
    "code": "MISSING_HMAC",
    "message": "Missing HMAC header"
  },
  "data": null
}
```

Example response of an invalid signature:

```json
{
  "status": "error",
  "code": 403,
  "error": {
    "code": "INVALID_HMAC",
    "message": "Invalid HMAC hash"
  },
  "data": null
}
```
