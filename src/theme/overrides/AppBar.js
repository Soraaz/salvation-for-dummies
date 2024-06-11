// ----------------------------------------------------------------------

export default function AppBar(theme) {
  return {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'rgba(255,255,255,0.2)'
        },
        root: {
          background: 'rgba(255,255,255,0.2)'
        }
      }
    }
  };
}
