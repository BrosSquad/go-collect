export interface EventDataResponse {
  total_points: number
  total_points_by_exchange_rate: TotalPointsByExchangeRate[]
  event: Event
  ranked_users: RankedUser[]
}

export interface Event {
  id: number
  created_at: Date
  title: string
  location: string
  description: string
  image_url: string
  cover_url: string
  start: Date
  end: Date
}

export interface RankedUser {
  id: number
  created_at: Date
  username: string
  city: string
  points: number
  Tokens: null
  Achievements: null
  Events: null
}

export interface TotalPointsByExchangeRate {
  total_points: number
  exchange_rate: ExchangeRate
}

export interface ExchangeRate {
  id: number
  created_at: Date
  name: string
  modifier: number
}
