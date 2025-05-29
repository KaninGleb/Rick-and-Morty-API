import { type ChangeEvent, useEffect, useState } from 'react'
import type { Results, Info, ErrorType } from '@/pages/api'
import { instance } from '@/common'
import { Link } from 'react-router'
import s from './CharacterPage.module.css'

export const CharacterPage = () => {
  const [characters, setCharacters] = useState<Results[]>([])

  const [info, setInfo] = useState<Info>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  })

  const [error, setError] = useState<ErrorType>(null)

  const fetchData = (url: string | null) => {
    if (!url) return
    instance
      .get(url)
      .then((res) => {
        setCharacters(res.data.results)
        setInfo(res.data.info)
        setError(null)
      })
      .catch((err) => {
        setError(err.response.data.error)
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

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    fetchData(`/character?name=${value}`)
  }

  return (
    <div className={'pageContainer'}>
      <h1 className={'pageTitle'}>CharacterPage</h1>
      <input type={'search'} className={s.search} onChange={searchHandler} placeholder={'Search...'} />
      {error && <div className="errorMessage">{error}</div>}
      {!error && characters.length && (
        <>
          {
            <div className={s.characters}>
              {characters.map((character) => {
                return (
                  <div key={character.id} className={s.character}>
                    <Link to={`/characters/${character.id}`} className={s.characterLink}>
                      {character.name}
                    </Link>
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
