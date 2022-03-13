import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Text } from '@ui-kitten/components'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useMutation } from 'react-query'
import ScreenLayout from '../components/ScreenLayout'
import { checkInRequest } from '../requests'

const CheckInScreen = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const navigation = useNavigation<any>()

  const mutation = useMutation(checkInRequest, {
    onSuccess: async ({ event_id }) => {
      await AsyncStorage.setItem('event_id', event_id.toString())
      navigation.navigate('EventBoard')
    },
  })

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = async ({ data }) => {
    const { event_id } = JSON.parse(data)

    mutation.mutate({ event_id: event_id })
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <ScreenLayout>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </ScreenLayout>
  )
}

export default CheckInScreen
