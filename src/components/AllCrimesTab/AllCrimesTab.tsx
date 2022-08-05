import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Center,
  Spinner,
  Tbody,
  Td,
  Box,
  Text,
  HStack,
  Button,
} from '@chakra-ui/react';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useAppStore } from 'src/store';
import CrimeActions from '../CrimeActions/CrimeActions';

const AllCrimesTab = () => {
  const isLoading = useAppStore((state) => state.isLoadingCrime);
  const crimes = useAppStore((state) => state.crimes);

  const [crimesState, setCrimesState] = useState<DocumentData[] | null | []>(
    []
  );

  useEffect(() => {
    setCrimesState(crimes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <TableContainer border={'1px solid #EDF2F7'} rounded={'lg'}>
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
            {crimesState?.map((crime) => (
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

export default AllCrimesTab;
