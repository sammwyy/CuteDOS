import { Flex, Image, Text } from '@chakra-ui/react';
import { PropsWithChildren, useState } from 'react';

import { Button } from '@/components/ui/button/Button';
import useWindows from '@/hooks/useWindows';
import { SocialNetworks } from '@/lib/constants';

import Start from '../start';
import styles from './Taskbar.module.css';

/* Task Group */
interface TaskbarGroupProps extends PropsWithChildren {
  width?: string;
  disabled?: boolean;
  onClick?: () => unknown;
  onClickDisabled?: () => unknown;
}

const TaskbarGroup = ({
  children,
  width,
  disabled,
  onClick,
  onClickDisabled,
}: TaskbarGroupProps) => {
  return (
    <Button
      gap={'5px'}
      padding={'3px 5px'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      color={'black'}
      height={'100%'}
      width={width}
      onClick={onClick}
      onClickDisabled={onClickDisabled}
      disabled={disabled}
      variant="classic"
    >
      {children}
    </Button>
  );
};

/* Taskbar */
export interface TaskBarProps {
  height: number;
}

export function TaskBar({ height }: TaskBarProps) {
  const { windows, restoreWindow, isWindowMinimized, focusWindow } =
    useWindows();
  const [isStartOpen, setIsStartOpen] = useState(false);

  const toggleStart = () => {
    setIsStartOpen(!isStartOpen);
  };

  return (
    <Flex className={styles.taskbar} height={`${height}px`}>
      {isStartOpen && (
        <Start
          yOffset={height}
          onClose={() => {
            setIsStartOpen(false);
          }}
        />
      )}

      <Flex className={styles.section}>
        {/* Start menu */}
        <Button
          onClick={toggleStart}
          variant="classic"
          fontWeight={'bold'}
          height={'100%'}
          gap={'10px'}
        >
          <Image
            src="/icons/system/sys_cutedos.png"
            alt="Start"
            height={'100%'}
          />
          START
        </Button>

        {/* Social Networks */}
        <TaskbarGroup>
          {SocialNetworks.map((v) => (
            <Button
              key={v.id}
              aria-label={v.icon}
              onClick={() => {}}
              variant="icon"
            >
              <Image src={v.icon} height={'100%'} alt={v.id} />
            </Button>
          ))}
        </TaskbarGroup>

        {/* Tabs */}
        {windows.map((w) => (
          <TaskbarGroup
            key={w.id}
            disabled={!isWindowMinimized(w.id)}
            onClick={() => {
              restoreWindow(w.id);
              focusWindow(w.id);
            }}
            onClickDisabled={() => focusWindow(w.id)}
            width={'200px'}
          >
            <Text color="var(--tertiary)">{w.title}</Text>
          </TaskbarGroup>
        ))}
      </Flex>

      <Flex className={styles.section}></Flex>
    </Flex>
  );
}
