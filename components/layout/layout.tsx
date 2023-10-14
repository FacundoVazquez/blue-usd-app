import { AppShell, Burger, Group, Text, Title } from '@mantine/core';
import { useState } from 'react';

import { ColorSchemeToggle } from '../color-schema-toggle/color-schema-toggle';
import Navbar from '../navbar/navbar';
import { Page } from '../navbar/navbar.type';
import classes from './layout.module.css';

interface Props {
  pages: Page[];
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ pages, children }) => {
  const [opened, setOpened] = useState(false);

  const handleNavbarToggle = () => {
    setOpened(!opened);
  };

  return (
    <>
      <AppShell
        padding="md"
        pos="fixed"
        header={{ height: 64 }}
        navbar={{ width: 320, breakpoint: 'sm', collapsed: { desktop: !opened, mobile: !opened } }}
      >
        <AppShell.Header px="xl" className={classes.header}>
          <Group>
            <Burger opened={false} onClick={handleNavbarToggle} />
            <Title className={classes.title} ta="center">
              <Text
                inherit
                variant="gradient"
                component="span"
                gradient={{ from: 'blue', to: 'teal.6' }}
              >
                Blue USD{' '}
              </Text>
              App
            </Title>
          </Group>
          <ColorSchemeToggle />
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <Navbar pages={pages} />
        </AppShell.Navbar>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  );
};

export default Layout;
