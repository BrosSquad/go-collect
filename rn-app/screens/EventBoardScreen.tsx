import { Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native'
import BossHealth from '../components/BossHealth'
import BreakdownByMaterial, {
  MaterialStats,
} from '../components/BreakdownByMaterial'
import ScreenLayout from '../components/ScreenLayout'
import TopRankedList, { UserRankingStats } from '../components/TopRankedList'

const materialStats: MaterialStats[] = [
  { id: 1, icon: 'bulb', name: 'Electronics', points: 200 },
  { id: 2, icon: 'car', name: 'Cars', points: 150 },
  { id: 3, icon: 'umbrella', name: 'Something', points: 20 },
  { id: 4, icon: 'bulb', name: 'Something', points: 10 },
]

const userRanking: UserRankingStats[] = [
  {
    id: 1,
    avatarURL: 'https://i.pravatar.cc/100',
    name: 'Stefan Bogdanovic',
    points: 399656,
  },
  {
    id: 2,
    avatarURL: 'https://i.pravatar.cc/100',
    name: 'Dusan Malusev',
    points: 26565,
  },
  {
    id: 3,
    avatarURL: 'https://i.pravatar.cc/100',
    name: 'Dusan Mitrovic',
    points: 123132,
  },
  {
    id: 4,
    avatarURL: 'https://i.pravatar.cc/100',
    name: 'Jaksa Malisic',
    points: 1312,
  },
]

const EventBoard = () => {
  return (
    <ScreenLayout omitPadding="all">
      <ScrollView>
        <BossHealth maxHP={1000} currentHP={300} />
        <Text category="h4" style={{ textAlign: 'center', marginTop: 16 }}>
          Očistimo Krnjaču
        </Text>
        <BreakdownByMaterial materials={materialStats} />
        <TopRankedList ranking={userRanking} />
      </ScrollView>
    </ScreenLayout>
  )
}

export default EventBoard
