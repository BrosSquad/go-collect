import { Spinner } from '@ui-kitten/components'
import { View } from 'react-native'
import ScreenLayout from '../components/ScreenLayout'

const LoadingScreen = () => {
  return (
    <ScreenLayout>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size="giant" />
      </View>
    </ScreenLayout>
  )
}

export default LoadingScreen
