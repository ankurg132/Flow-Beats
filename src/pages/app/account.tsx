import React from "react"
import { Center, Flex } from "@chakra-ui/react"
import { useGraphQLQuery } from "../../graphql/useGraphQLQuery"
import {
  UserNftsDocument,
  UserNftsQuery,
  UserNftsQueryVariables,
  WalletDocument,
  WalletQuery,
} from "../../../generated/graphql"
import { Logout } from "../../components/Logout"
import AppLayout from "../../components/AppLayout"
import { useAuthContext } from "../../hooks/useAuthContext"
import { WalletDetails } from "../../ui/Wallet/WalletDetails"
import { BiFontSize } from "react-icons/bi"
import Image from "next/image"
import dashboard from "./dashboard.png"
const AccountPage = () => {
  const { session, isLoading } = useAuthContext()

  const userId = session?.userId
  const { wallet, fetching: walletFetching } = useGraphQLQuery<WalletQuery>({
    query: WalletDocument,
    pause: isLoading,
  })

  const fetching = walletFetching || isLoading
  return (
<<<<<<< HEAD
    <AppLayout title="Account ">

      <Flex justifyContent="center" alignItems="center">
        <Image src={dashboard} alt="dashboard" />
      </Flex> 


=======
    
    <AppLayout title="Account | Flow Beats ">
>>>>>>> 2823bb03f4b58a4bd155d8f11f121f03a8c92fe9
      <Flex
        gap="10"
        textAlign="center"
        maxW={"1050px"}
        margin={{ base: "1rem", md: "40px auto" }}
        direction="column"
        // add inline styles to the Flex component
        backgroundColor="black"
        padding="2rem"
        borderRadius="0.5rem"
      >
        <WalletDetails
          isLoading={fetching}
          walletAddress={wallet?.address}
          walletItems={wallet?.nfts?.length}
          walletStatus={wallet?.state?.toString()}
          walletOwnerEmail={wallet?.appUser?.email}
        />
        <Flex justifyContent="center">
          <Logout />
        </Flex>
      </Flex>
    </AppLayout>
  )
}

AccountPage.requireAuth = true
export default AccountPage
