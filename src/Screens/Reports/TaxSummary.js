import { Col, message, Row } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FooterActions from '../../Components/FooterActions'
import { DateRangePicker } from '../../Components/Formik'
import Panel from '../../Layout/Panel'
import PanelLayout from '../../Layout/PanelLayout'
import apiClient from '../../Util/apiClient'
import { formatDate } from '../../Util/Util'
import TaxPreviewTable, { RenderFooterCalculation } from '../FinanceManagement/TaxDeclaration/TaxPreviewTable'

const { t } = useTranslation()

export default function TaxSummary({ userInfo, ...props }) {
  const [dateRange, setDateRange] = useState([
    moment().startOf('year').format('YYYY-MM-DD'),
    moment().endOf('year').format('YYYY-MM-DD')
  ])

  const [reportData, setReportData] = useState(false)

  const convertData = (type, data) => {
    const declarations = {
      Sales: [
        { type: 'StandardSales', name: 'Standard Sales' },
        { type: 'ExemptSales', name: 'Exempt Sales' },
        { type: 'ForeignSaleswithVAT', name: 'Foreign Sales with VAT' },
        { type: 'ExportSales', name: 'Export Sales' }
      ],
      Purchase: [
        { type: 'StandardPurchase', name: 'Standard Purchase' },
        { type: 'ExemptPurchase', name: 'Exempt Purchase' },
        { type: 'ForeignPurchasewithVAT', name: 'Foreign Purchase with VAT' },
        { type: 'ExportPurchase', name: 'Export Purchase' }
      ]
    }

    return declarations[type].map((v) => {
      const findData = data.find((d) => d.type === v.type)

      return findData ? { ...v, ...findData } : v
    })
  }

  const onGenerateReport = () => {
    if (dateRange && dateRange.length > 0) {
      const fromDate = formatDate(dateRange[0])
      const toDate = formatDate(dateRange[1])
      const taxData = { startDate: fromDate, endDate: toDate }
      apiClient.post('tax-declaration/generate', taxData).then(({ data }) => {
        if (data?.result) {
          const previewData = {
            salesData: convertData('Sales', data.result.salesData),
            purchaseData: convertData('Purchase', data.result.purchaseData)
          }
          setReportData(previewData)
        }
      })
    } else {
      message.error('Please select period')
    }
  }

  // const onDownloadReport = (isPrint) => {
  //   const pdf = true

  //   if (dateRange && dateRange.length > 0) {
  //     const fromDate = moment(dateRange[0]).format('YYYY-MM-DD')
  //     const toDate = moment(dateRange[1]).format('YYYY-MM-DD')
  //     const params = removeEmptyKeys({ fromDate, toDate })
  //     downloadPrintPDF('reports/tax-summary', { printType: 'Single', pdf, ...params }, isPrint)
  //   } else {
  //     message.error('Please select period')
  //   }
  // }

  const onCancel = () => {
    setReportData(false)
  }

  return (
    <Row justify="center" className="inner-contents">
      <Col xs={22}>
        <PanelLayout title={t('Tax Summary')}>
          {reportData ? (
            <Row justify="center" gutter={[20, 10]}>
              <>
                <Col xs={24} sm={24} md={24} lg={12}>
                  <TaxPreviewTable
                    values={reportData.salesData}
                    period={dateRange}
                    type="Sales"
                    currency={userInfo?.companyData?.currency}
                  />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                  <TaxPreviewTable
                    values={reportData.purchaseData}
                    period={dateRange}
                    type="Purchase"
                    currency={userInfo?.companyData?.currency}
                  />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <RenderFooterCalculation data={reportData} />
                </Col>
              </>
            </Row>
          ) : (
            <Row justify="center">
              <Col lg={12}>
                <Panel title={t('Filters')}>
                  <Row gutter={[10, 10]}>
                    <Col lg={24}>
                      <DateRangePicker
                        label="Period"
                        value={dateRange}
                        onChange={(n, val) => setDateRange(val)}
                      />
                    </Col>
                  </Row>
                </Panel>
              </Col>
            </Row>
          )}
          {!props.noEdit && (
            <FooterActions
              leftActions={[
                {
                  prefix: 'flaticon-delete',
                  label: 'Cancel',
                  onClick: () => onCancel(),
                  dontShow: !reportData
                }
              ]}
              centerActions={[
                {
                  prefix: 'flaticon-invoice-3',
                  label: 'Generate & Show',
                  onClick: () => onGenerateReport(),
                  dontShow: !!reportData
                }
              ]}
              // rightActions={[
              //   {
              //     prefix: 'flaticon-printer-1',
              //     label: 'Print',
              //     onClick: () => onDownloadReport(true)
              //   },
              //   {
              //     prefix: 'flaticon-download',
              //     label: 'Download',
              //     onClick: () => onDownloadReport()
              //   }
              // ]}
            />
          )}
        </PanelLayout>
      </Col>
    </Row>
  )
}
