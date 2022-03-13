import { StyleSheet, View } from 'react-native'
import BossAnimation from './animations/BossAnimation'
import HPBar from './HPBar'

export type BossHealthProps = {
  maxHP: number
  currentHP: number
}

const BossHealth = ({ maxHP, currentHP }: BossHealthProps) => {
  return (
    <View>
      <View style={styles.bossContainer}>
        <BossAnimation />
        <HPBar maxHP={maxHP} currentHP={currentHP} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bossContainer: {
    alignItems: 'center',
  },
})

export default BossHealth
