import { SettingOutlined } from '@ant-design/icons'
import { Col, message, Popover, Row } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import ConfirmationBox from '../../../Components/ConfirmationBox/ConfirmationBox'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA } from '../../../Util/Util'
import LeaveGenerationFilter from './AbsenceManagementFilter'

export default function AbsenceLeaveGeneration(props) {
  const [payrolls, setPayrolls] = useState([])
  const [selectedRows, setSelectedRows] = useState(GET_DATA('payrolls.selectedRows') || [])

  useEffect(() => {
    const filterCache = GET_DATA('leave.filterData')
    getData(filterCache || {}, 'Show')
  }, [])

  const getData = (filterObj, type) => {
    const params = _.omit(filterObj, 'date')

    if (filterObj.date) {
      params.month = moment(filterObj.date).format('M')
      params.year = moment(filterObj.date).format('YYYY')
    }

    if (type === 'Show') {
      apiClient.get('payroll/getAll', { params }).then(({ data }) => {
        if (data && data.result) {
          SET_DATA('leave.filterData', { ...filterObj, ...data.pageData })
          setPayrolls(data.result)

          if (data.result.length === 0) {
            message.info('No data for this month')
          }
        }
      })
    }

    if (type === 'Sync') {
      apiClient.put('payroll/generatePayroll', params).then(({ data }) => {
        if (data && data.result) {
          setPayrolls(data.result)
          message.info('Payroll sync done')
        }
      })
    }
  }

  const onRegeneratePayroll = () => {
    if (selectedRows.length > 0) {
      const regenerateData = selectedRows.map((val) => ({ user: val.user, month: val.month, year: val.year }))
      apiClient.put('payroll/regeneratePayroll', { regenerateData }).then(({ data }) => {
        if (data && data.result) {
          const payrollData = payrolls.map((val) => {
            const findUpdated = data.result.find((p) => p.id === val.id)

            if (findUpdated) {
              return findUpdated
            }

            return val
          })
          setPayrolls(payrollData)
          message.info('Payroll regenerated')
        }
      })
    } else {
      message.error('Please select a row')
    }
  }

  const tableContent = (row) => (
    <div className="action-buttons">
      <ul>
        <li>
          <Link to={`/app/payrolls/${row.id}`}>
            <i className="flaticon-eye" /> View
          </Link>
        </li>
      </ul>
    </div>
  )

  const onChangePage = (pageData) => {
    const filterCache = GET_DATA('leave.filterData')
    getData({ ...(filterCache || {}), ...pageData }, 'Show')
  }

  const onFilter = (data, type) => {
    getData(data, type)
    setSelectedRows([])
  }

  const columns = [
    {
      title: 'Employee No',
      dataIndex: 'empno'
      //   render: (v, r) => (
      //     <div onClick={() => props.history.push(`/app/payrolls/${r.id}`)}>
      //       <a>{v}</a>
      //     </div>
      //   )
    },
    {
      title: 'Employee Name',
      dataIndex: 'name'
    },
    {
      title: 'Date of joining',
      dataIndex: 'joining'
    },
    {
      title: 'Role',
      dataIndex: 'role'
    },
    {
      title: 'Casual Leave',
      dataIndex: 'cl'
    },
    {
      title: 'Medical Leave',
      dataIndex: 'ml'
    },
    {
      title: 'Travel Leave',
      dataIndex: 'tl'
    },
    {
      title: 'Action',
      dataIndex: 'custom_action',
      render: (text, row) => (
        <Popover placement="rightTop" content={tableContent(row)} trigger="click">
          <div className="btn-group">
            <button type="button" className="btn glow dropdown-toggle">
              <SettingOutlined /> <span className="caret" />
            </button>
          </div>
        </Popover>
      )
    }
  ]

  const onDownloadPayslip = (id) => {
    const ids = id ? [id] : selectedRows.map((val) => val.id)
    const exeFn = (printType) =>
      apiClient
        .post('payroll/downloadPayslip', { ids, printType }, { responseType: 'blob' })
        .then(({ status, data, headers }) => {
          if (status === 200) {
            const a = document.createElement('a')
            a.href = window.URL.createObjectURL(data)
            a.download = JSON.parse(headers['content-disposition'].split('filename=')[1].split(';')[0])
            document.body.appendChild(a)
            a.click()
            a.remove()
          }
        })

    if (ids.length > 1) {
      ConfirmationBox({
        title: 'Download Payslip',
        description: 'Select how you wants to download!',
        acceptText: 'Single',
        acceptText1: 'Multiple',
        cancelText: 'Cancel',
        acceptFn: () => exeFn('Single'),
        acceptFn1: () => exeFn('Multiple')
      })
    } else {
      exeFn('Single')
    }
  }

  const onViewPayrolls = () => {
    if (selectedRows.length > 0) {
      const ids = selectedRows.map((val) => val.id)
      props.history.push(`/app/payrolls/${ids.join(',')}`)
    } else {
      message.error('Please select a row')
    }
  }

  return (
    <FilterLayout filter={<LeaveGenerationFilter onFilter={onFilter} />}>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className="top-filter-options">
            <h2>Leave Generation</h2>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div style={{ float: 'right' }}>
            {selectedRows.length > 0 && (
              <div className="top-filter-options">
                <ButtonBox onClick={onRegeneratePayroll}>Regenerate</ButtonBox>&nbsp;
                <ButtonBox onClick={onDownloadPayslip}>Download</ButtonBox>&nbsp;
                <ButtonBox onClick={() => onViewPayrolls()}>View</ButtonBox>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <TableBox
        dataSource={payrolls}
        columns={columns}
        onSelect={(selected) => {
          SET_DATA('leave.selectedRows', selected)
          setSelectedRows(selected)
        }}
        selectedRows={selectedRows}
        pageData={GET_DATA('leave.filterData')}
        onChangePage={onChangePage}
      />
    </FilterLayout>
  )
}
