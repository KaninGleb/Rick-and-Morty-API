import { Header } from '@/common'
import { HomePage, CharacterPage, LocationPage, EpisodePage } from '@/pages'

export const App = () => {
  return (
    <div>
      <Header />
      <HomePage />
      <CharacterPage />
      <LocationPage />
      <EpisodePage />
    </div>
  )
}
