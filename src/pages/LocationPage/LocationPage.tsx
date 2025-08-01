import { EntityListPage } from '@/common/components'
import { useLocationStore } from '@/stores'
import { LocationsList } from './LocationsList/LocationsList'

export const LocationPage = () => (
  <EntityListPage
    store={useLocationStore()}
    endpoint={'/location'}
    colorType={'locations'}
    title={'Location Multiverse'}
    placeholder={'Search across locations... (e.g., Earth, Post-Apocalyptic Earth)'}
    renderList={(locations) => <LocationsList locations={locations} />}
  />
)
