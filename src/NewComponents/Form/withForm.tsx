/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import hoistNonReactStatics from 'hoist-non-react-statics'
import React, { FunctionComponent } from 'react'
import { DefaultValues, FieldValues } from 'react-hook-form'
import * as Yup from 'yup'
import type { FormProviderBag } from './FormProvider'
import FormProvider from './FormProvider'

interface ComponentDecorator<TOwnProps, TMergedProps> {
  (component: FunctionComponent<TMergedProps>): React.ComponentType<TOwnProps>
}

type CompositeComponent<P> = React.ComponentClass<P> | React.FunctionComponent<P>

interface WithFormConfig<Props extends object, Values extends FieldValues = FieldValues> {
  /**
   * Submission handler
   */
  handleSubmit: (values: Values, FormProviderBag: { props: Props } & FormProviderBag<Values>) => void

  /**
   * Map props to the form values
   */
  mapPropsToValues?: (props: Props) => DefaultValues<Values>

  /**
   * A Yup Schema or a function that returns a Yup schema
   */
  validationSchema?: Yup.AnyObjectSchema
}

export default function withForm<OuterProps extends object, Values extends FieldValues>({
  mapPropsToValues = (vanillaProps: OuterProps): DefaultValues<Values> => {
    const val = {} as DefaultValues<Values>

    for (const k in vanillaProps) {
      // eslint-disable-next-line no-prototype-builtins
      if (vanillaProps.hasOwnProperty(k) && typeof vanillaProps[k] !== 'function') {
        // @todo TypeScript fix
        ;(val as any)[k] = vanillaProps[k]
      }
    }

    return val
  },
  ...config
}: WithFormConfig<OuterProps, Values>): ComponentDecorator<OuterProps, OuterProps & FormProviderBag<Values>> {
  return function (
    Component: CompositeComponent<OuterProps & FormProviderBag<Values>>
  ): React.ComponentClass<OuterProps> {
    const componentDisplayName =
      Component.displayName ||
      Component.name ||
      (Component.constructor && Component.constructor.name) ||
      'Component'

    class C extends React.Component<OuterProps, Record<string, unknown>> {
      // eslint-disable-next-line react/static-property-placement
      static displayName = `WithForm(${componentDisplayName})`

      formRef = React.createRef<FormProviderBag<Values>>()

      handleSubmit = (values: Values) =>
        config.handleSubmit(values, {
          props: this.props,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ...this.formRef.current!
        })

      /**
       * Just avoiding a render callback for perf here
       */
      renderFormComponent = (FormProviderBag: FormProviderBag<Values>) => (
        <Component {...this.props} {...FormProviderBag} />
      )

      render() {
        const { children, ...props } = this.props as any

        return (
          <FormProvider
            innerRef={this.formRef}
            {...this.props}
            {...config}
            initialValues={mapPropsToValues(props)}
            onSubmit={this.handleSubmit}>
            {this.renderFormComponent}
          </FormProvider>
        )
      }
    }

    return hoistNonReactStatics(C, Component)
  }
}
