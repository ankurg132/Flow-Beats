import { Center, color, Modal, ModalContent, ModalOverlay, VStack } from "@chakra-ui/react"

export interface MenuModalItems {
  title: string
  onClick?: () => void
}

interface MenuModalProps {
  disclosure: {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }
  items: MenuModalItems[]
}

export const MenuModal = ({ disclosure, items }: MenuModalProps) => {
  const { isOpen, onClose } = disclosure
  return (
    <Modal onClose={onClose} size="md" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent  rounded="3xl" padding={0} >
       
          {items.map(({ title, onClick }) => (
            <Center
              key={title}
              w="full"
              h="50px"
              cursor="pointer"
              _hover={{ bg: "black", color:"white" }}
              fontWeight="bold"
              
              borderBottom="2px"
              borderColor="gray.200"
              onClick={() => {
                onClick?.()
                onClose()
              }}
            >
              {title}
            </Center>
          ))}
          <Center
            w="full"
            h="50px"
            cursor="pointer"
            _hover={{ bg: "black" }}
            fontWeight="bold"
           
            
            onClick={onClose}
            color="red"
          >
            Cancel
          </Center>
        
      </ModalContent>
    </Modal>
  )
}
