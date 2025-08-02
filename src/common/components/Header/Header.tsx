import { useLocation, NavLink } from 'react-router'
import type { CSSProperties } from 'react'
import { PATH } from '@/common/data/paths.ts'
import { logo } from '@/assets'
import { getActiveColorVar } from '@/common'
import s from './Header.module.css'

const navItems = [
  { path: PATH.Home, label: 'Home' },
  { path: PATH.Characters, label: 'Characters' },
  { path: PATH.Locations, label: 'Locations' },
  { path: PATH.Episodes, label: 'Episodes' },
]

export const Header = () => {
  const location = useLocation()
  const activeColor = getActiveColorVar(location.pathname)

  const isHome = location.pathname === PATH.Home

  const headerStyle = {
    '--active-nav-color': activeColor,
  } as CSSProperties

  const handleNavLinkClick = (path: string) => {
    if (location.pathname.startsWith(path)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <header className={`${s.header} ${isHome ? s.headerHidden : ''}`} style={headerStyle}>
      <div className={s.container}>
        <NavLink to={PATH.Home} className={s.logoLink} aria-label={'Go to home page'}>
          <img className={s.logo} src={logo} alt={'Site logo'} />
        </NavLink>
        <nav role={'navigation'} aria-label={'Main navigation'}>
          <ul className={s.navList}>
            {navItems.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  data-label={label}
                  onClick={() => handleNavLinkClick(path)}
                  className={({ isActive }) => `${s.headerLink} ${isActive ? s.activeLink : ''}`}
                >
                  <span className={s.labelText}>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
