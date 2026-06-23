---
outline: deep
---

# Southbound API V2

Our Southbound API V2 allows you to automate the purchase of in-game items using a consistent set of game and player fields.

V2 uses the existing `/api/southbound/login` endpoint. All other V2 endpoints use the `/api/southbound/v2` prefix.

## Authentication

Use the token returned by the [Login](#login) endpoint as a bearer token:

```plaintext
Bearer {TOKEN}
```

Keep the token and secret key on your server. Do not expose them in browser or mobile application code.

## Signature

Include an `X-Signature` header with every authenticated request. Generate the signature using HMAC-SHA256 with the secret key returned by Login and encode the result as a lowercase hexadecimal string.

For requests with a JSON body, join these values with one newline character (`\n`):

```plaintext
HTTP_METHOD
FULL_URL
COMPACT_JSON_BODY
```

For requests without a body, sign only the method and full URL:

```plaintext
HTTP_METHOD
FULL_URL
```

::: warning
Do not sort the JSON keys. Create one compact JSON string and use the same string when generating the signature and sending the request body.
:::

The full URL includes the query string. Its parameter order and encoding must match the request sent to the API. See [Signing API Requests](/guide/signing-requests.md) for additional details and troubleshooting.

### Code Examples

Each example below includes the body only when one is present.

::: code-group

```typescript [TypeScript]
import { createHmac } from 'node:crypto';

function generateSignature(
  secret: string,
  method: string,
  url: string,
  body?: string,
): string {
  const parts = [method.toUpperCase(), url];

  if (body) {
    parts.push(body);
  }

  return createHmac('sha256', secret)
    .update(parts.join('\n'), 'utf8')
    .digest('hex');
}
```

```php [PHP]
<?php

function generateSignature(
    string $secret,
    string $method,
    string $url,
    ?string $body = null,
): string {
    $parts = [strtoupper($method), $url];

    if ($body !== null && $body !== '') {
        $parts[] = $body;
    }

    return hash_hmac('sha256', implode("\n", $parts), $secret);
}
```

```python [Python]
import hashlib
import hmac


def generate_signature(
    secret: str,
    method: str,
    url: str,
    body: str | None = None,
) -> str:
    parts = [method.upper(), url]

    if body:
        parts.append(body)

    return hmac.new(
        secret.encode("utf-8"),
        "\n".join(parts).encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
```

```java [Java]
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;

public class SignatureGenerator {
    public static String generateSignature(
        String secret,
        String method,
        String url,
        String body
    ) throws Exception {
        String data = method.toUpperCase() + "\n" + url;

        if (body != null && !body.isEmpty()) {
            data += "\n" + body;
        }

        Mac hmac = Mac.getInstance("HmacSHA256");
        hmac.init(new SecretKeySpec(
            secret.getBytes(StandardCharsets.UTF_8),
            "HmacSHA256"
        ));

        return HexFormat.of().formatHex(
            hmac.doFinal(data.getBytes(StandardCharsets.UTF_8))
        );
    }
}
```

:::

## Endpoints

### Login

POST `/api/southbound/login`

V2 uses the existing Southbound login endpoint.

::: details Body Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| email     | string | yes      | Email       |
| password  | string | yes      | Password    |

:::

```json
{
  "email": "user@example.com",
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
    "token": "193|example-token",
    "secret_key": "example-secret-key"
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

:::

<hr />

### List Games <Badge text="Requires authentication" type="warning"/>

GET `/api/southbound/v2/games`

Returns games available to the authenticated reseller.

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
      "name": "Ragnarok Origin Global",
      "image": "https://games.oneone.com/storage/games/ragnarok.png",
      "thumbnail": "https://games.oneone.com/storage/games/ragnarok-thumbnail.png"
    }
  ],
  "links": {
    "first": "https://games.oneone.com/api/southbound/v2/games?page=1",
    "last": "https://games.oneone.com/api/southbound/v2/games?page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "last_page": 1,
    "per_page": 20,
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

### Show Game Information <Badge text="Requires authentication" type="warning"/>

GET `/api/southbound/v2/games/{game_id}`

Returns game information, required input fields, and supported capabilities.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details URL Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| game_id   | string | yes      | Game ID     |

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
    "slug": "mobile-legends-my",
    "name": "Mobile Legends MY",
    "image": "https://games.oneone.com/storage/games/mobile-legends.png",
    "thumbnail": "https://games.oneone.com/storage/games/mobile-legends-thumbnail.png",
    "fields": [
      {
        "name": "user_id",
        "label": "User ID",
        "type": "string",
        "required": true
      },
      {
        "name": "server_id",
        "label": "Zone ID",
        "type": "string",
        "required": true
      }
    ],
    "capabilities": {
      "account_verification": true,
      "character_selection": false
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

:::

<hr />

### List Game Servers <Badge text="Requires authentication" type="warning"/>

GET `/api/southbound/v2/games/{game_id}/servers`

Returns configured or provider-supplied game servers.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details URL Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| game_id   | string | yes      | Game ID     |

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
      "id": "1001",
      "name": "Asia"
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

:::

<hr />

### List Game Items <Badge text="Requires authentication" type="warning"/>

GET `/api/southbound/v2/games/{game_id}/items`

Returns items available to the reseller after applicable pricing plans and discounts.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details URL Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| game_id   | string | yes      | Game ID     |

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
      "id": 123,
      "name": "100 Diamonds",
      "channels": [
        {
          "channel_name": "OOC",
          "channel_slug": "ooc",
          "currency": "OOC",
          "base_price": "5.00",
          "base_price_cents": 500
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

:::

<hr />

### Verify Account <Badge text="Requires authentication" type="warning"/>

POST `/api/southbound/v2/games/{game_id}/account-verifications`

Validates player information and may return selectable characters.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details URL Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| game_id   | string | yes      | Game ID     |

:::

::: details Body Parameters

| Parameter   | Type    | Required | Description                                      |
| ----------- | ------- | -------- | ------------------------------------------------ |
| item_id     | integer | yes      | Game item ID                                     |
| Game fields | mixed   | varies   | Required fields returned by Show Game Information |

:::

```json
{
  "item_id": 123,
  "user_id": "841531884",
  "server_id": "asia"
}
```

::: details Response Fields

| Field | Type   | Description                                           |
| ----- | ------ | ----------------------------------------------------- |
| data  | object | [`Account Verification`](#account-verification) object |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "valid": true,
    "account": {
      "id": "841531884",
      "name": null
    },
    "characters": []
  }
}
```

```json [200 - With characters]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "valid": true,
    "account": {
      "id": "841531884",
      "name": null
    },
    "characters": [
      {
        "id": "123456",
        "name": "Warrior",
        "server_id": "1001",
        "server_name": "Asia",
        "level": 80
      }
    ]
  }
}
```

```json [422]
{
  "status": "error",
  "code": 422,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The user id field is required.",
    "errors": {
      "user_id": "The user id field is required."
    }
  },
  "data": null
}
```

:::

<hr />

### Create Order <Badge text="Requires authentication" type="warning"/>

POST `/api/southbound/v2/orders`

Creates a pending order using the reseller's OOC wallet.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details Body Parameters

| Parameter   | Type    | Required | Description                                |
| ----------- | ------- | -------- | ------------------------------------------ |
| game_id     | string  | yes      | Game UUID                                  |
| item_id     | integer | yes      | Item ID belonging to the selected game     |
| voucher     | string  | no       | Voucher or promotion code                  |
| Game fields | mixed   | varies   | Fields returned by Show Game Information   |

:::

```json
{
  "game_id": "4319f52b-1b97-439f-b2f3-b24ad70099ae",
  "item_id": 123,
  "user_id": "841531884",
  "server_id": "asia",
  "character_id": "123456",
  "character_name": "Warrior"
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
    "id": "01J8PWVWFRXRPWGVGP2ANQ90TQ",
    "game_id": "4319f52b-1b97-439f-b2f3-b24ad70099ae",
    "game_name": "Ragnarok Origin Global",
    "item_id": 123,
    "item_name": "100 Diamonds",
    "user_id": "841531884",
    "server_id": "asia",
    "character_id": "123456",
    "character_name": "Warrior",
    "status": "new",
    "total_price": "OOC 5.00",
    "completed_at": null,
    "receipt": null,
    "transaction": {
      "type": "transaction",
      "id": "01J8PWVWFRXRPWGVGP2ANQ90TR",
      "currency": "OOC",
      "amount": "5.00",
      "status": "new",
      "paid_at": null
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
    "message": "The selected item id is invalid.",
    "errors": {
      "item_id": "The selected item id is invalid."
    }
  },
  "data": null
}
```

:::

<hr />

### Get Order <Badge text="Requires authentication" type="warning"/>

GET `/api/southbound/v2/orders/{order_id}`

Returns the latest order and transaction state. An order can only be retrieved by the reseller that created it.

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
| data  | object | [`Order Object`](#order-object) |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "type": "order",
    "id": "01J8PWVWFRXRPWGVGP2ANQ90TQ",
    "game_id": "4319f52b-1b97-439f-b2f3-b24ad70099ae",
    "game_name": "Ragnarok Origin Global",
    "item_id": 123,
    "item_name": "100 Diamonds",
    "user_id": "841531884",
    "server_id": "asia",
    "character_id": "123456",
    "character_name": "Warrior",
    "status": "pending",
    "total_price": "OOC 5.00",
    "completed_at": null,
    "receipt": null,
    "transaction": {
      "type": "transaction",
      "id": "01J8PWVWFRXRPWGVGP2ANQ90TR",
      "currency": "OOC",
      "amount": "5.00",
      "status": "new",
      "paid_at": null
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

:::

<hr />

### Confirm Order <Badge text="Requires authentication" type="warning"/>

POST `/api/southbound/v2/orders/{order_id}/confirm`

Charges the reseller wallet and submits the order for fulfillment.

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
| data  | object | [`Order Object`](#order-object) |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "error": null,
  "data": {
    "type": "order",
    "id": "01J8PWVWFRXRPWGVGP2ANQ90TQ",
    "game_id": "4319f52b-1b97-439f-b2f3-b24ad70099ae",
    "game_name": "Ragnarok Origin Global",
    "item_id": 123,
    "item_name": "100 Diamonds",
    "user_id": "841531884",
    "server_id": "asia",
    "character_id": "123456",
    "character_name": "Warrior",
    "status": "completed",
    "total_price": "OOC 5.00",
    "completed_at": "2026-06-22 12:30:00",
    "receipt": null,
    "transaction": {
      "type": "transaction",
      "id": "01J8PWVWFRXRPWGVGP2ANQ90TR",
      "currency": "OOC",
      "amount": "5.00",
      "status": "paid",
      "paid_at": "2026-06-22 12:30:00"
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

```json [400]
{
  "status": "error",
  "code": 400,
  "error": {
    "code": "INSUFFICIENT_FUNDS",
    "message": "Insufficient wallet balance"
  },
  "data": null
}
```

:::

<hr />

### Get Wallet Balance <Badge text="Requires authentication" type="warning"/>

GET `/api/southbound/v2/wallet/balance`

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
    "id": "5fc0e8df-35b5-4c35-b559-fad923501420",
    "currency": "OOC",
    "value_cents": 50000
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

:::

## Response Objects

### Game Object

| Field        | Type   | Description                                      |
| ------------ | ------ | ------------------------------------------------ |
| type         | string | Object type                                      |
| id           | string | Game ID                                          |
| slug         | string | Game slug                                        |
| name         | string | Game name                                        |
| image        | string | Game image URL                                   |
| thumbnail    | string | Game thumbnail URL                               |
| fields       | array  | List of [`Field Object`](#field-object)          |
| capabilities | object | Supported game capabilities                      |

### Field Object

| Field      | Type    | Description                                  |
| ---------- | ------- | -------------------------------------------- |
| name       | string  | Canonical request field name                 |
| label      | string  | Human-readable label                         |
| type       | string  | `string`, `integer`, or `select`              |
| required   | boolean | Whether the field is required                |
| options    | array   | Available values when the type is `select`   |

### Game Server

| Field | Type   | Description |
| ----- | ------ | ----------- |
| type  | string | Object type |
| id    | string | Server ID   |
| name  | string | Server name |

### Game Item

| Field    | Type    | Description                                       |
| -------- | ------- | ------------------------------------------------- |
| type     | string  | Object type                                       |
| id       | integer | Item ID                                           |
| name     | string  | Item name                                         |
| channels | array   | List of [`Game Item Channel`](#game-item-channel) |

### Game Item Channel

| Field            | Type    | Description         |
| ---------------- | ------- | ------------------- |
| channel_name     | string  | Channel name        |
| channel_slug     | string  | Channel slug        |
| currency         | string  | Currency            |
| base_price       | string  | Base price          |
| base_price_cents | integer | Base price in cents |

### Account Verification

| Field      | Type    | Description                         |
| ---------- | ------- | ----------------------------------- |
| valid      | boolean | Whether the player account is valid |
| account    | object  | Verified account                    |
| characters | array   | Available player characters         |

### Order Object

| Field          | Type   | Description         |
| -------------- | ------ | ------------------- |
| type           | string | Object type         |
| id             | string | Order ID            |
| game_id        | string | Game ID             |
| game_name      | string | Game name           |
| item_id        | integer | Item ID            |
| item_name      | string | Item name           |
| user_id        | string | Player account ID   |
| server_id      | string | Game server ID      |
| character_id   | string | Game character ID   |
| character_name | string | Game character name |
| status         | string | Order status        |
| total_price    | string | Total price         |
| completed_at   | string | Completion date     |
| receipt        | mixed  | Fulfillment receipt |
| transaction    | object | Transaction object  |

### Transaction Object

| Field    | Type   | Description          |
| -------- | ------ | -------------------- |
| type     | string | Object type          |
| id       | string | Transaction ID       |
| currency | string | Transaction currency |
| amount   | string | Transaction amount   |
| status   | string | Transaction status   |
| paid_at  | string | Payment date         |

### Wallet Balance

| Field       | Type    | Description             |
| ----------- | ------- | ----------------------- |
| type        | string  | Object type             |
| id          | string  | Wallet ID               |
| currency    | string  | Currency                |
| value_cents | integer | Balance amount in cents |

## Additional Notes

### Canonical field names

V2 uses consistent public field names even when different game providers use different internal names.

| Public field      | Meaning |
| ----------------- | ------- |
| `user_id`         | Player, account, or role login identifier |
| `server_id`       | Server, region, or zone identifier |
| `server_name`     | Human-readable server name |
| `character_id`    | Selected character or role identifier |
| `character_name`  | Selected character or role name |
| `character_level` | Selected character level |

Only send fields returned by the selected game's `fields` array, plus any selected character values.

### Error responses

Common V2 errors:

| HTTP | Error code             | Description |
| ---- | ---------------------- | ----------- |
| 400  | `INSUFFICIENT_FUNDS`   | Wallet does not contain enough OOC |
| 401  | `UNAUTHORIZED`         | Invalid or expired bearer token |
| 403  | `MISSING_HMAC`         | `X-Signature` was not supplied |
| 403  | `INVALID_HMAC`         | Signature verification failed |
| 404  | `RESOURCE_NOT_FOUND`   | Resource is missing or belongs to another reseller |
| 422  | `VALIDATION_ERROR`     | Request fields are invalid |
| 429  | `TOO_MANY_REQUESTS`    | Rate limit exceeded |
| 500  | status-specific code   | Internal error; provide `tracking` to support |

Validation example:

```json
{
  "status": "error",
  "code": 422,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The user id field is required.",
    "errors": {
      "user_id": "The user id field is required."
    }
  },
  "data": null
}
```

Not found example:

```json
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

### cURL example

List games:

```bash
BASE_URL="https://staging.oneone.com"
URL="$BASE_URL/api/southbound/v2/games"

SIGNATURE=$(php -r '
echo hash_hmac("sha256", $argv[1], $argv[2]);
' $'GET\n'"$URL" "$SECRET_KEY")

curl --request GET "$URL" \
  --header "Accept: application/json" \
  --header "Authorization: Bearer $TOKEN" \
  --header "X-Signature: $SIGNATURE"
```

Create order:

```bash
BASE_URL="https://staging.oneone.com"
URL="$BASE_URL/api/southbound/v2/orders"
BODY='{"game_id":"4319f52b-1b97-439f-b2f3-b24ad70099ae","item_id":123,"user_id":"841531884","server_id":"asia"}'

SIGNATURE=$(php -r '
echo hash_hmac("sha256", $argv[1], $argv[2]);
' $'POST\n'"$URL"$'\n'"$BODY" "$SECRET_KEY")

curl --request POST "$URL" \
  --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer $TOKEN" \
  --header "X-Signature: $SIGNATURE" \
  --data-raw "$BODY"
```

### V1 and V2

| Area | V1 | V2 |
| ---- | -- | -- |
| Login | `/api/southbound/login` | Uses the same login |
| Resource prefix | `/api/southbound/*` | `/api/southbound/v2/*` |
| Game fields | Provider-dependent | Canonical names described by `fields` |
| Account lookup | Character-list endpoint with mixed behavior | Explicit account-verification endpoint |
| Confirm order | Transaction ULID in URL | Order ULID in URL |
| Order ownership | Legacy behavior | Scoped to authenticated reseller |

V1 remains available for existing integrations. You can migrate to V2 at your own pace. Test the complete V2 workflow in Sandbox before updating your production integration.
