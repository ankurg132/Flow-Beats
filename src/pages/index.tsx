import AppLayout from "../components/AppLayout"
import { useAuthContext } from "../hooks/useAuthContext"
import { Center, Flex, Heading, Box, VStack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { CollectibleCreateForm } from "../components/form/CollectibleCreateForm"
import { LoginText } from "../ui/Home/LoginText"
import { GetNftSetsQuery } from "../../generated/graphql"
import { useBackendClient } from "../graphql/backendClient"

import { BsChevronDown as ChevronDownIcon } from "react-icons/bs"
import { useRef } from "react"

const HomePage = () => {
  const scrollRef = useRef<HTMLDivElement>()

  return (
    <AppLayout>
      <Center py={{ base: "1rem" }} flexDir="column" position="relative">
        <Box px="1rem">
          <Center m="1.4rem">
            <Heading
              as="h3"
              fontWeight="400"
              textAlign="center"
              maxW="600"
              fontSize={{ base: "3xl", md: "5xl" }}
            >
            </Heading>
          </Center>
          <Flex
            minW={{ base: "280px", md: "600px" }}
            rounded="xl"
            alignItems="center"
            justifyContent="center"
            minH={{ base: "250px" }}
          >
            <CollectibleCreateForm />
          </Flex>

          <LoginText />
        </Box>
        <VStack
          mt="2rem"
          cursor="pointer"
          spacing="0.3rem"
          onClick={() => {
            scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
          }}
        >
          <Text fontWeight="extrabold">LEARN MORE</Text>
          <ChevronDownIcon size="1.2rem" />
        </VStack>
      </Center>
    </AppLayout>
  )
}

export default HomePage
