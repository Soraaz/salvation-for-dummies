import { Badge, Box, Card, Grid, Stack, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CircleIcon from '@mui/icons-material/Circle';
import { Icon } from '@iconify/react';
import SquareIcon from '@mui/icons-material/Square';
import { useState } from 'react';
import StatueIconPng from '../assets/statue.png';
import { ArcherContainer, ArcherElement } from 'react-archer';

const StatueIcon = () => <img src={StatueIconPng} alt="Statue" />;

const ViewSymbol = ({ symbol, sx }) => {
  if (symbol === 'circle') return <CircleIcon sx={sx} height={25} />;
  if (symbol === 'triangle') return <Icon icon="mdi:triangle" style={sx} height={25} />;
  if (symbol === 'square') return <SquareIcon sx={sx} height={25} />;
};

const Solution = ({ statues, symbols, your, language }) => {
  if (!statues[0] || !statues[1] || !statues[2] || !symbols[0] || !symbols[1] || !your) return null;

  const resolve = () => {
    if (statues[0] === statues[1] || statues[0] === statues[2] || statues[1] === statues[2]) return null;
    // CAS FACILE DOUBLE SYMBOLE
    if (symbols[0] === symbols[1] && symbols[0] === your) {
      if (statues[0] === your) return { 1: { to: your, from: statues[1] }, 2: { to: your, from: statues[2] } };
      if (statues[1] === your) return { 1: { to: your, from: statues[0] }, 2: { to: your, from: statues[2] } };
      if (statues[2] === your) return { 1: { to: your, from: statues[0] }, 2: { to: your, from: statues[1] } };
    }
    if (symbols[0] === your) {
      if (statues[0] === your) {
        if (statues[1] === symbols[1])
          return { 1: { to: symbols[1], from: statues[2] }, 2: { to: symbols[0], from: statues[1] } };
        if (statues[2] === symbols[1])
          return { 1: { to: symbols[1], from: statues[1] }, 2: { to: symbols[0], from: statues[2] } };
      }
      if (statues[1] === your) {
        if (statues[0] === symbols[1])
          return { 1: { to: symbols[1], from: statues[2] }, 2: { to: symbols[0], from: statues[0] } };
        if (statues[2] === symbols[1])
          return { 1: { to: symbols[1], from: statues[0] }, 2: { to: symbols[0], from: statues[2] } };
      }
      if (statues[2] === your) {
        if (statues[0] === symbols[1])
          return { 1: { to: symbols[1], from: statues[1] }, 2: { to: symbols[0], from: statues[0] } };
        if (statues[1] === symbols[1])
          return { 1: { to: symbols[1], from: statues[0] }, 2: { to: symbols[0], from: statues[1] } };
      }
    }
    if (symbols[1] === your) {
      if (statues[0] === your) {
        if (statues[1] === symbols[0])
          return { 1: { to: symbols[0], from: statues[2] }, 2: { to: symbols[1], from: statues[1] } };
        if (statues[2] === symbols[0])
          return { 1: { to: symbols[0], from: statues[1] }, 2: { to: symbols[1], from: statues[2] } };
      }
      if (statues[1] === your) {
        if (statues[0] === symbols[0])
          return { 1: { to: symbols[0], from: statues[2] }, 2: { to: symbols[1], from: statues[0] } };
        if (statues[2] === symbols[0])
          return { 1: { to: symbols[0], from: statues[0] }, 2: { to: symbols[1], from: statues[2] } };
      }
      if (statues[2] === your) {
        if (statues[0] === symbols[0])
          return { 1: { to: symbols[0], from: statues[1] }, 2: { to: symbols[1], from: statues[0] } };
        if (statues[1] === symbols[0])
          return { 1: { to: symbols[0], from: statues[0] }, 2: { to: symbols[1], from: statues[1] } };
      }
    }
    return null;
  };

  const solutions = resolve();
  if (!solutions)
    return (
      <Box sx={{ color: 'red' }}>
        <br />
        {language === 'us'
          ? 'ERROR: One of the given information is erroneous! Check your symbols!'
          : 'ERREUR: Une des infos donnée est erroné ! Vérifier vos symboles !'}
      </Box>
    );

  let opposites;
  if (your === 'circle') opposites = ['triangle', 'square'];
  if (your === 'triangle') opposites = ['circle', 'square'];
  if (your === 'square') opposites = ['circle', 'triangle'];

  const TextSolution = () => {
    const step = language === 'us' ? 'Step' : 'Etape';
    const take = language === 'us' ? 'Take' : 'Prendre le';
    const dunk = language === 'us' ? 'and deposit it at the statue with a' : 'et le déposer a la statue avec un';
    const at = language === 'us' ? 'at' : 'à';
    const and = language === 'us' ? 'and' : 'et le';
    const knight = language === 'us' ? 'at knight' : 'sur un chevalier';
    const knights = language === 'us' ? 'at knights' : 'sur les chevalier';
    const end =
      language === 'us'
        ? 'and pass the mirror with these two symbols !'
        : 'et passer le miroir avec ces deux symboles !';

    const one = (
      <Box>
        {step} 1: {take} <ViewSymbol sx={{ color: 'green' }} symbol={solutions[1].to} /> {knight} {dunk}{' '}
        <ViewSymbol sx={{ color: '#880202' }} symbol={solutions[1].from} />
      </Box>
    );
    const two = (
      <Box>
        {step} 2: {take} <ViewSymbol sx={{ color: 'green' }} symbol={solutions[2].to} /> {knight} {dunk}{' '}
        <ViewSymbol sx={{ color: '#880202' }} symbol={solutions[2].from} />
      </Box>
    );

    const three = (
      <Box>
        {step} 3: {take} <ViewSymbol sx={{ color: 'green' }} symbol={opposites[0]} /> {and}
        <ViewSymbol sx={{ color: 'green' }} symbol={opposites[1]} /> {knights} {end}
      </Box>
    );

    return (
      <Box>
        {one}
        <br />
        {two}
        <br />
        {three}
        <br />
      </Box>
    );
  };

  const PaintSolution = () => {
    const you = (
      <>
        <b>{language === 'us' ? 'You' : 'Toi'}</b>
      </>
    );

    return (
      <ArcherContainer strokeColor="red">
        <Box sx={{ border: '5px solid #ff6550', p: 4 }}>
          <Grid container>
            <Grid container item xs={12}>
              <Grid item md={4}></Grid>
              <Grid item md={4}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ArcherElement
                    id="symbol1"
                    relations={[
                      {
                        targetId: 'symbol1End',
                        targetAnchor: statues[0] === solutions[1].from ? 'right' : 'left',
                        sourceAnchor: statues[1] === solutions[1].from ? 'left' : 'bottom'
                      }
                    ]}
                  >
                    <Box>
                      <ViewSymbol symbol={solutions[1].to} sx={{ color: 'green' }} />
                    </Box>
                  </ArcherElement>
                  <ArcherElement
                    id="symbol2"
                    relations={[
                      {
                        targetId: 'symbol2End',
                        targetAnchor: statues[2] === solutions[2].from ? 'left' : 'right',
                        sourceAnchor: statues[1] === solutions[2].from ? 'right' : 'bottom'
                      }
                    ]}
                  >
                    <Box>
                      <ViewSymbol symbol={solutions[2].to} sx={{ color: 'green' }} />
                    </Box>
                  </ArcherElement>
                </Box>
              </Grid>
              <Grid item md={4}></Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item md={4}>
                <Box>
                  <ViewSymbol symbol={statues[0]} sx={{ color: '#880202' }} />
                  <br />
                  <StatueIcon />
                  <br />
                  {statues[0] === solutions[1].from && (
                    <ArcherElement id="symbol1End">
                      <Box width={'fit-content'} display={'inline'}>
                        <ViewSymbol symbol={solutions[1].to} sx={{ color: 'green' }} />
                      </Box>
                    </ArcherElement>
                  )}
                  {statues[0] === solutions[2].from && (
                    <ArcherElement id="symbol2End">
                      <Box width={'fit-content'} display={'inline'}>
                        <ViewSymbol symbol={solutions[2].to} sx={{ color: 'green' }} />
                      </Box>
                    </ArcherElement>
                  )}
                  {your === statues[0] ? you : ''}
                </Box>
              </Grid>
              <Grid item md={4}></Grid>
              <Grid item md={4}>
                <Box>
                  <ViewSymbol symbol={statues[2]} sx={{ color: '#880202' }} />
                  <br />
                  <StatueIcon />
                  <br />
                  {statues[2] === solutions[1].from && (
                    <ArcherElement id="symbol1End">
                      <Box width={'fit-content'} display={'inline'}>
                        <ViewSymbol symbol={solutions[1].to} sx={{ color: 'green' }} />
                      </Box>
                    </ArcherElement>
                  )}
                  {statues[2] === solutions[2].from && (
                    <ArcherElement id="symbol2End">
                      <Box width={'fit-content'} display={'inline'}>
                        <ViewSymbol symbol={solutions[2].to} sx={{ color: 'green' }} />
                      </Box>
                    </ArcherElement>
                  )}
                  {your === statues[2] ? you : ''}
                </Box>
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item md={12}>
                <Box>
                  <ViewSymbol symbol={statues[1]} sx={{ color: '#880202' }} />
                  <br />
                  <StatueIcon />
                  <br />
                  {statues[1] === solutions[1].from && (
                    <Box>
                      <ArcherElement id="symbol1End">
                        <Box sx={{ position: 'relative', display: 'inline', left: '10px' }}></Box>
                      </ArcherElement>
                      <ViewSymbol symbol={solutions[1].to} sx={{ color: 'green' }} />
                    </Box>
                  )}
                  {statues[1] === solutions[2].from && (
                    <Box>
                      <ArcherElement id="symbol2End">
                        <Box sx={{ position: 'relative', display: 'inline', left: '10px' }}></Box>
                      </ArcherElement>
                      <ViewSymbol symbol={solutions[2].to} sx={{ color: 'green' }} />
                    </Box>
                  )}
                  {your === statues[1] ? you : ''}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </ArcherContainer>
    );
  };

  return (
    <Box sx={{ m: 2 }}>
      <hr />
      <TextSolution />
      <PaintSolution />
    </Box>
  );
};

const Symbol = ({ special, language, index, data, setData }) => {
  const formatText = () => {
    if (special) {
      return <Box>{language === 'us' ? 'YOUR STATUE SYMBOL:' : 'SYMBOLE DE VOTRE STATUE:'}</Box>;
    }

    return (
      <>
        Symbol{language === 'fr' ? 'e' : ''} {index + 1}:
      </>
    );
  };

  const color = special ? '#880202' : 'green';

  return (
    <Box>
      {formatText()}
      <Box>
        <IconButton onClick={() => setData('circle')} sx={{ color: data === 'circle' ? color : null }}>
          <CircleIcon />
        </IconButton>
        <IconButton onClick={() => setData('triangle')} sx={{ color: data === 'triangle' ? color : null }}>
          <Icon icon="mdi:triangle" />
        </IconButton>
        <IconButton onClick={() => setData('square')} sx={{ color: data === 'square' ? color : null }}>
          <SquareIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const DeadRealm = ({ language, statues }) => {
  const [symbols, setSymbols] = useState([null, null]);
  const [your, setYour] = useState(null);

  const setSymbolsIndex = (index, value) => {
    const newSymbols = [...symbols];
    newSymbols[index] = value;
    setSymbols(newSymbols);
  };

  const alert = () => {
    if (!your || !symbols[0] || !symbols[1]) return;
    if (your !== symbols[0] && your !== symbols[1])
      return (
        <Box sx={{ color: 'red' }}>
          <br />
          {language === 'us'
            ? 'WARNING: ONE OF YOUR TWO SYMBOLS MUST BE THE SAME AS YOUR STATUE !'
            : 'ATTENTION: UN DE VOS DEUX SYMBOLES DOIT FORCEMENT ETRE LE MEME QUE VOTRE STATUE !'}
        </Box>
      );
  };

  return (
    <Card sx={{ p: 1, m: 2, textAlign: 'center' }}>
      <h3>{language === 'us' ? 'Solo Room' : 'Salle solo'}</h3>
      {language === 'us'
        ? 'Choose the symbol for YOUR STATUE and the two symbols you see on the wall at the back of the room'
        : 'Choisissez le symbole de VOTRE STATUE et les deux symboles que vous voyez sur le mur du fond de la salle'}
      <br />
      <br />
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
        <Symbol special language={language} data={your} setData={(value) => setYour(value)} />
        <Symbol language={language} index={0} data={symbols[0]} setData={(value) => setSymbolsIndex(0, value)} />
        <Symbol language={language} index={1} data={symbols[1]} setData={(value) => setSymbolsIndex(1, value)} />
      </Stack>
      {alert()}
      <Solution language={language} symbols={symbols} statues={statues} your={your} />
    </Card>
  );
};

export default DeadRealm;
