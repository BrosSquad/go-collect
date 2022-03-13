import AsyncStorage from '@react-native-async-storage/async-storage'
import { MutateFunction } from 'react-query'
import { LoginRequest, LoginResponse } from './types/login_pb'

const getURL = (endpoint: string) => `http://139.162.151.127:8080${endpoint}`
const getHeaders = async () => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  const token = await AsyncStorage.getItem('token')
  if (token) {
    headers['Authorization'] = token
  }

  return headers
}

export const loginRequest: MutateFunction<
  LoginResponse.AsObject,
  any,
  LoginRequest.AsObject
> = async (variables) => {
  console.log(variables)

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

export const generateQR = async (id: number) => {
  // return await client.get(`/event/${id}/participate`, {
  //   method: 'POST',
  // })
}

export const getAchievements = async () => {
  // return await client.get<{ data: AchievementResponse }>('/achievements')
}

export const get = async () => {
  // return await client.get<ExchangeRateResponse>('/exchange-rates')
}
