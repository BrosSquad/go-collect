import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from '@ui-kitten/components'
import { useEffect, useMemo, useState } from 'react'
import { ScrollView } from 'react-native'
import { useQuery } from 'react-query'
import BossHealth from '../components/BossHealth'
import CountdownTimer from '../components/CountdownTimer'
import IndividualScore from '../components/IndividualBreakdown'
import ScreenLayout from '../components/ScreenLayout'
import TopRankedList, { UserRankingStats } from '../components/TopRankedList'
import GlobalScore, { MaterialScore } from '../components/TotalBreakdown'
import { randomIcon } from '../components/utils'
import { getEventData, getHost } from '../requests'
import EndGameScreen from './EndGameScreen'
import LoadingScreen from './LoadingScreen'

const EventBoard = () => {
  const { data, isLoading } = useQuery('eventData', getEventData)
  const [currentHP, setCurrentHP] = useState(NaN)
  const icons = useMemo(() => [randomIcon(), randomIcon()], [])

  const individualScore = data?.total_points_by_exchange_rate.map(
    (pt): MaterialScore => {
      return {
        icon: icons[0],
        id: pt?.exchange_rate?.id,
        name: pt.exchange_rate?.name,
        points: pt?.total_points,
      }
    }
  )

  const totalScore = data?.total_points_by_exchange_rate_all?.map(
    (pt): MaterialScore => {
      return {
        icon: icons[1],
        id: pt?.exchange_rate?.id,
        name: pt.exchange_rate?.name,
        points: pt?.total_points,
      }
    }
  )

  const topPlayers = data?.ranked_users?.map(
    (user): UserRankingStats => ({
      avatarURL: 'https://i.pravatar.cc/100',
      id: user.id,
      name: user.username,
      points: user.points,
    })
  )

  useEffect(() => {
    let websocket: WebSocket;
    (async () => {
      const eventID = await AsyncStorage.getItem('event_id')
      const endpoint = `/ws/${eventID}/collection`;
      websocket = new WebSocket(`ws://${getHost(endpoint)}`)

      websocket.addEventListener('open', () => {
        console.log('WebSocket connected');
      })

      websocket.addEventListener('message', (event: MessageEvent) => {
        const data = JSON.parse(event.data)
        setCurrentHP((prev) => prev - data?.Diff)
      })

      websocket.addEventListener('close', () => {
        console.log('WebSocket connection closed');
      })

      websocket.addEventListener('error', (event) => {
        console.log('Error on WebSocket Connection: ', event);
      })

    })()

    return () => {
      websocket.close()
    }
  }, [])

  if (isLoading) return <LoadingScreen />

  if (isNaN(currentHP)) {
    setCurrentHP(data?.total_points - data?.damage);
  }

  if (currentHP <= 0) {
    return <EndGameScreen />
  }

  return (
    <ScreenLayout omitPadding="all">
      <ScrollView>
        <BossHealth maxHP={data?.total_points} currentHP={currentHP} />
        <Text category="h4" style={{ textAlign: 'center', marginTop: 16 }}>
          {data?.event?.title}
        </Text>
        <CountdownTimer endTime={data?.event?.end} />
        <IndividualScore score={individualScore} />
        <GlobalScore score={totalScore} />
        <TopRankedList ranking={topPlayers} />
      </ScrollView>
    </ScreenLayout>
  )
}

export default EventBoard
