import { Layout, Text } from '@ui-kitten/components'
import DragonAnimation from '../components/animations/DragonAnimation'

export default function TabOneScreen() {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">Scoreboard</Text>
      <DragonAnimation />
    </Layout>
  )
}
