import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'
import { FormInputText } from '../../../Components/TableBoxGrid/form-component/FormInputText'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'
import apiClient from '../../../Util/apiClient'

interface filterFormValues {
  name: string
  code: string
}

const Filters = ({ filterData }: { filterData: (e: filterFormValues) => void }) => {
  const { handleSubmit, control, reset } = useForm<filterFormValues>({
    defaultValues: {
      name: '',
      code: ''
    }
  })

  function resetForm() {
    reset()
    filterData({
      name: '',
      code: ''
    })
  }

  function onSubmit(param: filterFormValues) {
    filterData(param)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={2} xs={12}>
          <FormInputText name="name" control={control} label="Search Name" />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ marginTop: 4 }}>
          <Button
            variant="outlined"
            type="button"
            onClick={() => resetForm()}
            color="secondary"
            sx={{
              borderColor: '#319cc4',
              color: '#319cc4',
              '&:hover': {
                borderColor: '#319cc4',
                color: '#319cc4'
              },
              textTransform: 'none'
            }}>
            Clear
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              ml: '20px',
              py: 2,
              bgcolor: '#319cc4',
              boxShadow: 1,
              '&:hover': {
                backgroundColor: '#319cc4'
              },
              textTransform: 'none'
            }}>
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

const Currencies = () => {
  const [originalCurrency, setOriginalCurrency] = useState([])
  const [currency, setCurrency] = useState([])
  const history = useHistory()
  const { t } = useTranslation()

  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history.push(`/app/edit-currency/${param.id}`)
    }
  }

  const onFilter = (obj = {}) => {
    apiClient.get('currencies/getAll', { params: obj }).then(({ data }) => {
      if (data && data.result) {
        SET_DATA('currencies.filterData', { ...obj, ...data.pageData })
        setCurrency(data.result)
        setOriginalCurrency(data.result)
      }
    })
  }

  function onFilterData(e: any) {
    const isEmpty = Object.values(e).every((x) => x === null || x === '')
    if (isEmpty) {
      setCurrency(originalCurrency)
      return
    }
    const final = originalCurrency.filter((value) =>
      Object.entries(value).some(
        ([key, value]) =>
          typeof value === 'string' && e[key] && value.toLowerCase().includes(e[key].toLowerCase())
      )
    )
    setCurrency(final)
  }

  const currencyJson = {
    title: 'Currencies You Will Be Transacting',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 280,
          field: 'name',
          headerName: t('Name'),
          headerClassName: 'super-app-theme--header',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { name, id } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <ButtonBase onClick={() => tableAction({ TYPE: 'EDIT', id })}>
                    <Typography
                      noWrap
                      sx={{
                        fontWeight: 500,
                        textDecoration: 'none',
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' }
                      }}>
                      {name}
                    </Typography>
                  </ButtonBase>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 280,
          field: 'code',
          headerName: t('Code'),
          disableColumnMenu: true,
          headerClassName: 'super-app-theme--header',
          renderCell: ({ row }: any) => {
            const { code } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' }
                    }}>
                    {code}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 280,
          field: 'symbol',
          headerName: t('Symbol'),
          disableColumnMenu: true,
          headerClassName: 'super-app-theme--header',
          renderCell: ({ row }: any) => {
            const { symbol } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' }
                    }}>
                    {symbol}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 280,
          field: 'unit',
          headerName: t('Unit'),
          disableColumnMenu: true,
          headerClassName: 'super-app-theme--header',
          renderCell: ({ row }: any) => {
            const { unit } = row

            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' }
                    }}>
                    {unit}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        validateAccess('edit-currency') && {
          flex: 0.1,
          minWidth: 100,
          sortable: false,
          disableColumnMenu: true,
          field: 'actions',
          headerName: '',
          renderHeader: () => (
            <Icon
              icon="lets-icons:setting-line-duotone-line"
              fontSize="1.5rem"
              className=""
              style={{ marginLeft: '3px' }}
            />
          ),
          headerClassName: 'super-app-theme--header',
          renderCell: ({ row }: any) => <RowOptions id={row.id} tableAction={(e: any) => tableAction(e)} />
        }
      ],
      dataSource: currency
    },
    export: {
      header: ['Name', 'Code', 'Symbol', 'Unit'],
      data: currency?.map((x: any) => ({
        name: x.name,
        code: x.code,
        symbol: x.symbol,
        unit: x.unit
      })),
      btnTitle: 'Define your Currency'
    },
    filters: <Filters filterData={(e: any) => onFilterData(e)} />
  }

  useEffect(() => {
    onFilter(GET_DATA('currencies.filterData'))
  }, [])

  const onChangePage = (pageData: any) => {
    const filterCache = GET_DATA('currencies.filterData')
    onFilter({ ...(filterCache || {}), ...pageData })
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history.push('/app/add-currency')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox
          tableConfig={currencyJson}
          pageData={GET_DATA('currencies.filterData')}
          onChangePage={onChangePage}
          emitData={emitData}
        />
      </Grid>
    </Grid>
  )
}

export default Currencies
