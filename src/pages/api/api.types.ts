export type BaseResponse = {
  info: Info
  results: Results[]
}

export type Info = {
  count: number
  pages: number
  next: string
  prev?: string | null
}

export type Results = {
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

export type Origin = {
  name: string
  url: string
}

export type Location = {
  name: string
  url: string
}
