import { Avatar, Text } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'

export type UserRankingStats = {
  id: number
  avatarURL: string
  name: string
  points: number
}

type TopRankedListProps = {
  ranking: UserRankingStats[]
}

const TopRankedList = ({ ranking }: TopRankedListProps) => {
  return (
    <View style={styles.container}>
      <Text category="h4" style={{ textAlign: 'center', marginTop: 16 }}>
        Top Players
      </Text>
      {ranking.map(({ id, avatarURL, name, points }, index) => (
        <View key={id} style={styles.itemContainerOuter}>
          <View style={styles.itemContainerInner}>
            <Text category="h6">{index + 1}.</Text>
            <Avatar
              source={{ uri: avatarURL }}
              size="large"
              style={{ marginHorizontal: 8 }}
            />
            <View>
              <Text>{name}</Text>
              <Text category="h6">{points} PTS</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  itemContainerOuter: {
    alignItems: 'center',
  },
  itemContainerInner: {
    width: 250,
    overflow: 'scroll',
    flex: 1,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default TopRankedList
