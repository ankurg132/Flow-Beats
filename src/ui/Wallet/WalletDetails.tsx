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
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="4" w={"100%"} p="1rem" backgroundColor="black">
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
              backgroundColor="#DEDEDE"
              _hover={{ bgColor: "black", color: "white", boxShadow: "0 0 8px 2px #0077b6" }}
              onClick={(e) => {
                disclosure.onOpen()
              }}
            >
              Switch Wallet
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
