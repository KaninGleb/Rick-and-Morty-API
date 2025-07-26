import type { EpisodeResults } from '@/pages/api'
import s from './Character.module.css'

export const getStatusClassName = (status: string) => {
  switch (status) {
    case 'Alive':
      return `${s.status} ${s.aliveStatus}`

    case 'Dead':
      return `${s.status} ${s.deadStatus}`

    case 'Unknown':
      return `${s.status} ${s.unknownStatus}`

    default:
      return s.status
  }
}

export const groupEpisodesBySeason = (episodes: EpisodeResults[]) => {
  const grouped: Record<string, EpisodeResults[]> = {}

  for (const episode of episodes) {
    const match = episode.episode.match(/S(\d{2})E\d{2}/)
    const season = match ? `Season ${+match[1]}` : 'Unknown Season'

    if (!grouped[season]) {
      grouped[season] = []
    }

    grouped[season].push(episode)
  }

  return grouped
}
