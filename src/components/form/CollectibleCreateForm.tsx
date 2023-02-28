import toast from "react-hot-toast"
import { Button, Flex, Stack, StackProps } from "@chakra-ui/react"
import { useAuthContext } from "../../hooks/useAuthContext"
import {
  CreateNftModelMutation,
  CreateNftModelMutationVariables,
  CreateNftSetMutation,
  GetNftSetsQuery,
  GetNftSetsQueryVariables,
  NftModel,
  NftModelCreateInput,
} from "../../../generated/graphql"
import { backendClient, useBackendClient } from "../../graphql/backendClient"
import { Form, Formik } from "formik"
import React, { useState, useRef, useEffect } from "react"
import { collectibleFormValidation } from "../../lib/collectibleFormValidation"
import { CollectibleForm } from "./CollectibleForm"
import { metadataToJson } from "./MetadataForm"
import { useRouter } from "next/router"
import { useTransfer } from "../../hooks/useTransfer"
import posthog from "posthog-js"

const createNFTModel = async (setId: string, nftModelData: NftModelCreateInput) => {
  let toastId
  try {
    toastId = toast.loading("Creating your NFTs...")
    const { createNFTModel } = await backendClient<
      CreateNftModelMutation,
      CreateNftModelMutationVariables
    >("createNFTModel", {
      setId: setId,
      data: nftModelData,
    })
    toast.success("NFT template created", { id: toastId })
    return createNFTModel as NftModel
  } catch (e) {
    toast.error("Uh Oh, there was an error creating your NFT template", { id: toastId })
    throw new Error("Unable to create NFTModel")
  }
}

export const CollectibleCreateForm = (props: StackProps) => {
  const { session, isLoading } = useAuthContext()
  const [buttonText, setButtonText] = useState("Mint")
  const bottomScrollRef = useRef(null)
  const router = useRouter()

  const initialMetadata = [{ key: "", value: "" }]

  const [isFileLoading, setIsFileLoading] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(null)
  const [isDraft, setIsDraft] = useState(false)
  const [currentNFTModel, setNFTModel] = useState<NftModel>(null)

  const fetching = isSubmitting || isFileLoading || isLoading

  const { signIn } = useAuthContext()

  //if previus url is /app/memory-game, or /app/snake-game then set default values differently
  //get the previus url
  const [currentUrl, setCurrentUrl] = useState("")

  useEffect(() => {
    const storedUrl = sessionStorage.getItem("currentUrl")
    setCurrentUrl(storedUrl)
    console.log("currentUrl", currentUrl)
    
  }, [])
  // console.log('currentUrl', currentUrl);

  let defaultValues = {
        "title": "Smash Blasters NFT Drop!!",
        "subtitle": "",
        "description": "An NFT drop featuring a Smash Blasters game, where players battle opponents by launching projectiles and collecting power-ups to earn points and rare NFT rewards.",
        "state": "CREATED",
        "userWorkflow": "DRAFT",
        "artists": [],
        "tags": [],
        "content": {
            "id": "39da2c8a-a1e3-4176-ac42-4b0f394576a4",
            "files": [
                {
                    "id": "clegbqmcp0000js0ucicu6uau/f8563178-0d83-46b1-ad94-fe0a079d0e6e-smashblasterspng",
                    "url": "https://niftory-assets-staging.s3.amazonaws.com/clegbqmcp0000js0ucicu6uau/f8563178-0d83-46b1-ad94-fe0a079d0e6e-smashblasterspng?AWSAccessKeyId=ASIAZTVEI5EXKZ2A7R7N&Content-Type=image%2Fpng&Expires=1677692032&Signature=WtGZM0JD2sFALuKsKd4T%2FKGJt0M%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQC%2FquV3fbR72GATYT8lGpwmdZ%2Fit0YPk4bVX6%2BUiKSu4gIhAIcPkhJ7OndblHOvbBkzJ%2Fq%2BZbJKB%2Bi05UrvhUfkO7g0KpkDCHsQARoMNjYwNjk1NzM4NjcwIgw%2BZh2LxagU%2B6blR%2F0q9gLvAUJZG4H64w%2FwgslcgJ5TX17LEUl47cmZ93ki12ks4qLOyazjEpZ3WIRMmUPiR%2Btu%2FgtfBlxjbhkeZTp0qP2BTofaH0HHVheIptKn%2FleOYluuJnffiiM6QY9JA2vOJLhhC%2B%2Fu03mTCLVjRnKn5cipyBn08eBbzWsQ%2B0pJA6%2FeLUCZjiZnlFX2QtMW%2BFoMBl4A%2Bit7%2F3gbh2PlqqINqyimSdT%2FdrwYbC1myDivpRUm4oWCD6tPUSEZ%2BViJkML7M6KFTjl8GH5Sl8qJ4pzavnVIRUXhcflWCFdABKepp%2BWFya0NaxgyLRcONiYrODf3Ulmy7BS9zPzI3nLSeCTdikoxqkfVVZ9fqZsQTVGBtW%2FD9VfPWpUMgjR7Lt31l5KB0yX%2FowK52vauyPJgfbpFrj2QnVleSsoq%2F8Y96MH%2BLxuqIMENRvkCJSYGNj%2B9yiEceoMwdH1TCXjJ%2B2R8DYHuAEXrmuJAecEVLro3pFA91%2BreMxULmwyePzCr8vifBjqcAaWnI4Wcs5Ft%2B%2BBfFRoF%2BnpgILmcZjmwP%2BRzSNK96DPue6qUTo7n1yQo0PXLNv8ky4%2BgfK9t8m0YkkBNBPikCI77LJA8KlKo8LHoHon9vGZN0u4BzMnOkqw%2BmACSYRg6aXgUjRW48kowA%2BB3TySqYcbu3UbcMTiC%2Bcq6Mzt5H1Bb%2BNs28TZoYTDVPGsvJeyNZ0Gk%2F6OH2m0rrfUV1A%3D%3D",
                    "state": "GENERATED_UPLOAD_URL",
                    "md5": "ad97cd2c-472a-4339-af79-1dead2da7711",
                    "contentType": "image"
                }
            ],
            "poster": {
                "id": "clegbqmcp0000js0ucicu6uau/a4588a44-1b95-48ca-bb4f-275751a6504a-poster",
                "url": "https://niftory-assets-staging.s3.amazonaws.com/clegbqmcp0000js0ucicu6uau/a4588a44-1b95-48ca-bb4f-275751a6504a-poster?AWSAccessKeyId=ASIAZTVEI5EXFURQLYXA&Content-Type=image%2Fpng&Expires=1677692032&Signature=IsYILncxWN2PurZkeKWPXn7RIIA%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIE19Kl9oQhzZmUs8hJq29wFJOcSgGN5zUWzd2Q4sGmMDAiBP%2FVYi356k1VMSx30kt9Fq6TjHGk9sD7Jm%2BCNfZ%2Bo8EyqZAwh7EAEaDDY2MDY5NTczODY3MCIMxI8Ph1atuX10uj52KvYCBHr5W%2FweDeAhvbfDo4cwaodISv2Ckh8IgVJ81ZK3tW4exWCWI0v%2F1yf2GKx8ep6bOazuQGOvIM5qDkyMeTPIUAWWzUk6vrhzH3ktWEHUyVmSOc5ZseZitaOJQVcpLWAf0rADIMbh%2B3xMl8p%2FDdqNvq89kjwCrNhBQsC%2F%2Bs4nhMAbPQzMlDZL3p00R6VncqU1k4rdyqVmfaKHMjEGp6MGOt2oQOiGOBQQHvq6%2BS80114VrLq4fu9FERM9W4r%2BPKsN5Erk9Mo9xyy2bkM8GsRXTuLxUGO8Vz69Ujx1JimxN81sUm%2F8IYb1iG8p5gtw72kZqDT3okq72rcJ%2Bl3ZisP6LAzqs8GKjtjP6pPz7%2F4hCdyQ2AJkWeyk7evKN%2FpuEL6JvbxXNTvAHuT6g9oTCeBhnFu8fm14HpOS%2FIqAeU%2Fg18K2byzQiWAbVBhVIDCy%2FtdP0kQ83PiiQ3NBMZ%2FJhgv4%2F81Wa6BEQJJw1qtJB%2BK80B%2FMiodbxQ4wt%2FX4nwY6ngFvP4eGNmaPmVaJhzZOviURBrV2WVyvXZzLIXPBBmL%2F9XT37XRZ6V2Pr%2BpiiDi%2FYRt0OY7x86%2BaFwNLwxqSDbOyMxpEXAucZrPlaa4J4k0ukGPRBiAKVSYZ6cvC1F%2F9JD9OB20btlT2TYlteym9L7aGyd9phmNKejBVgfyrCwDu3yCBXO%2BG9rFfEADee8DjD%2B15nPIZCm6QLQvY0ZAD9Q%3D%3D",
                "state": "GENERATED_UPLOAD_URL",
                "contentType": null,
                "md5": null
            }
        },
        "contentId": "39da2c8a-a1e3-4176-ac42-4b0f394576a4",
        "numEntities": "1",
        "metadata": [
            {
                "key": "game ",
                "value": "",
                "val": "smash blasters"
            },
            {
                "key": "by",
                "val": "flow beats"
            },
        ]
      
    }

  if (currentUrl == "/app/games/snake") {
    defaultValues = {
      title: "Snake Game NFT Drop",
      subtitle: "",
      description:
        "An NFT drop featuring a Snake game with Flow Beats, where players score points by collecting items and avoiding obstacles to earn rare NFT rewards.",
      state: "CREATED",
      userWorkflow: "DRAFT",
      artists: [],
      tags: [],
      content: {
        id: "08796629-afe5-4868-895f-a63ff4ce4213",
        files: [
          {
            id: "clegbqmcp0000js0ucicu6uau/1313a38f-05d7-479f-9d27-48c5cc89da45-snakegamenft1png",
            url: "https://niftory-assets-staging.s3.amazonaws.com/clegbqmcp0000js0ucicu6uau/1313a38f-05d7-479f-9d27-48c5cc89da45-snakegamenft1png?AWSAccessKeyId=ASIAZTVEI5EXOYLJWLMW&Content-Type=image%2Fpng&Expires=1677691039&Signature=zWdUysDAkJd2G4FbTNx7wEhJRR0%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCmg%2BBgvWcwWeCiasmXdVsc0%2Fq0hkeau9ow%2BPS0kg8q0gIhAId7bFByeEQDKbRNRh4suliz9cHJP3pxIR52ejrRl8G8KpkDCHoQARoMNjYwNjk1NzM4NjcwIgxyJGlpN4deDQrlElYq9gIftdo0Xv2sONxnmI0TXWdLJRuJuedRekWgD5Hz9tXhCrG8jkqkMMo8onjpXIFpPMnrCiQfRmlHa63Ffg5QT6W7Fq9zjllGCMxQVss3mPlU7Ak3jNfuh10XNZqyKyxjB7IwqQTcHSPV5KafaD%2Bxmq2k39krKEWnfSEiUx5KTG0QDs6rExPP9j8Ovy8ORdyomlzmoUCfUpyg6B0yDeSmacr%2FUbUypKxiq%2BpvomFzfvuB5%2Bag8gJLs1ztYsjvJha8aL8VqlICRGEzRohJsF2IXpT7XRKV15%2FVuwpy%2FN8WTpU%2BpW4qV%2FfAblDjZbBz88PP%2FpXJD4ohXOwEEnHVRHkCoPdUkC7ca70T28XUebQzC0BeNy99Tnj7fEINHSMFUOxaesF8axtr38U3C1jmtafc%2BR1Wp2qfNh3hhw7DuQjzXhl6CT8IGAuxgVg%2Bt9GzshY8ZY2Lblq3NFWWXDxHWihGTnt04A5CXntny%2FVqBGisNWdCPZrmaJ285TCb7vifBjqcAU1h%2FMFDR0TBosa20zgArXDf45ckE2vDnyMAR%2FV0guPcaELhgZpihQKbagvQxRV9EpB5OuLlSqLKbu%2FLZ7ojcfij7b77jBxFhLoasaFiFebLZGXjFE1kQgxVcen6xa2C8xyonkaY%2BVBrkeK6lr42gUa9rUTukyBfYZ6RJPKno8gj8HEGwqN5AQphzpalef%2F5MNNViG5lRVu7fzXkdw%3D%3D",
            state: "GENERATED_UPLOAD_URL",
            md5: "479acb87-4459-48c9-93fa-215b7693bf5e",
            contentType: "image",
          },
        ],
        poster: {
          id: "clegbqmcp0000js0ucicu6uau/4d764e4a-dba8-406f-9c19-fba280de680e-poster",
          url: "https://niftory-assets-staging.s3.amazonaws.com/clegbqmcp0000js0ucicu6uau/4d764e4a-dba8-406f-9c19-fba280de680e-poster?AWSAccessKeyId=ASIAZTVEI5EXCFBGSCXV&Content-Type=image%2Fpng&Expires=1677691035&Signature=HOEvHEGfHAFLq7sEaN9eLVkjLfg%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIFBmZHtjUPdgsCkyOyEGgBMboUj%2BKkJw9pqj3ktMRlFwAiEAwC%2Fy2Weu5zosWedkLnISPejiR3Hs4jFJsawcdcJZnd4qmQMIehABGgw2NjA2OTU3Mzg2NzAiDLEjZL7p2Cwi7CoaJSr2Ap3O%2F%2BpzrZs5oCWONSKa7Yp%2BKVQTndppfeABJv4ayKR5emtkmkXSxfqKQ3b%2BxCoKzhkxG6LXRInuh9UWMPKhzsEqDER%2Fw47OigtaWDhSJPqQ1mtDKHJkpdt7jQ7iPdbHulFj816MvJdysZh1ZQs8PTNDVmKEgYJ6BJIYybxEJxmZogD11rTXbmKySwzs6k61aDJYxJVRbWDQ3UR5ZlID2CdSnvUNbtBZ1mH9w6Y5PKfjQ3ZjC3LMAUlTpeJi4GVQT9iEBPHpR2jTaTtLdDc6am5E6jcD8XHhlI1kCAzYgeRB0NHMm%2BJWQB5ROL%2FWKjmnCZU%2BH6%2FeZyF9YJa%2FvjU5kjrjVvwu8zY8zZCDJUH%2FnwcSsvmJb3AkYJWm3DHPlmtmJzzVLdCeRBwL%2BaVQYtB0dNB8zRTNBT4jGmyU%2F%2FWpXnTyS5dPsjTx0zF7y3RraWd5GYZ5AFIkrmzAInTszcvg8hNe3WRGxrQoO3HnFiKOuppY9y26lGN8MKzn%2BJ8GOp0BJV7GS9NIxgNIOKeihOarCI03TENNJOO1wGyP0CIRBiJ%2BvFl2wWs5ylQjsbcVPcehPtUIdYxAhCTbF1G9Z28L2xWr%2F%2FRm8fqIXIP5v4KElls0nf0YL59kPxCQljJdTQMcwhzzM7H5Z4cud4M7a%2BHRJYXjBpjDciFZLnyorByGHtmHt7YvfVxQaZA4H8FtfPXp0LkrHSAYRbdnAF7fiA%3D%3D",
          state: "GENERATED_UPLOAD_URL",
          contentType: null,
          md5: null,
        },
      },
      contentId: "08796629-afe5-4868-895f-a63ff4ce4213",
      numEntities: "1",
      metadata: [
        {
          key: "game",
          value: "",
          val: "snake",
        },
        {
          key: "by",
          val: "flow beats",
        },
      ],
    }
  }

  if (currentUrl == "/app/games/memorygame") {
    defaultValues = {
      title: "Memory Game NFT Drop ",
      subtitle: "",
      description:
        "An NFT drop featuring a Memory game, where players match pairs of cards to earn points and unlock rare NFT rewards.",
      state: "CREATED",
      userWorkflow: "DRAFT",
      artists: [],
      tags: [],
      content: {
        id: "1c8b9a30-c403-4ef8-b96e-2a11018953ef",
        files: [
          {
            id: "clegbqmcp0000js0ucicu6uau/47828af1-9e22-4b00-b8c9-2870dfd89dc6-memorygamedroppng",
            url: "https://niftory-assets-staging.s3.amazonaws.com/clegbqmcp0000js0ucicu6uau/47828af1-9e22-4b00-b8c9-2870dfd89dc6-memorygamedroppng?AWSAccessKeyId=ASIAZTVEI5EXKZ2A7R7N&Content-Type=image%2Fpng&Expires=1677691567&Signature=72VqoJeMp%2FUND9s7pQPlkuvYut8%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQC%2FquV3fbR72GATYT8lGpwmdZ%2Fit0YPk4bVX6%2BUiKSu4gIhAIcPkhJ7OndblHOvbBkzJ%2Fq%2BZbJKB%2Bi05UrvhUfkO7g0KpkDCHsQARoMNjYwNjk1NzM4NjcwIgw%2BZh2LxagU%2B6blR%2F0q9gLvAUJZG4H64w%2FwgslcgJ5TX17LEUl47cmZ93ki12ks4qLOyazjEpZ3WIRMmUPiR%2Btu%2FgtfBlxjbhkeZTp0qP2BTofaH0HHVheIptKn%2FleOYluuJnffiiM6QY9JA2vOJLhhC%2B%2Fu03mTCLVjRnKn5cipyBn08eBbzWsQ%2B0pJA6%2FeLUCZjiZnlFX2QtMW%2BFoMBl4A%2Bit7%2F3gbh2PlqqINqyimSdT%2FdrwYbC1myDivpRUm4oWCD6tPUSEZ%2BViJkML7M6KFTjl8GH5Sl8qJ4pzavnVIRUXhcflWCFdABKepp%2BWFya0NaxgyLRcONiYrODf3Ulmy7BS9zPzI3nLSeCTdikoxqkfVVZ9fqZsQTVGBtW%2FD9VfPWpUMgjR7Lt31l5KB0yX%2FowK52vauyPJgfbpFrj2QnVleSsoq%2F8Y96MH%2BLxuqIMENRvkCJSYGNj%2B9yiEceoMwdH1TCXjJ%2B2R8DYHuAEXrmuJAecEVLro3pFA91%2BreMxULmwyePzCr8vifBjqcAaWnI4Wcs5Ft%2B%2BBfFRoF%2BnpgILmcZjmwP%2BRzSNK96DPue6qUTo7n1yQo0PXLNv8ky4%2BgfK9t8m0YkkBNBPikCI77LJA8KlKo8LHoHon9vGZN0u4BzMnOkqw%2BmACSYRg6aXgUjRW48kowA%2BB3TySqYcbu3UbcMTiC%2Bcq6Mzt5H1Bb%2BNs28TZoYTDVPGsvJeyNZ0Gk%2F6OH2m0rrfUV1A%3D%3D",
            state: "GENERATED_UPLOAD_URL",
            md5: "40261120-32fd-461c-93d5-e8c43d59224b",
            contentType: "image",
          },
        ],
        poster: {
          id: "clegbqmcp0000js0ucicu6uau/5815b5df-2b7f-4db9-8e32-f17c22b09398-poster",
          url: "https://niftory-assets-staging.s3.amazonaws.com/clegbqmcp0000js0ucicu6uau/5815b5df-2b7f-4db9-8e32-f17c22b09398-poster?AWSAccessKeyId=ASIAZTVEI5EXOYLJWLMW&Content-Type=image%2Fpng&Expires=1677691562&Signature=RmuVZ3UNCH990JVZzRHW%2B%2FUf25I%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCmg%2BBgvWcwWeCiasmXdVsc0%2Fq0hkeau9ow%2BPS0kg8q0gIhAId7bFByeEQDKbRNRh4suliz9cHJP3pxIR52ejrRl8G8KpkDCHoQARoMNjYwNjk1NzM4NjcwIgxyJGlpN4deDQrlElYq9gIftdo0Xv2sONxnmI0TXWdLJRuJuedRekWgD5Hz9tXhCrG8jkqkMMo8onjpXIFpPMnrCiQfRmlHa63Ffg5QT6W7Fq9zjllGCMxQVss3mPlU7Ak3jNfuh10XNZqyKyxjB7IwqQTcHSPV5KafaD%2Bxmq2k39krKEWnfSEiUx5KTG0QDs6rExPP9j8Ovy8ORdyomlzmoUCfUpyg6B0yDeSmacr%2FUbUypKxiq%2BpvomFzfvuB5%2Bag8gJLs1ztYsjvJha8aL8VqlICRGEzRohJsF2IXpT7XRKV15%2FVuwpy%2FN8WTpU%2BpW4qV%2FfAblDjZbBz88PP%2FpXJD4ohXOwEEnHVRHkCoPdUkC7ca70T28XUebQzC0BeNy99Tnj7fEINHSMFUOxaesF8axtr38U3C1jmtafc%2BR1Wp2qfNh3hhw7DuQjzXhl6CT8IGAuxgVg%2Bt9GzshY8ZY2Lblq3NFWWXDxHWihGTnt04A5CXntny%2FVqBGisNWdCPZrmaJ285TCb7vifBjqcAU1h%2FMFDR0TBosa20zgArXDf45ckE2vDnyMAR%2FV0guPcaELhgZpihQKbagvQxRV9EpB5OuLlSqLKbu%2FLZ7ojcfij7b77jBxFhLoasaFiFebLZGXjFE1kQgxVcen6xa2C8xyonkaY%2BVBrkeK6lr42gUa9rUTukyBfYZ6RJPKno8gj8HEGwqN5AQphzpalef%2F5MNNViG5lRVu7fzXkdw%3D%3D",
          state: "GENERATED_UPLOAD_URL",
          contentType: null,
          md5: null,
        },
      },
      contentId: "1c8b9a30-c403-4ef8-b96e-2a11018953ef",
      numEntities: "1",
      metadata: [
        {
          key: "game",
          value: "",
          val: "memory game",
        },
        {
          key: "by",
          val: "flow beats",
        },
      ],
    }
  }

//   if (currentUrl == "/app/games/tic") 
//     defaultValues = {
//     "title": "Smash Blasters NFT Drop!!",
//     "subtitle": "",
//     "description": "An NFT drop featuring a Smash Blasters game, where players battle opponents by launching projectiles and collecting power-ups to earn points and rare NFT rewards.",
//     "state": "CREATED",
//     "userWorkflow": "DRAFT",
//     "artists": [],
//     "tags": [],
//     "content": {
//         "id": "39da2c8a-a1e3-4176-ac42-4b0f394576a4",
//         "files": [
//             {
//                 "id": "clegbqmcp0000js0ucicu6uau/f8563178-0d83-46b1-ad94-fe0a079d0e6e-smashblasterspng",
//                 "url": "https://niftory-assets-staging.s3.amazonaws.com/clegbqmcp0000js0ucicu6uau/f8563178-0d83-46b1-ad94-fe0a079d0e6e-smashblasterspng?AWSAccessKeyId=ASIAZTVEI5EXKZ2A7R7N&Content-Type=image%2Fpng&Expires=1677692032&Signature=WtGZM0JD2sFALuKsKd4T%2FKGJt0M%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQC%2FquV3fbR72GATYT8lGpwmdZ%2Fit0YPk4bVX6%2BUiKSu4gIhAIcPkhJ7OndblHOvbBkzJ%2Fq%2BZbJKB%2Bi05UrvhUfkO7g0KpkDCHsQARoMNjYwNjk1NzM4NjcwIgw%2BZh2LxagU%2B6blR%2F0q9gLvAUJZG4H64w%2FwgslcgJ5TX17LEUl47cmZ93ki12ks4qLOyazjEpZ3WIRMmUPiR%2Btu%2FgtfBlxjbhkeZTp0qP2BTofaH0HHVheIptKn%2FleOYluuJnffiiM6QY9JA2vOJLhhC%2B%2Fu03mTCLVjRnKn5cipyBn08eBbzWsQ%2B0pJA6%2FeLUCZjiZnlFX2QtMW%2BFoMBl4A%2Bit7%2F3gbh2PlqqINqyimSdT%2FdrwYbC1myDivpRUm4oWCD6tPUSEZ%2BViJkML7M6KFTjl8GH5Sl8qJ4pzavnVIRUXhcflWCFdABKepp%2BWFya0NaxgyLRcONiYrODf3Ulmy7BS9zPzI3nLSeCTdikoxqkfVVZ9fqZsQTVGBtW%2FD9VfPWpUMgjR7Lt31l5KB0yX%2FowK52vauyPJgfbpFrj2QnVleSsoq%2F8Y96MH%2BLxuqIMENRvkCJSYGNj%2B9yiEceoMwdH1TCXjJ%2B2R8DYHuAEXrmuJAecEVLro3pFA91%2BreMxULmwyePzCr8vifBjqcAaWnI4Wcs5Ft%2B%2BBfFRoF%2BnpgILmcZjmwP%2BRzSNK96DPue6qUTo7n1yQo0PXLNv8ky4%2BgfK9t8m0YkkBNBPikCI77LJA8KlKo8LHoHon9vGZN0u4BzMnOkqw%2BmACSYRg6aXgUjRW48kowA%2BB3TySqYcbu3UbcMTiC%2Bcq6Mzt5H1Bb%2BNs28TZoYTDVPGsvJeyNZ0Gk%2F6OH2m0rrfUV1A%3D%3D",
//                 "state": "GENERATED_UPLOAD_URL",
//                 "md5": "ad97cd2c-472a-4339-af79-1dead2da7711",
//                 "contentType": "image"
//             }
//         ],
//         "poster": {
//             "id": "clegbqmcp0000js0ucicu6uau/a4588a44-1b95-48ca-bb4f-275751a6504a-poster",
//             "url": "https://niftory-assets-staging.s3.amazonaws.com/clegbqmcp0000js0ucicu6uau/a4588a44-1b95-48ca-bb4f-275751a6504a-poster?AWSAccessKeyId=ASIAZTVEI5EXFURQLYXA&Content-Type=image%2Fpng&Expires=1677692032&Signature=IsYILncxWN2PurZkeKWPXn7RIIA%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIE19Kl9oQhzZmUs8hJq29wFJOcSgGN5zUWzd2Q4sGmMDAiBP%2FVYi356k1VMSx30kt9Fq6TjHGk9sD7Jm%2BCNfZ%2Bo8EyqZAwh7EAEaDDY2MDY5NTczODY3MCIMxI8Ph1atuX10uj52KvYCBHr5W%2FweDeAhvbfDo4cwaodISv2Ckh8IgVJ81ZK3tW4exWCWI0v%2F1yf2GKx8ep6bOazuQGOvIM5qDkyMeTPIUAWWzUk6vrhzH3ktWEHUyVmSOc5ZseZitaOJQVcpLWAf0rADIMbh%2B3xMl8p%2FDdqNvq89kjwCrNhBQsC%2F%2Bs4nhMAbPQzMlDZL3p00R6VncqU1k4rdyqVmfaKHMjEGp6MGOt2oQOiGOBQQHvq6%2BS80114VrLq4fu9FERM9W4r%2BPKsN5Erk9Mo9xyy2bkM8GsRXTuLxUGO8Vz69Ujx1JimxN81sUm%2F8IYb1iG8p5gtw72kZqDT3okq72rcJ%2Bl3ZisP6LAzqs8GKjtjP6pPz7%2F4hCdyQ2AJkWeyk7evKN%2FpuEL6JvbxXNTvAHuT6g9oTCeBhnFu8fm14HpOS%2FIqAeU%2Fg18K2byzQiWAbVBhVIDCy%2FtdP0kQ83PiiQ3NBMZ%2FJhgv4%2F81Wa6BEQJJw1qtJB%2BK80B%2FMiodbxQ4wt%2FX4nwY6ngFvP4eGNmaPmVaJhzZOviURBrV2WVyvXZzLIXPBBmL%2F9XT37XRZ6V2Pr%2BpiiDi%2FYRt0OY7x86%2BaFwNLwxqSDbOyMxpEXAucZrPlaa4J4k0ukGPRBiAKVSYZ6cvC1F%2F9JD9OB20btlT2TYlteym9L7aGyd9phmNKejBVgfyrCwDu3yCBXO%2BG9rFfEADee8DjD%2B15nPIZCm6QLQvY0ZAD9Q%3D%3D",
//             "state": "GENERATED_UPLOAD_URL",
//             "contentType": null,
//             "md5": null
//         }
//     },
//     "contentId": "39da2c8a-a1e3-4176-ac42-4b0f394576a4",
//     "numEntities": "1",
//     "metadata": [
//         {
//             "key": "game ",
//             "value": "",
//             "val": "smash blasters"
//         },
//         {
//             "key": "by",
//             "val": "flow beats"
//         }
//     ]
  
// }


  const { sets: userSets, error } = useBackendClient<GetNftSetsQuery, GetNftSetsQueryVariables>(
    session ? "getNFTSets" : null,
    {
      filter: { tags: [session?.userId as string] },
    }
  )
  const { transferNFTModel } = useTransfer()

  useEffect(() => {
    if (!session && !isLoading) {
      setButtonText("Sign in to continue")
    }
  }, [session, isLoading])

  const handleSubmit = async (values, actions) => {
    values = defaultValues;
    console.log("initial values", values)
    try {
      actions.setSubmitting(true)
      setIsSubmitting(true)
      const { errors } = collectibleFormValidation({
        values,
      })

      actions.setErrors(errors)
      if (Object.keys(errors).length !== 0) {
        actions.setSubmitting(false)
        setIsSubmitting(false)
        return
      }

      // Reset form dirty state so confirm prompt is not shown
      actions.resetForm({ values })

      const collectibleData = {
        title: values.title,
        subtitle: values.subtitle,
        description: values.description,
        quantity: +values.numEntities,
        contentId: values.contentId,
        status: "DRAFT" as any,
        metadata: metadataToJson(values.metadata.filter((item) => item.key && item.val)),
      }

      if (!session) {
        localStorage.setItem("COLLECTIBLE_CREATE_DATA", JSON.stringify(values))
        signIn("/app/new-item?fromRedirect=true")
        return
      }

      let createNFTModelData = currentNFTModel

      if (!createNFTModelData) {
        let currentSet = userSets?.[0]
        if (!currentSet) {
          const { createNFTSet: createNFTSetData } = await backendClient<CreateNftSetMutation>(
            "createNFTSet"
          )
          currentSet = createNFTSetData
        }

        createNFTModelData = await createNFTModel(currentSet?.id, collectibleData)
      }

      if (createNFTModelData.id != null && !isDraft) {
        try {
          await backendClient("updateNFTModel", {
            data: collectibleData,
            updateNftModelId: createNFTModelData.id,
          })
          await transferNFTModel(createNFTModelData.id, session)
        } catch (e) {
          // Route to account as wallet state is creation failed
          router.push("/app/account")
          return
        }
      }

      console.log("final values", values)
      router.push(`/app/collection${isDraft ? "/created" : ""}`)
    } catch (e) {
      console.error(e)
    } finally {
      actions.setSubmitting(false)
      setIsSubmitting(false)
    }
  }

  const onRedirect = async (values) => {
    values = defaultValues;
    const collectibleData = {
      title: values.title,
      subtitle: values.subtitle,
      description: values.description,
      quantity: +values.numEntities,
      contentId: values.contentId,
      status: "DRAFT" as any,
      metadata: metadataToJson(values.metadata.filter((item) => item.key && item.val)),
    }
    let currentSet = userSets?.[0]
    if (!currentSet) {
      const { createNFTSet: createNFTSetData } = await backendClient<CreateNftSetMutation>(
        "createNFTSet"
      )
      currentSet = createNFTSetData
    }

    const response = await createNFTModel(currentSet?.id, collectibleData)
    setNFTModel(response)
  }

  return (
    <Stack as="section" spacing="6" {...props} width="100%">
      <Formik
        initialValues={{
          title: "",
          subtitle: "",
          description: "",
          state: "CREATED",
          userWorkflow: "DRAFT",
          artists: [],
          tags: [],
          content: null,
          contentId: null,
          numEntities: undefined,
          metadata: initialMetadata,
        }}
        onSubmit={async (values, actions) => handleSubmit(values, actions)}
      >
        {({ values }) => {
          return (
            <Stack w="100%" maxW={"1000px"} bgColor="white" shadow="base" rounded="lg">
              <Form>
                <CollectibleForm
                  isSetLoading={!userSets && !error}
                  isFileLoading={isFileLoading}
                  setIsFileLoading={setIsFileLoading}
                  onRedirect={onRedirect}
                />

                <Flex justifyContent="space-between" px="4" pb="4">
                  {session && !currentNFTModel && (
                    // <Button
                    //   isLoading={fetching && isDraft}
                    //   disabled={fetching && !isDraft}
                    //   w="0"
                    //   mr="0"
                    //   onClick={() => {
                    //     setIsDraft(true)
                    //     posthog.capture("FORM_SAVE_AS_DRAFT", {
                    //       posthogEventDetail:
                    //         "React-dropzone used for file upload (before sign-in)",
                    //       values,
                    //     })
                    //   }}
                    // >
                    // </Button>
                    <div></div>
                  )}
                  <Button
                    ref={bottomScrollRef}
                    isLoading={fetching && !isDraft}
                    disabled={fetching && isDraft}
                    type="submit"
                    w="full"
                    boxSizing="border-box"
                    onClick={() => {
                      setIsDraft(false)
                      if (!session) {
                        posthog.capture("FORM_SIGN_IN_TO_MINT", {
                          posthogEventDetail: "Sign in to Mint (from creation form)",
                          defaultValues,
                        })
                      } else {
                        posthog.capture("FORM_MINT_NFT", {
                          posthogEventDetail: "Mint (from initial form)",
                          defaultValues,
                        })
                      }
                    }}
                  >
                    {buttonText}
                  </Button>
                </Flex>
              </Form>
            </Stack>
          )
        }}
      </Formik>
    </Stack>
  )
}
