import { UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, message, Row, Upload } from 'antd'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import {
  addExpense,
  deleteExpense,
  getExpenseCategories,
  getExpensesById,
  updateExpenses
} from '../../Actions/UserAction'
import ConfirmationButtonBox from '../../Components/ButtonBox/ConfirmationButtonBox'
import DateBox from '../../Components/DateBox/DateBox'
import InputBox from '../../Components/InputBox/InputBox'
import ModalBoxFooter from '../../Components/ModalBox/ModalBoxFooter'
import SelectBox from '../../Components/SelectBox/SelectBox'
import apiClient from '../../Util/apiClient'
import { convertSelectOptions, getStartAndEndWeek } from '../../Util/Util'
import './Expenses.scss'

class ExpensesForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expenseDate: props.selectedEntry ? moment(props.selectedEntry.expenseDate) : props.selectedDate,
      project: props.selectedEntry ? props.selectedEntry.project : '',
      category: props.selectedEntry ? props.selectedEntry.category : '',
      notes: props.selectedEntry ? props.selectedEntry.notes : '',
      isBillable: props.selectedEntry ? props.selectedEntry.isBillable : true,
      currency: props.departmentInfo ? props.departmentInfo.currency : props.companyInfo.currency,
      amount: props.selectedEntry ? props.selectedEntry.amount : '',

      categoryOptions: [],
      attachments: {},
      projects: [],
      currencies: []
    }
  }

  componentDidMount() {
    getExpenseCategories().then((categories) => {
      if (categories) {
        this.setState({ categoryOptions: convertSelectOptions(categories, 'name', 'id') })
      }
    })

    if (this.props.selectedEntry) {
      getExpensesById(this.props.selectedEntry.id).then((result) => {
        if (result) {
          const { attachments } = result
          const attachmentList = {}
          attachments.map((attach) => (attachmentList[attach.name] = attach.file))
          this.setState({ attachments: attachmentList })
        }
      })
    }

    this.getProjects()

    apiClient.get('currencies/getMaster').then(({ data }) => {
      if (data && data.result) {
        this.setState({ currencies: convertSelectOptions(data.result, 'name', 'code') })
      }
    })
  }

  getProjects = () => {
    const date = moment(this.state.expenseDate).format('YYYY-MM-DD')
    apiClient.get('projects/get-projects-by-user', { params: { date } }).then(({ data }) => {
      if (data && data.result) {
        const projects = data.result.map((val) => {
          const { projectData } = val
          projectData.label = val.projectData.name
          projectData.value = val.projectData.id

          return projectData
        })
        this.setState({ projects })
      }
    })
  }

  onChangeText = (value, type) => {
    if (type === 'expenseDate') {
      if (moment(value) > moment()) {
        message.error('Cannot select future date')

        return true
      }

      const { startWeek, endWeek } = getStartAndEndWeek(value)
      this.props.getExpenseClaimEntries({ startWeek, endWeek })
      this.setState({ [type]: value, project: '' }, () => {
        this.getProjects()
      })
    } else {
      this.setState({ [type]: value })
    }
  }

  onChangeTextArea = (event) => {
    this.setState({ notes: event.target.value })
  }

  downloadFile = (file) => {
    console.log(file, 'filefilefile')
  }

  deleteAttachment = (file) => {
    const filesNew = {}
    Object.keys(this.state.attachments).forEach((key) => {
      if (key !== file.name) {
        filesNew[key] = this.state.attachments[key]
      }
    })
    this.setState({ attachments: filesNew })
  }

  toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  onFileChange = async ({ file }) => {
    if (file && file.originFileObj) {
      this.toBase64(file.originFileObj).then((attachment) => {
        this.setState({ attachments: { [file.originFileObj.name]: attachment } })
      })
    }
  }

  onSave = () => {
    const { expenseDate, project, category, notes, isBillable, currency, amount } = this.state
    const selectedDate = moment(expenseDate)
    const validateFields = ['expenseDate', 'project', 'category', 'notes', 'currency', 'amount']
    let flag = true
    validateFields.map((data) => {
      if (this[data] && this[data].error) {
        flag = false
      }

      return true
    })

    if (this.props.weekStatus === 'Submitted' || this.props.weekStatus === 'Approved') {
      flag = false
      message.error(`Expense claim already ${this.props.weekStatus} for selected week`)
    }

    const attachmentsList = Object.keys(this.state.attachments).map((name) => ({
      name,
      file: this.state.attachments[name]
    }))

    if (flag) {
      const selectedProject = this.state.projects.find((pro) => pro.id === project)
      const client = selectedProject ? selectedProject.client : null

      if (this.props.selectedEntry) {
        const expenseClaimObj = {
          project,
          client,
          category,
          notes,
          isBillable,
          currency,
          amount,
          attachments: attachmentsList
        }
        updateExpenses(this.props.selectedEntry.id, expenseClaimObj).then((expenseClaimEntry) => {
          if (expenseClaimEntry) {
            // const expenseClaimEntries = this.props.expenseClaimEntries.map((val) => val.id === expenseClaimEntry.id ? expenseClaimEntry : val);
            // this.props.dispatch({ type: 'SET_EXPENSE_CLAIM_DATA', payload: { expenseClaimEntries } });
            const { startWeek, endWeek } = getStartAndEndWeek(selectedDate)
            this.props.getExpenseClaimEntries({ startWeek, endWeek })
            this.props.onCancel()
            message.success('Expense Claim updated')
          }
        })
      } else {
        const { startWeekDate, endWeekDate } = getStartAndEndWeek(selectedDate)
        const date = moment(selectedDate).format('D')
        const month = moment(selectedDate).format('M')
        const year = moment(selectedDate).format('YYYY')
        const expenseClaimObj = {
          date,
          month,
          year,
          startWeekDate,
          endWeekDate,
          expenseDate,
          project,
          client,
          category,
          notes,
          isBillable,
          currency,
          amount,
          attachments: attachmentsList
        }
        addExpense(expenseClaimObj).then((expenseClaimEntry) => {
          if (expenseClaimEntry) {
            // this.props.dispatch({ type: 'SET_EXPENSE_CLAIM_DATA', payload: { expenseClaimEntries: [expenseClaimEntry, ...this.props.expenseClaimEntries] } });
            const { startWeek, endWeek } = getStartAndEndWeek(selectedDate)
            this.props.getExpenseClaimEntries({ startWeek, endWeek })
            this.props.onCancel()
            message.success('Expense Claim added')
          }
        })
      }
    } else {
      this.setState({ isSubmit: true })
    }
  }

  onDelete = () => {
    const { id } = this.props.selectedEntry
    deleteExpense(id).then((expense) => {
      if (expense) {
        const expenseClaimEntries = this.props.expenseClaimEntries.filter((val) => val.id !== id)
        this.props.dispatch({ type: 'SET_EXPENSE_CLAIM_DATA', payload: { expenseClaimEntries } })
        this.props.onCancel()
        message.success('Expense Claim Deleted')
      }
    })
  }

  render() {
    const attachmentList = Object.keys(this.state.attachments).map((key, index) => ({
      uid: index,
      name: key,
      status: 'done',
      url: this.state.attachments[key]
    }))

    return (
      <section className="expenses-claim-form">
        <Row gutter={[20, 20]}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 3 }} lg={{ span: 6 }}>
            <div className="form-field">
              <DateBox
                label="Date"
                refs={(ref) => (this.expenseDate = ref)}
                id="expenseDate"
                value={this.state.expenseDate}
                onChangeText={this.onChangeText}
                isSubmit={this.state.isSubmit}
                disabled={this.props.selectedEntry}
              />
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
            <div className="form-field">
              <SelectBox
                label="Project"
                refs={(ref) => (this.project = ref)}
                id="project"
                value={this.state.project}
                options={this.state.projects}
                onChangeText={this.onChangeText}
                isSubmit={this.state.isSubmit}
              />
            </div>
            <div className="form-field">
              <SelectBox
                label="Choose Category"
                refs={(ref) => (this.category = ref)}
                id="category"
                value={this.state.category}
                options={this.state.categoryOptions}
                onChangeText={this.onChangeText}
                isSubmit={this.state.isSubmit}
              />
            </div>
            <div className="form-field">
              <InputBox
                label="Notes"
                refs={(ref) => (this.notes = ref)}
                id="notes"
                value={this.state.notes}
                onChangeText={this.onChangeText}
                isSubmit={this.state.isSubmit}
                textArea
              />
            </div>
            <div className="form-field">
              <Checkbox
                checked={this.state.isBillable}
                onChange={(e) => this.setState({ isBillable: e.target.checked })}>
                This expense is billable
              </Checkbox>
            </div>
            <div className="form-field">
              <label>Attachments</label>
              <Upload
                previewFile
                fileList={attachmentList}
                onRemove={this.deleteAttachment}
                action={null}
                onDownload={this.downloadFile}
                onChange={this.onFileChange}>
                <Button icon={<UploadOutlined />}>Browse</Button>
              </Upload>
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
            <div className="form-field">
              <SelectBox
                label="Choose Currency"
                refs={(ref) => (this.category = ref)}
                id="currency"
                value={this.state.currency}
                options={this.state.currencies}
                onChangeText={this.onChangeText}
                isSubmit={this.state.isSubmit}
              />
            </div>
            <div className="form-field amount">
              <InputBox
                label={`Amount (${this.state.currency})`}
                refs={(ref) => (this.amount = ref)}
                id="amount"
                value={this.state.amount}
                onChangeText={this.onChangeText}
                isSubmit={this.state.isSubmit}
                type="number"
              />
            </div>
          </Col>
        </Row>
        {this.props.selectedEntry && (
          <div style={{ position: 'absolute', bottom: 14 }}>
            <ConfirmationButtonBox
              title="Are you sure! Do you want to delete?"
              placement="topLeft"
              type="secondary"
              onConfirm={this.onDelete}>
              Delete
            </ConfirmationButtonBox>
          </div>
        )}
        <ModalBoxFooter
          loader={this.state.buttonLoader}
          okText={this.props.selectedEntry ? 'Update' : 'Add'}
          onOk={this.onSave}
          onCancel={() => this.props.onCancel()}
        />
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    companyInfo: state.users.companyInfo,
    departmentInfo: state.users.departmentInfo,
    selectedDate: state.expenseClaims.selectedDate,
    expenseClaimEntries: state.expenseClaims.expenseClaimEntries
  }
}

export default connect(mapStateToProps)(ExpensesForm)
