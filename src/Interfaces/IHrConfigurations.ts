export interface IHrConfigurations {
  standardRates: IStandardRates
  alerts: IAlerts
}

export interface IStandardRates {
  passport: number | undefined
  visa: number | undefined
  cpr: number | undefined
  drivingLicense: number | undefined
  carPassing: number | undefined
  crRenewal: number | undefined
  carInsurance: number | undefined
  gosi: number | undefined
  lmra: number | undefined
  indemnityUptoThreeYears: number | undefined
  indemnityAboveThreeYears: number | undefined
  normalOT: number | undefined
  nationalHolidayOT: number | undefined
  holidayOT: number | undefined
  airTicket1Way: number | undefined
  airTicket2Way: number | undefined
  schoolFee: number | undefined
}

export interface IAlerts {
  passport: number
  visa: number
  cpr: number
  drivingLicense: number
  carPassing: number
  crRenewal: number
  carInsurance: number
}
