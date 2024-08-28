import { Col, Form, Row } from 'antd'
import moment from 'moment'
import TableBox from '../../../Components/TableBox/TableBox'
import Panel from '../../../Layout/Panel'
import { useTranslation } from 'react-i18next'

export default function DependentsApprovalStatus() {
  const {t} = useTranslation()
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Relationship',
      dataIndex: 'relationship'
    },
    {
      title: 'Insurance',
      dataIndex: 'insurance',
      render: (text: Date) => (text ? moment(text).format('DD-MMM-YYYY') : '')
    },
    {
      title: 'Visa',
      dataIndex: 'visa',
      render: (text: Date) => (text ? moment(text).format('DD-MMM-YYYY') : '')
    },
    {
      title: 'Duration',
      dataIndex: 'duration'
    },
    {
      title: 'Air Ticket Up',
      dataIndex: 'airTicketUp',
      render: (text: Date) => (text ? moment(text).format('DD-MMM-YYYY') : '')
    },
    {
      title: 'Air Ticket Down',
      dataIndex: 'airTicketDown',
      render: (text: Date) => (text ? moment(text).format('DD-MMM-YYYY') : '')
    },
    {
      title: 'School Fee',
      dataIndex: 'schoolFee',
      render: (text: Date) => (text ? moment(text).format('DD-MMM-YYYY') : '')
    }
  ]

  return (
    <Form>
      <Panel title={t('Approvals Status')} noBottom={false}>
        <Row justify="start" gutter={[12, 10]}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
            <div className="table-view">
              <TableBox columns={columns} dataSource={[]} />
            </div>
          </Col>
        </Row>
      </Panel>
    </Form>
  )
}
