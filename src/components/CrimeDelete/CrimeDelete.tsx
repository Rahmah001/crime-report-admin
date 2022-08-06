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
} from '@chakra-ui/react';

import { CrimeProps } from 'src/types';

const CrimeDelete: React.FC<CrimeProps> = ({ crime }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

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
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CrimeDelete;
