---
outline: deep
---

# Northbound API

Our Northbound API facilitates efficient management of your payments.

::: tip
All Payment API endpoints require authentication. Refer to the [Authentication](/guide/authentication.md) guide for details.
:::

::: tip
To sign your API requests with a secret key, follow the instructions in the [Signature Algorithm](/guide/signature-algorithm.md) guide.
:::

## Endpoints

### Login

POST `/northbound-api/login`

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
    "token": "123|gBrXKfSrjZ1xbFCCwN4IIrMuVHf49J52BE5lBtRucfd78aaa",
    "secret_key": "iYhlZH413fKLVdpLGD0uJwq1kIxI3cCl"
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

GET `/northbound-api/games`

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
  "data": {
    "object": "game",
    "game_id": "431ab52b-2b97-439f-b2f3-b24ad78899ae",
    "slug": "ragnarok-origin-global",
    "name": "Ragnarok Origin Global"
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

### Show Game Info <Badge text="Requires authentication" type="warning"/>

GET `/northbound-api/games/{uuid}`

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
    "object": "game",
    "game_id": "431ab52b-2b97-439f-b2f3-b24ad78899ae",
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

GET `/northbound-api/games/{uuid}/servers`

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
      "object": "game_server",
      "server_id": "246",
      "server_name": "Prontera"
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

GET `/northbound-api/games/{uuid}/items`

Retrieve a list of all available games.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

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
      "object": "game_item",
      "game_item_id": 1,
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

GET `/northbound-api/games/{uuid}/characters`

Retrieve a list of game characters.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

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
      "object": "game_character",
      "game_character_id": "111",
      "name": "tester"
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

POST `/northbound-api/orders`

Create a new order.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details Body Parameters

| Parameter    | Type   | Required | Description       |
| ------------ | ------ | -------- | ----------------- |
| game_id      | string | yes      | Game UUID         |
| server_id    | string | yes      | Game server ID    |
| user_id      | string | yes      | Game account ID   |
| character_id | string | yes      | Game character ID |
| item_id      | string | yes      | Game item ID      |
| voucher      | string | no       | Voucher code      |

:::

```json
{
  "game_id": "6a216c80-67fc-4311-9fa4-1907c77902bc",
  "server_id": "123",
  "user_id": "BCD123456",
  "character_id": "3579--JohnDoe",
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
    "order_id": "01HXGV4DH7J1RC0G7PN3VKCYFX",
    "game": "Ragnarok Origin Global",
    "character_id": "TDAF95XM",
    "character_name": "James",
    "item": "Nyan Berry * 40",
    "status": "new",
    "total_price": "OOC 4.6",
    "transaction": {
      "transaction_id": "01HXGV4DHAVAEFX10WQJXWX65D",
      "amount": "OOC 500",
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

GET `/northbound-api/orders/{order_id}`

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
    "order_id": "01HXGW60DRASC3EBSP8BE4T42Y",
    "game": "Ragnarok Origin Global",
    "character_id": "TDAF95XM",
    "character_name": "James",
    "item": "Nyan Berry * 40",
    "status": "new",
    "total_price": "OOC 4.6",
    "transaction": {
      "transaction_id": "01HXGW60DV97K33QDG44BF8KWM",
      "amount": "OOC 500",
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

POST `/northbound-api/orders/{transaction_id}`

Retrieve details of a specific order.

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
    "order_id": "01HXGW60DRASC3EBSP8BE4T42Y",
    "game": "Ragnarok Origin Global",
    "character_id": "TDAF95XM",
    "character_name": "James",
    "item": "Nyan Berry * 40",
    "status": "pending",
    "total_price": "OOC 4.6",
    "transaction": {
      "transaction_id": "01HXGW60DV97K33QDG44BF8KWM",
      "amount": "OOC 500",
      "status": "paid",
      "paid_at": "2024-05-10 17:53:04"
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

GET `/northbound-api/wallet/balance`

Retrieve details of a specific order.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details Response Fields

| Field | Type   | Description                         |
| ----- | ------ | ----------------------------------- |
| order | object | [`Wallet Balance`](#wallet-balance) |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "object": "wallet_balance",
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

:::

## Response Objects

### Game Object

| Field   | Type   | Description |
| ------- | ------ | ----------- |
| object  | string | Object type |
| game_id | string | Order ID    |
| slug    | string | Game slug   |
| name    | string | Game name   |

Example object:

```json
{
  "object": "game",
  "game_id": "4319f52b-1b97-439f-b2f3-b24ad70099ae",
  "slug": "ragnarok-origin-global",
  "name": "Ragnarok Origin Global"
}
```

### Game Server

| Field       | Type   | Description |
| ----------- | ------ | ----------- |
| object      | string | Object type |
| server_id   | string | Server ID   |
| server_name | string | Server name |

Example object:

```json
{
  "object": "game_server",
  "server_id": "246",
  "server_name": "Prontera"
}
```

### Game Item

| Field        | Type   | Description                                               |
| ------------ | ------ | --------------------------------------------------------- |
| object       | string | Object type                                               |
| game_item_id | string | Item ID                                                   |
| name         | string | Item name                                                 |
| channels     | array  | List of [`Game Item Channel`](#game-item-channel) objects |

Example object:

```json
{
  "object": "game_item",
  "game_item_id": 1,
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

| Field             | Type   | Description    |
| ----------------- | ------ | -------------- |
| object            | string | Object type    |
| game_character_id | string | Character ID   |
| name              | string | Character name |

Example object:

```json
{
  "object": "game_character",
  "game_character_id": "2468",
  "name": "John Doe"
}
```

### Order Object

| Field          | Type   | Description         |
| -------------- | ------ | ------------------- |
| order_id       | string | Order ID            |
| game           | string | Game name           |
| character_id   | string | Game character ID   |
| character_name | string | Game character name |
| item           | string | Item name           |
| status         | string | Order status        |
| total_price    | string | Total price         |
| transaction    | object | Transaction object  |

```json
{
  "order_id": "01HXGW60DRASC3EBSP8BE4T42Y",
  "game": "Ragnarok Origin Global",
  "character_id": "TDAF95XM",
  "character_name": "James",
  "item": "Nyan Berry * 40",
  "status": "new",
  "total_price": "OOC 4.6",
  "transaction": {
    "transaction_id": "01HXGW60DV97K33QDG44BF8KWM",
    "amount": "OOC 500",
    "status": "new"
  }
}
```

### Transaction Object

| Field          | Type   | Description        |
| -------------- | ------ | ------------------ |
| transaction_id | string | Transaction ID     |
| amount         | string | Transaction amount |
| status         | string | Transaction status |
| paid_at        | string | Payment date       |

Example object:

```json
{
  "transaction_id": "01HXGW60DV97K33QDG44BF8KWM",
  "amount": "OOC 500",
  "status": "new"
}
```

### Wallet Balance

| Field       | Type    | Description |
| ----------- | ------- | ----------- |
| object      | string  | Object type |
| currency    | string  | Currency    |
| value_cents | integer | Balance     |
