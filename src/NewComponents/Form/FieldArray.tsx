import clsx from 'clsx'
import { FunctionComponent, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { ArrayPath, Control, FieldValues, get, useFieldArray, useFormContext } from 'react-hook-form'
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Index,
  List,
  ListRowProps,
  WindowScroller
} from 'react-virtualized'
import 'react-virtualized/styles.css'
import Button from '../../Components/Button'
import ErrorMessage from './ErrorMessage'
import { FormProviderBag } from './FormProvider'

export type FieldArrayChild<
  TFieldValues extends FieldValues,
  TAdditionalValues extends FieldValues = FieldValues
> = FunctionComponent<
  {
    i: number
    setValue: FormProviderBag<TFieldValues>['setValue']
    control: Control<TFieldValues>
  } & TAdditionalValues
>

export type TFieldArray<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>,
  TAdditionalValues extends FieldValues = FieldValues
> = {
  name: TFieldArrayName
  label?: string
  children: FieldArrayChild<TFieldValues, TAdditionalValues>
  defaultValues?: TFieldValues[TFieldArrayName][number]
  additionalValues?: TAdditionalValues
  hideAdd?: boolean
  showRemove?: boolean
  title?: ReactNode
  addRight?: boolean
  noBorder?: boolean
}

type TRendererProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>,
  TAdditionalValues extends FieldValues = FieldValues
> = {
  renderProps: ListRowProps
  fieldProps: {
    setRowHeight?: (index: number, size: number) => void
    remove: (index: number) => void
  } & Pick<
    TFieldArray<TFieldValues, TFieldArrayName, TAdditionalValues>,
    'additionalValues' | 'children' | 'title' | 'showRemove' | 'noBorder' | 'name'
  >
}

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 200
})

function Renderer<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>,
  TAdditionalValues extends FieldValues = FieldValues
>({
  fieldProps: { name, setRowHeight, title, children, additionalValues, remove, showRemove, noBorder },
  renderProps: { index: i, isScrolling, isVisible, style, key, parent }
}: TRendererProps<TFieldValues, TFieldArrayName, TAdditionalValues>) {
  const rowRef = useRef<HTMLDivElement>(null)
  const {
    setValue,
    control,
    formState: { isSubmitting, errors }
  } = useFormContext<TFieldValues>()

  const Comp = useMemo(() => children, [])

  delete style.height

  const listener = () => {
    setTimeout(() => {
      if (rowRef.current) {
        setRowHeight?.(i, rowRef.current.clientHeight + 10)
      }
    }, 1)
  }

  useEffect(() => {
    listener()
  }, [isSubmitting, get(errors, `${name}.${i}`)])

  useEffect(() => {
    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  }, [])

  const className = clsx('row list-field', noBorder && 'border-0', {
    rowScrolling: isScrolling,
    isVisible
  })

  return (
    <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={i}>
      <div key={key} ref={rowRef} className={className} style={style}>
        <div style={{ width: '100%' }}>
          {title}
          <Comp
            {...{
              i,
              setValue,
              control,
              ...(additionalValues as TAdditionalValues)
            }}
          />
        </div>
        {showRemove && (
          <div className="remove-column pl-2" style={{ position: 'absolute', right: -30 }}>
            <Button variant="primary" className="mt-4 btn-glow delete-field" onClick={() => remove(i)}>
              <i className="flaticon-delete-2 mr-0" />
            </Button>
          </div>
        )}
      </div>
    </CellMeasurer>
  )
}

function FieldArray<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>,
  TAdditionalValues extends FieldValues = FieldValues
>({
  name,
  label,
  defaultValues,
  additionalValues,
  hideAdd,
  showRemove,
  children,
  title,
  addRight,
  noBorder
}: TFieldArray<TFieldValues, TFieldArrayName, TAdditionalValues>) {
  const listRef = useRef<List>(null)
  const [rowHeights, setRowHeights] = useState<{ [index: string]: number } | null>(null)

  const { fields, append, remove } = useFieldArray<TFieldValues, TFieldArrayName>({ name })

  function getRowHeight({ index }: Index): number {
    return rowHeights?.[index] || 200
  }

  function setRowHeight(index: number, size: number) {
    setRowHeights((rowHeights) => ({ ...rowHeights, [index]: size }))
    listRef.current?.recomputeRowHeights()
  }

  return (
    <>
      <WindowScroller scrollElement={window}>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <div className="WindowScrollerWrapper">
            <AutoSizer disableHeight>
              {({ width }) => (
                <div ref={(el) => registerChild(el)}>
                  <List
                    ref={listRef}
                    containerStyle={{
                      overflow: 'inherit'
                    }}
                    autoHeight
                    className="List"
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    overscanRowCount={4}
                    rowCount={fields.length}
                    rowHeight={getRowHeight}
                    deferredMeasurementCache={cache}
                    rowRenderer={(renderProps) => (
                      <Renderer<TFieldValues, TFieldArrayName, TAdditionalValues>
                        key={renderProps.key}
                        {...{
                          renderProps,
                          fieldProps: {
                            name,
                            setRowHeight,
                            title,
                            children,
                            additionalValues,
                            remove,
                            showRemove: showRemove && fields.length !== 1,
                            noBorder
                          }
                        }}
                      />
                    )}
                    scrollTop={scrollTop}
                    width={width}
                  />
                </div>
              )}
            </AutoSizer>
          </div>
        )}
      </WindowScroller>
      {!hideAdd && defaultValues && (
        <Button
          style={{
            position: 'absolute',
            bottom: -18,
            zIndex: 1,
            ...(addRight && { right: -25, bottom: -10 })
          }}
          success
          onClick={() => append(defaultValues)}>
          <i className="flaticon-plus" /> Add
        </Button>
      )}
      <ErrorMessage
        name={name}
        render={(error) => {
          if (typeof error === 'string') {
            return error.replace(name, label || name)
          }

          return null
        }}
      />
    </>
  )
}

export default FieldArray
