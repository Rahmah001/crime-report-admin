import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';

import { Toaster } from 'react-hot-toast';

import { theme } from 'src/theme';

import '../index.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
      <Toaster />
    </>
  );
};

export default MyApp;
