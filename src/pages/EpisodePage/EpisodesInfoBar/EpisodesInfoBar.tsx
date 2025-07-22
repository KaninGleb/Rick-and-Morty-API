import type { Info } from '@/pages/api'
import s from './EpisodesInfoBar.module.css'

type EpisodesInfoBarPropsType = {
  totalEpisodesCount: Info['count']
}

export const EpisodesInfoBar = ({ totalEpisodesCount }: EpisodesInfoBarPropsType) => (
  <div className={s.infoBar}>
    <div className={s.infoItem}>
      <span className={s.infoLabel}>Current Dimension:</span>
      <span className={s.infoValue}>C-{Math.floor(Math.random() * 1000)}</span>
    </div>
    <div className={s.infoItem}>
      <span className={s.infoLabel}>Total Episodes:</span>
      <span className={s.infoValue}>{totalEpisodesCount || 'Unknown'}</span>
    </div>
  </div>
)
