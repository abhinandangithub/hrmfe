import moment from 'moment'
import React from 'react'
import { getWeekAndTimeEntries } from '../../../Actions/WorkflowAction'
import LoaderBox from '../../../Components/LoaderBox/LoaderBox'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import { convertMinutesToHours } from '../../../Util/Util'
import TimeDetails from './TimeDetails'

export default class TimeApprovalTable extends React.Component {
  constructor() {
    super()
    this.state = {
      weekData: false,
      timeEntries: [],
      open: false,
      loader: 'Loading..'
    }
  }

  componentDidMount() {
    getWeekAndTimeEntries(this.props.weekId).then((result) => {
      if (result) {
        const { weekData, timeEntries } = result
        this.setState({ weekData, timeEntries: timeEntries || [], loader: false })
      } else {
        this.setState({ loader: false })
      }
    })
  }

  getWeeks = () => {
    const { year, month, startWeekDate, endWeekDate } = this.state.weekData
    const weeks = []

    for (
      let m = moment(`${year}-${month}-${startWeekDate}`);
      m.isBefore(moment(`${year}-${month}-${endWeekDate}`).endOf('day'));
      m.add(1, 'days')
    ) {
      weeks.push(m.format('DD-MMM-YYYY'))
    }

    return weeks
  }

  getProjects = () => {
    const projectObj = {}
    const total = { label: 'total_week_minutes', projectTotalMinutes: 0 }
    this.state.timeEntries.forEach((val) => {
      const key = [moment(`${val.year}-${val.month}-${val.date}`).format('DD-MMM-YYYY')]
      const minutes = parseInt(val.totalMinutes, 10)

      if (projectObj[val.project]) {
        if (projectObj[val.project][key]) {
          projectObj[val.project][key] += minutes
        } else {
          projectObj[val.project][key] = minutes
        }

        projectObj[val.project].projectTotalMinutes += minutes
      } else {
        projectObj[val.project] = {
          label: val.projectData.name,
          client: val.clientData ? val.clientData.name : this.props.companyInfo.name,
          value: val.project,
          [key]: minutes,
          projectTotalMinutes: minutes
        }
      }

      if (total[key]) {
        total[key] += minutes
      } else {
        total[key] = minutes
      }

      total.projectTotalMinutes += minutes
    })

    return { projects: Object.values(projectObj), footer: total }
  }

  onCancel = () => {
    this.setState({ open: false })
  }

  render() {
    const weeks = this.getWeeks()
    const { projects, footer } = this.getProjects()

    return (
      <>
        <LoaderBox loader={this.state.loader} noData={this.state.weekData ? false : 'No time entries'} />
        {this.state.weekData && (
          <section className="week-timesheet">
            <table
              border="0"
              cellPadding="0"
              cellSpacing="0"
              className="week-view-table"
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: '#fff',
                border: '1px solid #f0f0f0'
              }}>
              <thead>
                <tr
                  style={{
                    height: '45px',
                    backgroundColor: '#fafafa',
                    borderBottom: '1px solid #f0f0f0',
                    borderRadius: '10px 10px 0 0'
                  }}>
                  <td className="name" style={{ padding: '16px', fontWeight: 'bold' }}>
                    <div>Project</div>
                  </td>
                  {weeks.map((day, i) => (
                    <td key={i} className="day" style={{ padding: '16px', fontWeight: 'bold' }}>
                      {/* <div className="">
                        {moment(day).format('ddd')}
                        <span>{moment(day).format('DD MMM')}</span>
                      </div> */}
                      <div>
                        {moment(day).format('ddd')}
                        <div className="d-block text-nowrap">{moment(day).format('DD MMM')}</div>
                      </div>
                    </td>
                  ))}
                  <td className="total" style={{ padding: '16px', fontWeight: 'bold' }}>
                    <div />
                  </td>
                  <td className="delete" style={{ padding: '16px', fontWeight: 'bold' }}>
                    <div />
                  </td>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, i) => (
                  <tr
                    key={i}
                    className="week-view-entry"
                    style={{ height: '45px', backgroundColor: '#fff', borderBottom: '1px solid #f0f0f0' }}>
                    <td className="name" style={{ padding: '16px' }}>
                      <div className="project-client">
                        <span className="project">{project.label}</span>
                        <span className="client">({project.client})</span>
                      </div>
                      <div className="task">
                        <i style={{ color: 'gray' }}>No description</i>
                      </div>
                    </td>
                    {weeks.map((day, i2) => (
                      <td key={i2} className="day" style={{ padding: '16px' }}>
                        <span className="hours">
                          {convertMinutesToHours(project[day] ? project[day] : 0)}
                        </span>
                      </td>
                    ))}
                    <td className="total" style={{ padding: '16px' }}>
                      {convertMinutesToHours(project.projectTotalMinutes)}
                    </td>
                    <td style={{ padding: '16px' }} className="delete js-end-of-week-row " />
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr
                  style={{
                    height: '45px',
                    backgroundColor: '#fafafa',
                    borderTop: '1px solid #f0f0f0',
                    borderRadius: '0  0 10px  10px'
                  }}>
                  <td className="name" style={{ padding: '16px' }}>
                    <button
                      type="button"
                      className=""
                      onClick={() => this.setState({ open: true })}
                      style={{
                        padding: '8px 8px 16px 8px',
                        border: '1px solid #d9d9d9',
                        borderRadius: '3px',
                        background: '#fff'
                      }}>
                      View details
                    </button>
                  </td>

                  {weeks.map((day, i) => (
                    <td key={i} className="day" style={{ padding: '16px' }}>
                      {convertMinutesToHours(footer[day] ? footer[day] : 0)}
                    </td>
                  ))}
                  <td className="total" style={{ padding: '16px' }}>
                    {convertMinutesToHours(footer.projectTotalMinutes || 0)}
                  </td>
                  <td className="delete" style={{ padding: '16px' }}>
                    &nbsp;
                  </td>
                </tr>
              </tfoot>
            </table>

            <ModalBox
              title="Times"
              visible={this.state.open}
              footer={null}
              onCancel={() => this.onCancel()}
              destroyOnClose>
              <TimeDetails entries={this.state.timeEntries} onCancel={this.onCancel} />
            </ModalBox>
          </section>
        )}
      </>
    )
  }
}
