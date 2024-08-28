import { FieldLoader } from '../LoaderBox/Loader'

const Clients = FieldLoader(() => import('./Clients'))
const Materials = FieldLoader(() => import('./Materials'))
const Warehouses = FieldLoader(() => import('./Warehouses'))
const Locations = FieldLoader(() => import('./Locations'))
const Racks = FieldLoader(() => import('./Racks'))
const SalesPersons = FieldLoader(() => import('./SalesPersons'))
const Accounts = FieldLoader(() => import('./Accounts'))
const SetupOptions = FieldLoader(() => import('./SetupOptions'))
const StockLocations = FieldLoader(() => import('./StockLocations'))

export {
  Clients,
  Materials,
  Warehouses,
  Locations,
  Racks,
  SalesPersons,
  Accounts,
  SetupOptions,
  StockLocations
}
