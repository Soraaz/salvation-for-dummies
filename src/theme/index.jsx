import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
// material
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
//
import typography from './typography';
import palette from './palette';
import paletteDark from './paletteDark';
import componentsOverride from './overrides';

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node
};

export default function ThemeConfig({ children, darkMode }) {
  const themeOptions = {
    typography,
    palette: {
      ...paletteDark,
      mode: 'dark',
      action: {
        active: 'rgb(99, 115, 129)',
        hover: 'rgba(255, 255, 255, 0.08)',
        selected: 'rgba(255, 255, 255, 0.16)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        disabled: 'black'
      }
    },
    shape: { borderRadius: 22 }
  };

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme, darkMode);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
