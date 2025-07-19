import type { EpisodeResults } from '@/pages/api'
import { EpisodeCard } from '@/pages'
import s from './EpisodeList.module.css'

type Props = {
  episodes: EpisodeResults[]
}

export const EpisodeList = ({ episodes }: Props) => (
  <div className={s.episodesList}>
    {episodes.map((ep) => (
      <EpisodeCard key={ep.id} episode={ep} />
    ))}
  </div>
)
