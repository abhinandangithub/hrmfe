import { Col, message, Row } from 'antd'
import { useEffect, useState } from 'react'
import ConfirmationBox from '../../../Components/ConfirmationBox/ConfirmationBox'
import FooterActions from '../../../Components/FooterActions'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import SelectBox from '../../../Components/SelectBox/SelectBox'
import TemplateView from '../../../Components/TemplateView/TemplateView'
import apiClient from '../../../Util/apiClient'
import { convertSelectOptions, downloadPrintPDF, parseQueryStr } from '../../../Util/Util'

export default function TimeReportView(props) {
  const [timesheets, setTimesheets] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [templates, setTemplates] = useState([])
  const [defaultTimesheetTemplate, setDefaultTimesheetTemplate] = useState('')

  const getData = async () => {
    const { ids, project, client } = parseQueryStr(props.location.search)
    const obj = { ids }

    if (project) {
      obj.project = typeof project === 'object' ? project : [project]
    }

    if (client) {
      obj.client = client
    }

    console.log('obj', obj)

    if (ids) {
      await apiClient
        .post('timeEntries/viewMothlyReport', obj)
        .then(({ data }) => {
          if (data && data.result) {
            console.log('data.result', data.result)
            setTimesheets(data.result)
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onDownload = (isPrint = false) => {
    const { ids, project, client } = parseQueryStr(props.location.search)
    const obj = { ids }

    if (project) {
      obj.project = typeof project === 'object' ? project : [project]
    }

    if (client) {
      obj.client = client
    }

    const exeFn = (printType) =>
      downloadPrintPDF('timeEntries/downloadMothlyReport', { printType, ...obj }, isPrint)

    if (typeof ids === 'object' && ids.length > 1 && !isPrint) {
      ConfirmationBox({
        title: 'Download Timesheet',
        description: 'Select how you wants to download!',
        acceptText: 'Single',
        acceptText1: 'Multiple',
        cancelText: 'Cancel',
        acceptFn: () => exeFn('Single'),
        acceptFn1: () => exeFn('Multiple')
      })
    } else {
      exeFn('Single')
    }
  }

  const onOpen = () => {
    apiClient
      .get('customTemplates/getActive', { params: { type: 'Service', for: 'Timesheet' } })
      .then(({ data }) => {
        if (data && data.result) {
          const templates = [...convertSelectOptions(data.result, 'name', 'id')]
          setTemplates(templates)
        }
      })
    setShowModal(true)
  }

  const onSetTemplate = () => {
    if (defaultTimesheetTemplate === '') {
      message.error('Please select template')

      return true
    }

    apiClient.put('users/update-my-data', { defaultTimesheetTemplate }).then(({ data }) => {
      if (data && data.result) {
        getData()
        setShowModal(false)
      }
    })
  }

  return (
    <Row>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 24 }}
        style={{ background: '#f3f3f3' }}>
        <div style={{ paddingBottom: 70 }}>
          <TemplateView contents={timesheets} />
        </div>
        <ModalBox
          title="Choose Template"
          visible={showModal}
          onCancel={() => setShowModal(false)}
          onOk={onSetTemplate}
          destroyOnClose>
          <div className="form-fields">
            <SelectBox
              id="defaultTimesheetTemplate"
              value={defaultTimesheetTemplate}
              onChangeText={(v) => setDefaultTimesheetTemplate(v)}
              options={templates}
            />
          </div>
        </ModalBox>

        <FooterActions
          leftActions={[
            {
              prefix: 'flaticon-back',
              label: 'Back',
              onClick: () => props.history('/app/time-reports')
            }
          ]}
          rightActions={[
            {
              prefix: 'flaticon-exam',
              label: 'Change Template',
              onClick: () => onOpen(true)
            },
            {
              prefix: 'flaticon-printer-1',
              label: 'Print',
              onClick: () => onDownload(true)
            },
            {
              prefix: 'flaticon-download',
              label: 'Download',
              onClick: () => onDownload()
            }
          ]}
        />
      </Col>
    </Row>
  )
}
