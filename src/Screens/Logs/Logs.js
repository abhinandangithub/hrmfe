import React from 'react'
import { getLogs } from '../../Actions/UserAction'
import LoaderBox from '../../Components/LoaderBox/LoaderBox'
import Logbox from '../../Components/LogBox/LogBox'

class Logs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logs: [],
      loader: true
    }
    this.getLogData()
  }

  getLogData = () => {
    const { entityId, entityType } = this.props
    getLogs({ entityId, entityType }).then((logs) => {
      if (logs) {
        this.setState({ logs, loader: false })
      } else {
        this.setState({ loader: false })
      }
    })
  }

  render() {
    return (
      <>
        <LoaderBox
          loader={this.state.loader}
          noData={this.state.logs.length === 0 ? 'No Logs Found' : false}
        />
        {this.state.logs.length > 0 && <Logbox logs={this.state.logs} />}
      </>
    )
  }
}

export default Logs
