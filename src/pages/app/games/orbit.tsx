import { Box } from "@chakra-ui/react"
import React from "react"
import AppLayout from "../../../components/AppLayout"
import Script from "next/script"

const Orbit = () => {
  return (
    <AppLayout showSidebar={true} title="NFT Collection | MintMe">
      <canvas id="canvas"></canvas>
        <Script src="https://cdn.jsdelivr.net/processing.js/1.4.8/processing.min.js"></Script>
        <Script
        type="text/javascript"
        src="http://localhost:3000/js/orbit.js"
        onLoad={() => {
          console.log("Script has loaded")
        }}
      />
    </AppLayout>
  )
}

Orbit.requireAuth = true
export default Orbit