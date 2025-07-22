import { Icon } from '@/common/components'
import type { Info } from '@/pages/api'
import s from './Pagination.module.css'

type PaginationPropsType = {
  currentPage: number
  pageInfo: Info
  onPrev: () => void
  onNext: () => void
}

export const Pagination = ({ currentPage, pageInfo, onPrev, onNext }: PaginationPropsType) => {
  const hasPrev = Boolean(pageInfo.prev)
  const hasNext = Boolean(pageInfo.next)
  const totalPages = pageInfo.pages ?? 1

  return (
    <div className={s.pagination}>
      <button className={`${s.navButton} ${s.previous} ${!hasPrev && s.disabled}`} disabled={!hasPrev} onClick={onPrev}>
        <Icon name="previous" width={20} height={20} />
        Previous
      </button>
      <div className={s.pageIndicator}>
        Page {currentPage} of {totalPages}
      </div>
      <button className={`${s.navButton} ${s.next} ${!hasNext && s.disabled}`} disabled={!hasNext} onClick={onNext}>
        Next
        <Icon name="next" width={20} height={20} />
      </button>
    </div>
  )
}
