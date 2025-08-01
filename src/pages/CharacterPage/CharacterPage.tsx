import { Link } from 'react-router'
import { EntityListPage } from '@/common/components'
import { useCharacterStore } from '@/stores'
import { PATH } from '@/common/data/paths.ts'
import s from './CharacterPage.module.css'

export const CharacterPage = () => (
  <EntityListPage
    store={useCharacterStore()}
    endpoint={'/character'}
    colorType={'characters'}
    title={'Character Multiverse'}
    placeholder={'Search across characters... (e.g., Rick Sanchez, Morty Smith)'}
    renderList={(characters) => (
      <div className={s.characters}>
        {characters.map((character) => (
          <Link className={s.characterLink} key={character.id} to={`${PATH.Characters}/${character.id}`}>
            <div className={s.card}>
              <img className={s.avatar} src={character.image} alt={`${character.name} avatar`} />
              <div className={s.info}>
                <h3 className={s.name}>{character.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
  />
)
