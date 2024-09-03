import React from 'react'
import InputBox from '../../../Components/InputBox/InputBox'
import { validateAccess } from '../../../Util/Util'

export default class CountryFilter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // visible: false,
      name: '',
      code: ''
    }
  }

  onChangeText = (value, type) => {
    this.setState({ [type]: value })
  }

  onFilter = () => {
    const { name, code } = this.state
    const queryArr = []

    if (name && name !== '') {
      queryArr.push(`name=${name}`)
    }

    if (code && code !== '') {
      queryArr.push(`code=${code}`)
    }

    this.props.onFilter(queryArr.length > 0 ? queryArr.join('&') : false)
  }

  render() {
    return (
      <>
        {validateAccess('add-company') && (
          <button
            type="button"
            onClick={() => this.props.history('/app/add-country')}
            className="btn-glow btn-block primary">
            Add new country
          </button>
        )}
        <form action="">
          <div className="form-fields">
            <InputBox
              label="Name"
              id="name"
              value={this.state.name}
              onChangeText={this.onChangeText}
              optional
            />
          </div>
          <div className="form-fields">
            <InputBox
              label="Code"
              id="code"
              value={this.state.code}
              onChangeText={this.onChangeText}
              optional
            />
          </div>
          <div className="form-fields">
            <div onClick={this.onFilter} className="btn-glow btn-block search">
              <i className="flaticon-search-interface-symbol" /> Search
            </div>
          </div>
        </form>
      </>
    )
  }
}
