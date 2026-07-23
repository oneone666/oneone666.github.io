# Signing API Requests

Sign each authenticated API request with your secret key and send the result in the `X-Signature` header.

::: tip
The secret key returned by the Login endpoint is unique to your reseller account. Keep it confidential and generate signatures only on your server.
:::

## Signature Algorithm

Sign the request data using HMAC-SHA256 and encode the result as a lowercase hexadecimal string.

::: warning
HMAC signing is not encryption. It verifies that a request was created by a client that has the secret key and that the signed request data was not changed.
:::

## Build the Signature

The signature is calculated from:

- The uppercase HTTP method
- The complete request URL
- The compact JSON request body, when a body is present

Join each value with one newline character (`\n`). Do not add a newline after the final value.

::: warning
Do not sort the JSON keys. Create one compact JSON string and use that same string both when calculating the signature and as the HTTP request body.
:::

### Request With Payload

For this request:

```json
{
  "foo": "bar",
  "baz": "qux"
}
```

Create a compact JSON string. The key order must remain unchanged:

```plaintext
{"foo":"bar","baz":"qux"}
```

For a `POST` request to `https://games.oneone.com/demo-api/orders`, sign this exact string:

```plaintext
POST
https://games.oneone.com/demo-api/orders
{"foo":"bar","baz":"qux"}
```

The invisible separators between the three lines above are single `\n` characters.

### Request Without Payload

For a request without a body, sign only the method and complete URL:

```plaintext
GET
https://games.oneone.com/demo-api/orders
```

The complete URL includes the query string. Its parameter order and encoding must match the URL sent to the API.

## Code Examples

The following examples generate the same lowercase hexadecimal signature. The `body` variable must also be used as the HTTP request body.

::: code-group

```javascript [JavaScript]
const crypto = require('crypto');

const secretKey = 'your-secret-key';
const method = 'POST';
const url = 'https://games.oneone.com/demo-api/orders';
const body = JSON.stringify({
  foo: 'bar',
  baz: 'qux',
});

const data = `${method}\n${url}\n${body}`;
const signature = crypto
  .createHmac('sha256', secretKey)
  .update(data, 'utf8')
  .digest('hex');
```

```php [PHP]
<?php

$secretKey = 'your-secret-key';
$method = 'POST';
$url = 'https://games.oneone.com/demo-api/orders';
$body = json_encode([
    'foo' => 'bar',
    'baz' => 'qux',
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

$data = implode("\n", [$method, $url, $body]);
$signature = hash_hmac('sha256', $data, $secretKey);
```

```python [Python]
import hashlib
import hmac
import json

secret_key = "your-secret-key"
method = "POST"
url = "https://games.oneone.com/demo-api/orders"
body = json.dumps(
    {
        "foo": "bar",
        "baz": "qux",
    },
    ensure_ascii=False,
    separators=(",", ":"),
)

data = f"{method}\n{url}\n{body}"
signature = hmac.new(
    secret_key.encode("utf-8"),
    data.encode("utf-8"),
    hashlib.sha256,
).hexdigest()
```

:::

::: warning
Do not serialize the request body again after generating the signature. Send the exact value stored in `body`.
:::

## X-Signature Header

Include the lowercase hexadecimal signature in the `X-Signature` header:

```bash
curl --request GET 'https://games.oneone.com/demo-api/orders' \
  --header 'Accept: application/json' \
  --header 'X-Signature: <lowercase-hex-signature>' \
  --header 'Authorization: Bearer <token>'
```

For requests with a JSON body, also send `Content-Type: application/json`.

## Common Signature Mismatches

- Sorting JSON keys before signing
- Signing formatted JSON but sending compact JSON, or the reverse
- Serializing the request body a second time after signing
- Omitting query parameters from the signed URL
- Changing query parameter order or URL encoding after signing
- Adding an extra newline at the end of the signature data
- Returning Base64 instead of lowercase hexadecimal output

## Invalid Signature

An invalid or missing signature returns an HTTP `403` response.

::: tip
A gentle reminder, for the empty value key, please use `null` instead of an empty string `""`, or remove the key-value pair.
:::

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
