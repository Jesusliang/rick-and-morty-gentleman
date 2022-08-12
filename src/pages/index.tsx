import type { NextPage } from "next"
import Head from "next/head"
import { useTrivia } from "src/hooks"
import styles from "../styles/Home.module.css"
import { Box, Button, Spinner, Text } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { TriviaOption } from "src/models"
import TriviaResultModal from "src/components/triviaResultModal/TriviaResultModal"

const Home: NextPage = () => {
  const {
    character,
    loading,
    options,
    selectOption,
    selectedOption,
    resultModalOpen,
    closeModal
  } = useTrivia()

  const handleSelectOption = (option: TriviaOption) => {
    selectOption(option)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Rick And Morty Trivia</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        backgroundImage={`url("/assets/images/bg.png")`}
        minHeight="100vh"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        display="flex"
        flexDir="column"
        alignItems="center"
      >
        <Image
          src="/assets/images/logo.png"
          alt={character?.name}
          width={{
            base: "90vw",
            md: "400px"
          }}
        />
        <Box
          display="flex"
          flexDir="column"
          marginTop={{
            base: "1rem",
            md: "10rem"
          }}
        >
          {loading ? (
            <Spinner
              color="green"
              height={"10rem"}
              width="10rem"
              thickness="1rem"
            />
          ) : (
            <>
              <Box display="flex" justifyContent="center">
                <Image
                  src={character?.image}
                  alt={character?.name}
                  width={{
                    base: "50vw",
                    md: "400px"
                  }}
                  objectFit="contain"
                />
              </Box>
              <Box marginTop="1rem">
                <Text
                  color="white"
                  textAlign="center"
                  fontSize="1.5rem"
                  padding="1rem"
                >
                  Adivina de que planeta es!
                </Text>
                <Box
                  display="flex"
                  flexDir="column"
                  marginTop="1rem"
                  alignItems="center"
                  sx={{
                    "& > *:not(:first-of-type)": {
                      marginTop: ".5rem"
                    }
                  }}
                >
                  {options.map((option, index) => (
                    <Button
                      key={`locationOption-${index}`}
                      colorScheme={
                        selectedOption
                          ? option.correct
                            ? "green"
                            : "red"
                          : "yellow"
                      }
                      onClick={() => handleSelectOption(option)}
                    >
                      {option.name}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <TriviaResultModal
        isOpen={resultModalOpen}
        onClose={() => closeModal()}
        correct={selectedOption?.correct ?? false}
        character={character!}
        correctOption={options.find((opt) => opt.correct)!}
      />
    </div>
  )
}

export default Home
