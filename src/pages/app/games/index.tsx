import { Box } from "@chakra-ui/react"
import React from "react"
import AppLayout from "../../../components/AppLayout"
import Link from 'next/link'

const Games = () => {
  return (
    <AppLayout showSidebar={true} title="NFT Collection | MintMe">
      <Link href="/app/games/memorygame">Memory game</Link>
      <br />
      <Link href="/app/games/snake">Snake game</Link>
      <br />
      <Link href="/app/games/tic">tic tac toe</Link>
    </AppLayout>
  )
}

Games.requireAuth = true
export default Games
