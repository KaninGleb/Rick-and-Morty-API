import { logo } from '@/assets'
import { NavLink } from 'react-router'
import { PATH } from '@/app/App.tsx'

export const Header = () => {
  return (
    <div>
      <NavLink to={PATH.Home}>
        <img src={logo} alt="logotype" />
      </NavLink>
      <nav>
        <NavLink to={PATH.Home}>Home</NavLink>
        <NavLink to={PATH.Characters}>Characters</NavLink>
        <NavLink to={PATH.Locations}>Locations</NavLink>
        <NavLink to={PATH.Episodes}>Episodes</NavLink>
      </nav>
    </div>
  )
}
