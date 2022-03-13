import { useNavigation } from '@react-navigation/native'
import { Spinner } from '@ui-kitten/components'
import { useEffect } from 'react'
import { View } from 'react-native'
import ScreenLayout from '../components/ScreenLayout'
import useAuth from '../hooks/useAuth'

const LoadingScreen = () => {
  const navigation = useNavigation<any>()
  const { isLoading, credentials } = useAuth()

  useEffect(() => {
    if (!isLoading && !!credentials) {
      navigation.navigate('App')
    }
  }, [isLoading, credentials])

  return (
    <ScreenLayout>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size="giant" />
      </View>
    </ScreenLayout>
  )
}

export default LoadingScreen
