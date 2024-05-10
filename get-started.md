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

* All API requests are made via HTTPS.
* All requests should include the `Accept: application/json` header.
* All responses are returned in JSON format.
* Currency is represented in cents. For example, $1.00 is represented as `100`.

## Environments

| Environment | URL                      |
| ----------- | ------------------------ |
| Production  | https://games.oneone.com |
| Sandbox     | N/A                      |

## Data Format and Encoding
The Oneverse API expects the payload data to be sent in JSON format and encoded in UTF-8.

::: tip
Ensure that the `Content-Type` header is set to `application/json` to indicate that the request body contains JSON data.
:::

## Next Steps

Excited to dive in? Let's get started:

1. **Explore Signature Algorithm:** Learn about our signature algorithm and how it adds an extra layer of security to your API requests. Check out the [Signature Algorithm][signatureAlgorithm] guide.
2. **Authentication Made Easy:** Discover how to authenticate your requests seamlessly with our [Authentication][authentication] guide.
3. **Streamline Payments with Southbound API:** Simplify your payment management processes with our robust [Southbound API][paymentApi].

Now you're all set to unleash the power of Oneverse API!

[signatureAlgorithm]: /guide/signature-algorithm.md
[authentication]: /guide/authentication.md
[paymentApi]: /reference/southbound-api.md
[email]: mailto:tech@oneone.com
