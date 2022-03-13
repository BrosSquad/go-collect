import { Text } from '@ui-kitten/components'
import TrophyAnimation from '../components/animations/TrophyAnimation'
import ScreenLayout from '../components/ScreenLayout'

const EndGameScreen = () => {
  return (
    <ScreenLayout>
      <TrophyAnimation />
      <Text style={{ textAlign: 'center' }} category="h3">
        Congratulations!
      </Text>
      <Text style={{ textAlign: 'center' }}>The boss has been slain.</Text>
    </ScreenLayout>
  )
}

export default EndGameScreen
