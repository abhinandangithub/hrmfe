import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'
import NumberingSeriesFilter from './NumberingSeriesFilter'
import NumberingSeriesForm from './NumberingSeriesForm'

export default function NumberingSeries() {
  const [numberingSeries, setNumberingSeries] = useState([])
  const [openForm, setOpenForm] = useState(false)

  const onFilter = (params = {}) => {
    apiClient.get('numbering-series', { params }).then(({ data }) => {
      if (data?.result) {
        SET_DATA('numberingSeries.filterData', { ...params, ...data.pageData })
        setNumberingSeries(data.result)
      }
    })
  }

  useEffect(() => {
    onFilter(GET_DATA('numberingSeries.filterData'))
  }, [])

  const onChangePage = (pageData) => {
    const filterCache = GET_DATA('numberingSeries.filterData')
    onFilter({ ...(filterCache || {}), ...pageData })
  }

  const onCancel = (data) => {
    if (data) {
      onFilter(GET_DATA('numberingSeries.filterData'))
    }

    setOpenForm(false)
  }

  const columns = [
    {
      title: 'Module',
      dataIndex: 'module',
      render: () => null
    },
    { title: 'Transaction', dataIndex: 'transaction' },
    { title: 'Prefix', dataIndex: 'prefix', editable: true, dateFormat: true },
    { title: 'Start number', dataIndex: 'startNo', editable: true },
    { title: 'Suffix', dataIndex: 'suffix', editable: true, dateFormat: true },
    { title: 'Transaction number', dataIndex: 'transactionNo' },
    {
      title: 'Valid from',
      dataIndex: 'validFrom',
      render: (date) => (date ? moment(date).utc().format('yyyy-MM-DD') : '')
    },
    {
      title: 'Valid to',
      dataIndex: 'validTo',
      render: (date) => (date ? moment(date).utc().format('yyyy-MM-DD') : '')
    },
    { title: 'Last generated no.', dataIndex: 'lastGeneratedNoRef', render: (text) => text || '-' },
    {
      ...(validateAccess('edit-division') && {
        title: 'Action',
        dataIndex: 'custom_action',
        render: (text, row) => (
          <div className="btn-group">
            <button type="button" onClick={() => setOpenForm(row)} className="btn glow dropdown-toggle">
              <i className="flaticon-edit-1" />
            </button>
          </div>
        )
      })
    }
  ]

  return (
    <FilterLayout filter={<NumberingSeriesFilter onFilter={onFilter} onAdd={() => setOpenForm(true)} />}>
      <div className="top-filter-options">
        <h2>Numbering Series</h2>
      </div>
      <TableBox
        dataSource={numberingSeries}
        columns={columns}
        pageData={GET_DATA('numberingSeries.filterData')}
        onChangePage={onChangePage}
      />
      <ModalBox
        title="Add Series"
        visible={!!openForm}
        footer={null}
        onCancel={() => onCancel()}
        destroyOnClose>
        <NumberingSeriesForm
          onCancel={onCancel}
          selectedSeries={typeof openForm === 'object' ? openForm : false}
        />
      </ModalBox>
    </FilterLayout>
  )
}
