import {Center, Flex, Box } from "@chakra-ui/react"
import React from "react"
import AppLayout from "../../../components/AppLayout"
import { UserNFTCollection } from "../../../components/collection/UserNFTCollection"
import Image from "next/image"
import yourCollection from "./yourCollection.png"

const CollectionPage = () => {
  return (
<<<<<<< HEAD
    <AppLayout showSidebar={true} title="NFT Collection | MintMe">

      <Flex marginBottom={"4%"} justifyContent="center" alignItems="center">
        <Image src={yourCollection} alt="your collection" />
      </Flex>

=======
    <AppLayout showSidebar={true} title="Collection | Flow Beats">
>>>>>>> 2823bb03f4b58a4bd155d8f11f121f03a8c92fe9
      <UserNFTCollection />
    </AppLayout>
  )
}

CollectionPage.requireAuth = true
export default CollectionPage
