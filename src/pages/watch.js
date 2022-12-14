import {useState, useContext, useEffect, useRef, useMemo} from 'react';
import {StyleSheet, Text, ScrollView, StatusBar} from 'react-native';
import {Colors} from 'react-native-paper';
import {SeriesContext} from '../contexts/seriesContext';
import {HistoryContext} from '../contexts/historyContext';
import Player from '../components/player';
import ExpandableText from '../components/expandableText';
import {PlayerOptionsContext} from '../contexts/playerOptionsContext';

const Watch = ({route}) => {
  const {episode} = route.params;
  const [videoSize, setVideoSize] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(episode);
  const {history} = useContext(HistoryContext);
  const {source} = useContext(PlayerOptionsContext);
  const episodes = useContext(SeriesContext).episodes.filter(
    ep => ep.seriesId === currentEpisode.seriesId,
  );
  const series = useContext(SeriesContext).series[currentEpisode.seriesId];
  const firstMount = useRef(true);

  useEffect(() => {
    if (firstMount.current) {
      const episodeFromHistory = history.filter(
        item => item.identifier === episode.identifier,
      );
      if (episodeFromHistory.length > 0) {
        setCurrentEpisode(episodeFromHistory[0]);
      }
      firstMount.current = false;
    }
  }, [episode, history]);

  useEffect(() => {
    if (source) {
      _getVideoSize(source.file).then(setVideoSize);
    }
  }, [source]);

  const _getVideoSize = async url => {
    const re = await fetch(url, {method: 'HEAD'});
    return (re.headers.map['content-length'] * 0.00000095367432).toFixed(1);
  };

  const _handleIncomingVideo = mode => {
    const next = mode === 'next' ? +1 : -1;
    const incoming = episodes[currentEpisode.id - 1 + next];
    const fromHistory = history.filter(
      item => item.identifier === incoming.identifier,
    )[0];
    setCurrentEpisode(fromHistory || incoming);
  };

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <Player
        episode={currentEpisode}
        handleIncomingVideo={_handleIncomingVideo}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.seriesName}>
          {[
            series.title,
            `E${currentEpisode.id.toString().padStart(2, '0')}`,
            videoSize && `${videoSize} MB`,
          ].join(' | ')}
        </Text>
        <Text style={styles.title}>{currentEpisode.title}</Text>
        {useMemo(
          () => (
            <ExpandableText numberOfLines={4} style={styles.description}>
              {currentEpisode.description}
            </ExpandableText>
          ),
          [currentEpisode.description],
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
  },

  player: {
    backgroundColor: Colors.grey900,
  },

  seriesName: {
    fontSize: 16,
    color: Colors.grey600,
    fontFamily: 'YouTubeSansRegular',
  },

  title: {
    fontSize: 22,
    color: Colors.grey800,
    textTransform: 'capitalize',
    fontFamily: 'YouTubeSansSemibold',
  },

  description: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.grey800,
    fontFamily: 'YouTubeSansRegular',
  },
});

export default Watch;
