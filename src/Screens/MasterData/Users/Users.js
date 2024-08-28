import { SettingOutlined } from '@ant-design/icons'
import { Col, message, Popover, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { sendUserInvitaion } from '../../../Actions/UserAction'
import ButtonBox from '../../../Components/ButtonBox/ButtonBox'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import TableBox from '../../../Components/TableBox/TableBox'
import FilterLayout from '../../../Layout/FilterLayout'
import apiClient from '../../../Util/apiClient'
import { GET_DATA, SET_DATA, validateAccess } from '../../../Util/Util'
import AddUser from './AddUser'
import ResetPassword from './ResetPassword'
import UserFilter from './UserFilter'

function Payrolls(props) {
  const [users, setUsers] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const [openResetPassord, setOpenResetPassord] = useState(false)

  useEffect(() => {
    onFilter(GET_DATA('users.filterData'))
  }, [])

  const onFilter = (obj = {}) => {
    apiClient.get('users/getUsersByCompany', { params: obj }).then(({ data }) => {
      if (data && data.result) {
        SET_DATA('users.filterData', { ...obj, ...data.pageData })
        setUsers(data.result)
      }
    })
  }

  const onChangePage = (pageData) => {
    const filterCache = GET_DATA('users.filterData')
    onFilter({ ...(filterCache || {}), ...pageData })
  }

  const columns = [
    {
      title: props.t('Name'),
      dataIndex: 'name'
    },
    {
      title: props.t('Email ID'),
      dataIndex: 'email'
    },
    {
      title: props.t('Reporter'),
      dataIndex: 'reporterName',
      render: (v) => v || 'Self'
    },
    {
      title: props.t('Role'),
      dataIndex: 'roleName'
    },
    {
      title: props.t('Type'),
      dataIndex: 'userType'
    },
    {
      title: props.t('Status'),
      dataIndex: 'status'
    },
    validateAccess('edit-user')
      ? {
          title: props.t('Action'),
          dataIndex: 'custom_action',
          render: (text, row) => (
            <div>
              {row.userType !== 'Admin' && (
                <Popover placement="bottomRight" content={tableContent(row)} trigger="click">
                  <div className="btn-group">
                    <button type="button" className="btn glow dropdown-toggle">
                      <SettingOutlined /> <span className="caret" />
                    </button>
                  </div>
                </Popover>
              )}
            </div>
          )
        }
      : {}
  ]

  const onCancel = (user, type) => {
    if (type === 'Add' || type === 'Update') {
      onFilter(GET_DATA('users.filterData'))
      setOpenAdd(false)
    } else {
      setOpenAdd(false)
      setOpenResetPassord(false)
    }
  }

  const onSendInvitation = () => {
    if (selectedRows.length > 0) {
      const selectedUsers = selectedRows.map((val) => val.user)
      sendUserInvitaion({ users: selectedUsers }).then((result) => {
        if (result) {
          message.success('Invitaions Sent')
          const userData = users.map((val) => {
            if (selectedUsers.indexOf(val.user) >= 0) {
              val.status = 'Active'
            }

            return val
          })
          setUsers(userData)
          setSelectedRows([])
        }
      })
    }
  }

  const tableContent = (row) => (
    <div className="action-buttons">
      <ul>
        <li>
          <a onClick={() => setOpenAdd(row)}>
            <i className="flaticon-edit-1" /> {props.t('Edit')}
          </a>
        </li>
        <li>
          <a onClick={() => setOpenResetPassord(row)}>
            <i className="flaticon-lock" /> {props.t('Reset Password')}
          </a>
        </li>
      </ul>
    </div>
  )

  return (
    <FilterLayout filter={<UserFilter onFilter={onFilter} onOpen={() => setOpenAdd(true)} />}>
      <div className="top-filter-options">
        <Row>
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={{ span: 12, order: 1 }}
            lg={{ span: 12, order: 1 }}>
            <h2>{props.t('Users Overview')}</h2>
          </Col>

          <Col
            xs={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
            md={{ span: 12, order: 2 }}
            lg={{ span: 12, order: 2 }}>
            {selectedRows.length > 0 && (
              <div style={{ float: 'right' }}>
                <ButtonBox type="default" onClick={() => onSendInvitation()}>
                  <i className="flaticon-email-1" /> {props.t('Send Invitataion')}
                </ButtonBox>
              </div>
            )}
          </Col>
          <Col
            xs={{ span: 24, order: 3 }}
            sm={{ span: 24, order: 3 }}
            md={{ span: 24, order: 3 }}
            lg={{ span: 0, order: 3 }}>
            <div className="add-new-invoice-button">
              <button
                type="button"
                onClick={() => props.history.push('/app/add-country')}
                className="btn-glow btn-block primary">
                {props.t('Add new country')}
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <TableBox
        dataSource={users}
        columns={columns}
        pageData={GET_DATA('users.filterData')}
        onChangePage={onChangePage}
        onSelect={(selectedRows) => setSelectedRows(selectedRows)}
        selectedRows={selectedRows}
      />
      <ModalBox
        title={props.t('Add User')}
        visible={!!openAdd}
        footer={null}
        onCancel={() => onCancel()}
        destroyOnClose>
        <AddUser
          onCancel={onCancel}
          users={users}
          selectedUser={openAdd && openAdd.user ? openAdd : false}
          {...props}
        />
      </ModalBox>
      <ModalBox
        title={props.t('Reset Password')}
        visible={!!openResetPassord}
        footer={null}
        onCancel={() => onCancel()}
        destroyOnClose>
        <ResetPassword onCancel={onCancel} selectedUser={openResetPassord} />
      </ModalBox>
    </FilterLayout>
  )
}

export default withTranslation()(Payrolls)
