export interface UserProfileResponse {
  user: User
  total_points: number
  total_points_by_exchange_rate: TotalPointsByExchangeRate[]
  achievement: Achievement[]
  events: Event[]
}

export interface Achievement {
  id: number
  created_at: Date
  name: Name
  image_url: string
  description: Description
  points: number
}

export enum Description {
  Description1 = 'Description 1',
  Description2 = 'Description 2',
  Description3 = 'Description 3',
  Description4 = 'Description 4',
  Description5 = 'Description 5',
  Description6 = 'Description 6',
  Description7 = 'Description 7',
}

export enum Name {
  Achievement1 = 'Achievement 1',
  Achievement2 = 'Achievement 2',
  Achievement3 = 'Achievement 3',
  Achievement4 = 'Achievement 4',
  Achievement5 = 'Achievement 5',
  Achievement6 = 'Achievement 6',
  Achievement7 = 'Achievement 7',
}

export interface Event {
  id: number
  created_at: Date
  title: Title
  location: Location
  description: Description
  image_url: string
  cover_url: string
  start: Date
  end: Date
}

export enum Location {
  Location1 = 'Location 1',
}

export enum Title {
  Event1 = 'Event 1',
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

export interface User {
  id: number
  created_at: Date
  username: string
  city: string
  points: number
  Tokens: null
  Achievements: Achievement[]
  Events: Event[]
}
