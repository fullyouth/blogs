# 登录授权最佳实践
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

## 4. 情景分析

> 情景1: 新用户

需要注册：wx.getUserInfo => userInfo / iv / encryptedData  
登录 wx.login => code => token / session key  
服务端根据session key + iv + encryptedData => unionid / openid  

> 情景2: 老用户，但是微信没有缓存信息

服务端需要知道是谁 这里的标识是token  
登录 wx.login => code => token / session key  
如果需要更新用户信息，就需要重新wx.getUserInfo => userInfo / iv / encryptedData

> 情景3：老用户，有缓存信息，但是token失效

重新获取token的过程  wx.login => code => token / session key  

## 5. 最佳实践
我们手上的工具
1. 获取用户信息
   流程：用户授权 => getUserInfo => userInfo / rawData(iv / encryptedData)
2. 获取token
   流程：wx.login => code => openId | session key
3. 获取unionID 
   流程：获取token(session) + 获取用户信息(rawData) => unionID 
4. openId
   流程：获取token
  
> 注册   

  获取token + 获取unionID

  方案：一个专门的注册页面来做,正常体验
  ```jsx
  <AtButton
    type='primary'
    lang='zh_CN'
    openType='getUserInfo'
    onGetUserInfo={this.handleGetUserInfo}
  >
    立即登录
  </AtButton>
  ```
  ```js
  handleGetUserInfo(res) {
    const loginParams = res.detail
    // 获取 userinfo rawData 以及校验信息 iv, encryptedData  
    // signature = hash(rawData + session key)  session key下面可以获取到
    const { iv, encryptedData, rawData, signature, userInfo } = loginParams
    if (!iv || !encryptedData) {
      Taro.showModal({
        title: '授权提示',
        content: `需要您的授权才能购物`,
        showCancel: false,
        confirmText: '知道啦'
      })
      return
    }
    // 获取code 服务端可以用拿到新的session key 来解密
    let code = ''
    try {
      const result = await Taro.login()
      code = result.code
    } catch (e) {
      console.log(e)
      return Taro.showToast({
        title: '微信授权失败，可能微信版本过低',
        icon: 'none'
      })
    }
    // 注册 校验和解密用户信息 
    let params = {
     code,
     iv,
     encrypted_data: encryptedData,
     rawData,
     signature,
     userInfo
   }
    const { access_token, is_user, nickName, union_id, open_id } = await api.wx.login(params)
    // ...
  }
  ```

> 登录  

  获取token  
  ```js
  async function autoLogin() {
    const { code } = await Taro.login()
    const { access_token } = await api.wx.login({ code })
    if (!access_token) throw new Error(`token is not defined: ${access_token}`)
    return access_token
  }
  ```

> token失效    

  获取token  
  方案：队列 或者 缓存，做到静默登录
  ```js
  @withCache(10)
  function makeReq(config) {
    // ...
    return new Promise((resolve, reject) => {
      showLoading('加载中')
      Taro.request(options)
      .then(async (res) => {
        if (res.data.code >= 200 && res.data.code < 300) {
          resolve(res.data)
        } else if(res.data.code === 401) {
          await autoLogin()
          const data = await makeReq(config)
          resolve(data)
        } else {
          showToast(res.data.msg);
          reject(err)
        }
      }
      .catch(err => {
        console.log(err);
        showToast("there is a mistake");
        reject()
      })
      .finally(() => {
        hideLoading(')
      })
    })
  }
  // 以上有个弊端，可能会多次调用
  // 1. 可以添加个debounce + 缓存
  // return promise or value
function withCache(delay) {
  let cachePromise = null
  let timer = ''
  return function(target, name, descriptor) {
    let prevVal = descriptor.value
    descriptor.value = function(...args) {
      if (!timer) {
        timer = setTimeout(() => {
          timer = ''
        }, delay * 1000)
        cachePromise = prevVal
          .call(this, ...args)
          .then((res) => {
            cachePromise = res
          })
          .catch((err) => {})
        return cachePromise
      }

      return cachePromise
    }
    return descriptor
  }
}
  ```
  队列
  ```js
class Queue {
  constructor(namespace) {
    this.isPending = false
    this.namespace = namespace
    this.queue = []
    this.length = 0
  }
  add(item) {
    this.queue.push(item)
    this.length++
  }
  next() {
    const { makeReq, resolve, reject } = this.queue.shift()
    makeReq()
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
      .finally(() => {
        this.length--
      })
  }
  getLength() {
    return this.length
  }
  startPending() {
    this.isPending = true
  }
  stopPending() {
    this.isPending = false
  }
  autoRun() {
    while (this.length > 0) {
      this.next()
    }
  }
}

const reqQueue = new Queue('reqQueue')

function makeReq(config) {
    // ...
    return new Promise((resolve, reject) => {
      showLoading('加载中')
      Taro.request(options)
      .then(async (res) => {
        if (res.data.code >= 200 && res.data.code < 300) {
          resolve(res.data)
        } else if(res.data.code === 401) {
           if (reqQueue.isPending) {
             reqQueue.startPending()
            reqQueue.add({ makeReq: () => makeReq(config), resolve, reject })
            return
          } else {
            autoLogin().then(res => {
              reqQueue.stopPending()
              console.log(reqQueue.namespace, reqQueue.queue)
              reqQueue.autoRun()
            })
          }
        } else {
          showToast(res.data.msg);
          reject(err)
        }
      }
      .catch(err => {
        console.log(err);
        showToast("there is a mistake");
        reject()
      })
      .finally(() => {
        hideLoading(')
      })
    })

  }
  ```

> 更新用户信息  

  同注册, 可使用一个按钮，让用户主动更新，这样可以不需要每次都调用getuserinfo
  


https://juejin.cn/post/6844903641820708871  
http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html  
https://mp.weixin.qq.com/s/JBdC-G9MwaptFjQeD9ujeA

