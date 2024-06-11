import { useEffect, useState } from 'react';
import { Box, Card, Grid, Stack, TextField } from '@mui/material';
import Statues from './Statues';
import DeadRealm from './DeadReal';
import Dissection from './Dissection';

const Verity = ({ language }) => {
  const [statues, setStatues] = useState([null, null, null]);

  return (
    <Box>
      <Grid container>
        <Grid item md={4}>
          <Dissection statues={statues} language={language} />
        </Grid>
        <Grid item md={4}>
          <Statues statues={statues} setStatues={setStatues} language={language} />
        </Grid>
        <Grid item md={4}>
          <DeadRealm statues={statues} language={language} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Verity;
