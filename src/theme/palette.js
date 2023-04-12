import { green, red, indigo, purple, amber, brown } from '@mui/material/colors';

//* Light Palette
const lightPalette = {};

//* Dark Palette
const darkPalette = {
  mode: 'dark',
  // primary: {
  //   main: brown[500],
  // },
};

const getPalette = (mode) => (mode === 'dark' ? darkPalette : lightPalette);

export default getPalette;
