import axios from "axios"
import { characterAdapter } from "src/adapters"
import { Character } from "src/models"
import { ApiCharacter } from "./character.service.types"

export const getAll = async () => {
  // const res = await axios.get<GetCharactersResponse>(
  //   "https://rickandmortyapi.com/api/character"
  // )
  // const adaptedData =
  // return adaptedData
}

export const getOne = async (characterId: number): Promise<Character> => {
  const res = await axios.get<ApiCharacter>(
    `https://rickandmortyapi.com/api/character/${characterId}`
  )
  const adaptedData = characterAdapter(res.data)
  return adaptedData
}

export const character = {
  getAll,
  getOne
}
