import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { File } from '@/contexts/fs';
import useFS from '@/hooks/useFS';
import useWindows from '@/hooks/useWindows';

import styles from './Start.module.css';

/* Start Item */
interface StartItemProps {
  file: File;
}

const StartItem = ({ file }: StartItemProps) => {
  const { name, exec, icon } = file;

  const args: string[] = [];
  const winManager = useWindows();
  const fs = useFS();

  return (
    <Flex
      className={styles.item}
      onClick={() => {
        if (exec) {
          exec({
            args,
            fs,
            winManager,
          });
        }
      }}
    >
      <Image alt={name} src={icon} className={styles['item-icon']} />
      <Text className={styles['item-name']}>{name}</Text>
    </Flex>
  );
};

/* Start */
interface StartProps {
  yOffset: number;
  onClose: () => unknown;
}

export function Start({ yOffset, onClose }: StartProps) {
  const { listFiles } = useFS();
  const items = listFiles('C:\\Users\\Sammwy\\AppData\\CuteDOS\\Start Menu');
  const executables = items.filter((i) => i.type === 'executable');

  return (
    <Box
      className={styles.wrapper}
      onClick={() => {
        onClose();
      }}
      transform={`translateY(-${yOffset}px)`}
    >
      <Box className={styles.start}>
        <Flex zIndex={999999}>
          <Box className={styles.brand}>CuteDOS 95 ({items.length})</Box>
          <Flex className={styles.menu}>
            {executables.map((exec, i) => (
              <StartItem key={i} file={exec} />
            ))}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
