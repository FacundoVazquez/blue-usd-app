import { Box, NavLink } from '@mantine/core';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { Page } from './navbar.type';
import classes from './navbar.module.css';

interface Props {
  pages: Page[];
}

const { publicRuntimeConfig } = getConfig();
const version = publicRuntimeConfig?.version;

const Navbar: React.FC<Props> = ({ pages }) => {
  const router = useRouter();

  const isCurrentPage = (pathname: string): boolean => pathname === router.pathname;

  const items = pages
    .filter((page) => !page.hidden)
    .map((page) => (
      <NavLink
        key={page.key}
        active={isCurrentPage(page.pathname)}
        label={page.title}
        leftSection={<page.icon size="1rem" stroke={1.5} />}
        component={Link}
        href={page.pathname}
      />
    ));

  return (
    <Box className={classes.navbar}>
      {items}
      <NavLink disabled className={classes.footer} label={`Current Version ${version}`} />
    </Box>
  );
};

export default Navbar;
