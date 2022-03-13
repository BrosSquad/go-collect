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
import { getEventData } from '../requests'
import EndGameScreen from './EndGameScreen'
import LoadingScreen from './LoadingScreen'

const EventBoard = () => {
  const { data, isLoading } = useQuery('eventData', getEventData)
  const [currentHP, setCurrentHP] = useState(data?.total_points - data?.damage)

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
    let websocket
    ;(async () => {
      const eventID = await AsyncStorage.getItem('event_id')
      websocket = new WebSocket(
        `ws://139.162.151.127:8080/ws/${eventID}/collection`
      )
      websocket.onopen = () => {
        console.log('connected')
      }
      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        setCurrentHP((prev) => prev - data?.Diff)
      }
    })()

    return () => {
      websocket.close()
    }
  }, [])

  if (isLoading) return <LoadingScreen />

  const maxHP = data?.total_points
  if (currentHP <= 0) {
    return <EndGameScreen />
  }

  return (
    <ScreenLayout omitPadding="all">
      <ScrollView>
        <BossHealth maxHP={maxHP} currentHP={currentHP} />
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
