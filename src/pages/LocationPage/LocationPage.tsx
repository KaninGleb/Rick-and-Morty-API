import { useEffect, useState } from 'react'
import { api, type LocationResults } from '@/pages/api'
import s from './LocationPage.module.css'

export const LocationPage = () => {
  const [locations, setLocations] = useState<LocationResults[]>([])

  useEffect(() => {
    api.getLocations().then((res) => {
      setLocations(res.data.results)
    })
  }, [])

  return (
    <div className={'pageContainer'}>
      <div>
        <h1 className={`pageTitle ${s.title}`}>LocationPage</h1>
        <div>
          {locations.map((l) => {
            return (
              <div key={l.id}>
                <ul>
                  <li>
                    Location name: <b>{l.name}</b>
                  </li>
                  <li>
                    Location type: <b>{l.type}</b>
                  </li>
                  <li>
                    Measurement where the location is: <b>{l.dimension}</b>
                  </li>
                  <li>
                    Number of characters seen in this location: <b>{l.residents.length}</b>
                  </li>
                </ul>
                <hr />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
