import axios from 'axios'

axios.defaults.timeout = 30000
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500 // 默认的
}
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = false

// HTTPrequest拦截
axios.interceptors.request.use(config => {
  // const TENANT_ID = getStore({ name: 'tenantId' })
  // const isToken = (config.headers || {}).isToken === false
  // const token = store.getters.access_token
  // if (token && !isToken) {
  //   config.headers['Authorization'] = 'Bearer ' + token// token
  // }
  // if (TENANT_ID) {
  //   config.headers['TENANT-ID'] = TENANT_ID // 租户ID
  // }

  // headers中配置serialize为true开启序列化
  // if (config.method === 'post' && config.headers.serialize) {
  //   config.data = serialize(config.data)
  //   delete config.data.serialize
  // }

  // if (config.method === 'get') {
  //   config.paramsSerializer = function (params) {
  //     return qs.stringify(params, { arrayFormat: 'repeat' })
  //   }
  // }

  return config
}, error => {
  return Promise.reject(error)
})

// HTTPresponse拦截
axios.interceptors.response.use(res => {
  const status = Number(res.status) || 200
  const message = res.data.msg || res.data.message;
  // if (status === 401) {
  //   Message({
  //     message: message,
  //     type: 'error'
  //   })
  //   store.dispatch('FedLogOut').then(() => {
  //     router.push({ path: '/login' })
  //   })
  //   return
  // }
  
  if (status !== 200) {
    Message({
      message: message,
      type: 'error'
    })
    return Promise.reject(new Error(message))
  }
  return res
}, error => {
  return Promise.reject(new Error(error))
})

export default axios
