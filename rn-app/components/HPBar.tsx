import { Text } from '@ui-kitten/components'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { goCollectTheme } from '../go-collect-theme'
import useColorScheme from '../hooks/useColorScheme'
import { BossHealthProps } from './BossHealth'

const HEIGHT = 24
const WIDTH = 200

type HPBarProps = Pick<BossHealthProps, 'currentHP' | 'maxHP'> & {
  style?: ViewStyle
}

const HPBar = ({ currentHP, maxHP, style }: HPBarProps) => {
  const scheme = useColorScheme()
  const getThemeColor = (dark: string, light: string) =>
    scheme === 'dark' ? dark : light

  const trackColor = getThemeColor('#fff', '#222B45')
  const thumbColor = goCollectTheme['color-primary-500']

  const ratio = currentHP / maxHP
  const thumbWidth = WIDTH * ratio

  return (
    <View>
      <View
        style={StyleSheet.flatten([
          styles.track,
          { backgroundColor: trackColor },
          style,
        ])}
      >
        <View
          style={StyleSheet.flatten([
            styles.thumb,
            { backgroundColor: thumbColor, width: thumbWidth },
          ])}
        />
      </View>
      <Text category="h5" style={{ textAlign: 'center', marginTop: 16 }}>
        {currentHP} / {maxHP}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  track: {
    height: HEIGHT,
    width: WIDTH,
    borderRadius: HEIGHT,
  },
  thumb: {
    height: HEIGHT,
    borderRadius: HEIGHT,
  },
})

export default HPBar
