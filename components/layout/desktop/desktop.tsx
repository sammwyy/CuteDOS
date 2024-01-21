import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { File } from '@/contexts/fs';
import useFS from '@/hooks/useFS';
import useWindows from '@/hooks/useWindows';

import TaskBar from '../taskbar';
import WindowRenderer from '../window-renderer';
import styles from './Desktop.module.css';

/* Grid - Item */
interface GridItemProps {
  file: File;
  onClick: () => unknown;
  onDoubleClick: () => unknown;
  selected: boolean;
}

const GridItem = ({
  file,
  onClick,
  onDoubleClick,
  selected,
}: GridItemProps) => {
  const { name, type, icon } = file;
  const [lastClicked, setLastClicked] = useState<number>(0);

  const handleClick = () => {
    onClick();

    const now = Date.now();
    const diff = now - lastClicked;

    if (diff < 300) {
      onDoubleClick();
    } else {
      setLastClicked(now);
    }
  };

  return (
    <Flex
      className={styles[selected ? 'item-selected' : 'item']}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      <Image alt={name} src={icon} className={styles.icon} />
      <Text className={styles.label}>{name}</Text>
    </Flex>
  );
};

/* Grid */
const DesktopGrid = () => {
  const fs = useFS();
  const winManager = useWindows();
  const args: string[] = [];

  const content = fs.list('C:\\Users\\Sammwy\\Desktop');
  const [selected, setSelected] = useState<File | null>(null);

  const aaaa: File[] = new Array(15).fill(content[0]);

  return (
    <Grid
      className={styles.grid}
      onClick={() => {
        setSelected(null);
      }}
    >
      {aaaa.map((file, i) => (
        <GridItem
          key={i}
          file={file}
          selected={selected == file}
          onClick={() => {
            setSelected(file);
          }}
          onDoubleClick={() => {
            if (file.exec) {
              file.exec({
                args,
                fs,
                winManager,
              });
            }
          }}
        />
      ))}
    </Grid>
  );
};

/* Desktop */
export interface DesktopProps {
  taskbarHeight: number;
  wallpaper: string;
}

export function Desktop({ taskbarHeight, wallpaper }: DesktopProps) {
  return (
    <Flex className={styles.desktop}>
      <Box height={`calc(100% - ${taskbarHeight}px)`} bg={`url(${wallpaper})`}>
        <WindowRenderer />
        <DesktopGrid />
      </Box>
      <TaskBar height={taskbarHeight} />
    </Flex>
  );
}
