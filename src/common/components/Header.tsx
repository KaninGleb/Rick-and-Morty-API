import { logo } from '@/assets'
import { NavLink } from 'react-router'
import { PATH } from '@/app/App.tsx'

export const Header = () => {
  return (
    <div>
      <img src={logo} alt="logotype" />
      <nav>
        <NavLink to={PATH.Home}>Home</NavLink>
        <NavLink to={PATH.Characters}>Characters</NavLink>
        <NavLink to={PATH.Locations}>Locations</NavLink>
        <NavLink to={PATH.Episodes}>Episodes</NavLink>
      </nav>
    </div>
  )
}
