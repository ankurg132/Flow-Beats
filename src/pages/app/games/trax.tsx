import { Box } from "@chakra-ui/react"
import React from "react"
import AppLayout from "../../../components/AppLayout"
import Script from "next/script"

const Trax = () => {
  return (
    <AppLayout title="NFT Collection | MintMe">
      <div className="info">
  <div className="points hide">Points: 0</div>
  <div className="level hide">Level: 0</div>
  <div className="clicks hide">Clicks: 0</div>
</div>

<div className="container">
  <div className="col">
    <div className="start">Start</div>
  </div>
</div>

<div id="restart" className="restart hide">Restart Level</div>

<div className="rules">
  <h2>Rules</h2>
  <ol>
    <li>
  		This is a game of matching colors. When three match up they will go away and you will get points. Only three will clear if more than three of the same color touch.
    </li>
    <li>
      Click on a row and the entire row will move to the top of the column.
    </li>
    <li>
      When the blocks are cleared the blocks on the right will move left in their own row.
    </li>
    <li>
      The fewer the clicks made the more points you will gain.
    </li>
  </ol>
  <p>
  	There are a total of 25 levels to play! Have fun!
  </p>
</div>

      {/* <Script
        type="text/javascript"
        src="https://code.jquery.com/jquery-3.2.1.min.js"
        integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
        crossOrigin="anonymous"
        // strategy="beforeInteractive"
        onLoad={() => {
          console.log("Script has loaded")
        }}
      /> */}
      {/* <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/1.0.6/hammer.min.js"
        crossOrigin="anonymous"
        onLoad={() => {
          console.log("Script has loaded")
        }}
        strategy="beforeInteractive"
      /> */}
      <Script
        type="text/javascript"
        src="http://localhost:3000/js/trax.js"
        onLoad={() => {
          console.log("Script has loaded")
        }}
      />
    </AppLayout>
  )
}

// Trax.requireAuth = true
export default Trax
