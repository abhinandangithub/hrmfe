import { Col } from 'antd'
import _ from 'lodash'
import React, { memo, useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { stockCheck } from '../../Actions/UserAction'
import { useSelector } from '../../Hooks/redux'
import { Field } from '../Form'

type Props = {
  name: string
  venstk?: boolean
  disabled: boolean
}

type StockData = {
  warehouse: string
  location: string
  rack: string
}

function StockLocations({ name, venstk, disabled }: Props) {
  const { setValue } = useFormContext()
  const [stockData, setStockData] = useState<StockData[]>([])
  const { companyInfo } = useSelector((state) => state.users)
  const { configurations: { warehouseLocations, warehouseRacks } = {} } = companyInfo

  const [warehouse, location, materialCode, stockable] = useWatch({
    name: [`${name}warehouse`, `${name}location`, `${name}materialCode`, `${name}stockable`]
  })

  useEffect(() => {
    if (!disabled && stockable) {
      stockCheck({
        materialCode
      }).then((data: StockData[]) => {
        setStockData(data.filter((x) => (venstk ? true : x.warehouse !== 'VENSTK')))
      })
    }
  }, [materialCode])

  if (!stockable) {
    return null
  }

  return (
    <>
      <Col xs={12} sm={12} md={8} lg={3}>
        <div className="form-field">
          <Field
            as="select"
            name={`${name}warehouse`}
            label="Warehouse"
            onChange={(n, v) => {
              setValue(`${name}location`, '')
              setValue(`${name}rack`, '')

              return setValue(n, v)
            }}
            options={_.unionBy(
              stockData.map((item) => ({
                ...item,
                label: item.warehouse,
                value: item.warehouse
              })),
              'value'
            )}
            disabled={disabled}
          />
        </div>
      </Col>
      {warehouseLocations === 'Yes' && (
        <Col xs={12} sm={12} md={8} lg={2}>
          <div className="form-field">
            <Field
              as="select"
              name={`${name}location`}
              label="Location"
              onChange={(n, v) => {
                setValue(`${name}rack`, '')

                return setValue(n, v)
              }}
              options={_.unionBy(
                stockData
                  .filter((item) => item.warehouse === warehouse)
                  .map((item) => ({
                    ...item,
                    label: item.location,
                    value: item.location
                  })),
                'value'
              )}
              disabled={disabled}
            />
          </div>
        </Col>
      )}
      {warehouseRacks === 'Yes' && (
        <Col xs={12} sm={12} md={8} lg={2}>
          <div className="form-field">
            <Field
              as="select"
              name={`${name}rack`}
              label="Rack"
              options={stockData
                .filter((item) => item.warehouse === warehouse && item.location === location)
                .map((item) => ({
                  ...item,
                  label: item.rack,
                  value: item.rack
                }))}
              disabled={disabled}
            />
          </div>
        </Col>
      )}
    </>
  )
}

export default memo(StockLocations)
