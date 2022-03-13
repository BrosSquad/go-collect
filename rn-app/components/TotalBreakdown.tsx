import { Icon, Text } from '@ui-kitten/components'
import { FlatList, StyleSheet, View } from 'react-native'
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

const GlobalScore = ({ score: materials }: GlobalScoreProps) => {
  const colorScheme = useColorScheme()
  const getThemeColor = (dark: string, light: string) =>
    colorScheme === 'dark' ? dark : light

  return (
    <FlatList
      ListHeaderComponent={() => (
        <>
          <Text category="h4" style={{ textAlign: 'center', marginTop: 16 }}>
            Total waste collected
          </Text>
          <Text category="s1" style={{ textAlign: 'center', marginTop: 8 }}>
            This is what we all collected. It's a lot.
          </Text>
        </>
      )}
      style={styles.container}
      numColumns={2}
      data={materials}
      keyExtractor={(material) => material.id.toString()}
      renderItem={({ item: { icon, id, name, points } }) => (
        <View key={id} style={styles.itemContainer}>
          <Icon
            name={icon}
            style={{ width: 32, height: 32 }}
            fill={getThemeColor('#fff', '#222B45')}
          />
          <View style={styles.statText}>
            <Text category="c1" style={{ marginRight: 4, textAlign: 'center' }}>
              {name}
            </Text>
            <Text category="s1" style={{ marginRight: 4, textAlign: 'center' }}>
              {points} PTS
            </Text>
          </View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: PADDING_X * 2,
  },
  itemContainer: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statText: {
    marginTop: 8,
    justifyContent: 'center',
    // flexDirection: 'row',
  },
})

export default GlobalScore
