export type BaseResponse<T> = {
  info: Info
  results: T[]
}

export type Info = {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export type CharactersResults = {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Origin
  location: Location
  image: string
  episode: string[]
  url: string
  created: string
}

export type LocationResults = {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export type Origin = {
  name: string
  url: string
}

export type Location = {
  name: string
  url: string
}

export type ErrorType = string | null

export type EpisodeResults = {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}
