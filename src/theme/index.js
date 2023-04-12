import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, red, indigo, purple, amber, brown } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import getPalette from './palette';

const theme = createTheme({
  palette: getPalette('dark'),
});

function AppThemeProvider({ children }) {
  // const [theme, setTheme] = useState(theme1);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppThemeProvider;
