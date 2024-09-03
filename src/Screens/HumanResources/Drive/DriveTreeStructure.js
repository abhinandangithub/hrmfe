import { Tree } from 'antd'
import _ from 'lodash'
import { memo, useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import ModalBox from '../../../Components/ModalBox/ModalBox'
import AppConfig from '../../../config'
import apiClient from '../../../Util/apiClient'
import { SET_DATA } from '../../../Util/Util'

const { DirectoryTree } = Tree
const { API_URL } = AppConfig

function DriveTreeStructure() {
  const [treeData, setTreeData] = useState([])
  const [visible, setVisible] = useState(false)
  const [path, setPath] = useState('')
  const history = useNavigate()

  const onSelect = (keys, info) => {
    const { type, parentId } = info.node

    if (type === 'Folder') {
      history(`/app/drive/${keys}`)
    }

    if (type === 'File') {
      // props.path = info.path
      setPath(info.node.path)
      setVisible(true)

      SET_DATA('drive.selectedFile', info.node)
      history(`/app/drive/${parentId}`)
    }
  }

  const onExpand = () => {
    console.log('Trigger Expand')
  }

  const onClose = () => {
    setVisible(false)
    setPath('')
  }

  const flatToNested = (list) => {
    const map = {}
    const roots = []
    list.forEach((node, i) => {
      map[list[i]._id] = i
      node.key = node._id
      node.title = node.name

      //  Force it to be boolean using !!
      node.isLeaf = !!(node.type === 'File')

      if (node.parentId && list[map[node.parentId]]) {
        if (list[map[node.parentId]].children) {
          list[map[node.parentId]].children.push(node)
        } else {
          list[map[node.parentId]].children = [node]
        }
      } else {
        roots.push(node)
      }
    })

    return roots
  }

  useEffect(() => {
    onFilter()
  }, [])

  const onFilter = (params = {}) => {
    const endpoint = !_.isEmpty(params) ? `'filestructure/get', ${{ params }}` : 'filestructure/get-by-parent'
    apiClient.get(endpoint).then(({ data }) => {
      if (data.result) {
        setTreeData(flatToNested(data.result))
      }
    })
  }

  return (
    <>
      <DirectoryTree multiple onSelect={onSelect} onExpand={onExpand} treeData={treeData} />
      <ModalBox
        title="PDF Preview"
        visible={!!visible}
        footer={null}
        height="100%"
        onCancel={onClose}
        destroyOnClose>
        <iframe src={`${API_URL}/${path}#view=fitH`} height="500px" width="100%" title="PDF" />
      </ModalBox>
    </>
  )
}

export default memo(DriveTreeStructure)
