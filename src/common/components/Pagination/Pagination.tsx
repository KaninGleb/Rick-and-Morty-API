import { Icon } from '@/common/components'
import type { Info } from '@/pages/api'
import s from './Pagination.module.css'

type PaginationPropsType = {
  currentPage: number
  pageInfo: Info
  onPrev: () => void
  onNext: () => void
  colorType?: PaginationType
}

type PaginationType = 'locations' | 'episodes'

export const Pagination = ({ colorType, currentPage, pageInfo, onPrev, onNext }: PaginationPropsType) => {
  const hasPrev = Boolean(pageInfo.prev)
  const hasNext = Boolean(pageInfo.next)
  const totalPages = pageInfo.pages ?? 1

  const backgroundColor = colorType === 'locations' ? 'var(--color-border-accent)' : 'var(--episodes-primary-color)'

  return (
    <div className={s.pagination}>
      <button
        style={ hasPrev ? { backgroundColor } : undefined }
        className={`${s.navButton} ${s.previous} ${!hasPrev && s.disabled}`}
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
        style={ hasNext ? { backgroundColor } : undefined }
        className={`${s.navButton} ${s.next} ${!hasNext && s.disabled}`}
        disabled={!hasNext}
        onClick={onNext}
      >
        Next
        <Icon name="next" width={20} height={20} />
      </button>
    </div>
  )
}
