export interface ApiCharactersInfo {
  count: number
  pages: number
  next: string
  prev: null
}

export interface ApiCharacter {
  id: number
  name: string
  status: GetCharactersStatus
  species: GetCharacterSpecies
  type: string
  gender: GetCharactersGender
  origin: GetCharactersLocation
  location: GetCharactersLocation
  image: string
  episode: string[]
  url: string
  created: string
}

export enum GetCharactersGender {
  Female = "Female",
  Male = "Male",
  Unknown = "unknown"
}

export interface GetCharactersLocation {
  name: string
  url: string
}

export enum GetCharacterSpecies {
  Alien = "Alien",
  Human = "Human"
}

export enum GetCharactersStatus {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown"
}
