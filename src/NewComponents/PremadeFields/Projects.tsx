import React, { memo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { getProjects } from '../../Actions/UserAction'
import { Field } from '../Form'
import type { TAutoComplete, TOption } from '../Form/types'

type TProject = {
  id: string
} & TOption

type FormValues = {
  project: string
  projectId: string
}

function Projects<Option extends TProject>(props: Partial<TAutoComplete<Option, 'project'>>) {
  const { setValue } = useFormContext<FormValues>()
  const [projects, setProjects] = useState<Option[]>([])
  const [search, setSearch] = useState('')

  const getProjectsOptions = (project: string) => {
    setSearch(project)

    if (!(project.startsWith(search) && projects.length)) {
      getProjects(project ? `name=${project}` : '').then((data) => {
        setProjects(data)
      })
    }
  }

  return (
    <Field
      as="auto-complete"
      name="project"
      label="Project"
      onSearch={getProjectsOptions}
      options={projects}
      onChange={(n, v, o) => {
        if (o?.id) {
          setValue('projectId', o.id)
        }

        setValue(n, v)
      }}
      {...props}
    />
  )
}

export default memo(Projects)
