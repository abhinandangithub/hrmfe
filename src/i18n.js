import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import apiClient from './Util/apiClient'

async function languageApi() {
  const { data } = await apiClient.get('language/list')
  for (const key in data) {
    if (data[key]) {
      i18n.addResourceBundle(key, 'translations', data[key], true, true)
    }
  }
}

const langList = [
  'zh-Hans',
  'ar',
  'bg',
  'cs',
  'da',
  'de',
  'el',
  'en',
  'es',
  'et',
  'fi',
  'fr',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'lt',
  'lv',
  'nb',
  'nl',
  'pl',
  'pt-PT',
  'ro',
  'ru',
  'sk',
  'sl',
  'sv',
  'tr',
  'uk'
]

i18n.use(initReactI18next).init(
  {
    fallbackLng: langList,
    ns: ['translations'],
    lng: sessionStorage.getItem('language') || 'en',
    resources: {},
    debug: false
  },
  (err) => {
    if (err) {
      return console.log('something went wrong loading', err)
    }
  }
)

languageApi()

export default i18n
