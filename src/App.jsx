import { useState } from 'react';
import ThemeConfig from './theme';
import Verity from './views/Verity';
import { Box, Button, Card, Modal } from '@mui/material';
import LanguageSwitch from './components/LanguageSwitch/LanguageSwitch';
import Logo from './assets/logo.png';
import Credits from './views/Credits';

function App() {
  const [language, setLanguage] = useState(
    localStorage.getItem('language') !== null ? localStorage.getItem('language') : 'us'
  );
  const [openVersionPopup, setOpenVersionPopup] = useState(false);

  return (
    <ThemeConfig darkMode={true}>
      <Card sx={{ textAlign: 'center', margin: 'auto', ml: 2, mr: 2 }}>
        <Box sx={{ display: 'flex' }}>
          <img src={Logo} alt="Salvation for dummies" height={50} />
          <LanguageSwitch language={language} setLanguage={setLanguage} />
          <Button onClick={() => setOpenVersionPopup(!openVersionPopup)}>Version 1.1</Button>
          <Modal open={openVersionPopup} onClose={() => setOpenVersionPopup(!openVersionPopup)}>
            <Card
              sx={{
                textAlign: 'center',
                margin: 'auto',
                width: '80%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              Patchnote 1.1
              <br />
              <br />
              Global:
              <br />
              - Add a reset button
              <br /> - Change UX for more user friendly interface
              <br /> - Improve responsive on phone
              <br />
              <br />
              Dissection:
              <br /> - Fixed a pattern with cone/cylinder/prism who’s not working on dissection
              <br /> - Fixed the order of some pattern of dissection to be more optimise and use the three symbol at
              first for optimise knights respawn
              <br />
              <br /> Statues: <br />- The command can now be written in lower case
              <br /> - Fixed a bug that prevented deletion of the 1st character
              <br />
              <br />
              Solo Room: <br />- Fixed a bug who cause one pattern to not be good - In addition, for some patterns, i've
              need to have symbols from another player in solo room
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
