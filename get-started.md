---
lang: en-US
title: Get Started
description: Oneverse API Overview
---

# Get Started

Oneverse offers a suite of APIs is designed to seamlessly integrate with your platform. This guide will walk you through getting started with our RESTful APIs.

To begin, [sign up][email] for an account to gain access to our APIs.

Once your account is approved and you've obtained your access credentials, you'll use these credentials to authenticate your requests.

::: tip
Have you noticed an issue with our API? Please [email us][email]. We're here to help!
:::

## Convention

- All API requests are made via HTTPS.
- All requests should include the `Accept: application/json` header.
- All responses are returned in JSON format.
- Currency is represented in cents. For example, $1.00 is represented as `100`.

## Environments

| Environment | URL                        |
| ----------- | -------------------------- |
| Production  | https://games.oneone.com   |
| Sandbox     | https://staging.oneone.com |

## Request Data Format

The Oneverse API expects the payload data to be sent in JSON format and encoded in UTF-8.

::: tip
Ensure that the `Content-Type` header is set to `application/json` to indicate that the request body contains JSON data.
:::

## Response Body Structure

All responses from the Oneverse API are returned in JSON format. The response body contains the following fields:

| Field  | Description                                                                     |
| ------ | ------------------------------------------------------------------------------- |
| status | Indicates the status of the response. Possible values are `success` or `error`. |
| code   | The HTTP status code of the response.                                           |
| error  | Contains the error details if the response status is `error`.                   |
| data   | Contains the response data if the response status is `success`.                 |

### Example Response

```json
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "type": "order",
    "id": 2345678
  }
}
```

## Next Steps

Excited to dive in? Let's get started:

1. **Request Signature:** Learn about [signing API requests][sign-requests] to an extra layer of security.
2. **Authentication:** Discover how to [authenticate][authentication] your requests seamlessly.
3. **Streamline Payments:** Simplify your payment process with our robust [Southbound API][paymentApi].

Now you're all set to unleash the power of Oneverse API!

[sign-requests]: /guide/signing-requests.md
[authentication]: /guide/authentication.md
[paymentApi]: /reference/southbound-api.md
[email]: mailto:tech@oneone.com
