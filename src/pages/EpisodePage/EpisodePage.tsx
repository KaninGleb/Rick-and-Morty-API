import { EntityListPage, type EntityPageConfig } from '@/common/components'
import { useEpisodeStore } from '@/stores'
import { EpisodesInfoBar, EpisodeList } from '@/pages'
import { API_ENDPOINTS } from '@/common/data/paths.ts'

const episodePageConfig: EntityPageConfig = {
  endpoint: API_ENDPOINTS.Episodes,
  title: 'Episode Multiverse',
  placeholder: 'Search across dimensions... (e.g., Pilot, Rick Potion)',
}

export const EpisodePage = () => {
  const { info } = useEpisodeStore()

  return (
    <EntityListPage
      config={episodePageConfig}
      store={useEpisodeStore()}
      renderList={(episodes) => (
        <>
          <EpisodesInfoBar totalEpisodesCount={info.count} />
          <EpisodeList episodes={episodes} />
        </>
      )}
    />
  )
}
