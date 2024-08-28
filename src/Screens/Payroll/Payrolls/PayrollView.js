import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import ConfirmationBox from '../../../Components/ConfirmationBox/ConfirmationBox'
import apiClient from '../../../Util/apiClient'
import { sanitize } from '../../../Util/Util'

export default function Payrolls(props) {
  const [payrolls, setPayrolls] = useState([])

  const getData = () => {
    if (props.match.params.ids) {
      apiClient.get('payroll/getByIds', { params: { ids: props.match.params.ids } }).then(({ data }) => {
        if (data.result) {
          setPayrolls(data.result)
        }
      })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onDownloadPayslip = () => {
    const ids = payrolls.map((val) => val.id)
    const exeFn = (printType) =>
      apiClient
        .post('payroll/downloadPayslip', { ids, printType }, { responseType: 'blob' })
        .then(({ status, data, headers }) => {
          if (status === 200) {
            const a = document.createElement('a')
            a.href = window.URL.createObjectURL(data)
            a.download = JSON.parse(headers['content-disposition'].split('filename=')[1].split(';')[0])
            document.body.appendChild(a)
            a.click()
            a.remove()
          }
        })

    if (ids.length > 1) {
      ConfirmationBox({
        title: 'Download Payslip',
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

  return (
    <Row>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 24 }}
        style={{ background: '#f3f3f3' }}>
        <div style={{ paddingBottom: 70 }}>
          {payrolls.map((t, i) => (
            <div
              key={i}
              style={{
                width: 'fit-content',
                margin: '15px auto',
                background: '#fff'
              }}>
              <div
                style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: 0.3 }}
                {...sanitize(t.htmlTemplate)}
              />
            </div>
          ))}
        </div>
        <div className="fixed-action-area">
          <ButtonBox onClick={onDownloadPayslip}>Download</ButtonBox>
          <span>or</span>
          <Link to="/app/payrolls">
            <ButtonBox type="gray">
              <ArrowLeftOutlined /> Back to payrolls
            </ButtonBox>
          </Link>
        </div>
      </Col>
    </Row>
  )
}
