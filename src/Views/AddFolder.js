import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import styles from '../component/Style';
import ListWord from './ListWord';
// import Vocabulary from '../Data/Data';
import DataDb from '../service/DataDb';
import vocabService from '../service/VocabService';
import {openDatabase} from 'react-native-sqlite-storage';
// import ProgressCircle from 'react-native-progress-circle';
// import {ViewPropTypes} from 'deprecated-react-native-prop-types';
// import CircularProgress from 'react-native-circular-progress-indicator';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {set} from 'react-native-reanimated';

const db = openDatabase(
  {
    name: 'run.db',
    createFromLocation: '~vocabulary.db',
  },
  null,
  null,
);

const Item = ({index, item, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    {/* <View> */}
    <View style={styles.index_group}>
      <Text
        style={{
          fontSize: 15,
          color: '#fff',
          marginLeft: 10,
          fontWeight: 'bold',
        }}>
        {index}
      </Text>
    </View>
    <View style={{width: 230}}>
      <Text style={[styles.group]}>{item.title}</Text>
    </View>
    {/* </View> */}

    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 100,
        position: 'absolute',
        right: 20,

        justifyContent: 'center',
      }}>
      <AnimatedCircularProgress
        size={50}
        width={5}
        fill={item.score}
        tintColor="#D2691E"
        backgroundColor="#89917e">
        {fill => (
          <Text style={{color: '#D2691E', fontSize: 20}}>{item.score}</Text>
        )}
      </AnimatedCircularProgress>
    </View>
  </TouchableOpacity>
);

const Dashboard = ({route, navigation}) => {
  const [listFolder, setListFolder] = useState([]);
  const [listVocabulary, setListVocabulary] = useState([]);
  console.log(listFolder);
  let listGroup = [];

  listVocabulary.map(item =>
    listGroup.includes(item.group) ? '' : listGroup.push(item.group),
  );

  const renderFolder = () => {
    let exam = [];
    vocabService
      .getAll()
      .then(res => {
        res.data.map(item => (item.handle ? '' : exam.push(item)));
        // console.log(res.data)
        setListFolder(exam);
      })
      .catch(error => console.log(error));
  };

  const onSubmitFormHandler = async titleFolder => {
    let data = {
      title: titleFolder,
      handle: false,
      score: 0,
    };

    await vocabService
      .create(data)
      .then(res => {
        setListFolder(pre => [res.data, ...pre]);
        console.log('success fully');
      })
      .catch(error => console.log(error));
  };

  const getCategories = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM vocabulary',

        [],
        (sqlTxn, res) => {
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);

              results.push({
                id: item.id,
                group: item.group,
                title: item.title,
                phonetic: item.phonetic,
                eMean: item.eMean,
                mean: item.mean,
                img: item.img,
                exam: item.exam,
                trans: item.trans,
              });
            }

            setListVocabulary(results);
          }
          // else (
          //     setCategories([])
          // )
        },
        error => {
          console.log('error on getting categories ' + error.message);
        },
      );
    });
  };

  useEffect(() => {
    let listGroup = [];
    getCategories();

    listVocabulary.map(item =>
      listGroup.includes(item.group) ? '' : listGroup.push(item.group),
    );
    console.log(listGroup);
    let exam = [];
    listFolder.map(item => exam.push(item.title));

    listGroup.map(item =>
      exam.includes(item)
        ? ''
        : setTimeout(function () {
            //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
            onSubmitFormHandler(item);
          }, 1000),
    );
    // listFolder.map(item => listGroup.includes(item.title) ? '': onSubmitFormHandler())
    renderFolder();
  }, []);

  const renderItem = ({index, item}) => {
    return (
      <Item
        index={index + 1}
        item={item}
        onPress={() => {
          navigation.navigate('ListWord', {
            group: item,
            Vocabulary: listVocabulary,
          });
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={listFolder}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default Dashboard;
