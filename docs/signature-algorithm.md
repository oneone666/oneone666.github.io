# Signature Algorithm

The signature algorithm adds an extra layer of security by signing your API requests with a secret key.

## How to Use

1. **Obtain a secret key** for your account.
2. **Sign your request** with the secret key.
3. **Send the signed request** to the server.

## Request With Payload

If your request contains payload like this:

```json
{
  "foo": "bar",
  "baz": "qux"
}
```

Sort the payload's JSON keys alphabetically and compact it:

```json
{"baz":"qux","foo":"bar"}
```

Construct the data string by concatenating the HTTP method, URL, and JSON-encoded payload in this format:

```plaintext
<request-method>\n<url>\n<json-payload>
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

## Request Without Payload

If your request does not contain a payload, construct the data string by concatenating the HTTP method and URL in this format:

```plaintext
<request-method>\n<url>
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

Once you have the hashed value, include it in the X-Signature header for every API request. For example:

```bash
curl --request GET 'https://games.oneone.com/demo-api/orders' \
--header 'Content-Type: application/json' \
--header 'X-Signature: d46691367c13a98fe93e9cb2d4de6010792bb670e2e5a63b24765e950a1c9d73' \
--header 'Authorization: Bearer 123|lN7SSRDMDAvpJGve4VWabxanL5fZPN9vv6OCJ6IKee413ad8' \
--data-raw '{"foo": "bar", "baz": "qux"}'
```

This method ensures the integrity and authenticity of your API requests.