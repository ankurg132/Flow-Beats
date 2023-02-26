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
  const defaultValues = {
    "title": "ghfghf",
    "subtitle": "",
    "description": "ghfghfgh",
    "state": "CREATED",
    "userWorkflow": "DRAFT",
    "artists": [],
    "tags": [],
    "content": {
        "id": "1ae07066-b5d2-42cc-baa5-b9d6f24564db",
        "files": [
            {
                "id": "clegbqmcp0000js0ucicu6uau/665d5043-099b-493e-8550-9f77a5776fe2-pexels-ari-roberts-9637586jpg",
                "url": "https://niftory-assets-staging.s3.amazonaws.com/clegbqmcp0000js0ucicu6uau/665d5043-099b-493e-8550-9f77a5776fe2-pexels-ari-roberts-9637586jpg?AWSAccessKeyId=ASIAZTVEI5EXG47P3RVR&Content-Type=image%2Fjpeg&Expires=1677518922&Signature=beO2%2BXW5W4feIEPjkFaQ6nGbNQU%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIEyZrOG2ZnLJRmqvcu8Cbu7BKjv3hEzhzAIE4IORs1nNAiB0Hlp%2BsZXKwtBysC%2FdG4LMArmyP%2FjsoOWrzaRba81%2BByqZAwhKEAEaDDY2MDY5NTczODY3MCIMuK3RMp5pT18V%2FcMnKvYCiT8CGhldLCasxyiC6MG%2Fu6GImiYi0DO%2BLejr9QxneaL3VDWErVQ93hKmE0nkFXCiKyT3Ab8%2B90Hk0nteP5Fo%2FjXAQwIbENYxPPkLEqqZ7Yt7zi3c2zSJ8VCi7VkZ90bZMCSkUZLNt1MZOiRa7o1MaJAgggZCsaSEv9IOcAMUvTRCZyW5P8QgQbDsJhX9lEbGvW2JXud3OVjt50OW1WoNRJZAMEmzKeAuRuDz17nnxaRN1z2K%2BINtToC8sdNPYDT8G%2FUHqgqZ%2FfibBXW9gmjyEQgWn38ETBhrOOeiojwuqpL8YjAUWE3H%2B%2F01OBLAD4Qn8ZAg9PCU8pVMAuUtt5scVCE9olMhghkuc2HjBriXZHCyXZ0sYs60XUi2%2FzPG2GzqdDIqQhfXB5kE2oldOLW5ykRnbtCtTAfgcdyfLAjaU%2FqHCdO6PxPBJQKZrgFF9yUGr8QmmMVBiQEqHVZac7wALjPXHojQzDGAAWtsQSoeDCzF2XltB0Mw3ajunwY6ngEFS56pWGooRpmsdN7dfoNx%2FOvdIFQ251x11zFcBf8Pscy6cG%2FgykFdUmRfBsZupcShcmIv%2Fpvn8Y4YPyPs%2BBXGlctjpCtFsAXD73gPczmsmgl0vRGJhVGFJOa%2BrPmVYeMakLGk04kFnicStFyQRMc%2Bf0gPYEfoPl%2B6vXTPqi63n0yBtxVKfhZpXEI0AZ2hP3LqaXEbLAZldEgaBGsZuw%3D%3D",
                "state": "GENERATED_UPLOAD_URL",
                "md5": "3f5ef609-870e-493c-ba83-2cd57bac1d95",
                "contentType": "image"
            }
        ],
        "poster": {
            "id": "clegbqmcp0000js0ucicu6uau/b9da6836-6a05-4450-8849-2fae00a678e5-poster",
            "url": "https://niftory-assets-staging.s3.amazonaws.com/clegbqmcp0000js0ucicu6uau/b9da6836-6a05-4450-8849-2fae00a678e5-poster?AWSAccessKeyId=ASIAZTVEI5EXOSSPR3OL&Content-Type=image%2Fjpeg&Expires=1677518922&Signature=22EN%2BZBW%2BpoyC9W0LfaSZUfjk88%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCICpG6Mj6xZpj8J%2BpQ4y9wo27LB39WhwvIeRJ2u5ziLDzAiEA9q0daCe3IATQOTsssSfcZ%2FP4wTPJ2wGOyo3uNry1kBcqmQMISxABGgw2NjA2OTU3Mzg2NzAiDD0YhRLVOW5dw7%2FACyr2ArIjLzGUeHgjOv7LU%2BgIcbMzskbocUrmUF2Qr32hUprtniRRZe7UeIbIX0Ppc1BoI%2BBgjQgMzV%2Fj3QO9ZUmJrxszC2ReBisSwgSmy%2BzwOzyiwJX8G4sKVzlJqRb694Ofy0IG39PLXuIUaZTrHWBYo3Afn3mpyjT4UlbA8VWl%2FxBNCtS7%2F%2BkXfYyAXbnGtYwV9kPAnau4YLmjlBSDl%2FUVjSIp9JHhLTxClGR8snaSzuK62OZMXWcI412G%2B9gxAe8JB%2BG6h2vLA3Dloy58GnPCM9NrtUTQ4LF1BoGXjgivs6tPpyxeIO29jdCrJbCq2%2BjlGUmlqV7NzKwDxmGOPmrZHL78i8sboI42iE8H3eGQUED2nubfefPMVEB6WahStA2kICqtYrGkCH0F%2BBV8Gz%2BaafrpVjoxQN2WGpvj9oYMjmSktMzFupuaPXKFIpJ7sd89PrOMdN2lTCnb796RLmrugklE0%2BdlkBgdeqQCyrH2vRZXNAHswIsyMPKs7p8GOp0B7g7%2B83J3%2FPgW76DBhcFdzlt%2BmbzH0i%2BqT8XDgnslMvH4dYOihjRV06B1Ge1%2Fpimhxbtij%2BQrS%2F9Evr9gml6ll2I6ZqMS7UvQlK2Mx%2B52DISVmPSAFQnA28970RhHIvVub%2Fq8CQxxFSoIUPaJBgWdq059FkQIw0AVTFi70p%2BJUmy5KkIFTd3vd%2Bh15vcF5KyvgCZl5TN%2FsBABAoWaOw%3D%3D",
            "state": "GENERATED_UPLOAD_URL",
            "contentType": null,
            "md5": null
        }
    },
    "contentId": "1ae07066-b5d2-42cc-baa5-b9d6f24564db",
    "numEntities": "1",
    "metadata": [
        {
            "key": "fghghf",
            "value": "",
            "val": "ghfghfgh"
        }
    ]
}

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
    console.log('initial values', values)
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

      console.log('final values', values)
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
