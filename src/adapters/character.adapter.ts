import { Character } from "src/models"
import { ApiCharacter } from "src/services"

export const characterAdapter = (data: ApiCharacter): Character => {
  return {
    id: data.id,
    name: data.name,
    status: data.status,
    gender: data.gender,
    species: data.species
  }
}
