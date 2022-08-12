import { Location } from "src/models"
import { ApiLocation } from "src/services"

export const locationAdapter = (data: ApiLocation): Location => {
  return {
    id: data.id,
    dimension: data.dimension,
    name: data.name,
    residents: data.residents,
    type: data.type
  }
}
