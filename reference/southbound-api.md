---
outline: deep
---

# Southbound API

Our Southbound API allows you to automate the purchase of in-game items.

::: tip
All Southbound API endpoints require authentication. Refer to the [Authentication](/guide/authentication.md) guide for details.
:::

::: tip
To sign your API requests with a secret key, follow the instructions in the [Signing Requests](/guide/signing-requests.md) guide.
:::

## Endpoints

### Login

POST `/api/southbound/login`

Authenticate using email and password. Returns a token for subsequent requests.

::: details Body Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| email     | string | yes      | email       |
| password  | string | yes      | Password    |

:::

```json
{
  "email": "user@example.net",
  "password": "password"
}
```

::: details Response Fields

| Field      | Type   | Description          |
| ---------- | ------ | -------------------- |
| token      | string | Authentication token |
| secret_key | string | Secret key           |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "token": "193|zlVt7FvH4ztrzSl41lzTCatF1hUDnzSkPhmKcGBla5842e91",
    "secret_key": "Ld3ADYhSkpt3p7S5n7MejEP2nyz4rRjT"
  }
}
```

```json [401]
{
  "status": "error",
  "code": 401,
  "error": {
    "code": "INVALID_CREDENTIALS",
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
    "code": "VALIDATION_ERROR",
    "message": "The email field is required. (and 1 more error)",
    "errors": {
      "email": "The email field is required.",
      "password": "The password field is required."
    }
  },
  "data": null
}
```

:::

<hr />

### List Games <Badge text="Requires authentication" type="warning"/>

GET `/api/southbound/games`

Retrieve a list of all available games.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details Response Fields

| Field | Type  | Description                           |
| ----- | ----- | ------------------------------------- |
| data  | array | List of [`Game Object`](#game-object) |
| links | array | Pagination links                      |
| meta  | array | Pagination metadata                   |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": [
    {
      "type": "game",
      "id": "4319f52b-1b97-439f-b2f3-b24ad70099ae",
      "slug": "ragnarok-origin-global",
      "name": "Ragnarok Origin Global"
    }
  ]
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

### Show Game Info <Badge text="Requires authentication" type="warning"/>

GET `/api/southbound/games/{uuid}`

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
| uuid      | string | yes      | Game ID     |

:::

::: details Response Fields

| Field | Type   | Description                   |
| ----- | ------ | ----------------------------- |
| data  | object | [`Game Object`](#game-object) |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "type": "game",
    "id": "4319f52b-1b97-439f-b2f3-b24ad70099ae",
    "slug": "ragnarok-origin-global",
    "name": "Ragnarok Origin Global"
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

<hr />

### List Game Servers <Badge text="Requires authentication" type="warning"/>

GET `/api/southbound/games/{uuid}/servers`

Retrieve a list of all available games.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details URL Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| uuid      | string | yes      | Game ID     |

:::

::: details Response Fields

| Field | Type  | Description                           |
| ----- | ----- | ------------------------------------- |
| data  | array | List of [`Game Server`](#game-server) |
| links | array | Pagination links                      |
| meta  | array | Pagination metadata                   |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": [
    {
      "type": "game_server",
      "id": "246",
      "name": "Prontera"
    }
  ]
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
    "code": "LIST_ERROR",
    "message": "Failed to retrieve list of resources",
    "tracking": "e61d7830-ec2f-4c7e-91fc-4cc3bef19865"
  },
  "data": null
}
```

:::

<hr />

### List Game Items <Badge text="Requires authentication" type="warning"/>

GET `/api/southbound/games/{uuid}/items`

Retrieve a list of all available games.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details URL Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| uuid      | string | yes      | Game ID     |

:::

::: details Response Fields

| Field | Type  | Description                       |
| ----- | ----- | --------------------------------- |
| data  | array | List of [`Game Item`](#game-item) |
| links | array | Pagination links                  |
| meta  | array | Pagination metadata               |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": [
    {
      "type": "game_item",
      "id": 1,
      "name": "Nyan Berry * 40",
      "channels": [
        {
          "channel_name": "OOC",
          "channel_slug": "ooc",
          "currency": "OOC",
          "base_price": "5.00"
        }
      ]
    }
  ]
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
    "code": "LIST_ERROR",
    "message": "Failed to retrieve list of resources",
    "tracking": "e61d7830-ec2f-4c7e-91fc-4cc3bef19865"
  },
  "data": null
}
```

:::

<hr />

### List Game Characters <Badge text="Requires authentication" type="warning"/>

GET `/api/southbound/games/{uuid}/characters`

Retrieve a list of game characters.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details URL Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| uuid      | string | yes      | Game ID     |

:::

::: details Query Parameters

| Parameter  | Type   | Required | Description     |
| ---------- | ------ | -------- | --------------- |
| account_id | string | yes      | Game account ID |
| server_id  | string | yes      | Game server ID  |

```
Example: /api/southbound/games/{uuid}/characters?account_id=BCD123456&server_id=123
```

:::

::: details Response Fields

| Field | Type  | Description                                 |
| ----- | ----- | ------------------------------------------- |
| data  | array | List of [`Game Character`](#game-character) |
| links | array | Pagination links                            |
| meta  | array | Pagination metadata                         |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": [
    {
      "type": "game_character",
      "id": "1234",
      "name": "John Doe"
    }
  ]
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

POST `/api/southbound/orders`

Create a new order.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details Body Parameters

| Parameter      | Type   | Required | Description         |
| -------------- | ------ | -------- | ------------------- |
| game_id        | string | yes      | Game UUID           |
| server_id      | string | yes      | Game server ID      |
| user_id        | string | yes      | Game account ID     |
| character_id   | string | yes      | Game character ID   |
| character_name | string | yes      | Game character name |
| item_id        | string | yes      | Game item ID        |
| voucher        | string | no       | Voucher code        |

:::

```json
{
  "game_id": "6a216c80-67fc-4311-9fa4-1907c77902bc",
  "server_id": "123",
  "user_id": "BCD123456",
  "character_id": "13579",
  "character_name": "John Doe",
  "item_id": 12,
  "voucher": "VOUCHER456"
}
```

::: details Response Fields

| Field | Type   | Description                     |
| ----- | ------ | ------------------------------- |
| data  | object | [`Order Object`](#order-object) |

:::

::: code-group

```json [201]
{
  "status": "success",
  "code": 201,
  "error": null,
  "data": {
    "type": "order",
    "id": "01HXRPFZH66P5M21ET3PMJ9T62",
    "game": "Ragnarok Origin Global",
    "character_id": "13579",
    "character_name": "John Doe",
    "item": "Nyan Berry * 40",
    "status": "new",
    "total_price": "OOC 4.6",
    "transaction": {
      "type": "transaction",
      "id": "01HXRPFZH8XNETP75TYBC1M42J",
      "currency":"OOC",
      "amount": "4.60",
      "status": "new"
    }
  }
}
```

```json [422]
{
  "status": "error",
  "code": 422,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The game id field must be a valid UUID.",
    "errors": {
      "game_id": "The game id field must be a valid UUID."
    }
  },
  "data": null
}
```

```json [500]
{
  "status": "error",
  "code": 400,
  "error": {
    "code": "PAYMENT_ERROR",
    "message": "Payment error"
  },
  "data": null
}
```

:::

<hr />

### Get Order <Badge text="Requires authentication" type="warning"/>

GET `/api/southbound/orders/{order_id}`

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

| Field | Type   | Description                     |
| ----- | ------ | ------------------------------- |
| order | object | [`Order Object`](#order-object) |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "type": "order",
    "id": "01HXRPFZH66P5M21ET3PMJ9T62",
    "game": "Ragnarok Origin Global",
    "character_id": "TDAF95XM",
    "character_name": "John Doe",
    "item": "Nyan Berry * 40",
    "status": "new",
    "total_price": "OOC 4.6",
    "transaction": {
      "type": "transaction",
      "id": "01HXRPFZH8XNETP75TYBC1M42J",
      "currency": "OOC",
      "amount": "4.60",
      "status": "new"
    }
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

<hr />

### Confirm Order <Badge text="Requires authentication" type="warning"/>

POST `/api/southbound/transactions/{transaction_id}`

Confirm an order via transaction ID.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details URL Parameters

| Parameter      | Type   | Required | Description    |
| -------------- | ------ | -------- | -------------- |
| transaction_id | string | yes      | Transaction ID |

:::

::: details Response Fields

| Field | Type   | Description                     |
| ----- | ------ | ------------------------------- |
| order | object | [`Order Object`](#order-object) |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "type": "order",
    "id": "01HXRPFZH66P5M21ET3PMJ9T62",
    "game": "Ragnarok Origin Global",
    "character_id": "TDAF95XM",
    "character_name": "John Doe",
    "item": "Nyan Berry * 40",
    "status": "completed",
    "total_price": "OOC 4.6",
    "transaction": {
      "type": "transaction",
      "id": "01HXRPFZH8XNETP75TYBC1M42J",
      "currency": "OOC",
      "amount": "4.60",
      "status": "paid",
      "paid_at": "2024-05-13 18:05:48"
    }
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
    "code": "PAYMENT_ERROR",
    "message": "Payment error",
    "tracking": "ae24e2a6-47ea-49b5-abd4-c83ca91aab03"
  },
  "data": null
}
```

<hr />

### Get Wallet Balance <Badge text="Requires authentication" type="warning"/>

GET `/api/southbound/wallet/balance`

Retrieve current wallet balance.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details Response Fields

| Field | Type   | Description                         |
| ----- | ------ | ----------------------------------- |
| data  | object | [`Wallet Balance`](#wallet-balance) |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "type": "wallet_balance",
    "id": "2c89c94c-efdc-4faa-b21a-7b0074f7acd5",
    "currency": "OOC",
    "value_cents": 4500
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

<hr />

### Get Payment <Badge text="Requires authentication" type="warning"/>

GET `/api/southbound/payment/{ulid}`

Retrieve details of a specific payment transaction.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details Response Fields

| Field | Type   | Description                              |
| ----- | ------ |------------------------------------------|
| data  | object | [`Payment Transaction`](#payment-transaction) |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "type": "payment_transaction",
    "payment_transaction_id": "01JRFDBWZDE9XD17EZGRBPM5K5",
    "reference": "RO-7539449-17442992546349647",
    "game_name": "ragnarok-online-pc",
    "payment_channel": "OOC_TH",
    "amount_cents": 500000,
    "currency": "OOC",
    "title": "500 Cash",
    "description": "Number of cash obtained : 500 Cash",
    "item_code": "RO.500.ooc50",
    "status": "created"
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

<hr />

### Confirm Payment <Badge text="Requires authentication" type="warning"/>

GET `/api/southbound/payment/{ulid}/confirm`

Confirm payment transaction via payment transaction ULID.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details Response Fields

| Field | Type   | Description                                   |
| ----- | ------ |-----------------------------------------------|
| data  | object | [`Payment Transaction`](#payment-transaction) |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "type": "payment_transaction",
    "payment_transaction_id": "01JRFDBWZDE9XD17EZGRBPM5K5",
    "reference": "RO-7539449-17442992546349647",
    "game_name": "ragnarok-online-pc",
    "payment_channel": "OOC_TH",
    "amount_cents": 500000,
    "currency": "OOC",
    "title": "500 Cash",
    "description": "Number of cash obtained : 500 Cash",
    "item_code": "RO.500.ooc50",
    "status": "paid"
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

## Response Objects

### Game Object

| Field   | Type   | Description |
| ------- | ------ | ----------- |
| type    | string | Object type |
| game_id | string | Order ID    |
| slug    | string | Game slug   |
| name    | string | Game name   |

Example object:

```json
{
  "type": "game",
  "game_id": "4319f52b-1b97-439f-b2f3-b24ad70099ae",
  "slug": "ragnarok-origin-global",
  "name": "Ragnarok Origin Global"
}
```

### Game Server

| Field | Type   | Description |
| ----- | ------ | ----------- |
| type  | string | Object type |
| id    | string | Server ID   |
| name  | string | Server name |

Example object:

```json
{
  "type": "game_server",
  "id": "246",
  "name": "Prontera"
}
```

### Game Item

| Field    | Type   | Description                                       |
| -------- | ------ | ------------------------------------------------- |
| type     | string | Object type                                       |
| id       | string | Item ID                                           |
| name     | string | Item name                                         |
| channels | array  | List of [`Game Item Channel`](#game-item-channel) |

Example object:

```json
{
  "type": "game_item",
  "id": 1,
  "name": "Nyan Berry * 40",
  "channels": [
    {
      "channel_name": "OOC",
      "channel_slug": "ooc",
      "currency": "OOC",
      "base_price": "5.00"
    }
  ]
}
```

### Game Item Channel

| Field        | Type   | Description  |
| ------------ | ------ | ------------ |
| channel_name | string | Channel name |
| channel_slug | string | Channel slug |
| currency     | string | Currency     |
| base_price   | string | Base price   |

Example object:

```json
{
  "channel_name": "OOC",
  "channel_slug": "ooc",
  "currency": "OOC",
  "base_price": "5.00"
}
```

### Game Character

| Field | Type   | Description    |
| ----- | ------ | -------------- |
| type  | string | Object type    |
| id    | string | Character ID   |
| name  | string | Character name |

Example object:

```json
{
  "type": "game_character",
  "id": "2468",
  "name": "John Doe"
}
```

### Order Object

| Field          | Type   | Description         |
| -------------- | ------ | ------------------- |
| type           | string | Object type         |
| id             | string | Order ID            |
| game           | string | Game name           |
| character_id   | string | Game character ID   |
| character_name | string | Game character name |
| item           | string | Item name           |
| status         | string | Order status, can be `new`, `pending`, `paid`, `failed` |
| total_price    | string | Total price         |
| transaction    | object | Transaction object  |

```json
{
  "type": "order",
  "id": "01HXGW60DRASC3EBSP8BE4T42Y",
  "game": "Ragnarok Origin Global",
  "character_id": "2468",
  "character_name": "Joh",
  "item": "Nyan Berry * 40",
  "status": "new",
  "total_price": "OOC 4.6",
  "transaction": {
    "type": "transaction",
    "id": "01HXGW60DV97K33QDG44BF8KWM",
    "currency": "OOC",
    "amount": "4.60",
    "status": "new"
  }
}
```

### Transaction Object

| Field   | Type   | Description        |
| ------- | ------ | ------------------ |
| type    | string | Object type        |
| id      | string | Transaction ID     |
| currency  | string | Transaction currency |
| amount  | string | Transaction amount |
| status  | string | Transaction status, can be `new`, `pending`, `paid`, `failed` |
| paid_at | string | Payment date       |

Example object:

```json
{
  "type": "transaction",
  "id": "01HXGW60DV97K33QDG44BF8KWM",
  "currency": "OOC",
  "amount": "5.00"
  "status": "new"
}
```

### Wallet Balance

| Field       | Type    | Description             |
| ----------- | ------- | ----------------------- |
| type        | string  | Object type             |
| id          | string  | Wallet ID               |
| currency    | string  | Currency                |
| value_cents | integer | Balance amount in cents |

```json
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "type": "wallet_balance",
    "id": "2c89c94c-efdc-4faa-b21a-7b0074f7acd5",
    "currency": "OOC",
    "value_cents": 4500
  }
}
```

### Payment Transaction

| Field                  | Type    | Description             |
|------------------------|---------|-------------------------|
| type                   | string  | Object type             |
| payment_transaction_id | string  | Pyament Transaction ID  |
| reference              | string  | Merchant Transaction ID |
| game_name              | string  | Game Name               |
| payment_channel        | string  | Payment Channel         |
| amount_cents           | integer | Amount                  |
| currency               | string  | Currency                |
| title                  | string  | Game Item Title         |
| description            | string  | Game Item Description   |
| item_code              | string  | Game item Code          |
| status                 | string  | Payment Status, can be `created`, `pending`, `paid`, `cancelled`, `failed` , `expired`|


```json
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "type": "payment_transaction",
    "payment_transaction_id": "01JRFDBWZDE9XD17EZGRBPM5K5",
    "reference": "RO-7539449-17442992546349647",
    "game_name": "ragnarok-online-pc",
    "payment_channel": "OOC_TH",
    "amount_cents": 500000,
    "currency": "OOC",
    "title": "500 Cash",
    "description": "Number of cash obtained : 500 Cash",
    "item_code": "RO.500.ooc50",
    "status": "paid"
  }
}
```
