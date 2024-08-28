export interface IDependent {
  attachments: IAttachment[]
  comment: string
  createdAt: Date | null
  createdBy: string
  dateOfBirth: Date | null
  employee: string
  id: string
  name: string
  otherSupportingDocs?: IDependentSupportingDoc[]
  relationship: string
  status: 'Active' | 'InActive'
  updatedAt: Date | null
  updatedBy: string
  user: string
  // dependent expenses
  airTicket1Way: number | undefined
  airTicket2Way: number | undefined
  carInsurance: number | undefined
  cpr: number | undefined
  drivingLicense: number | undefined
  gosi: number | undefined
  insurance: number | undefined
  lmra: number | undefined
  passport: number | undefined
  schoolFee: number | undefined
  visa: number | undefined
}

export interface IAttachment {
  name: string
  path: string
  size: number
  type: string
}

export interface IDependentSupportingDoc {
  attachments: []
  company: string
  createdAt: Date
  createdBy: string
  currentAddress: string
  dependentId: string
  dependentInfo?: IDependent
  docNumber: string
  docType: string
  employeeId: string
  id: string
  network: string
  updatedAt: Date
  updatedBy: string
  validFrom: Date
  validTo: Date
}
