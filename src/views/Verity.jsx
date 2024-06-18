import { useEffect, useState } from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import Statues from './Statues';
import DeadRealm from './DeadRealm';
import Dissection from './Dissection';
import Options from './Options';
import TriumphModeSolution from './TriumphModeSolution';

const Verity = ({ language }) => {
  const [statues, setStatues] = useState([null, null, null]);
  const [resetValue, setResetValue] = useState(false);
  const [triumphMode, setTriumphMode] = useState(false);
  const [triumphModeData, setTriumphModeData] = useState({});

  const reset = () => {
    setStatues([null, null, null]);
    setResetValue(true);
  };

  useEffect(() => {
    if (resetValue) setResetValue(false);
  }, [resetValue]);

  const handleTriumphModeDate = (newData) => {
    setTriumphModeData({ ...triumphModeData, ...newData });
  };

  return (
    <Box width={'100%'}>
      <Grid item container spacing={2} sx={{ pl: 2, pr: 2 }}>
        <Grid item md={12} width={'100%'}>
          <Options reset={reset} language={language} triumphMode={triumphMode} setTriumphMode={setTriumphMode} />
        </Grid>
        <Grid item md={4} width={'100%'}>
          <Statues statues={statues} setStatues={setStatues} language={language} resetValue={resetValue} />
        </Grid>
        <Grid item md={4} width={'100%'}>
          <Dissection
            statues={statues}
            language={language}
            resetValue={resetValue}
            triumphMode={triumphMode}
            setTriumphModeData={(data) => handleTriumphModeDate({ dissection: data })}
          />
        </Grid>
        <Grid item md={4} width={'100%'}>
          <DeadRealm
            statues={statues}
            language={language}
            resetValue={resetValue}
            triumphMode={triumphMode}
            setTriumphModeData={(data) => handleTriumphModeDate({ solo: data })}
          />
        </Grid>
        <Grid item md={12} width={'100%'}>
          <TriumphModeSolution
            triumphModeData={triumphModeData}
            triumphMode={triumphMode}
            language={language}
            statues={statues}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Verity;
