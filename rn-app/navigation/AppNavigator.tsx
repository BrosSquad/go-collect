import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'
import { goCollectTheme } from '../go-collect-theme'
import CheckInScreen from '../screens/CheckInScreen'
import EventBoardScreen from '../screens/EventBoardScreen'
import ProfileScreen from '../screens/ProfileScreen'
import TabBarIcon from './utils'

const BottomTab = createBottomTabNavigator()

function AppNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="EventBoard"
      screenOptions={{
        tabBarInactiveTintColor: '#1A2138',
        tabBarActiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: goCollectTheme['color-primary-400'],
          height: 100,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        },
      }}
    >
      <BottomTab.Screen
        name="CheckIn"
        component={CheckInScreen}
        options={{
          title: 'Check-in',
          headerShown: false,
          tabBarIcon: (props) => <TabBarIcon name="upload" {...props} />,
        }}
      />
      <BottomTab.Screen
        name="EventBoard"
        component={EventBoardScreen}
        options={{
          title: 'Event',
          headerShown: false,
          tabBarIcon: (props) => (
            <TabBarIcon name="radio-button-on-outline" {...props} isAnimated />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: (props) => <TabBarIcon name="person" {...props} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

export default AppNavigator
