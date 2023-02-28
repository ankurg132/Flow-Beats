import { Box, Center, Flex, Heading, VStack } from "@chakra-ui/react"
import { LoginText } from "ui/Home"

import AppLayout from "../../../components/AppLayout"
import { CollectibleCreateForm } from "../../../components/form/CollectibleCreateForm"

const NewItemPage = () => {
  return (
    <>
      <AppLayout title="Mint NFT | Flow Beats">
        <VStack w="full" p="1rem" my="0rem" gap="3rem">
          <Center px={{ base: "0", md: "0rem" }} w="full" flexDirection="column">
            {/* <Center mb={{ base: "1rem", md: "4rem" }} px={{ base: "0", md: "1.4rem" }}>
              <Heading
                as="h3"
                fontWeight="700"
                textAlign="center"
                maxW="600"
                fontSize={{ base: "3xl", md: "5xl" }}
              >
                New Item
              </Heading>
            </Center> */}
            <Flex
              minW={{ base: "100%", md: "800px" }}
              rounded="xl"
              alignItems="center"
              justifyContent="center"
              minH={{ base: "250px" }}
            >
              <CollectibleCreateForm />
            </Flex>
          </Center>
        </VStack>
      </AppLayout>
    </>
  )
}

NewItemPage.requireAuth = true
export default NewItemPage
