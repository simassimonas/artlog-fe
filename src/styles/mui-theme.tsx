import { createTheme } from '@mui/material/styles';
import palette from './mui-palette.module.scss';

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.primary,
    },
    secondary: {
      main: palette.secondary,
    },
    error: {
      main: palette.error,
    },
  },
});
