import { CharacterLocation } from "./aggregates/characterLocation.model"
import { CharacterGender } from "./aggregates/characterGender.model"
import { CharacterStatus } from "./aggregates/characterStatus.model"

export interface Character {
  id: number
  name: string
  status: CharacterStatus
  species: string
  gender: CharacterGender
  image: string
  location: CharacterLocation
}
