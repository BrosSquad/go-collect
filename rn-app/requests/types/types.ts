export interface EventDataResponse {
  total_points: number
  total_points_by_exchange_rate: TotalPointsByExchangeRate[]
  event: Event
  ranked_users: RankedUser[]
  damage: number
  total_points_by_exchange_rate_all: TotalPointsByExchangeRate[]
}

export interface RankedUser {
  id: number
  created_at: string
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
  created_at: string
  name: string
  modifier: number
}

export interface Achievement {
  id: number
  created_at: Date
  name: string
  image_url: string
  description: string
  points: number
}

export interface Event {
  id: number
  created_at: string
  title: string
  location: string
  description: string
  image_url: string
  cover_url: string
  start: string
  end: string
}

export interface TotalPointsByExchangeRate {
  total_points: number
  exchange_rate: ExchangeRate
}

export interface ExchangeRate {
  id: number
  created_at: string
  name: string
  modifier: number
}
