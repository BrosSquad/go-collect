import { ScrollView } from 'react-native'
import BossHealth from '../components/BossHealth'
import ScreenLayout from '../components/ScreenLayout'

const EventBoard = () => {
  return (
    <ScreenLayout>
      <ScrollView>
        <BossHealth maxHP={1000} currentHP={300} />
      </ScrollView>
    </ScreenLayout>
  )
}

export default EventBoard
