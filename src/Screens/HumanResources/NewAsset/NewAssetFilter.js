import { withFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { getOptionsByType } from '../../../Actions/UserAction'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { ASSET_TYPE } from '../../../Util/Options'

function NewAssetFilter({ values, setValues, filterData }) {
  const [assetGroups, setAssetGroups] = useState([])

  useEffect(() => {
    setValues({ ...values, ...filterData })

    getOptionsByType({
      type: ['AssetGroup']
    }).then(({ AssetGroup = [] }) => {
      setAssetGroups(AssetGroup)
    })
  }, [])

  return (
    <Form>
      <div className="form-fields">
        <Field name="assetNo" label="Asset No" />
      </div>
      <div className="form-fields">
        <Field name="name" label="Asset name" />
      </div>

      <div className="form-fields">
        <Field as="select" name="assetGroup" label="Asset Group" options={assetGroups} />
      </div>
      <div className="form-fields">
        <Field as="select" name="type" label="Asset Type" options={ASSET_TYPE} />
      </div>
      <div className="form-fields">
        <Field name="serialNo" label="Serial Number" />
      </div>
      <div className="form-fields">
        <Field name="modelNo" label="Model Number" />
      </div>
      <div className="form-fields">
        <Field name="status" label="Status" />
      </div>
      <div className="form-fields">
        <Field name="DepreciationStatus" label="Depreciation Status" />
      </div>
      <div className="form-fields">
        <Button type="submit" variant="secondary" className="search">
          <i className="flaticon-search-interface-symbol" /> Search
        </Button>
        <Button type="reset" className="btn-block btn-glow search">
          Clear
        </Button>
      </div>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    assetNo: '',
    name: '',
    type: '',
    assetGroup: '',
    status: '',
    serialNo: '',
    modelNo: '',
    DepreciationStatus: ''
  }),
  handleSubmit: (values, { props: { onSubmit } }) => onSubmit(values)
})(NewAssetFilter)
