import { Table } from 'antd'
import { ColumnType, TableProps } from 'antd/lib/table'
import { TableRowSelection } from 'antd/lib/table/interface'
import { TFunction } from 'i18next'
import _ from 'lodash'
import { FieldValues } from 'react-hook-form'
import { withTranslation } from 'react-i18next'
import PageButtonBox from '../Pagination/PageButtonBox'
import PaginationBox from '../Pagination/PaginationBox'
import './TableBox.scss'

interface Record extends Object {
  id?: string
  _id?: string
  key?: string | number
}

export type ColumnsType<RecordType extends Record> = ColumnType<RecordType> & {
  dontShow?: boolean
}

export type PageData = {
  totalCount: number
  page: number
  perPage: number
}

type Props<RecordType extends Record, TParams extends FieldValues> = {
  onSelect?: (selected: RecordType[]) => void
  selectedRows?: RecordType[]
  columns: ColumnsType<RecordType>[] | any
  pageData?: TParams & PageData
  onChangePage?: (pageData: TParams & PageData) => void
  pageLabel?: string
  onNextPage?: (id: string) => void
  enablePage?: string
  t: TFunction<'translation', undefined>
} & TableProps<RecordType>

function TableBox<RecordType extends Record = Record, TParams extends FieldValues = PageData>(
  props: Props<RecordType, TParams>
) {
  const { dataSource = [], onSelect, pageLabel, onNextPage, enablePage } = props

  const onSelectChange = (selected: RecordType) => {
    let selectedRows = [...(props.selectedRows || [])]
    const check = selectedRows.find((val) => val.id === selected.id)

    if (check) {
      selectedRows = selectedRows.filter((val) => val.id !== selected.id)
    } else {
      selectedRows.push(selected)
    }

    props.onSelect?.(selectedRows)
  }

  const onSelectAll = (selected: boolean, _changeRows: RecordType[], rows: RecordType[]) => {
    const selectedRowKeys = rows.map((v) => v.id)
    let selectedRows = [...(props.selectedRows || [])]

    if (selected) {
      selectedRows = [...selectedRows, ...(props.dataSource || [])]
      selectedRows = _.uniqBy(selectedRows, (v) => v.id)
    } else {
      selectedRows = _.remove(selectedRows, (v) => !selectedRowKeys.includes(v.id))
    }

    props.onSelect?.(selectedRows)
  }

  const rowSelection: TableRowSelection<RecordType> = {
    selectedRowKeys:
      (props.selectedRows || []).length > 0 ? props.selectedRows?.map((val) => val.id || val._id || '') : [],
    onSelect: onSelectChange,
    onSelectAll,
    preserveSelectedRowKeys: true
  }

  return (
    <>
      <div className="card-datatable table-responsive border-top">
        <Table
          {...(onSelect && {
            rowSelection
          })}
          pagination={false}
          {...props}
          columns={props.columns?.filter((v: any) => !v.dontShow)}
          dataSource={dataSource.map((data, i) => {
            data.key = data.id || data._id || i

            return data
          })}
          tableLayout="auto"
          className="datatables-users table dataTable no-footer dtr-column"
          scroll={{ x: '100%' }}
        />
        {onNextPage && (
          <div style={{ padding: 20, textAlign: 'end' }}>
            <PageButtonBox
              pageLabel={pageLabel}
              enablePage={enablePage}
              dataSource={dataSource}
              onNextPage={onNextPage}
            />
          </div>
        )}
      </div>

      {props.pageData && (
        <PaginationBox
          pageData={dataSource.length > 0 ? props.pageData : false}
          onChangePage={props.onChangePage}
        />
      )}
    </>
  )
}

export default withTranslation()(TableBox)
