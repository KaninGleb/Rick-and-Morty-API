import { Icon } from '@/common/components'
import type { Info } from '@/pages/api'
import type { PagesColorType } from '@/common'
import s from './Pagination.module.css'

type PaginationPropsType = {
  colorType?: PagesColorType
  currentPage: number
  pageInfo: Info
  onPrev: () => void
  onNext: () => void
}

export const Pagination = ({ colorType, currentPage, pageInfo, onPrev, onNext }: PaginationPropsType) => {
  const hasPrev = Boolean(pageInfo.prev)
  const hasNext = Boolean(pageInfo.next)
  const totalPages = pageInfo.pages ?? 1

  const colorClass = colorType === 'locations' ? s.navLocations : s.navEpisodes

  return (
    <div className={s.pagination}>
      <button
        className={`${s.navButton} ${s.previous} ${colorClass} ${!hasPrev && s.disabled}`}
        disabled={!hasPrev}
        onClick={onPrev}
      >
        <Icon name="previous" width={20} height={20} />
        Previous
      </button>
      <div className={s.pageIndicator}>
        Page {currentPage} of {totalPages}
      </div>
      <button
        className={`${s.navButton} ${s.next} ${colorClass} ${!hasNext && s.disabled}`}
        disabled={!hasNext}
        onClick={onNext}
      >
        Next
        <Icon name="next" width={20} height={20} />
      </button>
    </div>
  )
}
