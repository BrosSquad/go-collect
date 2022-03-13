import { Text } from '@ui-kitten/components'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { goCollectTheme } from '../go-collect-theme'

type LogoProps = {
  style?: ViewStyle
}

const Logo = ({ style }: LogoProps) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <Text category="h1" style={styles.go}>
        Go
      </Text>
      <Text category="h1">Collect</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  go: {
    color: goCollectTheme['color-primary-400'],
  },
  collect: {},
})

export default Logo
