---
outline: deep
---

# Northbound API

Northbound API is designed to be used by merchants to create and manage orders.

::: tip
All Northbound API endpoints require authentication. Refer to the [Authentication](/guide/authentication.md) guide for details.
:::

::: tip
To sign your API requests with a secret key, follow the instructions in the [Signing Requests](/guide/signing-requests.md) guide.
:::

## Endpoints

### Login

POST `/api/northbound/login`

Authenticate using UUID and password. Returns a token for subsequent requests.

::: details Body Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| login     | string | yes      | UUID        |
| password  | string | yes      | Password    |

:::

```json
{
  "login": "3aa02408-a7fb-320a-8560-56b974f5daa0",
  "password": "secret"
}
```

::: details Response Fields

| Field | Type   | Description          |
| ----- | ------ | -------------------- |
| token | string | Authentication token |
| error | string | Error message        |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "token": "234|MUcPNPf2mS30sXbUSWBCnuVWEeNmgHb3oSCjiWzv0a46ede0"
  }
}
```

```json [401]
{
  "status": "error",
  "code": 401,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid credentials"
  },
  "data": null
}
```

```json [422]
{
  "status": "error",
  "code": 422,
  "error": {
    "code": "UNPROCESSABLE_CONTENT",
    "message": "The login field is required. (and 1 more error)",
    "errors": {
      "login": ["The login field is required."],
      "password": ["The password field is required."]
    }
  },
  "data": null
}
```

:::

<hr />

### List Orders <Badge text="Requires authentication" type="warning"/>

GET `/api/northbound/transactions`

Retrieve a list of all orders.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details Response Fields

| Field | Type  | Description                                                      |
| ----- | ----- | ---------------------------------------------------------------- |
| data  | array | List of [`Order Transaction`](#order-transaction-object) objects |
| links | array | Pagination links                                                 |
| meta  | array | Pagination metadata                                              |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": [
    {
      "type": "payment_transaction",
      "order_id": "01HXBENQCRV4W42NE4WC98QTGY",
      "merchant_transaction_id": "some-unique-string",
      "reference": "reference-1234",
      "merchant_uuid": "9bfdea04-d4c8-4f44-aa58-ff622d1285bf",
      "game_name": "ragnarok-origin-global",
      "payment_channel": "qr_promptpay_thb",
      "amount_cents": 1000,
      "currency": "MYR",
      "title": "Nyan Berry Pack (24,000)",
      "description": "Ragnarok Origin",
      "item_code": "roo-item-246",
      "status": "created",
      "paylink": "https://games.oneone.com/api/northbound/orders/01HXBENQCRV4W42NE4WC98QTGY",
      "verify_url": "https://games.oneone.com/api/northbound/transactions/01HXBENQCRV4W42NE4WC98QTGY"
    }
  ],
  "links": {
    "first": "https://games.oneone.com/api/northbound/transactions?page=1",
    "last": "https://games.oneone.com/api/northbound/transactions?page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "path": "https://games.oneone.com/api/northbound/transactions",
    "per_page": 20,
    "to": 1,
    "total": 1
  }
}
```

```json [500]
{
  "status": "error",
  "code": 500,
  "error": {
    "code": "LIST_ERROR",
    "message": "Failed to retrieve list of resources",
    "tracking": "e61d7830-ec2f-4c7e-91fc-4cc3bef19865"
  },
  "data": null
}
```

:::

<hr />

### Create Order <Badge text="Requires authentication" type="warning"/>

POST `/api/northbound/transactions`

Create a new order.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details Body Parameters

| Parameter                | Type   | Required | Description                       |
| ------------------------ | ------ | -------- | --------------------------------- |
| merchant_transaction_id  | string | yes      | Unique reference                  |
| merchant_uuid            | string | yes      | Merchant UUID                     |
| game_name                | string | yes      | Game name                         |
| account_info             | array  | yes      | Game account info                 |
| account_info.server_name | string | no       | Game character server name        |
| account_info.login_id    | string | no       | Game character login ID           |
| account_info.name        | string | yes      | Game character name               |
| country                  | string | yes      | Country code in iso_3166_2 format |
| payment_channel          | string | yes      | Payment channel                   |
| amount_cents             | int    | yes      | Amount in cents                   |
| currency                 | string | yes      | Currency                          |
| title                    | string | yes      | Title                             |
| description              | string | no       | Description                       |
| item_code                | string | no       | Item code                         |
| merchant_return_url      | string | yes      | Merchant return URL               |
| webhook_url              | string | no       | Webhook URL for callback          |

:::

```json
{
  "merchant_transaction_id": "some-unique-string",
  "merchant_uuid": "9bfdea04-d4c8-4f44-aa58-ff622d1285bf",
  "game_name": "ragnarok-origin-global",
  "account_info": {
    "server_name": "Prontera",
    "login_id": "FGHJK1234",
    "name": "Kuro"
  },
  "payment_channel": "qr_promptpay_thb",
  "country": "MY",
  "amount_cents": 1000,
  "currency": "MYR",
  "title": "Nyan Berry Pack (24,000)",
  "description": "Ragnarok Origin",
  "item_code": "roo-item-246",
  "merchant_return_url": "https://example.com",
  "webhook_url": "https://example.com/webhook"
}
```

::: details Response Fields

| Field | Type   | Description                                             |
| ----- | ------ | ------------------------------------------------------- |
| data  | object | [`Order Transaction`](#order-transaction-object) object |

:::

::: code-group

```json [201]
{
  "status": "success",
  "code": 201,
  "error": null,
  "data": {
    "type": "payment_transaction",
    "order_id": "01HXBENQCRV3W42NE4WC38QTGY",
    "merchant_transaction_id": "some-unique-string",
    "reference": null,
    "merchant_uuid": "9bfdea14-d4c8-4f34-aa58-ff621d1285bf",
    "game_name": "ragnarok-origin-global",
    "payment_channel": "qr_promptpay_thb",
    "amount_cents": 1000,
    "currency": "MYR",
    "title": "Nyan Berry Pack (24,000)",
    "description": "Ragnarok Origin",
    "item_code": "roo-item-246",
    "status": "created",
    "paylink": "https://games.oneone.com/api/northbound/orders/01HXBENQCRV4W42NE4WC98QTGY",
    "verify_url": "https://games.oneone.com/api/northbound/transactions/01HXBENQCRV4W42NE4WC98QTGY"
  }
}
```

```json [422]
{
  "status": "error",
  "code": 422,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The selected payment channel is invalid.",
    "errors": {
      "payment_channel": "The selected payment channel is invalid."
    }
  },
  "data": null
}
```

```json [500]
{
  "status": "error",
  "code": 500,
  "error": {
    "code": "CREATE_ERROR",
    "message": "Failed to create resource",
    "tracking": "50e10f6c-3524-411d-a73f-bdbde4b37f10"
  },
  "data": null
}
```

:::

<hr />

### Get Order <Badge text="Requires authentication" type="warning"/>

GET `/api/northbound/transactions/{order_id}`

Retrieve details of a specific order.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details URL Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| order_id  | string | yes      | Order ID    |

:::

::: details Response Fields

| Field | Type   | Description                                             |
| ----- | ------ | ------------------------------------------------------- |
| order | object | [`Order Transaction`](#order-transaction-object) object |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "type": "payment_transaction",
    "order_id": "01HXBENQCRV4W42NE4WC98QTGY",
    "merchant_transaction_id": "some-unique-string",
    "reference": null,
    "merchant_uuid": "9bfdea04-d4c8-4f44-aa58-ff622d1285bf",
    "game_name": "ragnarok-origin-global",
    "payment_channel": "qr_promptpay_thb",
    "amount_cents": 1000,
    "currency": "MYR",
    "title": "Nyan Berry Pack (24,000)",
    "description": "Ragnarok Origin",
    "item_code": "roo-item-246",
    "status": "created",
    "paylink": "https://games.oneone.com/api/northbound/orders/01HXBENQCRV4W42NE4WC98QTGY",
    "verify_url": "https://games.oneone.com/api/northbound/transactions/01HXBENQCRV4W42NE4WC98QTGY"
  }
}
```

```json [404]
{
  "status": "error",
  "code": 404,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Resource not found"
  },
  "data": null
}
```

```json [500]
{
  "status": "error",
  "code": 500,
  "error": {
    "code": "SHOW_ERROR",
    "message": "Failed to retrieve resource",
    "tracking": "01cf630e-7f9c-49a3-badd-238ea7da7a72"
  },
  "data": null
}
```

:::

## Callbacks

### Payment Success Callback

After a successful payment, the transaction status will be updated to "paid". We will send a POST request to your callback URL with the [`Order Transaction`](#order-transaction-object) object as payload in JSON format:

```json
{
  "type": "payment_transaction",
  "order_id": "01HW4S5YXS7GARVFX3PEVRRDS4",
  "merchant_transaction_id": "some-unique-string",
  "reference": "569c420e-5739-3eb5-b52a-9a51ce38f0ba",
  "merchant_uuid": "25f0a63d-568f-3101-8181-86a595396e5d",
  "game_name": "ragnarok-origin-global",
  "payment_channel": "for_testing",
  "amount_cents": 1000,
  "currency": "MYR",
  "title": "Payment for game",
  "description": "Payment for game",
  "item_code": null,
  "status": "paid",
  "paylink": "https://games.oneone.com/api/northbound/orders/01HW4S5YXS7GARVFX3PEVRRDS4",
  "verify_url": "https://games.oneone.com/api/northbound/transactions/01HW4S5YXS7GARVFX3PEVRRDS4"
}
```

Ensure that your callback URL returns a 200 status code upon successful processing. We will retry the callback up to 3 times if it fails.

## Order Transaction Object

| Field                   | Type   | Description                    |
| ----------------------- | ------ | ------------------------------ |
| type                    | string | Object type                    |
| order_id                | string | Order ID                       |
| merchant_transaction_id | string | Unique reference from merchant |
| reference               | string | Unique reference               |
| merchant_uuid           | string | Merchant UUID                  |
| game_name               | string | Game name                      |
| payment_channel         | string | Payment channel                |
| amount_cents            | int    | Amount in cents                |
| currency                | string | Currency                       |
| title                   | string | Title                          |
| description             | string | Description                    |
| item_code               | string | Item code                      |
| status                  | string | Order status                   |
| paylink                 | string | Payment link                   |
| verify_url              | string | Verification URL               |

Example object:

```json
{
  "type": "payment_transaction",
  "order_id": "01HXBGYT0GAGKV5QVTR1PQ4HJC",
  "merchant_transaction_id": "some-unique-string",
  "reference": null,
  "merchant_uuid": "9bfdea04-d4c8-4f44-aa58-ff622d1285bf",
  "game_name": "ragnarok-origin-global",
  "payment_channel": "qr_promptpay_thb",
  "amount_cents": 1000,
  "currency": "MYR",
  "title": "Nyan Berry Pack (24,000)",
  "description": "Ragnarok Origin",
  "item_code": "roo-item-246",
  "status": "created",
  "paylink": "https://games.oneone.com/api/northbound/orders/01HXBGYT0GAGKV5QVTR1PQ4HJC",
  "verify_url": "https://games.oneone.com/api/northbound/transactions/01HXBGYT0GAGKV5QVTR1PQ4HJC"
}
```
