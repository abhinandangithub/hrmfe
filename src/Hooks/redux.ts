import {
  TypedUseSelectorHook,
  useDispatch as useDispatchHook,
  useSelector as useSelectorHook
} from 'react-redux'
import { AppDispatch, RootState } from '../store/store'

// Use throughout your app instead of `useDispatch` and `useSelector`
export const useDispatch = () => useDispatchHook<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorHook
