import { EditOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button from '../../../Components/Button'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import FooterActions from '../../../Components/FooterActions'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import Panel from '../../../Layout/Panel'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
import { convertSelectOptions } from '../../../Util/Util'
import ApproverDetailsForm from './ApproverDetailsForm'
import OrganizationalDetailsForm from './OrganizationalDetailsForm'
import PayrollDetailsForm from './PayrollDetailsForm'
import PositionDetailsFrom from './PositionDetailsFrom'

const Schema = Yup.object().shape({
  timeAndAbsenceApprover: Yup.string().nullable(),
  approverLegal: Yup.string().nullable(),
  reporter: Yup.string().nullable(),
  manager: Yup.string().nullable(),
  joiningDate: Yup.string().nullable(),
  costCenter: Yup.string().nullable()
})

const OfficialDetails = (props) => {
  const {
    values,
    setValues,
    employeeId,
    restrictPage,
    history,
    currentEmployee,
    handleValueChange,
    resetForm,
    errors,
    companyInfo
  } = props

  const [toggle, setToggle] = useState(false)
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  const [toggle3, setToggle3] = useState(false)

  const [userData, setUserData] = useState([])

  const [editData, setEditData] = useState(null)

  const [, setEmployeeCategoryOptions] = useState([])
  const [, setPayRoll] = useState([])
  const [positionDataSource, setpositionDataSource] = useState([])
  const [organizationDataSource, setorganizationDataSource] = useState([])
  const [payrollDataSource, setPayrollDataSource] = useState([])
  const [approverDataSource, setapproverDataSource] = useState([])
  const [, setWorkSchedules] = useState([{ label: '', value: '' }])
  const [, setWorkSchedule] = useState()

  useEffect(() => {
    getDetails()
  }, [employeeId])

  const getDetails = () => {
    apiClient.get('users/get-active-by-company').then(({ data }) => {
      if (data && data.result) {
        setUserData(
          data.result.map((item) => ({
            label: item.name,
            value: item._id,
            ...item
          }))
        )
      }
    })

    apiClient.get(`employees/get/${employeeId}`).then(({ data }) => {
      if (data && data.result) {
        const employeeData = data.result
        if (employeeData.workSchedule) {
          setWorkSchedule(employeeData.workScheduleData)
        }

        apiClient.get(`/employee-details/approvers/get-all/${employeeId}`).then(({ data }) => {
          if (data) {
            setapproverDataSource(data.result || [])
            setValues({ ...values, ...data.result })
          }
        })

        apiClient.get(`/employee-details/payroll-details/get/${employeeId}`).then(({ data }) => {
          if (data) {
            setPayrollDataSource(data.result || [])
          }
        })

        apiClient.get(`/employee-details/org-details/get/${employeeId}`).then(({ data }) => {
          if (data) {
            console.log('org data', data.result)
            setorganizationDataSource(data.result || [])
          }
        })

        apiClient.get(`/employee-details/position-details/get/${employeeId}`).then(({ data }) => {
          if (data) {
            setpositionDataSource(data.result || [])
          }
        })

        // apiClient.get(`companies/get/${employeeData.company}`).then(({ data }) => {
        //   if (data && data.result) {
        //     setTargetWorkingHours(data.result.configurations.workingHours ?? 40)
        //   }
        // })
      }
    })

    apiClient.get('options/getAllActive', { params: { type: 'employeeCategory' } }).then(({ data }) => {
      if (data && data.result) {
        setEmployeeCategoryOptions(data.result)
      }
    })

    apiClient.get('customTemplates/getAll', { params: { type: 'Payroll' } }).then(({ data }) => {
      if (data && data.result) {
        setPayRoll(convertSelectOptions(data.result, 'name', 'id'))
      }
    })
  }

  useEffect(() => {
    apiClient.get('work-schedules/getAll').then(({ data }) => {
      if (data && data.result) {
        if (data.result?.length > 0) {
          console.log('workSchedules data,result', data.result)
          const workSchedules = data.result.map((el) => ({
            label: `${el.scheduleId}-${el.name} ${el.shift}`,
            value: el._id
          }))
          setWorkSchedules(workSchedules)
        }
      }
    })
    // get work-schedule list
  }, [])

  // useEffect(() => {
  //   if (editable) {
  //     fetchDropdownValues()
  //   }
  // }, [props.editable])

  const positionColumns = [
    {
      title: props.t('Valid From'),
      dataIndex: 'validFrom',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Valid To'),
      dataIndex: 'validTo',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },

    { title: props.t('Position Number'), dataIndex: 'positionNumber' },
    {
      title: props.t('Position Title / Designation'),
      dataIndex: 'positionTitleData',
      render: (text) => text?.positionTitle ?? ''
    },
    {
      title: props.t('Cost Center'),
      dataIndex: 'costCenterData',
      render: (text) => text?.name ?? ''
    },
    {
      title: props.t('Job Level'),
      dataIndex: 'jobLevelData',
      render: (text) => text?.jobLevel ?? ''
    },
    {
      title: props.t('Job Band'),
      dataIndex: 'jobBandData',
      render: (text) => text?.jobBands ?? ''
    },
    {
      title: props.t('Grade'),
      dataIndex: 'gradeData',
      render: (text) => text?.gradeName ?? ''
    },
    {
      title: props.t('FTE'),
      dataIndex: 'fte',
      render: (text) => text ?? '' // Assuming 'fte' might also be nullable
    },
    {
      title: props.t('Employee Target Working hours'),
      dataIndex: 'employeeTargetWorkingHours',
      render: (text) => text ?? '' // Assuming 'employeeTargetWorkingHours' might also be nullable
    },
    {
      title: props.t('Role and Responsibility'),
      dataIndex: 'roleAndResponsibility',
      render: (text) => text ?? '' // Assuming 'roleAndResponsibility' might also be nullable
    }
  ]

  const organizationColumns = [
    {
      title: props.t('Valid From'),
      dataIndex: 'validFrom',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Valid To'),
      dataIndex: 'validTo',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Organization Unit'),
      dataIndex: 'organizationUnitData',
      render: (text) => text?.organizationName || ''
    },
    { title: props.t('Division'), dataIndex: 'divisionData', render: (text) => text?.name || '' },
    { title: props.t('Department'), dataIndex: 'departmentData', render: (text) => text?.name || '' },
    {
      title: props.t('Operational Manager'),
      dataIndex: 'operationalManagerData',
      render: (text) => text?.name || ''
    },
    { title: props.t('Matrix Manager'), dataIndex: 'matrixManagerData', render: (text) => text?.name || '' },
    { title: props.t('HR Manager'), dataIndex: 'hrManagerData', render: (text) => text?.name || '' },
    {
      title: props.t('Operational level 1'),
      dataIndex: 'operationalLevel1Data',
      render: (text) => text?.operationalLevel1Name || ''
    },
    {
      title: props.t('Operational level 2'),
      dataIndex: 'operationalLevel2Data',
      render: (text) => text?.operationalLevel2 || ''
    },
    {
      title: props.t('Operational level 3'),
      dataIndex: 'operationalLevel3Data',
      render: (text) => text?.operationalLevel3Name || ''
    }
  ]

  const payrollColumns = [
    {
      title: props.t('Valid From'),
      dataIndex: 'validFrom',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Valid To'),
      dataIndex: 'validTo',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },

    { title: props.t('Payroll Area'), dataIndex: 'payrollAreaData', render: (text) => text.payrollAreaName },
    { title: props.t('Pay Group'), dataIndex: 'payGroupData', render: (text) => text.payGroup },
    { title: props.t('Wage Type'), dataIndex: 'wageTypeData', render: (text) => text.wageType },
    { title: props.t('Location'), dataIndex: 'locationData', render: (text) => text.name },
    { title: props.t('Region'), dataIndex: 'regionData', render: (text) => text.region },
    {
      title: props.t('Employee Group'),
      dataIndex: 'employeeGroupData',
      render: (text) => text?.employeeGroupId || ''
    },
    {
      title: props.t('Employee Subgroup'),
      dataIndex: 'employeeSubgroupData',
      render: (text) => text?.employeeSubGroupText || ''
    },
    { title: props.t('Work schedule'), dataIndex: 'workSchedule' }
  ]

  const approverColumns = [
    {
      title: props.t('Valid From'),
      dataIndex: 'validFrom',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    {
      title: props.t('Valid To'),
      dataIndex: 'validTo',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : '')
    },
    { title: props.t('Time and absence approver'), dataIndex: 'timeAndAbsenceApprover' },
    {
      title: props.t('Approver Legal'),
      dataIndex: 'approverLegal',
      render: (text) => {
        const user = userData.find((item) => text === item.value)
        return user ? user.label : 'full'
      }
    }
  ]

  if (!restrictPage) {
    positionColumns.push({
      title: props.t('Action'),
      dataIndex: 'custom_action',
      render: (_, row) => (
        <Button onClick={() => tablePosActions(row)} className="btn glow dropdown-toggle">
          <EditOutlined />
        </Button>
      )
    })

    organizationColumns.push({
      title: props.t('Action'),
      dataIndex: 'custom_action',
      render: (_, row) => (
        <Button onClick={() => tableOrgActions(row)} className="btn glow dropdown-toggle">
          <EditOutlined />
        </Button>
      )
    })

    payrollColumns.push({
      title: props.t('Action'),
      dataIndex: 'custom_action',
      render: (_, row) => (
        <Button onClick={() => tablePayrollActions(row)} className="btn glow dropdown-toggle">
          <EditOutlined />
        </Button>
      )
    })

    approverColumns.push({
      title: props.t('Action'),
      dataIndex: 'custom_action',
      render: (_, row) => (
        <Button onClick={() => tableapproveActions(row)} className="btn glow dropdown-toggle">
          <EditOutlined />
        </Button>
      )
    })
  }

  const tablePosActions = (val) => {
    setValues({ ...values, ...val })
    setEditData(val)
    setToggle(true)
  }

  const tableOrgActions = (val) => {
    setValues({ ...values, ...val })
    setEditData(val)
    setToggle1(true)
  }

  const tablePayrollActions = (val) => {
    setValues({ ...values, ...val })
    setEditData(val)
    setToggle2(true)
  }

  const tableapproveActions = (val) => {
    setValues({ ...values, ...val })
    setEditData(val)
    setToggle3(true)
  }

  const handleAddNewDetails = () => {
    console.log('companyInfo', companyInfo)
    const findActive = positionDataSource.find((x) => x.isActive)
    if (findActive) {
      setValues({
        ...values,
        ...findActive,
        employeeTargetWorkingHours: companyInfo?.configurations?.workingHours
      })
    } else {
      setValues({
        ...values,
        employeeTargetWorkingHours: companyInfo?.configurations?.workingHours
      })
    }
    setToggle(true)
  }
  const handleAddNewDetails1 = () => {
    const findActive = organizationDataSource.find((x) => x.isActive)
    if (findActive) {
      setValues({ ...values, ...findActive })
    }
    setToggle1(true)
  }
  const handleAddNewDetails2 = () => {
    const findActive = payrollDataSource.find((x) => x.isActive)
    if (findActive) {
      setValues({ ...values, ...findActive })
    }
    setToggle2(true)
  }
  const handleAddNewDetails3 = () => {
    const findActive = approverDataSource.find((x) => x.isActive)
    if (findActive) {
      setValues({
        ...values,
        ...findActive
      })
    }
    setToggle3(true)
  }

  const onSaveApprove = async () => {
    try {
      console.log('errors', errors)
      if (isEmpty(errors)) {
        console.log('values', values)
        const param = {
          validFrom: values.validFrom,
          validTo: values.validTo,
          timeAndAbsenceApprover: values.timeAndAbsenceApprover,
          approverLegal: values.approverLegal,
          employee: employeeId
        }
        let result
        if (editData?.id) {
          result = await apiClient.put(`employee-details/approvers/update/${editData?.id}`, param)
        } else {
          result = await apiClient.post('employee-details/approvers/add', param)
        }
        console.log('result', result)
        if (result.data && result.data.result) {
          setToggle3(false)
          getDetails()
          setEditData(null)
        }
      }
    } catch {}
  }

  const onSavePayroll = async () => {
    try {
      console.log('errors', errors)
      if (isEmpty(errors)) {
        console.log('values', values)
        const param = {
          validFrom: values.validFrom,
          validTo: values.validTo,
          payrollArea: values.payrollArea,
          payGroup: values.payGroup,
          wageType: values.wageType,
          location: values.location,
          region: values.region,
          employeeGroup: values.employeeGroup,
          employeeSubgroup: values.employeeSubgroup,
          workSchedule: values.workSchedule,
          employee: employeeId
        }
        let result
        if (editData?.id) {
          result = await apiClient.put(`employee-details/payroll-details/update/${editData?.id}`, param)
        } else {
          result = await apiClient.post('employee-details/payroll-details/add', param)
        }
        console.log('result', result)
        if (result.data && result.data.result) {
          setToggle2(false)
          getDetails()
          setEditData(null)
        }
      }
    } catch {}
  }

  const onSaveOrg = async () => {
    console.log('values', values)
    try {
      console.log('errors', errors)
      if (isEmpty(errors)) {
        const param = {
          validFrom: values.validFrom,
          validTo: values.validTo,
          organizationUnit: values.organizationUnit,
          division: values.division,
          department: values.department,
          operationalManager: values.operationalManager,
          matrixManager: values.matrixManager,
          hrManager: values.hrManager,
          operationalLevel1: values.operationalLevel1,
          operationalLevel2: values.operationalLevel2,
          operationalLevel3: values.operationalLevel3,
          employee: employeeId
        }
        let result
        if (editData?.id) {
          result = await apiClient.put(`employee-details/org-details/update/${editData?.id}`, param)
        } else {
          result = await apiClient.post('employee-details/org-details/add', param)
        }

        if (result.data && result.data.result) {
          setToggle1(false)
          getDetails()
          setEditData(null)
        }
      }
    } catch {}
  }

  const onSavePos = async () => {
    try {
      console.log('errors', errors)
      if (isEmpty(errors)) {
        console.log('values', values)
        const param = {
          validFrom: values.validFrom,
          validTo: values.validTo,
          positionNumber: values.positionNumber,
          positionTitle: values.positionTitle,
          costCenter: values.costCenter,
          jobLevel: values.jobLevel,
          jobBand: values.jobBand,
          grade: values.grade,
          fte: values.fte,
          employeeTargetWorkingHours: values.employeeTargetWorkingHours,
          roleAndResponsibility: values.roleAndResponsibility,
          employee: employeeId
        }
        let result
        if (editData?.id) {
          result = await apiClient.put(`employee-details/position-details/update/${editData?.id}`, param)
        } else {
          result = await apiClient.post('employee-details/position-details/add', param)
        }

        if (result.data && result.data.result) {
          setToggle(false)
          getDetails()
          setEditData(null)
        }
      }
    } catch {}
  }

  return (
    <div>
      <PanelLayout>
        <Panel
          title="Position Details"
          button={
            !restrictPage ? (
              <div className="align-right">
                <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handleAddNewDetails}>
                  <i className="flaticon-plus" /> {props.t('Add')}
                </ButtonBox>
              </div>
            ) : null
          }>
          <div className="panel-with-border">
            <Row justify="left" gutter={(12, 10)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="table-view">
                  <TableBox
                    columns={positionColumns}
                    actionIndex="custom_action"
                    cardHeaderIndex="status"
                    cardFirstLabelIndex="docno"
                    dataSource={positionDataSource}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>

      <PanelLayout>
        <Panel
          title="Organization Details"
          button={
            !restrictPage ? (
              <div className="align-right">
                <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handleAddNewDetails1}>
                  <i className="flaticon-plus" /> {props.t('Add')}
                </ButtonBox>
              </div>
            ) : null
          }>
          <div className="panel-with-border">
            <Row justify="left" gutter={(12, 10)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="table-view">
                  <TableBox
                    columns={organizationColumns}
                    actionIndex="custom_action"
                    cardHeaderIndex="status"
                    cardFirstLabelIndex="docno"
                    dataSource={organizationDataSource}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>

      <PanelLayout>
        <Panel
          title="Payroll Details"
          button={
            !restrictPage ? (
              <div className="align-right">
                <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handleAddNewDetails2}>
                  <i className="flaticon-plus" /> {props.t('Add')}
                </ButtonBox>
              </div>
            ) : null
          }>
          <div className="panel-with-border">
            <Row justify="left" gutter={(12, 10)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="table-view">
                  <TableBox
                    columns={payrollColumns}
                    actionIndex="custom_action"
                    cardHeaderIndex="status"
                    cardFirstLabelIndex="docno"
                    dataSource={payrollDataSource}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>

      <PanelLayout>
        <Panel
          title="Approver Details"
          button={
            !restrictPage ? (
              <div className="align-right">
                <ButtonBox style={{ marginRight: 10 }} type="success" onClick={handleAddNewDetails3}>
                  <i className="flaticon-plus" /> {props.t('Add')}
                </ButtonBox>
              </div>
            ) : null
          }>
          <div className="panel-with-border">
            <Row justify="left" gutter={(12, 10)}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="table-view">
                  <TableBox
                    columns={approverColumns}
                    actionIndex="custom_action"
                    cardHeaderIndex="status"
                    cardFirstLabelIndex="docno"
                    dataSource={approverDataSource}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </PanelLayout>

      <ModalBox
        title={`${props.t(editData ? 'Edit' : 'Add')} ${props.t('Position Details')}`}
        visible={toggle}
        onCancel={() => {
          setToggle(false)
          resetForm()
          setEditData(null)
        }}
        width={700}
        okText="Save"
        onOk={onSavePos}
        destroyOnClose>
        <PositionDetailsFrom
          currentEmployee={currentEmployee}
          currentDetails={values}
          handleValueChange={handleValueChange}
          companyInfo={companyInfo}
        />
      </ModalBox>

      <ModalBox
        title={`${props.t(editData ? 'Edit' : 'Add')} ${props.t('Organizational Details')}`}
        visible={toggle1}
        onCancel={() => {
          setToggle1(false)
          resetForm()
          setEditData(null)
        }}
        width={700}
        okText="Save"
        onOk={onSaveOrg}
        destroyOnClose>
        <OrganizationalDetailsForm
          currentEmployee={currentEmployee}
          currentDetails={values}
          handleValueChange={handleValueChange}
        />
      </ModalBox>

      <ModalBox
        title={`${props.t(editData ? 'Edit' : 'Add')} ${props.t('Payroll Details')}`}
        visible={toggle2}
        onCancel={() => {
          setToggle2(false)
          resetForm()
          setEditData(null)
        }}
        width={700}
        okText="Save"
        onOk={onSavePayroll}
        destroyOnClose>
        <PayrollDetailsForm
          currentEmployee={currentEmployee}
          currentDetails={values}
          handleValueChange={handleValueChange}
        />
      </ModalBox>

      <ModalBox
        title={`${props.t(editData ? 'Edit' : 'Add')} ${props.t('Approver Details')}`}
        visible={toggle3}
        onCancel={() => {
          setToggle3(false)
          resetForm()
          setEditData(null)
        }}
        width={700}
        okText="Save"
        onOk={onSaveApprove}
        destroyOnClose>
        <ApproverDetailsForm
          currentEmployee={currentEmployee}
          currentDetails={values}
          handleValueChange={handleValueChange}
        />
      </ModalBox>

      <FooterActions
        leftActions={
          !restrictPage
            ? [
                {
                  prefix: 'flaticon-back',
                  label: 'Back to employee list',
                  onClick: () => history('/app/employees')
                }
              ]
            : []
        }
      />
    </div>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    timeAndAbsenceApprover: '',
    approverLegal: '',
    validFrom: new Date(),
    validTo: new Date('9999-12-31'),
    employee: '',
    employeeTargetWorkingHours: ''
  }),
  validationSchema: Schema,
  handleSubmit: () => null
})(withTranslation()(OfficialDetails))
