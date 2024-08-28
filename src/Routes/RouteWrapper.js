import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Footer from '../Screens/Footer/Footer'
import Header from '../Screens/Header/Header'

function RouteWrapper(props) {
  const history = useHistory()

  history.listen(() => {
    const appView = document.getElementById('app-view')

    if (appView) {
      appView.scrollIntoView()
    }
  })
  const { screen: Comp, metaObj, headerFooter } = props
  const defaultMetaObject = {
    title: metaObj ? metaObj.title : 'Accqrate Human Capital management solution',
    description: metaObj ? metaObj.description : 'Accqrate Human Capital management solution',
    keyword: metaObj ? metaObj.keyword : 'Accqrate Human Capital management solution'
  }

  return (
    <>
      <span id="app-view" />
      <Helmet>
        <title>{defaultMetaObject.title}</title>
        <meta name="description" content={defaultMetaObject.description} />
        <meta name="keyword" content={defaultMetaObject.keyword} />
      </Helmet>
      {headerFooter && <Header />}
      <Comp {...props} />
      {headerFooter && <Footer />}
    </>
  )
}

function mapStateToProps(state) {
  return {
    lang: state.users.lang
  }
}

export default connect(mapStateToProps)(RouteWrapper)
