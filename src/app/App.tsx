import { Header } from '@/common'
import { HomePage, LocationPage, EpisodePage } from '@/pages'
import { CharacterPage, Character } from '@/pages/CharacterPage'
import { Routes, Route } from 'react-router'

export const PATH = {
  Home: '/',
  Characters: '/characters',
  Character: '/characters/:id',
  Locations: '/locations',
  Episodes: '/episodes',
} as const

export const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path={PATH.Home} element={<HomePage />} />
        <Route path={PATH.Characters} element={<CharacterPage />} />
        <Route path={PATH.Character} element={<Character />} />
        <Route path={PATH.Locations} element={<LocationPage />} />
        <Route path={PATH.Episodes} element={<EpisodePage />} />
      </Routes>
    </div>
  )
}
