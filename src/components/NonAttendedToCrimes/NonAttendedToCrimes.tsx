import { useEffect, useState } from 'react';

import {
  Center,
  HStack,
  Box,
  Spinner,
  TableContainer,
  Text,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useColorModeValue,
} from '@chakra-ui/react';
import CrimeActions from 'src/components/CrimeActions/CrimeActions';

import { useAppStore } from 'src/store';

const NonAttendedToCrimeTab = () => {
  const isLoading = useAppStore((state) => state.isLoadingCrime);
  const { nonAttendedToCrimes } = useAppStore();

  return (
    <Box>
      {isLoading && (
        <Center my={3}>
          <HStack spacing={3}>
            <Spinner emptyColor="gray.200" color="purple.500" size={'sm'} />
            <Text fontSize={'14px'}>Fetching crimes</Text>
          </HStack>
        </Center>
      )}
      <TableContainer
        border={useColorModeValue('1px solid #EDF2F7', '')}
        rounded={'lg'}
      >
        <Table variant="simple" size={'sm'}>
          <TableCaption>CrimeReport. Data</TableCaption>
          <Thead p={4}>
            <Tr>
              <Th>Email Address</Th>
              <Th>Name</Th>
              <Th>Phone Number</Th>
              <Th>Crime</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {nonAttendedToCrimes?.map((crime) => (
              <Tr key={crime?.id}>
                <Td>{crime?.email}</Td>
                <Td>{crime?.name}</Td>
                <Td>{crime?.phoneNumber}</Td>
                <Td>{crime?.crime}</Td>
                <Td>
                  <CrimeActions crime={crime} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NonAttendedToCrimeTab;
