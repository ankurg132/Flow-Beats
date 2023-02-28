import {Center, Flex, Box } from "@chakra-ui/react"
import React from "react"
import AppLayout from "../../../components/AppLayout"
import { UserNFTCollection } from "../../../components/collection/UserNFTCollection"
import Image from "next/image"
import yourCollection from "./yourCollection.png"

const CollectionPage = () => {
  return (
    <AppLayout title="Collection | Flow Beats">

      <Flex marginBottom={"4%"} justifyContent="center" alignItems="center">
        <Image src={yourCollection} alt="your collection" />
      </Flex>

      <UserNFTCollection />
    </AppLayout>
  )
}

CollectionPage.requireAuth = true
export default CollectionPage
