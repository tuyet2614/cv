import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
// import Vocabulary from '../Data/Data';
import styles from '../component/Style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faVolumeHigh} from '@fortawesome/free-solid-svg-icons';
import listVocabService from '../service/listVocabService';
import Tts from 'react-native-tts';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';

Tts.setIgnoreSilentSwitch('ignore');

Tts.addEventListener('tts-start');
Tts.addEventListener('tts-progress');
Tts.addEventListener('tts-finish');
Tts.addEventListener('tts-cancel');

const MyVocabulary = ({route, navigation}) => {
  const titleGroup = route.params.titleGroup;
  const [listVocab, setListVocab] = useState([]);
  const [title, setTitle] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [eMean, setEMean] = useState('');
  const [mean, setMean] = useState('');
  const [img, setImg] = useState('');
  const [exam, setExam] = useState('');
  const [trans, setTrans] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newVocab, setNewVocab] = useState({});

  const showListVocab = () => {
    listVocabService
      .getAll(titleGroup.id)
      .then(res => {
        setListVocab(res.data);
        console.log('success');
      })
      .catch(error => console.log(error.response.data));
  };

  const handleAddVocab = async () => {
    let data = {
      title: title,
      phonetic: phonetic,
      eMean: eMean,
      mean: mean,
      img: img,
      exam: exam,
      trans: trans,
    };
    listVocabService
      .create(titleGroup.id, data)
      .then(res => {
        setListVocab(pre => [res.data, ...pre]);
        console.log('success fully');
      })
      .catch(error => console.log(error));
  };

  const handleDelete = currentId => {
    listVocabService
      .remove(titleGroup.id, currentId)
      .then(res => {
        const newlistVocab = listVocab.filter(item => item.id !== currentId);
        setListVocab(newlistVocab);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    showListVocab();
  }, []);

  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      <View>
        <Text>{titleGroup.id}</Text>
        <Text>{titleGroup.title}</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Image
            source={require('../component/images/practive.png')}
            style={styles.icon_practive}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View
            style={[
              styles.centeredView,
              {backgroundColor: 'rgba(64,64,64, 0.8)'},
            ]}>
            <View style={styles.modalView}>
              <Text style={styles.textStyle}>Add new vocabulary</Text>
              <TextInput
                style={styles.inputAdd}
                placeholder="Enter title vocabulary"
                onChangeText={text => {
                  setTitle(text);
                }}
              />
              <TextInput
                style={styles.inputAdd}
                placeholder="Enter phonetic"
                onChangeText={text => {
                  setPhonetic(text);
                }}
              />
              <TextInput
                style={styles.inputAdd}
                placeholder="Enter english mean"
                onChangeText={text => {
                  setEMean(text);
                }}
              />
              <TextInput
                style={styles.inputAdd}
                placeholder="Enter mean"
                onChangeText={text => {
                  setMean(text);
                }}
              />
              <TextInput
                style={styles.inputAdd}
                placeholder="upload image"
                onChangeText={text => {
                  setImg(text);
                }}
              />
              <TextInput
                style={styles.inputAdd}
                placeholder="Enter example"
                onChangeText={text => {
                  setExam(text);
                }}
              />
              <TextInput
                style={styles.inputAdd}
                placeholder="Enter translation"
                onChangeText={text => {
                  setTrans(text);
                }}
              />
              <View style={styles.choosen}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    // setNewVocab({ title: title, phonetic: phonetic, eMean: eMean, mean: mean, img: img, exam: exam, trans: trans })
                    // setListVocab([...listVocab, newVocab]),
                    setModalVisible(!modalVisible);
                    handleAddVocab();
                  }}>
                  <Text style={styles.textStyle}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
              <View style={{marginLeft: 100}}>
                {/* <TouchableOpacity
                  onPress={() => {
                    handleDelete(item.id);
                  }}> */}
                <MenuProvider>
                  <Menu>
                    <MenuTrigger text="Select action" />
                    <MenuOptions>
                      <MenuOption onSelect={() => alert(`Save`)} text="Save" />
                      <MenuOption onSelect={() => handleDelete(item.id)}>
                        <Text style={{color: 'red'}}>Delete</Text>
                      </MenuOption>
                      <MenuOption
                        onSelect={() => alert(`Not called`)}
                        disabled={true}
                        text="Disabled"
                      />
                    </MenuOptions>
                  </Menu>
                </MenuProvider>

                {/* </TouchableOpacity> */}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 100,
          right: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log('done');
            setModalVisible(true);
            console.log(modalVisible);
          }}>
          <Image
            source={require('../component/images/add1.png')}
            style={styles.icon_addFolder}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyVocabulary;
