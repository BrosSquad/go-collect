import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'
import { goCollectTheme } from '../go-collect-theme'
import useColorScheme from '../hooks/useColorScheme'
import EventBoardScreen from '../screens/EventBoardScreen'
import TabOneScreen from '../screens/TabOneScreen'
import TabTwoScreen from '../screens/TabTwoScreen'
import TabBarIcon from './utils'

const BottomTab = createBottomTabNavigator()

function AppNavigator() {
  const colorScheme = useColorScheme()
  const getThemeColor = (dark: string, light: string) =>
    colorScheme === 'dark' ? dark : light

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
      <BottomTab.Screen name="TabOne" component={TabOneScreen} />
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
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
        }}
      />
    </BottomTab.Navigator>
  )
}

export default AppNavigator
