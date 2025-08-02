import { useEpisodeStore } from '@/stores'
import { EntityListPage } from '@/common/components'
import { EpisodesInfoBar, EpisodeList } from '@/pages'

export const EpisodePage = () => {
  const { info } = useEpisodeStore()

  return (
    <EntityListPage
      pageKey={'episode'}
      store={useEpisodeStore()}
      endpoint={'/episode'}
      colorType={'episodes'}
      title={'Episode Multiverse'}
      placeholder={'Search across dimensions... (e.g., Pilot, Rick Potion)'}
      renderList={(episodes) => (
        <>
          <EpisodesInfoBar totalEpisodesCount={info.count} />
          <EpisodeList episodes={episodes} />
        </>
      )}
    />
  )
}
