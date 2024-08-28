import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MASTER_OPTION_TYPES, STATUS, SWISS_STATES, YES_NO_OPTIONS } from '../../Util/Options'
import { FormDateRangePicker } from './form-component/FormDateRangePicker'
import { FormInputDropdown } from './form-component/FormInputDropdown'
import { FormInputText } from './form-component/FormInputText'
import { FormMonthPicker } from './form-component/FormMonthPicker'
import Icon from './icon/index'

export const FilterButton = ({
  searchForm,
  resetForm
}: {
  searchForm: () => void
  resetForm: () => void
}) => {
  const { t } = useTranslation()
  return (
    <>
      <button
        type="button"
        className="btn bg-white ml-3"
        onClick={searchForm}
        style={{
          color: '#717171',
          border: '1px solid rgb(221, 221, 221)',
          textTransform: 'none',
          boxShadow: 'none', // Initial state without shadow
          transition: 'box-shadow 0.3s ease-in-out' // Smooth transition for the shadow
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none'
        }}>
        <Icon icon="material-symbols:search" className="text-dark " />
      </button>
      <Button
        type="button"
        onClick={resetForm}
        style={{
          border: 'none',
          color: '#319cc4',
          textTransform: 'none'
        }}>
        <Icon icon="mdi:clear-circle-outline" className="m-1" />
        {t('Clear Filter')}
      </Button>
    </>
  )
}

interface TableFilterProps {
  page: string
  applyFilter: (event: any) => void
  onSearch?: boolean
}
interface projectFilterForm {
  name: string
  clientName: string
  billable: string
}

const ProjectFilters = ({ filterData }: { filterData: (e: projectFilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<projectFilterForm>({
    defaultValues: {
      name: '',
      clientName: '',
      billable: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      name: '',
      clientName: '',
      billable: ''
    })
  }

  function onSubmit(param: projectFilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Search Name" placeholder="Search Employee" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="clientName" control={control} label="Search Client" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="billable"
            label="Select Billable"
            control={control}
            select={{
              type: 'LOCAL',
              options: [
                {
                  label: 'Yes',
                  value: 'Yes'
                },
                {
                  label: 'No',
                  value: 'No'
                }
              ]
            }}
          />
        </Grid>
        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface catgFilterForm {
  name: string
}

const CatgFilters = ({ filterData }: { filterData: (e: catgFilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<catgFilterForm>({
    defaultValues: {
      name: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      name: ''
    })
  }

  function onSubmit(param: catgFilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Search Name" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface DivFilterForm {
  name: string
  clientName: string
  billable: string
}

const DivFilters = ({ filterData }: { filterData: (e: DivFilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<DivFilterForm>({
    defaultValues: {
      name: '',
      clientName: '',
      billable: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      name: '',
      clientName: '',
      billable: ''
    })
  }

  function onSubmit(param: DivFilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Search Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="email" control={control} label="Email" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />

        </Grid>
      </Grid>
    </form>
  )
}

interface DepFilterForm {
  name: string
  email: string
}

const DepFilters = ({ filterData }: { filterData: (e: DepFilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<DepFilterForm>({
    defaultValues: {
      name: '',
      email: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      name: '',
      email: ''
    })
  }

  function onSubmit(param: DepFilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Search Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="email" control={control} label="Search Email" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface userFilterForm {
  name: string
  email: string
  reporterName: string
  roleName: string
  userType: string
  status: string
}

const UserFilters = ({ filterData }: { filterData: (e: userFilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<userFilterForm>({
    defaultValues: {
      name: '',
      email: '',
      reporterName: '',
      roleName: '',
      userType: '',
      status: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      name: '',
      email: '',
      reporterName: '',
      roleName: '',
      userType: '',
      status: ''
    })
  }

  function onSubmit(param: userFilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Search Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="email" control={control} label="Search Email" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="reporterName" control={control} label="Search Reporter" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="roleName" control={control} label="Search Role" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="userType" control={control} label="Search Type" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="status"
            label="Status"
            control={control}
            select={{ type: 'LOCAL', options: STATUS }}
          />
        </Grid>

        <Grid item sm={3} xs={12}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface customerFilterForm {
  clientNo: string
  name: string
  type: string
  currency: string
  group: string
  status: string
}

const CustFilters = ({ filterData }: { filterData: (e: customerFilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<customerFilterForm>({
    defaultValues: {
      clientNo: '',
      name: '',
      type: '',
      currency: '',
      group: '',
      status: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      clientNo: '',
      name: '',
      type: '',
      currency: '',
      group: '',
      status: ''
    })
  }

  function onSubmit(param: customerFilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="clientNo" control={control} label="Client Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Search Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="type" control={control} label="Search Type" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="currency" control={control} label="Search Currency" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="group" control={control} label="Search Group" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="status"
            label="Status"
            control={control}
            select={{ type: 'LOCAL', options: STATUS }}
          />
        </Grid>

        <Grid item sm={3} xs={12}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface OptionFilterForm {
  label: string
  value: string
  type: string
}

const OptFilters = ({ filterData }: { filterData: (e: OptionFilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<OptionFilterForm>({
    defaultValues: {
      label: '',
      value: '',
      type: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      label: '',
      value: '',
      type: ''
    })
  }

  function onSubmit(param: OptionFilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="label" control={control} label="Search Label" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="value" control={control} label="Search Value" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="type"
            label="Type"
            control={control}
            select={{ type: 'LOCAL', options: MASTER_OPTION_TYPES }}
          />
        </Grid>
        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface NumbFilterForm {
  module: string
  transaction: string
  prefix: string
  startNo: string
  suffix: string
  transactionNo: string
}

const NumbFilters = ({ filterData }: { filterData: (e: NumbFilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<NumbFilterForm>({
    defaultValues: {
      module: '',
      transaction: '',
      prefix: '',
      startNo: '',
      suffix: '',
      transactionNo: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      module: '',
      transaction: '',
      prefix: '',
      startNo: '',
      suffix: '',
      transactionNo: ''
    })
  }

  function onSubmit(param: NumbFilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="module" control={control} label="Module" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="transaction" control={control} label="Transaction" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="prefix" control={control} label="Prefix" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="startNo" control={control} label="Start No" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="suffix" control={control} label="Suffix" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="transactionNo" control={control} label="Transaction" />
        </Grid>

        <Grid item sm={3} xs={12}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface ProjectRateFilterForm {
  employeeName: string
  projectName: string
  clientName: string
}

const OverateFilters = ({ filterData }: { filterData: (e: ProjectRateFilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<ProjectRateFilterForm>({
    defaultValues: {
      employeeName: '',
      projectName: '',
      clientName: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      employeeName: '',
      projectName: '',
      clientName: ''
    })
  }

  function onSubmit(param: ProjectRateFilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="employeeName" control={control} label="Search EmployeeName" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="projectName" control={control} label="Search ProjectName" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="clientName" control={control} label="Search ClientName" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface EmployeeFilterForm {
  employeeNo: string
  name: string
  email: string
  phone: string
}

const EmpFilters = ({ filterData }: { filterData: (e: EmployeeFilterForm) => void }) => {
  const { t } = useTranslation()
  const { handleSubmit, control, reset } = useForm<EmployeeFilterForm>({
    defaultValues: {
      employeeNo: '',
      name: '',
      email: '',
      phone: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      employeeNo: '',
      name: '',
      email: '',
      phone: ''
    })
  }

  function onSubmit(param: EmployeeFilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="employeeNo" control={control} label={t('employeeLabelNumber')} />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label={t('employeeLabelName')} />
        </Grid>

        <Grid item sm={2} xs={12}>
          <FormInputText name="email" control={control} label={t('employeeLabelEmail')} />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="phone" control={control} label={t('employeeLabelPhone')} />
        </Grid>
        {/* <Grid item sm={4} xs={12}>
            <FormInputDropdown
              name="billable"
              control={control}
              label="Select Billable"
              options={[
                {
                  label: 'Select Billable ?',
                  value: ''
                },
                {
                  label: 'Yes',
                  value: 'Yes'
                },
                {
                  label: 'No',
                  value: 'No'
                }
              ]}
            />
          </Grid> */}

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface TransferfilterForm {
  transferType: string
  status: string
}

const TransFilters = ({ filterData }: { filterData: (e: TransferfilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<TransferfilterForm>({
    defaultValues: {
      transferType: '',
      status: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      transferType: '',
      status: ''
    })
  }

  function onSubmit(param: TransferfilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="transferType" control={control} label="Search TransferType" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="status" control={control} label="Search Status" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface DesgnationFilterForm {
  name: string
  description: string
  status: string
}

const DesignationFilters = ({ filterData }: { filterData: (e: DesgnationFilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<DesgnationFilterForm>({
    defaultValues: {
      name: '',
      description: '',
      status: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      name: '',
      description: '',
      status: ''
    })
  }
  function onSubmit(param: DesgnationFilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Search Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="description" control={control} label="Search Description" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="status" control={control} label="Search Status" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface PaymasterFilterForm {
  employeeNo: string
  name: string
  email: string
  validFrom: string
  validTo: string
}

const PayMasterFilters = ({ filterData }: { filterData: (e: PaymasterFilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<PaymasterFilterForm>({
    defaultValues: {
      employeeNo: '',
      name: '',
      email: '',
      validFrom: '',
      validTo: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      employeeNo: '',
      name: '',
      email: '',
      validFrom: '',
      validTo: ''
    })
  }

  function onSubmit(param: PaymasterFilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="employeeNo" control={control} label="Search EmployeeNo" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Search Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="email" control={control} label="Search Email" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="validFrom" control={control} label="Search ValidFrom" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="validTo" control={control} label="Search ValidTo" />
        </Grid>

        <Grid item sm={3} xs={12}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface LoanFilterForm {
  employeeNo: string
  name: string
  email: string
  reporter: string
}
const LoanFilters = ({ filterData }: { filterData: (e: LoanFilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<LoanFilterForm>({
    defaultValues: {
      employeeNo: '',
      name: '',
      email: '',
      reporter: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      employeeNo: '',
      name: '',
      email: '',
      reporter: ''
    })
  }

  function onSubmit(param: LoanFilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="employeeNo" control={control} label="Employee No" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="email" control={control} label="Email" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="reporter" control={control} label="Reporter" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface SeqFilterForm {
  name: string
  description: string
  status: string
}

const SeqFilters = ({ filterData }: { filterData: (e: SeqFilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<SeqFilterForm>({
    defaultValues: {
      name: '',
      description: '',
      status: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      name: '',
      description: '',
      status: ''
    })
  }

  function onSubmit(param: SeqFilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Search Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="description" control={control} label="Search Description" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="status"
            label="Status"
            control={control}
            select={{ type: 'LOCAL', options: MASTER_OPTION_TYPES }}
          />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface LeaveFilterForm {
  calenderName: string
  type: string
}

const LeaveFilters = ({ filterData }: { filterData: (e: LeaveFilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<LeaveFilterForm>({
    defaultValues: {
      calenderName: '',
      type: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      calenderName: '',
      type: ''
    })
  }

  function onSubmit(param: LeaveFilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="calenderName" control={control} label="Search CalenderName" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="type" control={control} label="Search Type" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}
interface TerminaitonfilterForm {
  name: string
  description: string
  status: string
}
const Terminaitonfilter = ({ filterData }: { filterData: (e: TerminaitonfilterForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<TerminaitonfilterForm>({
    defaultValues: {
      name: '',
      description: '',
      status: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      name: '',
      description: '',
      status: ''
    })
  }

  function onSubmit(param: TerminaitonfilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Search Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="description" control={control} label="Search Description" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="status" control={control} label="Search Status" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}
interface Gradeform {
  name: string
  description: string
  status: string
}
const Gradesfilter = ({ filterData }: { filterData: (e: Gradeform) => void }) => {
  const { handleSubmit, control, reset } = useForm<Gradeform>({
    defaultValues: {
      name: '',
      description: '',
      status: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      name: '',
      description: '',
      status: ''
    })
  }

  function onSubmit(param: Gradeform) {
    console.log('whta submit', param)
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Search Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="description" control={control} label="Search Description" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="status" control={control} label="Search Status" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}
interface Payrollfilterform {
  payrollId: string
  payrollName: string
  payrollDesc: string
  country: string
  status: string
  createdAt: string
  updatedAt: string
  customaction: string
}
const Payrollfilter = ({ filterData }: { filterData: (e: Payrollfilterform) => void }) => {
  const { handleSubmit, control, reset } = useForm<Payrollfilterform>({
    defaultValues: {
      payrollId: '',
      payrollName: '',
      payrollDesc: '',
      country: '',
      status: '',
      createdAt: '',
      updatedAt: '',
      customaction: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      payrollId: '',
      payrollName: '',
      payrollDesc: '',
      country: '',
      status: '',
      createdAt: '',
      updatedAt: '',
      customaction: ''
    })
  }

  function onSubmit(param: Payrollfilterform) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="payrollId" control={control} label="Search PayrollId" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="payrollName" control={control} label="Search PayrollName" />
        </Grid>

        <Grid item sm={2} xs={12}>
          <FormInputText name="payrollDesc" control={control} label="Search PayrollDescription" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="country" control={control} label="Search Country" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="status" control={control} label="Search Status" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="createdAt" control={control} label="Search Created On" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="updatedAt" control={control} label="Search Last Updated" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="custom_action" control={control} label="Search Action" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}
interface CompanyCalendarform {
  name: string
  startDate: string
  endDate: string
}
const CompanyCalendarfilter = ({ filterData }: { filterData: (e: CompanyCalendarform) => void }) => {
  const { handleSubmit, control, reset } = useForm<CompanyCalendarform>({
    defaultValues: {
      name: '',
      startDate: '',
      endDate: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      name: '',
      startDate: '',
      endDate: ''
    })
  }

  function onSubmit(param: CompanyCalendarform) {
    if (param.startDate) {
      param.startDate = moment(param.startDate).format('YYYY-MM-DD')
    }

    if (param.endDate) {
      param.endDate = moment(param.endDate).format('YYYY-MM-DD')
    }
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Calendar Year" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="startDate" control={control} type="date" label="From Month" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="endDate" control={control} type="date" label="To Month" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface ExchangeRateform {
  date: string
  toCurrency: string
  baseCurrency: string
  rate: string
  status: string
}
const ExchangeRatefilter = ({ filterData }: { filterData: (e: ExchangeRateform) => void }) => {
  const { handleSubmit, control, reset } = useForm<ExchangeRateform>({
    defaultValues: {
      date: '',
      toCurrency: '',
      baseCurrency: '',
      rate: '',
      status: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      date: '',
      toCurrency: '',
      baseCurrency: '',
      rate: '',
      status: ''
    })
  }

  function onSubmit(param: ExchangeRateform) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="date" control={control} label="Month" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="toCurrency" control={control} label="To Currency" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="baseCurrency" control={control} label="Base Currency" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="rate" control={control} label="Rate" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="status" control={control} label="Status" />
        </Grid>

        <Grid item sm={3} xs={12} container justifyContent="flex-start" alignItems="start">
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface TerminaitonEployeefilterForm {
  employee: string
  RefNo: string
  terminationDate: string
  lastWorkingDate: string
}
const TerminatitonEmployeefilter = ({
  filterData
}: {
  filterData: (e: TerminaitonEployeefilterForm) => void
}) => {
  const { handleSubmit, control, reset } = useForm<TerminaitonEployeefilterForm>({
    defaultValues: {
      employee: '',
      RefNo: '',
      terminationDate: '',
      lastWorkingDate: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      employee: '',
      RefNo: '',
      terminationDate: '',
      lastWorkingDate: ''
    })
  }

  function onSubmit(param: TerminaitonEployeefilterForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="employee"
            label="Employee"
            control={control}
            select={{
              type: 'API',
              multiple: true,
              endpoint: 'employees/get-active',
              keys: { key: 'id', value: 'name' }
            }}
          />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="RefNo" control={control} label="Search Reference" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="terminationDate" control={control} type="date" label="Termination Date" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="lastWorkingDate" control={control} type="date" label="Last Working Date" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}
interface Assetform {
  assetNo: string
  name: string
  category: string
  status: string
}

const Assetfilter = ({ filterData }: { filterData: (e: Assetform) => void }) => {
  const { handleSubmit, control, reset } = useForm<Assetform>({
    defaultValues: {
      assetNo: '',
      name: '',
      category: '',
      status: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      assetNo: '',
      name: '',
      category: '',
      status: ''
    })
  }

  function onSubmit(param: Assetform) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="assetNo" control={control} label="Search Asset No" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Search Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="category" control={control} label="Search Category" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="status" control={control} label="Search Status" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}
interface AssetTransferform {
  employeeName: string // Optional as per your requirement
  projectName: string
  status: string
}
const AssetTransferfilter = ({ filterData }: { filterData: (e: AssetTransferform) => void }) => {
  const { handleSubmit, control, reset } = useForm<AssetTransferform>({
    defaultValues: {
      employeeName: '',
      projectName: '',
      status: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      employeeName: '',
      projectName: '',
      status: ''
    })
  }
  function onSubmit(param: AssetTransferform) {
    filterData(param)
  }
  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="employeeName" control={control} label="Search Employee Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="projectName" control={control} label="Search Project Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="status"
            label="Select Status"
            control={control}
            select={{
              type: 'LOCAL',
              options: [
                { label: 'Assigned', value: 'Assigned' },
                { label: 'Returned', value: 'Returned' }
              ]
            }}
          />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface AppliedFrom {
  firstName: string // Optional as per your requirement
  lastName: string
  email: string
  name: string
  status: string
}
const Appliedfilter = ({ filterData }: { filterData: (e: AppliedFrom) => void }) => {
  const { handleSubmit, control, reset } = useForm<AppliedFrom>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      name: '',
      status: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      firstName: '',
      lastName: '',
      email: '',
      name: '',
      status: ''
    })
  }
  function onSubmit(param: AppliedFrom) {
    filterData(param)
  }
  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="firstName" control={control} label="Search First Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="lastName" control={control} label="Search Last Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="email" control={control} label=" Search Email" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label=" Search Job" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="status" control={control} label=" Search Status" />
        </Grid>

        <Grid item sm={3} xs={12}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}
interface TimeReportsForm {
  date?: string
  user: string
  clientIds: string
  projectIds: string
  month: string
  year: string
}

const TimeReportfilter = ({ filterData }: { filterData: (e: TimeReportsForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<TimeReportsForm>({
    defaultValues: {
      date: '',
      user: '',
      clientIds: '',
      projectIds: '',
      month: '',
      year: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      date: '',
      user: '',
      clientIds: '',
      projectIds: '',
      month: '',
      year: ''
    })
  }

  function onSubmit(param: TimeReportsForm) {
    if (param.date) {
      param.month = moment(param.date).format('M')
      param.year = moment(param.date).format('YYYY')
      delete param.date
    }

    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {/* <Grid item sm={2} xs={12}>
          <FormInputText name="date" control={control} type="month" label="Month" pattern="[0-9]{4}-[0-9]{2}" />
        </Grid> */}
        <Grid item sm={2} xs={12}>
          <FormMonthPicker
            name="date"
            control={control}
            type="month"
            label="Month"
            pattern="[0-9]{4}-[0-9]{2}"
          />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="user"
            label="Employees"
            control={control}
            select={{
              type: 'API',
              multiple: true,
              endpoint: 'employees/forTimeReport',
              keys: { key: 'user', value: 'name' }
            }}
          />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="clientIds"
            label="Client"
            control={control}
            select={{
              type: 'API',
              multiple: true,
              endpoint: 'projects/get-clients-by-user',
              keys: { key: 'id', value: 'name' }
            }}
          />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="projectIds"
            label="Project"
            control={control}
            select={{
              type: 'API',
              multiple: true,
              endpoint: 'projects/get-projects-by-user',
              keys: { key: 'id', value: 'name', object: 'projectData' }
            }}
          />
        </Grid>
        {/* <Grid item sm={2} xs={12} sx={{ marginTop: 2 }}>
          <FormInputDropdown
            name="type"
            label="Type"
            control={control}
            select={{ type: 'LOCAL', options: MASTER_OPTION_TYPES }}
          />
        </Grid> */}
        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}
interface Payrollrunform {
  date: string
  user: string
  clientIds: string
  projectIds: string
}

const Payrollrunfilter = ({ filterData }: { filterData: (e: Payrollrunform) => void }) => {
  const { handleSubmit, control, reset } = useForm<Payrollrunform>({
    defaultValues: {
      date: '',
      user: '',
      clientIds: '',
      projectIds: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      date: '',
      user: '',
      clientIds: '',
      projectIds: ''
    })
  }

  function onSubmit(param: Payrollrunform) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="month" control={control} type="date" label="Month" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="employeeNo" control={control} label="Employee No" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Employee Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="email" control={control} label="Email" />
        </Grid>
        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface GOALSFORM {
  appraisalName: string
  appraisalStartDate: string
  appraisalEndDate: string
  hrRatingStartDate: string
  hrRatingEndDate: string
}

const GOALSfilter = ({ filterData }: { filterData: (e: GOALSFORM) => void }) => {
  const { handleSubmit, control, reset } = useForm<GOALSFORM>({
    defaultValues: {
      appraisalName: '',
      appraisalStartDate: '',
      appraisalEndDate: '',
      hrRatingStartDate: '',
      hrRatingEndDate: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      appraisalName: '',
      appraisalStartDate: '',
      appraisalEndDate: '',
      hrRatingStartDate: '',
      hrRatingEndDate: ''
    })
  }

  function onSubmit(param: GOALSFORM) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="appraisalName" control={control} label="Goal Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormDateRangePicker
            name="goalStartAndEndDate"
            control={control}
            label="Goal Start & End Date"
            placeholder="Enter Date"
          />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormDateRangePicker
            name="hrRatingStartAndEndDate"
            control={control}
            label="HR Rating Start & End Date"
            placeholder="Enter Date"
          />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface GradesAssignmentForm {
  goalName: string
  employeeName: string
  overallStatus: string
  hrRating: string
  showYesNo: string
}

const GradesAssignmentFilter = ({ filterData }: { filterData: (e: GradesAssignmentForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<GradesAssignmentForm>({
    defaultValues: {
      goalName: '',
      employeeName: '',
      overallStatus: '',
      hrRating: '',
      showYesNo: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      goalName: '',
      employeeName: '',
      overallStatus: '',
      hrRating: '',
      showYesNo: ''
    })
  }

  function onSubmit(param: GradesAssignmentForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="goalName" control={control} label="Goal Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="employeeName"
            label="Employee Name"
            control={control}
            select={{
              type: 'API',
              multiple: true,
              endpoint: '',
              keys: { key: 'id', value: 'name' }
            }}
          />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="overallStatus"
            label="Overall Status"
            control={control}
            select={{
              type: 'API',
              multiple: true,
              endpoint: '',
              keys: { key: 'id', value: 'name' }
            }}
          />
        </Grid>

        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="showYesNo"
            label="Show(Yes/No)"
            control={control}
            select={{
              type: 'API',
              multiple: true,
              endpoint: '',
              keys: { key: 'id', value: 'name' }
            }}
          />
        </Grid>
        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface AppraisalReviewForm {
  goalName: string
  employeeName: string
  overallStatus: string
  hrRating: string
  showYesNo: string
}

const AppraisalReviewFilter = ({ filterData }: { filterData: (e: AppraisalReviewForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<AppraisalReviewForm>({
    defaultValues: {
      goalName: '',
      employeeName: '',
      overallStatus: '',
      hrRating: '',
      showYesNo: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      goalName: '',
      employeeName: '',
      overallStatus: '',
      hrRating: '',
      showYesNo: ''
    })
  }

  function onSubmit(param: GradesAssignmentForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="goalName" control={control} label="Goal Name" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormDateRangePicker
            name="startAndEndDate"
            control={control}
            label="Start & End Date"
            placeholder="Enter Date"
          />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="addedBy"
            label="Added By"
            control={control}
            select={{ type: 'LOCAL', options: MASTER_OPTION_TYPES }}
          />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface LeaveBalenceForm {
  calenderYear: string
  fromDate: string
  toDate: string
  employeeId: string
}

const LeaveBalenceFilter = ({ filterData }: { filterData: (e: LeaveBalenceForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<LeaveBalenceForm>({
    defaultValues: {
      calenderYear: '',
      fromDate: '',
      toDate: '',
      employeeId: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      calenderYear: '',
      fromDate: '',
      toDate: '',
      employeeId: ''
    })
  }

  function onSubmit(param: LeaveBalenceForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>


          <FormInputDropdown
            name="calenderYear"
            label="Calender Year"
            control={control}
            select={{
              type: 'API',
              multiple: false,
              endpoint: 'yearly-calender/get-year-ids',
              keys: { key: 'id', value: 'name' }
            }}
          />

        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText
            name="fromDate"
            control={control}
            label="From Date"
            type="date"
            placeholder="Enter Date"
          />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText
            name="toDate"
            control={control}
            label="To Date"
            type="date"
            placeholder="Enter Date"
          />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="employeeId"
            label="Added By"
            control={control}
            select={{
              type: 'API',
              multiple: true,
              endpoint: 'employees/get-active',
              keys: { key: 'id', value: 'name' }
            }}
          />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface TaxdataForm {
  taxCode: string
  year: string
  state: string
}

const TaxdataFilter = ({ filterData }: { filterData: (e: TaxdataForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<TaxdataForm>({
    defaultValues: {
      taxCode: '',
      year: '',
      state: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      taxCode: '',
      year: '',
      state: ''
    })
  }

  function onSubmit(param: TaxdataForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="taxCode" control={control} label="Tax Code" />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FormInputText name="year" control={control} label="Year" type="date" placeholder="" />
        </Grid>

        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="state"
            label="State"
            control={control}
            select={{ type: 'LOCAL', options: SWISS_STATES }}
          />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface RoleForm {
  name: string
}

const RoleFilter = ({ filterData }: { filterData: (e: RoleForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<RoleForm>({
    defaultValues: {
      name: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      name: ''
    })
  }

  function onSubmit(param: RoleForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Role Name" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface CustomTemplateForm {
  name: string
  description: string
  for: string
  default: string
}

const CustomTemplateFilter = ({ filterData }: { filterData: (e: CustomTemplateForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<CustomTemplateForm>({
    defaultValues: {
      name: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      name: '',
      description: '',
      for: '',
      default: ''
    })
  }

  function onSubmit(param: CustomTemplateForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Name" />
        </Grid>

        <Grid item sm={2} xs={12}>
          <FormInputText name="description" control={control} label="Description" />
        </Grid>

        <Grid item sm={2} xs={12}>
          <FormInputText name="for" control={control} label="For" />
        </Grid>

        <Grid item sm={2} xs={12}>
          <FormInputDropdown
            name="default"
            label="Default"
            control={control}
            select={{ type: 'LOCAL', options: YES_NO_OPTIONS }}
          />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

interface TranslatorForm {
  defaultValue: string
}

const TranslatorFilter = ({ filterData }: { filterData: (e: TranslatorForm) => void }) => {
  const { handleSubmit, control, reset } = useForm<TranslatorForm>({
    defaultValues: {
      defaultValue: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      defaultValue: ''
    })
  }

  function onSubmit(param: TranslatorForm) {
    filterData(param)
  }

  function search() {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="defaultValue" control={control} label="Label Name" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 3 }}>
          <FilterButton resetForm={() => resetForm()} searchForm={() => search()} />
        </Grid>
      </Grid>
    </form>
  )
}

const TableFilter = (props: TableFilterProps) => {
  const project = () => {
    switch (props.page) {
      case 'PROJECT':
        return <ProjectFilters filterData={(e: projectFilterForm) => props.applyFilter(e)} />
      case 'CATEGORY':
        return <CatgFilters filterData={(e: catgFilterForm) => props.applyFilter(e)} />
      case 'DIVISION':
        return <DivFilters filterData={(e: DivFilterForm) => props.applyFilter(e)} />
      case 'DEPARTMENTS':
        return <DepFilters filterData={(e: DepFilterForm) => props.applyFilter(e)} />
      case 'USER':
        return <UserFilters filterData={(e: userFilterForm) => props.applyFilter(e)} />
      case 'CUSTOMER':
        return <CustFilters filterData={(e: customerFilterForm) => props.applyFilter(e)} />
      case 'OPTION':
        return <OptFilters filterData={(e: OptionFilterForm) => props.applyFilter(e)} />
      case 'NUMBER':
        return <NumbFilters filterData={(e: NumbFilterForm) => props.applyFilter(e)} />
      case 'OVERRATE':
        return <OverateFilters filterData={(e: ProjectRateFilterForm) => props.applyFilter(e)} />
      case 'EMPLOYEE':
        return <EmpFilters filterData={(e: EmployeeFilterForm) => props.applyFilter(e)} />
      case 'EMPLOYEE_TRANSFER':
        return <TransFilters filterData={(e: TransferfilterForm) => props.applyFilter(e)} />
      case 'DESIGNATION':
        return <DesignationFilters filterData={(e: DesgnationFilterForm) => props.applyFilter(e)} />
      case 'PAY_MASTER':
        return <PayMasterFilters filterData={(e: PaymasterFilterForm) => props.applyFilter(e)} />
      case 'LOAN':
        return <LoanFilters filterData={(e: LoanFilterForm) => props.applyFilter(e)} />
      case 'JOB_INTERVIEW':
        return <SeqFilters filterData={(e: SeqFilterForm) => props.applyFilter(e)} />
      case 'LEAVE':
        return <LeaveFilters filterData={(e: LeaveFilterForm) => props.applyFilter(e)} />
      case 'TERMINATION':
        return <Terminaitonfilter filterData={(e: TerminaitonfilterForm) => props.applyFilter(e)} />
      case 'Grades':
        return <Gradesfilter filterData={(e: Gradeform) => props.applyFilter(e)} />
      case 'PAYROLL':
        return <Payrollfilter filterData={(e: Payrollfilterform) => props.applyFilter(e)} />
      case 'Calendar':
        return <CompanyCalendarfilter filterData={(e: CompanyCalendarform) => props.applyFilter(e)} />
      case 'EXCHANGETRATE':
        return <ExchangeRatefilter filterData={(e: ExchangeRateform) => props.applyFilter(e)} />
      case 'TERMINATION_EMPLOYEE':
        return (
          <TerminatitonEmployeefilter
            filterData={(e: TerminaitonEployeefilterForm) => props.applyFilter(e)}
          />
        )
      case 'ASSET':
        return <Assetfilter filterData={(e: Assetform) => props.applyFilter(e)} />
      case 'ASSET_TRANSFER':
        return <AssetTransferfilter filterData={(e: AssetTransferform) => props.applyFilter(e)} />
      case 'APPLIEDJOB':
        return <Appliedfilter filterData={(e: AppliedFrom) => props.applyFilter(e)} />
      case 'TIME_REPORT':
        return <TimeReportfilter filterData={(e: TimeReportsForm) => props.applyFilter(e)} />
      case 'PAYROLLRUN':
        return <Payrollrunfilter filterData={(e: Payrollrunform) => props.applyFilter(e)} />
      case 'GOALS':
        return <GOALSfilter filterData={(e: GOALSFORM) => props.applyFilter(e)} />
      case 'GradesAssignmen':
        return <GradesAssignmentFilter filterData={(e: GradesAssignmentForm) => props.applyFilter(e)} />
      case 'APPRAISAL_REVIEW':
        return <AppraisalReviewFilter filterData={(e: AppraisalReviewForm) => props.applyFilter(e)} />
      case 'LEAVEBALENCE':
        return <LeaveBalenceFilter filterData={(e: LeaveBalenceForm) => props.applyFilter(e)} />
      case 'TAX_DATA':
        return <TaxdataFilter filterData={(e: TaxdataForm) => props.applyFilter(e)} />
      case 'ROLES':
        return <RoleFilter filterData={(e: RoleForm) => props.applyFilter(e)} />
      case 'CUSTOM_TEMPLATE':
        return <CustomTemplateFilter filterData={(e: CustomTemplateForm) => props.applyFilter(e)} />
      case 'TRANSLATOR':
        return <TranslatorFilter filterData={(e: TranslatorForm) => props.applyFilter(e)} />
      default:
        return <h1>No project match</h1>
    }
  }

  return <div style={{ paddingLeft: 1 }}>{project()}</div>
}

export default TableFilter
