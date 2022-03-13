import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'
import { goCollectTheme } from '../go-collect-theme'
import LinkingConfiguration from './LinkingConfiguration'
import RootNavigator from './RootNavigator'

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  const getThemeColor = (dark: string, light: string) =>
    colorScheme === 'dark' ? dark : light

  const theme = {
    dark: false,
    colors: {
      primary: goCollectTheme['color-primary-400'],
      background: getThemeColor('#222B45', '#fff'),
      card: getThemeColor('#222B45', '#fff'),
      text: '#1A2138',
      border: getThemeColor('#222B45', '#fff'),
      notification: getThemeColor('#222B45', '#fff'),
    },
  }

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  )
}
