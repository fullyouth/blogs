<!-- # 1. 登录授权 -->
## 1. 概念
1. unionId
2. openId
3. session_key
4. access_token

### 1.1. `unionId`
如果开发者拥有多个移动应用、网站应用、和公众帐号（包括小程序），可通过 UnionID 来区分用户的唯一性，因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号（包括小程序），用户的 UnionID 是唯一的。  
换句话说，同一用户，对同一个微信开放平台下的不同应用，UnionID是相同的。

获取途径
绑定了开发者帐号的小程序，可以通过以下途径获取 UnionID。  
1. 开发者可以直接通过 wx.login + code2Session 获取到该用户 UnionID，无须用户授权。  
2. 小程序端调用云函数时，可在云函数中通过 cloud.getWXContext 获取 UnionID。
3. wx.getUserInfo 得到 `encryptedData` `iv` 解密然后使用session key 解密


### 1.2. `openId`
理解为 `openId = hash(unionId + appid)`

获取
`wx.login() => (code) => return sesson key + openid`

### 1.3. `session_key`
用于解密 getUserInfo返回的敏感数据。  
获取`wx.login() => (code) => return sesson key + openid`

### 1.4. `access_token`
小程序全局唯一后台接口调用凭据（access_token）。调用绝大多数后台接口时都需使用 access_token

:::tip
access_token 的存储与更新
- access_token 的存储至少要保留 512 个字符空间；
- access_token 的有效期目前为 2 个小时，需定时刷新，重复获取将导致上次获取的 access_token 失效；
- 建议开发者使用中控服务器统一获取和刷新 access_token，其他业务逻辑服务器所使用的 access_token 均来自于该中控服务器，不应该各自去刷新，否则容易造成冲突，导致 access_token 覆盖而影响业务；
- access_token 的有效期通过返回的 expires_in 来传达，目前是7200秒之内的值，中控服务器需要根据这个有效时间提前去刷新。在刷新过程中，中控服务器可对外继续输出的老 access_token，此时公众平台后台会保证在5分钟内，新老 access_token 都可用，这保证了第三方业务的平滑过渡；
- access_token 的有效时间可能会在未来有调整，所以中控服务器不仅需要内部定时主动刷新，还需要提供被动刷新 access_token 的接口，这样便于业务服务器在API调用获知 access_token 已超时的情况下，可以触发 access_token 的刷新流程。
:::

## 2. API
### 2.1. `wx.login`
`() => code`
### 2.2. `wx.getUserInfo`
获取用户信息 __调用前需要 用户授权 scope.userInfo__。  
参数  
属性 |	说明
---|---
withCredentials | 是否带上登录态信息。当 withCredentials 为 true 时，要求此前有调用过 wx.login 且登录态尚未过期，此时返回的数据会包含 encryptedData, iv 等敏感信息；当 withCredentials 为 false 时，不要求有登录态，返回的数据不包含 encryptedData, iv 等敏感信息。  
返回值  
属性 |	说明
---|---
userInfo | 用户信息对象，不包含 openid 等敏感信息  
rawData | 不包括敏感信息的原始数据字符串，用于计算签名
signature | 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息
encryptedData	| 包括敏感数据在内的完整用户信息的加密数据
iv | 加密算法的初始向量
cloudID | 敏感数据对应的云 ID，开通云开发的小程序才会返回，可通过云调用直接获取开放数据

### 2.3. `服务端API：auth.getAccessToken()`
获取小程序全局唯一后台接口调用凭据（access_token）。调用绝大多数后台接口时都需使用 access_token，开发者需要进行妥善保存。  
`(grant_type = 'client_credential', appid, secret) => { access_token, expires_in }` 


### 2.4. `服务端API：auth.code2Session()`
`(appid, secret, js_code, grant_type = 'authorization_code') => { openid, session_key, ?unionid }`  
注意：用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回unionid, 否则需要授权getuserinfo

## 3. 授权
![](./imgs/api-login.jpg?random)
1. 调用 `wx.login()` 获取 临时登录凭证code ，并回传到开发者服务器
2. 开发者服务器调用 `auth.code2Session` 接口，换取 `用户唯一标识 OpenID`,用户在微信开放平台帐号下的`唯一标识UnionID`（__若当前小程序已绑定到微信开放平台帐号__） 和 `会话密钥 session_key`。
3. 之后开发者服务器可以根据用户标识来生成自定义登录态，用于后续业务逻辑中前后端交互时识别用户身份。

:::warning
1. 会话密钥 session_key 是对用户数据进行 加密签名 的密钥。为了应用自身的数据安全，开发者服务器不应该把会话密钥下发到小程序，也不应该对外提供这个密钥。
2. 临时登录凭证 code 只能使用一次
:::

## 4. 授权最佳实践
https://juejin.cn/post/6844903641820708871  
http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html  
https://mp.weixin.qq.com/s/JBdC-G9MwaptFjQeD9ujeA

## 问题
- `access token` `session key`过期解决方案  是获取用户敏感信息的  
初次注册和获取session key，后面不需要每次重新获取新的吧， 那么这个应该不需要关注是否过期，可以用户手动点击更新按钮，wx.login 重新获取session key来更新用户信息  
access token是服务器调用微信使用的，小程序不需要关注他的存在吧
- 为什么是使用`access token`标识的用户身份，不是`open id` 或者 `union id` 吗,如果害怕openid传输过程有危险，可以使用其他加密方案吧 ， 客户端不需要知道access token的存在

这样的话，日常使用只需要授权地址，相册等其他权限 就可以了

