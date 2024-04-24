---
lang: en-US
title: Oneverse Payment API
description: Oneverse Payment API documentation
---

# Payment API

Our Payment API facilitates efficient management of your payments.

::: tip
All Payment API endpoints require authentication. Refer to the [Authentication](/guide/authentication.md) guide for details.
:::

::: tip
To sign your API requests with a secret key, follow the instructions in the [Signature Algorithm](/guide/signature-algorithm.md) guide.
:::

## Table of Contents

[[toc]]

## Rate Limiting

The Payment API enforces a rate limit of 60 requests per minute. Exceeding this limit results in a 429 Too Many Requests response.

## Errors

Standard HTTP status codes are used by the Payment API to indicate the success or failure of an API request. For more information, see the [Errors](/guide/errors.md) guide.

## Endpoints

### Login

POST `/payment-api/login`

Authenticate using UUID and password. Returns a token for subsequent requests.

> Body Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| login     | string | yes      | UUID        |
| password  | string | yes      | Password    |

```json
{
  "login": "3aa02408-a7fb-320a-8560-56b974f5daa0",
  "password": "password"
}
```

<hr>

> 200 Response Fields

| Field | Type   | Description          |
| ----- | ------ | -------------------- |
| token | string | Authentication token |

```json
{
  "token": "123|lN7SSRDMDAvpJGve4VWabxanL5fZPN9vv6OCJ6IKee413ad8"
}
```
<hr>

> 401 Response Fields

| Field | Type   | Description   |
| ----- | ------ | ------------- |
| error | string | Error message |

```json
{
  "error": "Invalid credentials"
}
```
<hr>

### List Orders

GET `/payment-api/transactions` <Badge text="Requires authentication" type="warning"/>

Retrieve a list of all orders.

> Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

> 200 Response Fields

| Field | Type  | Description    |
| ----- | ----- | -------------- |
| data  | array | List of orders |

```json
{
  "data": [
    {
      "order_id": "01HW4S5YXS7GARVFX3PEVRRDS4",
      "reference": "569c420e-5739-3eb5-b52a-9a51ce38f0ba",
      "merchant_uuid": "25f0a63d-568f-3101-8181-86a595396e5d",
      "game_name": "ragnarok-origin-global",
      "payment_channel": "for_testing",
      "amount_cents": 10000,
      "currency": "MYR",
      "title": "Payment for game",
      "description": "Payment for game",
      "item_code": null,
      "status": "expired",
      "paylink": "https://games.oneone.com/payment-api/orders/01HW4S5YXS7GARVFX3PEVRRDS4",
      "verify_url": "https://games.oneone.com/payment-api/transactions/01HW4S5YXS7GARVFX3PEVRRDS4"
    }
  ]
}
```

<hr>

### Create Order

POST `/payment-api/transactions` <Badge text="Requires authentication" type="warning"/>

Create a new order.

> Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

> Body Parameters

| Parameter               | Type   | Required | Description                       |
| ----------------------- | ------ | -------- | --------------------------------- |
| merchant_transaction_id | string | yes      | Unique reference                  |
| merchant_uuid           | string | yes      | Merchant UUID                     |
| game_name               | string | yes      | Game name                         |
| game_character          | string | no       | Game character ID                 |
| country                 | string | yes      | Country code in iso_3166_2 format |
| payment_channel         | string | yes      | Payment channel                   |
| amount_cents            | int    | yes      | Amount in cents                   |
| currency                | string | yes      | Currency                          |
| title                   | string | yes      | Title                             |
| description             | string | no       | Description                       |
| item_code               | string | no       | Item code                         |
| merchant_return_url     | string | yes      | Merchant return URL               |

```json
{
  "reference": "569c420e-5739-3eb5-b52a-9a51ce38f0ba",
  "merchant_uuid": "25f0a63d-568f-3101-8181-86a595396e5d",
  "game_name": "ragnarok-origin-global",
  "payment_channel": "for_testing",
  "amount_cents": 10000,
  "currency": "MYR",
  "title": "Payment for game",
  "description": "Payment for game",
  "item_code": null
}
```

<hr>

> 200 Response Fields

| Field   | Type   | Description    |
| ------- | ------ | -------------- |
| order   | object | Order data     |
| code    | int    | Status code    |
| message | string | Status message |

```json
{
  "order": {
    "order_id": "01HW4S5YXS7GARVFX3PEVRRDS4",
    "reference": "569c420e-5739-3eb5-b52a-9a51ce38f0ba",
    "merchant_uuid": "25f0a63d-568f-3101-8181-86a595396e5d",
    "game_name": "ragnarok-origin-global",
    "payment_channel": "for_testing",
    "amount_cents": 10000,
    "currency": "MYR",
    "title": "Payment for game",
    "description": "Payment for game",
    "item_code": null,
    "status": "pending",
    "paylink": "https://games.oneone.com/payment-api/orders/01HW4S5YXS7GARVFX3PEVRRDS4",
    "verify_url": "https://games.oneone.com/payment-api/transactions/01HW4S5YXS7GARVFX3PEVRRDS4"
  },
  "code": 2001,
  "message": "Payment transaction created successfully."
}
```

<hr>

### Get Order

GET `/payment-api/transactions/{order_id}` <Badge text="Requires authentication" type="warning"/>

Retrieve details of a specific order.

> Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

> URL Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| order_id  | string | yes      | Order ID    |

<hr>

> 200 Response Fields

| Field | Type   | Description |
| ----- | ------ | ----------- |
| order | object | Order data  |

```json
{
  "order": {
    "order_id": "01HW4S5YXS7GARVFX3PEVRRDS4",
    "reference": "569c420e-5739-3eb5-b52a-9a51ce38f0ba",
    "merchant_uuid": "25f0a63d-568f-3101-8181-86a595396e5d",
    "game_name": "ragnarok-origin-global",
    "payment_channel": "for_testing",
    "amount_cents": 10000,
    "currency": "MYR",
    "title": "Payment for game",
    "description": "Payment for game",
    "item_code": null,
    "status": "pending",
    "paylink": "https://games.oneone.com/payment-api/orders/01HW4S5YXS7GARVFX3PEVRRDS4",
    "verify_url": "https://games.oneone.com/payment-api/transactions/01HW4S5YXS7GARVFX3PEVRRDS4"
  }
}
```

<hr>

## Callbacks

### Payment Success Callback

After a successful payment, the transaction status will be updated to "paid". We will send a POST request to your callback URL with the transaction resource as payload in JSON format:

```json
{
  "order_id": "01HW4S5YXS7GARVFX3PEVRRDS4",
  "reference": "569c420e-5739-3eb5-b52a-9a51ce38f0ba",
  "merchant_uuid": "25f0a63d-568f-3101-8181-86a595396e5d",
  "game_name": "ragnarok-origin-global",
  "payment_channel": "for_testing",
  "amount_cents": 10000,
  "currency": "MYR",
  "title": "Payment for game",
  "description": "Payment for game",
  "item_code": null,
  "status": "paid",
  "paylink": "https://games.oneone.com/payment-api/orders/01HW4S5YXS7GARVFX3PEVRRDS4",
  "verify_url": "https://games.oneone.com/payment-api/transactions/01HW4S5YXS7GARVFX3PEVRRDS4"
}
```

Ensure that your callback URL returns a 200 status code upon successful processing. We will retry the callback up to 3 times if it fails.
