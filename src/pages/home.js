import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {default as Icon2} from 'react-native-vector-icons/Octicons';
import SeriesList from '../components/seriesList';
import SuggestedEpisode from '../components/suggestedEpisode';

const Home = ({navigation}) => {
  const {colors, roundness} = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{justifyContent: 'space-between', flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor="white" translucent />
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.navigate('Search')}
            android_ripple={{foreground: true, borderless: false}}
            style={styles.button(colors.surface, roundness)}>
            <Icon name="search" size={26} color={colors.placeholder} />
          </Pressable>
          <Text
            style={{
              fontSize: 36,
              fontWeight: '300',
              color: 'black',
              fontFamily: 'YouTubeSansRegular',
            }}>
            Ben 10
          </Text>
          <Pressable
            onPress={() => navigation.navigate('History')}
            android_ripple={{foreground: true, borderless: false}}
            style={styles.button(colors.surface, roundness)}>
            <Icon2 name="history" size={26} color={colors.placeholder} />
          </Pressable>
        </View>
        <SeriesList />
        <SuggestedEpisode />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  button: (backgroundColor, borderRadius) => ({
    padding: 10,
    overflow: 'hidden',
    borderRadius,
    backgroundColor,
  }),
});

export default Home;
