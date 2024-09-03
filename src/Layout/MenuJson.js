const MENUS = (companyInfo, userInfo) => [
  {
    label: 'Setups',
    type: 'group',
    children: [
      {
        label: 'Masters Setup',
        value: '/app/master'
      },
      {
        label: 'Enterprise Setup',
        type: 'submenu',
        children: [
          {
            label: 'Division',
            value: '/app/divisions',
            access: [
              { label: 'View', value: 'divisions' },
              { label: 'Add', value: 'add-division' },
              { label: 'Edit', value: 'edit-division' }
            ],
            dontShow: companyInfo?.configurations?.division !== 'Yes'
          },
          {
            label: 'Departments',
            value: '/app/departments',
            access: [
              { label: 'View', value: 'departments' },
              { label: 'Add', value: 'add-departments' },
              { label: 'Edit', value: 'edit-departments' }
            ]
          },

          {
            label: 'Grades',
            value: '/app/grades',
            access: [
              { label: 'View', value: 'grades' },
              { label: 'Add', value: 'add-grade' },
              { label: 'Edit', value: 'edit-grade' }
            ]
          },
          {
            label: 'Job Profile',
            value: '/app/designations',
            access: [
              { label: 'View', value: 'designations' },
              { label: 'Add', value: 'add-designation' },
              { label: 'Edit', value: 'edit-designation' }
            ]
          },
          {
            label: 'Termination Checklist',
            value: '/app/termination-checklists',
            access: [
              { label: 'View', value: 'termination-checklists' },
              { label: 'Add', value: 'add-termination-checklist' },
              { label: 'Edit', value: 'edit-termination-checklist' }
            ]
          },
          {
            label: 'Employee Configuration',
            type: 'submenu',
            children: [
              {
                label: 'Localization Setting',
                value: '/app/hr-configurations',
                access: [{ label: 'View', value: 'hr-configurations' }]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    label: 'Projects',
    className: 'group',
    children: [
      {
        label: 'Projects',
        value: '/app/projects',
        access: [
          { label: 'View', value: 'projects' },
          { label: 'Add', value: 'add-project' },
          { label: 'Edit', value: 'edit-projects' }
        ]
      },
      {
        label: 'Project Rate',
        value: '/app/project-employee-rates',
        access: [
          { label: 'View', value: 'project-employee-rates' },
          { label: 'Add', value: 'add-project-employee-rate' },
          { label: 'Edit', value: 'edit-project-employee-rate' }
        ]
      },
      {
        label: 'Project Report',
        value: '/app/project-reports',
        access: [{ label: 'View', value: 'project-reports' }]
      }
      // {
      //   label: 'Projects',
      //   type: 'submenu',
      //   children: [
      //     {
      //       label: 'Projects',
      //       value: '/app/projects',
      //       access: [
      //         { label: 'View', value: 'projects' },
      //         { label: 'Add', value: 'add-project' },
      //         { label: 'Edit', value: 'edit-projects' }
      //       ]
      //     },
      //     {
      //       label: 'Project Rate',
      //       value: '/app/project-employee-rates',
      //       access: [
      //         { label: 'View', value: 'project-employee-rates' },
      //         { label: 'Add', value: 'add-project-employee-rate' },
      //         { label: 'Edit', value: 'edit-project-employee-rate' }
      //       ]
      //     },
      //     {
      //       label: 'Project Report',
      //       value: '/app/project-reports',
      //       access: [{ label: 'View', value: 'project-reports' }]
      //     }
      //   ]
      // },
      // {
      //   label: 'Process',
      //   type: 'submenu',
      //   children: [
      //     {
      //       label: 'Time Entry',
      //       value: '/app/time-entries',
      //       access: [{ label: 'Full', value: 'time-entries' }]
      //     },
      //     // {
      //     //   label: 'From Timesheet',
      //     //   value: '/app/from-timesheet',
      //     //   access: [{ label: 'Full', value: 'from-timesheet' }]
      //     // },
      //     {
      //       label: 'Expense Claims',
      //       value: '/app/expense-claims',
      //       access: [{ label: 'Full', value: 'expense-claims' }]
      //     }
      //   ]
      // },
      // {
      //   label: 'Reports',
      //   type: 'submenu',
      //   children: [
      //     {
      //       label: 'Time Report',
      //       value: '/app/time-reports',
      //       access: [
      //         { label: 'View', value: 'time-reports', view: 'time-reports-view' },
      //         { label: 'Full', value: 'time-reports-all' }
      //       ]
      //     },
      //     // {
      //     //   label: 'Project Report',
      //     //   value: '/app/project-reports',
      //     //   access: [{ label: 'View', value: 'project-reports' }]
      //     // }
      //   ]
      // }
    ]
  },
  {
    label: 'People and Organization',
    className: 'group',
    children: [
      {
        label: 'Staffing',
        type: 'submenu',
        children: [
          {
            label: 'Employee Master Data',
            value: '/app/employees',
            access: [
              { label: 'View', value: 'employees' },
              { label: 'Add', value: 'add-employee' },
              { label: 'Edit', value: 'edit-employee' }
            ]
          },

          {
            label: 'Employee Self Service',
            value: '/app/edit-employee',
            notInMenu: userInfo?.userType === 'Admin',
            isSelf: userInfo?.userType !== 'Admin'
          },

          {
            label: 'Employee Transfer',
            value: '/app/employee-transfers',
            access: [
              { label: 'View', value: 'employee-transfers' },
              { label: 'Add', value: 'add-employee-transfer' },
              { label: 'Edit', value: 'edit-employee-transfer' }
            ]
          },

          {
            label: 'Terminate Employee',
            value: '/app/termination',
            access: [
              { label: 'View', value: 'termination' },
              { label: 'Add', value: 'add-termination' },
              { label: 'Edit', value: 'edit-termination' }
            ]
          }
        ]
      },
      {
        label: 'Payroll',
        type: 'submenu',
        children: [
          {
            label: 'Payroll Run',
            value: '/app/payrolls',
            access: [{ label: 'View', value: 'payrolls' }]
          },
          {
            label: 'Pay slips',
            value: '/app/paymaster',
            access: [{ label: 'View', value: 'paymaster' }]
          },
          {
            label: 'Tax Calculation',
            value: '/app/taxdata',
            access: [{ label: 'View', value: 'taxdata' }]
          },
          {
            label: 'Employee Loan',
            value: '/app/employee-loans',
            access: [{ label: 'View', value: 'employee-loans' }]
          },

          {
            label: 'Payroll Dashboard',
            value: '/app/employee-dashboard',
            access: [{ label: 'View', value: 'employee-dashboard' }]
          },
          {
            label: 'Recurring Cost Calculation',
            value: '/app/recurring-cost-calculations',
            access: [{ label: 'View', value: 'recurring-cost-calculations' }]
          },
          {
            label: 'Payroll Component',
            value: '/app/payroll-components',
            access: [{ label: 'View', value: 'payroll-components' }]
          },
          {
            label: 'Payroll Definition',
            value: '/app/payroll-definitions',
            access: [{ label: 'View', value: 'payroll-definitions' }]
          }
        ]
      },
      {
        label: 'Talent and Performance',
        type: 'submenu',
        children: [
          {
            label: 'Goals',
            value: '/app/goals',
            access: [{ label: 'View', value: 'goals' }]
          },
          {
            label: 'Goal Assignment',
            value: '/app/goal-assignment',
            access: [{ label: 'View', value: 'goal-assignment' }]
          },
          {
            label: 'Appraisal Review',
            value: '/app/appraisal-review',
            access: [{ label: 'View', value: 'appraisal-review' }]
          }
        ]
      },
      {
        label: 'Asset Management',
        type: 'submenu',
        children: [
          {
            label: 'Assets',
            value: '/app/assets',
            access: [{ label: 'View', value: 'asset' }]
          },
          {
            label: 'Asset Transfer',
            value: '/app/asset-transfers',
            access: [{ label: 'View', value: 'asset-transfers' }]
          }
        ]
      }
    ]
  },
  {
    label: 'Time',
    type: 'group',
    children: [
      {
        label: 'Holiday Calendar',
        value: '/app/company-calendar',
        access: [
          { label: 'View', value: 'company-calendar' },
          { label: 'Add', value: 'add-company-calendar' },
          { label: 'Edit', value: 'edit-company-calendar' }
        ]
      },
      {
        label: 'Leave Configuration',
        value: '/app/leave-configuration',
        access: [
          { label: 'View', value: 'leave-configuration' },
          { label: 'Add', value: 'add-leave-configuration' },
          { label: 'Edit', value: 'edit-leave-configuration' }
        ]
      },
      {
        label: 'Leave Balance Generation',
        value: '/app/leave-balance-generate',
        access: [{ label: 'View', value: 'leave-balance-generate' }]
      },
      {
        label: 'Leave Request Generation',
        value: '/app/leave-request-generation',
        access: [{ label: 'View', value: 'leave-request-generation' }]
      },
      {
        label: 'Leave Report',
        value: '/app/leave-report',
        access: [{ label: 'View', value: 'leave-report' }]
      },
      {
        label: 'Annual Leave Cash-Out',
        value: '/app/cash-out-form',
        notInMenu: userInfo?.userType === 'Admin',
        isSelf: userInfo?.userType !== 'Admin',
        access: [{ label: 'Full', value: 'cash-out-form' }]
      },
      {
        label: 'Purchase Leave Form',
        value: '/app/purchase-leave-form',
        notInMenu: userInfo?.userType === 'Admin',
        isSelf: userInfo?.userType !== 'Admin',
        access: [{ label: 'Full', value: 'purchase-leave-form' }]
      },
      {
        label: 'Time Entry',
        value: '/app/time-entries',
        access: [{ label: 'Full', value: 'time-entries' }]
      },
      {
        label: 'Expense Claims',
        value: '/app/expense-claims',
        access: [{ label: 'Full', value: 'expense-claims' }]
      },
      {
        label: 'Time Report',
        value: '/app/time-reports',
        access: [
          { label: 'View', value: 'time-reports', view: 'time-reports-view' },
          { label: 'Full', value: 'time-reports-all' }
        ]
      },
      {
        label: 'Work Schedule',
        value: '/app/work-schedules',
        access: [
          { label: 'View', value: 'work-schedules' },
          { label: 'Add', value: 'add-work-schedules' },
          { label: 'Edit', value: 'edit-work-schedules' }
        ]
      }
    ]
  },
  {
    label: 'Recruitment',
    type: 'group',
    children: [
      {
        label: 'Job Sequence',
        value: '/app/job-sequences',
        access: [
          { label: 'View', value: 'job-sequences' },
          { label: 'Add', value: 'add-job-sequence' },
          { label: 'Edit', value: 'edit-job-sequence' }
        ]
      },
      {
        label: 'Job Posting',
        value: '/app/job-postings',
        access: [
          { label: 'View', value: 'job-postings' },
          { label: 'Add', value: 'add-job-posting' },
          { label: 'Edit', value: 'edit-job-posting' }
        ]
      },
      {
        label: 'Job Position Dashboard',
        value: '/app/applied-job-dashbord',
        access: [{ label: 'View', value: 'applied-job-dashbord' }]
      },
      {
        label: 'Profile Evaluation',
        value: '/app/applied-jobs',
        access: [
          { label: 'View', value: 'applied-jobs' },
          { label: 'Add', value: 'add-applied-job' },
          { label: 'Edit', value: 'edit-applied-job' }
        ]
      }
    ]
  },
  {
    label: 'Documents',
    type: 'group',
    children: [
      // {
      //   label: 'Docu Sign'
      // },
      {
        label: 'Worker Document',
        value: '/app/drive',
        access: [
          { label: 'View', value: 'drive' },
          { label: 'Search', value: 'drive/search' }
        ]
      }
    ]
  }
]
export default MENUS
