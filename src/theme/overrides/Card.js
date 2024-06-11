// ----------------------------------------------------------------------

export default function Card(theme, darkMode) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          background: 'rgba(1,1,1,0.1)',
          backdropFilter: 'blur(100px)',
          padding: '1em',
          boxShadow: '20px 20px 40px -6px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '20px'
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6CardTitle' },
        subheaderTypographyProps: {
          variant: 'body2'
        }
      },
      styleOverrides: {
        title: {
          color: theme.palette?.tertiary?.main
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2),
          '&:last-child': { paddingBottom: theme.spacing(2) }
        }
      }
    }
  };
}
