import arrayMove from 'array-move'
import { UserType } from '../../Actions/ActionType'

const initialState = {
  selectedItem: false,
  selectedItems: []
}

const setData = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { selectedItems: action.payload.selectedItems })

  return newState
}

const changeTemplatePosition = (state, action) => {
  const { id, siblingId, direction } = action.payload
  const index = state.template.findIndex((t) => t.id === id)
  const siblingIndex = state.template.findIndex((t) => t.id === siblingId)
  const fromIdx = direction === 'back' ? index : siblingIndex
  const toIdx = direction === 'back' ? siblingIndex : index
  const newState = {}
  const template = arrayMove([].concat(state.template), fromIdx, toIdx)
  Object.assign(newState, state, action.payload, { template })

  return newState
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UserType.SET_TEMPLATE_DATA: {
      return setData(state, action)
    }

    case UserType.CHANGE_TEMPLATE_POSITION: {
      return changeTemplatePosition(state, action)
    }

    default: {
      return state
    }
  }
}
