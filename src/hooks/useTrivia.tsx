import { useToast } from "@chakra-ui/react"
import React, { useCallback, useEffect, useState } from "react"
import { Character, TriviaOption } from "src/models"
import { services } from "src/services"
import { getRandomIntByRange, shuffleArray } from "src/utils"
import useUnmountAsync from "./useUnmountAsync"

const CHARACTERS_COUNT = 288
const LOCATIONS_COUNT = 126

const useTrivia = () => {
  const toast = useToast()
  const { callAsync, loading } = useUnmountAsync()
  const [character, setCharacter] = useState<Character>()
  const [options, setOptions] = useState<TriviaOption[]>([])
  const [selectedOption, setSelectedOption] = useState<TriviaOption>()
  const [resultModalOpen, setResultModalOpen] = useState(false)

  const initialCall = useCallback(async () => {
    const randomCharacterId = getRandomIntByRange(0, CHARACTERS_COUNT)
    const response = await callAsync({
      asyncFn: services.character.getOne(randomCharacterId)
    })
    setCharacter(response)
    console.log(response)
    const options: TriviaOption[] = [
      {
        name: response.location.name,
        correct: true
      }
    ]
    while (options.length < 4) {
      const randomLocationId = getRandomIntByRange(0, LOCATIONS_COUNT)
      const resLocation = await callAsync({
        asyncFn: services.location.getOne(randomLocationId)
      })
      if (!options.find((location) => location.name === resLocation.name))
        options.push({
          name: resLocation.name,
          correct: false
        })
    }
    setOptions(shuffleArray(options))
  }, [callAsync])

  useEffect(() => {
    initialCall()
  }, [initialCall])

  const selectOption = (option: TriviaOption) => {
    setSelectedOption(option)
    setResultModalOpen(true)
  }

  const closeModal = async () => {
    initialCall()
    setResultModalOpen(false)
    setSelectedOption(undefined)
  }

  return {
    loading,
    character,
    options,
    selectOption,
    selectedOption,
    resultModalOpen,
    closeModal
  }
}

export default useTrivia
