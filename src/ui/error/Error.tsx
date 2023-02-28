import { Box, Button, Center, Stack, VStack } from "@chakra-ui/react"
import { ErrorProps } from "next/error"
import Link from "next/link"

import { SectionHeader } from "../SectionHeader"
import { useAuthContext } from "../../hooks/useAuthContext"

function Error({ statusCode }: ErrorProps) {
  const authContext = useAuthContext()

  return (
    <>
      <Box
        as="section"
        bg="black"
        bgSize="cover"
        paddingTop="10%"
        position="relative"
        w="100%"
      >
        <VStack>
          <Center>
            <SectionHeader
              standardText=""
              highlightedText={
                statusCode == 404 ? " Uh oh! We couldn't find that page." : "Something went wrong."
              }
            />
          </Center>
          <Center py="8">
            <Stack direction={["column", "row"]}  >
              <Link href="/" passHref>
                <div className="error-button"  >
                  Go Home
                </div>
              </Link>
              {authContext?.session && (
                <div className="error-button-log"  onClick={authContext.signOut}>
                  Log Out
                </div>
              )}
            </Stack>
          </Center>
        </VStack>
      </Box>
    </>
  )
}
export default Error
