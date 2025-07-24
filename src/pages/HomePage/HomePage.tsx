import { NavLink } from 'react-router'
import { PATH } from '@/common/data/paths.ts'
import s from './HomePage.module.css'

export const HomePage = () => {
  return (
    <div className={s.mainWrapper}>
      <h1 className={`pageTitle ${s.title}`}>The Rick and Morty</h1>
      <nav className={s.linkWrapper}>
        <NavLink to={PATH.Characters} className={'linkButton'}>
          Characters
        </NavLink>
        <NavLink to={PATH.Locations} className={'linkButton'}>
          Locations
        </NavLink>
        <NavLink to={PATH.Episodes} className={'linkButton'}>
          Episodes
        </NavLink>
      </nav>
    </div>
  )
}
