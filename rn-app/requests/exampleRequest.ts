import { LoginRequest, LoginResponse } from './types/login_pb'
import { AchievementResponse } from './types/achievement_pb'
import { ExchangeRateResponse } from './types/exchange_rates_pb'

import { client } from "../apiClient"

export const login = async (payload: LoginRequest.AsObject) => {
  return await client.get<LoginResponse.AsObject>('/auth/login', {
    data: payload,
    method: 'POST'
  })
}

export const generateQR = async (id: number) => {
  return await client.get(`/event/${id}/participate`, {
    method: 'POST',
  })
}

export const getAchievements = async () => {
  return await client.get<{ data: AchievementResponse }>('/achievements')
}

export const get = async () => {
  return await client.get<ExchangeRateResponse>('/exchange-rates')
}