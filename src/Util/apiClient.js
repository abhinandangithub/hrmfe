import { message } from 'antd'
import axios from 'axios'
import _ from 'lodash'
import { loaderRef } from '../App'
import AppConfig from '../config'

const isJsonBlob = (data) => data instanceof Blob && data.type === 'application/json'

const parseJSON = (str) => {
  try {
    return typeof str === 'string' ? JSON.parse(str) : false
  } catch (e) {
    return false
  }
}

let loaderCount = 0

const apiClient = axios.create({
  baseURL: `${AppConfig.API_URL}/`
})

apiClient.interceptors.request.use(
  (config) => {
    loaderRef.barRef?.current.toggleLoader(true)
    loaderCount += 1

    if (config.data?.__errorFields) {
      config.data = _.omit(config.data, '__errorFields')
    }

    config.params = _.omitBy(config.params, (_, key) => key.startsWith('__errorFields'))

    return {
      ...config,
      headers: {
        Authorization: config.headers.Authorization || `Bearer ${localStorage.getItem('ACCOUNTING_USER')}`
      }
    }
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => {
    loaderRef.barRef?.current?.toggleLoader(loaderCount !== 1)
    loaderCount -= 1

    return response
  },
  async ({ response }) => {
    loaderRef.barRef?.current?.toggleLoader(false)
    loaderCount -= 1

    if (response) {
      const { status } = response

      const responseData = isJsonBlob(response?.data) ? await response?.data?.text() : response?.data || {}
      const data = parseJSON(responseData) || responseData || {}

      if (status === 401) {
        message.error(data.message)
        localStorage.removeItem('ACCOUNTING_USER')
        window.location.href = '/login'

        return response
      }

      if (status >= 400 && status < 500) {
        if (data.errors && Object.keys(data.errors).length > 0) {
          errorsParser(data.errors)
        } else if (data.message) {
          message.error(data.message)
        }

        return Promise.resolve({ status, ...data })
      }

      if (status >= 500) {
        errorsParser(data.errors)

        return Promise.resolve({ status, ...data })
      }

      return Promise.resolve({ status, ...data })
    }
  }
)

const errorsParser = (errors) => {
  if (errors) {
    if (typeof errors === 'string') {
      message.error(errors)
    } else {
      Object.values(errors).forEach((err) => {
        message.error(err)
      })
    }
  }
}

export default apiClient
