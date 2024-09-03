import { Card, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const gridStyle: React.CSSProperties = {
    width: '20%',
    textAlign: 'center',
}


const masterMenu = [
    {
        label: 'Companies',
        value: '/app/companies',
        access: [
            { label: 'Add', value: 'add-company' },
            { label: 'Edit', value: 'edit-company' }
        ],
        notInMenu: true
    },
    {
        label: 'Roles',
        value: '/app/roles',
        access: [
            { label: 'View', value: 'roles' },
            { label: 'Add', value: 'add-role' },
            { label: 'Edit', value: 'edit-role' }
        ]
    },
    {
        label: 'Users',
        value: '/app/users',
        access: [
            { label: 'View', value: 'users' },
            { label: 'Add', value: 'add-user' },
            { label: 'Edit', value: 'edit-user' }
        ]
    },
    {
        label: 'Customers',
        value: '/app/customers',
        access: [
            { label: 'View', value: 'customers' },
            { label: 'Add', value: 'add-customer' },
            { label: 'Edit', value: 'edit-customer' }
        ]
    },
    {
        label: 'Currencies',
        value: '/app/currencies',
        access: [
            { label: 'View', value: 'currencies' },
            { label: 'Add', value: 'add-currency' },
            { label: 'Edit', value: 'edit-currency' }
        ]
    },
    {
        label: 'Exchange Rate',
        value: '/app/exchange-rates',
        access: [
            { label: 'View', value: 'exchange-rates' },
            { label: 'Add', value: 'add-exchange-rate' },
            { label: 'Edit', value: 'edit-exchange-rate' }
        ]
    },
    {
        label: 'Categories',
        value: '/app/categories',
        access: [
            { label: 'View', value: 'categories' },
            { label: 'Add', value: 'add-category' },
            { label: 'Edit', value: 'edit-category' }
        ]
    },
    {
        label: 'Options',
        value: '/app/options',
        access: [
            { label: 'View', value: 'options' },
            { label: 'Add', value: 'add-option' },
            { label: 'Edit', value: 'edit-option' }
        ]
    },
    {
        label: 'Custom Template',
        value: '/app/custom-templates',
        access: [
            { label: 'View', value: 'custom-templates' },
            { label: 'Add', value: 'add-custom-template' },
            { label: 'Edit', value: 'edit-custom-template' }
        ]
    },
    {
        label: 'Master Upload',
        value: '/app/master-upload',
        access: [{ label: 'Full', value: 'master-upload' }]
    },
    {
        label: 'Numbering Series',
        value: '/app/numbering-series',
        access: [{ label: 'Full', value: 'numbering-series' }]
    },
    {
        label: 'Company Configurations',
        value: '/app/company-configurations',
        access: [{ label: 'Full', value: 'company-configurations' }]
    },
    {
        label: 'Translator',
        value: '/app/translate',
        access: [{ label: 'Full', value: 'translator' }]
    },
    {
        label: 'Cost Center',
        value: '/app/Cost-Center',
        access: [{ label: 'Full', value: 'translator' }]
    },
    {
        label: 'Location',
        value: '/app/location',
        access: [
            { label: 'View', value: 'location' },
            { label: 'Add', value: 'add-customer' },
            { label: 'Edit', value: 'edit-customer' }
        ]
    },
    {
        label: 'Employee Group',
        value: '/app/employee-groups'
    },
    {
        label: 'Employee Sub Group',
        value: '/app/employee-sub-groups'
    },
    {
        label: 'Nationality',
        value: '/app/countries'
    },
    {
        label: 'Marital Status',
        value: '/app/marital-status'
    },
    {
        label: 'Gender',
        value: '/app/genders'
    },
    {
        label: 'Wage Type',
        value: '/app/wage-types'
    },
    {
        label: 'Grades',
        value: '/app/grades'
    },
    {
        label: 'Organization Unit',
        value: '/app/organization-units'
    },
    {
        label: 'Position',
        value: '/app/positions'
    },
    {
        label: 'Job Level',
        value: '/app/job-levels'
    },
    {
        label: 'Operational Level 1',
        value: '/app/operational-level-1'
    },
    {
        label: 'Operational Level 2',
        value: '/app/operational-level-2'
    },
    {
        label: 'Operational Level 3',
        value: '/app/operational-level-3'
    },
    {
        label: 'Military status',
        value: '/app/military-status'
    },
    {
        label: 'Payroll Area',
        value: '/app/payroll-areas'
    },
    {
        label: 'Title',
        value: '/app/titles'
    },
    {
        label: 'Citizenship',
        value: '/app/citizenship'
    },
    {
        label: 'Region',
        value: '/app/regions'
    },
    {
        label: 'Contract Types',
        value: '/app/contract-types'
    },
    {
        label: 'Pay Group',
        value: '/app/paygroups'
    },
    {
        label: 'Job Band',
        value: '/app/job-bands'
    },
    {
        label: 'Disability',
        value: '/app/disabilities'
    },
    {
        label: 'Religion',
        value: '/app/religions'
    },
]

const App: React.FC = () => (
    <Row justify="center" className="inner-contents" >
        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 20 }} lg={{ span: 20 }}>
            <Card title="Masters Setup">
                {masterMenu.map((x, i) =>
                    <Link to={x.value} key={i}>
                        <Card.Grid style={gridStyle}>
                            {x.label}
                        </Card.Grid>

                    </Link>)}

                {/* {masterMenu.map((x, i) =>
                    <Card.Grid style={gridStyle} key={i}>
                        {x.label}
                    </Card.Grid>)} */}
            </Card>
        </Col>

    </Row>
)

export default App