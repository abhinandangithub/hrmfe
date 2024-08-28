import { Dropdown, Menu, message } from 'antd'
import { withFormik } from 'formik'
import React, { useState } from 'react'
import folderImage from '../../../assets/images/icons/folder.svg'
import Button from '../../../Components/Button'
import { Form } from '../../../Components/Formik'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import apiClient from '../../../Util/apiClient'
import CreateFolder from './CreateFolder'
import FileUpload from './FileUpload'

function CreateNew(props) {
  const [createFile, setCreateFile] = useState(false)
  const [createFolder, setCreateFolder] = useState(false)
  const [okFile, setOkFile] = useState([])
  const [visible, setVisible] = useState(false)
  const [iteration, setIteration] = useState(0)

  const headers = {
    Accept: 'application/x-www-form-urlencoded',
    'Content-Type': 'application/x-www-form-urlencoded',
    'cache-control': 'no-cache'
  }

  const onFileCreate = () => {
    setCreateFile(true)
    setCreateFolder(false)
  }

  const onFolderCreate = () => {
    setCreateFolder(true)
    setCreateFile(false)
  }

  const onCancel = () => {
    setCreateFile(false)
    setCreateFolder(false)
    setOkFile([])
    setVisible(false)
  }

  const onOk = async (i = 0, fileAction = null) => {
    const fileData = okFile || []

    if (i === fileData.length) {
      onCancel()
      props.getData()

      return
    }

    const { parentId } = props

    const uploadData = new FormData()

    uploadData.append('document', fileData[i].originFileObj)

    if (parentId) {
      uploadData.append('parentId', parentId)
    }

    if (fileAction) {
      uploadData.append('fileAction', fileAction)
    }

    apiClient.post('filestructure/add-file', uploadData, { headers }).then((data) => {
      if (data.status === 500) {
        message.error('Cannot Upload File...')
        onOk(++i)

        return
      }

      if (data && data.request.status === 200 && data.data.success === false) {
        setIteration(i)
        setVisible(true)
      } else if (data && data.request.status === 200 && data.data.success === true) {
        onOk(++i)
      }
    })
  }

  const uploadFileMenu = (
    <Menu>
      <Menu.Item>
        <a onClick={() => onFolderCreate()}>
          <img src={folderImage} className="folder-icon" alt="folder" /> Folder
        </a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => onFileCreate()}>
          <img src={folderImage} className="folder-icon" alt="folder" /> File
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Dropdown className="mr-3" overlay={uploadFileMenu} trigger={['click']} placement="bottomLeft" arrow>
        <a
          className="ant-btn ant-btn-primary btn-block mb-3 ant-dropdown-link"
          onClick={(e) => e.preventDefault()}>
          <i className="flaticon-plus mr-2" />
          New folder / file
        </a>
      </Dropdown>
      <Form>
        <ModalBox
          title="Upload File"
          visible={!!createFile}
          onOk={() => onOk()}
          onCancel={() => onCancel()}
          destroyOnClose>
          <FileUpload
            onCancel={onCancel}
            okFile={setOkFile}
            selectedData={typeof createFile === 'object' ? createFile : false}
          />
        </ModalBox>
        <ModalBox
          title="Create Folder"
          visible={!!createFolder}
          footer={null}
          onCancel={() => onCancel()}
          destroyOnClose>
          <CreateFolder onCancel={onCancel} parentId={props.parentId} getData={props.getData} />
        </ModalBox>
        <ModalBox
          title="File with same name is already uploaded"
          visible={!!visible}
          footer={null}
          onCancel={onCancel}
          destroyOnClose>
          <div>
            <Button
              className="btn btn-primary"
              type="submit"
              name="replace"
              onClick={() => onOk(iteration, 'replace')}>
              Replace
            </Button>
            <Button type="submit" name="update" onClick={() => onOk(iteration, 'update')}>
              Update
            </Button>
          </div>
        </ModalBox>
      </Form>
    </div>
  )
}

export default withFormik({
  handleSubmit: () => null
})(CreateNew)
