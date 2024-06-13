import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Statues from './Statues';
import DeadRealm from './DeadRealm';
import Dissection from './Dissection';

const Verity = ({ language }) => {
  const [statues, setStatues] = useState([null, null, null]);
  const [resetValue, setResetValue] = useState(false);

  const reset = () => {
    setStatues([null, null, null]);
    setResetValue(true);
  };

  useEffect(() => {
    if (resetValue) setResetValue(false);
  }, [resetValue]);

  return (
    <Box width={'100%'}>
      <Grid item container spacing={2} sx={{ pl: 2, pr: 2 }}>
        <Grid item md={4}>
          {statues && statues[0] && statues[1] && statues[2] && (
            <Dissection statues={statues} language={language} resetValue={resetValue} />
          )}
        </Grid>
        <Grid item md={4}>
          <Statues statues={statues} setStatues={setStatues} language={language} reset={reset} />
        </Grid>
        <Grid item md={4}>
          {statues && statues[0] && statues[1] && statues[2] && (
            <DeadRealm statues={statues} language={language} resetValue={resetValue} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Verity;
