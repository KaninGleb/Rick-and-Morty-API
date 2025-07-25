import s from './Character.module.css'

export const getStatusClassName = (status: string) => {
  switch (status) {
    case 'Alive':
      return `${s.status} ${s.aliveStatus}`

    case 'Dead':
      return `${s.status} ${s.deadStatus}`

    case 'Unknown':
      return `${s.status} ${s.unknownStatus}`

    default:
      return s.status
  }
}
