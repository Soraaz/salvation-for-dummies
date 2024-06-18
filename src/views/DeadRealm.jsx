import { Badge, Box, Card, Grid, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CircleIcon from '@mui/icons-material/Circle';
import { Icon } from '@iconify/react';
import SquareIcon from '@mui/icons-material/Square';
import { useEffect, useState } from 'react';
import StatueIconPng from '../assets/statue.png';
import { ArcherContainer, ArcherElement } from 'react-archer';

const StatueIcon = () => <img src={StatueIconPng} alt="Statue" />;

const ViewSymbol = ({ symbol, sx }) => {
  if (symbol === 'circle') return <CircleIcon sx={sx} height={25} />;
  if (symbol === 'triangle') return <Icon icon="mdi:triangle" style={sx} height={25} />;
  if (symbol === 'square') return <SquareIcon sx={sx} height={25} />;
  return <Box />;
};

const countForms = (symbols, symbols2) => {
  let circle = 0;
  let triangle = 0;
  let square = 0;

  const newForms = [symbols[0], symbols[1], symbols2[0], symbols2[1]];

  for (const form of newForms) {
    if (form === 'circle') circle = circle + 1;
    if (form === 'square') square = square + 1;
    if (form === 'triangle') triangle = triangle + 1;
  }

  return { circle, triangle, square, total: circle + triangle + square };
};

const Solution = ({
  statues,
  symbols,
  your,
  language,
  needAnotherPlayer,
  your2,
  symbols2,
  triumphMode,
  setTriumphModeData
}) => {
  const [solutions, setSolutions] = useState(null);
  const [others, setOthers] = useState(null);

  useEffect(() => {
    if (triumphMode && others) {
      setTriumphModeData([{ data: solutions, your }, others[0], others[1]]);
    }
  }, [triumphMode]);

  useEffect(() => {
    if (triumphMode && others) {
      setTriumphModeData([{ data: solutions, your }, others[0], others[1]]);
    }
  }, [solutions]);

  useEffect(() => {
    if (!statues[0] || !statues[1] || !statues[2] || !symbols[0] || !symbols[1] || !your) {
      setSolutions(null);
      setOthers(null);
      return null;
    }
    if (needAnotherPlayer && (!symbols2[0] || !symbols2[1] || !your2)) {
      setSolutions(null);
      setOthers(null);
      return null;
    }

    if (solutions === null) {
      const forms = countForms(symbols, symbols2);

      const lastSymbol = [];
      let your3;

      while (forms.square < 2) {
        lastSymbol.push('square');
        forms.square = forms.square + 1;
      }
      while (forms.circle < 2) {
        lastSymbol.push('circle');
        forms.circle = forms.circle + 1;
      }
      while (forms.triangle < 2) {
        lastSymbol.push('triangle');
        forms.triangle = forms.triangle + 1;
      }
      if ((your === 'circle' && your2 === 'triangle') || (your === 'triangle' && your2 === 'circle')) your3 = 'square';
      else if ((your === 'circle' && your2 === 'square') || (your === 'square' && your2 === 'circle'))
        your3 = 'triangle';
      else if ((your === 'square' && your2 === 'triangle') || (your === 'triangle' && your2 === 'square'))
        your3 = 'circle';

      setSolutions(resolve(statues, symbols, your, symbols2, your2));
      setOthers([
        { data: resolve(statues, symbols2, your2, symbols, your), your: your2 },
        { data: resolve(statues, lastSymbol, your3, symbols, your), your: your3 }
      ]);
    }
  }, [statues, symbols, your, needAnotherPlayer, symbols2, your2]);

  const forms = countForms(symbols, symbols2);

  const resolve = (statues, symbols, your, symbols2, your2) => {
    if (statues[0] === statues[1] || statues[0] === statues[2] || statues[1] === statues[2]) return null;
    if (forms.circle > 2 || forms.triangle > 2 || forms.square > 2) return null;
    // CAS FACILE DOUBLE SYMBOLE
    if (symbols[0] === symbols[1] && symbols[0] === your) {
      if (statues[0] === your) return { 1: { to: your, from: statues[1] }, 2: { to: your, from: statues[2] } };
      if (statues[1] === your) return { 1: { to: your, from: statues[0] }, 2: { to: your, from: statues[2] } };
      if (statues[2] === your) return { 1: { to: your, from: statues[0] }, 2: { to: your, from: statues[1] } };
    }
    // CAS UNIQUE TRIANGULAIRE
    if (needAnotherPlayer) {
      if (
        !(
          (symbols2[0] === symbols2[1] && symbols2[0] === your2) ||
          (symbols[0] === symbols2[0] && symbols[1] === symbols2[1]) ||
          (symbols[0] === symbols2[1] && symbols[1] === symbols2[0])
        )
      ) {
        if (statues[0] !== symbols[0] && statues[0] !== symbols[1])
          return { 1: { to: symbols[0], from: statues[0] }, 2: { to: symbols[1], from: statues[0] } };
        if (statues[1] !== symbols[0] && statues[1] !== symbols[1])
          return { 1: { to: symbols[0], from: statues[1] }, 2: { to: symbols[1], from: statues[1] } };
        if (statues[2] !== symbols[0] && statues[2] !== symbols[1])
          return { 1: { to: symbols[0], from: statues[2] }, 2: { to: symbols[1], from: statues[2] } };
      }
      if (your === your2) return null;
    }

    // ALGO CLASSIQUE
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

  if (!solutions) return null;
  // return (
  //   <Box sx={{ color: 'red' }}>
  //     <br />
  //     {language === 'us'
  //       ? 'ERROR: One of the given information is erroneous! Check your symbols!'
  //       : 'ERREUR: Une des infos donnée est erroné ! Vérifier vos symboles !'}
  //   </Box>
  // );

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
      <Box sx={{ textAlign: 'left' }}>
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
          <Grid container xs={12}>
            <Grid container item xs={12}>
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
              <Grid item md={4} sx={{ width: '33%' }}>
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
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item md={4} sx={{ width: '33%' }}>
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
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
              <Grid item md={4} sx={{ width: '33%' }}>
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
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
              <Grid item md={4} sx={{ width: '33%' }}>
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
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
            </Grid>
          </Grid>
        </Box>
      </ArcherContainer>
    );
  };

  if (triumphMode) return null;

  return (
    <Box>
      <hr />
      <TextSolution />
      <PaintSolution />
    </Box>
  );
};

const Symbol = ({ special, language, index, data, setData, isAnotherPlayer, disabledSymbol }) => {
  const isMobile = !useMediaQuery('(min-width:1200px)');

  const formatText = () => {
    if (special && isAnotherPlayer) return <Box>{language === 'us' ? 'Statue:' : 'Statue:'}</Box>;
    if (special) return <Box>{language === 'us' ? 'Statue:' : 'Statue:'}</Box>;

    return (
      <>
        Symbol{language === 'fr' ? 'e' : ''} {index + 1}:
      </>
    );
  };

  const color = special ? '#880202' : 'green';

  const iconInputSelect = (input, data) => {
    if (input === data) return setData(null);
    setData(input);
  };

  return (
    <Box>
      {formatText()}
      <Box>
        {(!data || (data && data === 'circle')) && (
          <IconButton
            onClick={() => iconInputSelect('circle', data)}
            sx={{ color: data === 'circle' ? color : null }}
            disabled={disabledSymbol === 'circle'}
          >
            <CircleIcon sx={{ fontSize: isMobile ? '14px' : '24px' }} />
          </IconButton>
        )}
        {(!data || (data && data === 'triangle')) && (
          <IconButton
            onClick={() => iconInputSelect('triangle', data)}
            sx={{ color: data === 'triangle' ? color : null }}
            disabled={disabledSymbol === 'triangle'}
          >
            <Icon icon="mdi:triangle" style={{ fontSize: isMobile ? '14px' : '24px' }} />
          </IconButton>
        )}
        {(!data || (data && data === 'square')) && (
          <IconButton
            onClick={() => iconInputSelect('square', data)}
            sx={{ color: data === 'square' ? color : null }}
            disabled={disabledSymbol === 'square'}
          >
            <SquareIcon sx={{ fontSize: isMobile ? '14px' : '24px' }} />
          </IconButton>
        )}
      </Box>
      {special && <StatueIcon />}
    </Box>
  );
};

const DeadRealm = ({ language, statues, resetValue, triumphMode, setTriumphModeData }) => {
  const [symbols, setSymbols] = useState([null, null]);
  const [your, setYour] = useState(null);
  const [symbols2, setSymbols2] = useState([null, null]);
  const [your2, setYour2] = useState(null);

  useEffect(() => {
    if (resetValue) {
      setSymbols([null, null]);
      setYour(null);
      setSymbols2([null, null]);
      setYour2(null);
    }
  }, [resetValue]);

  const setSymbolsIndex = (index, value) => {
    const newSymbols = [...symbols];
    newSymbols[index] = value;

    if (newSymbols.filter((x) => x === null).length === 1 && value !== null) {
      const indexAdd = newSymbols.findIndex((item) => item === null);

      if (!newSymbols.find((item) => item === 'circle') && your === 'circle') newSymbols[indexAdd] = 'circle';
      else if (!newSymbols.find((item) => item === 'triangle') && your === 'triangle')
        newSymbols[indexAdd] = 'triangle';
      else if (!newSymbols.find((item) => item === 'square') && your === 'square') newSymbols[indexAdd] = 'square';
    }

    setSymbols(newSymbols);
  };

  const setSymbolsIndex2 = (index, value) => {
    const newSymbols = [...symbols2];
    newSymbols[index] = value;

    if (newSymbols.filter((x) => x === null).length === 1 && value !== null) {
      const indexAdd = newSymbols.findIndex((item) => item === null);

      if (!newSymbols.find((item) => item === 'circle') && your2 === 'circle') newSymbols[indexAdd] = 'circle';
      else if (!newSymbols.find((item) => item === 'triangle') && your2 === 'triangle')
        newSymbols[indexAdd] = 'triangle';
      else if (!newSymbols.find((item) => item === 'square') && your2 === 'square') newSymbols[indexAdd] = 'square';
    }
    setSymbols2(newSymbols);
  };

  const alert = (symbols, your) => {
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

  const newPlayer = () => {
    return (
      <Box>
        <hr />
        <Box sx={{ color: 'yellow' }}>
          {language === 'us'
            ? 'The same information should be noted for another player in a solo room.'
            : 'Il faut noter les mêmes informations pour un autre joueur dans une salle solo'}
        </Box>
        <br />
        <Grid item container spacing={2} sx={{ justifyContent: 'center' }}>
          <Grid item md={4}>
            <Symbol
              special
              isAnotherPlayer
              language={language}
              data={your2}
              setData={(value) => setYour2(value)}
              disabledSymbol={your}
            />
          </Grid>
          <Grid item md={4}>
            <Symbol language={language} index={0} data={symbols2[0]} setData={(value) => setSymbolsIndex2(0, value)} />
          </Grid>
          <Grid item md={4}>
            <Symbol language={language} index={1} data={symbols2[1]} setData={(value) => setSymbolsIndex2(1, value)} />
          </Grid>
        </Grid>
        {/*<Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>*/}
        {/*  <Symbol special isAnotherPlayer language={language} data={your2} setData={(value) => setYour2(value)} />*/}
        {/*  <Symbol language={language} index={0} data={symbols2[0]} setData={(value) => setSymbolsIndex2(0, value)} />*/}
        {/*  <Symbol language={language} index={1} data={symbols2[1]} setData={(value) => setSymbolsIndex2(1, value)} />*/}
        {/*</Stack>*/}
        {alert(symbols2, your2)}
      </Box>
    );
  };

  let needAnotherPlayer = false;

  if (symbols[0] && symbols[1] && symbols[0] !== symbols[1]) needAnotherPlayer = true;
  if (triumphMode) needAnotherPlayer = true;

  return (
    <Card
      sx={{
        textAlign: 'center',
        width: '100%',
        margin: 'auto',
        mt: 2,
        backgroundColor:
          (!needAnotherPlayer && symbols[0] && symbols[1] && your) ||
          (needAnotherPlayer && symbols[0] && symbols[1] && your && symbols2[0] && symbols2[1] && your2)
            ? 'success.blur'
            : 'rgba(1,1,1,0.1)'
      }}
    >
      <h3>{language === 'us' ? 'Solo Room' : 'Salle solo'}</h3>
      {language === 'us'
        ? 'Choose the symbol for YOUR STATUE and the two symbols you see on the wall at the back of the room'
        : 'Choisissez le symbole de VOTRE STATUE et les deux symboles que vous voyez sur le mur du fond de la salle'}
      <br />
      <br />
      <Grid item container spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid item md={4}>
          <Symbol special language={language} data={your} setData={(value) => setYour(value)} />
        </Grid>
        <Grid item md={4}>
          <Symbol language={language} index={0} data={symbols[0]} setData={(value) => setSymbolsIndex(0, value)} />
        </Grid>
        <Grid item md={4}>
          <Symbol language={language} index={1} data={symbols[1]} setData={(value) => setSymbolsIndex(1, value)} />
        </Grid>
      </Grid>
      {/*<Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>*/}
      {/*  <Symbol special language={language} data={your} setData={(value) => setYour(value)} />*/}
      {/*  <Symbol language={language} index={0} data={symbols[0]} setData={(value) => setSymbolsIndex(0, value)} />*/}
      {/*  <Symbol language={language} index={1} data={symbols[1]} setData={(value) => setSymbolsIndex(1, value)} />*/}
      {/*</Stack>*/}
      {alert(symbols, your)}
      {needAnotherPlayer && newPlayer()}
      <Solution
        needAnotherPlayer={needAnotherPlayer}
        language={language}
        symbols={symbols}
        statues={statues}
        your={your}
        symbols2={symbols2}
        your2={your2}
        triumphMode={triumphMode}
        setTriumphModeData={setTriumphModeData}
      />
    </Card>
  );
};

export default DeadRealm;
