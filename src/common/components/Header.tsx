import { logo } from '@/assets'
import { NavLink } from 'react-router'
import { PATH } from '@/app/App.tsx'
import s from './Header.module.css'

export const Header = () => {
  return (
    <div className={s.container}>
      <NavLink to={PATH.Home}>
        <img className={s.logo} src={logo} alt="logotype" />
      </NavLink>
      <nav>
        <NavLink to={PATH.Home} className={s.headerLink}>
          Home
        </NavLink>
        <NavLink to={PATH.Characters} className={s.headerLink}>
          Characters
        </NavLink>
        <NavLink to={PATH.Locations} className={s.headerLink}>
          Locations
        </NavLink>
        <NavLink to={PATH.Episodes} className={s.headerLink}>
          Episodes
        </NavLink>
      </nav>
    </div>
  )
}
