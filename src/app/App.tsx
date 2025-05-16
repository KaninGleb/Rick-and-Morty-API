import { Header } from '@/common'
import { HomePage, CharacterPage, LocationPage, EpisodePage } from '@/pages'
import { Routes, Route } from 'react-router'

export const PATH = {
  Home: '/',
  Characters: '/characters',
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
        <Route path={PATH.Locations} element={<LocationPage />} />
        <Route path={PATH.Episodes} element={<EpisodePage />} />
      </Routes>
    </div>
  )
}
