import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosRequestConfig } from 'axios'

export const client = axios.create({
  baseURL: 'https://sta-da-gadjam/api/',
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

axios.interceptors.request.use(async (config): Promise<AxiosRequestConfig> => {
  const token = await AsyncStorage.getItem('token')

  if (token) {
    console.log('Access token found', token)

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: token,
      },
    }
  }

  return config
})
