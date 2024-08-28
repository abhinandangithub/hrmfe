import ModalBox from '../../Components/ModalBox/ModalBox'
import Logs from './Logs'

export default function LogsModal({ title = 'Logs', entityType, entityId, onCancel }) {
  return (
    <ModalBox
      title={title}
      visible={!!entityId}
      onCancel={() => onCancel(false)}
      destroyOnClose
      footer={false}>
      <Logs entityId={entityId} entityType={entityType} />
    </ModalBox>
  )
}
