import { DownOutlined, GlobalOutlined } from '@ant-design/icons'
import { Popover, Space } from 'antd'
import { useMemo, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import apiClient from '../../Util/apiClient'

const languages = [
  { label: 'English', value: 'en' },
  { label: 'عربي', value: 'ar' }
]

function ChangeLanguage(props) {
  const [language, onSetLanguage] = useState(props.language)
  const dispatch = useDispatch()

  const onChangeLang = (lang) => {
    apiClient.get('translations/list', { params: { language: lang } }).then(({ data }) => {
      if (data?.result) {
        dispatch({ type: 'SET_TRANSLATION', payload: { translations: data?.result, language: lang } })
        document.getElementById('root').style.direction = lang === 'ar' ? 'rtl' : ''
        onSetLanguage(lang)
      }
    })
  }

  const tableContent = () => (
    <div className="action-buttons">
      <ul>
        {languages.map((v, i) => (
          <li key={i} onClick={() => onChangeLang(v.value)}>
            <div>{v.label}</div>
          </li>
        ))}
      </ul>
    </div>
  )

  const currentLanguage = useMemo(() => languages.find((v) => v.value === language), [language])

  return (
    <div className="cursor-pointer">
      <Popover placement="bottom" content={() => tableContent()} trigger="click">
        <div className="language-translate">
          <Space size={5}>
            <GlobalOutlined />
            <div style={{ fontSize: 16 }}>{currentLanguage?.label}</div>
            <DownOutlined />
          </Space>
        </div>
      </Popover>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    language: state.users.language
  }
}

export default connect(mapStateToProps)(ChangeLanguage)
