import{_ as o,r as p,o as r,c as i,a as n,d as a,w as e,b as t,e as l}from"./app-BSX797FI.js";const c={},d=n("h1",{id:"payment-api",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#payment-api"},[n("span",null,"Payment API")])],-1),u=n("p",null,"Our Payment API facilitates efficient management of your payments.",-1),k=n("h2",{id:"endpoints",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#endpoints"},[n("span",null,"Endpoints")])],-1),m=n("p",null,"The following endpoints are available for the Payment API:",-1),q=n("h2",{id:"authentication",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#authentication"},[n("span",null,"Authentication")])],-1),h=n("h2",{id:"signature-algorithm",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#signature-algorithm"},[n("span",null,"Signature Algorithm")])],-1),g=n("h2",{id:"rate-limiting",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#rate-limiting"},[n("span",null,"Rate Limiting")])],-1),v=n("p",null,"The Payment API enforces a rate limit of 60 requests per minute. Exceeding this limit results in a 429 Too Many Requests response.",-1),b=n("h2",{id:"errors",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#errors"},[n("span",null,"Errors")])],-1),y=l(`<h2 id="endpoints-1" tabindex="-1"><a class="header-anchor" href="#endpoints-1"><span>Endpoints</span></a></h2><h3 id="login" tabindex="-1"><a class="header-anchor" href="#login"><span>Login</span></a></h3><p>POST <code>/payment-api/login</code></p><p>Authenticate using UUID and password. Returns a token for subsequent requests.</p><blockquote><p>Body Parameters</p></blockquote><table><thead><tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>login</td><td>string</td><td>yes</td><td>UUID</td></tr><tr><td>password</td><td>string</td><td>yes</td><td>Password</td></tr></tbody></table><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;login&quot;</span><span class="token operator">:</span> <span class="token string">&quot;3aa02408-a7fb-320a-8560-56b974f5daa0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;password&quot;</span><span class="token operator">:</span> <span class="token string">&quot;password&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>200 Response Fields</p></blockquote><table><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>token</td><td>string</td><td>Authentication token</td></tr></tbody></table><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;token&quot;</span><span class="token operator">:</span> <span class="token string">&quot;123|lN7SSRDMDAvpJGve4VWabxanL5fZPN9vv6OCJ6IKee413ad8&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>401 Response Fields</p></blockquote><table><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>error</td><td>string</td><td>Error message</td></tr></tbody></table><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;error&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Invalid credentials&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="list-orders" tabindex="-1"><a class="header-anchor" href="#list-orders"><span>List Orders</span></a></h3><p>GET <code>/payment-api/transactions</code></p><p>Retrieve a list of all orders.</p><p><strong><em>[Requires authentication]</em></strong></p><blockquote><p>Headers</p></blockquote><table><thead><tr><th>Header</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>Authorization</td><td>string</td><td>yes</td><td>Bearer token</td></tr><tr><td>X-Signature</td><td>string</td><td>yes</td><td>Signature</td></tr></tbody></table><blockquote><p>200 Response Fields</p></blockquote><table><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>data</td><td>array</td><td>List of orders</td></tr></tbody></table><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;order_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;01HW4S5YXS7GARVFX3PEVRRDS4&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;reference&quot;</span><span class="token operator">:</span> <span class="token string">&quot;569c420e-5739-3eb5-b52a-9a51ce38f0ba&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;merchant_uuid&quot;</span><span class="token operator">:</span> <span class="token string">&quot;25f0a63d-568f-3101-8181-86a595396e5d&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;game_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ragnarok-origin-global&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;payment_channel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;for_testing&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;amount_cents&quot;</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
      <span class="token property">&quot;currency&quot;</span><span class="token operator">:</span> <span class="token string">&quot;MYR&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Payment for game&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Payment for game&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;item_code&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
      <span class="token property">&quot;status&quot;</span><span class="token operator">:</span> <span class="token string">&quot;expired&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;paylink&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://games.oneone.com/payment-api/orders/01HW4S5YXS7GARVFX3PEVRRDS4&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;verify_url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://games.oneone.com/payment-api/transactions/01HW4S5YXS7GARVFX3PEVRRDS4&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="create-order" tabindex="-1"><a class="header-anchor" href="#create-order"><span>Create Order</span></a></h3><p>POST <code>/payment-api/transactions</code></p><p>Create a new order.</p><p><strong><em>[Requires authentication]</em></strong></p><blockquote><p>Headers</p></blockquote><table><thead><tr><th>Header</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>Authorization</td><td>string</td><td>yes</td><td>Bearer token</td></tr><tr><td>X-Signature</td><td>string</td><td>yes</td><td>Signature</td></tr></tbody></table><blockquote><p>Body Parameters</p></blockquote><table><thead><tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>merchant_transaction_id</td><td>string</td><td>yes</td><td>Unique reference</td></tr><tr><td>merchant_uuid</td><td>string</td><td>yes</td><td>Merchant UUID</td></tr><tr><td>game_name</td><td>string</td><td>yes</td><td>Game name</td></tr><tr><td>game_character</td><td>string</td><td>no</td><td>Game character ID</td></tr><tr><td>country</td><td>string</td><td>yes</td><td>Country code in iso_3166_2 format</td></tr><tr><td>payment_channel</td><td>string</td><td>yes</td><td>Payment channel</td></tr><tr><td>amount_cents</td><td>int</td><td>yes</td><td>Amount in cents</td></tr><tr><td>currency</td><td>string</td><td>yes</td><td>Currency</td></tr><tr><td>title</td><td>string</td><td>yes</td><td>Title</td></tr><tr><td>description</td><td>string</td><td>no</td><td>Description</td></tr><tr><td>item_code</td><td>string</td><td>no</td><td>Item code</td></tr><tr><td>merchant_return_url</td><td>string</td><td>yes</td><td>Merchant return URL</td></tr></tbody></table><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;reference&quot;</span><span class="token operator">:</span> <span class="token string">&quot;569c420e-5739-3eb5-b52a-9a51ce38f0ba&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;merchant_uuid&quot;</span><span class="token operator">:</span> <span class="token string">&quot;25f0a63d-568f-3101-8181-86a595396e5d&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;game_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ragnarok-origin-global&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;payment_channel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;for_testing&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;amount_cents&quot;</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
  <span class="token property">&quot;currency&quot;</span><span class="token operator">:</span> <span class="token string">&quot;MYR&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Payment for game&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Payment for game&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;item_code&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>200 Response Fields</p></blockquote><table><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>order</td><td>object</td><td>Order data</td></tr><tr><td>code</td><td>int</td><td>Status code</td></tr><tr><td>message</td><td>string</td><td>Status message</td></tr></tbody></table><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;order&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;order_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;01HW4S5YXS7GARVFX3PEVRRDS4&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;reference&quot;</span><span class="token operator">:</span> <span class="token string">&quot;569c420e-5739-3eb5-b52a-9a51ce38f0ba&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;merchant_uuid&quot;</span><span class="token operator">:</span> <span class="token string">&quot;25f0a63d-568f-3101-8181-86a595396e5d&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;game_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ragnarok-origin-global&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;payment_channel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;for_testing&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;amount_cents&quot;</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
    <span class="token property">&quot;currency&quot;</span><span class="token operator">:</span> <span class="token string">&quot;MYR&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Payment for game&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Payment for game&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;item_code&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
    <span class="token property">&quot;status&quot;</span><span class="token operator">:</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;paylink&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://games.oneone.com/payment-api/orders/01HW4S5YXS7GARVFX3PEVRRDS4&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;verify_url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://games.oneone.com/payment-api/transactions/01HW4S5YXS7GARVFX3PEVRRDS4&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;code&quot;</span><span class="token operator">:</span> <span class="token number">2001</span><span class="token punctuation">,</span>
  <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Payment transaction created successfully.&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="get-order" tabindex="-1"><a class="header-anchor" href="#get-order"><span>Get Order</span></a></h3><p>GET <code>/payment-api/transactions/{order_id}</code></p><p>Retrieve details of a specific order.</p><p><strong><em>[Requires authentication]</em></strong></p><blockquote><p>Headers</p></blockquote><table><thead><tr><th>Header</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>Authorization</td><td>string</td><td>yes</td><td>Bearer token</td></tr><tr><td>X-Signature</td><td>string</td><td>yes</td><td>Signature</td></tr></tbody></table><blockquote><p>URL Parameters</p></blockquote><table><thead><tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>order_id</td><td>string</td><td>yes</td><td>Order ID</td></tr></tbody></table><blockquote><p>200 Response Fields</p></blockquote><table><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>order</td><td>object</td><td>Order data</td></tr></tbody></table><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;order&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;order_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;01HW4S5YXS7GARVFX3PEVRRDS4&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;reference&quot;</span><span class="token operator">:</span> <span class="token string">&quot;569c420e-5739-3eb5-b52a-9a51ce38f0ba&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;merchant_uuid&quot;</span><span class="token operator">:</span> <span class="token string">&quot;25f0a63d-568f-3101-8181-86a595396e5d&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;game_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ragnarok-origin-global&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;payment_channel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;for_testing&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;amount_cents&quot;</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
    <span class="token property">&quot;currency&quot;</span><span class="token operator">:</span> <span class="token string">&quot;MYR&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Payment for game&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Payment for game&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;item_code&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
    <span class="token property">&quot;status&quot;</span><span class="token operator">:</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;paylink&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://games.oneone.com/payment-api/orders/01HW4S5YXS7GARVFX3PEVRRDS4&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;verify_url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://games.oneone.com/payment-api/transactions/01HW4S5YXS7GARVFX3PEVRRDS4&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="callbacks" tabindex="-1"><a class="header-anchor" href="#callbacks"><span>Callbacks</span></a></h2><h3 id="payment-success-callback" tabindex="-1"><a class="header-anchor" href="#payment-success-callback"><span>Payment Success Callback</span></a></h3><p>After a successful payment, the transaction status will be updated to &quot;paid&quot;. We will send a POST request to your callback URL with the transaction resource as payload in JSON format:</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;order_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;01HW4S5YXS7GARVFX3PEVRRDS4&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;reference&quot;</span><span class="token operator">:</span> <span class="token string">&quot;569c420e-5739-3eb5-b52a-9a51ce38f0ba&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;merchant_uuid&quot;</span><span class="token operator">:</span> <span class="token string">&quot;25f0a63d-568f-3101-8181-86a595396e5d&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;game_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ragnarok-origin-global&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;payment_channel&quot;</span><span class="token operator">:</span> <span class="token string">&quot;for_testing&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;amount_cents&quot;</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
  <span class="token property">&quot;currency&quot;</span><span class="token operator">:</span> <span class="token string">&quot;MYR&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Payment for game&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Payment for game&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;item_code&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
  <span class="token property">&quot;status&quot;</span><span class="token operator">:</span> <span class="token string">&quot;paid&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;paylink&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://games.oneone.com/payment-api/orders/01HW4S5YXS7GARVFX3PEVRRDS4&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;verify_url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://games.oneone.com/payment-api/transactions/01HW4S5YXS7GARVFX3PEVRRDS4&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Ensure that your callback URL returns a 200 status code upon successful processing. We will retry the callback up to 3 times if it fails.</p>`,50);function f(_,R){const s=p("RouteLink");return r(),i("div",null,[d,u,k,m,n("ul",null,[n("li",null,[a(s,{to:"/guide/payment.html#login"},{default:e(()=>[t("Login")]),_:1})]),n("li",null,[a(s,{to:"/guide/payment.html#list-orders"},{default:e(()=>[t("List Orders")]),_:1})]),n("li",null,[a(s,{to:"/guide/payment.html#create-order"},{default:e(()=>[t("Create Order")]),_:1})]),n("li",null,[a(s,{to:"/guide/payment.html#get-order"},{default:e(()=>[t("Get Order")]),_:1})])]),q,n("p",null,[t("All Payment API endpoints require authentication. Refer to the "),a(s,{to:"/authentication.html"},{default:e(()=>[t("Authentication")]),_:1}),t(" guide for details.")]),h,n("p",null,[t("To sign your API requests with a secret key, follow the instructions in the "),a(s,{to:"/signature-algorithm.html"},{default:e(()=>[t("Signature Algorithm")]),_:1}),t(" guide.")]),g,v,b,n("p",null,[t("Standard HTTP status codes are used by the Payment API to indicate the success or failure of an API request. For more information, see the "),a(s,{to:"/errors.html"},{default:e(()=>[t("Errors")]),_:1}),t(" guide.")]),y])}const P=o(c,[["render",f],["__file","payment.html.vue"]]),A=JSON.parse('{"path":"/guide/payment.html","title":"Payment API","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Endpoints","slug":"endpoints","link":"#endpoints","children":[]},{"level":2,"title":"Authentication","slug":"authentication","link":"#authentication","children":[]},{"level":2,"title":"Signature Algorithm","slug":"signature-algorithm","link":"#signature-algorithm","children":[]},{"level":2,"title":"Rate Limiting","slug":"rate-limiting","link":"#rate-limiting","children":[]},{"level":2,"title":"Errors","slug":"errors","link":"#errors","children":[]},{"level":2,"title":"Endpoints","slug":"endpoints-1","link":"#endpoints-1","children":[{"level":3,"title":"Login","slug":"login","link":"#login","children":[]},{"level":3,"title":"List Orders","slug":"list-orders","link":"#list-orders","children":[]},{"level":3,"title":"Create Order","slug":"create-order","link":"#create-order","children":[]},{"level":3,"title":"Get Order","slug":"get-order","link":"#get-order","children":[]}]},{"level":2,"title":"Callbacks","slug":"callbacks","link":"#callbacks","children":[{"level":3,"title":"Payment Success Callback","slug":"payment-success-callback","link":"#payment-success-callback","children":[]}]}],"git":{"updatedTime":1713868467000,"contributors":[{"name":"Jewei Mak","email":"jewei.mak@gmail.com","commits":1}]},"filePathRelative":"guide/payment.md"}');export{P as comp,A as data};
