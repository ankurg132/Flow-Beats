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
      
    </AppLayout>
  )
}

export default HomePage
