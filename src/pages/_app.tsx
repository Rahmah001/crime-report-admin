import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';

import { Toaster } from 'react-hot-toast';

import { theme } from 'src/theme';

import '../index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <Toaster />
    </ChakraProvider>
  );
}

export default MyApp;
