import { useState } from 'react';
import ThemeConfig from './theme';
import Verity from './views/Verity';
import { Box, Card } from '@mui/material';
import LanguageSwitch from './components/LanguageSwitch/LanguageSwitch';
import Logo from './assets/logo.png';
import Credits from './views/Credits';

function App() {
  const [language, setLanguage] = useState(
    localStorage.getItem('language') !== null ? localStorage.getItem('language') : 'us'
  );

  return (
    <ThemeConfig darkMode={true}>
      <Card sx={{ textAlign: 'center', margin: 'auto' }}>
        <Box sx={{ display: 'flex' }}>
          <img src={Logo} alt="Salvation for dummies" height={50} />
          <LanguageSwitch language={language} setLanguage={setLanguage} />
        </Box>
      </Card>
      <Verity language={language} />
      <Credits language={language} />
    </ThemeConfig>
  );
}

export default App;
