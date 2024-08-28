import { Form, Input, Select, Table } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'

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
  options,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef(null)
  const form = useContext(EditableContext)
  useEffect(() => {
    if (editing) {
      inputRef.current.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    })
  }

  const toggleEditTrue = () => {
    if (!editing && dataIndex && dataIndex !== 'action') {
      setEditing(true)

      form.setFieldsValue({
        [dataIndex]: record[dataIndex]
      })
    }
  }

  const save = async () => {
    try {
      const values = await form.validateFields()
      const value = typeof values[dataIndex] === 'string' ? values[dataIndex].trim() : values[dataIndex]
      const updatedData = { [dataIndex]: value }

      toggleEdit()

      if (dataIndex === 'type' && values.type !== record.type) {
        updatedData.total = value === 'Component' ? [] : ''
      }

      handleSave({ ...record, ...updatedData }, value, dataIndex)
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    if (editing) {
      if (dataIndex === 'type') {
        childNode = (
          <Form.Item name={dataIndex} style={{ margin: 0 }}>
            <Select
              ref={inputRef}
              options={options}
              onSelect={save}
              onBlur={save}
              filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            />
          </Form.Item>
        )
      } else if (dataIndex === 'source') {
        childNode = (
          <Form.Item name={dataIndex} style={{ margin: 0 }}>
            {record.type === 'Component' ? (
              <Select
                ref={inputRef}
                options={options}
                onBlur={save}
                mode="multiple"
                filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              />
            ) : (
              <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            )}
          </Form.Item>
        )
      } else if (dataIndex === 'unit') {
        childNode = (
          <Form.Item name={dataIndex} style={{ margin: 0 }}>
            {record.type === 'Component' ? (
              <Select
                ref={inputRef}
                options={options}
                onBlur={save}
                mode="multiple"
                filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              />
            ) : (
              <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            )}
          </Form.Item>
        )
      } else {
        childNode = (
          <Form.Item name={dataIndex} style={{ margin: 0 }}>
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          </Form.Item>
        )
      }
    } else {
      childNode = (
        <div
          className={`editable-cell-value-wrap ${record.className || ''}`}
          style={{
            paddingRight: 24,
            paddingBottom: record.type === 'Component' ? 0 : 10,
            paddingTop: record.type === 'Component' ? 0 : 10,
            fontWeight: record.type === 'Component' ? 'initial' : 'bold'
          }}
          onClick={toggleEdit}>
          {children}
        </div>
      )
    }
  }

  return (
    <td
      className={`${record && record.className ? record.className : ''}`}
      onClick={toggleEditTrue}
      {...restProps}>
      {childNode}
    </td>
  )
}

class PayrollTemplate extends React.Component {
  render() {
    const { dataSource, columns, handleSave } = this.props
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    }
    const updatedColumns = columns.map((col) => {
      if (!col.editable) {
        return col
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
          options: col.options
        })
      }
    })

    return (
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={updatedColumns}
        pagination={false}
        tableLayout="fixed"
      />
    )
  }
}

export default PayrollTemplate
