import { type ChangeEvent } from 'react'
import { Icon } from '@/common/components'
import type { PagesColorType } from '@/common'
import s from './PageTitle.module.css'

type HeaderProps = {
  colorType: PagesColorType
  title: string
  searchQuery: string
  placeholder: string
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

export const PageTitle = ({ colorType, title, searchQuery, onSearch, placeholder }: HeaderProps) => {
  const colorClass = {
    characters: s.charactersTitle,
    locations: s.locationsTitle,
    episodes: s.episodesTitle,
  }

  return (
    <div className={s.header}>
      <h1 className={s.title}>
        <span className={`${s.titleMain} ${colorClass[colorType]}`}>Rick and Morty</span>
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
}
