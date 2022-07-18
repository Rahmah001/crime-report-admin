import type { NextPage } from 'next';
import Head from 'next/head';

import { Box, Button, Center, Heading, Link } from '@chakra-ui/react';

import NextLink from 'next/link';

import { overlayBg, bgGradient, buttonGradient } from 'src/constants';

import CrimeHeading from 'src/components/CrimeHeading/CrimeHeading';

const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>Crime-Report | Admin</title>
        <meta name="crime-report" content="Report any crime.." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center
        color={'white'}
        bg={overlayBg}
        height={'100vh'}
        flexDir={'column'}
        bgSize={'cover'}
      >
        <CrimeHeading text={'Welcome to our Admin page.'} />
        <NextLink passHref href="/login">
          <Button
            bgGradient={bgGradient}
            _hover={buttonGradient}
            _focus={buttonGradient}
            color={'#000'}
          >
            Admin Login
          </Button>
        </NextLink>

        <Heading fontSize={'sm'} mt={'2rem'}>
          designed by Olagbile Abdul Samad
        </Heading>
      </Center>
    </Box>
  );
};

export default Home;
