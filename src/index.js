import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import LoaderBox from './Components/LoaderBox/LoaderBox'
import './globals'
import './i18n'
import * as serviceWorker from './serviceWorker'
import './Style/styles.scss'

const App = lazy(() => import('./App'))

ReactDOM.render(
  <Suspense fallback={<LoaderBox loader />}>
    <App />
  </Suspense>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
