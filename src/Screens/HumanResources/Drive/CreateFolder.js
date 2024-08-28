import { withFormik } from 'formik'
import _ from 'lodash'
import * as Yup from 'yup'
import { Field, Form } from '../../../Components/Formik'
import ModalBoxFooter from '../../../Components/ModalBox/ModalBoxFooter'
import apiClient from '../../../Util/apiClient'
import { removeEmptyKeys } from '../../../Util/Util'

const Schema = Yup.object().shape({
  name: Yup.string().required()
})

function CreateFolder(props) {
  const onSave = async () => {
    await props.submitForm()
    props.validateForm().then((err) => {
      if (_.isEmpty(err)) {
        const data = removeEmptyKeys(props.values)
        const { parentId } = props
        data.parentId = props.parentId ? parentId : null
        // data.parentNodes = [...(props.parentData?.parentNodes || [])]

        // if (data.parentId) {
        //   data.parentNodes.push(data.parentId)
        // }
        const jwtToken = localStorage.getItem('ACCOUNTING_USER')
        data.token = jwtToken
        apiClient.post('filestructure/add', data).then(({ data }) => {
          if (data && data.result) {
            props.onCancel()
            props.getData()
          }
        })
      }
    })
  }

  return (
    <Form>
      <div className="form-fields">
        <Field name="name" label="Name" />
      </div>
      <div className="form-fields">
        <ModalBoxFooter okText={props.selectedData} onOk={() => onSave()} onCancel={() => props.onCancel()} />
      </div>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: ({ selectedData = {} }) => ({
    name: selectedData?.name || ''
  }),

  handleSubmit: () => null,
  validationSchema: Schema
})(CreateFolder)
