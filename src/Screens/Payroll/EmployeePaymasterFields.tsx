/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Form, InputNumber, Table } from 'antd'
import type { FormInstance } from 'antd/es/form'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IPaymasterField } from '../../Interfaces/IPaymasterField'

const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface EditableRowProps {
  index: number
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

// interface TRemainingFields extends IExtendedPaymasterField {
//   value: IExtendedPaymasterField
// }
interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof IExtendedPaymasterField
  record: IExtendedPaymasterField
  fieldType: string
  handleSave: (dataIndex: string, value: any) => void
  employeePaymasterFields: any
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  fieldType,
  handleSave,
  employeePaymasterFields,
  ...restProps
}) => {
  const [editing, setEditing] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const form = useContext(EditableContext)!

  useEffect(() => {
    if (inputRef?.current && editing) {
      inputRef.current.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: employeePaymasterFields?.[record.key] || 0 })
  }

  const save = async () => {
    try {
      const values = await form.validateFields([dataIndex])

      toggleEdit()
      handleSave(record.key, values[dataIndex])
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode =
      editing && dataIndex && fieldType === 'number' ? (
        <Form.Item
          style={{
            margin: 0
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`
            }
          ]}>
          <InputNumber
            ref={inputRef}
            onPressEnter={save}
            type="number"
            onBlur={save}
            style={{ width: '100%' }}
          />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24
          }}
          onClick={toggleEdit}>
          {children}
        </div>
      )
  }

  return <td {...restProps}>{childNode}</td>
}

type EditableTableProps = Parameters<typeof Table>[0]

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

type TProps = {
  paymasterConfigs: IPaymasterField[]
  employeePaymasterFields: any
  requiredComponents: any
  updateComponents: (data: any) => void
}

interface IExtendedPaymasterField
  extends Omit<IPaymasterField, 'company' | 'network' | 'createdAt' | 'updatedAt'> {
  isAdded?: boolean
  isEditing?: boolean
}

const EmployeePaymasterFields = (props: TProps) => {
  const { paymasterConfigs, employeePaymasterFields, requiredComponents, updateComponents } = props

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean
    dataIndex: string
    fieldType: string
  })[] = [
    {
      key: 0,
      title: 'Label',
      dataIndex: 'label',
      fieldType: 'select',
      width: '40%',
      editable: false
    },
    {
      key: 1,
      width: '20%',
      title: 'Required',
      fieldType: 'checkbox',
      dataIndex: 'required',
      editable: true,
      render: (_: unknown, record: any) => (
        <Checkbox
          checked={requiredComponents.includes(record.key) || record.required}
          onChange={() => {
            if (!record?.required && !requiredComponents.includes(record.key)) {
              updateComponents({
                salaryComponents: employeePaymasterFields,
                requiredComponents: [...requiredComponents, record.key]
              })
            } else {
              updateComponents({
                salaryComponents: employeePaymasterFields,
                requiredComponents: requiredComponents.filter((item: any) => item !== record.key)
              })
            }
          }}
        />
      )
    },
    {
      key: 2,
      width: '40%',
      editable: true,
      title: 'Value',
      fieldType: 'number',
      dataIndex: 'length',
      render: (_: unknown, record: any) =>
        `${employeePaymasterFields[record?.key] || 0}${record.unit === '%' ? '%' : ''}`
    }
  ]

  const handleSave = (dataIndex: any, value: any) => {
    // const newData = [...employeePaymasterFields]
    // const index = newData.findIndex((item) => row.key === item.key)
    // const item = newData[index]
    // newData.splice(index, 1, {
    //   ...item,
    //   ...row
    // })

    updateComponents({
      salaryComponents: { ...employeePaymasterFields, [dataIndex]: value },
      requiredComponents
    })
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }

    console.log(paymasterConfigs, employeePaymasterFields)

    return {
      ...col,
      onCell: (record: IExtendedPaymasterField) => ({
        record,
        remainingFields: paymasterConfigs.map((item) => ({ ...item, value: item })),
        editable: col.editable,
        dataIndex: col.dataIndex,
        fieldType: col.fieldType,
        title: col.title,
        employeePaymasterFields,
        handleSave,
        key: record.id
      })
    }
  })

  return (
    <div>
      <br />
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={paymasterConfigs}
        columns={columns as ColumnTypes}
        pagination={false}
      />
    </div>
  )
}

export default EmployeePaymasterFields
