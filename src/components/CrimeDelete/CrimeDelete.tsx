import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  IconButton,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react';

import { useAppStore } from 'src/store';

import { CrimeProps } from 'src/types';

const CrimeDelete: React.FC<CrimeProps> = ({ crime }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const isLoadingDelete = useAppStore((state) => state.isLoadingDelete);
  const DeleteCrime = useAppStore((state) => state.deleteCrime);

  return (
    <Box>
      <IconButton
        aria-label="delete-button"
        size="xs"
        colorScheme="red"
        variant="ghost"
        onClick={onOpen}
        icon={<DeleteIcon />}
      />
      <Modal
        isCentered
        size="sm"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
      >
        <ModalOverlay backdropFilter={'blur(4px)'} />
        <ModalContent>
          <ModalHeader fontSize={'sm'}>
            Delete {crime?.name} reported crime on {crime?.crime}
          </ModalHeader>
          <ModalCloseButton size="sm" />
          <ModalBody>
            <Text fontSize={'12px'}>
              Are you sure you want to delete this crime?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={'red'}
              size="xs"
              type="submit"
              variant="solid"
              isLoading={isLoadingDelete}
              onClick={() => DeleteCrime(crime.id, onClose)}
            >
              Delete Crime
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CrimeDelete;
