import { useState } from 'react';
import ThemeConfig from './theme';
import Verity from './views/Verity';
import { Box, Button, Card, Modal } from '@mui/material';
import LanguageSwitch from './components/LanguageSwitch/LanguageSwitch';
import Logo from './assets/logo.png';
import Credits from './views/Credits';
import { useRefreshCacheOnNewVersion } from './utils/cacheWhitePagesFix';

function App() {
  const [language, setLanguage] = useState(
    localStorage.getItem('language') !== null ? localStorage.getItem('language') : 'us'
  );
  const [openVersionPopup, setOpenVersionPopup] = useState(false);

  useRefreshCacheOnNewVersion();

  return (
    <ThemeConfig darkMode={true}>
      <Card sx={{ textAlign: 'center', margin: 'auto', ml: 2, mr: 2 }}>
        <Box sx={{ display: 'flex' }}>
          <img src={Logo} alt="Salvation for dummies" height={50} />
          <LanguageSwitch language={language} setLanguage={setLanguage} />
          <Button onClick={() => setOpenVersionPopup(!openVersionPopup)}>Version 2.0</Button>
          <Modal open={openVersionPopup} onClose={() => setOpenVersionPopup(!openVersionPopup)}>
            <Card
              sx={{
                textAlign: 'left',
                margin: 'auto',
                width: '80%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              Patchnote 2.0
              <br />
              <br />
              Global:
              <br />
              - Totally responsive on phone
              <br /> - Change UX for more user friendly interface
              <br /> - Add prepattern for every forms
              <br /> - Lock impossible patterns
              <br /> - Show only the selected form
              <br /> - Allow to unselect forms 2D/3D
              <br /> - Reset caches react with new version to resolve conflict with old algorithm
              <br /> - Add triumph mode
            </Card>
          </Modal>
        </Box>
      </Card>
      <Verity language={language} />
      <Credits language={language} />
    </ThemeConfig>
  );
}

export default App;
