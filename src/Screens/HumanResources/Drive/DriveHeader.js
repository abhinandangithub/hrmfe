import { Col, message, Popconfirm, Row } from 'antd'
import { withFormik } from 'formik'
import { useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import { Field, Form } from '../../../Components/Formik'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import { useSelector } from '../../../Hooks/redux'
import apiClient from '../../../Util/apiClient'
import CreateFolder from './CreateFolder'
import './Drive.scss'
import DriveBreadcrumb from './DriveBreadcrumb'
import FileUpload from './FileUpload'

function DriveHeader(props) {
  const [createFile, setCreateFile] = useState(false)
  const [createFolder, setCreateFolder] = useState(false)
  const [okFile, setOkFile] = useState([])
  const [visible, setVisible] = useState(false)
  const history = useNavigate()
  // const [parentData, setParentData] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [employeeId, setEmployeeId] = useState('')
  const { userInfo } = useSelector((state) => state.users)

  const headers = {
    Accept: 'application/x-www-form-urlencoded',
    'Content-Type': 'application/x-www-form-urlencoded',
    'cache-control': 'no-cache'
  }

  const onCancel = () => {
    setCreateFile(false)
    setCreateFolder(false)
    setOkFile([])
    setVisible(false)
  }

  const onOk = () => {
    const uploadData = okFile || []
    const { parentId } = props

    if (props.parentId) {
      uploadData.append('parentId', parentId)
    }

    apiClient.post('filestructure/add-file', uploadData, { headers }).then((data) => {
      console.log(data)

      if (data && data.status === 500) {
        setVisible(true)
      } else if (data && data.request.status === 200) {
        onCancel()
      }
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      history(`/app/drive/search/${e.target.value}`)
    }
  }

  const handleOk = () => {
    const uploadData = okFile || []
    const { parentId } = props

    if (props.parentId) {
      uploadData.append('parentId', parentId)
    }

    uploadData.append('fileAction', 'update')

    apiClient.post('filestructure/add-file', uploadData, { headers }).then((data) => {
      if (data && data.request.status === 200) {
        onCancel()
      }
    })
  }

  const onHandleOk = () => {
    setOpenModal(false)
    apiClient.post('filestructure/add/employee/folder', { employee: employeeId }).then((data) => {
      if (data && data.data.message) {
        message.success('Employee Folder Created')
      }
    })
  }

  return (
    <>
      <div className="drive-header-section">
        <Form>
          <div className="drive-title border-bottom">
            <Row justify="left" style={{ justifyContent: 'space-between' }}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 9 }} lg={{ span: 8 }}>
                <DriveBreadcrumb parentId={props.parentId} />
              </Col>
              {userInfo.userType === 'Admin' && (
                <Col xs={24} sm={24} md={12} lg={5} style={{ textAlign: 'end' }}>
                  <button
                    style={{ width: '200px' }}
                    type="button"
                    className="pds-button pds-button-primary "
                    onClick={() => setOpenModal(true)}>
                    <i className="flaticon-plus" /> Employee Root Folder
                  </button>
                </Col>
              )}
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 7 }} lg={{ span: 8 }}>
                <div className="form-fields">
                  <Field
                    name="leaveType"
                    placeholder="Search file or folder here.."
                    value={props.keywords}
                    onKeyPress={(e) => handleKeyDown(e)}
                    required
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
      <ModalBox
        title="Upload File"
        visible={!!createFile}
        onOk={() => onOk()}
        onCancel={() => onCancel()}
        destroyOnClose>
        <FileUpload
          onCancel={onCancel}
          onOk={setOkFile}
          selectedData={typeof createFile === 'object' ? createFile : false}
        />
      </ModalBox>
      <ModalBox
        title="Create Employee Root Folder"
        visible={openModal}
        onOk={onHandleOk}
        onCancel={() => setOpenModal(false)}
        destroyOnClose
        okText="confirm">
        <div className="form-field">
          <Field
            name="employee"
            label="Employee"
            as="paged-select"
            endPoint="filestructure/get/employee/without-root-folder"
            onChange={(event, value) => {
              setEmployeeId(value)
            }}
          />
        </div>
      </ModalBox>
      <ModalBox
        title="Create Folder"
        visible={!!createFolder}
        footer={null}
        onCancel={() => onCancel()}
        destroyOnClose>
        <CreateFolder onCancel={onCancel} parentId={props.parentId} />
      </ModalBox>
      <Popconfirm
        title="File with same name is already uploaded"
        visible={visible}
        onConfirm={handleOk}
        onCancel={onCancel}
      />
    </>
  )
}

export default withFormik({
  handleSubmit: () => null
})(DriveHeader)
