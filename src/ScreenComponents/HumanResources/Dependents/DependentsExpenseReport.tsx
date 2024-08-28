import { SettingOutlined } from '@ant-design/icons'
import { Col, Form, message, Popover, Row } from 'antd'
import { FormikProps, withFormik } from 'formik'
import { TFunction } from 'i18next'
import { isEmpty } from 'lodash'
import { useState } from 'react'
import { withTranslation } from 'react-i18next'
import * as Yup from 'yup'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox, { ColumnsType } from '../../../Components/TableBox/TableBox'
import { IDependent } from '../../../Interfaces/IDependent'
import Panel from '../../../Layout/Panel'
import apiClient from '../../../Util/apiClient'
import { convertSelectOptions } from '../../../Util/Util'
import DependentExpenseForm from './DependentExpenseForm'

const Schema = Yup.object().shape({
  id: Yup.string().required(),
  visa: Yup.number().required(),
  insurance: Yup.number().required(),
  airTicket1Way: Yup.number().required(),
  airTicket2Way: Yup.number().required(),
  schoolFee: Yup.number().required()
})

type TDependentExpenseReportProps = {
  dependents: IDependent[]
  handleUpdateExpenses: (dependents: IDependent[]) => void
}

type TProps = TDependentExpenseReportProps &
  FormikProps<TDependentExpenseFormValues> & { t: TFunction<'transaction', undefined> }

function DependentsExpenseReport(props: TProps) {
  const {
    dependents,
    values,
    errors,
    setValues,
    submitForm,
    resetForm,
    setFieldValue,
    handleUpdateExpenses
  } = props
  const [toggle, setToggle] = useState(false)

  const columns: ColumnsType<IDependent>[] = [
    {
      title: props.t('Name'),
      dataIndex: 'name'
    },
    {
      title: props.t('Relationship'),
      dataIndex: 'relationship'
    },
    {
      title: props.t('Passport (BHD)'),
      dataIndex: 'passport'
    },
    {
      title: props.t('Visa 1 Year (BHD)'),
      dataIndex: 'visa'
    },
    {
      title: props.t('Insurance (BHD)'),
      dataIndex: 'insurance'
    },
    {
      title: props.t('Driving License (BHD)'),
      dataIndex: 'drivingLicense'
    },
    {
      title: props.t('Car Insurance (BHD)'),
      dataIndex: 'carInsurance'
    },
    {
      title: props.t('GOSI (BHD)'),
      dataIndex: 'gosi'
    },
    {
      title: props.t('LMRA (BHD)'),
      dataIndex: 'lmra'
    },
    {
      title: props.t('CPR (BHD)'),
      dataIndex: 'cpr'
    },
    {
      title: props.t('Air Ticket 1 Way (BHD)'),
      dataIndex: 'airTicket1Way'
    },
    {
      title: props.t('Air Ticket 2 Way (BHD)'),
      dataIndex: 'airTicket2Way'
    },
    {
      title: props.t('School Fee (BHD)'),
      dataIndex: 'schoolFee'
    },
    {
      title: props.t('Action'),
      dataIndex: 'custom_action',
      render: (_: unknown, dependentDoc: IDependent) => (
        <Popover placement="bottomRight" content={tableActions(dependentDoc)} trigger="click">
          <div className="btn-group">
            <button type="button" className="btn glow dropdown-toggle">
              {' '}
              <SettingOutlined /> <span className="caret" />
            </button>
          </div>
        </Popover>
      )
    }
  ]

  const handleEditRow = (dependentDoc: IDependent) => {
    setValues({ ...dependentDoc })
    setToggle(true)
  }

  const tableActions = (dependentDoc: IDependent) => (
    <div className="action-buttons">
      <ul>
        <li onClick={() => handleEditRow(dependentDoc)}>
          <i className="flaticon-edit-1" /> {props.t('Edit')}
        </li>
      </ul>
    </div>
  )

  const onSave = () => {
    submitForm()

    if (isEmpty(errors)) {
      const { id, ...expenses } = values

      apiClient
        .put(`employee-details/dependents/update/${id}`, expenses)
        .then(({ data }) => {
          if (data && data.result) {
            setToggle(false)
            // update dependents
            const updatedDependents = dependents.map((dependent) =>
              dependent.id === id ? { ...dependent, ...expenses } : dependent
            )
            handleUpdateExpenses(updatedDependents)
            message.success('Dependent expenses has been updated successfully.')
            resetForm()
          }
        })
        .catch((error) => {
          console.error('DEPENDENT_EXPENSES_ERROR', error)
          message.error('Something went wrong..! Please try again.')
        })
    }
  }

  return (
    <Form>
      <Panel title={props.t('Expense Report')} noBottom={false}>
        <Row justify="start" gutter={[12, 10]}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
            <div className="table-view">
              {/* ENAHANCEMENT Do we need to display individual and total dependents expenses here? */}
              <TableBox columns={columns} dataSource={dependents} />
            </div>
          </Col>
        </Row>
      </Panel>

      <ModalBox
        title={props.t('Edit Dependent Expense')}
        visible={toggle}
        onCancel={() => {
          setToggle(false)
          resetForm()
        }}
        width={700}
        okText="Save"
        onOk={onSave}
        destroyOnClose>
        <DependentExpenseForm
          dependentsOptionList={convertSelectOptions(dependents, 'name', 'id')}
          values={values}
          setFieldValue={setFieldValue}
        />
        {/* ENHANCEMENT Do we need to add Reset button in modal footer? And View Standard rates link for refering in moda body section? */}
      </ModalBox>
    </Form>
  )
}

export type TDependentExpenseFormValues = {
  airTicket1Way: number | undefined
  airTicket2Way: number | undefined
  carInsurance: number | undefined
  cpr: number | undefined
  drivingLicense: number | undefined
  gosi: number | undefined
  id: string
  insurance: number | undefined
  lmra: number | undefined
  passport: number | undefined
  schoolFee: number | undefined
  visa: number | undefined
}

export default withFormik<TDependentExpenseReportProps, TDependentExpenseFormValues>({
  mapPropsToValues: () => ({
    passport: undefined,
    airTicket1Way: undefined,
    airTicket2Way: undefined,
    carInsurance: undefined,
    cpr: undefined,
    drivingLicense: undefined,
    gosi: undefined,
    id: '',
    insurance: undefined,
    lmra: undefined,
    schoolFee: undefined,
    visa: undefined
  }),
  handleSubmit: () => null,
  validationSchema: Schema
})(withTranslation()(DependentsExpenseReport))
