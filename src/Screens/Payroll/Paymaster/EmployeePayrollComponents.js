import { Form, Input, Table } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import '../../../Components/TableBox/TableBox.scss'

const EditableContext = React.createContext(null)

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm()

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

const EditableCell = ({
  title,
  editable,
  isEditing,
  children,
  dataIndex,
  record,
  fieldType,
  handleSave,
  ...restProps
}) => {
  const form = useContext(EditableContext)
  const [editing, setEditing] = useState(record?.isAdded || record?.isEditing)
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current && editing && ((record?.isAdded && dataIndex === 'label') || !record.isAdded)) {
      inputRef.current.focus()

      if (fieldType === 'input' || fieldType === 'number') {
        inputRef.current.select()
      }
    }
  }, [editing])

  useEffect(() => {
    form.setFieldsValue({
      label: record?.label,
      key: record?.key,
      value: record?.value
    })
  }, [])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    })
  }

  const toggleEditEmpty = () => {
    if (!editing && dataIndex) {
      setEditing(!editing)
      form.setFieldsValue({
        [dataIndex]: record[dataIndex]
      })
    }
  }

  const save = async () => {
    try {
      const values = await form.validateFields([dataIndex])

      if (!record.isAdded && !isEditing) {
        toggleEdit()
      }

      handleSave({ ...record, ...values })
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
          name={dataIndex}>
          <Input ref={inputRef} onPressEnter={save} onBlur={save} style={{ width: '100%' }} />
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

  return (
    <td onClick={toggleEditEmpty} {...restProps}>
      {childNode}
    </td>
  )
}

const EmployeePayrollComponents = ({ payrollComponents, handlePayrollComponentsSave }) => {
  const [dataSource, setDataSource] = useState(payrollComponents)

  useEffect(() => {
    setDataSource(payrollComponents)
  }, [payrollComponents])

  const columns = [
    {
      key: 0,
      title: 'Label',
      dataIndex: 'label',
      editable: true,
      fieldType: 'input'
    },
    {
      key: 1,
      title: 'Key',
      dataIndex: 'key',
      editable: true,
      fieldType: 'input'
    },
    {
      key: 2,
      title: 'Value',
      dataIndex: 'value',
      editable: true,
      fieldType: 'number'
    }
  ]

  const handleSave = (row) => {
    const newData = [...dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, { ...item, ...row })
    setDataSource(newData)
    handlePayrollComponentsSave(newData)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }

  const modifiedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        fieldType: col.fieldType,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        key: record.id,
        isEditing: col?.isEditing
      })
    }
  })

  return (
    <div className="panel-layout">
      <div className="custom-background">
        <div className="custom-table">
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={modifiedColumns}
            pagination={false}
            tableLayout="fixed"
            rowKey={(record) => record?.id}
          />
        </div>
      </div>
    </div>
  )
}

export default EmployeePayrollComponents
