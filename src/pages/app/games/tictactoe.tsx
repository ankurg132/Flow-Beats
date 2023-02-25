import { Box } from "@chakra-ui/react"
import React from "react"
import AppLayout from "../../../components/AppLayout"
import Script from 'next/script'

const Tictactoe = () => {
  return (
    <AppLayout showSidebar={true} title="NFT Collection | MintMe">
    <div className="content-container">
      <header className="page-header">
        <h1>Spooky Tic-Tac-Toe</h1>
        <h2 id="turn-notice">It's 👻's turn.</h2>
      </header>
      <div className="content-flex">
        <div className="board" id="board">
          <div data-index="1" className="tile"></div>
          <div data-index="2" className="tile"></div>
          <div data-index="3" className="tile"></div>
          <div data-index="4" className="tile"></div>
          <div data-index="5" className="tile"></div>
          <div data-index="6" className="tile"></div>
          <div data-index="7" className="tile"></div>
          <div data-index="8" className="tile"></div>
          <div data-index="9" className="tile"></div>
          <div id="strike" className="strike"></div>
        </div>
        <div id="game-over-area" className="game-over-area hidden">
          <h2 id="game-over-text"></h2>
          <button id="play-again">Play Again</button>
        </div>
      </div>
    </div>
    <Script
        src="http://localhost:3000/js/tictactoe.js"
        onLoad={() => {
          console.log('Script has loaded')
        }}
      />
    </AppLayout>
  )
}

Tictactoe.requireAuth = true
export default Tictactoe


