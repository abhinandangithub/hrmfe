/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Col, message, Row } from 'antd'
import _ from 'lodash'
import { withTranslation } from 'react-i18next'
import { useNavigate , useParams } from 'react-router-dom'
import apiClient from '../Util/apiClient'
import { navigateToPreviousAndNext } from '../Util/Util'
import Button, { TButton } from './Button'
import './Component.scss'

type Actions = {
  dontShow?: boolean
  label: string
  prefix?: string
  suffix?: string
} & TButton

type TTemplateData = {
  url: string
  template: string | null
  show: boolean
  templateFieldName?: string
  redirectUrl?: string
}

type TFooterActions = {
  leftActions?: Actions[]
  centerActions?: Actions[]
  rightActions?: Actions[]
  templateData?: TTemplateData
  navigation?: {
    params: Record<string, unknown>
    navigationUrl: string
    actionUrl: string
  }
}

type Params = {
  id: string
}

function FooterActions({
  leftActions = [],
  centerActions = [],
  rightActions = [],
  templateData,
  navigation,
  ...props
}: TFooterActions) {
  const { id } = useParams<Params>()
  const history = useNavigate()

  const updateTemplate = () => {
    if (templateData) {
      const { template, url, templateFieldName = 'template', redirectUrl } = templateData
      apiClient
        .put(`${url}/${id}`, {
          [templateFieldName]: template === 'Default' ? null : template
        })
        .then(({ status }) => {
          if (status === 200) {
            history(`/app/${redirectUrl || url}/${id}`)
          }
        })
    }
  }

  const onNavigation = async (type: string) => {
    const navigationId = await navigateToPreviousAndNext(navigation?.navigationUrl, {
      ...(navigation?.params || {}),
      id,
      type
    })

    if (navigationId) {
      history(`${navigation?.actionUrl}/${navigationId}`)
    } else {
      message.info('No data found!')
    }
  }

  if (navigation) {
    leftActions.push(
      {
        prefix: 'fa fa-backward',
        label: 'Previous',
        onClick: () => onNavigation('Previous')
      },
      {
        suffix: 'fa fa-forward',
        label: 'Next',
        onClick: () => onNavigation('Next')
      }
    )
  }

  return (
    <Row className="footer-actions">
      <Col xs={24} sm={8} md={8} lg={8} className="left-actions">
        {leftActions.map(
          (v, i) =>
            !v.dontShow && (
              <div className="action-content" key={i}>
                <Button type={v.type} variant={v.variant} onClick={v.onClick}>
                  {v.prefix && <i className={v.prefix} />}
                  {v.label}
                  {v.suffix && <i className={v.suffix} />}
                </Button>
              </div>
            )
        )}
      </Col>
      <Col xs={12} sm={8} md={8} lg={8} className="center-actions">
        {centerActions.map(
          (v, i) =>
            !v.dontShow && (
              <div className="action-content" key={i}>
                <Button variant="primary" {..._.omit(v, ['label', 'dontShow'])}>
                  {v.prefix && <i className={v.prefix} />}
                  {v.label}
                  {v.suffix && <i className={v.suffix} />}
                </Button>
              </div>
            )
        )}
        {templateData?.show && (
          <div className="action-content">
            <Button variant="primary" onClick={updateTemplate}>
              <i className="flaticon-writing" /> Update Template
            </Button>
          </div>
        )}
      </Col>
      <Col xs={12} sm={8} md={8} lg={8} className="right-actions">
        {rightActions.map(
          (v, i) =>
            !v.dontShow && (
              <div className="action-content" key={i}>
                <Button
                  type={v.type}
                  variant={v.variant}
                  onClick={v.onClick}
                  disabled={v?.disabled}
                  icon={v?.icon}>
                  {v.prefix && <i className={v.prefix} />}
                  {v.label}
                  {v.suffix && <i className={v.suffix} />}
                </Button>
              </div>
            )
        )}
      </Col>
    </Row>
  )
}

export default withTranslation()(FooterActions)
