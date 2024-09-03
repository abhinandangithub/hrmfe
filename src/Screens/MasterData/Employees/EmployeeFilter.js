import {Col, Row, Space} from 'antd'
import {withFormik} from 'formik'
import _ from 'lodash'
import React from 'react'
import {useNavigate } from 'react-router-dom'
import Button from '../../../Components/Button'
import {Field, Form} from '../../../Components/Formik'
import apiClient from '../../../Util/apiClient'
import {STATUS} from '../../../Util/Options'
import {GET_DATA, removeEmptyKeys, SET_DATA, validateAccess} from '../../../Util/Util'

function Filter(props) {
    const history = useNavigate()

    const onSubmitForm = async () => {
        props.validateForm().then((err) => {
            if (_.isEmpty(err)) {
                const params = removeEmptyKeys(props.values)
                props.onFilter(params)
                SET_DATA('employees.filterData', props.values)
            }
        })
    }

    const onClear = () => {
        props.resetForm({})
        props.onFilter({})
    }

    const onDownload = async () => {
        props.validateForm().then((err) => {
            if (_.isEmpty(err)) {
                const params = _(props.values).omitBy(_.isEmpty).value()
                apiClient
                    .post('download-data/employees', params, {responseType: 'blob'})
                    .then(({status, data, headers}) => {
                        if (status === 200) {
                            const a = document.createElement('a')
                            a.href = window.URL.createObjectURL(data)
                            a.download = JSON.parse(headers['content-disposition'].split('filename=')[1].split(';')[0])
                            document.body.appendChild(a)
                            a.click()
                            a.remove()
                        }
                    })
            }
        })
    }

    return (
        <Form>
            <Row className="mb-1">
                <Col lg={{span: 21,}} className="mt-2">
                    <Space style={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                        {validateAccess('add-employee') && (
                            <Button onClick={() => history('/app/add-employee')} variant="primary"
                                    className="btn-block ">
                                <i className="flaticon-plus"/> Add Employee
                            </Button>
                        )}
                        <Button className="btn-block btn-glow search" onClick={onDownload}>
                            Download
                        </Button>
                    </Space>
                </Col>
                <Col lg={{span: 24,}}/>
                <Col lg={{span: 5,}} className="mx-2 my-2">
                    <div className="form-fields">
                        <Field name="employeeNo" label="Employee No"/>
                    </div>
                </Col>
                <Col lg={{span: 5,}} className="mx-2 my-2">
                    <div className="form-fields">
                        <Field name="name" label="Name"/>
                    </div>
                </Col>
                <Col lg={{span: 5,}} className="mx-2 my-2">
                    <div className="form-fields">
                        <Field name="email" label="Email"/>
                    </div>
                </Col>
                <Col lg={{span: 5,}} className="mx-2 my-2">
                    <div className="form-fields">
                        <Field
                            name="reporter"
                            label="Reporter"
                            as="paged-select"
                            endPoint="users/get-active-by-company"
                            defaultOptions={[{label: 'Self', value: 'Self'}]}
                            optionValue="user"
                        />
                    </div>
                </Col>
                <Col lg={{span: 5,}} className="mx-2 my-2">
                    <div className="form-fields">
                        <Field name="role" label="Role" as="paged-select" endPoint="roles/get-active"/>
                    </div>
                </Col>
                <Col lg={{span: 5,}} className="mx-2 my-2">
                    <div className="form-fields">
                        <Field name="phone" label="Phone"/>
                    </div>
                </Col>
                <Col lg={{span: 5,}} className="mx-2 my-2">
                    <div className="form-fields">
                        <Field name="status" label="Status" as="select" options={STATUS}/>
                    </div>
                </Col>
                <Col lg={{span: 5,}} className="mt-5">
                    <Space style={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                        <Button variant="secondary" className="search justify-end" onClick={onSubmitForm}>
                            <i className="flaticon-search-interface-symbol"/>
                            Search
                        </Button>
                        <Button className="btn-block btn-glow search" onClick={onClear}>
                            Clear
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Form>
    )
}

export default withFormik({
    mapPropsToValues: () => {
        const filterObj = GET_DATA('employees.filterData')

        return {
            employeeNo: filterObj?.employeeNo || '',
            name: filterObj?.name || '',
            email: filterObj?.email || '',
            reporter: filterObj?.reporter || '',
            role: filterObj?.role || '',
            phone: filterObj?.phone || '',
            status: filterObj?.status || ''
        }
    },
    handleSubmit: () => null
    // validationSchema: Schema
})(Filter)
