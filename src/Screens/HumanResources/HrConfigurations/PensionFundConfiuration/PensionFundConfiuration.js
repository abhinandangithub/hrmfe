import { SettingOutlined } from '@ant-design/icons'
import { Popconfirm, Popover } from 'antd'
import { useState } from 'react'
import Button from '../../../../Components/Button'
import ModalBox from '../../../../Components/ModalBox/ModalBox'
import TableBox from '../../../../Components/TableBox/TableBox'
import Panel from '../../../../Layout/Panel'
import apiClient from '../../../../Util/apiClient'
import PensionFundConfiurationForm from './PensionFundConfiurationForm'
import { useTranslation } from 'react-i18next'



const {t} = useTranslation()


export default function HrConfigurations(props) {
  const [config, setConfig] = useState(props.pensionFund)
  const [toggle, setToogle] = useState(false)
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Employer Contribution',
      dataIndex: 'employerContribution'
    },
    {
      title: 'Employee Contribution',
      dataIndex: 'employeeContribution'
    },
    {
      title: 'Action',
      dataIndex: 'custom_action',
      render: (text, row) => (
        <Popover placement="bottomRight" content={tableActions(row)} trigger="click">
          <div className="btn-group">
            <button type="button" className="btn glow dropdown-toggle">
              {' '}
              <SettingOutlined /> <span className="caret" />
            </button>
          </div>
        </Popover>
      )
    }
  ]

  const onCancel = () => {
    setToogle(false)
  }

  const onUpdate = (v, t) => {
    let pensionFund = [...config]

    if (t === 'Update') {
      pensionFund = config.map((c) => (c.id === v.id ? v : c))
    } else {
      pensionFund.push(v)
    }

    apiClient.put('hr-configurations/update/pensionFund', { pensionFund }).then(({ data }) => {
      if (data?.result) {
        setConfig(data.result)
        setToogle(false)
      }
    })
  }

  const onDelete = (v) => {
    const pensionFund = config.filter((c) => c.id !== v.id)

    apiClient.put('hr-configurations/update/pensionFund', { pensionFund }).then(({ data }) => {
      if (data?.result) {
        setConfig(data.result)
        setToogle(false)
      }
    })
  }

  const tableActions = (row) => (
    <div className="action-buttons">
      <ul>
        <li onClick={() => setToogle(row)}>
          <i className="flaticon-edit-1" /> Edit
        </li>
        <li>
          <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(row)}>
            <i className="flaticon-delete-2" /> Delete
          </Popconfirm>
        </li>
      </ul>
    </div>
  )

  return (
    <div>
      <Panel title={t('Pension Fund')}>
        <div style={{ position: 'absolute', top: -40, right: 15 }}>
          <Button variant="primary" onClick={() => setToogle(true)}>
            Add
          </Button>
        </div>
        <TableBox columns={columns} dataSource={config} />
        <ModalBox
          title={typeof toggle === 'object' ? 'Update Config' : 'Add Config'}
          visible={!!toggle}
          footer={null}
          onCancel={() => onCancel()}
          destroyOnClose>
          <PensionFundConfiurationForm
            onCancel={onCancel}
            selectedConfig={typeof toggle === 'object' ? toggle : false}
            onUpdate={onUpdate}
          />
        </ModalBox>
      </Panel>
    </div>
  )
}
