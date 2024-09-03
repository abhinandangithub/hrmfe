import loadable from '@loadable/component'

const Field = loadable(() => import('./Field'))
const Form = loadable(() => import('./Form'))
const FieldArray = loadable(() => import('./FieldArray'))

const Attachment = loadable(() => import('./Attachment'))
const AutoComplete = loadable(() => import('./AutoComplete'))
const Checkbox = loadable(() => import('./Checkbox'))
const DatePicker = loadable(() => import('./DatePicker'))
const DateRangePicker = loadable(() => import('./DateRangePicker'))
const DurationPicker = loadable(() => import('./DurationPicker'))
const Input = loadable(() => import('./Input'))
const InputChip = loadable(() => import('./InputChip'))
const PagedSelect = loadable(() => import('./PagedSelect'))
const RadioGroup = loadable(() => import('./RadioGroup'))
const RichText = loadable(() => import('./RichText'))
const Select = loadable(() => import('./Select'))
const TextArea = loadable(() => import('./TextArea'))
const ScanModal = loadable(() => import('./ScanModal'))
const TimePicker = loadable(() => import('./TimePicker'))

export {
  Field,
  Form,
  FieldArray,
  Attachment,
  AutoComplete,
  Checkbox,
  DatePicker,
  DateRangePicker,
  DurationPicker,
  Input,
  InputChip,
  PagedSelect,
  RadioGroup,
  RichText,
  Select,
  TextArea,
  ScanModal,
  TimePicker
}

