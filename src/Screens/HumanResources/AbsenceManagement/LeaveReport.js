import { Col, Row } from 'antd'
import { withFormik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Button from '../../../Components/Button'
import { Field, Form } from '../../../Components/Formik'
import TableBox from '../../../Components/TableBox/TableBox'
import TableLayout from '../../../Layout/TableLayout'
import { history } from '../../../Routes'
import apiClient from '../../../Util/apiClient'
// import Workflows

function LeaveReport({ userInfo, values }) {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])

  // const [viewLogs, setViewLogs] = useState(false)

  const getData = (filterData) => {
    // const period = 90;

    if (filterData.startDate === undefined) {
      filterData.startDate = moment()
    } else {
      filterData.startDate = moment(filterData.startDate)
    }

    const cols = [
      {
        title: 'Employee Name',
        dataIndex: 'name'
      }
    ]

    for (let i = 0, m = filterData.startDate.clone(); i < 90; ) {
      const days = { title: m.format('MMM-YYYY'), children: [] }
      const noOfDays = m.clone().daysInMonth() - m.clone().date() + 1

      let j = 0

      while (j < noOfDays && i + j < 90) {
        days.children.push({
          title: m.format('DD'),
          dataIndex: m.format('YYYY-MM-DD'),
          render: (v) => {
            if (v === 'Submitted') {
              return (
                <div
                  style={{ backgroundColor: 'orange', height: '20px', width: '20px' }}
                  onClick={() => history('/app/inbox')}
                />
              )
            }

            if (v === 'Approved') {
              return <div style={{ backgroundColor: 'red', height: '20px', width: '20px' }} />
            }

            if (v === 'Weekends') {
              return <div style={{ background: '#e7d6d6', width: '20px', height: '20px' }} />
            }

            return v
          }
        })
        m.add(1, 'days')
        j += 1
      }

      i += noOfDays

      cols.push(days)
    }

    // {
    // }

    const weekendRow = {}

    setColumns(cols)
    filterData.startDate = filterData.startDate.format('YYYY-MM-DD')
    apiClient.get(`/employee-details/reportees/${userInfo._id}`, { params: filterData }).then(({ data }) => {
      if (data && data?.result) {
        const tableData = []
        console.log('data', data.employees, data.result)

        for (const key in data.employees) {
          if (typeof key === 'string') {
            // console.log('check', key)
            const tableRow = {}
            tableRow.name = data.employees[key].name

            data.result[key].map((item) => {
              const tableDate = moment(item.date).format('YYYY-MM-DD')

              tableRow[`${tableDate}`] = item.workflowStatus

              return null
            })

            tableData.push(tableRow)
          }

          // return null
        }

        data.weekends.map((item) => {
          weekendRow[item] = 'Weekends'

          return null
        })

        tableData.map((item, i) => {
          tableData[i] = { ...tableData[i], ...weekendRow }

          return null
        })

        setData(tableData)
      }
    })
  }

  useEffect(() => {
    getData({})
  }, [])

  return (
    <TableLayout title="Team Leave Report">
      {/* <ModalBox
        title="Leave Approval"
        visible={!!viewLogs}
        onCancel={() => setViewLogs(false)}
        // footer={false}
        destroyOnClose>
        {/* <LeaveRequestView /> */}
      {/* </ModalBox> */}
      <Form>
        <Row gutter={[20, 10]}>
          <Col
            xs={2}
            className="font-weight-bold text-right"
            style={{ paddingTop: '13px', fontSize: '14px' }}>
            StartDate
          </Col>
          <Col xs={4}>
            <Field as="date" name="startDate" />
          </Col>
          <Col
            xs={3}
            className="font-weight-bold text-right"
            style={{ paddingTop: '13px', fontSize: '14px' }}>
            Employee Name
          </Col>
          <Col xs={3}>
            {/* <Field
              name="userId"
              as="Select"
              mode="multiple"
              endPoint="users/get-active-by-company"
              optionValue="user"
            /> */}
            <Field
              name="userId"
              // label="Inventory Taken by"
              as="paged-select"
              endPoint="users/get-active-by-company"
              optionValue="user"
            />
          </Col>
          <Col xs={2}>
            <Button
              className="btn btn-primary"
              style={{ backgroundColor: 'rgb(3, 155, 205)', border: 0 }}
              onClick={(e) => {
                e.preventDefault()
                getData(values)
              }}>
              Search
            </Button>
          </Col>
          <Col
            xs={2}
            className="font-weight-bold text-right"
            style={{ paddingTop: '13px', fontSize: '14px' }}>
            Legends
          </Col>
          <Col
            xs={2}
            className="font-weight-bold text-right"
            style={{ paddingTop: '13px', fontSize: '14px' }}>
            Approved
          </Col>
          <div style={{ backgroundColor: 'red', height: '20px', width: '20px', marginTop: '15px' }} />

          <Col
            xs={2}
            className="font-weight-bold text-right"
            style={{ paddingTop: '13px', fontSize: '14px' }}>
            Awaiting
          </Col>
          <div style={{ backgroundColor: 'orange', height: '20px', width: '20px', marginTop: '15px' }} />

          <Col
            xs={2}
            className="font-weight-bold text-right"
            style={{ paddingTop: '13px', fontSize: '14px' }}>
            Weekends
          </Col>
          <div style={{ backgroundColor: '#e7d6d6', height: '20px', width: '20px', marginTop: '15px' }} />
        </Row>
      </Form>
      <TableBox dataSource={data} columns={columns} bordered />
    </TableLayout>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    startDate: moment(),
    userId: ''
  }),
  handleSubmit: null
})(LeaveReport)
