import { message } from 'antd'
import axios from 'axios'
import AppConfig from '../config'
import apiClient from '../Util/apiClient'

const { API_URL } = AppConfig

// ---------- Workflows ------- //

export const getMyWorkflows = (params) =>
  axios
    .get(`${API_URL}/workflows/myWorkflows`, { params })
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Getting workflows failed')
    })

export const readWorkflow = (id) =>
  axios
    .get(`${API_URL}/workflows/readWorkflow/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting workflows failed')
    })

export const getWeekAndTimeEntries = (weekId) => {
  const url = `${API_URL}/workflows/getWeekAndTimeEntries/${weekId}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting times failed')
    })
}

export const getWeekAndExpenseClaims = (weekId) => {
  const url = `${API_URL}/workflows/getWeekAndExpenseClaims/${weekId}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting expense claims failed')
    })
}

export const approveWorkflow = (id) =>
  apiClient.put(`workflows/approve/${id}`, {}).then((res) => {
    if (res.data?.success) {
      return res.data.result
    }
  })

export const rejectWorkflow = (id, data) =>
  apiClient.put(`workflows/reject/${id}`, data).then((res) => {
    if (res.data?.success) {
      return res.data.result
    }
  })
