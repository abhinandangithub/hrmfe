type Optional<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>

type DocumentCharges = {
  type: string
  category: string
  amount: TNumber
  amountFormat?: string
  documentAmount: TNumber
}

type TNumber = number | ''

type PercentageFormat = '%' | ''

type PaymentSchedule = {
  amount: TNumber
  amountFormat?: string
  milestone: string
  totalAmount: TNumber
}
