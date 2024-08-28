import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { validateAccess } from '../Util/Util'
import NotFound from './NotFound'

class AsyncRoute extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { match, routeAccess, screen: Comp } = this.props
    const defaultMetaobject = {
      title: 'Accqrate Human Capital management solution',
      description: 'Accqrate Human Capital management solution',
      keyword: 'Accqrate Human Capital management solution'
    }

    if (validateAccess(routeAccess || match.path, !routeAccess)) {
      return (
        <div style={{ height: '100%' }}>
          <Helmet>
            <title>{defaultMetaobject.title}</title>
            <meta name="description" content={defaultMetaobject.description} />
            <meta name="keyword" content={defaultMetaobject.keyword} />
          </Helmet>
          <Comp {...this.props} />
        </div>
      )
    }

    return <NotFound />
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    companyInfo: state.users.companyInfo,
    access: state.users.access
  }
}

export default connect(mapStateToProps)(AsyncRoute)
