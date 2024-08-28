import { withFormik } from 'formik'
import _ from 'lodash'
import { withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { Field, Form } from '../../../Components/Formik'
import ModalBoxFooter from '../../../Components/ModalBox/ModalBoxFooter'
import apiClient from '../../../Util/apiClient'
import { STATUS } from '../../../Util/Options'
import { removeEmptyKeys } from '../../../Util/Util'

const Schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  reporter: Yup.string().required(),
  role: Yup.string().required(),
  divisions: Yup.array().when('divisionEnabled', {
    is: true,
    then: (schema) => schema.min(1, 'Division is a required field').required()
  }),
  status: Yup.string().required()
})

function UserForm(props?: any) {
  const onSave = async (invite?: any) => {
    await props.submitForm()
    props.validateForm().then((err: any) => {
      if (_.isEmpty(err)) {
        const data = removeEmptyKeys(props.values)
        data.reporter = data.reporter === 'Self' ? null : data.reporter

        if (props.selectedUser) {
          apiClient.put(`users/update-user-mapping/${props.selectedUser.user}`, data).then(({ data }) => {
            if (data && data.result) {
              props.onCancel('Update')
            }
          })
        } else {
          data.status = invite ? 'Active' : data.status
          data.invite = invite
          apiClient.post('users/add-user-mapping', data).then(({ data }) => {
            if (data && data.result) {
              props.onCancel('Update')
            }
          })
        }
      }
    })
  }

  return (
    <Form>
      <div className="form-fields">
        <Field name="name" label={props.t('Name')} disabled={!!props.selectedUser} />
      </div>
      <div className="form-fields">
        <Field name="email" label={props.t('Email')} disabled={!!props.selectedUser} />
      </div>
      <div className="form-fields">
        <Field
          name="reporter"
          label="Reporter"
          as="paged-select"
          endPoint="users/get-active-by-company"
          optionValue="user"
          defaultOptions={[{ label: 'Self', value: 'Self' }]}
        />
      </div>
      <div className="form-fields">
        <Field name="role" label={props.t('Role')} as="paged-select" endPoint="roles/get-active" />
      </div>
      {props.values.divisionEnabled && (
        <div className="form-fields">
          <Field
            name="divisions"
            label="Divisions"
            as="paged-select"
            mode="multiple"
            endPoint="divisions/get-active"
          />
        </div>
      )}
      <div className="form-fields">
        <Field name="status" label={props.t('Status')} as="select" options={STATUS} />
      </div>
      <div className="form-fields">
        <ModalBoxFooter
          okText={props.t(props.selectedUser ? 'Update' : 'Add')}
          onOk={() => onSave()}
          okText1={props.t('Add & Invite')}
          onOk1={!props.selectedUser ? () => onSave(true) : false}
          onCancel={() => props.onCancel()}
        />
      </div>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: ({ selectedUser = {}, companyInfo }: any) => ({
    name: selectedUser?.name || '',
    email: selectedUser?.email || '',
    reporter: selectedUser?.reporter || 'Self',
    role: selectedUser?.role || '',
    divisions: selectedUser?.divisions || [],
    status: selectedUser?.status || 'Active',
    divisionEnabled: companyInfo?.configurations?.division === 'Yes'
  }),

  handleSubmit: () => null,
  validationSchema: Schema
})(withTranslation()(UserForm))
