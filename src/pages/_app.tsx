import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import ClientOnly from 'src/components/ClientOnly/ClientOnly';

import { Toaster } from 'react-hot-toast';

import { theme } from 'src/theme';

import '../index.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ClientOnly>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <Toaster />
      </ChakraProvider>
    </ClientOnly>
  );
};

export default MyApp;
