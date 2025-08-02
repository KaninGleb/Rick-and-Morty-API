import { EntityListPage, type EntityPageConfig } from '@/common/components'
import { useLocationStore } from '@/stores'
import { LocationsList } from './LocationsList/LocationsList'
import { API_ENDPOINTS } from '@/common/data/paths.ts'

const locationPageConfig: EntityPageConfig = {
  endpoint: API_ENDPOINTS.Locations,
  title: 'Location Multiverse',
  placeholder: 'Search across locations... (e.g., Earth, Post-Apocalyptic Earth)',
}

export const LocationPage = () => (
  <EntityListPage
    config={locationPageConfig}
    store={useLocationStore()}
    renderList={(locations) => <LocationsList locations={locations} />}
  />
)
