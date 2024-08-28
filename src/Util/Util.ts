/* eslint-disable @typescript-eslint/no-explicit-any */
import Decimal from 'decimal.js'
import JsBarcode from 'jsbarcode'
import _, { Dictionary, get, set } from 'lodash'
import moment, { MomentInput } from 'moment'
import queryString from 'query-string'
import React, { useEffect, useRef, useState } from 'react'
import XLSX from 'xlsx'
import AppConfig, { cardColors } from '../config'
import { TCurrency } from '../Reducers/types'
import store from '../store/store'
import apiClient from './apiClient'

const APP_CACHE = { data: {} }

export const SET_DATA = (key: string, value: unknown) => {
  set(APP_CACHE.data, key, value)
}

export const GET_DATA = (key: string) => get(APP_CACHE.data, key)

export const CLEAR_DATA = () => set(APP_CACHE, 'data', {})

let accessData: string[] = []

export const updateAccessData = (data: string[]) => {
  const commonAccess = [
    '/app/inbox',
    // '/app/dashboard',
    '/app/changePassword',
    '/app/profile',
    '/app/manage-company'
  ]
  const access = [...commonAccess, ...data]
  accessData = access
}

export const emailValidate = (value: string) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return pattern.test(value) === false
}

export const numberValidate = (value: string) => {
  const pattern = /^[0-9]*$/

  return pattern.test(value) === false
}

export const urlValidate = (value: string) => {
  const pattern =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g

  return pattern.test(value) === false
}

type SelectOption<T> = {
  label: string
  value: keyof T
} & T

export const convertSelectOptions = <T>(
  options: T[],
  label: keyof T | string[],
  value: keyof T
): SelectOption<T>[] =>
  options.map((data) => {
    const formattedLabel =
      typeof label === 'object' ? label.map((v) => _.get(data, v, v)).join(' ') : _.get(data, label)

    const formattedValue = _.get(data, value)

    return { label: formattedLabel, value: formattedValue, ...data }
  })

export const avatarLetter = (str: string) => (str ? str.charAt(0) : '')

export const convertMinutesToHours = (value: number) => {
  if (value) {
    const num = value
    const hours = num / 60
    const rHours = Math.floor(hours)
    const minutes = (hours - rHours) * 60
    const rMinutes = `${Math.round(minutes)}`

    return `${rHours.toString().length === 1 ? `0${rHours}` : rHours}:${
      rMinutes.length === 1 ? `0${rMinutes}` : rMinutes
    }`
  }

  return '00:00'
}

export const getStartAndEndWeek = (value: MomentInput) => {
  const date = moment(value)
  const selectedStartWeek = moment(date).startOf('week').startOf('day')
  const selectedEndWeek = moment(date).endOf('week')
  const selectedStartMonth = moment(date).startOf('month').startOf('day')
  const selectedEndMonth = moment(date).endOf('month')

  const startWeek = selectedStartWeek > selectedStartMonth ? selectedStartWeek : selectedStartMonth
  const endWeek = selectedEndWeek < selectedEndMonth ? selectedEndWeek : selectedEndMonth
  const startWeekDate = startWeek.format('D')
  const endWeekDate = endWeek.format('D')

  return { startWeek, endWeek, startWeekDate, endWeekDate }
}

export const TIME_ENABLED_STATUS = ['Created', 'Returned', 'Rejected']

export const amountToWords = (wholeNumber: string | number, currencyObj?: TCurrency) => {
  if (typeof wholeNumber === 'number') {
    wholeNumber = wholeNumber.toString()
  }

  const NumberToWordInt = (num: string | number): string => {
    num = parseInt(`${num}`, 10)

    if (num === 0) {
      return 'Zero'
    }

    if (num < 0) {
      return `Minus ${NumberToWordInt(Math.abs(num))}`
    }

    let words = ''

    if (parseInt(`${num / 1000000}`, 10) > 0) {
      words += `${NumberToWordInt(num / 1000000)} Million `
      num %= 1000000
    }

    if (parseInt(`${num / 1000}`, 10) > 0) {
      words += `${NumberToWordInt(num / 1000)} Thousand `
      num %= 1000
    }

    if (parseInt(`${num / 100}`, 10) > 0) {
      words += `${NumberToWordInt(num / 100)} Hundred `
      num %= 100
    }

    if (num > 0) {
      if (words !== '') {
        words += 'and '
      }

      const unitsMap = [
        'Zero',
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
        'Ten',
        'Eleven',
        'Twelve',
        'Thirteen',
        'Fourteen',
        'Fifteen',
        'Sixteen',
        'Seventeen',
        'Eighteen',
        'Nineteen'
      ]

      const tensMap = [
        'zero',
        'Ten',
        'Twenty',
        'Thirty',
        'Forty',
        'Fifty',
        'Sixty',
        'Seventy',
        'Eighty',
        'Ninety'
      ]

      if (num < 20) {
        words += unitsMap[num]
      } else {
        words += tensMap[parseInt(`${num / 10}`, 10)]

        if (num % 10 > 0) {
          words += `-${unitsMap[parseInt(`${num % 10}`, 10)]}`
        }
      }
    }

    return words
  }

  const Numbers = parseFloat(wholeNumber).toFixed(currencyObj?.decimalLength || 2)
  const splits = Numbers.toString().split('.')
  let Result = ''

  if (splits.length > 1) {
    Result = NumberToWordInt(parseInt(splits[0], 10))
    let Reminders = ''
    Reminders = NumberToWordInt(parseInt(splits[1], 10))

    return `${Result} ${currencyObj ? currencyObj.name : ''} and ${Reminders} ${
      currencyObj ? currencyObj.unit : ''
    }`
  }

  return NumberToWordInt(parseInt(wholeNumber, 10))
}

export const amountSeparator = (value: string) => {
  const amount = value ? parseFloat(value).toFixed(2) : '0.00'

  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const generateId = (ID_LENGTH: number) => {
  let rtn = ''

  for (let i = 0; i < (ID_LENGTH || 5); i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length))
  }

  return rtn
}

export const validateAccess = (page: string | string[], withPath?: boolean) => {
  if (accessData.indexOf('adminAccess') >= 0) {
    return true
  }

  if (accessData && page) {
    if (typeof page === 'string') {
      if (page === 'edit-employee') {
        return true
      }
      return accessData.includes(
        withPath ? page.substr(5, page.indexOf(':') > 0 ? page.indexOf('/:') - 5 : page.length) : page
      )
    }

    return page.filter((e) => accessData.includes(e)).length > 0
  }
}

export const removeEmptyKeys = <T extends Record<string, unknown>>(values: T): Partial<T> => {
  const newValue: Partial<T> = {}

  Object.keys(values).forEach((val) => {
    const key = val as keyof T
    const checkArr = typeof values[key] === 'object' ? Object.keys((values[key] as T) || []).length > 0 : true

    if (values[key] !== '' && values[key] !== 0 && checkArr) {
      newValue[key] = values[key]
    }
  })

  return newValue as T
}

export const parseQueryStr = (value: string) => queryString.parse(value)

export const convertQueryStr = (value: Record<string, unknown>) => queryString.stringify(value)

export const getOffset = (currentPage: number, limit: number) => {
  const offset = (currentPage - 1) * limit

  return offset
}

/** Using this method we call the callback method when state is change */
export const useStateCallback = <T>(initialState: T) => {
  const [state, setState] = useState(initialState)
  const cbRef = useRef<React.Dispatch<React.SetStateAction<T>> | null>(null) // mutable ref to store current callback

  const setStateCallback = (newState: T, cb: React.Dispatch<React.SetStateAction<T>>) => {
    cbRef.current = cb // store passed callback to ref
    setState(newState)
  }

  useEffect(() => {
    // cb.current is `null` on initial render, so we only execute cb on state *updates*
    if (cbRef.current) {
      cbRef.current(state)
      cbRef.current = null // reset callback after execution
    }
  }, [state])

  return [state, setStateCallback]
}

export const checkMoment = (date: MomentInput) =>
  date && moment.isMoment(moment(date)) ? moment(date) : null

export const getImageUrl = (path: string) =>
  /* eslint-disable-next-line */
  path ? `${AppConfig.API_URL}/assets/${path}` : require('../assets/images/empty_img.png').default

export const getDocPath = (path: string) => (path ? `${AppConfig.API_URL}/assets/${path}` : '')

export const roundOf = (value?: TNumber, decimals = 2) =>
  Number(`${Math.round(`${value}e${decimals}` as unknown as number)}e-${decimals}`)

export const parseAmount = (value?: TNumber, currency?: string, noFormat?: boolean) => {
  const newState = store.getState()
  const defaultCurrency = currency || newState.users.companyInfo?.currency
  const currencyData = newState.users.userInfo?.currencies?.find((v) => v.code === defaultCurrency) || {
    decimalLength: 2,
    format: ','
  }
  const amt = parseFloat(
    value && !Number.isNaN(value) ? roundOf(value, currencyData.decimalLength).toString() : '0'
  )?.toFixed(currencyData.decimalLength)

  return noFormat ? Number(amt) : amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, currencyData.format)
}

export const sanitize = (html: string) => {
  const d = document.createElement('div')
  d.innerHTML = html

  return {
    dangerouslySetInnerHTML: {
      __html: d.innerHTML
    }
  }
}

export const print = (data: Blob) => {
  const iframe = document.createElement('iframe')
  document.body.appendChild(iframe)

  iframe.style.display = 'none'
  iframe.src = window.URL.createObjectURL(data)

  iframe.onload = () => {
    setTimeout(() => {
      iframe.focus()
      iframe.contentWindow?.print()
    }, 1)
  }
}

export const download = (data: Blob, headers: Record<string, string>) => {
  const a = document.createElement('a')
  a.href = window.URL.createObjectURL(data)
  a.download = JSON.parse(headers['content-disposition'].split('filename=')[1].split(';')[0])
  document.body.appendChild(a)
  a.click()
  a.remove()
}

type DownloadPrintPDF = {
  printType?: 'Single'
  params: Record<string, unknown>
} & Record<string, unknown>

export const downloadPrintPDF = <T extends DownloadPrintPDF>(
  url: string,
  { printType = 'Single', params, ...query }: T,
  isPrint = false
) =>
  new Promise((resolve, reject) => {
    apiClient
      .post(url, { printType, ...query }, { responseType: 'blob', params })
      .then(({ status, data, headers }) => {
        if (status === 200) {
          if (isPrint) {
            print(data)
          } else {
            download(data, headers)
          }

          resolve('success')
        }

        reject()
      })
  })

export const textToBase64Barcode = (text: string, options: JsBarcode.Options) => {
  const format = store.getState().users.companyInfo.configurations.barcodeFormat || 'CODE39'
  const canvas = document.createElement('canvas')
  JsBarcode(canvas, text, { format, displayValue: false, width: 5, ...options })

  return canvas.toDataURL('image/png')
}

export const checkNaN = (v: string) => (!Number.isNaN(parseFloat(v)) ? parseFloat(v) : 0)

export const base64Decode = (data: string) => {
  const buff = Buffer.from(data, 'base64')

  return buff.toString('utf8')
}

export const insertAt = <T>(array: T[], index: number, newItem: T) => [
  ...array.slice(0, index),
  newItem,
  ...array.slice(index)
]

export const getCardColor = (index: number) => cardColors[index % cardColors.length]

export const getTax = (tax?: TNumber) => (tax === '' ? store.getState().users.companyInfo?.tax : Number(tax))

export const getAvatarName = (name: string) => {
  const splitName = name?.split(' ') || ''

  if (splitName.length > 1) {
    return `${splitName[0].charAt(0).toUpperCase()}${splitName[1].charAt(0).toUpperCase()}`
  }

  return splitName[0]?.charAt(0).toUpperCase() || ''
}

export const stringToHslColor = (str: string, s = 30, l = 50) => {
  let hash = 0

  for (let i = 0; i < str?.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const h = hash % 360

  return `hsl(${h}, ${s}%, ${l}%)`
}

export const decamelize = (str: string) =>
  (str.charAt(0).toUpperCase() + str.slice(1)).split(/(?=[A-Z])/).join(' ')

type ExcelType<Field extends string> = {
  title: string
  dataIndex: Field
  render?: (field: string) => string
}

export const convertToExcel = <Field extends string, T extends ExcelType<Field>>(
  rows: T[] = [],
  values: Record<string, Field>[] = [],
  name = 'Excel'
) => {
  const wsData = [rows.map((v) => v.title)]
  values.forEach((val) =>
    wsData.push(rows.map((v) => v.render?.(val[v.dataIndex]) || val[v.dataIndex] || ''))
  )
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet(wsData)
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  const buffer = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' })
  const doc = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64, ${buffer}`
  const a = document.createElement('a')
  a.href = doc
  a.download = `${name}.xlsx`
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export const formatDate = (date: MomentInput, withTime: boolean) =>
  date ? moment(date).format(withTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD') : ''

export const formatDateByTimezone = (d: MomentInput, timeZone = 'Etc/UTC', withTime: boolean) =>
  moment(d)
    .tz(timeZone)
    .format(withTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD')

export const removeEmptyObjects = <T>(o: T): T | T[] | Dictionary<T> => {
  if (_.isFunction(o) || !_.isPlainObject(o)) {
    return o
  }

  if (_.isArray(o)) {
    return o.map(removeEmptyObjects)
  }

  return _.fromPairs(
    Object.entries(o)
      .map(([k, v]) => [k, removeEmptyObjects(v)])
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      .filter(([k, v]) => !(v == null || (_.isObject(v) && _.isEmpty(v))))
  )
}

export const merge = <TObject, TSource>(initialValues: TObject, newValues: TSource) =>
  _.merge(initialValues, removeEmptyObjects(newValues))

export const removeHTMLTags = (text: string | undefined) => text?.replace(/<[^>]*>?/gm, '') || ''

export const navigateToPreviousAndNext = <T>(url?: string, params?: T) =>
  new Promise((resolve, reject) => {
    if (url) {
      apiClient.get(url, { params }).then(({ data }) => {
        if (data?.result) {
          resolve(data.result)
        } else {
          reject()
        }
      })
    } else {
      reject()
    }
  })

export const startOfDay = (v: MomentInput) => moment(v).startOf('day').format()

export const endOfDay = (v: MomentInput) => moment(v).endOf('day').format()

export const sumBy = <T, TKey extends keyof T>(data: T[], field: ((value: T) => number) | TKey) =>
  Number(
    data.reduce(
      (total, obj) =>
        new Decimal(total || 0)
          .plus(new Decimal((typeof field === 'function' ? field(obj) : _.get(obj, field)) || 0))
          .toNumber(),
      0
    )
  )

export const getDayAndHoursFromPeriod = (s: MomentInput, e: MomentInput) => {
  const startDate = moment(s)
  const endDate = moment(e)

  // Calculate days
  const days = endDate.diff(startDate, 'days')

  // Calculate hours
  const hours = endDate.diff(startDate, 'hours') % 24

  // Calculate minutes
  const minutes = endDate.diff(startDate, 'minutes') % 60

  if (days > 0) {
    return `${days} d ${hours} hrs`
  }

  if (hours > 0) {
    return `${hours} hours ${minutes} min`
  }

  return `${minutes} mins`
}
