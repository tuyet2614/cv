import React, {useEffect} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import Vocabulary from '../Data/Data';
import styles from '../component/Style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faVolumeHigh} from '@fortawesome/free-solid-svg-icons';
// import TrackPlayer from 'react-native-track-player';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');
let sound = [];

const getSound = item => {
  sound.push(
    new Sound(item, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      // when loaded successfully
      //   console.log(
      //     'duration in seconds: ' +
      //       whoosh.getDuration() +
      //       'number of channels: ' +
      //       whoosh.getNumberOfChannels(),
      //   );
    }),
  );
};

const Item = ({item, onPress, onPlaySound}) => (
  <View style={styles.item}>
    <View style={styles.iconVolume}>
      <TouchableOpacity onPress={onPlaySound}>
        <FontAwesomeIcon
          icon={faVolumeHigh}
          style={{color: '#ffffff'}}
          size={18}
        />
      </TouchableOpacity>
    </View>
    <View style={{justifyContent: 'center'}}>
      <TouchableOpacity onPress={onPress} style={{alignContent: 'center'}}>
        <Text style={styles.group}>{item.title}</Text>
        <Text style={{fontSize: 15, color: '#000'}}>{item.phonetic}</Text>
      </TouchableOpacity>
    </View>
  </View>
);
const ListWord = ({route, navigation}) => {
  const vocabList = route.params.group;
  let listVocab = [];

  useEffect(() => {
    Vocabulary.map(item => getSound(item.url));
    console.log('sound:', sound);
    // getSound(Vocabulary[1].url);
    // sound[0].setVolume(1);
    sound.map((item, index) => sound[index].setVolume(1));
    return () => {
      sound.map((item, index) => sound[index].release());
      //   sound[0].release();
    };
  }, []);

  const playPause = item => {
    sound[item].play((success, error) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors', error);
      }
    });
  };

  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate('DetailWord', {
            vocabGroup: listVocab,
            detail: item,
          });
        }}
        onPlaySound={() => {
          playPause(item.id - 1);
        }}
      />
    );
  };

  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Practice');
          }}>
          <Image
            source={require('../component/images/practive.png')}
            style={styles.icon_practive}
          />
        </TouchableOpacity>
      </View>
      <View>
        {Vocabulary.map(item =>
          item.group === vocabList
            ? (listVocab.push(item),
              (
                <FlatList
                  data={[item]}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />
              ))
            : '',
        )}
      </View>
    </View>
  );
};

export default ListWord;
