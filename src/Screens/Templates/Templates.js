import { EditOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import Button from '../../Components/Button'
import TableBox from '../../Components/TableBox/TableBox'
import FilterLayout from '../../Layout/FilterLayout'
import TableLayout from '../../Layout/TableLayout'
import apiClient from '../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../Util/Util'
import TemplateFilter from './TemplateFilter'
import TemplateForm from './TemplateForm'
import TemplateHTMLEditor from './TemplateHTMLEditor'

const { TabPane } = Tabs

export default function Templates() {
  const [activeTab, setActiveTab] = useState(GET_DATA('customTemplates.activeTab') || 'Service')
  const [templates, setTemplates] = useState([])
  const [toggleForm, setToggleForm] = useState(false)
  const [toggleHTMLForm, setToggleHTMLForm] = useState(false)

  const history = useNavigate()

  const getData = (params = {}) => {
    params.type = activeTab

    apiClient.get('customTemplates/getAll', { params }).then(({ data }) => {
      if (data && data.result) {
        SET_DATA(`customTemplates${activeTab}.filterData`, { ...params, ...data.pageData })
        setTemplates(data.result)
      }
    })
  }

  const onAdd = (values) => {
    const templateData = { ...values, type: activeTab }

    if (toggleForm?.id || toggleHTMLForm?.id) {
      apiClient
        .put(`customTemplates/update/${toggleForm?.id || toggleHTMLForm?.id}`, templateData)
        .then(({ data }) => {
          if (data && data.result) {
            getData(GET_DATA(`customTemplates${activeTab}.filterData`))
            // setTemplates(templates.map((t) => (t.id === data.result.id ? data.result : t)))
          }

          setToggleForm(false)
          setToggleHTMLForm(false)
        })
    } else {
      apiClient.post('customTemplates/add', templateData).then(({ data }) => {
        if (data && data.result) {
          setTemplates([...templates, data.result])
        }

        setToggleForm(false)
      })
    }
  }

  const onCancel = () => {
    setToggleForm(false)
    setToggleHTMLForm(false)
  }

  useEffect(() => {
    getData(GET_DATA(`customTemplates${activeTab}.filterData`))
    SET_DATA('customTemplates.activeTab', activeTab)
  }, [activeTab])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, r) => (
        <div
          onClick={() =>
            r.mode === 'HTML' ? setToggleHTMLForm(r) : history(`/app/custom-templates/${r.id}`)
          }>
          <a>{text}</a>
        </div>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Mode',
      dataIndex: 'mode'
    },
    {
      title: 'For',
      dataIndex: 'for'
    },
    {
      title: 'Default',
      dataIndex: 'default',
      render: (v) => (
        <div
          style={{
            width: 50,
            background: v === 'Yes' ? '#daf0db' : '#fadddd',
            borderRadius: 10,
            padding: '0px 10px',
            textAlign: 'center',
            fontWeight: 500
          }}>
          {v}
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      ...(validateAccess('edit-custom-template') && {
        title: 'Action',
        dataIndex: 'custom_action',
        render: (text, r) => (
          <div className="btn-group">
            <Button onClick={() => setToggleForm(r)} className="btn-glow dropdown-toggle">
              <EditOutlined />
            </Button>
          </div>
        )
      })
    }
  ]

  return (
    <FilterLayout
      addButton={{
        title: 'New Template',
        onClick: () => setToggleForm(true),
        access: 'add-custom-template'
      }}
      filterData={GET_DATA(`customTemplates${activeTab}.filterData`)}
      filter={<TemplateFilter key={activeTab} onFilter={getData} />}>
      <TableLayout title="Custom Templates Overview">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Service" key="Service" />
          <TabPane tab="Logistic" key="Logistic" />
          <TabPane tab="Finance" key="Finance" />
          <TabPane tab="Freight" key="Freight" />
          <TabPane tab="Payroll" key="Payroll" />
        </Tabs>
        <TableBox
          dataSource={templates}
          columns={columns}
          pageData={GET_DATA(`customTemplates${activeTab}.filterData`)}
          onChangePage={getData}
        />
      </TableLayout>
      {toggleForm && (
        <TemplateForm
          activeTab={activeTab}
          edit={toggleForm?.id ? toggleForm : false}
          templates={templates}
          type={activeTab}
          open={toggleForm}
          onAdd={onAdd}
          onCancel={onCancel}
        />
      )}
      {toggleHTMLForm && (
        <TemplateHTMLEditor
          edit={toggleHTMLForm?.id ? toggleHTMLForm : false}
          open={toggleHTMLForm}
          onAdd={onAdd}
          onCancel={onCancel}
        />
      )}
    </FilterLayout>
  )
}
