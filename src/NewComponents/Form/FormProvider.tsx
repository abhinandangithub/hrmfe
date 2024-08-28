import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import _ from 'lodash'
import React, { ReactNode, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react'
import {
  DefaultValues,
  FieldValues,
  FormProvider as HookFormProvider,
  Path,
  PathValue,
  SubmitHandler,
  useForm,
  UseFormReturn
} from 'react-hook-form'
import * as Yup from 'yup'

export type FormProviderBag<T extends FieldValues> = {
  submitForm: (e?: React.FormEvent<HTMLFormElement>) => void
  validateForm: () => Promise<Yup.ValidationError | Record<string, unknown>>
} & UseFormReturn<T>

export interface FormProviderProps<T extends FieldValues> {
  className?: string
  innerRef?: Ref<FormProviderBag<T>>
  initialValues: DefaultValues<T>
  onSubmit: SubmitHandler<T>
  children: ((FormProviderBag: FormProviderBag<T>) => ReactNode) | ReactNode
  validationSchema?: Yup.AnyObjectSchema
}

export default function FormProvider<T extends FieldValues>({
  className,
  innerRef,
  children,
  onSubmit,
  initialValues,
  validationSchema
}: FormProviderProps<T>) {
  const ref = useRef<HTMLDivElement>(null)
  const methods = useForm<T>({
    mode: 'all',
    defaultValues: initialValues,
    resolver: validationSchema && yupResolver(validationSchema)
  })
  const [form, setForm] = useState<HTMLFormElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      const newForm = ref.current.querySelector('form')
      setForm(newForm)
    }
  }, [ref.current])

  const values = methods.getValues()

  useEffect(() => {
    const validate = async () => {
      const errorFields: string[] = []

      await validationSchema?.validate(methods.getValues(), { abortEarly: false }).catch((err) => {
        err.inner.forEach((fieldError: Yup.CreateErrorOptions) => {
          if (fieldError.path) {
            errorFields.push(fieldError.path?.replace(/\[(\d+)\]\./g, '.$1.'))
          }
        })
      })

      methods.setValue('__errorFields' as Path<T>, errorFields as PathValue<T, Path<T>>)
    }

    validate()
  }, [validationSchema, values, methods.formState.isSubmitting])

  useEffect(() => {
    const resetListener = () => {
      methods.reset(initialValues)
    }

    form?.addEventListener('submit', (e) => submitForm(e))
    form?.addEventListener('reset', resetListener)

    return () => {
      form?.removeEventListener('submit', submitForm)
      form?.removeEventListener('reset', resetListener)
    }
  }, [form])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitForm = (e?: any) => {
    methods.handleSubmit(onSubmit)(e)
  }

  const validateForm = async () => {
    try {
      await validationSchema?.validateSync(methods.getValues(), { abortEarly: false })

      return {}
    } catch (error) {
      return error as Yup.ValidationError
    }
  }

  useImperativeHandle(innerRef, () => ({ ...methods, submitForm, validateForm }))

  return (
    <HookFormProvider {...methods}>
      <div ref={ref} className={clsx(className)}>
        {_.isFunction(children) ? children({ ...methods, submitForm, validateForm }) : children}
      </div>
    </HookFormProvider>
  )
}
