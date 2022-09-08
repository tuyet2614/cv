import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Views/Dashboard';
import Search from '../Views/Search';
import MyWord from '../Views/MyWord';
import {View, Image, Text} from 'react-native';
import AddFolder from '../Views/AddFolder';
import TestMusic from '../Views/TestMusic';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {faFolderOpen} from '@fortawesome/free-regular-svg-icons';

const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <FontAwesomeIcon
                icon={faHome}
                style={{color: focused ? '#e32f45' : '#748c94'}}
                size={25}
              />

              <Text
                style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                HOME
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{color: focused ? '#e32f45' : '#748c94'}}
                size={25}
              />
              <Text
                style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                SEARCH
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="My Word"
        component={MyWord}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <FontAwesomeIcon
                icon={faFolderOpen}
                style={{color: focused ? '#e32f45' : '#748c94'}}
                size={25}
              />

              <Text
                style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                MY WORD
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={AddFolder}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
                source={require('../component/images/folder.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
              />

              <Text
                style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                ADD
              </Text>
            </View>
          ),
        }}
      />

      {/* <Tab.Screen
                name="check"
                component={TestMusic}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image source={require("../component/images/folder.png")}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }} />

                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Check</Text>
                        </View>

                    )
                }} /> */}
    </Tab.Navigator>
  );
};

export default Tabs;
