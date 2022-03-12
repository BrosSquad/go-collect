import { Button, Divider, Input, Text } from '@ui-kitten/components'
import React from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import TrashAnimation from '../components/animations/TrashAnimation'
import Logo from '../components/Logo'
import ScreenLayout from '../components/ScreenLayout'
import { goCollectTheme } from '../go-collect-theme'

const LoginScreen = () => {
  return (
    <ScreenLayout>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <TrashAnimation />
          <Logo />
          <Text category="s1">Please login to continue</Text>
        </View>

        <KeyboardAvoidingView style={styles.form}>
          <Input label="Email" placeholder="john@doe.com" />
          <Input
            label="Password"
            placeholder="***********"
            style={{ marginTop: 16 }}
          />
          <Button size="large" style={{ marginTop: 32 }}>
            Login
          </Button>
        </KeyboardAvoidingView>

        <Divider style={{ marginTop: 32 }} />

        <Button
          size="large"
          style={{
            marginTop: 32,
            backgroundColor: goCollectTheme.googleRed,
            borderColor: goCollectTheme.googleRed,
          }}
        >
          Continue with Google
        </Button>

        <Button
          size="large"
          style={{
            marginTop: 16,
            backgroundColor: goCollectTheme.facebookBlue,
            borderColor: goCollectTheme.facebookBlue,
          }}
        >
          Continue with Facebook
        </Button>
      </View>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
  logoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  form: {
    marginTop: 48,
  },
})

export default LoginScreen
