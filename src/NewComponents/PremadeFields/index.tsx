import { SelectValue } from 'antd/lib/select'
import { FieldLoader } from '../../Components/LoaderBox/Loader'
import type { Props as ClientsProps, TClient } from './Clients'
import { LocationProps } from './Locations'
import type { Props as MaterialsProps, TMaterials } from './Materials'
import { WarehouseProps } from './Warehouses'

const Clients = FieldLoader(() => import('./Clients')) as <
  Option extends TClient = TClient,
  V extends SelectValue = SelectValue,
  TFieldName extends string = string
>(
  props: ClientsProps<Option, V, TFieldName>
) => JSX.Element
const Materials = FieldLoader(() => import('./Materials')) as <
  Option extends TMaterials = TMaterials,
  TFieldName extends string = string,
  TTextArea extends boolean = never
>(
  props: MaterialsProps<Option, TFieldName, TTextArea>
) => JSX.Element
const Warehouses = FieldLoader(() => import('./Warehouses')) as <
  Option extends TClient = TClient,
  TFieldName extends string = string
>(
  props: WarehouseProps<Option, TFieldName>
) => JSX.Element
const Locations = FieldLoader(() => import('./Locations')) as <
  Option extends TClient = TClient,
  TFieldName extends string = string
>(
  props: LocationProps<Option, TFieldName>
) => JSX.Element
const Racks = FieldLoader(() => import('./Racks'))
const SalesPersons = FieldLoader(() => import('./SalesPersons'))
const Accounts = FieldLoader(() => import('./Accounts'))
const SetupOptions = FieldLoader(() => import('./SetupOptions'))
const StockLocations = FieldLoader(() => import('./StockLocations'))
const Templates = FieldLoader(() => import('./Templates'))
const Projects = FieldLoader(() => import('./Projects'))

export {
  Clients,
  Materials,
  Warehouses,
  Locations,
  Racks,
  SalesPersons,
  Accounts,
  SetupOptions,
  StockLocations,
  Templates,
  Projects
}
