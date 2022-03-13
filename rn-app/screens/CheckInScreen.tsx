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
    onSuccess: () => {
      navigation.navigate('EventBoard')
    },
  })

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true)
    const { event_id } = JSON.parse(data)
    mutation.mutate({ event_id })
    navigation.navigate('EventBoard')
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
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </ScreenLayout>
  )
}

export default CheckInScreen
