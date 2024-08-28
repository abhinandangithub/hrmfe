import { Skeleton, Space } from 'antd'
import { FormikHelpers, FormikValues, getIn, useFormikContext } from 'formik'
import _ from 'lodash'
import { FunctionComponent, memo, ReactNode, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useMediaQuery from '../../Hooks/useMediaQuery'
import Button from '../Button'

interface TItem extends FormikValues {
  id?: string
  new?: boolean
}

type TFieldArray<TLineItem extends TItem> = {
  name: string
  editable?: boolean
  viewOnly?: boolean
  allowEmpty?: boolean
  children: FunctionComponent<
    {
      i: number
      setFieldValue: FormikHelpers<{ [index: string]: TLineItem[] }>['setFieldValue']
    } & TLineItem
  >
  defaultValues: TLineItem
  additionalValues: TLineItem
  delay?: number
  loaderCount?: number
  showAdd?: boolean
  title?: ReactNode
  addRight?: boolean
  showUpdated?: boolean
  forceHideDelete?: boolean
  disableAdd?: boolean
  addRowHandler?: () => void
  deleteRowHandler?: (items: TItem, index: number) => void
}

function FieldArray<TLineItem extends TItem>({
  name,
  defaultValues,
  additionalValues,
  editable,
  viewOnly,
  allowEmpty,
  delay = 500,
  loaderCount = 5,
  showAdd,
  children: Comp,
  title,
  addRight,
  showUpdated,
  forceHideDelete,
  disableAdd,
  addRowHandler,
  deleteRowHandler
}: TFieldArray<TLineItem>) {
  const { values, setFieldValue } = useFormikContext<{ [index: string]: TLineItem[] }>()
  const { id } = useParams<{ id: string }>()
  const [mount, setMount] = useState(false)
  const sm = useMediaQuery('(max-width: 767px)')
  const md = useMediaQuery('(max-width: 991px)')

  const items = getIn(values, name) as []

  const addRow = () => {
    if (addRowHandler) {
      addRowHandler()
    } else if (showUpdated) {
      setFieldValue(name, [defaultValues, ...items])
    } else {
      setFieldValue(name, [...items, defaultValues])
    }
  }

  const removeRow = (index: number) => {
    const filteredItems = items.filter((_, i) => i !== index)

    if (deleteRowHandler) {
      deleteRowHandler?.(filteredItems, index)
    } else {
      setFieldValue(name, filteredItems)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setMount(true)
    }, delay)
  }, [])

  return mount ? (
    <>
      {items.map((item: TLineItem, i: number) => (
        <div className="list-field" key={i + _.get(item, 'id', '_id')}>
          <div style={{ width: '100%' }}>
            {title}
            <Comp
              {...{
                ...item,
                ...additionalValues,
                i,
                itemsCount: items.length,
                setFieldValue,
                item,
                additionalValues,
                items
              }}
            />
          </div>
          {!forceHideDelete && (item.new || ((editable || !id) && (items.length > 1 || allowEmpty))) && (
            <div className="remove-column pl-2" style={{}}>
              <Button variant="primary" className="mt-4 btn-glow delete-field" onClick={() => removeRow(i)}>
                <i className="flaticon-delete-2 mr-0" />
              </Button>
            </div>
          )}
        </div>
      ))}
      {(showAdd || ((editable || !id) && !viewOnly)) && (
        <Button
          style={{
            zIndex: 1,
            ...(addRight && { right: -25, bottom: -10 })
          }}
          success
          onClick={addRow}
          disabled={disableAdd}>
          <i className="flaticon-plus" /> Add
        </Button>
      )}
    </>
  ) : (
    <Space size="middle" className="field-array">
      {[...Array(sm ? 2 : md ? 3 : loaderCount)].map((item, i) => (
        <div key={i}>
          <Skeleton.Input active style={{ height: 10, width: 50, borderRadius: 10 }} />
          <Skeleton.Input active style={{ height: 40, borderRadius: 10 }} className="w-100" />
        </div>
      ))}
    </Space>
  )
}

export default memo(FieldArray)
