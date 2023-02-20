import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, red, indigo, purple, amber, brown } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark',
    // primary: {
    //   main: indigo[500],
    // },
    // secondary: {
    //   main: green[500],
    // },
  },
});

function AppThemeProvider({ children }) {
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
