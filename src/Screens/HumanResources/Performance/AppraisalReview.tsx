import { Icon } from '@iconify/react'
import { ButtonBase } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useNavigate  } from 'react-router-dom'
import RowOptions from '../../../Components/TableBoxGrid/RowOptions'
import TableBox from '../../../Components/TableBoxGrid/TableBox'
import { validateAccess } from '../../../Util/Util'

export default function GoalsAssignment() {
  const history = useNavigate()
  const { t } = useTranslation()
  function tableAction(param: any) {
    if (param.TYPE === 'EDIT') {
      history(`/app/esditddd-grade/${param.id}`)
    }
  }

  const AppraisalReviewjson = {
    title: 'APPRAISAL REVIEW',
    page: 'APPRAISAL_REVIEW',
    endpoint: '',
    setFilter: '',
    table: {
      header: [
        {
          flex: 0.25,
          minWidth: 180,
          field: 'goalName',
          headerClassName: 'super-app-theme--header pl-3',
          headerName: t('Goal Name'),
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { goalName, id } = row
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <ButtonBase
                    onClick={() => {
                      tableAction({
                        TYPE: 'EDIT',
                        id
                      })
                    }}>
                    <Typography
                      noWrap
                      sx={{
                        fontWeight: 500,
                        textDecoration: 'none',
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' }
                      }}>
                      {goalName}
                    </Typography>
                  </ButtonBase>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'startDate',
          headerName: t('Start Date'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { startDate } = row
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
                    {startDate}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'endDate',
          headerName: t('End Date'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { endDate } = row
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
                    {endDate}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'expectedOutcome',
          headerName: t('Expected Outcome'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { expectedOutcome } = row
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
                    {expectedOutcome}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'weightage',
          headerName: t('Weightage(%)'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { weightage } = row
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
                    {weightage}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'addedBy',
          headerName: t('Added By'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { addedBy } = row
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
                    {addedBy}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'employeeRating',
          headerName: t('Employee Rating'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { employeeRating } = row
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
                    {employeeRating}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'employeeComment',
          headerName: t('Employee Comment'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { employeeComment } = row
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
                    {employeeComment}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'managerRating',
          headerName: t('Manager Rating'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { managerRating } = row
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
                    {managerRating}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'managerComment',
          headerName: t('Manager Comment'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { managerComment } = row
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
                    {managerComment}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.25,
          minWidth: 180,
          field: 'document',
          headerName: t('Document'),
          headerClassName: 'super-app-theme--header pl-3',
          disableColumnMenu: true,
          renderCell: ({ row }: any) => {
            const { document } = row
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
                    {document}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        validateAccess('edit-job-sequence') && {
          flex: 0.1,
          minWidth: 100,
          sortable: false,
          headerClassName: 'super-app-theme--header',
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
          renderCell: ({ row }: any) => <RowOptions id={row.id} tableAction={(e) => tableAction(e)} />
        }
      ].filter(Boolean),
      dataSource: []
    },
    export: {
      header: [
        'Goal Name',
        'Start Date',
        'End Date',
        'Expected Outcome',
        'Weightage(%)',
        'Added By',
        'Employee Rating',
        'Employee Comment',
        'Manager Rating',
        'Manager Comment',
        'Document'
      ],
      data: [
        'goalName',
        'startDate',
        'endDate',
        'expectedOutcome',
        'weightage',
        'addedBy',
        'employeeRating',
        'employeeComment',
        'managerRating',
        'managerComment',
        'document'
      ]
      //   btnTitle: 'Add Sequence'
    },
    filters: null
  }

  const emitData = (param: any) => {
    switch (param.TYPE) {
      case 'NEW':
        return history('/app/assign-goal')
      default:
        console.log('test')
        break
    }
    console.log('param', param)
  }

  return (
    <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
      <Grid item xs={12} sx={{ pb: 5 }}>
        <TableBox tableConfig={AppraisalReviewjson} emitData={emitData} />
      </Grid>
    </Grid>
  )
}
