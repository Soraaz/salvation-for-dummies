import { Box, Card, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { Icon } from '@iconify/react';
import CircleIcon from '@mui/icons-material/Circle';
import SquareIcon from '@mui/icons-material/Square';
import StatueIconPng from '../assets/statue.png';

const StatueIcon = () => <img src={StatueIconPng} alt="Statue" height={42} width={32} />;

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
  return null;
};

const rearrangeArray = (arr, indexSymbol) => {
  const symbolMap = {};
  arr.forEach((item) => {
    if (!symbolMap[item[indexSymbol].from]) {
      symbolMap[item[indexSymbol].from] = [];
    }
    symbolMap[item[indexSymbol].from].push(item);
  });

  const sortedSymbols = Object.entries(symbolMap).sort((a, b) => b[1].length - a[1].length);
  const result = new Array(arr.length);
  let pos = 0;

  sortedSymbols.forEach(([symbol, objects]) => {
    objects.forEach((obj) => {
      if (pos >= arr.length) {
        pos = 1;
      }
      result[pos] = obj;
      pos += 2;
    });
  });

  return result;
};

const rearrangeArraySymbol = (arr) => {
  const symbolMap = {};
  arr.forEach((item) => {
    if (!symbolMap[item.symbol]) {
      symbolMap[item.symbol] = [];
    }
    symbolMap[item.symbol].push(item);
  });

  const sortedSymbols = Object.entries(symbolMap).sort((a, b) => b[1].length - a[1].length);
  const result = new Array(arr.length);
  let pos = 0;

  sortedSymbols.forEach(([symbol, objects]) => {
    objects.forEach((obj) => {
      if (pos >= arr.length) {
        pos = 1;
      }
      result[pos] = obj;
      pos += 2;
    });
  });

  return result;
};

const Pseudo = ({ children }) => {
  return (
    <Typography color={'secondary'} display="inline">
      <b>{children}</b>
    </Typography>
  );
};

const TriumphModeSolution = ({ triumphMode, triumphModeData, language, statues }) => {
  if (
    !triumphMode ||
    !triumphModeData ||
    !triumphModeData.solo ||
    !triumphModeData.dissection ||
    !triumphModeData.dissection.solution ||
    !statues[0] ||
    !statues[1] ||
    !statues[2]
  )
    return null;

  const getPseudo = (symbol) => {
    if (statues[0] === symbol) return triumphModeData.dissection.pseudos[0];
    if (statues[1] === symbol) return triumphModeData.dissection.pseudos[1];
    if (statues[2] === symbol) return triumphModeData.dissection.pseudos[2];
    return 'Error';
  };

  const getDataFromStatue = (symbol) => {
    return triumphModeData.solo.find((item) => item.your === symbol);
  };

  const getOpposites = (your) => {
    if (your === 'circle') return ['triangle', 'square'];
    if (your === 'triangle') return ['circle', 'square'];
    if (your === 'square') return ['circle', 'triangle'];
  };

  let soloData = [getDataFromStatue(statues[0]), getDataFromStatue(statues[1]), getDataFromStatue(statues[2])];

  soloData = soloData.map((item, index) => ({
    ...item.data,
    index: index,
    your: item.your,
    pseudo: getPseudo(item.your)
  }));

  const firstPageSort = rearrangeArray(soloData, 1);
  const secondPartSort = rearrangeArray(soloData, 2);
  let lastPartSort = rearrangeArraySymbol(triumphModeData.dissection.solution.steps);

  const TextSolution = () => {
    const step = language === 'us' ? 'Step' : 'Etape';
    const take = language === 'us' ? 'Take' : 'Prend le';
    const dunk = language === 'us' ? 'and deposit it at the statue with a' : 'et le dépose a la statue avec un';
    const dunk2 = language === 'us' ? 'Place the' : 'Dépose le symbole';
    const knight = language === 'us' ? 'at knight' : 'sur un chevalier';
    const atStatue = language === 'us' ? 'symbol on the' : 'sur la statue';
    const left = language === 'us' ? 'LEFT  statue' : 'de GAUCHE';
    const right = language === 'us' ? 'RIGHT statue' : 'de DROITE';
    const middle = language === 'us' ? 'MIDDLE statue' : 'du MILLIEU';
    const and = language === 'us' ? 'and' : 'et le';
    const knights = language === 'us' ? 'at knights' : 'sur les chevalier';
    const end =
      language === 'us'
        ? 'and pass the mirror with these two symbols !'
        : 'et passer le miroir avec ces deux symboles !';

    const parseDirection = (direction) => {
      if (direction === 'left') return left;
      if (direction === 'right') return right;
      return middle;
    };

    const getStatueDirection = (direction) => {
      if (direction === 'left') return statues[0];
      if (direction === 'right') return statues[2];
      return statues[1];
    };

    if (secondPartSort[2][2].from === getStatueDirection(lastPartSort[0].statue)) {
      const copy = [...lastPartSort];

      copy[0] = lastPartSort[1];
      copy[1] = lastPartSort[0];
      if (lastPartSort.length > 2) {
        copy[2] = lastPartSort[3];
        copy[3] = lastPartSort[2];
      }
      if (lastPartSort.length > 4) {
        copy[4] = lastPartSort[5];
        copy[5] = lastPartSort[4];
      }
      lastPartSort = copy;
    }

    const firstPart = (
      <Box>
        {firstPageSort.map((item, index) => {
          return (
            <Box key={index}>
              {step} {index + 1} : <Pseudo>{item.pseudo}</Pseudo> {take}{' '}
              <ViewSymbol sx={{ color: 'green', height: 25 }} symbol={item[1].to} /> {knight} {dunk}{' '}
              <ViewSymbol sx={{ color: '#880202', height: 25 }} symbol={item[1].from} />
            </Box>
          );
        })}
      </Box>
    );

    const secondPart = (
      <Box>
        {secondPartSort.map((item, index) => {
          return (
            <Box key={index}>
              {step} {index + 4} : <Pseudo>{item.pseudo}</Pseudo> {take}{' '}
              <ViewSymbol sx={{ color: 'green', height: 25 }} symbol={item[2].to} /> {knight} {dunk}{' '}
              <ViewSymbol sx={{ color: '#880202', height: 25 }} symbol={item[2].from} />
            </Box>
          );
        })}
      </Box>
    );

    const warningMessage = () => {
      if (language === 'fr')
        return (
          <Typography color={'secondary'}>
            <b>
              Attention: Les 3 prochains symboles doivent être déposés dans leur statue dans un laps de temps court
              avant que le témoin ne vous tue. <br />
              Veuillez bien attendre que les 3 personnes aient bien leurs symboles et déposer les ensemble avec peu de
              temps entre les symboles.
            </b>
          </Typography>
        );

      return (
        <Typography color={'secondary'}>
          <b>
            Attention: The next 3 symbols must be deposited in their statues within a short time before the witness
            kills you.
            <br /> Please wait until all 3 people have their symbols and and place them together quickly between the
            symbols.
          </b>
        </Typography>
      );
    };

    const lastPart = (
      <Box sx={{ textAlign: 'left' }}>
        {lastPartSort.map((item, index) => (
          <Box key={index}>
            {step} {index + 7} : <Pseudo>{language === 'fr' ? 'Salle de dissection' : 'Dissect Room'}</Pseudo> {dunk2}{' '}
            <ViewSymbol sx={{ color: 'green', fontSize: '24px' }} symbol={item.symbol} /> {atStatue}{' '}
            <b>{parseDirection(item.statue)}</b>
          </Box>
        ))}
      </Box>
    );

    const endPart = (
      <Box>
        {language === 'fr' ? (
          <Typography color={'secondary'}>
            <b>Vous pouvez faire les étapes ci-dessous durant la dissection:</b>
          </Typography>
        ) : (
          <Typography color={'secondary'}>
            <b>You can perform the following steps during dissection:</b>
          </Typography>
        )}
        {firstPageSort.map((item, index) => {
          return (
            <Box key={index}>
              <Pseudo>{item.pseudo}</Pseudo> : {take}{' '}
              <ViewSymbol sx={{ color: 'green', height: 25 }} symbol={getOpposites(item.your)[0]} /> {and}{' '}
              <ViewSymbol sx={{ color: 'green', height: 25 }} symbol={getOpposites(item.your)[1]} /> {knights} {end}
            </Box>
          );
        })}
      </Box>
    );

    return (
      <Box sx={{ textAlign: 'left' }}>
        {firstPart}
        <br />
        {warningMessage()}
        <br />
        {secondPart}
        <br />
        {lastPart}
        <br />
        {endPart}
      </Box>
    );
  };

  const PaintSolution = () => {
    const isMobile = !useMediaQuery('(min-width:1200px)');

    const dissectRoom = (
      <Box>
        <h3>{language === 'us' ? 'Final pattern in dissect room' : 'Pattern finale dans la salle de dissection'}</h3>
        <Box sx={{ border: '5px solid #ff6550', p: 4, height: '400px', display: 'flex' }}>
          <Grid container sx={{ margin: 'auto', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container item xs={12}>
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item md={4} sx={{ width: '33%' }}>
                <Box>
                  <ViewSymbol
                    symbol={triumphModeData.dissection.solution.statues[0]}
                    sx={{ color: '#880202', fontSize: isMobile ? '14px' : '24px' }}
                  />
                  <br />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <StatueIcon />
                    <Pseudo>{soloData[0].pseudo}</Pseudo>
                  </Box>
                  <br />
                </Box>
              </Grid>
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
              <Grid item md={4} sx={{ width: '33%' }}>
                <Box>
                  <ViewSymbol
                    symbol={triumphModeData.dissection.solution.statues[2]}
                    sx={{ color: '#880202', fontSize: isMobile ? '14px' : '24px' }}
                  />
                  <br />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <StatueIcon />
                    <Pseudo>{soloData[2].pseudo}</Pseudo>
                  </Box>
                  <br />
                </Box>
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
              <Grid item md={4} sx={{ width: '33%' }}>
                <Box>
                  <ViewSymbol
                    symbol={triumphModeData.dissection.solution.statues[1]}
                    sx={{ color: '#880202', fontSize: isMobile ? '14px' : '24px' }}
                  />
                  <br />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <StatueIcon />
                    <Pseudo>{soloData[1].pseudo}</Pseudo>
                  </Box>
                  <br />
                </Box>
              </Grid>
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );

    const soloRoom = (
      <Box>
        <h3>{language === 'us' ? 'Final pattern in solo room' : 'Pattern finale dans les salles solo'}</h3>
        <Box sx={{ border: '5px solid #ff6550', p: 4, height: '400px', display: 'flex' }}>
          <Grid container sx={{ margin: 'auto', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container item xs={12}>
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item md={4} sx={{ width: '33%' }}>
                <Box>
                  <ViewSymbol symbol={statues[0]} sx={{ color: '#880202', fontSize: isMobile ? '14px' : '24px' }} />
                  <br />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <StatueIcon />
                    <Pseudo>{soloData[0].pseudo}</Pseudo>
                    <Box>
                      <ViewSymbol
                        symbol={getOpposites(soloData[0].your)[0]}
                        sx={{ color: 'green', fontSize: isMobile ? '14px' : '24px' }}
                      />
                      <ViewSymbol
                        symbol={getOpposites(soloData[0].your)[1]}
                        sx={{ color: 'green', fontSize: isMobile ? '14px' : '24px' }}
                      />
                    </Box>
                  </Box>
                  <br />
                </Box>
              </Grid>
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
              <Grid item md={4} sx={{ width: '33%' }}>
                <Box>
                  <ViewSymbol symbol={statues[2]} sx={{ color: '#880202', fontSize: isMobile ? '14px' : '24px' }} />
                  <br />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <StatueIcon />
                    <Pseudo>{soloData[2].pseudo}</Pseudo>
                    <Box>
                      <ViewSymbol
                        symbol={getOpposites(soloData[2].your)[0]}
                        sx={{ color: 'green', fontSize: isMobile ? '14px' : '24px' }}
                      />
                      <ViewSymbol
                        symbol={getOpposites(soloData[2].your)[1]}
                        sx={{ color: 'green', fontSize: isMobile ? '14px' : '24px' }}
                      />
                    </Box>
                  </Box>
                  <br />
                </Box>
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
              <Grid item md={4} sx={{ width: '33%' }}>
                <Box>
                  <ViewSymbol symbol={statues[1]} sx={{ color: '#880202', fontSize: isMobile ? '14px' : '24px' }} />
                  <br />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <StatueIcon />
                    <Pseudo>{soloData[1].pseudo}</Pseudo>
                    <Box>
                      <ViewSymbol
                        symbol={getOpposites(soloData[1].your)[0]}
                        sx={{ color: 'green', fontSize: isMobile ? '14px' : '24px' }}
                      />
                      <ViewSymbol
                        symbol={getOpposites(soloData[1].your)[1]}
                        sx={{ color: 'green', fontSize: isMobile ? '14px' : '24px' }}
                      />
                    </Box>
                  </Box>
                  <br />
                </Box>
              </Grid>
              <Grid item md={4} sx={{ width: '33%' }}></Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );

    return (
      <Grid item container spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid item md={isMobile ? 12 : 6}>
          {dissectRoom}
        </Grid>
        <Grid item md={isMobile ? 12 : 6}>
          {soloRoom}
        </Grid>
      </Grid>
    );
  };

  return (
    <Card sx={{ textAlign: 'center', width: '100%', margin: 'auto', mt: 2 }}>
      <h3>{language === 'us' ? 'Triumph Mode' : 'Mode triomphe'}</h3>
      <TextSolution />
      <PaintSolution />
    </Card>
  );
};

export default TriumphModeSolution;