import { message } from 'antd'
import axios from 'axios'
import AppConfig from '../config'
import apiClient from '../Util/apiClient'

const { API_URL } = AppConfig

// const formDataHeader = {
//   Accept: 'application/x-www-form-urlencoded',
//   'Content-Type': 'application/x-www-form-urlencoded',
//   'cache-control': 'no-cache'
// }

const convertToQuery = (query) => {
  let url = ''

  if (query && Object.keys(query).length > 0) {
    const queryArr = Object.keys(query)
      .map((val) => `${val}=${query[val]}`)
      .join('&')
    url += `?${queryArr}`
  }

  return url
}

// ---------- Incomes ---------- //

export const addIncome = (data) =>
  axios
    .post(`${API_URL}/incomes/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Adding income failed')
    })

export const getIncomes = (query) => {
  const url = query ? `${API_URL}/incomes/get-all${convertToQuery(query)}` : `${API_URL}/incomes/get-all`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.result) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting incomes failed')
    })
}

export const getIncomeItems = (query) => {
  const url = query ? `${API_URL}/incomes/getAllIncomeItems?${query}` : `${API_URL}/incomes/getAllIncomeItems`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.result) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting incomes failed')
    })
}

export const getIncomeById = (id) =>
  axios
    .get(`${API_URL}/incomes/byId/${id}`)
    .then((res) => {
      if (res.data) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting income failed')
    })

export const viewIncomeById = (id) =>
  axios
    .get(`${API_URL}/incomes/view/${id}`)
    .then((res) => {
      if (res.data.result) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting income failed')
    })

export const viewIncomeByToken = (token) =>
  axios
    .get(`${API_URL}/incomes/viewByToken/${token}`)
    .then((res) => {
      if (res.data.result) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting income failed')
    })

export const updateIncome = (id, data) =>
  axios
    .put(`${API_URL}/incomes/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Updating income failed')
    })

export const deleteIncome = (id, data) =>
  axios
    .delete(`${API_URL}/incomes/${id}`, data)
    .then((res) => {
      if (res.data.result) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Deleting income failed')
    })

export const submitIncome = (data) =>
  apiClient.put('incomes/submit', data).then(({ status, data }) => {
    if (status === 200 && data.success) {
      return data.result
    }

    return undefined
  })

export const cancelIncome = (id, data) =>
  axios
    .put(`${API_URL}/incomes/cancel/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Cancel failed')
    })

export const sendIncomeEmails = (data) =>
  axios
    .post(`${API_URL}/incomes/send-emails`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Sending income failed')
    })

export const sendIncomeReminderEmails = (data) =>
  axios
    .post(`${API_URL}/incomes/sendReminderEmails`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Sending income failed')
    })

export const getIncomeLogs = (id) =>
  axios
    .get(`${API_URL}/incomes/logs/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting logs failed')
    })

export const getIncomeDashboardData = (query) => {
  const url = query
    ? `${API_URL}/incomes/getDashboardData${convertToQuery(query)}`
    : `${API_URL}/incomes/getDashboardData`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.result) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting incomes failed')
    })
}

export const uploadMassIncome = (data) =>
  axios
    .post(`${API_URL}/incomes/massUpload`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Uploading income failed')
    })

export const generateClientIncome = (data) =>
  axios
    .post(`${API_URL}/incomes/generateClientIncome`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Generating income failed')
    })

export const transmitIncome = (id) =>
  axios
    .put(`${API_URL}/incomes/transmit/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Transmitting income failed')
    })

export const approveTransmissionIncome = (id) =>
  axios
    .put(`${API_URL}/incomes/approveTransmission/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Approving income failed')
    })

export const rejectTransmissionIncome = (id) =>
  axios
    .put(`${API_URL}/incomes/rejectTransmission/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Rejecting income failed')
    })

export const getOutboundTransmissions = (query) => {
  const url = `${API_URL}/incomes/getOutboundTransmissions${convertToQuery(query)}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.result) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting incomes failed')
    })
}

export const getInboundTransmissions = (query) => {
  const url = `${API_URL}/incomes/getInboundTransmissions${convertToQuery(query)}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.result) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting incomes failed')
    })
}

export const viewOutboundTransmissionById = (id) =>
  axios
    .get(`${API_URL}/incomes/viewOutboundTransmissionById/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting transmission failed')
    })

export const viewInboundTransmissionById = (id) =>
  axios
    .get(`${API_URL}/incomes/viewInboundTransmissionById/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting transmission failed')
    })

export const getTrasmissionDashboardData = (query) => {
  const url = `${API_URL}/incomes/getTrasmissionDashboardData${convertToQuery(query)}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.result) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting Transmission failed')
    })
}

export const getClientTrasmissionDashboardData = (query) => {
  const url = `${API_URL}/incomes/getClientTrasmissionDashboardData${convertToQuery(query)}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting Transmission failed')
    })
}

export const getIncomeTransmissionLogs = () =>
  axios
    .get(`${API_URL}/incomes/transmissionLogs`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting logs failed')
    })

export const incomeToExpense = (data) =>
  axios
    .post(`${API_URL}/incomes/incomeToExpense`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Adding as expense failed')
    })

// ---------- Expenses ---------- //

export const addExpense = (data) =>
  axios
    .post(`${API_URL}/expenses/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Adding expense failed')
    })

export const getExpenses = (query) => {
  const url = query ? `${API_URL}/expenses/getAll${convertToQuery(query)}` : `${API_URL}/expenses/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting expenses failed')
    })
}

export const getExpenseItems = (query) => {
  const url = query
    ? `${API_URL}/expenses/getAllExpenseItems?${query}`
    : `${API_URL}/expenses/getAllExpenseItems`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting expenses failed')
    })
}

export const getExpenseById = (id) =>
  axios
    .get(`${API_URL}/expenses/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting expense failed')
    })

export const viewExpenseById = (id) =>
  axios
    .get(`${API_URL}/expenses/view/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting expense failed')
    })

export const viewExpenseByToken = (token) =>
  axios
    .get(`${API_URL}/expenses/viewByToken/${token}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting expense failed')
    })

export const updateExpense = (id, data) =>
  axios
    .put(`${API_URL}/expenses/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Updating expense failed')
    })

export const deleteExpense = (id, data) =>
  axios
    .delete(`${API_URL}/expenses/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Deleting expense failed')
    })

export const submitExpense = (data) =>
  apiClient.put('expenses/submit', data).then(({ data, status }) => {
    if (status === 200 && data.success) {
      return data.result
    }

    return undefined
  })

export const cancelExpense = (id, data) =>
  axios
    .put(`${API_URL}/expenses/cancel/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Cancel failed')
    })

export const sendExpenseEmails = (data) =>
  axios
    .post(`${API_URL}/expenses/send-emails`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Sending expense failed')
    })

export const sendExpenseReminderEmails = (data) =>
  axios
    .post(`${API_URL}/expenses/sendReminderEmails`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Sending expense failed')
    })

export const getExpenseLogs = (id) =>
  axios
    .get(`${API_URL}/expenses/logs/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting logs failed')
    })

export const getExpenseDashboardData = (query) => {
  const url = query
    ? `${API_URL}/expenses/getDashboardData${convertToQuery(query)}`
    : `${API_URL}/expenses/getDashboardData`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting expenses failed')
    })
}

export const uploadMassExpense = (data) =>
  axios
    .post(`${API_URL}/expenses/massUpload`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Uploading expense failed')
    })
