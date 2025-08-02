import { EntityListPage, type EntityPageConfig } from '@/common/components'
import { useLocationStore } from '@/stores'
import { LocationsList } from './LocationsList/LocationsList'

const locationPageConfig: EntityPageConfig = {
  endpoint: '/location',
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
