import axios from "axios"
import { characterAdapter } from "src/adapters"
import { AbortableService } from "src/hooks/useUnmountAsync"
import { Character } from "src/models"
import { ApiCharacter } from "./character.service.types"

export const getAll = async () => {
  // const res = await axios.get<GetCharactersResponse>(
  //   "https://rickandmortyapi.com/api/character"
  // )
  // const adaptedData =
  // return adaptedData
}

export const getOne = (characterId: number): AbortableService<Character> => {
  const controller = new AbortController()
  const asyncCall = async () => {
    const res = await axios.get<ApiCharacter>(
      `https://rickandmortyapi.com/api/character/${characterId}`,
      {
        signal: controller.signal
      }
    )
    const adaptedData = characterAdapter(res.data)
    return adaptedData
  }
  return {
    asyncCall,
    controller: controller
  }
}

export const character = {
  getAll,
  getOne
}
