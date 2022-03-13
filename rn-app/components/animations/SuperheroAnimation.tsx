import LottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const SuperheroAnimation = () => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop
        style={{
          width: 400,
          height: 400,
        }}
        source={require('../../assets/lottie/superhero.json')}
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

export default SuperheroAnimation
