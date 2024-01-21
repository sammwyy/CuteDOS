import { ChakraProvider } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { FSProvider } from '@/contexts/fs';
import { WindowsProvider } from '@/contexts/windows';
import theme from '@/theme';

import '../theme/fonts.css';
import '../theme/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>CuteDOS</title>
        <meta name="description" content="This is just an example" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon/system/sys_cutedos.png" />
      </Head>

      {process.env.NODE_ENV === 'production' && <Analytics />}

      <FSProvider>
        <WindowsProvider>
          <Component {...pageProps} />
        </WindowsProvider>
      </FSProvider>
    </ChakraProvider>
  );
}
