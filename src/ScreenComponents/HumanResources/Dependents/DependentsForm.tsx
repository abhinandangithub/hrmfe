import { Col, Row } from 'antd'
import { TFunction } from 'i18next'
import { FC, useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import Attachments from '../../../Components/Attachments'
import Field from '../../../Components/Formik/Field'
import Form from '../../../Components/Formik/Form'
import { IAttachment } from '../../../Interfaces/IDependent'
import { IOption } from '../../../Interfaces/IOption'
import apiClient from '../../../Util/apiClient'
import { TDependentDetailsFormValues } from './DependentsDetails'

type TProps = {
  handleValueChange: (values: TDependentDetailsFormValues) => void
  values: TDependentDetailsFormValues
  t: TFunction<'translation', undefined>
}

type TRelationshipOptions = {
  Relationship: IOption<'Relationship'>[]
}

const DependentsForm: FC<TProps> = (props) => {
  const { handleValueChange, values } = props
  const [options, setOptions] = useState<Partial<TRelationshipOptions>>({})
  const fetchDropdownValues = () => {
    apiClient
      .get('options/get-by-types', {
        params: { type: ['Relationship'] }
      })
      .then(({ data }) => {
        if (data && data.result) {
          setOptions(data.result)
        }
      })
  }

  useEffect(() => {
    fetchDropdownValues()
  }, [])

  const onUploadAttachement = (_: string, attachments: IAttachment[]) => {
    handleValueChange({
      ...values,
      attachments: attachments.filter((attachment) => attachment)
    })
  }

  return (
    <Form>
      <Row justify="start" gutter={[12, 10]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-field">
            <Field name="name" label={props.t('Name')} type="text" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field
              name="relationship"
              label={props.t('Relationship')}
              as="select"
              options={options.Relationship?.map?.((opt) => ({ ...opt, lable: props.t(opt.label) })) || []}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="form-field">
            <Field name="dateOfBirth" label={props.t('Date Of Birth')} as="date" />
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
          <div className="form-field">
            <label>{props.t('Attachments')}</label>
            <Attachments
              name="attachments"
              value={values.attachments || []}
              title={props.t('Attach Files')}
              description="You can upload a maximum of 3 files, 5MB each"
              acceptFile={['image', 'pdf']}
              onUpload={onUploadAttachement}
            />
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default withTranslation()(DependentsForm)
