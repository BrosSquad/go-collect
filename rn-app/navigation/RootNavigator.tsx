import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'

const RootStack = createNativeStackNavigator()

function RootNavigator() {
  const isAuthenticated = true
  return (
    <RootStack.Navigator>
      {isAuthenticated ? (
        <RootStack.Screen
          name="App"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      )}
    </RootStack.Navigator>
  )
}

export default RootNavigator
