import { Box } from "@chakra-ui/react"
import React from "react"
import AppLayout from "../../../components/AppLayout"

const Games = () => {
  return (
    <AppLayout showSidebar={true} title="NFT Collection | MintMe">
      games
    </AppLayout>
  )
}

Games.requireAuth = true
export default Games
