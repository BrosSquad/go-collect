import LottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const TrashAnimation = () => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop
        style={{
          width: 300,
          height: 300,
        }}
        source={require('../../assets/lottie/trash.json')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 150,
    overflow: 'hidden',
  },
})

export default TrashAnimation
