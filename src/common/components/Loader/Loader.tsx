import type { PageType } from '@/common'
import s from './Loader.module.css'

type LoaderPropsType = {
  colorType: PageType
  text?: string
}

export const Loader = ({ colorType, text = 'Scanning the multiverse...' }: LoaderPropsType) => {
  const colorClass = {
    character: s.loaderCharacters,
    location: s.loaderLocations,
    episode: s.loaderEpisodes,
  }

  return (
    <div className={s.loader}>
      <div className={`${s.loaderAnimation} ${colorClass[colorType]}`}></div>
      <span>{text}</span>
    </div>
  )
}
