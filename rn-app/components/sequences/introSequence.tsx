import { Text } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import Logo from '../../components/Logo'
import BossAnimation from '../animations/BossAnimation'
import GlobeAnimation from '../animations/GlobeAnimation'
import SuperheroAnimation from '../animations/SuperheroAnimation'
import TeamAnimation from '../animations/TeamAnimation'
import TrophyAnimation from '../animations/TrophyAnimation'
import { SequenceItem } from '../Sequencer'

const styles = StyleSheet.create({
  container: {},
  heading: {
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
})

export const introSequence: SequenceItem[] = [
  {
    animationConfig: { fade: true, duration: 3 * 1000 },
    component: () => (
      <View>
        <Logo style={{ marginBottom: 32 }} />
        <Text category="h2" style={styles.heading}>
          Hello Friend 👋
        </Text>
        <Text style={StyleSheet.flatten([styles.text, { marginTop: 16 }])}>
          Let us explain why we need you
        </Text>
      </View>
    ),
  },
  {
    animationConfig: { fade: true, duration: 7 * 1000 },
    component: () => (
      <View>
        <GlobeAnimation />
        <Text style={styles.text}>
          The Earth is shambles. This land, once majestic, now leaves behind
          only a sliver of its former glory.
        </Text>
      </View>
    ),
  },
  {
    animationConfig: { fade: true, duration: 12 * 1000 },
    component: () => (
      <View>
        <BossAnimation />
        <Text style={styles.text}>
          The cause of our peril, a monster, a mutant and a monument to human
          hubris. Created in a misguided attempt to control the very fabric of
          nature, a powerful monster now takes its revenge on those who would
          dare challenge its rule.
        </Text>
      </View>
    ),
  },
  {
    animationConfig: { fade: true, duration: 10 * 1000 },
    component: () => (
      <View>
        <SuperheroAnimation />
        <Text style={styles.text}>
          But there's still hope, for you can be key to finally ridding the
          world of this menace. Be brave, be strong and fight till your last
          breath, for only you are powerful enough to stop it.
        </Text>
      </View>
    ),
  },
  {
    animationConfig: { fade: true, duration: 7 * 1000 },
    component: () => (
      <View>
        <TeamAnimation />
        <Text style={styles.text}>
          But beware, there are others who think they're worthy of killing the
          beast themselves. You'll face them as well on your path to ultimate
          glory.
        </Text>
      </View>
    ),
  },
  {
    animationConfig: { fade: true, duration: 7 * 1000 },
    component: () => (
      <View>
        <TrophyAnimation />
        <Text style={styles.text}>
          Do you have what it takes? Can you be the one only legends and
          prophesies spoke of? Now's the time to prove it!
        </Text>
      </View>
    ),
  },
]
