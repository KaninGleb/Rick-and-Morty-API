import { PATH } from '@/common/data/paths.ts'

export const getActiveColorVar = (pathname: string): string => {
  switch (true) {
    case pathname.startsWith(PATH.Characters):
      return 'var(--characters-color-primary)'

    case pathname.startsWith(PATH.Locations):
      return 'var(--locations-color-primary)'

    case pathname.startsWith(PATH.Episodes):
      return 'var(--episodes-primary-color)'

    default:
      return 'var(--slate-800)'
  }
}
