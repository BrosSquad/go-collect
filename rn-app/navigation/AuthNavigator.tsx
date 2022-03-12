import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import LoginScreen from '../screens/LoginScreen'

const AuthStack = createNativeStackNavigator()

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      {/* Other auth related screens go here */}
    </AuthStack.Navigator>
  )
}

export default AuthNavigator
