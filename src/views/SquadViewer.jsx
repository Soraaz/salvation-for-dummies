import { Box, Button, Card, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const apiKey = 'ebab377033064ed6a4e081aec532d34d';
const splitText = (text) => {
  const parts = text.split('#');
  if (parts.length === 2) {
    return {
      before: parts[0],
      after: parts[1]
    };
  } else {
    return null;
  }
};

export const useContainerDimensions = (myRef) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current.offsetWidth,
      height: myRef.current.offsetHeight
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);

  return dimensions;
};

const getActiveCharacter = (characters) => {
  let last_played = null;
  let active_character = null;

  if (!characters) return null;

  for (const character of Object.values(characters)) {
    if (!last_played || character['dateLastPlayed'] > last_played) {
      last_played = character['dateLastPlayed'];
      active_character = character;
    }
  }
  return active_character;
};

const getClass = (language, classID) => {
  if (classID === 0) return language === 'fr' ? 'Titan' : 'Titan';
  if (classID === 1) return language === 'fr' ? 'Chasseur' : 'Hunt';
  return language === 'fr' ? 'Arcaniste' : 'Warlock';
};

const Character = ({ language, user, equipments, inventory }) => {
  const componentRef = useRef();
  const { width, height } = useContainerDimensions(componentRef);

  const activeCharacter = getActiveCharacter(user.characters.data);
  const activeEquiments = equipments[activeCharacter.characterId]?.items;

  if (!activeCharacter || !activeEquiments) return null;

  const items = activeEquiments.map((item) =>
    item.overrideStyleItemHash ? inventory[item.overrideStyleItemHash] : inventory[item.itemHash]
  );

  const emblem_path = activeCharacter?.emblemBackgroundPath;
  return (
    <Box sx={{ border: '2px solid #ff6550', width: '100%' }} ref={componentRef}>
      <Stack sx={{ flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative', textAlign: 'center', color: 'white', height: width / 5.5 }}>
          <Typography color={'primary'} variant="h6" sx={{ position: 'absolute', top: '0%', left: '20%' }}>
            {user.profile.data.userInfo.displayName}
          </Typography>
          <Typography color={'primary'} sx={{ position: 'absolute', top: '50%', left: '20%' }}>
            {getClass(language, activeCharacter.classType)}
          </Typography>
          <img alt="emblem" src={'https://www.bungie.net' + emblem_path} style={{ width: '100%', height: width / 5.5 }} />
        </Box>
        <Box sx={{ width: '100%', height: width / 6 }}>
          {items
            .filter((a, index) => [3, 4, 5, 6, 7, 8].includes(index))
            .map((item, index) => (
              <img
                alt="item"
                src={'https://www.bungie.net' + item?.displayProperties?.icon}
                width={width / 6 - (index === 0 ? 0 : 1)}
                height={width / 6 - (index === 0 ? 0 : 1)}
              />
            ))}
        </Box>
      </Stack>
    </Box>
  );
};

const SquadViewer = ({ language }) => {
  const [bungieName, setBungieName] = useState(
    localStorage.getItem('bungieName') !== null ? localStorage.getItem('bungieName') : ''
  );
  const [isLoadingBungieName, setIsLoadingBungieName] = useState(false);
  const [userSelected, setUserSelected] = useState(null);
  const [destinyInventory, setDestinyInventory] = useState(null);
  const [squad, setSquad] = useState(null);

  const reset = () => {
    setSquad(null);
    setUserSelected(null);
    searchBungieUser(bungieName);
  };

  const getUserProfile = async (membershipId) => {
    try {
      const preRes = await axios.get(
        `https://www.bungie.net/Platform/Destiny2/-1/Profile/${membershipId}/LinkedProfiles/?getAllMemberships=true`,
        {
          headers: {
            'X-API-Key': apiKey
          }
        }
      );

      if (!preRes || !preRes.data) return null;
      const res = await axios.get(
        `https://www.bungie.net/Platform/Destiny2/${preRes.data.Response.profiles[0].membershipType}/Profile/${membershipId}/?components=100%2C200%2C1000%2C205`,
        {
          headers: {
            'X-API-Key': apiKey
          }
        }
      );
      return res.data.Response;
    } catch (e) {
      return null;
    }
  };

  const searchBungieUser = async (pseudo) => {
    try {
      const splitPseudo = splitText(pseudo);

      if (!splitPseudo) return null;
      const res = await axios.post(
        'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/-1/',
        {
          displayName: splitPseudo.before,
          displayNameCode: splitPseudo.after
        },
        {
          headers: {
            'X-API-Key': apiKey
          }
        }
      );
      if (res.data.Response[0]) {
        localStorage.setItem('bungieName', pseudo);
        setIsLoadingBungieName(true);
        const profile = await getUserProfile(res.data.Response[0].membershipId);
        const tmpSquad = [];

        if (profile) {
          const promises = profile.profileTransitoryData.data.partyMembers.map((member) =>
            getUserProfile(member.membershipId)
          );
          const results = await Promise.all(promises);

          results.forEach((squadUserProfile) => {
            if (squadUserProfile) tmpSquad.push(squadUserProfile);
          });

          setUserSelected(profile);
          setSquad(tmpSquad);
        }
        setIsLoadingBungieName(false);
      }
    } catch (e) {
      setIsLoadingBungieName(false);
    }
  };

  const getDestinyInventory = async () => {
    try {
      const res = await axios.get(
        'https://www.bungie.net/common/destiny2_content/json/en/DestinyInventoryItemDefinition-b9042aab-bb85-47e6-9d32-bd7343e3a6c2.json'
      );
      setDestinyInventory(res.data);
    } catch (e) {}
  };

  useEffect(() => {
    searchBungieUser(bungieName);
  }, [bungieName]);

  useEffect(() => {
    getDestinyInventory();
  }, []);

  return (
    <Card sx={{ textAlign: 'center', width: '100%', margin: 'auto', mt: 2 }}>
      <Typography color={'primary'} variant="h6">
        {language === 'us' ? 'Squad viewer' : 'Afficher votre equipe'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          textAlign: 'center',
          width: '100%',
          margin: 'auto',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TextField
          value={bungieName}
          onChange={(event) => setBungieName(event.target.value)}
          label={'Bungie ID'}
          InputLabelProps={{ shrink: true }}
          placeholder={'Saltagreppo#1234'}
          sx={{ mt: 2 }}
        />
        {userSelected && squad && (
          <Button
            height={'100%'}
            variant="contained"
            color="secondary"
            sx={{ ml: 2, mt: 2 }}
            onClick={() => {
              reset();
            }}
          >
            {language === 'us' ? 'Refresh' : 'Refresh'}
          </Button>
        )}
      </Box>
      <br />
      {isLoadingBungieName && <CircularProgress sx={{ mt: 2 }} />}

      <Grid container sx={{ mt: 2, width: '100%', margin: 'auto' }} spacing={2}>
        {userSelected &&
          destinyInventory &&
          !isLoadingBungieName &&
          squad &&
          squad.map((item) => (
            <Grid item md={4}>
              <Character
                language={language}
                user={item}
                equipments={item.characterEquipment.data}
                inventory={destinyInventory}
              />
            </Grid>
          ))}
      </Grid>
    </Card>
  );
};

export default SquadViewer;
