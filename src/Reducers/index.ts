import { combineReducers, Reducer } from 'redux'
import templates from '../Screens/Templates/Reducer'
import empContributionReducer from './EmpContributionReducer'
import employee from './EmployeeReducer'
import expenseClaims from './ExpenseClaimReducer'
import POSCart from './POSCart/reducer'
import times from './TimeReducer'
import { UserState } from './types'
import users from './UserReducer'

export default combineReducers({
  users: users as Reducer<UserState>,
  times,
  expenseClaims,
  empContributionReducer,
  templates,
  employee,
  POSCart
})
