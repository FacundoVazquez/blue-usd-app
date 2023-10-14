import { TablerIconsProps } from '@tabler/icons-react';

export interface Page {
  key: string;
  title: string;
  pathname: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  hidden?: boolean;
}
