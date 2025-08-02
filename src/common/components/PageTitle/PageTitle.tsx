import { type ChangeEvent } from 'react'
import { Icon } from '@/common/components'
import type { PageType } from '@/common'
import s from './PageTitle.module.css'

type HeaderProps = {
  colorType: PageType
  title: string
  searchQuery: string
  placeholder: string
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

export const PageTitle = ({ colorType, title, searchQuery, onSearch, placeholder }: HeaderProps) => {
  const titleColorClass = {
    character: s.charactersTitle,
    location: s.locationsTitle,
    episode: s.episodesTitle,
  }

  const inputColorClass = {
    character: s.charactersSearchInput,
    location: s.locationsSearchInput,
    episode: s.episodesSearchInput,
  }

  return (
    <div className={s.header}>
      <h1 className={s.title}>
        <span className={`${s.titleMain} ${titleColorClass[colorType]}`}>Rick and Morty</span>
        <span className={s.titleSub}>{title}</span>
      </h1>
      <div className={s.searchContainer}>
        <input
          type={'search'}
          className={`${s.searchInput} ${inputColorClass[colorType]}`}
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
