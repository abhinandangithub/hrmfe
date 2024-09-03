import { cloneDeep, findIndex } from 'lodash'
import { EmployeeType } from '../Actions/ActionType'

const initialState = {
  allEmployees: [],
  selectedEmployeeID: '',
  employeeDetails: {
    officialDetails: {},
    personalDetails: {},
    bankDetails: [],
    passportDetails: {},
    contactDetails: {},
    emergencyDetails: [],
    insuranceDetails: {},
    dependents: [],
    workExperience: [],
    educationDetails: [],
    skillDetails: [],
    jobHistory: [],
    salaryHistory: []
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EmployeeType.GET_ALL_EMPLOYEES:
      return { ...state, allEmployees: action.payload }

    case EmployeeType.SET_SELECTED_EMPLOYEE:
      return { ...state, selectedEmployeeID: action.payload }

    case EmployeeType.RESET_EMPLOYEE_DETAILS:
      return { ...state, selectedEmployeeID: '', employeeDetails: cloneDeep(initialState.employeeDetails) }

    case EmployeeType.SET_OFFICIAL_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.officialDetails = action.payload

      return { ...state, employeeDetails }
    }

    case EmployeeType.UPDATE_EMPLOYEE_DETAILS_BY_ID: {
      const allEmployees = cloneDeep(state.allEmployees)
      const index = findIndex(allEmployees, { id: action.payload.id })

      if (index >= 0) {
        allEmployees[index] = action.payload
      }

      return { ...state, allEmployees }
    }

    case EmployeeType.SET_PERSONAL_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.personalDetails = action.payload

      return { ...state, employeeDetails }
    }

    case EmployeeType.SET_BANK_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.bankDetails = action.payload

      return { ...state, employeeDetails }
    }

    case EmployeeType.ADD_BANK_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.bankDetails.push(action.payload)

      return { ...state, employeeDetails }
    }

    case EmployeeType.UPDATE_BANK_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)

      const { bankDetails } = employeeDetails
      const index = findIndex(bankDetails, { id: action.payload.id })

      if (index >= 0) {
        if (action.payload.status === 'Inactive') {
          bankDetails.splice(index, 1)
        } else if (action.payload.status === 'Active') {
          bankDetails[index] = action.payload
        }

        employeeDetails.bankDetails = bankDetails
      }

      return { ...state, employeeDetails }
    }

    case EmployeeType.SET_PASSPORT_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.passportDetails = action.payload

      return { ...state, employeeDetails }
    }

    case EmployeeType.SET_CONTACT_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.contactDetails = action.payload

      return { ...state, employeeDetails }
    }

    case EmployeeType.SET_EMERGENCY_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.emergencyDetails = action.payload

      return { ...state, employeeDetails }
    }

    case EmployeeType.ADD_EMERGENCY_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.emergencyDetails.push(action.payload)

      return { ...state, employeeDetails }
    }

    case EmployeeType.UPDATE_EMERGENCY_DETAILS_BY_ID: {
      const employeeDetails = cloneDeep(state.employeeDetails)

      const { emergencyDetails } = employeeDetails
      const index = findIndex(emergencyDetails, { id: action.payload.id })

      if (index >= 0) {
        if (action.payload.status === 'Inactive') {
          emergencyDetails.splice(index, 1)
        } else if (action.payload.status === 'Active') {
          emergencyDetails[index] = action.payload
        }

        employeeDetails.emergencyDetails = emergencyDetails
      }

      return { ...state, employeeDetails }
    }

    case EmployeeType.SET_INSURANCE_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.insuranceDetails = action.payload

      return { ...state, employeeDetails }
    }

    case EmployeeType.SET_DEPENDENTS: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.dependents = action.payload

      return { ...state, employeeDetails }
    }

    case EmployeeType.ADD_DEPENDENTS: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.dependents.push(action.payload)

      return { ...state, employeeDetails }
    }

    case EmployeeType.UPDATE_DEPENDENTS: {
      const employeeDetails = cloneDeep(state.employeeDetails)

      const { dependents } = employeeDetails
      const index = findIndex(dependents, { id: action.payload.id })

      if (index >= 0) {
        if (action.payload.status === 'Inactive') {
          dependents.splice(index, 1)
        } else if (action.payload.status === 'Active') {
          dependents[index] = action.payload
        }

        employeeDetails.dependents = dependents
      }

      return { ...state, employeeDetails }
    }

    case EmployeeType.SET_WORK_EXPERIENCE: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.workExperience = action.payload

      return { ...state, employeeDetails }
    }

    case EmployeeType.ADD_WORK_EXPERIENCE: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.workExperience.push(action.payload)

      return { ...state, employeeDetails }
    }

    case EmployeeType.UPDATE_WORK_EXPERIENCE: {
      const employeeDetails = cloneDeep(state.employeeDetails)

      const { workExperience } = employeeDetails
      const index = findIndex(workExperience, { id: action.payload.id })

      if (index >= 0) {
        if (action.payload.status === 'Inactive') {
          workExperience.splice(index, 1)
        } else if (action.payload.status === 'Active') {
          workExperience[index] = action.payload
        }

        employeeDetails.workExperience = workExperience
      }

      return { ...state, employeeDetails }
    }

    case EmployeeType.SET_EDUCATION_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.educationDetails = action.payload

      return { ...state, employeeDetails }
    }

    case EmployeeType.ADD_EDUCATION_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.educationDetails.push(action.payload)

      return { ...state, employeeDetails }
    }

    case EmployeeType.UPDATE_EDUCATION_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)

      const { educationDetails } = employeeDetails
      const index = findIndex(educationDetails, { id: action.payload.id })

      if (index >= 0) {
        if (action.payload.status === 'Inactive') {
          educationDetails.splice(index, 1)
        } else if (action.payload.status === 'Active') {
          educationDetails[index] = action.payload
        }

        employeeDetails.educationDetails = educationDetails
      }

      return { ...state, employeeDetails }
    }

    case EmployeeType.SET_SKILL_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.skillDetails = action.payload

      return { ...state, employeeDetails }
    }

    case EmployeeType.ADD_SKILL_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.skillDetails.push(action.payload)

      return { ...state, employeeDetails }
    }

    case EmployeeType.UPDATE_SKILL_DETAILS: {
      const employeeDetails = cloneDeep(state.employeeDetails)

      const { skillDetails } = employeeDetails
      const index = findIndex(skillDetails, { id: action.payload.id })

      if (index >= 0) {
        if (action.payload.status === 'Inactive') {
          skillDetails.splice(index, 1)
        } else if (action.payload.status === 'Active') {
          skillDetails[index] = action.payload
        }

        employeeDetails.skillDetails = skillDetails
      }

      return { ...state, employeeDetails }
    }

    case EmployeeType.SET_JOB_HISTORY: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.jobHistory = action.payload

      return { ...state, employeeDetails }
    }

    case EmployeeType.ADD_JOB_HISTORY: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.jobhistory(action.payload)

      return { ...state, employeeDetails }
    }

    case EmployeeType.UPDATE_JOB_HISTORY: {
      const employeeDetails = cloneDeep(state.employeeDetails)

      const { jobHistory } = employeeDetails
      const index = findIndex(jobHistory, { id: action.payload.id })

      if (index >= 0) {
        if (action.payload.status === 'Inactive') {
          jobHistory.splice(index, 1)
        } else if (action.payload.status === 'Active') {
          jobHistory[index] = action.payload
        }

        employeeDetails.jobHistory = jobHistory
      }

      return { ...state, employeeDetails }
    }

    case EmployeeType.SET_SALARY_HISTORY: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.salaryHistory = action.payload

      return { ...state, employeeDetails }
    }

    case EmployeeType.ADD_SALARY_HISTORY: {
      const employeeDetails = cloneDeep(state.employeeDetails)
      employeeDetails.salaryhistory(action.payload)

      return { ...state, employeeDetails }
    }

    case EmployeeType.UPDATE_SALARY_HISTORY: {
      const employeeDetails = cloneDeep(state.employeeDetails)

      const { salaryHistory } = employeeDetails
      const index = findIndex(salaryHistory, { id: action.payload.id })

      if (index >= 0) {
        if (action.payload.status === 'Inactive') {
          salaryHistory.splice(index, 1)
        } else if (action.payload.status === 'Active') {
          salaryHistory[index] = action.payload
        }

        employeeDetails.salaryHistory = salaryHistory
      }

      return { ...state, employeeDetails }
    }

    default: {
      return state
    }
  }
}
