/* eslint-disable */
import { Col, message, Row } from 'antd'
import _escapeRegExp from 'lodash/escapeRegExp'
import React from 'react'
import apiClient from '../../Util/apiClient'
import Container from './Designer/Container'
import Properties from './Designer/Properties'
import { Boxes } from './Designer/RenderBoxes'
import {
  bookingPage,
  deliveryReturnPage,
  directExpensePage,
  directReceiptPage,
  expensePaymentPage,
  goodsReceiptPage,
  goodsReturnPage,
  invoicePage,
  invoiceReceiptPage,
  jobCreationPage,
  jobOrderPage,
  leadProposalPage,
  offerPage,
  orderDeliveryPage,
  orderPage,
  payrollPage,
  purchaseRequestPage,
  purchaseReturnPage,
  salesReturnPage,
  timesheetPage
} from './PageRenderDescision'

let pageData = {
  id: 'Page1',
  type: 'Page',
  style: {
    height: 500,
    width: 500,
    backgroundColor: '#fff'
  },
  noDrag: true
}

const defualtStyles = `.container-row {
  display: flex;
  width: fit-content;
}
.drag-container {
  align-items: stretch;
  border: none;
  vertical-align: top;
  width: fit-content;
  display: flex;
}
.react-resizable {
  border: none;
  display: flex;
  overflow: hidden;
  padding: 0;
  word-break: break-word;
}
.dashed-border {
  flex-wrap: wrap;
  width: 100%;
}
.dashed-border p{
  margin: 0px !important;
  width: 100%;
}`

class Templates extends React.Component {
  constructor() {
    super()
    this.state = {
      show: true,
      dragItemGroup: [],
      dragabbleItems: [],
      paymasterInfoBoxes: [],
      loader: true,
      templateName: ''
    }
  }

  componentDidMount() {
    const params = this.props.match.params

    if (params && params.id) {
      apiClient.get(`customTemplates/getById/${params.id}`).then(({ data }) => {
        if (data?.result) {
          if (data.result.content) {
            pageData = data.result.content
          }
          const { type, name } = data.result
          let dragItemGroup = []
          let dragabbleItems = []
          if (type === 'Payroll') {
            dragItemGroup = payrollPage.group
            dragabbleItems = payrollPage.items
            this.getPaymasterColumns()
          } else if (
            type === 'Finance' &&
            [
              'Invoice',
              'Debit-Note',
              'Expense',
              'Credit-Note',
              'POSInvoice',
              'Simplified-Invoice',
              'Simplified-Credit-Note',
              'Proforma-Invoice'
            ].includes(data.result.for)
          ) {
            dragItemGroup = invoicePage.group
            dragabbleItems = invoicePage.items
          } else if (type === 'Logistic' && ['Purchase Request'].includes(data.result.for)) {
            dragItemGroup = purchaseRequestPage.group
            dragabbleItems = purchaseRequestPage.items
          } else if (
            type === 'Logistic' &&
            [
              'Sales Order',
              'Sales Quotation',
              'Open Sales Order',
              'Purchase Order',
              'Open Purchase Order',
              'Custom Clearance'
            ].includes(data.result.for)
          ) {
            dragItemGroup = orderPage.group
            dragabbleItems = orderPage.items
          } else if (type === 'Logistic' && data.result.for === 'Sales Delivery') {
            dragItemGroup = orderDeliveryPage.group
            dragabbleItems = orderDeliveryPage.items
          } else if (type === 'Logistic' && data.result.for === 'Delivery Return') {
            dragItemGroup = deliveryReturnPage.group
            dragabbleItems = deliveryReturnPage.items
          } else if (type === 'Logistic' && data.result.for === 'Pick Order') {
            dragItemGroup = orderDeliveryPage.group
            dragabbleItems = orderDeliveryPage.items
          } else if (type === 'Logistic' && data.result.for === 'Goods Receipt') {
            dragItemGroup = goodsReceiptPage.group
            dragabbleItems = goodsReceiptPage.items
          } else if (type === 'Logistic' && data.result.for === 'Goods Return') {
            dragItemGroup = goodsReturnPage.group
            dragabbleItems = goodsReturnPage.items
          } else if (type === 'Logistic' && data.result.for === 'Sales Return') {
            dragItemGroup = salesReturnPage.group
            dragabbleItems = salesReturnPage.items
          } else if (type === 'Logistic' && data.result.for === 'Purchase Return') {
            dragItemGroup = purchaseReturnPage.group
            dragabbleItems = purchaseReturnPage.items
          } else if (type === 'Logistic' && data.result.for === 'Job Order') {
            dragItemGroup = jobOrderPage.group
            dragabbleItems = jobOrderPage.items
          } else if (type === 'Logistic' && data.result.for === 'Lead Proposal') {
            dragItemGroup = leadProposalPage.group
            dragabbleItems = leadProposalPage.items
          } else if (type === 'Service' && data.result.for === 'Timesheet') {
            dragItemGroup = timesheetPage.group
            dragabbleItems = timesheetPage.items
          } else if (type === 'Freight' && data.result.for === 'Offer') {
            dragItemGroup = offerPage.group
            dragabbleItems = offerPage.items
          } else if (type === 'Freight' && data.result.for === 'Booking') {
            dragItemGroup = bookingPage.group
            dragabbleItems = bookingPage.items
          } else if (type === 'Freight' && data.result.for === 'Job Creation') {
            dragItemGroup = jobCreationPage.group
            dragabbleItems = jobCreationPage.items
          } else if (type === 'Finance' && data.result.for === 'Direct-Receipt') {
            dragItemGroup = directReceiptPage.group
            dragabbleItems = directReceiptPage.items
          } else if (type === 'Finance' && data.result.for === 'Direct-Expense') {
            dragItemGroup = directExpensePage.group
            dragabbleItems = directExpensePage.items
          } else if (type === 'Finance' && data.result.for === 'Invoice-Receipt') {
            dragItemGroup = invoiceReceiptPage.group
            dragabbleItems = invoiceReceiptPage.items
          } else if (type === 'Finance' && data.result.for === 'Expense-Payment') {
            dragItemGroup = expensePaymentPage.group
            dragabbleItems = expensePaymentPage.items
          }
          this.setState({ dragItemGroup, dragabbleItems, loader: false, templateName: name })
        }
      })
    }
  }

  getPaymasterColumns = () => {
    apiClient.get('payroll-definitions/getActive').then(({ data }) => {
      if (data && data.result && data.result.length > 0) {
        const paymasterColums =
          data.result.map((val) => ({
            name: val.label,
            type: 'TextBox',
            value: '${paymasterData.' + val.key + '}',
            notEditable: true,
            itemFor: 'Employee',
            group: 'Paymaster Properties'
          })) || []
        const taxCode = {
          name: 'Tax Code',
          type: 'TextBox',
          value: '${paymasterData.taxCode}',
          notEditable: true,
          itemFor: 'Employee',
          group: 'Paymaster Properties'
        }
        this.setState({ dragabbleItems: [...this.state.dragabbleItems, taxCode, ...paymasterColums] })
      }
    })
  }

  componentWillUnmount() {
    pageData = {
      id: 'Page1',
      type: 'Page',
      style: {
        height: 500,
        width: 500
      },
      noDrag: true
    }
  }

  onUpdateItem = (data) => {
    if (data && data.items && data.items[0]) {
      pageData = data.items[0]
    }
  }

  removeUnwanted = (obj) => {
    const newObj = { ...obj }
    delete newObj.onDeleteCurrentItem
    delete newObj.onDuplicateCurrentItem
    delete newObj.onUpdateItem
    delete newObj.refObj
    delete newObj.selectedItems
    return newObj
  }

  getHearderFooterStyle = (pageData, type, pageWidth) => {
    const { padding, paddingTop, paddingRight, paddingBottom, paddingLeft } = pageData?.style || {}
    const pad = {
      top: type === 'footer' ? 0 : paddingTop || padding || 0,
      right: paddingRight || padding || 0,
      bottom: type === 'header' ? 0 : paddingBottom || padding || 0,
      left: paddingLeft || padding || 0
    }
    let styleData = `display:flex; padding: ${pad.top}px ${pad.right}px ${pad.bottom}px ${pad.left}px !important;`
    if (pageWidth) {
      styleData += `width: ${pageWidth}px !important;`
    }
    if (pageData?.style?.fontFamily) {
      styleData += `font-family: ${pageData?.style?.fontFamily} !important;`
    }

    return styleData
  }

  getBodyStyle = (pageData, headerData, footerData) => {
    const { padding, paddingTop, paddingRight, paddingBottom, paddingLeft } = pageData?.style || {}
    const pad = {
      top: headerData ? 0 : paddingTop || padding || 0,
      right: paddingRight || padding || 0,
      bottom: footerData ? 0 : paddingBottom || padding || 0,
      left: paddingLeft || padding || 0
    }
    const pageWidth = (pageData.style.width || 0) - (pad.right + pad.left)
    return `width: ${pageWidth}px !important; height:auto; padding: ${pad.top}px ${pad.right}px ${pad.bottom}px ${pad.left}px !important`
  }

  onSave = () => {
    const replaceRefStart = (refVal, noDiv) => {
      return new RegExp(
        _escapeRegExp(
          noDiv
            ? `<span class="template-itemref ${refVal}-start"></span>`
            : `<div class="container-row"><span class="template-itemref ${refVal}-start"></span>`
        ),
        'gi'
      )
    }

    const replaceRefEnd = (refVal, noDiv) => {
      return new RegExp(
        _escapeRegExp(
          noDiv
            ? `<span class="template-itemref ${refVal}-end"></span>`
            : `<span class="template-itemref ${refVal}-end"></span></div>`
        ),
        'gi'
      )
    }
    const replaceText = (text) => {
      return new RegExp(_escapeRegExp(text), 'gi')
    }
    let htmlData = document.getElementById('template-page-top').innerHTML
    const resursiveFn = (items) => {
      return items.map((val) => {
        htmlData = htmlData
          .replace(
            new RegExp(
              _escapeRegExp(`<span id="${val.id}" class="template-itemref decimal-len-start"></span>`)
            ),
            '${toDecimal(`'
          )
          .replace(
            new RegExp(
              _escapeRegExp(`<span id="${val.id}" class="template-itemref decimal-len-end"></span>`)
            ),
            '`,' + val.decimalLength + ')}'
          )
        if (val.items) {
          val.items = resursiveFn(val.items)
        }

        return this.removeUnwanted(val)
      })
    }
    const myData = resursiveFn(pageData.items || [])
    htmlData = htmlData
      .replace(new RegExp(_escapeRegExp('clear: none; height:'), 'gi'), 'min-height:')
      .replace(/<textarea(.*?)>/g, '')
      .replace(new RegExp(_escapeRegExp('</textarea>'), 'gi'), '')
      .replace(new RegExp(_escapeRegExp('&gt;'), 'gi'), '>')
      .replace(new RegExp(_escapeRegExp('&lt;'), 'gi'), '<')
      .replace(replaceRefStart('cell-check', true), '${cellCheck("')
      .replace(replaceRefEnd('cell-check', true), '")}')
      .replace(replaceRefStart('thsnd-sp', true), '${thousandSeparatorFn(`')
      .replace(replaceRefEnd('thsnd-sp', true), '`)}')
      .replace(replaceRefStart('amt-wrds', true), '${amountInWordsFn(`')
      .replace(replaceRefEnd('amt-wrds', true), '`)}')
      .replace(replaceText('<span class="react-resizable-handle react-resizable-handle-se"></span>'), '')
      .replace(replaceText('draggable="true"'), '')
      .replace(replaceText('PDF_PAGE_NUMBER'), `<span class='pageNumber'></span>`)
      .replace(replaceText('PDF_TOTAL_PAGES'), `<span class='totalPages'></span>`)
      .replace(
        replaceRefStart('invoice-ref'),
        '${invoiceData.items.map(inv =>{obj["invoiceItem"]=inv; return `'
      )
      .replace(replaceRefEnd('invoice-ref'), '`}).join(" ")}')

      .replace(
        replaceRefStart('invoice-document-charge-ref'),
        '${invoiceData.documentCharges.map(doc =>{obj["documentChargeItem"]=doc; return `'
      )
      .replace(replaceRefEnd('invoice-document-charge-ref'), '`}).join(" ")}')

      .replace(
        replaceRefStart('timesheets-projects-ref'),
        '${timesheetData.projects.map(project =>{obj["project"]=project; return `'
      )
      .replace(replaceRefEnd('timesheets-projects-ref'), '`}).join(" ")}')
      .replace(
        replaceRefStart('timesheet-dates-ref', true),
        '${timesheetData.dates.map(dt =>{obj["dateData"]=dt; return `'
      )
      .replace(replaceRefEnd('timesheet-dates-ref', true), '`}).join(" ")}')
      .replace(
        replaceRefStart('timesheet-times-ref', true),
        '${timesheetData.dates.map(dt =>{obj["dateData"]=dt; return `'
      )
      .replace(replaceRefEnd('timesheet-times-ref', true), '`}).join(" ")}')

      .replace(
        replaceRefStart('timesheet-weeks-ref'),
        '${timesheetData.weeks.map(wk =>{obj["weekData"]=wk; return `'
      )
      .replace(replaceRefEnd('timesheet-weeks-ref'), '`}).join(" ")}')

      .replace(
        replaceRefStart('timesheet-entries-ref'),
        '${timesheetData.timeEntries.map(ent =>{obj["entryData"]=ent; return `'
      )
      .replace(replaceRefEnd('timesheet-entries-ref'), '`}).join(" ")}')

      .replace(
        replaceRefStart('order-ref'),
        '${orderData.orderDetails.map(ord =>{obj["orderItem"]=ord; return `'
      )
      .replace(replaceRefEnd('order-ref'), '`}).join(" ")}')

      .replace(
        replaceRefStart('order-invoice-ref'),
        '${invoiceData.orderDetails.map(ord =>{obj["invoiceItem"]=ord; return `'
      )
      .replace(replaceRefEnd('order-invoice-ref'), '`}).join(" ")}')

      .replace(
        replaceRefStart('batch-serial-ref'),
        '${ord.batchSerials.map(batchSerial =>{obj["batchSerialItem"]=batchSerial; return `'
      )
      .replace(replaceRefEnd('batch-serial-ref'), '`}).join(" ")}')

      .replace(
        replaceRefStart('package-list-ref'),
        '${packageList.map(pkg =>{obj["packageData"]=pkg; return `'
      )
      .replace(replaceRefEnd('package-list-ref'), '`}).join(" ")}')
      .replace(
        replaceRefStart('package-item-ref'),
        '${obj.packageData.items.map(pkgItm =>{obj["packageItem"]=pkgItm; return `'
      )
      .replace(replaceRefEnd('package-item-ref'), '`}).join(" ")}')

    const headerData = pageData.items?.find((v) => v.name === 'Header') || false
    const footerData = pageData.items?.find((v) => v.name === 'Footer') || false
    const marginTop =
      parseFloat(pageData?.style?.padding || 0) +
      parseFloat(pageData?.style?.paddingTop || 0) +
      parseFloat(headerData?.style?.height || 0)
    const marginBottom =
      parseFloat(pageData?.style?.padding || 0) +
      parseFloat(pageData?.style?.paddingTop || 0) +
      parseFloat(footerData?.style?.height || 0)

    const pageWidth = pageData.style.width || 0

    let letPageStyle = `width: ${pageData.style.width}px; size: ${
      pageData.style?.pageOrientation || 'potrait'
    };`
    if (marginTop && marginTop > 0) {
      letPageStyle += `margin-top: ${marginTop}px;`
    }
    if (marginBottom && marginBottom > 0) {
      letPageStyle += `margin-bottom: ${marginBottom}px;`
    }
    const justifyContent = pageData?.style?.justifyContent || 'flex-start'
    const alignContent = pageData?.style?.alignContent || 'flex-start'
    const fontCDN = pageData?.style?.fontCDN
      ? `<link href="${pageData?.style?.fontCDN}" rel='stylesheet'>`
      : ''
    const htmlContent = `<html><head>${fontCDN}<style>
      @media print{@page {size: ${pageData.style?.pageOrientation || 'potrait'}}}
      #page-width{${this.getBodyStyle(pageData, headerData, footerData)}}
      .pdf-page{width:${pageWidth}}
      @page{${letPageStyle}}
      #Page1{width: ${pageData.style.width}px !important;}
      #custom-header{${this.getHearderFooterStyle(pageData, 'header', headerData?.style?.width)}}
      #custom-footer{${this.getHearderFooterStyle(pageData, 'footer', footerData?.style?.width)}}
      body { padding: 0 !important; margin: 0 !important;}
      #header { display:flex; padding: 0 !important; width: ${
        pageData.style.width
      }px; transform: scale(0.75); transform-origin: top left; justify-content: ${justifyContent}; align-content: ${alignContent};}
      #footer { display:flex; padding: 0 !important; width: ${
        pageData.style.width
      }px; transform: scale(0.75); transform-origin: bottom left;justify-content: ${justifyContent}; align-content: ${alignContent};}
      ${defualtStyles}</style></head><body>${htmlData}</body></html>`
    const content = {
      id: pageData.id,
      items: myData,
      style: pageData.style,
      type: pageData.type,
      noDrag: true
    }
    const params = this.props.match.params
    apiClient.put(`customTemplates/update/${params.id}`, { htmlContent, content }).then((response) => {
      if (response && response.data && response.data.result) {
        const { data } = response
        if (data.result.content) {
          pageData = data.result.content
        }

        message.success('Template Saved')
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.loader ? (
          <div>Loading..</div>
        ) : (
          <Row>
            <Col xs={24} sm={24} md={8} lg={4} className="custom-template-left">
              <Boxes groups={this.state.dragItemGroup} items={this.state.dragabbleItems} />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={16}
              style={{ overflow: 'scroll' }}
              className="custom-template-center">
              <div className="graphPaper">
                {this.state.show && (
                  <Container
                    items={[pageData]}
                    id="MainContainer"
                    type="MainContainer"
                    onUpdateItem={this.onUpdateItem}
                  />
                )}
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={4} className="custom-template-right" style={{ height: '91.7vh' }}>
              <Properties templateName={this.state.templateName} onSave={this.onSave} />
            </Col>
          </Row>
        )}
      </div>
    )
  }
}

export default Templates
