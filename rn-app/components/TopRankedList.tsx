import { Avatar, Text } from '@ui-kitten/components'
import { FlatList, StyleSheet, View } from 'react-native'

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
    <FlatList
      ListHeaderComponent={() => (
        <Text category="h4" style={{ textAlign: 'center', marginTop: 16 }}>
          Top Players
        </Text>
      )}
      style={styles.container}
      data={ranking}
      keyExtractor={(user) => user.id.toString()}
      renderItem={({ item: { avatarURL, name, points }, index }) => (
        <View style={styles.itemContainerOuter}>
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
      )}
    />
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
