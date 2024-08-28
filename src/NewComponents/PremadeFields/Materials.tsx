import React, { memo, useState } from 'react'
import { getMaterial } from '../../Actions/UserAction'
import { Field } from '../Form'
import type { TAutoComplete, TOption } from '../Form/types'

export type TMaterials = {
  basic?: {
    materialCode: string
    materialDescription: string
    materialDescriptionAlt: string
    partNumber: string
    unit: string
    salesTime: number
    purchaseTime: number
    notes: string
    batch: boolean
    serial: boolean
    imageURL: string
  }
  stockInfo?: {
    salesUnit: string
    purchaseUnit: string
    purchasePrice: TNumber
    purchaseTax: TNumber
    purchaseTaxFormat: PercentageFormat
    salesPrice: TNumber
    salesTax: TNumber
    salesTaxFormat: PercentageFormat
    defaultWarehouse: string
    defaultLocation: string
    defaultRack: string
  }
  costInfo?: {
    cost: number
  }
  stockable: boolean
  discount: number
  discountFormat: PercentageFormat
  charge: number
  chargeFormat: PercentageFormat
} & TOption

export type Props<Option extends TMaterials, TFieldName extends string, TTextArea extends boolean> = {
  stockable?: boolean
  params?: Record<string, unknown>
} & TAutoComplete<Option, TFieldName, TTextArea>

function Materials<Option extends TMaterials, TFieldName extends string, TTextArea extends boolean>({
  stockable,
  params,
  onSearch,
  ...props
}: Props<Option, TFieldName, TTextArea>) {
  const [materials, setMaterials] = useState<Option[]>([])
  const [search, setSearch] = useState('')

  const getMaterials = (material: string) => {
    onSearch?.(material)
    setSearch(material)

    if (!(search && material.startsWith(search) && materials.length)) {
      getMaterial({ material, stockable, ...params }).then((data) => {
        setMaterials(data)
      })
    }
  }

  return <Field as="auto-complete" onSearch={getMaterials} options={materials} {...props} />
}

export default memo(Materials)
