import {
  useEffect,
  useState }            from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Text }                from 'react-native';
import {
  useRoute,
  useNavigation }       from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo }       from '@expo/vector-icons';
import { GameParams }   from '../../@types/navigation';
import logoImg          from '../../assets/logo-nlw-esports.png';
import { Background }   from '../../components/Background';
import { DuoCard, DuoCardProps }      from '../../components/DuoCard';
import { Heading }      from '../../components/Heading';
import { THEME }        from '../../theme';
import { styles }       from './styles';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.0.111:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => setDiscordDuoSelected(data.discord));
  }
  
  useEffect(() => {
    fetch(`http://192.168.0.111:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right}/>
        </View>

        <Image
          source={{uri: game.bannerURL}}
          style={styles.cover}
        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard
              data={duos[0]}
              onConnect={() => getDiscordUser(item.id)}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContent}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}
