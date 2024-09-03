/* eslint-disable react/button-has-type */
// ** MUI Imports
import { FilterOutlined } from '@ant-design/icons'
import { Divider } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
// ** Custom Component Import
// ** Icon Imports
import CardContent from '@mui/material/CardContent'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import React from 'react'
import { ExportAsExcel, ExportAsPdf } from 'react-export-table'
import { useTranslation } from 'react-i18next'
import Icon from './icon/index'
import TableFilter from './TableFilter'

interface TableHeaderProps {
  toggle: () => void
  dataSource: any[]
  header: string[]
  btnTitle: string
  title: string
  filters: any
  page: string
  exportKeys: any[]
  applyFilter: (e: any) => void
  config: any
  applyAdditionalBtn?: () => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const {
    toggle,
    dataSource,
    header,
    btnTitle,
    title,
    filters,
    page,
    exportKeys,
    applyFilter,
    config,
    applyAdditionalBtn
  } = props
  // const [applySearch, setApplyFilter] = useState(false)
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  const exportData: any[] = []

  for (const lineData of dataSource) {
    const tempObj: any = {}
    for (const column of exportKeys) {
      if (column) {
        if (typeof column === 'string') {
          tempObj[column] = lineData[column]
        }
        if (typeof column === 'object') {
          switch (column.type) {
            case 'ARRAY': {
              const fieldNm: any = column.field
              const arrayLi = lineData[fieldNm]
              if (arrayLi?.length) {
                const subfil = column.showField
                const temparr = arrayLi.map((x: any) => x[subfil])
                tempObj[fieldNm] = temparr.toString()
              }

              break
            }
            case 'ARRAY_INDEX': {
              const fieldNm: any = column.field
              const arrayLi = lineData[fieldNm]
              if (arrayLi?.length) {
                const subfil: any = column.showField
                const defaultVal: any = column.defaultValue
                const temparr = arrayLi[column.index] ? arrayLi[column.index][subfil] : defaultVal
                const nameForm = column.name
                tempObj[nameForm] = temparr || defaultVal
              }

              break
            }

            case 'DATE': {
              const fieldNm1: any = column.field

              tempObj[fieldNm1] = lineData[fieldNm1] ? moment(lineData[fieldNm1]).format('YYYY-MM-DD') : ''
              break
            }

            case 'DATE_SUB_NODE': {
              const fieldNm1: any = column.field
              const subnode: any = column.subField
              tempObj[fieldNm1] =
                lineData[fieldNm1] && lineData[fieldNm1][subnode]
                  ? moment(lineData[fieldNm1][subnode]).format('YYYY-MM-DD')
                  : ''
              break
            }

            case 'OBJECT': {
              const rand = Math.random().toString(3).slice(2)
              const fieldNm2: any = column.field
              const subfil1 = column.showField
              const tableHead = subfil1 + rand
              tempObj[tableHead] =
                lineData[fieldNm2] && lineData[fieldNm2][subfil1] ? lineData[fieldNm2][subfil1] : ''

              break
            }
            case 'TRANSLATOR': {
              const fieldNm1: any = column.field
              tempObj[fieldNm1] =
                lineData[fieldNm1] && lineData[fieldNm1][lang] ? lineData[fieldNm1][lang] : ''
              break
            }
            case 'ARRAY_FROM_TO': {
              const fieldNm: any = column.field
              const arrayLi = lineData[fieldNm]
              if (arrayLi?.length) {
                const temparr = arrayLi.map((x: any) => `${x.from} - ${x.to}`)
                tempObj[fieldNm] = temparr?.toString() || ''
              }

              break
            }
            default:
              break
          }
        }
      }
    }
    exportData.push(tempObj)
  }

  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }
  function onclose() {
    setOpen(false)
    console.log('test close')
  }
  const [expanded, setExpanded] = React.useState(false)

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded)
  }

  // function search() {
  //   setApplyFilter(!applySearch)
  // }

  return (
    <>
      <CardContent>
        <Box
          sx={{
            pt: 0,
            pr: 5,
            // marginTop: '10px',
            rowGap: 2,
            columnGap: 4,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'Museo Sans", sans-serif'
          }}>
          <Typography variant="h6">
            {t(title)}

            <Button
              color="info"
              variant="contained"
              onClick={handleExpansion}
              sx={{
                backgroundColor: '#808a90',
                ml: 3,
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#808a90',
                  color: '#fff'
                },
                textTransform: 'none',
                width: '120px'
              }}
              size="medium">
              <FilterOutlined style={{ paddingRight: 4 }} className="m-1" />
              {t('Filters')}
            </Button>

            {config.additionalBtn ? (
              <Button
                color="info"
                variant="contained"
                onClick={applyAdditionalBtn}
                sx={{
                  bgcolor: '#039BCD',
                  ml: 3,
                  boxShadow: 1,
                  '&:hover': {
                    backgroundColor: '#039BCD'
                  },
                  textTransform: 'none',
                  width: '120px'
                }}
                size="medium">
                {t(config.additionalBtn.btnTitle)}
              </Button>
            ) : null}

            {/* <button
              className="btn bg-white ml-3"
              onClick={() => search()}
              style={{ border: '1px solid #a1a19a ' }}>
              <Icon icon="material-symbols:search" className="text-dark " />
            </button> */}
          </Typography>

          <Box sx={{ rowGap: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            {btnTitle ? (
              <Button
                sx={{
                  bgcolor: '#039BCD',
                  mr: 2,
                  boxShadow: 1,
                  '&:hover': {
                    backgroundColor: '#039BCD'
                  },
                  textTransform: 'none'
                }}
                onClick={toggle}
                variant="contained"
                size="medium">
                <Icon fontSize="1.125rem" icon="tabler:plus" className="m-1" />
                {t(btnTitle)}
              </Button>
            ) : (
              ''
            )}

            <ButtonGroup
              color="secondary"
              variant="outlined"
              sx={{ mr: 2 }}
              ref={anchorRef}
              aria-label="Button group with a nested menu">
              <Button
                color="secondary"
                variant="outlined"
                sx={{
                  px: 4,
                  borderColor: '#319cc4',
                  textTransform: 'none',
                  color: '#319cc4',
                  '&:hover': {
                    borderColor: '#319cc4',
                    color: '#319cc4'
                  }
                }}
                size="medium"
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}>
                <Icon icon="tabler:upload" fontSize="1.125rem" className="m-1 " />
                {t('Export')}
              </Button>
            </ButtonGroup>
            <Popper
              sx={{
                zIndex: 1,
                inset: '10px auto auto 0px !important',
                maxWidth: '165px'
              }}
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                  }}>
                  <Paper>
                    <ClickAwayListener onClickAway={() => onclose()}>
                      <MenuList id="split-button-menu" autoFocusItem>
                        <MenuItem>
                          <ExportAsExcel data={exportData} headers={header} fileName="HR_Project_">
                            {(props: any) => (
                              <Typography
                                {...props}
                                noWrap
                                sx={{
                                  fontSize: '12px',
                                  color: '#808a90',
                                  display: 'flex',
                                  alignItems: 'center',
                                  flexWrap: 'wrap'
                                }}>
                                <Icon icon="mdi:microsoft-excel" fontSize="1rem" color="green" />
                                <span className=" pl-1">Export as Excel</span>
                              </Typography>
                            )}
                          </ExportAsExcel>
                        </MenuItem>
                        <MenuItem>
                          <ExportAsPdf
                            data={exportData}
                            headers={header}
                            headerStyles={{ fillColor: 'red' }}
                            title={title}
                            fileName="HR_Project_"
                            theme="striped">
                            {(props) => (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography
                                  {...props}
                                  noWrap
                                  sx={{
                                    fontSize: '12px',
                                    color: '#808a90',
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap'
                                  }}>
                                  <Icon icon="ant-design:file-pdf-outlined" fontSize="1rem" color="red" />
                                  <span className=" pl-1">Export as PDF</span>
                                </Typography>
                              </Box>

                              // <Button
                              //   {...props}
                              //   sx={{
                              //     textTransform: 'none', fontSize: '12px', padding: '5px 7px', color: '#808a90',

                              //   }}
                              //   color="secondary"

                              //   variant="outlined">
                              //   <Icon icon="ant-design:file-pdf-outlined" fontSize="1rem" color="red" className="m-1 " />
                              //   Export as PDF
                              // </Button>
                            )}
                          </ExportAsPdf>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>
        </Box>
      </CardContent>

      {expanded && <Divider />}

      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        sx={{
          pb: 0,
          mt: expanded ? '0px !important' : 'auto',

          '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
          '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
          boxShadow: 0
        }}>
        <AccordionDetails sx={{ pb: 0 }}>
          <div>
            {filters}
            <TableFilter page={page} applyFilter={(e) => applyFilter(e)} />
          </div>
        </AccordionDetails>
      </Accordion>
      <Divider />
    </>
  )
}

export default TableHeader
