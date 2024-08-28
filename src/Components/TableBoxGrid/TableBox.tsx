/* eslint-disable no-undef */
// ** Custom Component Import
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useRef, useState } from 'react'
import { GET_DATA, SET_DATA } from '../../Util/Util'
import apiClient from '../../Util/apiClient'
// import { Collapse } from 'antd'
// import { ThemeColor } from './avatar/types'
// import CustomChip from './chip/index'

import TableHeader from './TableHeader'

function usePrevious(value: any) {
  const ref = useRef(0)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

function TableBox(props: any) {
  const [dataSource, setDataSource] = useState([])
  const mountedRef = useRef(true)

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  })
  const prevCount = usePrevious(paginationModel.page)

  const [rowCount, setRowCount] = useState(1)

  const { tableConfig } = props

  useEffect(() => {
    // Set the flag to true when the component mounts
    mountedRef.current = true

    // Fetch data when the component mounts
    onFilter(GET_DATA(tableConfig.setFilter))

    // Clean up function to set the flag to false when the component unmounts
    return () => {
      mountedRef.current = false
      setDataSource([]) // Optional: Clear dataSource on unmount
    }
  }, [])

  const onFilter = (obj = {}) => {
    if (tableConfig.method === 'POST') {
      apiClient
        .post(tableConfig.endpoint, obj)

        .then((response) => {
          console.log('API response')

          if (!response || !response.data) {

            if (mountedRef.current) {
              setRowCount(0)
              setDataSource([])
            }
            return
          }

          const { data } = response
          if (data?.result) {
            data.result = data.result.map((obj: any) => ({ ...obj, id: obj._id }))

            if (mountedRef.current) {
              SET_DATA(tableConfig.setFilter, { ...obj, ...data.pageData })

              if (data.pageData) {
                setRowCount(data.pageData.totalCount)
              } else {
                setRowCount(0) // or some default value
              }

              setDataSource(data.result)
            }
          } else if (mountedRef.current) {
            setRowCount(0) // or some default value
            setDataSource([]) // Optionally set an empty data source
          }
        })
        .catch((error: any) => {
          console.error('Error fetching data:', error)
          if (mountedRef.current) {
            setRowCount(0)
            setDataSource([])
          }
        })
    } else {
      apiClient
        .get(tableConfig.endpoint, { params: obj })
        .then((response) => {
          console.log('API response:') // Debugging log

          if (!response || !response.data) {
            console.log('response')
            if (mountedRef.current) {
              setRowCount(0)
              setDataSource([])
            }
            return
          }

          const { data } = response
          if (data?.result) {
            data.result = data.result.map((obj: any) => ({ ...obj, id: obj._id }))

            if (mountedRef.current) {
              SET_DATA(tableConfig.setFilter, { ...obj, ...data.pageData })

              if (data.pageData) {
                setRowCount(data.pageData.totalCount)
              } else {
                setRowCount(0) // or some default value
              }

              setDataSource(data.result)
            }
          } else if (mountedRef.current) {
            setRowCount(0) // or some default value
            setDataSource([]) // Optionally set an empty data source
          }
        })
        .catch((error: any) => {
          console.error('Error fetching data:', error)
          if (mountedRef.current) {
            setRowCount(0) // Set a default value or handle the error case
            setDataSource([]) // Optionally set an empty data source
          }
        })
    }
  }

  useEffect(() => {

    let pge = paginationModel.page
    if (paginationModel.page !== prevCount) {
      if (paginationModel.page > prevCount) {
        pge += 1
      } else {
        pge = prevCount - 1
      }
    }
    onFilter({ ...{ page: pge } })
  }, [paginationModel])

  const toggleAddUserDrawer = () => {
    props.emitData({ TYPE: 'NEW', DATA: null })
  }

  // function resetForm() {
  //   reset()
  //   setDataSource(props.dataSource)
  // }


  return (
    <Card sx={{ boxShadow: 3, marginTop: '10px', margin: '10px' }}>
      <TableHeader
        toggle={toggleAddUserDrawer}
        dataSource={dataSource}
        exportKeys={tableConfig.export?.data}
        header={tableConfig.export?.header}
        btnTitle={tableConfig.export?.btnTitle}
        title={tableConfig.title}
        filters={tableConfig.filters}
        page={tableConfig.page}
        config={tableConfig}
        applyFilter={(e: any) => onFilter(e)}
      />

      <Box
        sx={{
          pt: 0,
          boxShadow: 3,
          textAlign: 'center',
          width: '100%',
          '& .super-app-theme--header': {
            backgroundColor: '#FAFAFC',
            color: '#000',
            fontWeight: '500'
          }
        }}>
        <DataGrid
          sx={{
            '& .MuiDataGrid-menuIconButton': {
              opacity: 1,
              color: '#fff'
            },

            fontSize: 12,
            '& .MuiDataGrid-iconButtonContainer': {
              visibility: 'visible'
            },
            '& .MuiDataGrid-sortIcon': {
              opacity: 'inherit !important',
              color: '#CBC9D2'
            },
            '& .MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within': {
              outline: 'none !important',
              backgroundColor: 'red',
              margin: '6px'
            },
            '.MuiDataGrid-cell .MuiTypography-root': {
              fontSize: '12px !important'
            },
            '.MuiDataGrid-columnHeaderTitle': {
              fontWeight: '500 !important'
            },
            '.MuiTablePagination-displayedRows': {
              display: 'flex',
              justifyContent: 'flex-start' /* Align items to the left */,
              paddingTop: '15px'
            },
            '& .MuiDataGrid-cell:first-child': {
              paddingLeft: 2 // Table first column padding
            },
            '& .MuiDataGrid-columnHeader:first-child': {
              paddingLeft: 2
            },
            '& .MuiTablePagination-spacer': {
              flex: 'none !important'
            },

            '& .MuiDataGrid-footerContainer': {
              display: 'inline-block'
            },
            // '& .MuiTablePagination-root': {
            //   position: 'relative',
            //   right: '85%'
            //   // display: 'flex',
            //   // flex: 'none !important'
            // },

            // '& .MuiTablePagination-spacer ': {
            //   display: 'flex',
            //   flex: 'none !important'
            // },
            '& .MuiDataGrid-row': {
              height: '10px'
            }

            // '& .MuiDataGrid-main': {
            //   // remove overflow hidden overwise sticky does not work
            //   overflow: 'unset'
            // },
            // '& .MuiDataGrid-columnHeader:last-child': {
            //   position: 'sticky', // Table first column padding
            //   right: 0,
            //   background: 'white',
            //   boxShadow: '5px 2px 5px grey',
            //   borderLeft: '2px solid black'
            // },
            // '& .MuiDataGrid-cell:last-child ': {
            //   position: 'sticky', // Table first column padding
            //   right: 0,
            //   background: 'white',
            //   boxShadow: '5px 2px 5px grey',
            //   borderLeft: '2px solid black'
            // },
          }}
          paginationMode="server"
          autoHeight
          columnHeaderHeight={45}
          rowHeight={35}
          rows={dataSource}
          columns={tableConfig.table.header}
          disableRowSelectionOnClick
          disableDensitySelector
          rowCount={rowCount}
          onPaginationModelChange={setPaginationModel}
          paginationModel={paginationModel}
        />
      </Box>
    </Card>
  )
}

export default TableBox
