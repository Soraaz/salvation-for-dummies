// ----------------------------------------------------------------------
import BackGroundHeader from '../../assets/backgrounds/salvation.png';
import BackGroundHeaderNight from '../../assets/backgrounds/salvation.png';

export default function Body(theme, darkMode) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          color: 'hotpink'
        },
        body: {
          margin: 0,
          height: '100vh',
          width: '100vw',
          backgroundImage: darkMode ? `url(${BackGroundHeaderNight})` : `url(${BackGroundHeader})`,
          backgroundSize: 'cover',
          backgroundColor: 'invisible'
        },
        '*::-webkit-scrollbar-track': {
          borderRadius: '10px',
          background: 'rgba(255,255,255,0)'
        },
        '*::-webkit-scrollbar': {
          width: '12px',
          backgroundColor: '#F5F5F5'
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius: '10px',
          background: 'rgba(255,255,255,0.1)',
          boxShadow: 'inset 0 0 6px rgba(0,0,0,.3)'
        }
      }
    }
  };
}
