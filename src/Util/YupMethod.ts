/* eslint-disable max-classes-per-file */
import sumBy from 'lodash/sumBy'
import * as Yup from 'yup'

Yup.addMethod<Yup.NumberSchema<number | null>>(
  Yup.number,
  'number',
  function (message = 'Value must be number') {
    return this.typeError(message)
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .nullable()
      .test('number', message, (value) => (value ? /^[0-9]*$/.test(value.toString()) : true))
  }
)

Yup.addMethod<Yup.NumberSchema<number | null>>(
  Yup.number,
  'decimal',
  function (message = 'Value must be a valid decimal') {
    return this.typeError(message)
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .nullable()
      .test('decimal', message, (value) => (value ? /^\d{1,13}(\.\d{1,6})?$/.test(value.toString()) : true))
  }
)

Yup.addMethod<Yup.NumberSchema<number | null>>(
  Yup.number,
  'exchangeRate',
  function (message = 'Value must be maximum 6 decimal') {
    return this.typeError(message)
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .nullable()
      .test('exchangeRate', message, (value) =>
        value ? /^\d{1,13}(\.\d{1,6})?$/.test(value.toString()) : true
      )
  }
)

Yup.addMethod<Yup.StringSchema>(Yup.string, 'url', function (message) {
  return this.test('url', message || 'Enter a valid url', (value) =>
    value
      ? /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g.test(
          value
        )
      : true
  )
})

Yup.addMethod<Yup.ArraySchema<Yup.AnyObject[] | undefined, Yup.AnyObject | undefined>>(
  Yup.array,
  'unique',
  function (message, mapper = (a: Yup.AnyObject) => a) {
    return this.test(
      'unique',
      message,
      (list) => list?.filter(mapper).length === new Set(list?.filter(mapper).map(mapper)).size
    )
  }
)

Yup.addMethod<Yup.ArraySchema<Yup.AnyObject[] | undefined, Yup.AnyObject | undefined>>(
  Yup.array,
  'atLeastOneOfFieldInObject',
  function (message = 'At least one of field is required', field) {
    return this.test('atLeastOneOfFieldInObject', '', (value, ref) =>
      !value?.some((obj) => obj[field])
        ? ref.createError({
            message,
            path: `${ref.path}[0].${field}`
          })
        : true
    )
  }
)

Yup.addMethod<Yup.StringSchema>(Yup.string, 'dateFormat', function (message) {
  return this.test('dateFormat', message || 'Enter a valid date format', (value) =>
    value ? /^.*\$\{.*((Y)|(M)|(D)).*\}.*/g.test(value) : true
  )
})

Yup.addMethod<Yup.ArraySchema<Yup.AnyObject[] | undefined, Yup.AnyObject | undefined>>(
  Yup.array,
  'batchTotal',
  function (quantityField, message) {
    return this.test('batchTotal', message || 'Qty and Total Batch / Serial Qty not equal', function (value) {
      return sumBy(value, (o) => Number(o.quantity)) === Number(this.parent[quantityField])
    })
  }
)

Yup.addMethod<Yup.StringSchema>(Yup.string, 'barcode', function (message) {
  return this.test('barcode', message || '${path} is not valid', (value) =>
    value ? /^\*?([0-9A-Z\-. $/+%]{1,})\*?$/.test(value) : true
  )
})

declare module 'yup' {
  class StringSchema<
    TType extends Yup.Maybe<string> = string | undefined,
    TContext = Yup.AnyObject,
    TDefault = undefined,
    TFlags extends Yup.Flags = ''
  > extends Yup.Schema<TType, TContext, TDefault, TFlags> {
    password(): StringSchema<TType, TContext, TDefault, TFlags>

    phone(): StringSchema<TType, TContext, TDefault, TFlags>

    url(): StringSchema<TType, TContext, TDefault, TFlags>
  }

  class NumberSchema<
    TType extends Yup.Maybe<number> = number | undefined,
    TContext = Yup.AnyObject,
    TDefault = undefined,
    TFlags extends Yup.Flags = ''
  > extends Yup.Schema<TType, TContext, TDefault, TFlags> {
    number(): NumberSchema<TType | null, TContext, TDefault, TFlags>

    decimal(): NumberSchema<TType | null, TContext, TDefault, TFlags>

    exchangeRate(): NumberSchema<TType | null, TContext, TDefault, TFlags>
  }

  class ArraySchema<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TIn extends any[] | null | undefined,
    TContext = Yup.AnyObject,
    TDefault = undefined,
    TFlags extends Yup.Flags = ''
  > extends Yup.Schema<TIn, TContext, TDefault, TFlags> {
    unique(): ArraySchema<TIn, TContext, TDefault, TFlags>

    atLeastOneOfFieldInObject(): ArraySchema<TIn, TContext, TDefault, TFlags>

    batchTotal(
      quantityField: string | undefined,
      message: string | undefined
    ): ArraySchema<TIn, TContext, TDefault, TFlags>
  }
}

export default Yup
