import { useEffect, useState } from 'react'
import { type Info, type Results } from '@/pages'
import { instance } from '@/common'
import s from './CharacterPage.module.css'

export const CharacterPage = () => {
  const [characters, setCharacters] = useState<Results[]>([])

  const [info, setInfo] = useState<Info>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  })

  const fetchData = (url: string | null) => {
    if (!url) return
    instance.get(url).then((res) => {
      setCharacters(res.data.results)
      setInfo(res.data.info)
    })
  }

  useEffect(() => {
    fetchData('/character')
  }, [])

  const nextPageHandler = () => {
    fetchData(info.next)
  }

  const previousPageHandler = () => {
    fetchData(info.prev)
  }

  return (
    <div className={'pageContainer'}>
      <h1 className={'pageTitle'}>CharacterPage</h1>
      {characters.length && (
        <>
          {
            <div className={s.characters}>
              {characters.map((character) => {
                return (
                  <div key={character.id} className={s.character}>
                    <div className={s.characterLink}>{character.name}</div>
                    <img src={character.image} alt={`${character.name} avatar`} />
                  </div>
                )
              })}
            </div>
          }
          <div className={s.buttonContainer}>
            <button className="linkButton" disabled={info.prev === null} onClick={previousPageHandler}>
              Назад
            </button>
            <button className="linkButton" disabled={info.next === null} onClick={nextPageHandler}>
              Вперед
            </button>
          </div>
        </>
      )}
    </div>
  )
}
