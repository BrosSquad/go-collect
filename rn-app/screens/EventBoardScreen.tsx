import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from '@ui-kitten/components'
import { useEffect, useMemo } from 'react'
import { ScrollView } from 'react-native'
import { useQuery } from 'react-query'
import BossHealth from '../components/BossHealth'
import CountdownTimer from '../components/CountdownTimer'
import IndividualScore from '../components/IndividualBreakdown'
import ScreenLayout from '../components/ScreenLayout'
import TopRankedList, { UserRankingStats } from '../components/TopRankedList'
import GlobalScore, { MaterialScore } from '../components/TotalBreakdown'
import { randomIcon } from '../components/utils'
import { getEventData, getHeaders } from '../requests'
import LoadingScreen from './LoadingScreen'

/**
 
{
    refetchInterval: 2 * 1000,
  }

 */

const EventBoard = () => {
  const { data, isLoading } = useQuery('eventData', getEventData)

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
      const headers = await getHeaders()

      websocket = new WebSocket(
        `ws://139.162.151.127:8080/ws/${eventID}/collection`
      )
      websocket.onopen = () => {
        console.log('connected')
      }
      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log('ws', data)
      }
    })()

    return () => {
      websocket.close()
    }
  }, [])

  if (isLoading) return <LoadingScreen />

  return (
    <ScreenLayout omitPadding="all">
      <ScrollView>
        <BossHealth
          maxHP={data?.total_points}
          currentHP={data?.total_points - data?.damage}
        />
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
