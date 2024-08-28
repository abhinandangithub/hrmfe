import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { message } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import TableBox from '../../../../Components/TableBox/TableBox'
import TableHeader from '../../../../Components/TableBoxGrid/TableHeader'
import { GET_DATA, SET_DATA } from '../../../../Util/Util'
import apiClient from '../../../../Util/apiClient'

export default function LeaveBalanceGeneration() {
  const [dataSource, setDataSource] = useState([])
  const [toggleForm, setToggleForm] = useState(false)

  const columnData = () => [
    {
      title: 'Calender Year',
      dataIndex: 'calenderYearData',
      key: 'calenderYear',
      render: (v: any) => v?.name
    },
    {
      title: 'Emp. No.',
      dataIndex: 'employeeNo',
      key: 'empNo'
    },
    {
      title: 'Emp. Name',
      dataIndex: 'employeeData',
      key: 'empname',
      render: (v: any) => v?.name
    },
    {
      title: 'Date of joining',
      dataIndex: 'employeeData',
      key: 'joiningDate',
      render: (v: any) => (v?.joiningDate ? moment(v?.joiningDate).format('YYYY-MM-DD') : '')
    },
    {
      title: 'Role',
      dataIndex: 'roleData',
      key: 'roleName',
      render: (v: any) => v?.name
    }
  ]

  const [columns, setColumns] = useState<any>(columnData())

  const LeaveBalenceJson = {
    title: 'Leave Balance',
    page: 'LEAVEBALENCE',
    endpoint: 'leave-balance/by-calender-year',
    setFilter: 'leaveBalance.filterData',
    additionalBtn: {
      btnTitle: 'Sync',
      endpoint: 'leave-balance/add-many',
      method: 'POST'
    },
    export: {
      header: ['Calendar Year', 'Emp. No', 'Emp. Name', 'Date of Joining', 'Role'],
      data: [
        { type: 'OBJECT', field: 'calenderYearData', showField: 'name' },
        'employeeNo',
        { type: 'OBJECT', field: 'employeeData', showField: 'name' },
        { type: 'DATE_SUB_NODE', field: 'employeeData', subField: 'joiningDate' },
        { type: 'OBJECT', field: 'roleData', showField: 'name' },

      ],
      btnTitle: null
    },
    filters: null
  }



  console.log(toggleForm)

  const onChangePage = (pageData: any) => {
    const filterCache = GET_DATA('leaveBalance.filterData')

    getData({ ...(filterCache || {}), ...pageData })
  }


  const getData = (filterObj = {}) => {


    apiClient.get('/leave-balance/by-calender-year', { params: filterObj }).then(({ data }) => {
      if (data && data.result) {
        SET_DATA('leaveBalance.filterData', { ...filterObj, ...data.pageData })

        if (data.result.length === 0) {
          message.info('No data for this Year')
          setDataSource([])
        } else {
          const columnObject: any = {}
          const tableData = data.result.map((value: any) => {
            const obj = { ...value }
            value.leaves.map((node: any) => {
              const type = node.type.replaceAll(' ', '')

              if (!columnObject[type]) {
                if (type !== 'LossOfPay') {
                  columnObject[type] = {
                    title: node.type,
                    children: [
                      {
                        title: 'Total',
                        dataIndex: `total${type}`,
                        key: `total${type}`
                      },
                      {
                        title: 'Availed',
                        dataIndex: `availed${type}`,
                        key: `availed${type}`
                      },
                      {
                        title: 'Balance',
                        dataIndex: `balance${type}`,
                        key: `balance${type}`
                      }
                    ]
                  }
                } else {
                  columnObject[type] = {
                    title: node.type,
                    children: [
                      {
                        title: 'Availed',
                        dataIndex: `availed${type}`,
                        key: `availed${type}`
                      }
                    ]
                  }
                }
              }

              obj[`total${type}`] = node.total || 0
              obj[`availed${type}`] = node.availed || 0
              obj[`balance${type}`] = node.total - node.availed || 0

              return value
            })

            return obj
          })

          setColumns([...columnData(), ...Object.values(columnObject)])
          setDataSource(tableData)
        }

        return null
      }
    })
  }

  const toggleAddUserDrawer = () => {
    setToggleForm(true)
    // props.emitData({ TYPE: 'NEW', DATA: null })
  }



  const onFilter = (e: any) => {
    console.log('e', e)
    getData(e)
  }

  useEffect(() => {
    getData(GET_DATA('leaveBalance.filterData'))
  }, [])

  function applyAdditionalApi() {

    const filter = GET_DATA(LeaveBalenceJson.setFilter)
    if (!filter.calenderYear) {
      message.error('Please select year for sync')

    } else {
      console.log('api call')
      if (LeaveBalenceJson.additionalBtn.method === 'POST') {
        apiClient
          .post(LeaveBalenceJson.additionalBtn.endpoint, filter)

          .then((response) => {

            const { data } = response
            if (data?.result) {
              message.success('Data Synced Successfully')
              onFilter(filter)
              getData(filter)
            }
          })
          .catch((error: any) => {
            console.error('Error fetching data:', error)

          })
      }
    }

  }


  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>

        <Card sx={{ boxShadow: 3, marginTop: '10px', margin: '10px' }}>
          <TableHeader
            toggle={toggleAddUserDrawer}
            dataSource={dataSource}
            exportKeys={LeaveBalenceJson.export.data}
            header={LeaveBalenceJson.export.header}
            btnTitle=''
            title="Leave  Balance"
            filters={null}
            page="LEAVEBALENCE"
            config={LeaveBalenceJson}
            applyFilter={(e) => onFilter(e)}
            applyAdditionalBtn={applyAdditionalApi}
          />
          <TableBox
            dataSource={dataSource}
            columns={columns}
            bordered
            pageData={GET_DATA('leaveBalance.filterData')}
            onChangePage={onChangePage}
          />
        </Card>

      </Grid>
    </Grid>


  )
}
