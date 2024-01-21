import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  IconButton as ChakraIconButton,
} from '@chakra-ui/react';

export interface ButtonProps extends ChakraButtonProps {
  variant?: 'classic' | 'icon';
  onClick?: () => unknown | undefined;
  onClickDisabled?: () => unknown | undefined;
}

/* Wrapper */
export function Button({ variant = 'classic', ...props }: ButtonProps) {
  switch (variant) {
    case 'classic':
      return <ClassicButton {...props} />;
    case 'icon':
      return <IconButton {...props} />;
  }
}

/* Variants */

// Classic
const ClassicButton = ({
  children,
  disabled,
  onClick,
  onClickDisabled,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled === undefined ? onClick == null : disabled;

  const first = !isDisabled ? '#faeffa' : '#9474d0';
  const second = !isDisabled ? '#9474d0' : '#faeffa';

  const handleClick = () => {
    if (disabled && onClickDisabled) {
      onClickDisabled();
    } else if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <ChakraButton
      borderLeft={'2px solid ' + first}
      borderTop={'2px solid ' + first}
      borderRight={'2px solid ' + second}
      borderBottom={'2px solid ' + second}
      borderRadius={'0'}
      color={'black'}
      fontWeight={'hairline'}
      disabled={onClickDisabled ? false : disabled}
      _active={{
        borderLeftColor: '#9474d0',
        borderTopColor: '#9474d0',
        borderRightColor: '#faeffa',
        borderBottomColor: '#faeffa',
      }}
      onClick={onClick || onClickDisabled ? handleClick : undefined}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

// Icon
const IconButton = ({ children, ...props }: ButtonProps) => {
  return (
    <ChakraIconButton
      aria-label={props['aria-label'] || 'button'}
      icon={<>{children}</>}
      size={'xs'}
    >
      {children}
    </ChakraIconButton>
  );
};
