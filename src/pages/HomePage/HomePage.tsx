import { NavLink } from 'react-router'
import { PATH } from '@/app/App.tsx'

export const HomePage = () => {
  return (
    <div>
      <h1>The Rick and Morty</h1>
      <nav>
        <NavLink to={PATH.Characters}>Characters</NavLink>
        <NavLink to={PATH.Locations}>Locations</NavLink>
        <NavLink to={PATH.Episodes}>Episodes</NavLink>
      </nav>
    </div>
  )
}
