import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import styles from '../component/Style';
import axios from 'axios';
import vocabService from '../service/VocabService';

const Item = ({item, onPress, showEdit}) => (
  <TouchableOpacity onPress={onPress} style={styles.folder}>
    <Text>{item.title}</Text>
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
      }}
      onPress={showEdit}>
      <Image
        source={require('../component/images/pen.png')}
        style={styles.icon_addFolder}
      />
    </TouchableOpacity>
  </TouchableOpacity>
);

const MyWord = ({navigation}) => {
  const [listFolder, setListFolder] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [titleFolder, setTitleFolder] = useState('');
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [editTitle, setEditTitle] = useState('');

  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate('MyVocabulary', {titleGroup: item});
        }}
        showEdit={() => {
          setIsShowEdit(true),
            setTitleFolder(item.title),
            setCurrentId(item.id);
        }}
      />
    );
  };

  const renderFolder = () => {
    let exam = [];
    vocabService
      .getAll()
      .then(res => {
        res.data.map(item => (!item.handle ? '' : exam.push(item)));

        setListFolder(exam);
      })
      .catch(error => console.log(error));
  };

  const onSubmitFormHandler = async () => {
    let data = {
      title: titleFolder,
      handle: true,
      score: 0,
    };

    vocabService
      .create(data)
      .then(res => {
        setListFolder(pre => [res.data, ...pre]);
        console.log('success fully');
      })
      .catch(error => console.log(error));
  };

  const handleEditFolder = () => {
    let data = {
      title: editTitle,
    };
    vocabService
      .update(currentId, data)
      .then(res => {
        setListFolder(
          listFolder.map(item =>
            item.id === currentId ? {...res.data, title: editTitle} : item,
          ),
        );
        renderFolder();
      })
      .catch(error => console.log(error));
  };

  const handleDelete = () => {
    vocabService
      .remove(currentId)
      .then(res => {
        const newFolderList = listFolder.filter(item => item.id !== currentId);
        setListFolder(newFolderList);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    renderFolder();
  }, []);

  return (
    <View style={styles.myWord}>
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
              <Text style={styles.textStyle}>Add new folder</Text>
              <TextInput
                style={styles.inputAdd}
                placeholder="Enter folder name"
                onChangeText={text => {
                  setTitleFolder(text);
                }}
              />
              <View style={styles.choosen}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible), onSubmitFormHandler();
                  }}>
                  <Text style={styles.textStyle}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isShowEdit}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setIsShowEdit(!isShowEdit);
          }}>
          <View
            style={[
              styles.centeredView,
              {backgroundColor: 'rgba(64,64,64, 0.8)'},
            ]}>
            <View style={styles.modalView}>
              <Text style={styles.textStyle}>Edit folder</Text>
              <TextInput
                style={styles.inputAdd}
                defaultValue={titleFolder}
                onChangeText={text => {
                  setEditTitle(text);
                }}
              />
              <View style={styles.choosen}>
                <TouchableOpacity
                  onPress={() => {
                    setIsShowEdit(!isShowEdit), handleDelete();
                  }}>
                  <Text
                    style={{
                      color: '#F87011',
                      fontSize: 17,
                      fontWeight: 'bold',
                    }}>
                    Delete
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsShowEdit(!isShowEdit)}>
                  <Text style={{fontSize: 15}}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    // setListFolder([...listFolder, titleFolder]),
                    setIsShowEdit(!isShowEdit), handleEditFolder();
                  }}>
                  <Text
                    style={{color: '#f20', fontSize: 17, fontWeight: 'bold'}}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View>
        <FlatList
          data={listFolder}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
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

export default MyWord;
