import { Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native'
import BossHealth from '../components/BossHealth'
import CountdownTimer from '../components/CountdownTimer'
import IndividualScore from '../components/IndividualBreakdown'
import ScreenLayout from '../components/ScreenLayout'
import TopRankedList, { UserRankingStats } from '../components/TopRankedList'
import GlobalScore, { MaterialScore } from '../components/TotalBreakdown'

const totalScore: MaterialScore[] = [
  { id: 1, icon: 'bulb', name: 'Electronics', points: 200 },
  { id: 2, icon: 'car', name: 'Cars', points: 150 },
  { id: 3, icon: 'umbrella', name: 'Something', points: 20 },
  { id: 4, icon: 'bulb', name: 'Something', points: 10 },
]

const individualScore: MaterialScore[] = [
  { id: 1, icon: 'bulb', name: 'Electronics', points: 20 },
  { id: 2, icon: 'car', name: 'Cars', points: 10 },
  { id: 3, icon: 'umbrella', name: 'Something', points: 2 },
  { id: 4, icon: 'bulb', name: 'Something', points: 3 },
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
          Očistimo Dorcol
        </Text>
        <CountdownTimer endTime="2022-03-13T14:00:00.0000" />
        <IndividualScore score={individualScore} />
        <GlobalScore score={totalScore} />
        <TopRankedList ranking={userRanking} />
      </ScrollView>
    </ScreenLayout>
  )
}

export default EventBoard
