import { Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native'
import BossHealth from '../components/BossHealth'
import BreakdownByMaterial, {
  MaterialStats,
} from '../components/BreakdownByMaterial'
import ScreenLayout from '../components/ScreenLayout'

const materialStats: MaterialStats[] = [
  { id: 1, icon: 'bulb', name: 'Electronics', points: 200 },
  { id: 2, icon: 'car', name: 'Cars', points: 150 },
  { id: 3, icon: 'umbrella', name: 'Something', points: 20 },
  { id: 4, icon: 'bulb', name: 'Something', points: 10 },
]

const EventBoard = () => {
  return (
    <ScreenLayout>
      <ScrollView>
        <BossHealth maxHP={1000} currentHP={300} />
        <Text category="h4" style={{ textAlign: 'center', marginTop: 16 }}>
          Očistimo Krnjaču
        </Text>
        <BreakdownByMaterial materials={materialStats} />
      </ScrollView>
    </ScreenLayout>
  )
}

export default EventBoard
