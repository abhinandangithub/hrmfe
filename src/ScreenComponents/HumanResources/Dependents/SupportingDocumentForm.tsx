import { Col, Row } from 'antd'
import { TFunction } from 'i18next'
import { withTranslation } from 'react-i18next'
import Attachments from '../../../Components/Attachments'
import Field from '../../../Components/Formik/Field'
import Form from '../../../Components/Formik/Form'
import { IAttachment } from '../../../Interfaces/IDependent'
import { DEPENDENT_DOC_TYPES } from '../../../Util/Options'
import { TSupportingDocumentsFormValues } from './SupportingDocuments'

type TDependentOptionList = {
  label: string
  value: string
  relationship: string
}

type TProps = {
  isEditing: boolean
  dependentsOptionList: TDependentOptionList[]
  values: TSupportingDocumentsFormValues
  handleValueChange: (values: TSupportingDocumentsFormValues) => void
  t: TFunction<'translation', undefined>
}

const SupportingDocumentForm = (props: TProps) => {
  const { values, dependentsOptionList, isEditing, handleValueChange } = props

  const onUploadAttachement = (_: unknown, attachments: IAttachment[]) => {
    handleValueChange({
      ...values,
      attachments: attachments.filter((attachment) => attachment)
    })
  }

  return (
    <Form>
      <Row justify="start" gutter={[12, 10]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              required
              name="dependentId"
              label={props.t('Select Dependent')}
              as="select"
              options={dependentsOptionList}
              disabled={isEditing}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="relationship"
              label={props.t('Relationship')}
              disabled
              value={
                dependentsOptionList.find((dependent) => dependent.value === values.dependentId)
                  ?.relationship ?? ''
              }
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              disabled={isEditing}
              required
              name="docType"
              label={props.t('Doc Type')}
              as="select"
              options={DEPENDENT_DOC_TYPES}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field required name="docNumber" label={props.t('ID Number')} />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field required name="validFrom" label={props.t('Valid From')} as="date" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field required name="validTo" label={props.t('Valid To')} as="date" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-field">
            <label>{props.t('Attachments')}</label>
            <Attachments
              name="educationAttachments"
              value={values?.attachments || []}
              title={props.t('Attach Files')}
              description={props.t('You can upload a maximum of 3 files, 5MB each')}
              acceptFile={['image', 'pdf']}
              onUpload={onUploadAttachement}
              fileLength={3}
            />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withTranslation()(SupportingDocumentForm)
