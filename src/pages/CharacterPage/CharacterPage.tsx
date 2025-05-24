import { useState, useEffect } from 'react'
import { api, type Results } from '@/pages'
import s from './CharacterPage.module.css'

export const CharacterPage = () => {
  const [characters, setCharacters] = useState<Results[]>([])

  useEffect(() => {
    api.getCharacters().then((res) => {
      setCharacters(res.data.results)
    })
  }, [])

  return (
    <div>
      <h1 className={'pageTitle'}>CharacterPage</h1>
      <div>
        {characters.length && (
          <div className={s.characters}>
            {characters.map((char) => (
              <div key={char.id} className={s.character}>
                <div className={s.characterLink}>{char.name}</div>
                <img src={char.image} alt={`${char.name} avatar`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
