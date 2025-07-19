import { type ChangeEvent } from 'react'
import { Icon } from '@/common/components'
import s from './PageTitle.module.css'

type HeaderProps = {
  title: string
  searchQuery: string
  placeholder: string
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

export const PageTitle = ({ title, searchQuery, onSearch, placeholder }: HeaderProps) => (
  <div className={s.header}>
    <h1 className={s.title}>
      <span className={s.titleMain}>Rick and Morty</span>
      <span className={s.titleSub}>{title}</span>
    </h1>
    <div className={s.searchContainer}>
      <input
        type={'search'}
        className={s.searchInput}
        placeholder={placeholder}
        value={searchQuery}
        onChange={onSearch}
      />
      <div className={s.searchIcon}>
        <Icon name={'search'} width={20} height={20} />
      </div>
    </div>
  </div>
)
