import axios from "axios"
import { locationAdapter } from "src/adapters"
import { Location } from "src/models"
import { ApiLocation } from "./location.service.types"

const getOne = async (locationId: number): Promise<Location> => {
  const response = await axios.get<ApiLocation>(
    `https://rickandmortyapi.com/api/location/${locationId}`
  )
  const adaptedResponse = locationAdapter(response.data)
  return adaptedResponse
}

export const location = {
  getOne
}
