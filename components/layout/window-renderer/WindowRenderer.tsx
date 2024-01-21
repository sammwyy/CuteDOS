import { Box } from '@chakra-ui/react';

import Window from '@/components/ui/window';
import useWindows from '@/hooks/useWindows';

export function WindowRenderer() {
  const { windows } = useWindows();

  return (
    <Box
      width={'100%'}
      height={'100%'}
      zIndex={`var(--layout-windows)`}
      position={'absolute'}
      top={'0'}
      left={'0'}
      overflow={'hidden'}
      pointerEvents={'none'}
    >
      {windows.map((window) => (
        <Window key={window.id} meta={window}>
          {window.component}
        </Window>
      ))}
    </Box>
  );
}
