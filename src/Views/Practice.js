import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import Data from '../Data/Quizz';
import {COLORS} from '../component/theme/Theme';
import styles from '../component/Style';

const Practice = ({route, navigation}) => {
  // const [listVocab, setAllQuestion] = useState([])
  const listVocab = route.params.listVocab;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [chooseAnswer, setchooseAnswer] = useState(null);
  const [isShowScore, setIsShowScore] = useState(false);
  const [isCheckAnswer, setIsCheckAnswer] = useState(false);
  const [doneCheck, setdoneCheck] = useState(false);
  const [isShowNextButton, setisShowNextButton] = useState(false);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [falseAnswer, setFalseAnswer] = useState(0);
  const [listAnswer, setListAnswer] = useState([]);
  const Vocabulary = route.params.Vocabulary;
  const good = (listVocab.length * 2) / 3;

  const progressAnim = progress.interpolate({
    inputRange: [0, listVocab.length],
    outputRange: ['0%', '100%'],
  });

  const getOption = () => {
    let answers = [];
    let rdAnswer = [];
    for (let i = 0; i < 3; i++) {
      const item = Vocabulary[Math.floor(Math.random() * Vocabulary.length)];
      item.mean === listVocab[currentQuestionIndex].mean
        ? (item = Vocabulary[Math.floor(Math.random() * Vocabulary.length)])
        : '';
      answers.push(item.mean);
      Vocabulary.splice(Vocabulary.indexOf(item), 1);
    }
    answers.push(listVocab[currentQuestionIndex].mean);

    for (let i = 0; i < 4; i++) {
      const rdItem = answers[Math.floor(Math.random() * answers.length)];
      rdAnswer.push(rdItem);
      answers.splice(answers.indexOf(rdItem), 1);
    }
    setListAnswer(rdAnswer);
  };

  const showQuestion = () => {
    useEffect(() => {
      getOption();
    }, [currentQuestionIndex]);
    // getOption()

    return (
      <View key={currentQuestionIndex}>
        <Text style={styles.title}>
          {listVocab[currentQuestionIndex].title}
        </Text>
      </View>
    );
  };

  const validateAnswer = () => {
    const correctOption = listVocab[currentQuestionIndex].mean;
    setCorrectAnswer(correctOption);
    setIsCheckAnswer(true);
    if (chooseAnswer === correctOption) {
      setScore(score + 1);
    } else {
      setFalseAnswer(falseAnswer + 1);
    }
    setisShowNextButton(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex === listVocab.length - 1) {
      setIsShowScore(true);
    } else {
      setisShowNextButton(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCorrectAnswer(null);
      setIsCheckAnswer(false);
      setchooseAnswer(null);
      setdoneCheck(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const showOption = () =>
    listAnswer.map(item => (
      <View>
        <TouchableHighlight
          underlayColor="#F8F8F8	"
          onPress={() => setchooseAnswer(item)}
          disabled={isCheckAnswer}
          // key={item.title}
          style={{
            height: 60,
            borderRadius: 10,
            borderWidth: 1,
            // alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 5,
            padding: 5,
            backgroundColor: doneCheck
              ? item === correctAnswer
                ? COLORS.success
                : item === chooseAnswer
                ? COLORS.error
                : '#ffff'
              : item === chooseAnswer
              ? COLORS.check
              : '#ffffff',
          }}>
          <Text style={{fontSize: 18, color: '#000000'}}>{item}</Text>
        </TouchableHighlight>
      </View>
    ));
  const renderProgressBar = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          position: 'absolute',
          top: 20,
        }}>
        <Animated.Text style={styles.group}>
          {currentQuestionIndex + 1}/{listVocab.length}
        </Animated.Text>

        <View
          style={{
            width: '80%',
            height: 10,
            borderRadius: 20,
            backgroundColor: '#ffffff',
            alignSelf: 'center',
          }}>
          <Animated.View
            style={[
              {
                height: 10,
                borderRadius: 20,
                backgroundColor: COLORS.accent,
              },
              {
                width: progressAnim,
              },
            ]}></Animated.View>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../component/images/close.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: '#ffffff',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderAnswer = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginBottom: 50,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../component/images/done.png')}
          style={[styles.answer, {tintColor: COLORS.success}]}
        />

        <Text style={[styles.numberAnswer, {color: COLORS.success}]}>
          {' '}
          : {score}
        </Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../component/images/wrong.png')}
          style={[styles.answer, {tintColor: COLORS.error}]}
        />
        <Text style={[styles.numberAnswer, {color: COLORS.error}]}>
          {' '}
          : {falseAnswer}
        </Text>
      </View>
    </View>
  );

  const refreshTest = () => {
    setIsShowScore(false);
    setCurrentQuestionIndex(0);
    setisShowNextButton(false);
    setCorrectAnswer(null);
    setIsCheckAnswer(false);
    setchooseAnswer(null);
    setdoneCheck(false);
    setScore(0);
    setFalseAnswer(0);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <ImageBackground
      source={require('../component/images/book1.jpeg')}
      resizeMode="cover"
      style={styles.image}>
      {renderProgressBar()}
      {renderAnswer()}
      <View style={{padding: 10}}>
        {showQuestion()}
        {showOption()}
        <TouchableOpacity
          onPress={() =>
            isShowNextButton
              ? nextQuestion()
              : (setdoneCheck(true), validateAnswer(chooseAnswer))
          }
          style={styles.check}>
          <Text style={styles.title}>
            {!isShowNextButton
              ? 'Check'
              : currentQuestionIndex === listVocab.length - 1
              ? 'Submit'
              : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={isShowScore}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(64,64,64, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              width: '90%',
              borderRadius: 20,
              padding: 20,
              alignItems: 'center',
            }}>
            <Image
              source={
                score > good
                  ? require('../component/images/high.jpeg')
                  : require('../component/images/low1.jpeg')
              }
              style={{width: 180, height: 180, marginBottom: 15}}
            />
            <Text style={{fontSize: 30}}>
              {score > good ? 'Very good' : "that's not good enough!"}
            </Text>
            <Text
              style={{fontSize: 25, fontWeight: 'bold', marginVertical: 15}}>
              YOUR SCORE IS:{' '}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: 'bold',
                  color: score > good ? COLORS.success : COLORS.error,
                }}>
                {score} CORRECT AND {falseAnswer} WRONG
              </Text>
            </View>
            <View>
              <View style={styles.finish}>
                <TouchableOpacity onPress={() => refreshTest()}>
                  <Text
                    style={{color: '#fff', fontSize: 23, fontWeight: 'bold'}}>
                    Test Again
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.finish}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text
                    style={{color: '#fff', fontSize: 23, fontWeight: 'bold'}}>
                    Back to Topics
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Text>Hello</Text>
    </ImageBackground>
  );
};

export default Practice;
