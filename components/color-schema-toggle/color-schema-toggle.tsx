import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { IconMoon, IconSun } from '@tabler/icons-react';
import cx from 'clsx';

import classes from './color-schema-toggle.module.css';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  //#region Methods
  const toggleColorScheme = () =>
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  //#endregion

  //#region Hotkeys
  useHotkeys([['mod+Q', toggleColorScheme]]);
  //#endregion

  //#region Handlers
  const onClick = () => toggleColorScheme();
  //#endregion

  return (
    <>
      <ActionIcon onClick={onClick} variant="default" size="xl" aria-label="Toggle color scheme">
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
      </ActionIcon>
    </>
  );
}
