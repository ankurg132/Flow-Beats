import { Box } from "@chakra-ui/react"
import React from "react"
import AppLayout from "../../../components/AppLayout"
import Script from "next/script"

const Trax = () => {
  return (
    <AppLayout title="NFT Collection | MintMe">
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
