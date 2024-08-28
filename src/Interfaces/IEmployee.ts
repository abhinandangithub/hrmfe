export interface IEmployee {
  alternateEmail: string
  alternatePhone: string
  bloodGroup: string
  company: string
  costCenter: string
  createdAt: Date | null
  currentAddress: IAddress
  department: string
  designation: string
  division: string
  divisionData: IDivision
  dob: Date | null
  drivingLicenseNo: string
  email: string
  employeeCategory: string
  employeeNo: string
  firstName: string
  functionalArea: string
  gender: string
  id: string
  jobTitle: string
  joiningDate: Date | null
  lastName: string
  level: string
  location: string
  maritalStatus: string
  middleName: string
  name: string
  nameAsPassport: string
  nationality: string
  network: string
  panCardNo: string
  passportIssuedCountry: string
  passportNo: string
  passportValidFrom: Date | null
  passportValidTo: Date | null
  permanentAddress: IAddress
  pfNo: string
  phone: string
  profilePicPath: string
  reporter: string
  reporterData: IUser
  role: string
  roleAndResponsibility: string
  roleData: IRoleData
  status: TStatus
  timesheetViewAccess: string[]
  timesheetViewAccessData: IUser
  typeOfVisa: string
  typeOfVisaEntry: string
  updatedAt: Date | null
  user: string
  visa: 'Yes' | 'No'
  visaHeldForCountry: string
  visaValidFrom: Date | null
  visaValidTo: Date | null
  wageType: string
}

type TStatus = 'Active' | 'InActive'

interface IAddress {
  buildingNo: string
  city: string
  country: string
  postalCode: string
  state: string
  street: string
}

interface IRoleData {
  access: string[]
  company: string
  createdAt: Date | null
  id: string
  name: string
  network: string
  status: TStatus
  updatedAt: Date | null
}

interface IDivision extends IClientAddress {
  email: string
  name: string
  nameAlt: string
  phone: string
  status: TStatus
}

interface IClientAddress {
  additionalNo: string
  additionalNoAlt: string
  additionalStreet: string
  additionalStreetAlt: string
  buildingNo: string
  buildingNoAlt: string
  city: string
  cityAlt: string
  country: string
  countryAlt: string
  neighbourhood: string
  neighbourhoodAlt: string
  postalCode: string
  postalCodeAlt: string
  state: string
  stateAlt: string
  street: string
  streetAlt: string
}

interface IUser {
  company: string
  createdAt: Date | null
  email: string
  name: string
  network: string
  networkOwned: string[]
  password: string
  phone: string
  status: TStatus
  timeEntryId: string
  timeEntryStartsAt: Date | null
  updatedAt: Date | null
}
