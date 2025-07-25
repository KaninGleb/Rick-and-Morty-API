import { Routes, Route } from 'react-router'
import { Header } from '@/common'
import { HomePage, CharacterPage, Character, LocationPage, Location, EpisodePage } from '@/pages'
import { PATH } from '@/common/data/paths.ts'

export const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path={PATH.Home} element={<HomePage />} />
        <Route path={PATH.Characters} element={<CharacterPage />} />
        <Route path={PATH.Character} element={<Character />} />
        <Route path={PATH.Locations} element={<LocationPage />} />
        <Route path={PATH.Location} element={<Location />} />
        <Route path={PATH.Episodes} element={<EpisodePage />} />
      </Routes>
    </div>
  )
}
