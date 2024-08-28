import { message } from 'antd'
import axios from 'axios'
import _ from 'lodash'
import AppConfig from '../config'
import apiClient from '../Util/apiClient'
import { UserType } from './ActionType'
import setAuthorizationToken from './setAuthorizationToken'

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

export const register = (data) =>
  axios
    .post(`${API_URL}/networks/register`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Register failed')
    })

export const login = (data) =>
  function (dispatch) {
    return apiClient.post('auth', data).then((res) => {
      if (res.status === 200) {
        setAuthorizationToken(res.data.token)
        dispatch({ type: UserType.GET_USER, payload: res.data.result })

        return res.data
      }
    })
  }

// ---------- User ---------- //

export const getUser = (data) =>
  axios
    .get(`${API_URL}/users/getAll`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting users failed')
    })

export const getUserByToken = (token) =>
  function (dispatch) {
    return axios
      .get(`${API_URL}/users/byToken`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data.success) {
          setAuthorizationToken(token)
          dispatch({ type: UserType.GET_USER, payload: res.data.result })

          return res.data.result
        }

        return undefined
      })
      .catch(() => {
        localStorage.removeItem('ACCOUNTING_USER')
        window.location.href = '/#/login'
      })
  }

export const addUser = (data) =>
  axios.post(`${API_URL}/users/add`, data).then((res) => {
    if (res.data.success) {
      return res.data.result
    }

    message.error(res.data.message)

    return undefined
  })

export const updateUser = (id, data) =>
  function (dispatch) {
    return axios.put(`${API_URL}/users/update/${id}`, data).then((res) => {
      if (res.data.success) {
        dispatch({ type: UserType.GET_USER, payload: res.data.result })

        return res.data.result
      }

      return undefined
    })
  }

export const changePassword = (id, data) =>
  axios.put(`${API_URL}/users/changePassword/${id}`, data).then((res) => {
    if (res.data.success) {
      return res.data.result
    }

    return undefined
  })

export const getUsers = (data) =>
  axios
    .get(`${API_URL}/users/getUsersByCustomer`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting users failed')
    })

// ${convertToQuery(query)

export const getUsersByCompany = (data) => {
  const url = data
    ? `${API_URL}/users/getUsersByCustomerAndCompany/${convertToQuery(data)}`
    : `${API_URL}/users/getUsersByCustomerAndCompany/`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting users failed')
    })
}

export const sendUserInvitaion = (data) =>
  axios
    .put(`${API_URL}/users/sendInvitaion`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Sending invitaion failed')
    })

export const resetUserPasword = (id, data) =>
  axios
    .put(`${API_URL}/users/resetUserPasword/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Reseting password failed')
    })

// ---------- User Mapping ---------- //

export const addUserMapping = (data) =>
  axios
    .post(`${API_URL}/users/addUserMapping`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Adding failed')
    })

export const updateUserMapping = (id, data) =>
  axios
    .put(`${API_URL}/users/updateUserMapping/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating failed')
    })

// ---------- Tokens ---------- //

export const validateToken = (token) =>
  axios
    .get(`${API_URL}/tokens/validateToken/${token}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Validating token failed')
    })

export const closeToken = (token) =>
  axios.put(`${API_URL}/tokens/closeToken/${token}`).then((res) => {
    if (res.data.success) {
      return res.data.result
    }

    return undefined
  })

// ---------- Company ---------- //

export const addCompany = (data) =>
  axios
    .post(`${API_URL}/companies/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Adding company failed')
    })

export const getCompanies = (data) =>
  axios
    .get(`${API_URL}/companies/getAll`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting company failed')
    })

export const getCompaniesByUser = (data) =>
  axios
    .get(`${API_URL}/companies/byUser`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting company failed')
    })

export const getCompanyById = (id) =>
  axios
    .get(`${API_URL}/companies/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting company failed')
    })

export const updateCompany = (id, data) =>
  axios
    .put(`${API_URL}/companies/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating company failed')
    })

export const getCompaniesByCustomer = (query) => {
  const url = query ? `${API_URL}/companies/byCustomer?${query}` : `${API_URL}/companies/byCustomer`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting companies failed')
    })
}

export const createCompanyByInvitation = (data) =>
  axios
    .post(`${API_URL}/companies/createCompanyByInvitation`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Setting up company failed')
    })

// ---------- Master Upload ---------- //

export const masterUpload = (data) =>
  apiClient.post('masterUpload/upload', data).then(({ status, data }) => {
    if (status === 200) {
      if (data.success) {
        message.success(`${data.success} success`)
      }

      return data.errors || []
    }

    return undefined
  })

// ---------- Currency ---------- //

export const addCurrency = (data) =>
  axios
    .post(`${API_URL}/currencies/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Adding currency failed')
    })

export const getCurrencies = (query) => {
  const url = query ? `${API_URL}/currencies/getAll${convertToQuery(query)}` : `${API_URL}/currencies/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting currency failed')
    })
}

export const getActiveCurrencies = (data) =>
  axios
    .get(`${API_URL}/currencies/getAllActive`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result.map((val) => ({
          ...val,
          label: `${val.code} - ${val.name}`,
          value: val.code
        }))
      }

      return []
    })
    .catch(() => {
      message.error('Getting currency failed')
    })

export const getCurrencyById = (id) =>
  axios
    .get(`${API_URL}/currencies/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting currency failed')
    })

export const updateCurrency = (id, data) =>
  axios
    .put(`${API_URL}/currencies/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating currency failed')
    })

// ---------- Country ---------- //

export const addCountry = (data) =>
  axios
    .post(`${API_URL}/countries/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Adding country failed')
    })

export const getCountries = (query) => {
  const url = query ? `${API_URL}/countries/getAll?${query}` : `${API_URL}/countries/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting country failed')
    })
}

export const getCountryById = (id) =>
  axios
    .get(`${API_URL}/countries/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting country failed')
    })

export const updateCountry = (id, data) =>
  axios
    .put(`${API_URL}/countries/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating country failed')
    })

// ---------- Product ---------- //

export const addProduct = (data) =>
  axios
    .post(`${API_URL}/products/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Adding product failed')
    })

export const getProducts = (query) => {
  const url = query ? `${API_URL}/products/getAll?${query}` : `${API_URL}/products/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting product failed')
    })
}

export const getProductsByName = (data) =>
  axios
    .post(`${API_URL}/products/getByName`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting product failed')
    })

export const getProductById = (id) =>
  axios
    .get(`${API_URL}/products/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting product failed')
    })

export const updateProduct = (id, data) =>
  axios
    .put(`${API_URL}/products/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating product failed')
    })

// ---------- Departments ---------- //

export const addDepartment = (data) =>
  axios
    .post(`${API_URL}/departments/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Adding department failed')
    })

export const getDepartments = (query) => {
  const url = query ? `${API_URL}/departments/getAll?${query}` : `${API_URL}/departments/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting department failed')
    })
}

export const getActiveDepartments = (data) =>
  axios
    .get(`${API_URL}/departments/getAllActive`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting currency failed')
    })

export const getDepartmentById = (id) =>
  axios
    .get(`${API_URL}/departments/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting department failed')
    })

export const getDepartmentsByCustomer = (query) => {
  const url = query ? `${API_URL}/departments/byCustomer?${query}` : `${API_URL}/departments/byCustomer`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting departments failed')
    })
}

export const updateDepartment = (id, data) =>
  axios
    .put(`${API_URL}/departments/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating department failed')
    })

// ---------- Clients ---------- //

export const addClient = (data) =>
  axios
    .post(`${API_URL}/clients/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Adding client failed')
    })

export const getClients = (query) => {
  const url = query ? `${API_URL}/clients/getAll?${query}` : `${API_URL}/clients/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting client failed')
    })
}

export const getActiveClients = () =>
  axios
    .get(`${API_URL}/clients/getAllActive`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting client failed')
    })

export const getClientById = (id) =>
  axios
    .get(`${API_URL}/clients/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting client failed')
    })

export const updateClient = (id, data) =>
  axios
    .put(`${API_URL}/clients/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating client failed')
    })

export const getClientsByCustomer = (query) => {
  const url = query ? `${API_URL}/clients/byCustomer?${query}` : `${API_URL}/clients/byCustomer`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting clients failed')
    })
}

export const invitationToCollaborate = (data) =>
  axios
    .put(`${API_URL}/clients/invitationToCollaborate`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Sending invitaion failed')
    })

// ---------- Banks ---------- //

export const addBank = (data) =>
  axios
    .post(`${API_URL}/banks/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Adding bank failed')
    })

export const getBanksByCompany = (query) => {
  const url = `${API_URL}/banks/getByCompany${convertToQuery(query)}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting bank failed')
    })
}

export const getBanksByClient = (query) => {
  const url = `${API_URL}/banks/getByClient${convertToQuery(query)}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting bank failed')
    })
}

export const getBankById = (id) =>
  axios
    .get(`${API_URL}/banks/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting bank failed')
    })

export const updateBank = (id, data) =>
  axios
    .put(`${API_URL}/banks/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating bank failed')
    })

// ---------- Options ---------- //

export const addOption = (data) =>
  axios
    .post(`${API_URL}/options/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Adding option failed')
    })

export const getOptions = (query) => {
  const url = query ? `${API_URL}/options/getAll${convertToQuery(query)}` : `${API_URL}/options/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting options failed')
    })
}

export const getActiveOptions = (data) =>
  axios
    .get(`${API_URL}/options/getAllActive`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting options failed')
    })

export const getOptionById = (id) =>
  axios
    .get(`${API_URL}/options/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting option failed')
    })

export const updateOption = (id, data) =>
  axios
    .put(`${API_URL}/options/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating option failed')
    })

// ---------- Templates ---------- //

export const addTemplate = (data) =>
  axios
    .post(`${API_URL}/templates/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Adding template failed')
    })

export const getTemplates = (data) =>
  axios
    .get(`${API_URL}/templates/getAll`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting templates failed')
    })

export const getActiveTemplates = () =>
  axios
    .get(`${API_URL}/customTemplates/getActive`, { params: { type: 'Invoice' } })
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting templates failed')
    })

export const getTemplateById = (id) =>
  axios
    .get(`${API_URL}/templates/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting template failed')
    })

export const updateTemplate = (id, data) =>
  axios
    .put(`${API_URL}/templates/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating template failed')
    })

export const deleteTemplate = (id, data) =>
  axios
    .delete(`${API_URL}/templates/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Deleting template failed')
    })

// ---------- Invoices ---------- //

export const addInvoice = (data) =>
  axios
    .post(`${API_URL}/invoices/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Adding invoice failed')
    })

export const getInvoices = (query) => {
  const url = query ? `${API_URL}/invoices/getAll${convertToQuery(query)}` : `${API_URL}/invoices/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting invoices failed')
    })
}

export const getInvoiceItems = (query) => {
  const url = query
    ? `${API_URL}/invoices/getAllInvoiceItems?${query}`
    : `${API_URL}/invoices/getAllInvoiceItems`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting invoices failed')
    })
}

export const getInvoiceById = (id) =>
  axios
    .get(`${API_URL}/invoices/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting invoice failed')
    })

export const viewInvoiceById = (id) =>
  axios
    .get(`${API_URL}/invoices/view/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting invoice failed')
    })

export const viewInvoiceByToken = (token) =>
  axios
    .get(`${API_URL}/invoices/viewByToken/${token}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting invoice failed')
    })

export const updateInvoice = (id, data) =>
  axios
    .put(`${API_URL}/invoices/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Updating invoice failed')
    })

export const deleteInvoice = (id, data) =>
  axios
    .delete(`${API_URL}/invoices/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Deleting invoice failed')
    })

export const submitInvoice = (data) =>
  axios
    .put(`${API_URL}/invoices/submit`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Submitting invoice failed')
    })

export const manageInvoice = (id, data) =>
  axios
    .put(`${API_URL}/invoices/manage/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Invoice failed')
    })

export const sendInvoiceEmails = (data) =>
  axios
    .post(`${API_URL}/invoices/send-emails`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Sending invoice failed')
    })

export const sendInvoiceReminderEmails = (data) =>
  axios
    .post(`${API_URL}/invoices/sendReminderEmails`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Sending invoice failed')
    })

export const getInvoiceLogs = (id) =>
  axios
    .get(`${API_URL}/invoices/logs/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting logs failed')
    })

export const getDashboardData = (query) => {
  const url = query
    ? `${API_URL}/invoices/getDashboardData${convertToQuery(query)}`
    : `${API_URL}/invoices/getDashboardData`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting invoices failed')
    })
}

export const uploadMassInvoice = (data) =>
  axios
    .post(`${API_URL}/invoices/massUpload`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Uploading invoice failed')
    })

export const generateClientInvoice = (data) =>
  axios
    .post(`${API_URL}/invoices/generateClientInvoice`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Generating invoice failed')
    })

export const transmitInvoice = (id) =>
  axios
    .put(`${API_URL}/invoices/transmit/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Transmitting invoice failed')
    })

export const receivedInvoice = (id) =>
  axios
    .put(`${API_URL}/invoices/received/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Receiving invoice failed')
    })

export const rejectTransmissionInvoice = (id) =>
  axios
    .put(`${API_URL}/invoices/rejectTransmission/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Rejecting invoice failed')
    })

export const getClientInvoices = (query) => {
  const url = query
    ? `${API_URL}/invoices/getClientInvoice${convertToQuery(query)}`
    : `${API_URL}/invoices/getClientInvoice`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting invoices failed')
    })
}

export const viewTransmissionInvoiceById = (id) =>
  axios
    .get(`${API_URL}/invoices/viewTransmissionById/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting invoice failed')
    })

export const getTrasmissionDashboardData = (query) => {
  const url = `${API_URL}/invoices/getTrasmissionDashboardData${convertToQuery(query)}`

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

export const getClientTrasmissionDashboardData = (query) => {
  const url = `${API_URL}/invoices/getClientTrasmissionDashboardData${convertToQuery(query)}`

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

export const getInvoiceTransmissionLogs = () =>
  axios
    .get(`${API_URL}/invoices/transmissionLogs`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting logs failed')
    })

// ---------- ExchangeRate ---------- //

export const getExchangeRate = (base, to, date) => {
  let url = `${API_URL}/exchangeRates/getRate${convertToQuery({ base, to })}`

  if (date) {
    url += `&date=${date}`
  }

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return { rate: 0.0 }
    })
    .catch(() => ({ rate: 0.0 }))
}

// ---------- Employees ---------- //

export const addEmployee = (data) =>
  axios
    .post(`${API_URL}/employees/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Adding employee failed')
    })

export const getEmployees = (query) => {
  const url = query ? `${API_URL}/employees/get-all?${query}` : `${API_URL}/employees/get-all`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employees failed')
    })
}

export const getEmployeesByName = (data) =>
  axios
    .post(`${API_URL}/employees/getByName`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employee failed')
    })

export const getEmployeeById = (id) =>
  axios
    .get(`${API_URL}/employees/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employee failed')
    })

export const getReportees = (id) => {
  const url = `${API_URL}/employees/getReportees/${id}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employees failed')
    })
}

export const updateEmployee = (id, data) =>
  axios
    .put(`${API_URL}/employees/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating employee failed')
    })

// ---------- Employee Paymasters ---------- //

export const addEmployeePaymaster = (data) =>
  axios
    .post(`${API_URL}/employeePaymasters/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Adding employee paymaster failed')
    })

export const getEmployeePaymasters = (query) => {
  const url = query ? `${API_URL}/employeePaymasters/getAll?${query}` : `${API_URL}/employeePaymasters/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employees paymaster failed')
    })
}

export const getEmployeePaymastersByName = (data) =>
  axios
    .post(`${API_URL}/employeePaymasters/getByName`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employee paymaster failed')
    })

export const getEmployeePaymasterById = (id) =>
  axios
    .get(`${API_URL}/employeePaymasters/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employee paymaster failed')
    })

export const updateEmployeePaymaster = (id, data) =>
  axios
    .put(`${API_URL}/employeePaymasters/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating employee paymaster failed')
    })

// ---------- Employer Template ---------- //

export const addEmployerTemplate = (data) =>
  function (dispatch) {
    return axios.post(`${API_URL}/employerTemplates/add`, data).then((res) => {
      if (res.data.success) {
        dispatch({ type: UserType.SET_CURRENTLY_ADDED_DATA, payload: res.data.result })

        return res.data.result
      }

      return undefined
    })
  }
// export const addEmployerTemplate = (data) =>{

// function (dispatch) {
//   return  axios
//   .post(`${API_URL}/employerTemplates/add`, data)
//   .then((res) => {
//     if (res.data.success) {
//       return res.data.result
//       dispatch({ type: UserType.SET_CURRENTLY_ADDED_DATA, payload: res.data.result })
//     }

//     return undefined
//   })
//   .catch(() => {
//     message.error('Adding employer template  failed')
//   })
// }
// }

export const getEmployerTemplates = (query) => {
  const url = query ? `${API_URL}/employerTemplates/getAll?${query}` : `${API_URL}/employerTemplates/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employer template failed')
    })
}

export const getEmployerTemplateById = (id) =>
  axios
    .get(`${API_URL}/employerTemplates/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employer template failed')
    })

export const updateEmployerTemplate = (id, data) =>
  function (dispatch) {
    return axios
      .put(`${API_URL}/employerTemplates/update/${id}`, data)
      .then((res) => {
        if (res.data.success) {
          dispatch({ type: UserType.SET_CURRENTLY_UPDATED_DATA, payload: res.data.result })

          return res.data.result
        }

        return undefined
      })
      .catch(() => {
        message.error('Updating employer template failed')
      })
  }

export const getEmployerContributionDeatialsByMonth = () => {
  const url = `${API_URL}/employerTemplates/getByMonthAndWageMode`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employer template failed')
    })
}

export const getUpdatedData = (id) =>
  function (dispatch) {
    return axios
      .get(`${API_URL}/employerTemplates/byId/${id}`)
      .then((res) => {
        if (res.data.success) {
          dispatch({ type: UserType.GET_CURRENT_EDIT_DATA, payload: res.data.result })

          return res.data.result
        }

        return undefined
      })
      .catch(() => {
        message.error('Getting employer template failed')
      })
  }

// ---------- Projects ---------- //

export const addProject = (data) =>
  axios
    .post(`${API_URL}/projects/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Adding project failed')
    })

export const getProjects = (query) => {
  const url = query ? `${API_URL}/projects/getAll?${query}` : `${API_URL}/projects/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result.map((item) => ({
          label: `${item.code} - ${item.name}`,
          value: item.code,
          ...item
        }))
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting projects failed')
    })
}

export const getProjectById = (id) =>
  axios
    .get(`${API_URL}/projects/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting project failed')
    })

export const updateProject = (id, data) =>
  axios
    .put(`${API_URL}/projects/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating project failed')
    })

// ---------- Employee Template ---------- //

export const addEmployeeTemplate = (data) =>
  axios
    .post(`${API_URL}/employeeTemplates/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Adding employee template  failed')
    })

export const getEmployeeTemplates = (query) => {
  const url = query ? `${API_URL}/employeeTemplates/getAll?${query}` : `${API_URL}/employeeTemplates/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employee template failed')
    })
}

export const getEmployeeTemplateById = (id) =>
  axios
    .get(`${API_URL}/employeeTemplates/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employee template failed')
    })

export const updateEmployeeTemplate = (id, data) =>
  axios
    .put(`${API_URL}/employeeTemplates/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating employee template failed')
    })

// ---------- Time Vesting ---------- //

export const addTimeEntry = (data) =>
  axios
    .post(`${API_URL}/timeEntries/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Adding time failed')
    })

export const getTimeEntriesByEmployee = (employee, query) => {
  const url = query
    ? `${API_URL}/timeEntries/getByEmployee/${employee}${convertToQuery(query)}`
    : `${API_URL}/timeEntries/getByEmployee/${employee}`

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

export const getTimeEntryById = (id) => {
  const url = `${API_URL}/timeEntries/byId/${id}`

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

export const updateTimeEntry = (id, data) =>
  axios
    .put(`${API_URL}/timeEntries/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating Time failed')
    })

export const deleteTimeEntry = (id) =>
  axios
    .delete(`${API_URL}/timeEntries/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Deleting time entry failed')
    })

export const submitTimeEntry = (data) =>
  axios
    .post(`${API_URL}/timeEntries/submit`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Submitting time failed')
    })

export const returnTimeEntry = (data) =>
  axios
    .post(`${API_URL}/timeEntries/return`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Returning time failed')
    })

export const manageTimeEntry = (data) =>
  axios
    .post(`${API_URL}/timeEntries/manage`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Returning time failed')
    })

export const getWeeklyTimeEntriesByReporter = (reporter, query) => {
  const url = query
    ? `${API_URL}/timeEntries/getWeeklyTimeEntriesByReporter/${reporter}${convertToQuery(query)}`
    : `${API_URL}/timeEntries/getWeeklyTimeEntriesByReporter/${reporter}`

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

export const getTimeEntriesByEmployeeAndWeekId = (reporter, weekId) => {
  const url = `${API_URL}/timeEntries/getTimeEntriesByEmployeeAndWeekId/${reporter}/${weekId}`

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

export const getTimeEntriesByEmployeeAndMonth = (reporter, date) => {
  const url = `${API_URL}/timeEntries/getTimeEntriesByEmployeeAndMonth/${reporter}/${date}`

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

export const startTimer = (data) =>
  axios
    .put(`${API_URL}/timeEntries/startTimer`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Starting Time failed')
    })

export const endTimer = (data) =>
  axios
    .put(`${API_URL}/timeEntries/endTimer`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Ending Time failed')
    })

export const getTimeLogs = (user, query) => {
  const url = query
    ? `${API_URL}/timeEntries/getTimeLogs/${user}${convertToQuery(query)}`
    : `${API_URL}/timeEntries/getTimeLogs/${user}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting Logs failed')
    })
}

// ---------- Roles ---------- //

export const addRole = (data) =>
  axios
    .post(`${API_URL}/roles/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Adding role failed')
    })

export const getRoles = (query) => {
  const url = query ? `${API_URL}/roles/getAll?${query}` : `${API_URL}/roles/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting roles failed')
    })
}

export const getRoleById = (id) =>
  axios
    .get(`${API_URL}/roles/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting role failed')
    })

export const getRolesByCustomer = (query) => {
  const url = query ? `${API_URL}/roles/byCustomer?${query}` : `${API_URL}/roles/byCustomer`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting roles failed')
    })
}

export const updateRoles = (data) =>
  axios
    .put(`${API_URL}/roles/updateAll`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating roles failed')
    })

export const addExpense = (data) =>
  axios
    .post(`${API_URL}/expenseClaims/`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Adding Expense failed')
    })

export const getExpensesByUser = (query) => {
  const url = query
    ? `${API_URL}/expenseClaims/getByUser/${convertToQuery(query)}`
    : `${API_URL}/expenseClaims/getByUser`

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

export const getExpenses = (data) =>
  axios
    .get(`${API_URL}/expenseClaims/`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting Expense failed')
    })

export const getExpensesById = (id) =>
  axios
    .get(`${API_URL}/expenseClaims/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting Expense failed')
    })

export const updateExpenses = (id, data) =>
  axios
    .put(`${API_URL}/expenseClaims/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating Expense failed')
    })

export const recallExpense = (id) =>
  axios
    .put(`${API_URL}/expenseClaims/recall/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error('recalling Expense failed')
    })
    .catch(() => {
      message.error('recalling Expense failed')
    })

export const submitExpense = (id) =>
  axios
    .put(`${API_URL}/expenseClaims/submit/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error('submitting Expense failed')
    })
    .catch(() => {
      message.error('submitting Expense failed')
    })

export const deleteExpense = (id) =>
  axios
    .delete(`${API_URL}/expenseClaims/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error('Deleting Expense failed')
    })
    .catch(() => {
      message.error('Deleting Expense failed')
    })

export const submitExpenseClaim = (data) =>
  axios
    .post(`${API_URL}/expenseClaims/submit`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error('Submitting Expense claim failed')
    })
    .catch(() => {
      message.error('submitting Expense claim failed')
    })

export const returnExpenseClaim = (data) =>
  axios
    .post(`${API_URL}/expenseClaims/return`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error('Returning Expense claim failed')
    })
    .catch(() => {
      message.error('Returning Expense claim failed')
    })

export const manageExpenseClaim = (data) =>
  axios
    .post(`${API_URL}/expenseClaims/manage`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Returning Expense claim failed')
    })

export const getExpenseClaimLogs = (user, query) => {
  const url = query
    ? `${API_URL}/expenseClaims/getLogs/${user}${convertToQuery(query)}`
    : `${API_URL}/expenseClaims/getLogs/${user}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting Logs failed')
    })
}

export const getWeeklyExpenseClaimByReporter = (reporter, query) => {
  const url = query
    ? `${API_URL}/expenseClaims/getWeeklyExpenseClaimByReporter/${reporter}${convertToQuery(query)}`
    : `${API_URL}/expenseClaims/getWeeklyExpenseClaimByReporter/${reporter}`

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

// ------------ Expense categories -----------//

export const getExpenseCategories = (data) =>
  axios
    .get(`${API_URL}/expense-categories/`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting Expense Categories failed')
    })

export const getCategories = (query) => {
  const url = query
    ? `${API_URL}/expense-categories${convertToQuery(query)}`
    : `${API_URL}/expense-categories`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting Categories failed')
    })
}

export const getCategoryById = (id) =>
  axios
    .get(`${API_URL}/expense-categories/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting Category failed')
    })

export const addCategory = (data) =>
  axios
    .post(`${API_URL}/expense-categories/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Adding Category failed')
    })

export const updateCategory = (id, data) =>
  axios
    .put(`${API_URL}/expense-categories/update/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Updating Category failed')
    })

// ---------- Client Billing Rates ------- //

export const addClientBillingRates = (data) =>
  axios
    .post(`${API_URL}/client-billing-rates/`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Adding Client Billing Rates failed')
    })

export const deleteBillingRate = (id) =>
  axios
    .delete(`${API_URL}/client-billing-rates/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)
    })
    .catch(() => {
      message.error('Failed to delete client billing rate')
    })

export const getClientBillingRates = (query) =>
  axios
    .get(`${API_URL}/client-billing-rates${convertToQuery(query)}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting Client Billing Rates failed')
    })

export const getClientWithTimeAndExpenseClaim = (query) =>
  axios
    .get(`${API_URL}/projects/getRatesByClient${convertToQuery(query)}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting Client Billing Rates failed')
    })

export const getClientBillingRatesById = (id) =>
  axios
    .get(`${API_URL}/client-billing-rates/byId/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting Client Billing Rates failed')
    })

export const updateClientBillingRates = (id, data) =>
  axios
    .put(`${API_URL}/client-billing-rates/${id}`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Updating Client Billing Rates failed')
    })

export const getWarehouseCodes = (params) =>
  apiClient.get('warehouses/get-codes', { params }).then(({ status, data }) => {
    if (status === 200) {
      return data.map((item) => ({ label: item.warehouse, value: item.warehouse, ...item }))
    }

    return []
  })

export const getLocationsByWarehouse = (params) =>
  apiClient
    .get('warehouses/get-locations', {
      params
    })
    .then(({ status, data }) => {
      if (status === 200) {
        return data.map((item) => ({ label: item.location, value: item.location, ...item }))
      }

      return []
    })

export const getRacksByLocation = (params) =>
  apiClient
    .get('warehouses/get-racks', {
      params
    })
    .then(({ status, data }) => {
      if (status === 200) {
        return data.map((item) => ({ label: item.rack, value: item.rack, ...item }))
      }

      return []
    })

export const getOptionsByType = (params) =>
  apiClient.get('options/getByType', { params }).then(({ status, data }) => {
    if (status === 200) {
      return data
    }

    return {}
  })

export const getWarehousesByStock = (params) =>
  apiClient.get('stocks/get-warehouses', { params }).then(({ status, data }) => {
    if (status === 200) {
      return data.map((item) => ({ label: item, value: item }))
    }

    return []
  })

export const getLocationsByStock = (params) =>
  apiClient
    .get('stocks/get-locations', {
      params
    })
    .then(({ status, data }) => {
      if (status === 200) {
        return data.filter((item) => item).map((item) => ({ label: item, value: item }))
      }

      return []
    })

export const getRacksByStock = (params) =>
  apiClient
    .get('stocks/get-racks', {
      params
    })
    .then(({ status, data }) => {
      if (status === 200) {
        return data.filter((item) => item).map((item) => ({ label: item, value: item }))
      }

      return []
    })

export const getMaterialCodes = (params) =>
  apiClient
    .get('warehouse-products/get-codes', {
      params
    })
    .then(({ status, data }) => {
      if (status === 200) {
        return data.map((item) => ({
          label: item.basic.materialCode,
          value: item.basic.materialCode,
          ...item
        }))
      }

      return []
    })

export const getMaterial = (params) =>
  apiClient
    .get('warehouse-products/search', {
      params
    })
    .then(({ status, data }) => {
      if (status === 200) {
        return data.map((item) => ({
          label: _.compact([
            item.basic.materialCode,
            item.basic.materialDescription,
            item.basic.partNumber
          ]).join(' - '),
          value: item.basic.materialCode,
          ...item
        }))
      }

      return []
    })

export const getStockCost = (params) =>
  apiClient
    .get('stocks/get-stock-cost', {
      params
    })
    .then(({ status, data }) => {
      if (status === 200) {
        return data
      }

      return undefined
    })

// ---------- Employee Paymaster ------- //
export const getEmployeePaymasterDetails = (data) => {
  console.log('data-------', data)

  return axios
    .post(`${API_URL}/employeePayMasters/getByMonth`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      message.error(res.data.message)

      return undefined
    })
    .catch(() => {
      message.error('Getting Paymaster deatils failed')
    })
}

export const getPayrollTemplate = () => {
  const url = `${API_URL}/employerTemplates/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employees failed')
    })
}

export const getLogs = (query) => {
  const url = `${API_URL}/logs/getLogs/${convertToQuery(query)}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting Logs failed')
    })
}

export const selectedData = (data) =>
  function (dispatch) {
    dispatch({ type: UserType.SET_SELECTED_DATA, payload: data })
  }

export const clearSelectedData = () =>
  function (dispatch) {
    dispatch({ type: UserType.CLEAR_SELECTED_DATA, payload: {} })
  }

// -------------------Tax Data------------ //

export const getTaxData = (data) => {
  console.log('getTaxData', data)

  return axios
    .post(`${API_URL}/taxDataDetails/getByYear`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting Tax Data Failed')
    })
}

export const addTaxData = (data) => {
  console.log('getTaxData', data)

  return axios
    .post(`${API_URL}/taxDataDetails/add`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Post Tax Data Failed')
    })
}

export const getTaxCode = (data) => {
  const url = `${API_URL}/taxDataDetails/getTaxCode`

  return axios
    .post(url, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Get Taxcode Failed')
    })
}

export const getHolidayList = () => {
  const url = `${API_URL}/holidayCalendar/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting holiday list failed')
    })
}

export const addHolidayCalendar = (data) => {
  const url = `${API_URL}/holidayCalendar/add`

  return axios
    .post(url, data)
    .then((res) => {
      if (res.data.success) {
        console.log('res', res)

        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting holiday list failed')
    })
}

export const getHolidayById = (id) =>
  axios
    .get(`${API_URL}/holidayCalendar/getById/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employer template failed')
    })

export const updateHolidayById = (data) =>
  axios
    .put(`${API_URL}/holidayCalendar/updateById`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employer template failed')
    })

export const generatePayroll = (data) =>
  axios
    .post(`${API_URL}/payroll/generatePayroll`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employer template failed')
    })

export const addAccountCatogory = (data) => {
  const url = `${API_URL}/accountGroup/add`

  return axios
    .post(url, data)
    .then((res) => {
      if (res.data.success) {
        console.log('res', res)

        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting add account categories list failed')
    })
}

export const getAccountCatById = (id) => {
  console.log('id', id)

  return axios
    .get(`${API_URL}/accountGroup/getById/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employer template failed')
    })
}

export const updateAccountCatById = (data) =>
  axios
    .put(`${API_URL}/accountGroup/updateById`, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employer template failed')
    })

export const getAccountCatList = (query) => {
  const url = `${API_URL}/accountGroup/getAll/${convertToQuery(query)}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting Account list failed')
    })
}

export const addAccountChart = (data) => {
  const url = `${API_URL}/chartsOfAccount/add`

  return axios
    .post(url, data)
    .then((res) => {
      if (res.data.success) {
        console.log('res', res)

        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting add account chart failed')
    })
}

export const EditAccountChart = (id) => {
  const url = `${API_URL}/chartsOfAccount/getById/${id}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Edit account chart failed')
    })
}

export const updateAccountCharts = (data) => {
  const url = `${API_URL}/chartsOfAccount/updateById`

  return axios
    .put(url, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Update account chart failed')
    })
}

export const getAccountType = (data) => {
  const url = `${API_URL}/accountGroup/getAccountTypeByRange`

  return axios
    .post(url, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting accountType failed')
    })
}

export const addExchangeRate = (data) => {
  const url = `${API_URL}/exchangeRates/add`

  return axios
    .post(url, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting accountType failed')
    })
}

export const getExchangeRates = (query) => {
  console.log('query', query, convertToQuery(query))
  const url = `${API_URL}/exchangeRates/getAll/${convertToQuery(query)}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting accountType failed')
    })
}

export const getExchangeById = (id) =>
  axios
    .get(`${API_URL}/exchangeRates/getById/${id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting employer template failed')
    })

export const updateExchange = (data) => {
  const url = `${API_URL}/exchangeRates/updateById`

  return axios
    .put(url, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Update account chart failed')
    })
}

export const getExchangeRatesById = (data) => {
  const url = `${API_URL}/exchangeRates/getByMonth`

  return axios
    .post(url, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting accountType failed')
    })
}

export const getTaxDataList = (query) => {
  console.log('query', query, convertToQuery(query))
  const url = `${API_URL}/taxDataDetails/getAll/${convertToQuery(query)}`

  return axios
    .get(url)
    .then((res) => res.data)
    .catch(() => {
      message.error('Getting accountType failed')
    })
}

export const getPaymasterFields = () => {
  const url = `${API_URL}/payroll-definitions/getAll`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting error in Paymaster feileds')
    })
}

export const addAndUpdatePaymaster = (data) => {
  const url = `${API_URL}/payrollBase/addAndUpdate`

  return axios
    .post(url, data)
    .then((res) => {
      if (res.data.success) {
        return res.data.result
      }

      return undefined
    })
    .catch(() => {
      message.error('Getting error in Paymaster feileds')
    })
}

/**
 * Check stock availability for a product.
 *
 * @param {Object} params - The parameters for the stock check.
 * @param {string | string[]} params.materialCode - An array of material codes (strings).
 * @param {boolean} [params.expired] - A boolean indicating whether to check for expired stock.
 * @returns {Promise<Array<quantity: number; status: string; materialCode: string; materialDescription: string; unit: string; warehouse: string; value: number;>>} A Promise that resolves to an object representing stock data.
 *
 */
export const stockCheck = (params) =>
  apiClient
    .get('stocks/check', {
      params
    })
    .then(({ status, data }) => {
      if (status === 200) {
        return data
      }

      return []
    })

export const getMasterCurrencies = () =>
  apiClient.get('currencies/getMaster').then(({ data }) => {
    if (data && data.result) {
      return data.result.map((val) => ({
        ...val,
        label: `${val.code} - ${val.name}`,
        value: val.code
      }))
    }

    return []
  })
