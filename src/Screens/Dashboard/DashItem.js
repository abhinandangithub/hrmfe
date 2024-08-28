import { Card, Col, Row } from 'antd'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useSelector } from '../../Hooks/redux'
import { parseAmount } from '../../Util/Util'

export default function DashItem({ title, cards = [], graphs = [], data = {} }) {
  const { currency = '' } = useSelector((state) => state.users.companyInfo) || {}

  return (
    <Card className="shadow-sm">
      <h1>{title}</h1>
      <Row gutter={[20, 20]}>
        <Col xs={24} xl={24} xxl={24}>
          <Row gutter={[20, 20]}>
            {cards.map(
              (card, i) =>
                data[card.value]?.toString() && (
                  <Col xs={24} sm={12} md={8} xl={6} key={i}>
                    <Card size="small" bordered={false} className="info-card">
                      <div className="info">
                        <div className="currency">{/count/i.test(card.value) ? '' : currency}</div>
                        <h2 className="text-white mb-0">
                          {/count/i.test(card.value)
                            ? data[card.value]
                            : `${parseAmount(data[card.value], currency)}`}
                        </h2>
                        <h3 className="text-white mb-0">{card.label}</h3>
                      </div>
                      <div className="icon">
                        <img src={card.icon} alt={card.label} />
                      </div>
                    </Card>
                  </Col>
                )
            )}
          </Row>
        </Col>
        <Col xs={24} xl={24} xxl={24}>
          <Row gutter={[20, 20]}>
            {graphs.map(
              (graph, i) =>
                data[graph.name] && (
                  <Col xs={24} xl={12} key={i}>
                    <Card bordered={false} className="module-chart" bodyStyle={{ padding: '12px 0 5px' }}>
                      <h4 className="mb-3">{graph.title}</h4>
                      <div>
                        <ResponsiveContainer height={300}>
                          <BarChart
                            data={data[graph.name]}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5
                            }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#1e4fed" name={graph.label} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </Card>
                  </Col>
                )
            )}
          </Row>
        </Col>
      </Row>
    </Card>
  )
}
