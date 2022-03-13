import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { LoginResponse } from '../requests/types/login_pb'

export default function useAuth() {
  const [isLoading, setIsLoading] = useState(true)
  const [credentials, setCredentials] = useState<LoginResponse.AsObject>()

  useEffect(() => {
    ;(async () => {
      const user = await AsyncStorage.getItem('user')
      if (user) {
        setCredentials(JSON.parse(user))
      }
      setIsLoading(false)
    })()
  }, [])

  const clearCredentials = () => AsyncStorage.removeItem('user')

  return { credentials, isLoading, clearCredentials } as const
}
