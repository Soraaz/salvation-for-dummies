import { Box, Card, Grid, Stack } from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@iconify/react';
import StatueIconPng from '../assets/statue.png';
import { ArcherContainer, ArcherElement } from 'react-archer';
import CircleIcon from '@mui/icons-material/Circle';
import SquareIcon from '@mui/icons-material/Square';

const StatueIcon = () => <img src={StatueIconPng} alt="Statue" />;

const ViewSymbol = ({ symbol, sx }) => {
  if (symbol === 'cylinder') return <Icon icon="mdi:cylinder" style={sx} height={25} />;
  if (symbol === 'cone') return <Icon icon="mdi:cone" style={sx} height={25} />;
  if (symbol === 'prism') return <Icon icon="tabler:prism" style={sx} height={25} />;
  if (symbol === 'pyramid') return <Icon icon="mdi:pyramid" style={sx} height={25} />;
  if (symbol === 'sphere') return <Icon icon="mdi:sphere" style={sx} height={25} />;
  if (symbol === 'cube') return <Icon icon="mdi:cube-outline" style={sx} height={25} />;
  if (symbol === 'circle') return <CircleIcon sx={sx} height={25} />;
  if (symbol === 'triangle') return <Icon icon="mdi:triangle" style={sx} height={25} />;
  if (symbol === 'square') return <SquareIcon sx={sx} height={25} />;
  return null;
};

const Symbol = ({ index, data, setData }) => {
  const formatText = () => {
    return <>Statue {index + 1}:</>;
  };

  return (
    <Box>
      {formatText()}
      <Box>
        <IconButton onClick={() => setData('cube')} sx={{ color: data === 'cube' ? '#880202' : null }}>
          <ViewSymbol symbol={'cube'} />
        </IconButton>
        <IconButton onClick={() => setData('sphere')} sx={{ color: data === 'sphere' ? '#880202' : null }}>
          <ViewSymbol symbol={'sphere'} />
        </IconButton>
        <IconButton onClick={() => setData('pyramid')} sx={{ color: data === 'pyramid' ? '#880202' : null }}>
          <ViewSymbol symbol={'pyramid'} />
        </IconButton>
        <br />
        <IconButton onClick={() => setData('cylinder')} sx={{ color: data === 'cylinder' ? '#880202' : null }}>
          <ViewSymbol symbol={'cylinder'} />
        </IconButton>
        <IconButton onClick={() => setData('prism')} sx={{ color: data === 'prism' ? '#880202' : null }}>
          <ViewSymbol symbol={'prism'} />
        </IconButton>
        <IconButton onClick={() => setData('cone')} sx={{ color: data === 'cone' ? '#880202' : null }}>
          <ViewSymbol symbol={'cone'} />
        </IconButton>
      </Box>
      <StatueIcon />
    </Box>
  );
};

const getOpposite = (symbol) => {
  if (symbol === 'circle') return 'prism';
  if (symbol === 'triangle') return 'cylinder';
  if (symbol === 'square') return 'cone';
  return null;
};

const Solution = ({ language, statues, symbols }) => {
  if (!statues[0] || !statues[1] || !statues[2] || !symbols[0] || !symbols[1] || !symbols[2]) return null;
  if (symbols[0] === symbols[1] || symbols[0] === symbols[2] || symbols[1] === symbols[2]) return null;
  if (symbols.find((e) => e === 'prism') && symbols.find((e) => e === 'cone') && symbols.find((e) => e === 'cylinder'))
    return null;
  if (symbols.find((e) => e === 'sphere') && symbols.find((e) => e === 'cube') && !symbols.find((e) => e === 'pyramid'))
    return null;
  if (symbols.find((e) => e === 'sphere') && symbols.find((e) => e === 'pyramid') && !symbols.find((e) => e === 'cube'))
    return null;
  if (symbols.find((e) => e === 'pyramid') && symbols.find((e) => e === 'cube') && !symbols.find((e) => e === 'sphere'))
    return null;

  const resolve = () => {
    let step4 = null;
    let step5 = null;

    if (symbols[0] === 'sphere' || symbols[0] === 'cube' || symbols[0] === 'pyramid') step4 = 0;
    else if (symbols[1] === 'sphere' || symbols[1] === 'cube' || symbols[1] === 'pyramid') step4 = 1;

    if (step4 === 0 && (symbols[1] === 'sphere' || symbols[1] === 'cube' || symbols[1] === 'pyramid')) step5 = 1;
    return {
      statues: [getOpposite(statues[0]), getOpposite(statues[1]), getOpposite(statues[2])],
      step4: step4,
      step5: step5
    };
  };

  const solution = resolve();

  if (!solution)
    return (
      <Box sx={{ color: 'red' }}>
        <br />
        {language === 'us'
          ? 'ERROR: One of the given information is erroneous! Check your symbols!'
          : 'ERREUR: Une des infos donnée est erroné ! Vérifier vos symboles !'}
      </Box>
    );

  const PaintSolution = () => {
    return (
      <Box sx={{ border: '5px solid #ff6550', p: 4 }}>
        <Grid container>
          <Grid container item xs={12}>
            <Grid item md={4}></Grid>
            <Grid item md={4}></Grid>
            <Grid item md={4}></Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item md={4}>
              <Box>
                <ViewSymbol symbol={solution.statues[0]} sx={{ color: '#880202' }} />
                <br />
                <StatueIcon />
                <br />
              </Box>
            </Grid>
            <Grid item md={4}></Grid>
            <Grid item md={4}>
              <Box>
                <ViewSymbol symbol={solution.statues[2]} sx={{ color: '#880202' }} />
                <br />
                <StatueIcon />
                <br />
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item md={12}>
              <Box>
                <ViewSymbol symbol={solution.statues[1]} sx={{ color: '#880202' }} />
                <br />
                <StatueIcon />
                <br />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const TextSolution = () => {
    const step = language === 'us' ? 'Step' : 'Etape';
    const dunk = language === 'us' ? 'Place the' : 'Dépose le symbole';
    const atStatue = language === 'us' ? 'symbol on the' : 'sur la statue';
    const left = language === 'us' ? 'LEFT  statue' : 'de GAUCHE';
    const right = language === 'us' ? 'RIGHT statue' : 'de DROITE';
    const middle = language === 'us' ? 'MIDDLE statue' : 'du MILLIEU';

    const step4View = () => {
      if (solution.step4 === null) return null;
      if (solution.step4 === 0)
        return (
          <Box>
            {step} 4: {dunk} <ViewSymbol sx={{ color: 'green' }} symbol={statues[0]} /> {atStatue} <b>{left}</b>
          </Box>
        );
      else
        return (
          <Box>
            {step} 4: {dunk} <ViewSymbol sx={{ color: 'green' }} symbol={statues[1]} /> {atStatue} <b>{middle}</b>
          </Box>
        );
    };

    const step5View = () => {
      if (solution.step5 === null) return null;
      return (
        <>
          <Box>
            {step} 5: {dunk} <ViewSymbol sx={{ color: 'green' }} symbol={statues[1]} /> {atStatue} <b>{middle}</b>
          </Box>
          <Box>
            {step} 6: {dunk} <ViewSymbol sx={{ color: 'green' }} symbol={statues[2]} /> {atStatue} <b>{right}</b>
          </Box>
        </>
      );
    };

    const beginning = (
      <Box>
        <Box>
          {step} 1: {dunk} <ViewSymbol sx={{ color: 'green' }} symbol={statues[0]} /> {atStatue} <b>{left}</b>
        </Box>
        <Box>
          {step} 2: {dunk} <ViewSymbol sx={{ color: 'green' }} symbol={statues[1]} /> {atStatue} <b>{middle}</b>
        </Box>
        <Box>
          {step} 3: {dunk} <ViewSymbol sx={{ color: 'green' }} symbol={statues[2]} /> {atStatue} <b>{right}</b>
        </Box>
        {step4View()}
        {step5View()}
      </Box>
    );

    return <Box sx={{ textAlign: 'left' }}>{beginning}</Box>;
  };

  return (
    <Box>
      <hr />
      <TextSolution />
      <br />
      <PaintSolution />
    </Box>
  );
};

const Dissection = ({ language, statues }) => {
  const [symbols, setSymbols] = useState([null, null, null]);

  const setSymbolsIndex = (index, value) => {
    const newSymbols = [...symbols];
    newSymbols[index] = value;
    setSymbols(newSymbols);
  };

  const errorFormat = () => {
    return (
      <Box sx={{ color: 'red' }}>
        <br />
        {language === 'us'
          ? 'WARNING: YOUR CONFIGURATION IS NOT POSSIBLE !'
          : "ATTENTION: VOTRE CONFIGURATION N'EST PAS POSSIBLE !"}
      </Box>
    );
  };

  const alert = () => {
    if (!symbols[0] || !symbols[1] || !symbols[2]) return;
    if (
      symbols.find((e) => e === 'prism') &&
      symbols.find((e) => e === 'cone') &&
      symbols.find((e) => e === 'cylinder')
    )
      return errorFormat();
    if (
      symbols.find((e) => e === 'sphere') &&
      symbols.find((e) => e === 'cube') &&
      !symbols.find((e) => e === 'pyramid')
    )
      return errorFormat();
    if (
      symbols.find((e) => e === 'sphere') &&
      symbols.find((e) => e === 'pyramid') &&
      !symbols.find((e) => e === 'cube')
    )
      return errorFormat();
    if (
      symbols.find((e) => e === 'pyramid') &&
      symbols.find((e) => e === 'cube') &&
      !symbols.find((e) => e === 'sphere')
    )
      return errorFormat();
    if (symbols[0] === symbols[1] || symbols[0] === symbols[2] || symbols[1] === symbols[2])
      return (
        <Box sx={{ color: 'red' }}>
          <br />
          {language === 'us'
            ? "WARNING: YOU'VE USED THE SAME SYMBOL TWICE!"
            : 'ATTENTION: VOUS AVEZ MIS DEUX FOIS LE MEME SYMBOLE !'}
        </Box>
      );
  };

  return (
    <Card sx={{ p: 1, m: 2, textAlign: 'center' }}>
      <h3>{language === 'us' ? 'Dissection Room' : 'Salle de dissection'}</h3>
      {language === 'us'
        ? 'Name the 3 geometric shapes you see on the statues'
        : 'Donner les 3 figures géométrique que vous voyez sur les statues'}
      <br />
      <br />
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
        <Symbol index={0} data={symbols[0]} setData={(value) => setSymbolsIndex(0, value)} />
        <Symbol index={1} data={symbols[1]} setData={(value) => setSymbolsIndex(1, value)} />
        <Symbol index={2} data={symbols[2]} setData={(value) => setSymbolsIndex(2, value)} />
      </Stack>
      {alert()}
      <Solution language={language} symbols={symbols} statues={statues} />
    </Card>
  );
};

export default Dissection;
