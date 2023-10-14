import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { MantineProvider } from '@mantine/core';
import { IconHome, IconUser } from '@tabler/icons-react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '../components/layout/layout';
import { Page } from '../components/navbar/navbar.type';
import { theme } from '../theme';

export const appName = 'Blue USD Comparator';

const pages: Page[] = [
  { key: 'dashboard', title: 'Dashboard', pathname: '/', icon: IconHome },
  { key: 'about', title: 'About', pathname: '/about', icon: IconUser, hidden: true },
];

export default function App({ Component, pageProps, router }: AppProps) {
  const getTitle = () => {
    const pageName = pages.find((page) => page.pathname === router.pathname)?.title;
    return `${pageName} | ${appName}`;
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="blue-usd-comparator" content="Blue USD Comparator" />
        <meta name="og:title" content={appName} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <title>{getTitle()}</title>
      </Head>
      <MantineProvider theme={theme}>
        <Layout pages={pages}>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}
