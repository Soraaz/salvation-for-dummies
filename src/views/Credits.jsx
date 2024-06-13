import { Card } from '@mui/material';

const Credits = ({ language }) => {
  if (language === 'us')
    return (
      <Card sx={{ background: 'black', textAlign: 'center', position: 'sticky', bottom: 0, m: 2, pb: 2 }}>
        This tool was created by <a href={'https://raid.report/pc/4611686018470692541'}>Soraaz</a>. You can follow me on{' '}
        <a href={'https://twitter.com/Soraaz3'}>twitter</a> or contact me via Discord under the nickname “soraaz”.
      </Card>
    );

  return (
    <Card
      sx={{
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        bottom: 20,
        m: 2,
        pb: 2
      }}
    >
      Cette outil a été créé par <a href={'https://raid.report/pc/4611686018470692541'}>Soraaz</a>. Vous pouvez me
      suivre sur <a href={'https://twitter.com/Soraaz3'}>twitter</a> ou bien me contacter via Discord au pseudo
      "soraaz".
    </Card>
  );
};

export default Credits;
