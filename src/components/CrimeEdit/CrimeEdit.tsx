import { EditIcon } from '@chakra-ui/icons';

import {
  IconButton,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
  Input,
  ModalFooter,
  ButtonGroup,
  Button,
  Select,
  Checkbox,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { crimeType } from 'src/data';
import { useAppStore } from 'src/store';
import { CrimeProps } from 'src/types';

const CrimeEdit: React.FC<CrimeProps> = ({ crime }) => {
  const { register, handleSubmit } = useForm();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isAttendedTo, setIsAttendedTo] = useState<boolean>(crime.isAttendedTo);

  const isLoadingEdit = useAppStore((state) => state.isLoadingEdit);
  const EditCrime = useAppStore((state) => state.editCrime);

  const handleCrimeEdit = (data: any) => {
    const newData = {
      crime: data.crime,
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
      attendedTo: data.attendedTo,
    };
    console.log(newData);
    EditCrime(crime.id, newData, onClose);
  };

  return (
    <Box>
      <IconButton
        aria-label="edit-button"
        size="xs"
        colorScheme="pink"
        variant="ghost"
        onClick={onOpen}
        icon={<EditIcon />}
      />
      <Modal
        isCentered
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
      >
        <ModalOverlay backdropFilter={'blur(4px)'} />
        <ModalContent>
          <ModalHeader fontSize={'sm'}>
            Edit {crime?.name} reported crime on {crime?.crime}
          </ModalHeader>
          <ModalCloseButton size="sm" />
          <form onSubmit={handleSubmit(handleCrimeEdit)}>
            <ModalBody>
              <SimpleGrid
                columns={{ base: 1, sm: 2 }}
                spacing={6}
                textAlign="left"
              >
                <Input
                  {...register('name', {
                    required: true,
                  })}
                  size={'sm'}
                  defaultValue={crime?.name || ''}
                  type="text"
                  rounded={'md'}
                  placeholder="Name"
                />
                <Input
                  {...register('email', {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                  size={'sm'}
                  defaultValue={crime?.email || ''}
                  type="email"
                  rounded={'md'}
                  placeholder="Email Address"
                />
                <Select
                  {...register('crime')}
                  placeholder="Select crime"
                  defaultValue={crime?.crime || ''}
                  rounded={'md'}
                  size={'sm'}
                >
                  {crimeType.map((crime) => (
                    <option key={crime}>{crime}</option>
                  ))}
                </Select>
                <Input
                  {...register('phoneNumber', {})}
                  size={'sm'}
                  defaultValue={crime?.phoneNumber || ''}
                  type="text"
                  rounded={'md'}
                  placeholder="Name"
                />
                <Checkbox
                  {...register('attendedTo')}
                  size={'md'}
                  isChecked={isAttendedTo}
                  onChange={() => setIsAttendedTo(!isAttendedTo)}
                  defaultChecked={crime?.attendedTo}
                  colorScheme={'pink'}
                >
                  Crime is attended to?
                </Checkbox>
              </SimpleGrid>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup mt={4} spacing={2}>
                <Button
                  colorScheme={'purple'}
                  size="xs"
                  type="submit"
                  variant="solid"
                  isLoading={isLoadingEdit}
                >
                  Update Crime
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CrimeEdit;
