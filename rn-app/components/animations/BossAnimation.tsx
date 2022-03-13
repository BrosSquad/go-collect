import LottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const BossAnimation = () => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop
        style={{
          width: 400,
          height: 400,
        }}
        source={require('../../assets/lottie/boss.json')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default BossAnimation
