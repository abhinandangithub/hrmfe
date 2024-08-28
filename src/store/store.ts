import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../Reducers'

// const logger = createLogger()

const middleware = applyMiddleware(thunk)

const store = createStore(reducer, middleware)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
