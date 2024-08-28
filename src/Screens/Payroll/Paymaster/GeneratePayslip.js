import { message } from 'antd'
import { isNumber } from 'lodash'
import moment from 'moment'
import TableBox from '../../../Components/TableBox/TableBox'
import { parseAmount } from '../../../Util/Util'

const operators = ['+', '-', '*', '/']

const GeneratePayslip = ({ payrollComponents, payrollDefinition, employeeDetails }) => {
  const employeeDetailsRows = [
    {
      key: '1',
      col1Key: 'Employee No',
      col1Value: employeeDetails.employeeNo,
      col2Key: 'Employee Name',
      col2Value: employeeDetails.name,
      col3Key: 'Email',
      col3Value: employeeDetails.email
    },
    {
      key: '2',
      col1Key: 'Role',
      col1Value: employeeDetails.role,
      col2Key: 'Joining Date',
      col2Value: employeeDetails.joiningDate && moment(employeeDetails.joiningDate).format('DD/MM/YYYY'),
      col3Key: 'Employee Payroll ID',
      col3Value: employeeDetails.employeePayrollId
    },
    {
      key: '3',
      col1Key: 'Payroll ID',
      col1Value: employeeDetails.payrollId,
      col2Key: 'Payroll Name',
      col2Value: employeeDetails.payrollName,
      col3Key: 'Country',
      col3Value: employeeDetails.country
    },
    {
      key: '4',
      col1Key: 'Valid From',
      col1Value: employeeDetails.validFrom && moment(employeeDetails.validFrom).format('DD/MM/YYYY'),
      col2Key: 'Valid To',
      col2Value: employeeDetails.validTo && moment(employeeDetails.validTo).format('DD/MM/YYYY'),
      col3Key: 'Status',
      col3Value: employeeDetails.status
    }
  ]

  const employeeDetailsColumns = [
    {
      title: 'EMPLOYEE DETAILS',
      dataIndex: 'name',
      colSpan: 6,
      children: [
        {
          dataIndex: 'col1Key',
          colSpan: 0,
          render: (text) => <b style={{ color: 'black' }}>{text}</b>
        },
        {
          dataIndex: 'col1Value',
          colSpan: 0
        },
        {
          dataIndex: 'col2Key',
          colSpan: 0,
          render: (text) => <b style={{ color: 'black' }}>{text}</b>
        },
        {
          dataIndex: 'col2Value',
          colSpan: 0
        },
        {
          dataIndex: 'col3Key',
          colSpan: 0,
          render: (text) => <b style={{ color: 'black' }}>{text}</b>
        },
        {
          dataIndex: 'col3Value',
          colSpan: 0
        }
      ]
    }
  ]

  const payrollComponentsColumns = [
    {
      title: 'PAYSLIP DETAILS',
      dataIndex: 'payslipDetails',
      colSpan: 5,
      children: [
        {
          title: 'Component',
          dataIndex: 'title',
          width: 250,
          render: (text, record) =>
            record.type === 'Component' ? <span>{text}</span> : <b style={{ color: 'black' }}>{text}</b>
        },
        {
          title: 'Code',
          dataIndex: 'code',
          render: (text, record) =>
            record.type === 'Component' ? <span>{text}</span> : <b style={{ color: 'black' }}>{text}</b>
        },
        {
          title: 'Unit',
          dataIndex: 'unit',
          align: 'right',
          render: (text, record) =>
            parseAmount(calculateFormulaValue(text, record), employeeDetails?.currency)
        },
        {
          title: 'Value',
          dataIndex: 'value',
          align: 'right',
          render: (text, record) =>
            parseAmount(calculateFormulaValue(text, record), employeeDetails?.currency)
        },
        {
          title: 'Formula',
          dataIndex: 'formula',
          align: 'right',
          render: (text, record) =>
            record.type === 'Component' ? (
              <span>{parseAmount(calculateFormulaValue(text, record), employeeDetails?.currency)}</span>
            ) : (
              <b style={{ color: 'black' }}>
                {parseAmount(calculateFormulaValue(text, record), employeeDetails?.currency)}
              </b>
            )
        }
      ]
    }
  ]

  const calculateValue = (operator, values) => {
    switch (operator) {
      case '+':
        return values[0] + values[1]
      case '-':
        return values[0] - values[1]
      case '*':
        return values[0] * values[1]
      case '/':
        return values[0] / values[1]

      default:
        return 0
    }
  }

  const calculateFormulaValue = (value, record) => {
    try {
      if (record.type.toLowerCase() === 'calculation' || record.type.toLowerCase() === 'component') {
        if (value === '' || value === null || value === undefined) {
          return ''
        }

        if (isNumber(value)) {
          return value
        }

        if (!Number.isNaN(value * 1)) {
          return value * 1
        }

        if (value.includes('%')) {
          return calculateFormulaValue(value.replace('%', ''), record) / 100
        }

        if (value.toLowerCase() === 'unit' || value.toLowerCase() === 'value') {
          return calculateFormulaValue(record[value.toLowerCase()], record)
        }

        const isPayrollComponent = payrollComponents.find(
          (component) => component.key.toLowerCase() === value.toLowerCase()
        )

        if (isPayrollComponent) {
          return calculateFormulaValue(isPayrollComponent.value, record)
        }

        const isPayrollDefinitionCode = payrollDefinition.find(
          (d) => d.code.toLowerCase() === value.toLowerCase()
        )

        if (isPayrollDefinitionCode) {
          return calculateFormulaValue(isPayrollDefinitionCode.formula, isPayrollDefinitionCode)
        }

        const values = value.replaceAll('+', '/').replaceAll('-', '/').replaceAll('*', '/').split('/')

        if (values.length > 1) {
          const allOperators = value.split('').filter((operator) => operators.includes(operator))

          let totalValue = values[0]

          for (let i = 0; i < allOperators.length; i++) {
            totalValue = calculateValue(allOperators[i], [
              calculateFormulaValue(totalValue, record),
              calculateFormulaValue(values[i + 1], record)
            ])
          }

          return totalValue
        }

        throw new Error('Invalid Formula')
      }

      return null
    } catch (error) {
      console.error('CALCULATE_FORMULA_ERROR', error)
      message.error('Please enter valid formula in payroll configuration')
    }
  }

  return (
    <>
      <TableBox bordered columns={employeeDetailsColumns} dataSource={employeeDetailsRows} />
      <TableBox bordered columns={payrollComponentsColumns} dataSource={payrollDefinition} />
    </>
  )
}

export default GeneratePayslip
