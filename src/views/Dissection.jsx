import { Box, Card, Grid, Stack, TextField, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@iconify/react';
import StatueIconPng from '../assets/statue.png';
import CircleIcon from '@mui/icons-material/Circle';
import SquareIcon from '@mui/icons-material/Square';

const checkForm = (form) => {
  if (form === 'prism') return ['triangle', 'square'];
  if (form === 'cone') return ['triangle', 'circle'];
  if (form === 'cylinder') return ['circle', 'square'];
  if (form === 'pyramid') return ['triangle', 'triangle'];
  if (form === 'cube') return ['square', 'square'];
  if (form === 'sphere') return ['circle', 'circle'];
  return [];
};

const checkForm3d = (form) => {
  if (form.includes('triangle') && form.includes('square')) return 'prism';
  if (form.includes('triangle') && form.includes('circle')) return 'cone';
  if (form.includes('circle') && form.includes('square')) return 'cylinder';
  if (form.includes('triangle')) return 'pyramid';
  if (form.includes('square')) return 'cube';
  if (form.includes('circle')) return 'sphere';
  return null;
};

const StatueIcon = () => <img src={StatueIconPng} alt="Statue" />;

const ViewSymbol = ({ symbol, sx = { height: 25 } }) => {
  if (symbol === 'cylinder') return <Icon icon="mdi:cylinder" style={sx} />;
  if (symbol === 'cone') return <Icon icon="mdi:cone" style={sx} />;
  if (symbol === 'prism') return <Icon icon="tabler:prism" style={sx} />;
  if (symbol === 'pyramid') return <Icon icon="mdi:pyramid" style={sx} />;
  if (symbol === 'sphere') return <Icon icon="mdi:sphere" style={sx} />;
  if (symbol === 'cube') return <Icon icon="mdi:cube-outline" style={sx} />;
  if (symbol === 'circle') return <CircleIcon sx={sx} />;
  if (symbol === 'triangle') return <Icon icon="mdi:triangle" style={sx} height={sx.height} />;
  if (symbol === 'square') return <SquareIcon sx={sx} />;
  return <Box />;
};

const Symbol = ({ index, data, setData, forms, pseudo, setPseudo, triumphMode }) => {
  const isMobile = !useMediaQuery('(min-width:1200px)');
  const formatText = () => {
    return <>Statue {index + 1}:</>;
  };

  const iconInputSelect = (input, data) => {
    if (input === data) return setData(null);
    setData(input);
  };

  const checkDisable = (input) => {
    if (input === data) return false;
    const deconstruct = checkForm(input);

    if (deconstruct[0] === deconstruct[1]) return forms[deconstruct[0]] + 2 > 2;
    return forms[deconstruct[0]] + 1 > 2 || forms[deconstruct[1]] + 1 > 2;
  };

  return (
    <Box>
      {formatText()}
      <Box>
        {(!data || (data && data === 'cube')) && (
          <IconButton
            disabled={checkDisable('cube')}
            onClick={() => iconInputSelect('cube', data)}
            sx={{ color: data === 'cube' ? '#880202' : null }}
          >
            <ViewSymbol symbol={'cube'} sx={{ fontSize: isMobile ? '14px' : '24px' }} />
          </IconButton>
        )}
        {(!data || (data && data === 'sphere')) && (
          <IconButton
            disabled={checkDisable('sphere')}
            onClick={() => iconInputSelect('sphere', data)}
            sx={{ color: data === 'sphere' ? '#880202' : null }}
          >
            <ViewSymbol symbol={'sphere'} sx={{ fontSize: isMobile ? '14px' : '24px' }} />
          </IconButton>
        )}
        {(!data || (data && data === 'pyramid')) && (
          <IconButton
            disabled={checkDisable('pyramid')}
            onClick={() => iconInputSelect('pyramid', data)}
            sx={{ color: data === 'pyramid' ? '#880202' : null }}
          >
            <ViewSymbol symbol={'pyramid'} sx={{ fontSize: isMobile ? '14px' : '24px' }} />
          </IconButton>
        )}
        {!data && <br />}
        {(!data || (data && data === 'cylinder')) && (
          <IconButton
            disabled={checkDisable('cylinder')}
            onClick={() => iconInputSelect('cylinder', data)}
            sx={{ color: data === 'cylinder' ? '#880202' : null }}
          >
            <ViewSymbol symbol={'cylinder'} sx={{ fontSize: isMobile ? '14px' : '24px' }} />
          </IconButton>
        )}
        {(!data || (data && data === 'prism')) && (
          <IconButton
            disabled={checkDisable('prism')}
            onClick={() => iconInputSelect('prism', data)}
            sx={{ color: data === 'prism' ? '#880202' : null }}
          >
            <ViewSymbol symbol={'prism'} sx={{ fontSize: isMobile ? '14px' : '24px' }} />
          </IconButton>
        )}
        {(!data || (data && data === 'cone')) && (
          <IconButton
            disabled={checkDisable('cone')}
            onClick={() => iconInputSelect('cone', data)}
            sx={{ color: data === 'cone' ? '#880202' : null }}
          >
            <ViewSymbol symbol={'cone'} sx={{ fontSize: isMobile ? '14px' : '24px' }} />
          </IconButton>
        )}
      </Box>
      <StatueIcon />
      <br />
      {triumphMode && <TextField value={pseudo} onChange={setPseudo} label={'Pseudo'} sx={{ mt: 2 }} />}
    </Box>
  );
};

const getOpposite = (symbol) => {
  if (symbol === 'circle') return 'prism';
  if (symbol === 'triangle') return 'cylinder';
  if (symbol === 'square') return 'cone';
  return null;
};

const Solution = ({ language, statues, symbols, forms, triumphMode, setTriumphModeData, pseudos }) => {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    if (triumphMode) {
      setTriumphModeData({ solution: solution, pseudos: pseudos });
    }
  }, [triumphMode]);

  useEffect(() => {
    if (triumphMode) {
      setTriumphModeData({ solution: solution, pseudos: pseudos });
    }
  }, [solution, pseudos]);

  useEffect(() => {
    if (!statues[0] || !statues[1] || !statues[2] || !symbols[0] || !symbols[1] || !symbols[2]) {
      if (solution === null) return;
      return setSolution(null);
    }
    if (forms && forms.total !== 6 && forms.circle !== 2 && forms.square !== 2 && forms.triangle !== 2) {
      if (solution === null) return;
      return setSolution(null);
    }
    if (triumphMode && (pseudos[0] === '' || pseudos[1] === '' || pseudos[2] === '')) {
      if (solution === null) return;
      return setSolution(null);
    }

    if (solution === null) {
      const sol = simulate();
      setSolution(sol);
      setTriumphModeData({ solution: sol, pseudos: pseudos });
    }
  }, [statues, symbols, forms, pseudos]);

  const simulate = () => {
    let start = [checkForm(symbols[0]), checkForm(symbols[1]), checkForm(symbols[2])];
    const end = [
      checkForm(getOpposite(statues[0])),
      checkForm(getOpposite(statues[1])),
      checkForm(getOpposite(statues[2]))
    ];

    let steps = [];

    const calculateWeight = (startTmp, endTmp) => {
      const symbolsStart = [...startTmp];
      const symbolsEnd = [...endTmp];
      let point = 0;

      if (
        (symbolsStart[0] === 'circle' || symbolsStart[1] === 'circle') &&
        (symbolsEnd[0] === 'circle' || symbolsEnd[1] === 'circle')
      ) {
        point = 1;
        const index = symbolsEnd.indexOf('circle');
        symbolsEnd.splice(index, 1);
        const index2 = symbolsStart.indexOf('circle');
        symbolsStart.splice(index2, 1);
      } else if (
        (symbolsStart[0] === 'triangle' || symbolsStart[1] === 'triangle') &&
        (symbolsEnd[0] === 'triangle' || symbolsEnd[1] === 'triangle')
      ) {
        point = 1;
        const index = symbolsEnd.indexOf('triangle');
        symbolsEnd.splice(index, 1);
        const index2 = symbolsStart.indexOf('triangle');
        symbolsStart.splice(index2, 1);
      } else if (
        (symbolsStart[0] === 'square' || symbolsStart[1] === 'square') &&
        (symbolsEnd[0] === 'square' || symbolsEnd[1] === 'square')
      ) {
        point = 1;
        const index = symbolsEnd.indexOf('square');
        symbolsEnd.splice(index, 1);
        const index2 = symbolsStart.indexOf('square');
        symbolsStart.splice(index2, 1);
      }

      if (point) {
        if (symbolsEnd[0] === symbolsStart[0]) return 2;
        return 1;
      }
      return 0;
    };

    const updateData = (start, end, steps, statues, step1, step2, symbol1, symbol2, indexStart1, indexStart2) => {
      if (start[indexStart1][0] === start[indexStart1][1] && start[indexStart1][0] !== symbol1)
        symbol1 = start[indexStart1][0];
      if (start[indexStart2][0] === start[indexStart2][1] && start[indexStart2][0] !== symbol2)
        symbol2 = start[indexStart2][0];

      steps.push({ statue: step1, symbol: symbol1 });
      steps.push({ statue: step2, symbol: symbol2 });

      const index = start[indexStart1].indexOf(symbol1);
      const index2 = start[indexStart2].indexOf(symbol2);
      start[indexStart1][index] = symbol2;
      start[indexStart2][index2] = symbol1;

      return { start, steps };
    };

    let i = 0;

    while (
      (calculateWeight(start[0], end[0]) !== 2 ||
        calculateWeight(start[1], end[1]) !== 2 ||
        calculateWeight(start[2], end[2]) !== 2) &&
      i <= 4
    ) {
      const weights = [
        calculateWeight(start[0], end[0]),
        calculateWeight(start[1], end[1]),
        calculateWeight(start[2], end[2])
      ];

      // 0 WEIGHT
      if (weights[0] === 0 && weights[1] === 0) {
        const data = updateData(start, end, steps, statues, 'left', 'middle', statues[0], statues[1], 0, 1);
        start = data.start;
        steps = data.steps;
      } else if (weights[0] === 0 && weights[2] === 0) {
        const data = updateData(start, end, steps, statues, 'left', 'right', statues[0], statues[2], 0, 2);
        start = data.start;
        steps = data.steps;
      } else if (weights[1] === 0 && weights[2] === 0) {
        const data = updateData(start, end, steps, statues, 'middle', 'right', statues[1], statues[2], 1, 2);
        start = data.start;
        steps = data.steps;
      }
      // 0 WEIGHT with 1
      else if (weights[0] === 0 && weights[1] <= 1) {
        const data = updateData(start, end, steps, statues, 'left', 'middle', statues[0], statues[1], 0, 1);
        start = data.start;
        steps = data.steps;
      } else if (weights[0] === 0 && weights[2] <= 1) {
        const data = updateData(start, end, steps, statues, 'left', 'right', statues[0], statues[2], 0, 2);
        start = data.start;
        steps = data.steps;
      } else if (weights[1] === 0 && weights[2] <= 1) {
        const data = updateData(start, end, steps, statues, 'middle', 'right', statues[1], statues[2], 1, 2);
        start = data.start;
        steps = data.steps;
      } else if (weights[1] === 0 && weights[0] <= 1) {
        const data = updateData(start, end, steps, statues, 'middle', 'left', statues[1], statues[0], 1, 0);
        start = data.start;
        steps = data.steps;
      } else if (weights[2] === 0 && weights[0] <= 1) {
        const data = updateData(start, end, steps, statues, 'right', 'left', statues[2], statues[0], 2, 0);
        start = data.start;
        steps = data.steps;
      } else if (weights[2] === 0 && weights[1] <= 1) {
        const data = updateData(start, end, steps, statues, 'right', 'middle', statues[2], statues[1], 2, 1);
        start = data.start;
        steps = data.steps;
      }
      // 1 WEIGHT
      else if (weights[0] <= 1 && weights[1] <= 1) {
        const data = updateData(start, end, steps, statues, 'left', 'middle', statues[0], statues[1], 0, 1);
        start = data.start;
        steps = data.steps;
      } else if (weights[0] <= 1 && weights[2] <= 1) {
        const data = updateData(start, end, steps, statues, 'left', 'right', statues[0], statues[2], 0, 2);
        start = data.start;
        steps = data.steps;
      } else if (weights[1] <= 1 && weights[2] <= 1) {
        const data = updateData(start, end, steps, statues, 'middle', 'right', statues[1], statues[2], 1, 2);
        start = data.start;
        steps = data.steps;
      }
      i = i + 1;
    }
    if (i >= 4) return null;

    return { steps, statues: [getOpposite(statues[0]), getOpposite(statues[1]), getOpposite(statues[2])] };
  };

  if (!solution) return null;
  // return (
  //   <Box sx={{ color: 'red' }}>
  //     <br />
  //     {language === 'us'
  //       ? 'ERROR: One of the given information is erroneous! Check your symbols!'
  //       : 'ERREUR: Une des infos donnée est erroné ! Vérifier vos symboles !'}
  //   </Box>
  // );

  const PaintSolution = () => {
    const isMobile = !useMediaQuery('(min-width:1200px)');

    return (
      <Box sx={{ border: '5px solid #ff6550', p: 4 }}>
        <Grid container>
          <Grid container item xs={12}>
            <Grid item md={4} sx={{ width: '33%' }}></Grid>
            <Grid item md={4} sx={{ width: '33%' }}></Grid>
            <Grid item md={4} sx={{ width: '33%' }}></Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item md={4} sx={{ width: '33%' }}>
              <Box>
                <ViewSymbol
                  symbol={solution.statues[0]}
                  sx={{ color: '#880202', fontSize: isMobile ? '14px' : '24px' }}
                />
                <br />
                <StatueIcon />
                <br />
              </Box>
            </Grid>
            <Grid item md={4} sx={{ width: '33%' }}></Grid>
            <Grid item md={4} sx={{ width: '33%' }}>
              <Box>
                <ViewSymbol
                  symbol={solution.statues[2]}
                  sx={{ color: '#880202', fontSize: isMobile ? '14px' : '24px' }}
                />
                <br />
                <StatueIcon />
                <br />
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item md={4} sx={{ width: '33%' }}></Grid>
            <Grid item md={4} sx={{ width: '33%' }}>
              <Box>
                <ViewSymbol
                  symbol={solution.statues[1]}
                  sx={{ color: '#880202', fontSize: isMobile ? '14px' : '24px' }}
                />
                <br />
                <StatueIcon />
                <br />
              </Box>
            </Grid>
            <Grid item md={4} sx={{ width: '33%' }}></Grid>
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

    const parseDirection = (direction) => {
      if (direction === 'left') return left;
      if (direction === 'right') return right;
      return middle;
    };

    return (
      <Box sx={{ textAlign: 'left' }}>
        {solution.steps
          .map((item, index) => ({ ...item, index: index }))
          .sort((a, b) => {
            if (b.index !== 0 && b.symbol === solution.steps[b.index - 1].symbol) return b.index - a.index;
            if (
              b.index === 2 &&
              (b.symbol === solution.steps[b.index - 1].symbol || b.symbol === solution.steps[b.index - 2].symbol)
            )
              return b.index - a.index;
            return a.index - b.index;
          })
          .map((item, index) => (
            <Box key={index}>
              {step} {index + 1}: {dunk} <ViewSymbol sx={{ color: 'green', fontSize: '24px' }} symbol={item.symbol} />{' '}
              {atStatue} <b>{parseDirection(item.statue)}</b>
            </Box>
          ))}
      </Box>
    );
  };

  if (triumphMode) return null;

  return (
    <Box>
      <hr />
      <TextSolution />
      <br />
      <PaintSolution />
    </Box>
  );
};

const Dissection = ({ language, statues, resetValue, triumphMode, setTriumphModeData }) => {
  const [symbols, setSymbols] = useState([null, null, null]);
  const [pseudos, setPseudos] = useState(['', '', '']);

  useEffect(() => {
    if (resetValue) {
      setSymbols([null, null, null]);
      setPseudos(['', '', '']);
    }
  }, [resetValue]);

  const countForms = (symbols) => {
    let circle = 0;
    let triangle = 0;
    let square = 0;

    const form1 = checkForm(symbols[0]);
    const form2 = checkForm(symbols[1]);
    const form3 = checkForm(symbols[2]);

    const newForms = [...form1, ...form2, ...form3];

    for (const form of newForms) {
      if (form === 'circle') circle = circle + 1;
      if (form === 'square') square = square + 1;
      if (form === 'triangle') triangle = triangle + 1;
    }

    return { circle, triangle, square, total: circle + triangle + square };
  };

  const setSymbolsIndex = (index, value) => {
    const newSymbols = [...symbols];
    newSymbols[index] = value;

    if (newSymbols.filter((x) => x === null).length === 1 && value !== null) {
      const indexAdd = newSymbols.findIndex((item) => item === null);

      const forms = countForms(newSymbols);
      const lastSymbol = [];
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

      newSymbols[indexAdd] = checkForm3d(lastSymbol);
    }
    setSymbols(newSymbols);
  };

  const setPseudoIndex = (index, value) => {
    const newPseudos = [...pseudos];
    newPseudos[index] = value;
    setPseudos(newPseudos);
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

  const forms = countForms(symbols);

  const alert = () => {
    if (!symbols[0] || !symbols[1] || !symbols[2]) return;
    if (forms && forms.total !== 6 && forms.circle !== 2 && forms.square !== 2 && forms.triangle !== 2)
      return errorFormat();
  };

  return (
    <Card
      sx={{
        textAlign: 'center',
        width: '100%',
        margin: 'auto',
        mt: 2,
        backgroundColor: symbols[0] && symbols[1] && symbols[2] ? 'success.blur' : 'rgba(1,1,1,0.1)'
      }}
    >
      <h3>{language === 'us' ? 'Dissection Room' : 'Salle de dissection'}</h3>
      {language === 'us'
        ? 'Name the 3 geometric shapes you see on the statues'
        : 'Donner les 3 figures géométrique que vous voyez sur les statues'}
      <br />
      <br />
      <Grid item container spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid item md={4}>
          <Symbol
            index={0}
            data={symbols[0]}
            setData={(value) => setSymbolsIndex(0, value)}
            forms={forms}
            pseudo={pseudos[0]}
            setPseudo={(event) => setPseudoIndex(0, event.target.value)}
            triumphMode={triumphMode}
          />
        </Grid>
        <Grid item md={4}>
          <Symbol
            index={1}
            data={symbols[1]}
            setData={(value) => setSymbolsIndex(1, value)}
            forms={forms}
            pseudo={pseudos[1]}
            setPseudo={(event) => setPseudoIndex(1, event.target.value)}
            triumphMode={triumphMode}
          />
        </Grid>
        <Grid item md={4}>
          <Symbol
            index={2}
            data={symbols[2]}
            setData={(value) => setSymbolsIndex(2, value)}
            forms={forms}
            pseudo={pseudos[2]}
            setPseudo={(event) => setPseudoIndex(2, event.target.value)}
            triumphMode={triumphMode}
          />
        </Grid>
      </Grid>
      {alert()}
      <Solution
        language={language}
        symbols={symbols}
        statues={statues}
        forms={forms}
        triumphMode={triumphMode}
        setTriumphModeData={setTriumphModeData}
        pseudos={pseudos}
      />
    </Card>
  );
};

export default Dissection;
