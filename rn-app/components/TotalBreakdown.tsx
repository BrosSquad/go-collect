import { Icon, Text } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import useColorScheme from '../hooks/useColorScheme'
import { PADDING_X } from './ScreenLayout'

export type MaterialScore = {
  id: number
  name: string
  points: number
  icon: string
}

type GlobalScoreProps = {
  score: MaterialScore[]
}

const GlobalScore = ({ score }: GlobalScoreProps) => {
  const colorScheme = useColorScheme()
  const getThemeColor = (dark: string, light: string) =>
    colorScheme === 'dark' ? dark : light

  return (
    <View style={styles.container}>
      <Text category="h4" style={{ textAlign: 'center', marginTop: 16 }}>
        Total waste collected
      </Text>
      <Text category="s1" style={{ textAlign: 'center', marginTop: 8 }}>
        This is what we all collected. It's a lot.
      </Text>
      <View style={styles.scoreContainer}>
        {score.map(({ id, icon, name, points }) => (
          <View key={id} style={styles.itemContainer}>
            <Icon
              name={icon}
              style={{ width: 32, height: 32 }}
              fill={getThemeColor('#fff', '#222B45')}
            />
            <View style={styles.statText}>
              <Text
                category="c1"
                style={{ marginRight: 4, textAlign: 'center' }}
              >
                {name}
              </Text>
              <Text
                category="s1"
                style={{ marginRight: 4, textAlign: 'center' }}
              >
                {points} PTS
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: PADDING_X * 2,
  },
  scoreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemContainer: {
    width: '50%',
    marginVertical: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statText: {
    marginTop: 8,
    justifyContent: 'center',
  },
})

export default GlobalScore
