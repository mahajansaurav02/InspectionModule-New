import axios from 'axios'
import store from 'src/store'
import URLS from 'src/URLS'

const api = axios.create({
  baseURL:URLS.BaseURL || '',
})

// 🔥 Automatically attach headers BEFORE every request
api.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const { token, user } = state.auth || {}

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (user) {
      config.headers.servarthId = user.servarthId
      config.headers.echHost = user.dbInfo?.echHost
      config.headers.echDbName = user.dbInfo?.echDbName
      config.headers.echSchemaName = user.dbInfo?.echSchemaName
      config.headers.mhrHost = user.dbInfo?.mhrHost
      config.headers.mhrDbName = user.dbInfo?.mhrDbName
      config.headers.mhrSchemaName = user.dbInfo?.mhrSchemaName
    }

    config.headers['Accept-Language'] =
      localStorage.getItem('umi_locale') === 'ma-IN' ? 'mr-IN' : 'en-US'

    return config
  },
  (error) => Promise.reject(error),
)

export default api
