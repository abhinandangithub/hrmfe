import { TFunction } from 'i18next'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import FooterActions from '../../../Components/FooterActions'
import { IDependent } from '../../../Interfaces/IDependent'
import { IEmployee } from '../../../Interfaces/IEmployee'
import PanelLayout from '../../../Layout/PanelLayout'
import apiClient from '../../../Util/apiClient'
// import DependentsApprovalsStatus from './DependentsApprovalsStatus'
import DependentsDetails from './DependentsDetails'
import DependentsExpenseReport from './DependentsExpenseReport'
import SupportingDocuments from './SupportingDocuments'

type TProps = {
  restrictPage: any
  currentEmployee: IEmployee
  history: any
  t: TFunction<'translation', undefined>
}

const Dependents = (props: TProps) => {
  const [dependents, setDependents] = useState<IDependent[]>([])

  const { currentEmployee, history, restrictPage } = props

  useEffect(() => {
    if (currentEmployee?.id) {
      getDependents()
    }
  }, [currentEmployee?.id])

  const getDependents = () => {
    apiClient.get(`employee-details/dependents/get-all/${currentEmployee?.id}`).then(({ data }) => {
      if (data && data.result) {
        setDependents(data.result)
      }
    })
  }

  const handleUpdateExpenses = (updatedDependents: IDependent[]) => {
    setDependents(updatedDependents)
  }

  return (
    <>
      <PanelLayout>
        <DependentsDetails
          dependents={dependents}
          currentEmployee={currentEmployee}
          getDependents={getDependents}
        />
        <SupportingDocuments dependents={dependents} />
        <DependentsExpenseReport dependents={dependents} handleUpdateExpenses={handleUpdateExpenses} />
      </PanelLayout>

      <FooterActions
        leftActions={
          !restrictPage
            ? [
                {
                  prefix: 'flaticon-back',
                  label: 'Back to employee list',
                  onClick: () => history.push('/app/employees')
                }
              ]
            : []
        }
      />
    </>
  )
}

export default withTranslation()(Dependents)
