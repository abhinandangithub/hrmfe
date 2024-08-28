import { memo } from 'react'
import { connect } from 'react-redux'
import store from '../../store/store'

const t = (text) => {
  const newState = store.getState()
  const { translations, language } = newState.users

  return translations[text] && translations[text][language] ? translations[text][language] : text
}

function Translate(props) {
  const { children } = props

  return t(children)
}

function mapStateToProps(state) {
  return {
    language: state.users.language,
    translations: state.users.translations
  }
}

export default connect(mapStateToProps)(memo(Translate))

export { t }
