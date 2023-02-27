import React from "react"
import { SimpleGrid, Spinner, Button, Tooltip, Box, Center, useDisclosure } from "@chakra-ui/react"
import {
  FiTool as WalletStatusIcon,
  FiPackage as WalletItemsIcon,
  FiAlertCircle as WalletDetailsIcon,
  FiUserCheck as WalletOwnerIcon,
} from "react-icons/fi"
import {
  UserNftsDocument,
  UserNftsQuery,
  UserNftsQueryVariables,
  WalletState,
} from "../../../generated/graphql"
import toast from "react-hot-toast"
import { backendClient } from "../../graphql/backendClient"
import { WalletGridBox } from "./WalletGridBox"
import { useRouter } from "next/router"
import posthog from "posthog-js"
import { WalletSwitcherModal } from "ui/Modal/WalletSwitcherModal"
import { useGraphQLQuery } from "graphql/useGraphQLQuery"

const styles = `
.card {
 width: 190px;
 height: 254px;
 background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
 border-radius: 20px;
 transition: all .3s;
}

.card2 {
 width: 190px;
 height: 254px;
 background-color: #1a1a1a;
 border-radius:;
 transition: all .2s;
}

.card2:hover {
 transform: scale(0.98);
 border-radius: 20px;
}

.card:hover {
 box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30);
}
`


export interface WalletDetailsProps {
  walletAddress: string
  walletStatus: string
  walletItems: number
  isLoading: boolean
  walletOwnerEmail: string
}

export const WalletDetails = (props: WalletDetailsProps) => {
  const { walletAddress, walletStatus, walletItems, walletOwnerEmail, isLoading = false } = props
  const router = useRouter()
  const disclosure = useDisclosure()
  const { nfts } = useGraphQLQuery<UserNftsQuery, UserNftsQueryVariables>({
    query: UserNftsDocument,
  })

  if (walletStatus == WalletState.CreationFailed) {
    toast.error(
      "There was an error creating your wallet. Please Click the retry button to try again"
    )
  }

  return (
    <>
      {isLoading ? (
        <Center w="full">
          <Spinner size="lg" />
        </Center>
      ) : (
        <>
          <WalletSwitcherModal disclosure={disclosure} />
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="4" minW={"280px"} p="1rem" backgroundColor="dark">
            <Box cursor="pointer">
              <WalletGridBox
                description={walletAddress}
                icon={WalletDetailsIcon}
                title={"Wallet Address"}
                onClick={() => {
                  const url = `${process.env.NEXT_PUBLIC_FLOW_SCAN_URL}/account/${walletAddress}`
                  posthog.capture("ACCOUNT_OPEN_WALLET_ON_FLOWSCAN", {
                    posthogEventDetail: "Open wallet on Flowscan",
                    url,
                  })
                  window.open(url)
                }}
              />
            </Box>

            <Box cursor="pointer">
              <WalletGridBox description={walletStatus} icon={WalletStatusIcon} title={"Status"} />
            </Box>


            <Box cursor="pointer">

              <WalletGridBox
                description={nfts?.items?.length ?? ""}
                icon={WalletItemsIcon}
                title={"Number of Items"}
                onClick={() => router.push("/app/games")}
              />

            </Box>

            <Box cursor="pointer">
              <WalletGridBox
                description={walletOwnerEmail}
                icon={WalletOwnerIcon}
                title={"Wallet Owner"}
                showTooltop
              />
            </Box>

          </SimpleGrid>
          <Box>
            <Button
              backgroundColor="brand.400"
              onClick={(e) => {
                disclosure.onOpen()
              }}
            >
              Switch or Add Wallet
            </Button>
          </Box>

          {walletStatus != WalletState.Ready ? (
            <Center>
              <Button
                p="6"
                backgroundColor="brand.400"
                fontSize="md"
                onClick={() => backendClient("createWallet")}
              >
                Retry Wallet Creation
              </Button>
            </Center>
          ) : null}
        </>
      )}
    </>
  )
}
