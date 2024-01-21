import { extendTheme } from '@chakra-ui/react';

const colors = {
  transparent: 'transparent',
  gray: {
    800: '#0B0916',
  },
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const styles = {
  global: {},
};

const theme = extendTheme({
  colors,
  config,
  styles,
});

export default theme;
