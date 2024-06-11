import { AppBar, Box, Button, IconButton, Toolbar, useTheme } from '@mui/material';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const NavbarHook = ({ isConnected = true, switchMode, darkMode }) => {
  const theme = useTheme();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo darkMode={darkMode} />
            {/* <Link to="/"> */}
            {/*<Button sx={{ color: 'text.main' }} startIcon={<ListIcon />}>*/}
            {/*  Servers monitoring*/}
            {/*</Button>*/}
            {/* </Link> */}
          </Box>

          {/* <Link to="/login"> */}
          <Box>
            {theme.palette.mode === 'light' ? (
              <IconButton onClick={switchMode} sx={{ color: theme.palette.info.main }}>
                <Brightness2Icon />
              </IconButton>
            ) : (
              <IconButton onClick={switchMode} sx={{ color: theme.palette.warning.main }}>
                <WbSunnyIcon />
              </IconButton>
            )}
            <Button
              sx={{
                color: 'text.primary'
              }}
              startIcon={<AccountCircleIcon />}
              onClick={() => {}}
            >
              {isConnected ? 'Se Déconnecter' : 'Se Connecter'}
            </Button>
          </Box>
          {/* </Link> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
