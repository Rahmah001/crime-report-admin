import { useEffect } from 'react';

import {
  Avatar,
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';

import AllCrimesTab from 'src/components/AllCrimesTab/AllCrimesTab';
import AttendedToCrimesTab from 'src/components/AttendedToCrimesTab/AttendedToCrimesTab';
import NonAttendedToCrimeTab from 'src/components/NonAttendedToCrimes/NonAttendedToCrimes';

import { useAppStore } from 'src/store';

const Dashboard = () => {
  const fetchCrimes = useAppStore((state) => state.fetchCrimes);
  const { crimes } = useAppStore();
  const fetchCrimesAttendedTo = useAppStore(
    (state) => state.fetchCrimesAttendedTo
  );
  const fetchNonAttendedToCrimes = useAppStore(
    (state) => state.fetchNonAttendedToCrimes
  );

  useEffect(() => {
    const unSubscribe = () => {
      fetchCrimes();
      fetchCrimesAttendedTo();
      fetchNonAttendedToCrimes();
    };
    return () => unSubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth={'container.lg'}>
      <Head>
        <title>Crime-Report | Admin</title>
        <meta name="crime-report" content="Report any crime.." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HStack py={4}>
        <Heading fontSize={'xl'} fontWeight={'black'}>
          CrimeReport.
        </Heading>
        <Badge colorScheme={'purple'} rounded={'lg'}>
          Admin
        </Badge>
        <Spacer />
        <HStack>
          <Menu>
            <MenuButton>
              <Avatar name="Crime Report" size={'sm'} />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Text>admin@crime-report.com</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>

      <Box mt={7}>
        <Tabs variant={'soft-rounded'} colorScheme={'purple'}>
          <TabList>
            <Tab fontSize={'sm'}>All Crimes</Tab>
            <Tab fontSize={'sm'}>Attended Crimes</Tab>
            <Tab fontSize={'sm'}>Non Attended Crimes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0} py={6}>
              <AllCrimesTab />
            </TabPanel>
            <TabPanel px={0} py={6}>
              <AttendedToCrimesTab />
            </TabPanel>
            <TabPanel px={0} py={6}>
              <NonAttendedToCrimeTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Dashboard;
