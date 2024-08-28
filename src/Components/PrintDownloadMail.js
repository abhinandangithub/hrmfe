import { Col, message, Row, Tooltip } from 'antd'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import DocumentFlows from '../Screens/DocumentFlows/DocumentFlows'
import IncomeEmail from '../Screens/InvoiceData/Incomes/IncomeEmail'
import apiClient from '../Util/apiClient'
import { downloadPrintPDF } from '../Util/Util'
import Button from './Button'
import ModalBox from './ModalBox/ModalBox'

export default function PrintDownloadMail({
  title,
  url,
  email,
  optional = false,
  documentFlowReference,
  documentFlowType = 'sales',
  downloadUrl = '',
  params = {}
}) {
  const { id } = useParams()
  const history = useHistory()
  const [showModal, setShowModal] = useState(false)

  const sendMail = (emailInfo) => {
    apiClient.post(`${url}/send-emails`, { ids: [id], ...emailInfo }, { params }).then(({ status }) => {
      if (status === 200) {
        message.success('Mail Sent')
        setShowModal(false)
      }
    })
  }

  const onDownload = (isPrint = false) => {
    downloadPrintPDF(downloadUrl || `${url}/download/${id}`, { params }, isPrint)
  }

  const buttons = [
    {
      name: 'view',
      title: 'Preview',
      onClick: () => history.push(`/app/${url}/${id}`),
      icon: 'flaticon-document',
      color: '#4472c4'
    },
    {
      name: 'print',
      title: 'Print PDF',
      onClick: () => onDownload(true),
      icon: 'flaticon-printer-1',
      color: '#47b1f0'
    },
    {
      name: 'download',
      title: 'Download PDF',
      onClick: () => onDownload(),
      icon: 'flaticon-pdf',
      color: '#f7c033'
    },
    {
      name: 'email',
      title: 'Send PDF as mail',
      onClick: () => setShowModal(true),
      icon: 'flaticon-email-4',
      color: '#ed7d33'
    }
  ].filter((item) => (Array.isArray(optional) ? !optional.includes(item.name) : item.name !== optional))

  return (
    <Row justify="space-between">
      <Col>{title && (typeof title === 'string' ? <h2 className="panel-title">{title}</h2> : title)}</Col>
      {id ? (
        <Col>
          <ModalBox
            title="Send Email"
            visible={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
            destroyOnClose>
            <IncomeEmail onSend={sendMail} showEmail email={email} onCancel={() => setShowModal(false)} />
          </ModalBox>
          {buttons.map((item, i) => (
            <Tooltip key={i} title={item.title} onClick={item.onClick}>
              <Button className="ml-2" style={{ backgroundColor: item.color }}>
                <i className={`m-auto text-white fa ${item.icon}`} />
              </Button>
            </Tooltip>
          ))}
          {documentFlowReference && (
            <Tooltip title="Document Flow">
              <DocumentFlows
                documentFlowReference={documentFlowReference}
                documentFlowType={documentFlowType}
              />
            </Tooltip>
          )}
        </Col>
      ) : null}
    </Row>
  )
}
