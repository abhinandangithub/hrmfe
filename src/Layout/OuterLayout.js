import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Footer from '../Screens/Footer/Footer'
import Header from '../Screens/Header/Header'

function OuterLayout(props) {
  const history = useHistory()

  history.listen(() => {
    const appView = document.getElementById('app-view')

    if (appView) {
      appView.scrollIntoView()
    }
  })
  const { screen: Comp } = props

  return (
    <>
      <span id="app-view" />
      <Header />
      <Comp {...props} />
      <Footer />
    </>
  )
}

function mapStateToProps(state) {
  return {
    lang: state.users.lang
  }
}

export default connect(mapStateToProps)(OuterLayout)
