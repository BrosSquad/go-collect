import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@ui-kitten/components'
import ScreenLayout from '../components/ScreenLayout'
import Sequencer, { useSequencer } from '../components/Sequencer'
import { introSequence } from '../components/sequences/introSequence'

const IntroScreen = () => {
  const navigation = useNavigation<any>()
  const { sequencerConfig, next, isLast } = useSequencer({
    items: introSequence,
    onSequenceEnd: async () => {
      console.log('End')
      AsyncStorage.setItem('seenIntro', JSON.stringify(true))
      navigation.navigate('Login')
    },
  })

  return (
    <ScreenLayout style={{ justifyContent: 'center' }}>
      <Sequencer config={sequencerConfig} />
      <Button
        onPress={() => next()}
        appearance="ghost"
        style={{ marginTop: 32 }}
      >
        {isLast ? `Ok, let me login` : 'Next'}
      </Button>
    </ScreenLayout>
  )
}

export default IntroScreen
