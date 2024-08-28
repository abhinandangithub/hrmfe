import _ from 'lodash'
import Yup from './YupMethod'

const message = '${path} required'

export const warehouseSchema = Yup.object().shape({
  warehouses: Yup.array().of(
    Yup.object().shape({
      warehouse: Yup.string().required(message),
      description: Yup.string().required(message),
      location: Yup.string().when('warehouseLocations', {
        is: (warehouseLocations) => warehouseLocations === 'Yes',
        then: (schema) => schema.required(message)
      }),
      locationDescription: Yup.string().when('warehouseLocations', {
        is: (warehouseLocations) => warehouseLocations === 'Yes',
        then: (schema) => schema.required(message)
      }),
      rack: Yup.string().when('warehouseRacks', {
        is: (warehouseRacks) => warehouseRacks === 'Yes',
        then: (schema) => schema.required(message)
      }),
      rackDescription: Yup.string().when('warehouseRacks', {
        is: (warehouseRacks) => warehouseRacks === 'Yes',
        then: (schema) => schema.required(message)
      })
    })
  )
})

export const warehouseProductSchema = Yup.object().shape({
  basic: Yup.object().shape({
    materialCode: Yup.string().required(message),
    materialDescription: Yup.string().required(message),
    materialType: Yup.string().required(message),
    materialGroup: Yup.string().required(message),
    division: Yup.string()
      .nullable()
      .when('isDivision', {
        is: true,
        then: (schema) => schema.required()
      }),
    unit: Yup.string().required(message),
    grossWeight: Yup.number().nullable().decimal(),
    netWeight: Yup.number().nullable().decimal(),
    volume: Yup.number().nullable().decimal(),
    salesTime: Yup.number().nullable().decimal(),
    purchaseTime: Yup.number().nullable().decimal()
  }),
  materialAccounts: Yup.object().shape({
    stockAccountLocal: Yup.number().required(),
    stockAccountForeign: Yup.number().required(),
    cogsAccountLocal: Yup.number().required(),
    cogsAccountForeign: Yup.number().required(),
    fixedAssetAccount: Yup.number().test('fixedAssetAccount', message, function (val) {
      return (
        this.from[1]?.value?.basic?.materialType &&
        (this.from[1]?.value?.basic?.materialType !== 'Asset' || val)
      )
    })
  }),
  stockInfo: Yup.object().shape({
    safetyStock: Yup.number().nullable().decimal(),
    reorderLevel: Yup.number().nullable().decimal(),
    purchaseUnit: Yup.string().required(message),
    salesUnit: Yup.string().required(message),
    purchasePrice: Yup.number().decimal().required(message),
    salesPrice: Yup.number().decimal().required(message)
  }),
  costInfo: Yup.object().shape({
    type: Yup.string().required(message),
    cost: Yup.number().nullable().decimal().required(message)
  }),
  packaging: Yup.object().shape({
    length: Yup.number().nullable().decimal(),
    width: Yup.number().nullable().decimal(),
    height: Yup.number().nullable().decimal(),
    quantity: Yup.number().nullable().decimal()
  })
})

const storageLocationSchema = {
  warehouse: Yup.string().required(message),
  location: Yup.string().when('warehouseLocations', {
    is: (warehouseLocations) => warehouseLocations === 'Yes',
    then: (schema) => schema.required(message)
  }),
  rack: Yup.string().when('warehouseRacks', {
    is: (warehouseRacks) => warehouseRacks === 'Yes',
    then: (schema) => schema.required(message)
  })
}

export const stockReceiptSchema = Yup.object().shape({
  transactions: Yup.array()
    .of(
      Yup.object().shape({
        materialCodeDesc: Yup.string().required(message),
        unit: Yup.string().required(message),
        quantity: Yup.number().nullable().decimal().required(message),
        ...storageLocationSchema,
        cost: Yup.number().decimal().required(message),
        account: Yup.number().required(message),
        status: Yup.string().required(message),
        batchSerials: Yup.array().when(['batch', 'serial'], {
          is: (batch, serial) => batch || serial,
          then: (schema) =>
            schema
              .min(1)
              .required()
              .batchTotal('quantity', 'Receipt Qty and Total Batch / Serial Qty not equal')
        })
      })
    )
    .required()
})

export const stockIssueSchema = Yup.object().shape({
  transactions: Yup.array()
    .of(
      Yup.object().shape({
        materialCodeDesc: Yup.string().required(message),
        unit: Yup.string().required(message),
        quantity: Yup.number().nullable().decimal().required(message),
        ...storageLocationSchema,
        account: Yup.number().required(message),
        status: Yup.string().required(message),
        batchSerials: Yup.array().when(['batch', 'serial'], {
          is: (batch, serial) => batch || serial,
          then: (schema) =>
            schema
              .min(1)
              .required()
              .batchTotal('quantity', 'Issue Qty and Total Batch / Serial Qty not equal')
        })
      })
    )
    .required()
})

export const stockTransferSchema = Yup.object().shape({
  transactions: Yup.array()
    .of(
      Yup.object().shape({
        materialCodeDesc: Yup.string().required(message),
        unit: Yup.string().required(message),
        quantity: Yup.number().nullable().decimal().required(message),
        from: Yup.object().shape(storageLocationSchema),
        to: Yup.object().shape(storageLocationSchema),
        status: Yup.string().required(message),
        batchSerials: Yup.array().when(['batch', 'serial'], {
          is: (batch, serial) => batch || serial,
          then: (schema) =>
            schema
              .min(1)
              .required()
              .test('checkEqual', 'Del. Qty and Total Batch / Serial Qty not equal', function (value) {
                return (
                  _.sumBy(value, (batchSerial) => Number(batchSerial.quantity || 0)) ===
                  Number(this.parent.quantity)
                )
              })
        })
      })
    )
    .required()
})

export const materialTransferSchema = Yup.object().shape({
  transactionDate: Yup.date().required(message),
  transactionType: Yup.string().required(message),
  from: Yup.object().shape(storageLocationSchema),
  to: Yup.object().shape(storageLocationSchema),
  transactions: Yup.array()
    .of(
      Yup.object().shape({
        position: Yup.number().number().required(message),
        materialCodeDesc: Yup.string().required(message),
        unit: Yup.string().required(message),
        quantity: Yup.number().nullable().decimal().required(message)
      })
    )
    .required()
})

export const materialTransferApproveSchema = Yup.object().shape({
  transactionDate: Yup.date().required(message),
  transactionType: Yup.string().required(message),
  from: Yup.object().shape(storageLocationSchema),
  to: Yup.object().shape(storageLocationSchema),
  transactions: Yup.array()
    .of(
      Yup.object().shape({
        position: Yup.number().number().required(message),
        materialCodeDesc: Yup.string().required(message),
        unit: Yup.string().required(message),
        quantity: Yup.number().nullable().decimal().required(message),
        batchSerials: Yup.array().when(['batch', 'serial'], {
          is: (batch, serial) => batch || serial,
          then: (schema) =>
            schema
              .min(1)
              .required()
              .test('checkEqual', 'Del. Qty and Total Batch / Serial Qty not equal', function (value) {
                return (
                  _.sumBy(value, (batchSerial) => Number(batchSerial.quantity || 0)) ===
                  Number(this.parent.quantity)
                )
              })
        })
      })
    )
    .required()
})

export const addressFieldSchema = Yup.object().shape({
  street: Yup.string().required(message),
  city: Yup.string().required(message),
  postalCode: Yup.string().required(message),
  country: Yup.string().required(message)
})

export const salesOrderSchema = Yup.object().shape({
  orderType: Yup.string().required(message),
  orderDate: Yup.date().required(message),
  client: Yup.string().nullable().required(message),
  currency: Yup.string().required(message),
  exchangeRate: Yup.number().exchangeRate().required(message),
  payTerm: Yup.number().number().nullable(),
  taxCategory: Yup.string().required(message),
  orderDetails: Yup.array()
    .of(
      Yup.object().shape({
        position: Yup.number().number().required(message),
        materialCodeDesc: Yup.string().required(message),
        unit: Yup.string().required(message),
        orderedQuantity: Yup.number().nullable().decimal().moreThan(0).required(message),
        requestedDate: Yup.date().required(message),
        price: Yup.number().decimal().moreThan(0).required(message),
        discount: Yup.number().decimal(),
        charge: Yup.number().decimal(),
        taxType: Yup.string().required(message),
        tax: Yup.number()
          .decimal()
          .when('taxType', {
            is: (taxType) => taxType === 'Normal VAT',
            then: (schema) => schema.required(message)
          }),
        supplier: Yup.string()
          .nullable()
          .when('orderType', {
            is: (orderType) => orderType === 'Dropship',
            then: (schema) => schema.nullable().required(message)
          }),
        delivery: Yup.string().required(message)
      })
    )
    .unique('Duplicate Position exists', (a) => a.position)
    .required()
})

export const purchaseOrderSchema = Yup.object().shape({
  orderType: Yup.string().required(message),
  orderDate: Yup.date().required(message),
  poType: Yup.string().required(message),
  client: Yup.string().nullable().required(message),
  currency: Yup.string().required(message),
  exchangeRate: Yup.number().exchangeRate().required(message),
  payTerm: Yup.number().number().nullable().required(message),
  taxCategory: Yup.string().required(message),
  orderDetails: Yup.array()
    .of(
      Yup.object().shape({
        materialCodeDesc: Yup.string().required(message),
        unit: Yup.string().required(message),
        orderedQuantity: Yup.number().nullable().decimal().moreThan(0).required(message),
        requestedDate: Yup.date().required(message),
        price: Yup.number().decimal().moreThan(0).required(message),
        discount: Yup.number().decimal(),
        charge: Yup.number().decimal(),
        taxType: Yup.string().required(message),
        tax: Yup.number()
          .decimal()
          .when('taxType', {
            is: (taxType) => taxType === 'Normal VAT',
            then: (schema) => schema.required(message)
          }),
        customer: Yup.string()
          .nullable()
          .when('orderType', {
            is: (orderType) => orderType === 'Dropship',
            then: (schema) => schema.nullable().required(message)
          }),
        receipt: Yup.string().required(message)
      })
    )
    .unique('Duplicate Position exists', (a) => a.position)
    .required()
})

export const purchaseRequestSchema = Yup.object().shape({
  orderType: Yup.string().required(message),
  orderDate: Yup.date().required(message),
  poType: Yup.string().required(message),
  client: Yup.string().required(message),
  currency: Yup.string().required(message),
  exchangeRate: Yup.number().exchangeRate().required(message),
  payTerm: Yup.number().number().nullable().required(message),
  taxCategory: Yup.string().required(message),
  orderDetails: Yup.array()
    .of(
      Yup.object().shape({
        position: Yup.number().number().required(message),
        materialCodeDesc: Yup.string().required(message),
        unit: Yup.string().required(message),
        orderedQuantity: Yup.number().nullable().decimal().required(message),
        requestedDate: Yup.date().required(message),
        price: Yup.number().decimal().required(message),
        discount: Yup.number().decimal(),
        charge: Yup.number().decimal(),
        taxType: Yup.string().required(message),
        tax: Yup.number()
          .decimal()
          .when('taxType', {
            is: (taxType) => taxType === 'Normal VAT',
            then: (schema) => schema.required(message)
          }),
        customer: Yup.string()
          .nullable()
          .when('orderType', {
            is: (orderType) => orderType === 'Dropship',
            then: (schema) => schema.nullable().required(message)
          })
      })
    )
    .unique('Duplicate Position exists', (a) => a.position)
    .required()
})

export const jobOrderSchema = Yup.object().shape({
  salesOrderNo: Yup.string().required(message),
  orderDetails: Yup.array().when(['tempStatus'], {
    is: (tempStatus) => tempStatus === 'Completed',
    then: (schema) =>
      schema
        .of(
          Yup.object().shape({
            reportQty: Yup.number().nullable().decimal().min(0).max(Yup.ref('balanceQty')).required(message),
            warehouse: Yup.string().required(message)
          })
        )
        .required()
  }),
  materials: Yup.array()
    .of(
      Yup.object().shape({
        materials: Yup.array().of(
          Yup.object().shape({
            materialCodeDesc: Yup.string().required(message),
            unit: Yup.string().required(message),
            quantity: Yup.number().nullable().decimal().required(message),
            warehouse: Yup.string().required(message)
          })
        )
      })
    )
    .required()
})

export const salesDeliverySchema = Yup.object().shape({
  client: Yup.string()
    .nullable()
    .when('direct', {
      is: (direct) => direct,
      then: (schema) => schema.nullable().required(message)
    }),
  orderDetails: Yup.array()
    .of(
      Yup.object().shape({
        materialCodeDesc: Yup.string().when('direct', {
          is: (direct) => direct,
          then: (schema) => schema.required(message)
        }),
        unit: Yup.string().when('direct', {
          is: (direct) => direct,
          then: (schema) => schema.required(message)
        }),
        warehouse: Yup.string().when(['stockable', 'pickOrder'], {
          is: (stockable, pickOrder) => stockable && pickOrder !== 'Yes',
          then: (schema) => schema.required(message)
        }),
        location: Yup.string().when(['stockable', 'warehouseLocations', 'pickOrder'], {
          is: (stockable, warehouseLocations, pickOrder) =>
            stockable && warehouseLocations === 'Yes' && pickOrder !== 'Yes',
          then: (schema) => schema.required(message)
        }),
        rack: Yup.string().when(['stockable', 'warehouseRacks', 'pickOrder'], {
          is: (stockable, warehouseRacks, pickOrder) =>
            stockable && warehouseRacks === 'Yes' && pickOrder !== 'Yes',
          then: (schema) => schema.required(message)
        }),
        deliveryQuantity: Yup.number()
          .nullable()
          .decimal()
          .when('disabled', {
            is: (disabled) => !disabled,
            then: (schema) =>
              schema.moreThan(0, 'Delivery qty must be greater than or equal to ${more}').required(message)
          })
          .when('direct', {
            is: (direct) => !direct,
            then: (schema) =>
              schema
                .max(
                  Yup.ref('salesDeliveryQuantity'),
                  'Delivery qty is greater than open order qty ${max}. Please check'
                )
                .required(message)
          }),
        price: Yup.number().when('direct', {
          is: (direct) => direct,
          then: (schema) => schema.required(message)
        }),
        requestedDate: Yup.date().when('direct', {
          is: (direct) => direct,
          then: (schema) => schema.required(message)
        }),
        supplier: Yup.string()
          .nullable()
          .when('orderType', {
            is: (orderType) => orderType === 'Dropship',
            then: (schema) => schema.nullable().required(message)
          }),
        batchSerials: Yup.array().when(['batch', 'serial', 'pickOrder'], {
          is: (batch, serial, pickOrder) => (batch || serial) && pickOrder !== 'Yes',
          then: (schema) =>
            schema
              .min(1)
              .required()
              .batchTotal('deliveryQuantity', 'Del. Qty and Total Batch / Serial Qty not equal')
        }),
        costCenter: Yup.string().when('costCenterFlag', {
          is: true,
          then: (schema) => schema.required()
        })
      })
    )
    .required()
})

export const pickRequestSchema = Yup.object().shape({
  orderDetails: Yup.array()
    .of(
      Yup.object().shape({
        warehouse: Yup.string().when('stockable', {
          is: (stockable) => stockable,
          then: (schema) => schema.required(message)
        }),
        location: Yup.string().when(['stockable', 'warehouseLocations'], {
          is: (stockable, warehouseLocations) => stockable && warehouseLocations === 'Yes',
          then: (schema) => schema.required(message)
        }),
        rack: Yup.string().when(['stockable', 'warehouseRacks'], {
          is: (stockable, warehouseRacks) => stockable && warehouseRacks === 'Yes',
          then: (schema) => schema.required(message)
        }),
        deliveryQuantity: Yup.number()
          .nullable()
          .decimal()
          .when('disabled', {
            is: (disabled) => !disabled,
            then: (schema) =>
              schema
                .moreThan(0, 'Delivery qty must be greater than or equal to ${more}')
                .max(
                  Yup.ref('salesDeliveryQuantity'),
                  'Delivery qty is greater than open order qty ${max}. Please check'
                )
                .required(message)
          }),
        batchSerials: Yup.array().when(['batch', 'serial'], {
          is: (batch, serial) => batch || serial,
          then: (schema) =>
            schema
              .min(1)
              .required()
              .batchTotal('deliveryQuantity', 'Del. Qty and Total Batch / Serial Qty not equal')
        })
      })
    )
    .required()
})

export const deliveryReturnSchema = Yup.object().shape({
  orderDetails: Yup.array()
    .of(
      Yup.object().shape({
        warehouse: Yup.string().when('stockable', {
          is: (stockable) => stockable,
          then: (schema) => schema.required(message)
        }),
        location: Yup.string().when(['stockable', 'warehouseLocations'], {
          is: (stockable, warehouseLocations) => stockable && warehouseLocations === 'Yes',
          then: (schema) => schema.required(message)
        }),
        rack: Yup.string().when(['stockable', 'warehouseRacks'], {
          is: (stockable, warehouseRacks) => stockable && warehouseRacks === 'Yes',
          then: (schema) => schema.required(message)
        }),
        returnQuantity: Yup.number()
          .nullable()
          .decimal()
          .when('disabled', {
            is: (disabled) => !disabled,
            then: (schema) =>
              schema
                .moreThan(0, 'Return qty must be greater than or equal to ${more}')
                .max(
                  Yup.ref('deliveryQuantity'),
                  'Return qty is greater than open order qty ${max}. Please check'
                )
                .required(message)
          }),
        batchSerials: Yup.array().when(['batch', 'serial'], {
          is: (batch, serial) => batch || serial,
          then: (schema) =>
            schema
              .min(1)
              .required()
              .batchTotal('returnQuantity', 'Return Qty and Total Batch / Serial Qty not equal')
        })
      })
    )
    .required()
})

export const goodsReturnSchema = Yup.object().shape({
  orderDetails: Yup.array()
    .of(
      Yup.object().shape({
        warehouse: Yup.string().when('stockable', {
          is: (stockable) => stockable,
          then: (schema) => schema.required(message)
        }),
        location: Yup.string().when(['stockable', 'warehouseLocations'], {
          is: (stockable, warehouseLocations) => stockable && warehouseLocations === 'Yes',
          then: (schema) => schema.required(message)
        }),
        rack: Yup.string().when(['stockable', 'warehouseRacks'], {
          is: (stockable, warehouseRacks) => stockable && warehouseRacks === 'Yes',
          then: (schema) => schema.required(message)
        }),
        returnQuantity: Yup.number()
          .nullable()
          .decimal()
          .when('disabled', {
            is: (disabled) => !disabled,
            then: (schema) =>
              schema
                .moreThan(0, 'Return qty must be greater than or equal to ${more}')
                .max(
                  Yup.ref('receiptQuantity'),
                  'Return qty is greater than open order qty ${max}. Please check'
                )
                .required(message)
          }),
        batchSerials: Yup.array().when(['batch', 'serial'], {
          is: (batch, serial) => batch || serial,
          then: (schema) =>
            schema
              .min(1)
              .required()
              .batchTotal('returnQuantity', 'Return Qty and Total Batch / Serial Qty not equal')
        })
      })
    )
    .required()
})

export const pickOrderSchema = Yup.object().shape({
  client: Yup.string()
    .nullable()
    .when('direct', {
      is: (direct) => direct,
      then: (schema) => schema.nullable().required(message)
    }),
  orderDetails: Yup.array()
    .of(
      Yup.object().shape({
        materialCodeDesc: Yup.string().when('direct', {
          is: (direct) => direct,
          then: (schema) => schema.required(message)
        }),
        unit: Yup.string().when('direct', {
          is: (direct) => direct,
          then: (schema) => schema.required(message)
        }),
        warehouse: Yup.string().when('stockable', {
          is: true,
          then: (schema) => schema.required(message)
        }),
        location: Yup.string().when(['stockable', 'warehouseLocations'], {
          is: (stockable, warehouseLocations) => stockable && warehouseLocations === 'Yes',
          then: (schema) => schema.required(message)
        }),
        rack: Yup.string().when(['stockable', 'warehouseRacks'], {
          is: (stockable, warehouseRacks) => stockable && warehouseRacks === 'Yes',
          then: (schema) => schema.required(message)
        }),
        deliveryQuantity: Yup.number()
          .nullable()
          .decimal()
          .when('disabled', {
            is: (disabled) => !disabled,
            then: (schema) =>
              schema.moreThan(0, 'Delivery qty must be greater than or equal to ${more}').required(message)
          })
          .when('direct', {
            is: (direct) => !direct,
            then: (schema) =>
              schema
                .max(
                  Yup.ref('salesDeliveryQuantity'),
                  'Delivery qty is greater than open order qty ${max}. Please check'
                )
                .required(message)
          }),
        price: Yup.number().when('direct', {
          is: (direct) => direct,
          then: (schema) => schema.required(message)
        }),
        requestedDate: Yup.date().when('direct', {
          is: (direct) => direct,
          then: (schema) => schema.required(message)
        }),
        supplier: Yup.string()
          .nullable()
          .when('orderType', {
            is: (orderType) => orderType === 'Dropship',
            then: (schema) => schema.nullable().required(message)
          }),
        batchSerials: Yup.array().when(['batch', 'serial'], {
          is: (batch, serial) => batch || serial,
          then: (schema) =>
            schema
              .min(1)
              .required()
              .batchTotal('deliveryQuantity', 'Del. Qty and Total Batch / Serial Qty not equal')
        })
      })
    )
    .required()
})

export const purchaseReceiptSchema = Yup.object().shape({
  orderDetails: Yup.array()
    .of(
      Yup.object().shape({
        warehouse: Yup.string().when('stockable', {
          is: true,
          then: (schema) => schema.required(message)
        }),
        location: Yup.string().when(['stockable', 'warehouseLocations'], {
          is: (stockable, warehouseLocations) => stockable && warehouseLocations === 'Yes',
          then: (schema) => schema.required(message)
        }),
        rack: Yup.string().when(['stockable', 'warehouseRacks'], {
          is: (stockable, warehouseRacks) => stockable && warehouseRacks === 'Yes',
          then: (schema) => schema.required(message)
        }),
        receiptQuantity: Yup.number()
          .nullable()
          .decimal()
          .when('disabled', {
            is: (disabled) => !disabled,
            then: (schema) =>
              schema
                .moreThan(0, 'Receipt qty must be greater than or equal to ${more}')
                .max(
                  Yup.ref('purchaseReceiptQuantity'),
                  'Receipt qty is greater than open order qty ${max}. Please check'
                )
                .required(message)
          }),
        usedFreeOfCost: Yup.number().when('disabled', {
          is: (disabled) => !disabled,
          then: (schema) =>
            schema
              .max(Yup.ref('freeOfCost'), 'It should be less than free of cost ${max}. Please check')
              .required(message)
        }),
        batchSerials: Yup.array().when(['batch', 'serial'], {
          is: (batch, serial) => batch || serial,
          then: (schema) =>
            schema
              .min(1)
              .required()
              .batchTotal('receiptQuantity', 'GR Qty and Total Batch / Serial Qty not equal')
        })
      })
    )
    .required()
})

export const journalVoucherSchema = Yup.object().shape({
  accountList: Yup.array().of(
    Yup.object().shape({
      code: Yup.string().required(message),
      type: Yup.string().required(message),
      amount: Yup.number().nullable().required(message),
      postingDate: Yup.date().required(message),
      currency: Yup.string().required(message),
      exchangeRate: Yup.number().exchangeRate().required(message)
    })
  )
})

export const orderFilterSchema = Yup.object().shape(
  {
    client: Yup.string().when('clientName', {
      is: (clientName) => !clientName,
      then: (schema) => schema.required(message)
    }),
    clientName: Yup.string().when('client', {
      is: (client) => !client,
      then: (schema) => schema.required(message)
    })
  },
  ['client', 'clientName']
)

export const invoiceEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .when('showEmail', {
      is: true,
      then: (schema) => schema.required(message)
    })
})

export const salesPersonSchema = Yup.object().shape({
  firstName: Yup.string().required(message),
  lastName: Yup.string().required(message),
  email: Yup.string().email().required(message),
  phone: Yup.string().required(message),
  commission: Yup.number(),
  status: Yup.string().required(message)
})

export const POLPODSchema = Yup.object().shape({
  code: Yup.string().required(message),
  description: Yup.string().required(message),
  status: Yup.string().required(message)
})

export const packagesTypeSchema = Yup.object().shape({
  type: Yup.string().required(message),
  description: Yup.string().required(message),
  unit: Yup.string().required(message),
  length: Yup.number().decimal().required(message),
  height: Yup.number().decimal().required(message),
  breadth: Yup.number().decimal().required(message),
  volume: Yup.number().decimal().required(message),
  volumeUnit: Yup.string().required(message),
  weight: Yup.number().decimal().required(message),
  weightUnit: Yup.string().required(message)
})

export const priceChargeSchema = Yup.object().shape({
  type: Yup.string().required(message),
  description: Yup.string().required(message),
  country: Yup.string().required(message),
  currency: Yup.string().required(message),
  price: Yup.number().decimal().required(message)
})

export const operationSchema = Yup.object().shape({
  type: Yup.string().required(message),
  value: Yup.string().required(message),
  description: Yup.string().required(message)
})

export const termsConditionSchema = Yup.object().shape({
  type: Yup.string().required(message),
  content: Yup.string().required(message),
  validFrom: Yup.date().required(message),
  validTo: Yup.date().required(message)
})

export const salesCallEntrySchema = addressFieldSchema.shape({
  clientName: Yup.string().required(message),
  contactPerson: Yup.string().required(message),
  phone: Yup.string().required(message),
  email: Yup.string().email().required(message),
  salesPerson: Yup.string().required(message)
})

export const offerSchema = addressFieldSchema.shape({
  quotationNo: Yup.string().required(message),
  clientName: Yup.string().required(message),
  contactPerson: Yup.string().required(message),
  phone: Yup.string().required(message),
  email: Yup.string().email().required(message),
  POLPOD: Yup.string().required(message),
  actualWeight: Yup.string().required(message),
  chargeableWeight: Yup.string().required(message),
  requestedDate: Yup.date().required(message),
  operations: Yup.string().required(message),
  packageList: Yup.array()
    .of(
      Yup.object().shape({
        packageType: Yup.string().required(message),
        length: Yup.number().decimal().required(message),
        breadth: Yup.number().decimal().required(message),
        height: Yup.number().decimal().required(message),
        unit: Yup.string().required(message),
        weight: Yup.number().decimal().required(message),
        weightUnit: Yup.string().required(message),
        volume: Yup.number().decimal().required(message),
        volumeUnit: Yup.string().required(message),
        items: Yup.array()
          .of(
            Yup.object().shape({
              description: Yup.string().required(message),
              quantity: Yup.number().nullable().decimal().required(message),
              unit: Yup.string().required(message),
              price: Yup.number().number().required(message),
              currency: Yup.string().required(message),
              charge: Yup.number().decimal(),
              taxType: Yup.string().required(message),
              tax: Yup.number()
                .decimal()
                .when('taxType', {
                  is: (taxType) => taxType === 'Normal VAT',
                  then: (schema) => schema.required(message)
                })
            })
          )
          .required(message)
      })
    )
    .required(message)
})

export const customsClearanceSchema = Yup.object().shape({
  clearanceDate: Yup.date().required(message),
  forwarder: Yup.object().shape({
    charges: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().when('serviceProvider', {
          is: (serviceProvider) => !!serviceProvider,
          then: (schema) => schema.required(message)
        }),
        chargeType: Yup.string().when('serviceProvider', {
          is: (serviceProvider) => !!serviceProvider,
          then: (schema) => schema.required(message)
        }),
        currency: Yup.string().when('serviceProvider', {
          is: (serviceProvider) => !!serviceProvider,
          then: (schema) => schema.required(message)
        }),
        amount: Yup.number().when('serviceProvider', {
          is: (serviceProvider) => !!serviceProvider,
          then: (schema) => schema.decimal().required(message)
        }),
        exchangeRate: Yup.number().when('serviceProvider', {
          is: (serviceProvider) => !!serviceProvider,
          then: (schema) => schema.decimal().required(message)
        }),
        account: Yup.string()
          .nullable()
          .when('serviceProvider', {
            is: (serviceProvider) => !!serviceProvider,
            then: (schema) => schema.required(message)
          })
      })
    )
  }),
  supplier: Yup.object().shape({
    name: Yup.string().when('serviceProvider', {
      is: (serviceProvider) => !!serviceProvider,
      then: (schema) => schema.required(message)
    }),
    charges: Yup.array().of(
      Yup.object().shape({
        chargeType: Yup.string().when('serviceProvider', {
          is: (serviceProvider) => !!serviceProvider,
          then: (schema) => schema.required(message)
        }),
        currency: Yup.string().when('serviceProvider', {
          is: (serviceProvider) => !!serviceProvider,
          then: (schema) => schema.required(message)
        }),
        amount: Yup.number().when('serviceProvider', {
          is: (serviceProvider) => !!serviceProvider,
          then: (schema) => schema.decimal().required(message)
        }),
        exchangeRate: Yup.number().when('serviceProvider', {
          is: (serviceProvider) => !!serviceProvider,
          then: (schema) => schema.decimal().required(message)
        }),
        account: Yup.string()
          .nullable()
          .when('serviceProvider', {
            is: (serviceProvider) => !!serviceProvider,
            then: (schema) => schema.required(message)
          })
      })
    )
  })
})

export const customClearanceFilterSchema = Yup.object().shape({
  currency: Yup.string().required(message),
  client: Yup.string().required(message)
})

export const jobCreationSchema = Yup.object().shape({
  forwarder: Yup.string().required(message),
  creationDate: Yup.date().required(message),
  departureDate: Yup.date().required(message),
  arrivalDate: Yup.date().required(message),

  tos: Yup.string().when('type', {
    is: (type) => type === 'Air',
    then: (schema) => schema.required(message)
  }),
  flightNo: Yup.string().when('type', {
    is: (type) => type === 'Air',
    then: (schema) => schema.required(message)
  }),
  MAWBNo: Yup.string().when('type', {
    is: (type) => type === 'Air',
    then: (schema) => schema.required(message)
  }),
  airline: Yup.string().when('type', {
    is: (type) => type === 'Air',
    then: (schema) => schema.required(message)
  }),
  shipper: Yup.string().when('type', {
    is: (type) => type === 'Air',
    then: (schema) => schema.required(message)
  }),
  consignee: Yup.string().when('type', {
    is: (type) => type === 'Air',
    then: (schema) => schema.required(message)
  }),
  commodity: Yup.string().when('type', {
    is: (type) => type === 'Air',
    then: (schema) => schema.required(message)
  }),
  idNo: Yup.string().when('type', {
    is: (type) => type === 'Air',
    then: (schema) => schema.required(message)
  }),
  issueDate: Yup.date().when('type', {
    is: (type) => type === 'Air',
    then: (schema) => schema.required(message)
  }),

  vessel: Yup.string().when('type', {
    is: (type) => type === 'Sea',
    then: (schema) => schema.required(message)
  }),
  vesselCode: Yup.string().when('type', {
    is: (type) => type === 'Sea',
    then: (schema) => schema.required(message)
  }),
  voyageNo: Yup.string().when('type', {
    is: (type) => type === 'Sea',
    then: (schema) => schema.required(message)
  })
})

export const jobCreationFilterSchema = Yup.object().shape({
  type: Yup.string().required(message)
})

export const salesQuotationSchema = Yup.object().shape({
  quotationDate: Yup.date().required(message),
  customer: Yup.string().required(message),
  currency: Yup.string().required(message),
  exchangeRate: Yup.number().exchangeRate().required(message),
  taxCategory: Yup.string().required(message),
  orderDetails: Yup.array()
    .of(
      Yup.object().shape({
        position: Yup.number().number().required(message),
        materialCodeDesc: Yup.string().required(message),
        unit: Yup.string().required(message),
        orderedQuantity: Yup.number().nullable().decimal().moreThan(0).required(message),
        requestedDate: Yup.date().required(message),
        price: Yup.number().decimal().moreThan(0).required(message),
        discount: Yup.number().decimal(),
        charge: Yup.number().decimal(),
        taxType: Yup.string().required(message),
        tax: Yup.number()
          .decimal()
          .when('taxType', {
            is: (taxType) => taxType === 'Normal VAT',
            then: (schema) => schema.required(message)
          }),
        supplier: Yup.string()
          .nullable()
          .when('orderType', {
            is: (orderType) => orderType === 'Dropship',
            then: (schema) => schema.nullable().required(message)
          })
      })
    )
    .unique('Duplicate Position exists', (a) => a.position)
    .required()
})

export const clientChargeSchema = Yup.object().shape({
  client: Yup.string().when('category', {
    is: (category) => category === 'Client',
    then: (schema) => schema.required(message)
  }),
  clientGroup: Yup.string().when('category', {
    is: (category) => category === 'Group',
    then: (schema) => schema.required(message)
  }),
  materials: Yup.array()
    .of(
      Yup.object().shape({
        materialCodeDesc: Yup.string().required(message),
        unit: Yup.string().required(message),
        minQuantity: Yup.number().nullable().decimal().min(1).max(Yup.ref('maxQuantity')).required(message),
        maxQuantity: Yup.number()
          .nullable()
          .decimal()
          .min(Yup.ref('minQuantity'))
          .max(999999)
          .required(message),
        currency: Yup.string().required(message),
        price: Yup.number().decimal().required(message)
      })
    )
    .required()
})

export const newAssetSchema = Yup.object().shape({
  salvageValue: Yup.number()
    .number()
    .min(0)
    .max(Yup.ref('originalCost', '${path} must be lesser than original cost'))
})

export const POSSchema = Yup.object().shape({
  options: Yup.array().of(
    Yup.object().shape({
      category: Yup.string()
        .nullable()
        .when('POSCategories', {
          is: (POSCategories) => POSCategories === 'Yes',
          then: (schema) => schema.required(message)
        }),
      subCategory: Yup.string()
        .nullable()
        .when(['POSCategories', 'POSSubCategories'], {
          is: (POSCategories, POSSubCategories) => POSCategories === 'Yes' && POSSubCategories === 'Yes',
          then: (schema) => schema.required(message)
        })
    })
  )
})

export const addBatchSerialSchema = Yup.object().shape({
  batchSerials: Yup.array()
    .of(
      Yup.object().shape({
        batchNo: Yup.string()
          .barcode()
          .when(['batch', 'serial'], {
            is: (batch, serial) => batch && !serial,
            then: (schema) => schema.required()
          }),
        serialNo: Yup.string()
          .barcode()
          .when('serial', {
            is: true,
            then: (schema) => schema.required()
          }),
        quantity: Yup.number().nullable().decimal().required(),
        manufacturingDate: Yup.date().required(),
        expiryDate: Yup.date().required()
      })
    )
    .when(['batch', 'serial'], {
      is: (batch, serial) => batch && !serial,
      then: (schema) => schema.unique('Duplicate Batch No exists', (a) => a.batchNo)
    })
    .when('serial', {
      is: true,
      then: (schema) => schema.unique('Duplicate Serial No exists', (a) => a.serialNo)
    })
    .min(1)
    .required()
})

export const selectBatchSerialSchema = Yup.object().shape({
  batchSerials: Yup.array()
    .of(
      Yup.object().shape({
        quantity: Yup.number()
          .nullable()
          .decimal()
          .max(Yup.ref('stockQuantity'))
          .when(['batchNo', 'serialNo'], {
            is: (batchNo, serialNo) => batchNo || serialNo,
            then: (schema) => schema.required()
          })
      })
    )
    .min(1)
    .required()
})

export const addProductOrderSchema = Yup.object().shape({
  orders: Yup.array().of(
    Yup.object().shape({
      materialCodeDesc: Yup.string().required(),
      quantity: Yup.number().nullable().decimal().required(),
      unit: Yup.string().required(),
      warehouse: Yup.string().required(),
      plannedStartDate: Yup.date().required()
    })
  )
})

export const editProductOrderSchema = Yup.object().shape({
  resources: Yup.array().of(
    Yup.object().shape({
      stageDescription: Yup.string().required(),
      position: Yup.number().required(),
      resourceCode: Yup.string().required(),
      costPerHour: Yup.number().required(),
      runTime: Yup.number().required(),
      plannedStartDate: Yup.date().required()
    })
  ),
  materials: Yup.array().of(
    Yup.object().shape({
      position: Yup.number().required(),
      materialCodeDesc: Yup.string().required(),
      quantity: Yup.number().nullable().decimal().required(),
      unit: Yup.string().required(),
      warehouse: Yup.string().required()
    })
  )
})

export const generateBatchSerialSchema = Yup.object().shape({
  count: Yup.number().required(),
  batchNo: Yup.string().barcode(),
  manufacturingDate: Yup.date().required(),
  expiryDate: Yup.date().required()
})

export const createPurchaseOrderSchema = Yup.object().shape({
  client: Yup.string().nullable().required(message)
})

export const paymentTypeSchema = Yup.object().shape({
  paymentTypes: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().nullable().required(message),
      account: Yup.number().required(message)
    })
  )
})

export const creditNoteSchema = Yup.object().shape({
  division: Yup.string()
    .nullable()
    .when('headerDivision', {
      is: true,
      then: (schema) => schema.required()
    }),
  returnInvoiceNo: Yup.string().required(),
  instructionNote: Yup.string().required(),
  client: Yup.string()
    .nullable()
    .when('kind', {
      is: (kind) => kind !== 'Simplified-Credit-Note',
      then: (schema) => schema.required()
    }),
  currency: Yup.string().required(),
  issueDate: Yup.date().required(),
  taxDate: Yup.date().required(),
  taxCategory: Yup.string().required(),
  returnAccount: Yup.number()
    .nullable()
    .number()
    .when('paidAmount', {
      is: (paidAmount) => paidAmount > 0,
      then: (schema) => schema.required()
    }),
  items: Yup.array()
    .of(
      Yup.object().shape({
        materialCodeDesc: Yup.string().required(),
        unit: Yup.string().required(),
        unitPrice: Yup.number().decimal().required(),
        taxType: Yup.string().required(),
        warehouse: Yup.string().when(['returnStock', 'stockable'], {
          is: (returnStock, stockable) => returnStock === 'Yes' && stockable,
          then: (schema) => schema.required()
        }),
        quantity: Yup.number()
          .nullable()
          .decimal()
          .when('disabled', {
            is: (disabled) => !disabled,
            then: (schema) =>
              schema.moreThan(0, 'Return qty must be greater than or equal to ${more}').required(message)
          })
          .when('kind', {
            is: (kind) => kind !== 'Direct-Credit-Note',
            then: (schema) =>
              schema.max(
                Yup.ref('toBeInvoicedQuantity'),
                'Return qty is greater than open invoice qty ${max}. Please check'
              )
          }),
        batchSerials: Yup.array().when(['batch', 'serial', 'returnStock'], {
          is: (batch, serial, returnStock) => returnStock === 'Yes' && (batch || serial),
          then: (schema) =>
            schema
              .min(1)
              .required()
              .batchTotal('quantity', 'Return Qty and Total Batch / Serial Qty not equal')
        })
      })
    )
    .required(),
  exchangeRate: Yup.number().required()
})

export const createInventoryCountPlanSchema = Yup.object().shape({
  noOfPlans: Yup.number().number().required(),
  countReference: Yup.string().required(),
  plans: Yup.array()
    .of(
      Yup.object().shape({
        users: Yup.array().of(Yup.string().required()).min(1)
      })
    )
    .min(1)
})

export const inventoryTrackerByMaterialSchema = Yup.object().shape({
  stocks: Yup.object().shape({
    customer: Yup.string().when('warehouse', {
      is: (warehouse) => warehouse === 'VENSTK',
      then: (schema) => schema.required()
    }),
    supplier: Yup.string().when('warehouse', {
      is: (warehouse) => warehouse === 'VENSTK',
      then: (schema) => schema.required()
    })
  })
})

export const completeCountingSchema = Yup.object().shape({
  actualQuantity: Yup.number().required()
})

export const stockRevaluationSchema = Yup.object().shape({
  stocks: Yup.array().of(
    Yup.object().shape({
      actualQuantity: Yup.number().required(),
      actualPrice: Yup.number().required(),
      actualValue: Yup.number().required(),
      account: Yup.number().required()
    })
  )
})

export const debitNoteSchema = Yup.object().shape({
  division: Yup.string()
    .nullable()
    .when('headerDivision', {
      is: true,
      then: (schema) => schema.required()
    }),
  returnInvoiceNo: Yup.string().required(),
  client: Yup.string().required(),
  currency: Yup.string().required(),
  issueDate: Yup.date().required(),
  taxDate: Yup.date().required(),
  taxCategory: Yup.string().required(),
  returnAccount: Yup.number()
    .nullable()
    .number()
    .when('paidAmount', {
      is: (paidAmount) => paidAmount > 0,
      then: (schema) => schema.required()
    }),
  items: Yup.array()
    .of(
      Yup.object().shape({
        materialCodeDesc: Yup.string().required(),
        unit: Yup.string().required(),
        unitPrice: Yup.number().decimal().required(),
        taxType: Yup.string().required(),
        warehouse: Yup.string().when(['returnStock', 'stockable'], {
          is: (returnStock, stockable) => returnStock === 'Yes' && stockable,
          then: (schema) => schema.required()
        }),
        quantity: Yup.number()
          .nullable()
          .decimal()
          .when('disabled', {
            is: (disabled) => !disabled,
            then: (schema) =>
              schema.moreThan(0, 'Return qty must be greater than or equal to ${more}').required()
          })
          .when('kind', {
            is: (kind) => kind !== 'Direct-Debit-Note',
            then: (schema) =>
              schema.max(
                Yup.ref('toBeInvoicedQuantity'),
                'Return qty is greater than open invoice qty ${max}. Please check'
              )
          }),
        batchSerials: Yup.array().when(['batch', 'serial', 'returnStock'], {
          is: (batch, serial, returnStock) => returnStock === 'Yes' && (batch || serial),
          then: (schema) =>
            schema
              .min(1)
              .required()
              .batchTotal('quantity', 'Return Qty and Total Batch / Serial Qty not equal')
        }),
        account: Yup.string()
          .when('extraFields', {
            is: (extraFields) => extraFields?.includes('account'),
            then: (schema) => schema.required()
          })
          .nullable(),
        costCenter: Yup.string().when('costCenterFlag', {
          is: true,
          then: (schema) => schema.required()
        })
      })
    )
    .required(),
  exchangeRate: Yup.number().required()
})
