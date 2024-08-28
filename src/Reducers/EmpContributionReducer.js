import { UserType } from '../Actions/ActionType'

const initialState = {
  empContributionData: [],
  selectedData: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UserType.SET_CURRENTLY_ADDED_DATA:
      return { ...state, empContributionData: action.payload }

    case UserType.SET_CURRENTLY_UPDATED_DATA:
      return { ...state, empContributionData: action.payload }

    case UserType.GET_CURRENT_EDIT_DATA:
      return { ...state, empContributionData: action.payload }

    case UserType.SET_SELECTED_DATA:
      return { ...state, selectedData: action.payload }

    case UserType.CLEAR_SELECTED_DATA:
      return { ...state, selectedData: action.payload }

    default: {
      return state
    }
  }
}
