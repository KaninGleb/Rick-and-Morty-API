import type { PagesColorType } from '@/common'
import s from './Loader.module.css'

type LoaderPropsType = {
  colorType: PagesColorType
  text?: string
}

export const Loader = ({ colorType, text = 'Scanning the multiverse...' }: LoaderPropsType) => {
  const colorClass = {
    characters: s.loaderCharacters,
    locations: s.loaderLocations,
    episodes: s.loaderEpisodes,
  }

  return (
    <div className={s.loader}>
      <div className={`${s.loaderAnimation} ${colorClass[colorType]}`}></div>
      <span>{text}</span>
    </div>
  )
}
