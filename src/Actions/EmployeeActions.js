import { message } from 'antd'
import axios from 'axios'
import AppConfig from '../config'
import { EmployeeType } from './ActionType'

const { API_URL } = AppConfig

export const getAllEmployeesByCompanyAndNetwork = () => (dispatch) => {
  const url = `${API_URL}/employees/get`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.GET_ALL_EMPLOYEES,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Getting employees failed')
    })
}

export const setSelectedEmployee = (payload) => ({
  type: EmployeeType.SET_SELECTED_EMPLOYEE,
  payload
})

export const resetEmployeeDetails = () => ({
  type: EmployeeType.RESET_EMPLOYEE_DETAILS
})

export const getOfficialDetailsByEmployeeID = (id) => (dispatch) => {
  const url = `${API_URL}/employee-details/official-details/get/${id}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_OFFICIAL_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Getting official details failed')
    })
}

export const updateOfficialDetailsByEmployeeID = (id, payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/official-details/update/${id}`

  return axios
    .put(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_OFFICIAL_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to update official details')
    })
}

export const updateEmployeeDetailsByEmployeeID = (id, payload) => (dispatch) => {
  const url = `${API_URL}/employees/update/${id}`

  return axios
    .put(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.UPDATE_EMPLOYEE_DETAILS_BY_ID,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to update employee details')
    })
}

export const getPersonalDetailsByEmployeeID = (id) => (dispatch) => {
  const url = `${API_URL}/employee-details/personal-details/get/${id}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_PERSONAL_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Getting personal details failed')
    })
}

export const updatePersonalDetailsByEmployeeID = (id, payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/personal-details/update/${id}`

  return axios
    .put(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_PERSONAL_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to update personal details')
    })
}

export const getBankDetailsByEmployeeID = (id) => (dispatch) => {
  const url = `${API_URL}/employee-details/bank-details/get-all/${id}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_BANK_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Getting bank details failed')
    })
}

export const updateBankDetailsByEmployeeID = (id, payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/bank-details/update/${id}`

  return axios
    .put(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.UPDATE_BANK_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to update bank details')
    })
}

export const addBankDetailsByEmployeeID = (payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/bank-details/add/`

  return axios
    .post(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.ADD_BANK_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to add bank details')
    })
}

export const getPassportDetailsByEmployeeID = (id) => (dispatch) => {
  const url = `${API_URL}/employee-details/passport-details/get/${id}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_PASSPORT_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Getting passport details failed')
    })
}

export const updatePassportDetailsByEmployeeID = (id, payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/passport-details/update/${id}`

  return axios
    .put(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_PASSPORT_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to update passport details')
    })
}

export const getContactDetailsByEmployeeID = (id) => (dispatch) => {
  const url = `${API_URL}/employee-details/contact-details/get/${id}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_CONTACT_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Getting contact details failed')
    })
}

export const updateContactDetailsByEmployeeID = (id, payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/contact-details/update/${id}`

  return axios
    .put(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_CONTACT_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to update contact details')
    })
}

export const getEmergencyDetailsByEmployeeID = (id) => (dispatch) => {
  const url = `${API_URL}/employee-details/emergency-contacts/getALL/${id}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_EMERGENCY_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Getting emergency details failed')
    })
}

export const updateEmergencyDetailsByEmployeeID = (id, payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/emergency-contacts/update/${id}`

  return axios
    .put(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.UPDATE_EMERGENCY_DETAILS_BY_ID,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to update emergency details')
    })
}

export const addEmergencyDetails = (payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/emergency-contacts/add/`

  return axios
    .post(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.ADD_EMERGENCY_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to add emergency details')
    })
}

export const getInsuranceDetailsByEmployeeID = (id) => (dispatch) => {
  const url = `${API_URL}/employee-details/company-insurance-details/get/${id}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_INSURANCE_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Getting insurance details failed')
    })
}

export const updateInsuranceDetailsByEmployeeID = (id, payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/company-insurance-details/update/${id}`

  return axios
    .put(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_INSURANCE_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to update insurance details')
    })
}

export const getDependentsByEmployeeID = (id) => (dispatch) => {
  const url = `${API_URL}/employee-details/dependents/get-all/${id}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_DEPENDENTS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Getting dependents failed')
    })
}

export const updateDependentsByEmployeeID = (id, payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/dependents/update/${id}`

  return axios
    .put(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.UPDATE_DEPENDENTS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to update dependents details')
    })
}

export const addDependents = (payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/dependents/add/`

  return axios
    .post(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.ADD_DEPENDENTS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to add dependents details')
    })
}

export const getWorkExperienceByEmployeeID = (id) => (dispatch) => {
  const url = `${API_URL}/employee-details/work-experience/get-all/${id}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_WORK_EXPERIENCE,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Getting work experience details failed')
    })
}

export const updateWorkExperienceByEmployeeID = (id, payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/work-experience/update/${id}`

  return axios
    .put(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.UPDATE_WORK_EXPERIENCE,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to update work experience details')
    })
}

export const addWorkExperience = (payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/work-experience/add/`

  return axios
    .post(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.ADD_WORK_EXPERIENCE,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to add work experience details')
    })
}

export const getEducationDetailsByEmployeeID = (id) => (dispatch) => {
  const url = `${API_URL}/employee-details/education/get-all/${id}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_EDUCATION_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Getting education details failed')
    })
}

export const updateEducationDetailsByEmployeeID = (id, payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/education/update/${id}`

  return axios
    .put(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.UPDATE_EDUCATION_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to update education details')
    })
}

export const addEducationDetails = (payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/education/add/`

  return axios
    .post(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.ADD_EDUCATION_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to add education details')
    })
}

export const getSkillDetailsByEmployeeID = (id) => (dispatch) => {
  const url = `${API_URL}/employee-details/skill/get-all/${id}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_SKILL_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Getting skill details failed')
    })
}

export const updateSkillDetailsByEmployeeID = (id, payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/skill/update/${id}`

  return axios
    .put(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.UPDATE_SKILL_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to update skill details')
    })
}

export const addSkillDetails = (payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/skill/add/`

  return axios
    .post(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.ADD_SKILL_DETAILS,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to add skill details')
    })
}

export const getJobHistoryDetailsByEmployeeID = (id) => (dispatch) => {
  const url = `${API_URL}/employee-details/job-history/get-all/${id}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_JOB_HISTORY,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Getting job history details failed')
    })
}

export const updateJobHistoryDetailsByEmployeeID = (id, payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/job-history/update/${id}`

  return axios
    .put(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.UPDATE_JOB_HISTORY,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to update job history details')
    })
}

export const addJobHistoryDetails = (payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/job-history/add/`

  return axios
    .post(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.ADD_JOB_HISTORY,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to add job history details')
    })
}

export const getSalaryHistoryDetailsByEmployeeID = (id) => (dispatch) => {
  const url = `${API_URL}/employee-details/salary-history/get-all/${id}`

  return axios
    .get(url)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.SET_SALARY_HISTORY,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Getting salary history details failed')
    })
}

export const updateSalaryHistoryDetailsByEmployeeID = (id, payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/salary-history/update/${id}`

  return axios
    .put(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.UPDATE_SALARY_HISTORY,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to update salary history details')
    })
}

export const addSalaryHistoryDetails = (payload) => (dispatch) => {
  const url = `${API_URL}/employee-details/salary-history/add/`

  return axios
    .post(url, payload)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: EmployeeType.ADD_SALARY_HISTORY,
          payload: res.data.result
        })

        return res.data.result
      }

      return []
    })
    .catch(() => {
      message.error('Failed to add salary history details')
    })
}
