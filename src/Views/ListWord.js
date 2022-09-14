import React, {useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
// import Vocabulary from '../Data/Data';
import styles from '../component/Style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faVolumeHigh} from '@fortawesome/free-solid-svg-icons';

import Tts from 'react-native-tts';

Tts.setIgnoreSilentSwitch('ignore');

Tts.addEventListener('tts-start');
Tts.addEventListener('tts-progress');
Tts.addEventListener('tts-finish');
Tts.addEventListener('tts-cancel');

const ListWord = ({route, navigation}) => {
  const Vocabulary = route.params.Vocabulary;
  const vocabList = route.params.group.title;
  const currentId = route.params.group.id;
  console.log(currentId);

  let listVocab = [];

  Vocabulary.map(item =>
    item.group === vocabList ? listVocab.push(item) : '',
  );

  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Practice', {
              listVocab: listVocab,
              Vocabulary: Vocabulary,
              group: vocabList,
              currentId: currentId,
            });
          }}>
          <Image
            source={require('../component/images/practive.png')}
            style={styles.icon_practive}
          />
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView>
          {listVocab.map(item => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate('DetailWord', {
                  vocabGroup: listVocab,
                  detail: item,
                });
              }}>
              <View style={[styles.iconVolume, {marginRight: 100}]}>
                <TouchableOpacity onPress={() => Tts.speak(item.title)}>
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    style={{color: '#ffffff'}}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
              <View style={{justifyContent: 'center', alignContent: 'center'}}>
                <Text style={styles.group}>{item.title}</Text>
                <Text style={{fontSize: 15, color: '#000'}}>
                  {item.phonetic}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ListWord;
