import React from 'react'
import { withRouter } from 'react-router-dom'
import DateBox from '../../../Components/DateBox/DateBox'
import InputBox from '../../../Components/InputBox/InputBox'

// const options = [
//   {
//     value: 'Option 1',
//     label: 'Option 1'
//   },
//   {
//     value: 'Option 2',
//     label: 'Option 2'
//   },
//   {
//     value: 'Option 3',
//     label: 'Option 3'
//   }
// ]
class HolidaycalendarFilter extends React.Component {
  constructor() {
    super()
    this.state = {
      // collapsed: false,
      // sample: '',
      // sample_select: '',
      // employee: []
    }
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  render() {
    return (
      <>
        {/* search filter starts  */}
        <div className="filter-section">
          <button
            type="button"
            onClick={() => this.props.history('/app/add-holiday-calendar')}
            className="btn-glow btn-block primary">
            <i className="flaticon-plus" />
            Add Holiday Calendar
          </button>
          <form action="">
            <div className="form-fields">
              <DateBox label="Day" id="day" optional />
            </div>
            <div className="form-fields">
              <InputBox label="Region" id="region" optional />
            </div>
            <div className="form-fields">
              <button type="button" className="btn-glow search">
                <i className="flaticon-search-interface-symbol" />
                Search
              </button>
            </div>
          </form>
        </div>
        {/* search filter ends */}
      </>
    )
  }
}

export default withRouter(HolidaycalendarFilter)
