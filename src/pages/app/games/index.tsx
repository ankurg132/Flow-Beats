import { Box } from "@chakra-ui/react"
import React from "react"
import AppLayout from "../../../components/AppLayout"

const CollectionPage = () => {
  return (
    <AppLayout showSidebar={true} title="NFT Collection | MintMe">
      games
    </AppLayout>
  )
}

CollectionPage.requireAuth = true
export default CollectionPage
