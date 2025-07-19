import type { EpisodeResults } from '@/pages/api'
import s from './EpisodeCard.module.css'

type Props = {
  episode: EpisodeResults
}

export const EpisodeCard = ({ episode }: Props) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className={s.episodeCard}>
      <div className={s.episodeHeader}>
        <span>{episode.episode}</span>
        <span>{episode.air_date || 'Unknown date'}</span>
      </div>
      <h2 className={s.episodeName}>{episode.name}</h2>
      <div className={s.episodeMeta}>
        <div className={s.metaItem}>
          <span className={s.metaLabel}>Characters:</span>
          <span className={s.metaValue}>{episode.characters.length}</span>
        </div>
        <div className={s.metaItem}>
          <span className={s.metaLabel}>Created:</span>
          <span className={s.metaValue}>{formatDate(episode.created)}</span>
        </div>
      </div>
    </div>
  )
}
