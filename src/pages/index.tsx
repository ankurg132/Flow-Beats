import AppLayout from "../components/AppLayout"
import { useAuthContext } from "../hooks/useAuthContext"
import { Center, Flex, Heading, Box, VStack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { CollectibleCreateForm } from "../components/form/CollectibleCreateForm"
import { LoginText } from "../ui/Home/LoginText"
import { GetNftSetsQuery } from "../../generated/graphql"
import { useBackendClient } from "../graphql/backendClient"
import Image from "next/image"
import homebg from "./homebbg.png"
import Link from "next/link"

import { BsChevronDown as ChevronDownIcon } from "react-icons/bs"
import { useRef } from "react"

const HomePage = () => {
  const scrollRef = useRef<HTMLDivElement>()

  return (
    <AppLayout title="Flow Beats">
      <div className="front-page-container">
        <div className="left-front">
          <h1>The Ultimate Entertainment</h1>
          <p>Introducing the revoluionary way to play games based <br/> on P2E model with in-game rewards. Experience
          the <br /> thrill  of Play-to-Earn NFT Gaming with flow beats.</p>
          <div className="home-button-container">
            <Link href="/app/games">
              <button>Try us: </button>
            </Link>
            {/* <Link href="/app/collection">
              <button>Collection</button>
            </Link> */}
          </div>
        </div>
        <div className="right-front">
          <Image src={homebg} alt="hero" width={500} height={550} />
        </div>
      </div>
    </AppLayout>
  )
}

export default HomePage
