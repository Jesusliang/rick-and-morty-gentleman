import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ModalProps,
  Box,
  Text
} from "@chakra-ui/react"
import React from "react"
import { RiErrorWarningFill, RiCheckboxCircleFill } from "react-icons/ri"
import { Character, TriviaOption } from "src/models"

export interface TriviaResultModalProps extends Omit<ModalProps, "children"> {
  onClose: () => void
  correct: boolean
  character: Character
  correctOption: TriviaOption
}

const TriviaResultModal: React.FC<TriviaResultModalProps> = ({
  correct,
  onClose,
  character,
  correctOption,
  ...props
}) => {
  return (
    <Modal
      size={{
        base: "xs",
        md: "md"
      }}
      onClose={() => {}}
      isCentered
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box
            textAlign="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            fontSize="2rem"
            fontWeight="500"
          >
            {correct ? (
              <>
                <RiCheckboxCircleFill fontSize={"5rem"} color="green" />
                <Text color="green">Correcto!</Text>
              </>
            ) : (
              <>
                <RiErrorWarningFill fontSize={"5rem"} color="red" />
                <Text color="red">Incorrecto!</Text>
              </>
            )}
            <Text>{`${character?.name} es del planeta ${correctOption?.name}!`}</Text>
          </Box>
        </ModalBody>
        <ModalFooter justifyContent="center" marginTop="2rem">
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onClose}
            textAlign="center"
            marginRight={0}
          >
            Reiniciar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default TriviaResultModal
