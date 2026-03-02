---
outline: deep
---

# Northbound API V2

Northbound API V2 is designed to be used by tenants

## Authentication

To authenticate your request, include an `Authorization` header with the following value:

```plaintext
Bearer {API_KEY}
```

## Signature

To secure your requests, include an `X-Signature` header in every call. This signature is generated using HMAC-SHA256 with your API secret key.

Construct the string to be signed by joining the following components with a newline character (\n):

```
[METHOD]\n[URI]\n[BODY]
```

### Payload Examples

```
# with body
POST\nhttps://games.oneone.com/api\n{"foo":"bar"}

# without body
GET\nhttps://games.oneone.com/api\n
```

### Code Examples

::: code-group

```TS
import { createHmac } from "crypto";

/**
 * Generates the HMAC SHA256 signature for the request.
 * @param secret - Your API secret key
 * @param method - HTTP method (e.g., "POST")
 * @param uri - The request URI (e.g., "/v1/resource")
 * @param payload - The stringified request body
 */
function generateSignature(
  secret: string,
  method: string,
  uri: string,
  payload: string,
): string {
  const data = `${method}\n${uri}\n${payload}`;
  return createHmac("sha256", secret).update(data).digest("hex");
}
```

```PHP
<?php
/**
 * Generates the HMAC SHA256 signature for the request.
 * 
 * @param string $secret Your API secret key
 * @param string $method HTTP method (e.g., "POST")
 * @param string $uri The request URI (e.g., "/v1/resource")
 * @param string $payload The request body
 * @return string
 */
function generateSignature($secret, $method, $uri, $payload = '') {
    $data = implode(PHP_EOL, array_merge($method, $uri, $payload));
    return hash_hmac('sha256', $data, $secret);
}
?>
```

```JAVA
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;

public class SignatureGenerator {
    /**
     * Generates the HMAC SHA256 signature for the request.
     */
    public static String generateSignature(String secret, String method, String uri, String payload) throws Exception {
        String data = method + "\n" + uri + "\n" + payload;
        
        Mac sha256Hmac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(
            secret.getBytes(StandardCharsets.UTF_8), 
            "HmacSHA256"
        );
        sha256Hmac.init(secretKey);
        
        byte[] signedBytes = sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        return HexFormat.of().formatHex(signedBytes);
    }
}
```

:::

## Endpoints

### List Orders <Badge text="Requires authentication" type="warning"/>

GET `/api/northbound/v2/transactions`

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
| data  | array | List of `Order Transaction` objects |
| links | array | Pagination links                                                 |
| meta  | array | Pagination metadata                                              |

:::

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "data": []
}
```

```json [500]
{
  "status": "error",
  "code": 500,
  "message": "error_message",
  "tracking": "<uuid>"
}
```

:::

<hr />

### Create Order <Badge text="Requires authentication" type="warning"/>

POST `/api/northbound/v2/transactions`

Create a new order.

::: details Headers

| Header        | Type   | Required | Description  |
| ------------- | ------ | -------- | ------------ |
| Authorization | string | yes      | Bearer token |
| X-Signature   | string | yes      | Signature    |

:::

::: details Body Parameters

| Parameter           | Type   | Required | Description                       |
| ------------------- | ------ | -------- | --------------------------------- |
| transaction_id      | string | yes      | Unique reference                  |
| tenant_id           | string | yes      | Tenant ID                         |
| game_name           | string | yes      | Game name                         |
| country             | string | yes      | Country code in iso_3166_2 format |
| payment_channel     | string | yes      | Payment channel                   |
| amount_cents        | int    | yes      | Amount in cents                   |
| currency            | string | yes      | Currency                          |
| item_title          | string | yes      | Title                             |
| item_description    | string | no       | Description                       |
| item_code           | string | yes      | Item code                         |
| return_url          | string | yes      | Return URL                        |
| webhook_url         | string | no       | Webhook URL for callback          |
| account             | array  | no       | Game account info                 |
| account.server_name | string | no       | Game character server name        |
| account.login_id    | string | no       | Game character login ID           |
| account.name        | string | no       | Game character name               |

:::

```json
{
  "transaction_id": "some-unique-string",
  "tenant_id": "01KGKW7222XT1WACCWA6MK7888",
  "game_name": "ragnarok-origin-global",
  "payment_channel": "qr_promptpay_thb",
  "country": "MY",
  "amount_cents": 1000,
  "currency": "MYR",
  "title": "Nyan Berry Pack (24,000)",
  "description": "Ragnarok Origin",
  "item_code": "roo-item-246",
  "merchant_return_url": "https://example.com",
  "webhook_url": "https://example.com/webhook",
  "account": {
    "server_name": "Prontera",
    "login_id": "FGHJK1234",
    "name": "Kuro"
  }
}
```

::: code-group

```json [201]
{
  "status": "success",
  "code": 201,
  "data": {
    "type": "payment_transaction",
    "order_id": "01KJMYWXST80RQMVHAQ0EJN8N4",
    "transaction_id": "f1275362-0597-4264-8af7-864cb5f3f039",
    "reference": "",
    "tenant_id": "01KGKW7222XT1WACCWA6MK7888",
    "game_name": "ragnarok-origin-global",
    "payment_channel": "qr_promptpay_thb",
    "amount_cents": "1000",
    "currency": "MYR",
    "item_title": "Nyan Berry Pack (24,000)",
    "item_description": "Ragnarok Origin",
    "item_code": "roo-item-246",
    "status": "created",
    "paylink": "https://games.oneone.com/api/northbound/orders/01KJMYWXST80RQMVHAQ0EJN8N4",
    "verify_url": "https://games.oneone.com/api/northbound/transactions/01KJMYWXST80RQMVHAQ0EJN8N4"
  }
}
```

```json [422]
{
  "status": "error",
  "code": 422,
  "message": "The selected payment channel is invalid."
}
```

```json [500]
{
  "status": "error",
  "code": 500,
  "message": "Error message",
  "tracking": "216d3de6-122c-47b1-8d39-089df90302bd"
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

::: code-group

```json [200]
{
  "status": "success",
  "code": 200,
  "data": {
    "type": "payment_transaction",
    "order_id": "01HXBENQCRV4W42NE4WC98QTGY",
    "transaction_id": "265879d0-4099-4efc-a70c-a06fdaa70c2f",
    "reference": "",
    "tenant_id": "01KGKW7222XT1WACCWA6MK7888",
    "game_name": "ragnarok-origin-global",
    "payment_channel": "qr_promptpay_thb",
    "amount_cents": 1000,
    "currency": "MYR",
    "item_title": "Nyan Berry Pack (24,000)",
    "item_description": "Ragnarok Origin",
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
  "message": "Transaction not found"
}
```

```json [500]
{
  "status": "error",
  "code": 500,
  "message": "Error message",
  "tracking": "216d3de6-122c-47b1-8d39-089df90302bd"
}
```

:::

<hr />

## Callbacks

### Payment Success

After a successful payment, we will send a POST request to your callback URL with this payload:

```json
{
    "type": "payment_transaction",
    "order_id": "01HXBENQCRV4W42NE4WC98QTGY",
    "transaction_id": "265879d0-4099-4efc-a70c-a06fdaa70c2f",
    "reference": "",
    "tenant_id": "01KGKW7222XT1WACCWA6MK7888",
    "game_name": "ragnarok-origin-global",
    "payment_channel": "qr_promptpay_thb",
    "amount_cents": 1000,
    "currency": "MYR",
    "item_title": "Nyan Berry Pack (24,000)",
    "item_description": "Ragnarok Origin",
    "item_code": "roo-item-246",
    "status": "paid",
    "paylink": "https://games.oneone.com/api/northbound/orders/01HXBENQCRV4W42NE4WC98QTGY",
    "verify_url": "https://games.oneone.com/api/northbound/transactions/01HXBENQCRV4W42NE4WC98QTGY"
  }
```

Ensure that your callback URL returns a 200 status code upon successful processing. We will retry the callback up to 3 times if it fails.
