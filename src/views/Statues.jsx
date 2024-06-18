import { useEffect, useState } from 'react';
import { Box, Button, Card, Grid, TextField, useMediaQuery, useTheme } from '@mui/material';
import SquareIcon from '@mui/icons-material/Square';
import CircleIcon from '@mui/icons-material/Circle';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@iconify/react';
import StatueIconPng from '../assets/statue.png';

const StatueIcon = () => <img src={StatueIconPng} alt="Statue" />;

const Statue = ({ index, data, setData, statues }) => {
  const isMobile = !useMediaQuery('(min-width:1200px)');

  const iconInputSelect = (input, data) => {
    if (input === data) return setData(null);
    setData(input);
  };

  return (
    <Box>
      Statue {index + 1}:
      <Box>
        {(!data || (data && data === 'circle')) && (
          <IconButton
            onClick={() => iconInputSelect('circle', data)}
            sx={{ color: data === 'circle' ? '#880202' : null }}
            disabled={statues.find((item) => item === 'circle') && data !== 'circle'}
          >
            <CircleIcon sx={{ fontSize: isMobile ? '14px' : '24px' }} />
          </IconButton>
        )}
        {(!data || (data && data === 'triangle')) && (
          <IconButton
            onClick={() => iconInputSelect('triangle', data)}
            sx={{ color: data === 'triangle' ? '#880202' : null }}
            disabled={statues.find((item) => item === 'triangle') && data !== 'triangle'}
          >
            <Icon icon="mdi:triangle" style={{ fontSize: isMobile ? '14px' : '24px' }} />
          </IconButton>
        )}
        {(!data || (data && data === 'square')) && (
          <IconButton
            onClick={() => iconInputSelect('square', data)}
            sx={{ color: data === 'square' ? '#880202' : null }}
            disabled={statues.find((item) => item === 'square') && data !== 'square'}
          >
            <SquareIcon sx={{ fontSize: isMobile ? '14px' : '24px' }} />
          </IconButton>
        )}
      </Box>
      <StatueIcon />
    </Box>
  );
};

const Statues = ({ statues, setStatues, language, resetValue }) => {
  const [manualText, setManualText] = useState('');

  useEffect(() => {
    if (resetValue) setManualText('');
  }, [resetValue]);

  const formatValue = (newStatues) => {
    const formatStatue = (statue) => {
      if (statue === 'circle') return language === 'fr' ? 'R' : 'C';
      if (statue === 'triangle') return language === 'fr' ? 'T' : 'T';
      if (statue === 'square') return language === 'fr' ? 'C' : 'S';
      return '';
    };

    const value = formatStatue(newStatues[0]) + formatStatue(newStatues[1]) + formatStatue(newStatues[2]);

    setManualText(value);
  };

  const changeManualValue = (text) => {
    const newStatues = [null, null, null];

    if (!text) {
      newStatues[0] = null;
      newStatues[1] = null;
      newStatues[2] = null;

      setManualText(text);
      setStatues(newStatues);
      return null;
    }

    text = text.toUpperCase();

    const hasDuplicateChar = (str) => {
      const charSet = new Set();

      for (let char of str) {
        if (charSet.has(char)) {
          return true;
        }
        charSet.add(char);
      }

      return false;
    };

    if (hasDuplicateChar(text)) return null;

    const formatText = (value) => {
      if (value === 'C' && language === 'us') return 'circle';
      if (value === 'T' && language === 'us') return 'triangle';
      if (value === 'S' && language === 'us') return 'square';
      if (value === 'R' && language === 'fr') return 'circle';
      if (value === 'T' && language === 'fr') return 'triangle';
      if (value === 'C' && language === 'fr') return 'square';
      return null;
    };

    if (text.length >= 1) newStatues[0] = formatText(text[0]);
    if (text.length >= 2) newStatues[1] = formatText(text[1]);
    if (text.length >= 3) newStatues[2] = formatText(text[2]);

    if (manualText.length === 1) {
      const indexAdd = newStatues.findIndex((item) => item === null);

      if (newStatues.find((item) => item === 'circle') && newStatues.find((item) => item === 'triangle'))
        newStatues[indexAdd] = 'square';
      else if (newStatues.find((item) => item === 'circle') && newStatues.find((item) => item === 'square'))
        newStatues[indexAdd] = 'triangle';
      else if (newStatues.find((item) => item === 'square') && newStatues.find((item) => item === 'triangle'))
        newStatues[indexAdd] = 'circle';
      formatValue(newStatues);
      setStatues(newStatues);
    } else {
      setManualText(text);
      setStatues(newStatues);
    }
  };

  const setStatuesIndex = (index, value) => {
    const newStatues = [...statues];
    newStatues[index] = value;

    if (newStatues.filter((x) => x === null).length === 1 && value !== null) {
      const indexAdd = newStatues.findIndex((item) => item === null);

      if (newStatues.find((item) => item === 'circle') && newStatues.find((item) => item === 'triangle'))
        newStatues[indexAdd] = 'square';
      else if (newStatues.find((item) => item === 'circle') && newStatues.find((item) => item === 'square'))
        newStatues[indexAdd] = 'triangle';
      else if (newStatues.find((item) => item === 'square') && newStatues.find((item) => item === 'triangle'))
        newStatues[indexAdd] = 'circle';
    }
    formatValue(newStatues);
    setStatues(newStatues);
  };

  const updateText = (text) => {
    if (!text) return null;

    const formatText = (value) => {
      if (value === 'C' && language === 'fr') return 'R';
      if (value === 'R' && language === 'us') return 'C';
      if (value === 'S' && language === 'fr') return 'C';
      if (value === 'C' && language === 'us') return 'S';
      return value;
    };

    let newText = '';

    if (text.length >= 1) newText = newText + formatText(text[0]);
    if (text.length >= 2) newText = newText + formatText(text[1]);
    if (text.length >= 3) newText = newText + formatText(text[2]);

    changeManualValue(newText);
  };

  useEffect(() => {
    updateText(manualText);
  }, [language]);

  const alert = () => {
    if (manualText && /(.).*\1/.test(manualText))
      return (
        <Box sx={{ color: 'red' }}>
          <br />
          {language === 'us'
            ? 'WARNING: THE SAME SYMBOL CANNOT APPEAR TWICE ON TWO DIFFERENT STATUES  '
            : 'ATTENTION: IL NE PEUT PAS AVOIR DEUX FOIS LE MEME SYMBOLE SUR DEUX STATUES DIFFERENTES !'}
        </Box>
      );
  };

  return (
    <Card
      sx={{
        textAlign: 'center',
        margin: 'auto',
        width: '100%',
        mt: 2,
        backgroundColor: statues[0] && statues[1] && statues[2] ? 'success.blur' : 'rgba(1,1,1,0.1)'
      }}
    >
      <h3>Statues</h3>
      {language === 'us'
        ? 'Note the layout of the statues in solo room'
        : 'Note les symboles au dessus de chaque statues dans la salle solo'}
      <br />
      <br />
      <TextField value={manualText} onChange={(event) => changeManualValue(event.target.value)} />
      <br />
      <br />
      <Grid item container spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid item md={4}>
          <Statue index={0} data={statues[0]} setData={(value) => setStatuesIndex(0, value)} statues={statues} />
        </Grid>
        <Grid item md={4}>
          <Statue index={1} data={statues[1]} setData={(value) => setStatuesIndex(1, value)} statues={statues} />
        </Grid>
        <Grid item md={4}>
          <Statue index={2} data={statues[2]} setData={(value) => setStatuesIndex(2, value)} statues={statues} />
        </Grid>
      </Grid>
      <br />
      {alert()}
    </Card>
  );
};

export default Statues;
