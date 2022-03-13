import AsyncStorage from '@react-native-async-storage/async-storage'
import { MutateFunction } from 'react-query'
import { LoginRequest, LoginResponse } from './types/login_pb'
import { EventDataResponse } from './types/types'

const getURL = (endpoint: string) => `http://139.162.151.127:8080${endpoint}`
const getHeaders = async () => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  const token = await AsyncStorage.getItem('user')
  if (token) {
    headers['Authorization'] = JSON.parse(token).token
  }

  return headers
}

export const loginRequest: MutateFunction<
  LoginResponse.AsObject,
  any,
  LoginRequest.AsObject
> = async (variables) => {
  const response = await fetch(getURL('/auth/login'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(variables),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  return response.json()
}

export const checkInRequest: MutateFunction<
  never,
  any,
  { event_id: number }
> = async ({ event_id }) => {
  const response = await fetch(getURL(`/event/${event_id}/participate`), {
    method: 'POST',
    headers: await getHeaders(),
  })

  console.log(response.status)

  if (response.status > 200 && response.status < 300) {
    throw new Error('checkInRequest failed')
  }

  return response.json() as never
}

export const getAchievements = async () => {
  // return await client.get<{ data: AchievementResponse }>('/achievements')
}

export const get = async () => {
  // return await client.get<ExchangeRateResponse>('/exchange-rates')
}

export const getEventData = async ({ eventID }: { eventID: number }) => {
  const response = await fetch(getURL(`/event/${eventID}/board`), {
    headers: await getHeaders(),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  const json = (await response.json()) as EventDataResponse
  return json
}
