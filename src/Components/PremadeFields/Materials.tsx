import { EditOutlined } from '@ant-design/icons'
import { OptionData, OptionGroupData } from 'rc-select/lib/interface'
import { memo, useState } from 'react'
import { getMaterial } from '../../Actions/UserAction'
import { Field } from '../Formik'
import type { InputValueType, TAutoComplete } from '../Formik/types'

type Props = {
  stockable?: boolean
  params?: Record<string, unknown>
} & TAutoComplete

function Materials({ stockable, params, onSearch, onSelect, ...props }: Props) {
  const [materials, setMaterials] = useState([])
  const [search, setSearch] = useState('')
  const [stockFlag, setStockFlag] = useState(false)

  const getMaterials = (material: string) => {
    onSearch?.(material)
    setSearch(material)

    if (!(search && material.startsWith(search) && materials.length)) {
      getMaterial({ material, stockable, ...params }).then((data) => {
        setMaterials(data)
      })
    }
  }

  const onSelectFn = (v: InputValueType, o: OptionData | OptionGroupData | undefined) => {
    onSelect?.(v, o)
    setStockFlag(o?.stockable)
  }

  return (
    <Field
      as="auto-complete"
      onSearch={getMaterials}
      options={materials}
      {...props}
      onSelect={onSelectFn}
      rightContent={stockFlag ? <EditOutlined onClick={() => setStockFlag(false)} /> : false}
      disabled={props.disabled || stockFlag}
    />
  )
}

export default memo(Materials)
