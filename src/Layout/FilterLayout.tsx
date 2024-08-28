import { FunnelPlotOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { getIn } from 'formik'
import React, { FormEvent, ReactElement } from 'react'
import Button from '../Components/Button'
import { validateAccess } from '../Util/Util'
import TableLayout from './TableLayout'

const { Sider, Content } = Layout

type TObject = { page?: number } & Record<string, unknown>

type TFilterLayout = {
  children: ReactElement<TFilterLayoutProps> | ReactElement<TFilterLayoutProps>[]
  filter: ReactElement<TFilterComponentProps>
  addButton?: {
    title: string
    onClick: () => void
    access: string
  }
} & TFilterLayoutProps

type TFilterComponentProps = {
  onSubmit?: (values: FormEvent<HTMLElement> & TObject) => void
} & TFilterLayoutProps

type TFilterLayoutProps = {
  filterData?: TObject
}

export default function FilterLayout({ filter, filterData, addButton, children }: TFilterLayout) {
  const responsiveFilter = () => {
    const x = document.getElementById('mobile-sider-menu')

    if (x) {
      if (x.style.display === 'block') {
        x.style.display = 'none'
      } else {
        x.style.display = 'block'
      }
    }
  }

  const AddButton = () =>
    addButton ? (
      validateAccess(addButton.access) ? (
        <Button onClick={addButton.onClick} variant="primary" className="btn-block">
          <i className="flaticon-plus" /> {addButton.title}
        </Button>
      ) : null
    ) : null

  const FilterComponent =
    filter &&
    React.cloneElement(filter, {
      ...(filterData && {
        filterData,
        onSubmit: (values) => filter.props.onSubmit?.({ ...(filterData?.page && { page: 1 }), ...values })
      })
    })

  return (
    <Layout className="app-sidebar">
      <div className="mobile-filter">
        <Button>
          <FunnelPlotOutlined onClick={responsiveFilter} />
        </Button>
      </div>
      <Sider width={230} trigger={null} collapsible collapsed={false} id="mobile-sider-menu">
        <div className="filter-section">
          {addButton && <AddButton />}
          {FilterComponent}
        </div>
      </Sider>
      <Layout className="site-layout">
        <Content className="site-layout-background">
          {React.Children.map(children, (child) => {
            if (getIn(child?.type, 'name') === TableLayout.name) {
              return React.cloneElement(child, {
                ...{ filterData, addButton: AddButton }
              })
            }

            return child
          })}
        </Content>
      </Layout>
    </Layout>
  )
}
