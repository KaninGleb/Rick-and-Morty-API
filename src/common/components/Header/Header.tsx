import { NavLink } from 'react-router'
import { logo } from '@/assets'
import { PATH } from '@/common/data/paths.ts'
import s from './Header.module.css'

const navItems = [
  { path: PATH.Home, label: 'Home' },
  { path: PATH.Characters, label: 'Characters' },
  { path: PATH.Locations, label: 'Locations' },
  { path: PATH.Episodes, label: 'Episodes' },
]

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <NavLink to={PATH.Home} className={s.logoLink} aria-label={'Go to home page'}>
          <img className={s.logo} src={logo} alt={'Site logo'} />
        </NavLink>
        <nav role={'navigation'} aria-label={'Main navigation'}>
          <ul className={s.navList}>
            {navItems.map(({ path, label }) => (
              <li key={path}>
                <NavLink to={path} className={({ isActive }) => `${s.headerLink} ${isActive ? s.activeLink : ''}`}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
