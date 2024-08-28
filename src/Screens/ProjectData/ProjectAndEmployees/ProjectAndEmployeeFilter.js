import { Formik } from 'formik'
import _ from 'lodash'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import { validateAccess } from '../../../Util/Util'

export default function ProjectAndEmployeeFilter({ onSubmit }) {
  const history = useHistory()

  return (
    <>
      {validateAccess('add-project-employee') && (
        <Button
          onClick={() => history.push('/app/add-project-employee')}
          variant="primary"
          className="btn-block">
          Add Project & employee
        </Button>
      )}
      <Formik
        initialValues={{
          name: ''
        }}
        onSubmit={(values) => onSubmit(_(values).omitBy(_.isEmpty).value())}>
        <Form>
          <div className="form-fields">
            <Field name="name" label="name" />
          </div>
          <div className="form-fields">
            <Button type="submit" variant="primary" className="search">
              <i className="flaticon-search-interface-symbol" />
              Search
            </Button>
            <Button type="reset" className="btn-block search">
              Clear
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  )
}
