---
lang: en-US
title: Get Started
description: Oneverse API Overview
---

# Get Started

Oneverse offers a suite of APIs is designed to seamlessly integrate with your platform. This guide will walk you through getting started with our RESTful APIs.

To begin, [sign up][email] for an account to gain access to our APIs.

Once your account is approved and you've obtained your access credentials, you'll use these credentials to authenticate your requests.

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
3. **Streamline Payments with Payment API:** Simplify your payment management processes with our robust [Payment API][paymentApi].

Now you're all set to unleash the power of Oneverse API!

[signatureAlgorithm]: /guide/signature-algorithm.md
[authentication]: /guide/authentication.md
[paymentApi]: /reference/payment-api.md
[email]: mailto:tech@oneone.com
