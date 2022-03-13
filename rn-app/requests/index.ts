import AsyncStorage from '@react-native-async-storage/async-storage'
import { MutateFunction } from 'react-query'
import { LoginRequest, LoginResponse } from './types/login_pb'
import { UserProfileResponse } from './types/profile'
import { EventDataResponse } from './types/types'

const getURL = (endpoint: string) => `http://139.162.151.127:8080${endpoint}`
export const getHeaders = async () => {
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
  { event_id: number },
  any,
  { event_id: string }
> = async ({ event_id }) => {
  const response = await fetch(getURL(`/event/${event_id}/participate`), {
    method: 'POST',
    headers: await getHeaders(),
  })

  if (!response.ok) {
    throw new Error('checkInRequest failed')
  }

  return response.json()
}

export const getProfile = async () => {
  const response = await fetch(getURL(`/user-profile`), {
    headers: await getHeaders(),
  })

  if (!response.ok) {
    throw new Error('getProfile failed')
  }

  return response.json() as Promise<UserProfileResponse>
}

export const get = async () => {
  // return await client.get<ExchangeRateResponse>('/exchange-rates')
}

export const getEventData = async () => {
  const eventID = await AsyncStorage.getItem('event_id')

  const response = await fetch(getURL(`/event/${eventID}/board`), {
    headers: await getHeaders(),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  const json = (await response.json()) as EventDataResponse
  return json
}
