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
import { useEffect } from 'react';

import AllCrimesTab from 'src/components/AllCrimesTab/AllCrimesTab';
import { firestoreDb } from 'src/libs';

import { useAppStore } from 'src/store';
// import { fetchCrimes } from 'src/store/actions';

const Dashboard = () => {
  const fetchCrimes = useAppStore((state) => state.fetchCrimes);

  useEffect(() => {
    fetchCrimes();
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
              <Avatar name="Admin Report" size={'sm'} />
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
            {/* <Tab fontSize={'sm'}>Attended Crimes</Tab> */}
          </TabList>
          <TabPanels>
            <TabPanel>
              <AllCrimesTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Dashboard;
