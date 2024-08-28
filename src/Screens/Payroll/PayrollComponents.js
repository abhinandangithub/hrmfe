import { Button, Col, Form, Input, message, Row, Select, Table } from 'antd'
import _differenceWith from 'lodash/differenceWith'
import _isEqual from 'lodash/isEqual'
import React, { useContext, useEffect, useRef, useState } from 'react'
import '../../Components/TableBox/TableBox.scss'
import apiClient from '../../Util/apiClient'
import { STATUS } from '../../Util/Options'

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
      status: record?.status
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

  const handleFocus = () => {
    handleSave({ ...record, isEditing: true })
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
      editing && fieldType === 'input' && dataIndex === 'label' ? (
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
          <Input ref={inputRef} onFocus={handleFocus} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : editing && fieldType === 'input' && dataIndex === 'key' && record.isAdded ? (
        <Form.Item
          style={{
            margin: 0
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`
            },
            {
              pattern: new RegExp(/^[A-Za-z]+$/),
              message: 'whitespace and special characters are not allowed'
            }
          ]}>
          <Input ref={inputRef} onFocus={handleFocus} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : editing && dataIndex && fieldType === 'select' ? (
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
          <Select options={STATUS} onFocus={handleFocus} ref={inputRef} onPressEnter={save} onBlur={save} />
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

const PayrollComponents = () => {
  const [dataSource, setDataSource] = useState([])
  const [originalIDs, setOriginalIds] = useState([])
  const [count, setCount] = useState(0)

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
      title: 'Status',
      dataIndex: 'status',
      editable: true,
      fieldType: 'select'
    }
  ]

  useEffect(() => {
    getAllPayrollComponents()
  }, [])

  const getAllPayrollComponents = async () => {
    try {
      const { data } = await apiClient.get('/payroll-components/getAll')

      if (!data.success) {
        message.error(data.message)
      }

      if (data.result) {
        setDataSource(data.result || [])
        setOriginalIds(data.result || [])
        setCount(data.result.length || 0)
      }
    } catch (error) {
      console.error('GET_ALL_PAYROLL_COMPONENTS_ERROR', error)
    }
  }

  const handleAdd = () => {
    const newData = {
      label: '',
      key: '',
      status: 'Active',
      id: count + 1,
      isAdded: true
    }
    setDataSource([newData, ...dataSource])
    setCount((prevState) => prevState + 1)
  }

  const handleSave = (row) => {
    const newData = [...dataSource]
    const index = newData.findIndex((item) => row.id === item.id)
    const item = newData[index]
    newData.splice(index, 1, { ...item, ...row })
    setDataSource(newData)
  }

  const onCancel = () => {
    setDataSource(originalIDs)
  }

  const onSave = async () => {
    const editedFields = _differenceWith(dataSource, originalIDs, _isEqual)
    const validateFieldValue = editedFields.filter((field) => field.label === '' || field.key === '')

    if (validateFieldValue.length === 0) {
      const keys = dataSource.map((md) => md.key)

      if (Array.from(new Set(keys)).length !== dataSource.length) {
        message.error('Key values should be unique')
      } else {
        try {
          const { data } = await apiClient.post('/payroll-components/addAndUpdate', editedFields)

          if (data.success) {
            message.success('Components saved successfully')
            getAllPayrollComponents()
          } else {
            message.error(data.message)
          }
        } catch (error) {
          console.error('SAVE_PAYROLL_COMPONENTS_ERROR', error)
        }
      }
    } else {
      message.error('Fill all the fields')
    }
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
    <Row justify="center" className="inner-contents">
      <Col xs={22} sm={22} md={20} lg={20}>
        <div className="panel-layout">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="panel-title">Payroll Components</h2>
            <Button
              onClick={handleAdd}
              type="primary"
              style={{
                marginBottom: 16
              }}>
              <i className="flaticon-plus" />
              New Field
            </Button>
          </div>
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
        <div className="save-changes">
          <Button onClick={onCancel} type="secondary">
            Cancel
          </Button>
          <Button onClick={onSave} type="primary">
            Save
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default PayrollComponents
