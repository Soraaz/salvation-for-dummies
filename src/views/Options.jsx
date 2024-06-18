import { Box, Button, Card, FormControlLabel, FormGroup, Stack, Switch, Typography } from '@mui/material';

const Options = ({ reset, language, triumphMode, setTriumphMode }) => {
  const triumphModeAdvices = () => {
    if (language === 'fr')
      return (
        <Typography color={'secondary'} variant="h6">
          Remplissez les données de statues et de symboles des <b>3 modules ci-dessous</b> pour avoir l'ordre complet
          pour le triomphe.
        </Typography>
      );
    return (
      <Typography color={'secondary'} variant="h6">
        Fill in the statues and symbols data for <b>the 3 modules below</b> to get the complete order for the triumph.
      </Typography>
    );
  };

  const normalAdvices = () => {
    if (language === 'fr')
      return (
        <Typography color={'primary'} variant="h6">
          Remplissez les données des <b>"Statues"</b> puis de la <b>"Salle de dissection"</b> ou de la{' '}
          <b>"Salle Solo"</b> en fonction de l'endroit ou vous êtes.
        </Typography>
      );
    return (
      <Typography color={'primary'} variant="h6">
        Fill in the data for <b>"Statues"</b>, then <b>"Dissecting room"</b> or <b>"Solo room"</b>, depending on where
        you are.
      </Typography>
    );
  };

  return (
    <Card sx={{ textAlign: 'center', width: '100%', margin: 'auto', mt: 2 }}>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          height={'100%'}
          variant="contained"
          color="secondary"
          sx={{ mr: 2 }}
          onClick={() => {
            reset();
          }}
        >
          {language === 'us' ? 'Reset' : 'Reinitialiser'}
        </Button>
        <FormGroup aria-label="position">
          <FormControlLabel
            checked={triumphMode}
            onChange={(event) => setTriumphMode(event.target.checked)}
            value="top"
            control={<Switch color="secondary" />}
            label={language === 'us' ? 'Triumph Mode' : 'Mode Triomphe'}
          />
        </FormGroup>
      </Stack>
      <Box sx={{ mt: 2 }}>{triumphMode ? triumphModeAdvices() : normalAdvices()}</Box>
    </Card>
  );
};

export default Options;
