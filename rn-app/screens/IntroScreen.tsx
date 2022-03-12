import { Text } from '@ui-kitten/components'
import ScreenLayout from '../components/ScreenLayout'
import Sequencer, { SequenceItem } from '../components/Sequencer'

const items: SequenceItem[] = [
  {
    animationConfig: { fade: true, duration: 2 * 1000 },
    component: () => <Text>Hello</Text>,
  },
  {
    animationConfig: { fade: true, duration: 2 * 1000 },
    component: () => <Text>How</Text>,
  },
  {
    animationConfig: { fade: true, duration: 2 * 1000 },
    component: () => <Text>Are</Text>,
  },
  {
    animationConfig: { fade: true, duration: 2 * 1000 },
    component: () => <Text>You</Text>,
  },
  {
    animationConfig: { fade: true, duration: 2 * 1000 },
    component: () => <Text>Doing</Text>,
  },
]

const IntroScreen = () => {
  return (
    <ScreenLayout>
      <Sequencer
        items={items}
        onSequenceEnd={() => console.log('Sequence end')}
      />
    </ScreenLayout>
  )
}

export default IntroScreen
