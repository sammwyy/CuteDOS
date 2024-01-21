import { Box, Flex, Text } from '@chakra-ui/react';
import { Resizable } from 're-resizable';
import { PropsWithChildren, useEffect, useState } from 'react';
import Draggable from 'react-draggable';

import { WindowMeta } from '@/contexts/windows';
import useWindows from '@/hooks/useWindows';
import { mathClamp } from '@/lib/utils/math-utils';

import styles from './Window.module.css';

type Direction =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft';

export interface WindowProps extends PropsWithChildren {
  meta: WindowMeta;
}

export function Window({ meta, children }: WindowProps) {
  const {
    isWindowMinimized,
    focusedWindow,
    focusWindow,
    focusedZIndex,
    closeWindow,
    minimizeWindow,
  } = useWindows();

  const id = meta.id;
  const title = meta.title;
  const canClose = meta.canClose || true;
  const canMinimize = meta.canMinimize || true;
  const canMaximize = meta.canMaximize || true;

  const [x, setX] = useState(meta.x);
  const [y, setY] = useState(meta.y);
  const [z, setZ] = useState(0);

  const [width, setWidth] = useState(meta.width);
  const [height, setHeight] = useState(meta.height);

  const [prevWidth, setPrevWidth] = useState(meta.width);
  const [prevHeight, setPrevHeight] = useState(meta.height);

  const isMinimized = isWindowMinimized(id);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const isFocus = focusedWindow === id;

  const canInteract = !isMaximized && !isMinimized;

  const close = () => {
    closeWindow(id);
  };

  const minimize = () => {
    minimizeWindow(id);
  };

  const resize = (width: number, height: number, _direction: Direction) => {
    const newWidth = mathClamp(width, 20, window.innerWidth);
    const newHeight = mathClamp(height, 20, window.innerHeight);
    setWidth(newWidth);
    setHeight(newHeight);
  };

  const move = (x: number, y: number) => {
    const newX = mathClamp(x, 0, window.innerWidth - 25);
    const newY = mathClamp(y, 0, window.innerHeight - 25);
    setY(newY);
    setX(newX);
  };

  const focus = () => {
    if (isFocus) return;
    focusWindow(id);
  };

  useEffect(() => {
    if (isFocus) {
      setZ(focusedZIndex);
    }
  }, [isFocus, focusedZIndex]);

  return (
    <Box
      className={styles[isFocus ? 'wrapper-focus' : 'wrapper']}
      onMouseDown={focus}
      zIndex={z}
      opacity={isMinimized ? '0' : '1'}
      transform={isMinimized ? 'translate(-5000, 5000)' : undefined}
    >
      <Draggable
        position={{ x, y }}
        handle={`.${styles.title}`}
        disabled={!canInteract}
        onDrag={(_, { x, y }) => {
          move(x, y);
        }}
      >
        <Resizable
          size={{ width, height }}
          defaultSize={{ width, height }}
          className={styles.resizable}
          enable={canInteract && isFocus ? undefined : false}
          onResizeStart={() => {
            setPrevHeight(height);
            setPrevWidth(width);
            setIsResizing(true);
          }}
          onResizeStop={() => setIsResizing(false)}
          onResize={(_e, direction, _ref, size) => {
            const w = prevWidth + size.width;
            const h = prevHeight + size.height;
            resize(w, h, direction);
          }}
        >
          <Flex className={styles.window} width={`100%`} height={`100%`}>
            {/* Resize pivot */}
            {/* Title bar */}
            <Flex className={styles.bar}>
              <Text className={styles.title}>
                {title} -- x: {x} | y: {y} | z: {z} | min:{' '}
                {isMinimized ? 'Y' : 'N'} | foc: {isFocus ? 'Y' : 'N'}
              </Text>
              <Flex className={styles.controls}>
                {canMinimize && (
                  <button className={styles.control} onClick={minimize}>
                    -
                  </button>
                )}
                {canMaximize && (
                  <button
                    className={styles.control}
                    onClick={() => setIsMaximized(!isMaximized)}
                  >
                    {isMaximized ? 'N' : 'Y'}
                  </button>
                )}
                {canClose && (
                  <button className={styles.control} onClick={close}>
                    x
                  </button>
                )}
              </Flex>
            </Flex>
            <Box className={styles.content}>{children}</Box>
          </Flex>
        </Resizable>
      </Draggable>
    </Box>
  );
}
