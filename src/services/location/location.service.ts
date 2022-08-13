import { AbortableService } from "./../../hooks/useUnmountAsync"
import axios from "axios"
import { locationAdapter } from "src/adapters"
import { Location } from "src/models"
import { ApiLocation } from "./location.service.types"

const getOne = (locationId: number): AbortableService<Location> => {
  const controller = new AbortController()
  const asyncCall = async () => {
    const response = await axios.get<ApiLocation>(
      `https://rickandmortyapi.com/api/location/${locationId}`,
      {
        signal: controller.signal
      }
    )
    const adaptedResponse = locationAdapter(response.data)
    return adaptedResponse
  }
  return {
    asyncCall,
    controller
  }
}

export const location = {
  getOne
}
