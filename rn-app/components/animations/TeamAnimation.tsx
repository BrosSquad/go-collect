import LottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const TeamAnimation = () => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop
        style={{
          width: 400,
          height: 200,
        }}
        source={require('../../assets/lottie/team.json')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
})

export default TeamAnimation
