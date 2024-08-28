import { Col, Row } from 'antd'
import React from 'react'
import { withTranslation } from 'react-i18next'
import { Field, Form } from '../../../Components/Formik'

// const Schema = Yup.object().shape({
//   skill: Yup.string().required(),
//   yearOfExperience: Yup.number().required()
// })

const SkillDetailsForm = (props) => (
  <Form>
    <Row justify="left" gutter={(12, 10)}>
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
        <div className="form-field">
          <Field name="skill" label={props.t('Skill')} type="text" />
        </div>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
        <div className="form-field">
          <Field name="yearOfExperience" label={props.t('Year Of Experience')} type="number" />
        </div>
      </Col>
      {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
      <div className="form-field">
        <label>Attachments</label>
        <Attachments
          name="skillAttachments"
          //   value={attachments}
          title="Attach Files"
          description="You can upload a maximum of 3 files, 5MB each"
          acceptFile={['image', 'pdf']}
        />
      </div>
    </Col> */}
    </Row>
  </Form>
)

export default withTranslation()(SkillDetailsForm)
// withFormik({
//   mapPropsToValues: () => ({
//     skill: '',
//     yearOfExperience: ''
//     // skillAttachments: []
//   }),
//   handleSubmit: () => null,
//   validationSchema: Schema
// })(SkillDetailsForm)
