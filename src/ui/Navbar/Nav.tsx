import {
  Link as ChakraLink,
  Button,
  useBreakpointValue,
  IconButton,
  Box,
  Hide,
  Show,
} from "@chakra-ui/react"
import Link from "next/link"
import * as React from "react"
import { Navbar as NiftoryNavbar } from "./Navbar"
import { FiMenu } from "react-icons/fi"

import { FaGoogle, FaRegUser as UserIcon } from "react-icons/fa"
import { StarIcon } from "@chakra-ui/icons"
import { IoIosAddCircleOutline as AddIcon } from "react-icons/io"
import { useAuthContext } from "../../hooks/useAuthContext"
import posthog from "posthog-js"
import { useRouter } from "next/router"

import Image from "next/image"
import mainlogo from "../../pages/logo.png"

export const Navbar = ({ onOpen }) => {
  const { session, signIn, isLoading } = useAuthContext()
  let onClick = () => {
    signIn("/app/games")
    posthog.capture("HEADER_LOGIN", {
      posthogEventDetail: "Sign In with Google invoked from top banner",
    })
  }
  const isMobile = useBreakpointValue({ base: true, md: false })
  const router = useRouter()

  const menuItems = React.useMemo(() => {
    if (!session) {
      return [
        {
          title: "Get In",
          component: (
            <Button
              rounded="3xl"
              isLoading={isLoading}
              cursor="pointer"
              onClick={onClick}
              colorScheme="white"
              minWidth={{ base: "100px", md: "180px" }}
              fontWeight={400}
              p={{ base: "1rem", md: "1.2rem 1rem" }}
              background="content.400"
              fontSize={{ base: "12px", md: "14px" }}
              ml="1rem"
              h={{ base: "8", md: "10" }}
              my="0.2rem"
              leftIcon={<FaGoogle />}
            >
              Sign in with Google
            </Button>
          ),
        },
      ]
    } else {
      return [
        {
          href: "/app/games",
          component: (
            <Link href="/app/games" passHref>
              <Box
                fontWeight="bold"
                display="flex"
                alignItems="center"
                color="content.400"
                cursor="pointer"
                gap="0.3rem"
              >
                <div style={{ color: "white" }}>Games</div>
              </Box>
            </Link>
          ),
        },
        {
          title: "New Collection",
          href: "/",
          component: (
            <Link href="/app/collection" passHref>
              <Box
                fontWeight="bold"
                display="flex"
                alignItems="center"
                color="content.400"
                gap="0.3rem"
                cursor="pointer"
                onClick={() =>
                  posthog.capture("HEADER_VIEW_COLLECTION", {
                    posthogEventDetail: "Opened My Collection from top banner",
                  })
                }
              >
                <div style={{ color: "white" }}>Collection</div>
              </Box>
            </Link>
          ),
        },

        {
          href: "/app/account",
          component: (
            <Link href="/app/account" passHref>
              <Box
                fontWeight="bold"
                display="flex"
                alignItems="center"
                cursor="pointer"
                color="content.400"
                gap="0.3rem"
              >
                {/* <UserIcon size={20} /> */}
                <div style={{ color: "white" }}>Account</div>
              </Box>
            </Link>
          ),
        },
        // {
        //   href: "https://discord.gg/QAgDQXUGsU",
        //   component: (
        //     <ChakraLink
        //       ml={{ md: "1rem" }}
        //       mt="0.1rem"
        //       href="https://discord.gg/QAgDQXUGsU"
        //       target="_blank"
        //       color="content.400"
        //       fontWeight="bold"
        //       display="flex"
        //       alignItems="center"
        //       gap="0.3rem"
        //     >
        //     </ChakraLink>
        //   ),
        // },
      ]
    }
  }, [session])

  return (
    <>
      <NiftoryNavbar
        leftComponent={
          <>
            {isMobile && session && (
              <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
              />
            )}
            <Link href="/" passHref>
            <Image className="logo_imagee" src={mainlogo} alt="hero" width={240} height={60} />
              
            </Link>
          </>
        }
        menu={menuItems}
      />
    </>
  )
}
