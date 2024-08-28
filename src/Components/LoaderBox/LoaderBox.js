import PropTypes from 'prop-types'
import React from 'react'
import invoice from '../../assets/images/loader.svg'

const LoaderBox = ({ loader, noData, style }) => (
  <>
    {loader && (
      <div className="loading-content" style={style}>
        <img src={invoice} alt="Loading" />
        <h1>{loader === true ? 'Loading..' : loader}</h1>
      </div>
    )}
    {!loader && noData && (
      <div className="loading-content" style={style}>
        <img src={invoice} alt="No Data found" />
        <h1>{noData === true ? 'No Data found..' : noData}</h1>
      </div>
    )}
  </>
)

LoaderBox.propTypes = {
  loader: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  noData: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  style: PropTypes.object
}

export default LoaderBox
