import { Box, Grid, IconButton } from '@mui/material';
import FlagUS from '../../assets/flags/english.png';
import FlagFR from '../../assets/flags/french.png';

const LanguageSwitch = ({ language, setLanguage }) => {
  const flags = [
    { value: 'us', flag: FlagUS },
    { value: 'fr', flag: FlagFR }
  ];
  const switchMode = (data) => {
    setLanguage(data);
    localStorage.setItem('language', (data).toString());
  };

  return (
    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
      {flags.map((item, index) => (
        <Grid item key={index}>
          <IconButton
            onClick={() => switchMode(item.value)}
            sx={{ backgroundColor: item.value === language ? '#ead300' : null }}
          >
            <img src={item.flag} alt={item.value} height={30} width={40} />
          </IconButton>
        </Grid>
      ))}
    </Grid>
  );
};

export default LanguageSwitch;
