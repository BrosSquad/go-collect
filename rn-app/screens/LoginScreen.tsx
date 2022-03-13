import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Button, Divider, Input, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { useMutation } from 'react-query'
import TrashAnimation from '../components/animations/TrashAnimation'
import Logo from '../components/Logo'
import ScreenLayout from '../components/ScreenLayout'
import { goCollectTheme } from '../go-collect-theme'
import { loginRequest } from '../requests'
import { LoginRequest } from '../requests/types/login_pb'

const LoginScreen = () => {
  const navigation = useNavigation<any>()
  const [hasError, setHasError] = useState(false)

  const mutation = useMutation(loginRequest, {
    onSuccess: async (data) => {
      await AsyncStorage.setItem('user', JSON.stringify(data))
      navigation.navigate('App')
    },
    onError: (error) => {
      setHasError(true)
    },
  })

  const { control, handleSubmit } = useForm<LoginRequest.AsObject>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <TrashAnimation />
          <Logo />
          <Text category="s1">Please login to continue</Text>
        </View>

        <KeyboardAvoidingView style={styles.form}>
          <Controller
            name="username"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                label="Username"
                placeholder="username"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                status={hasError && 'danger'}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                label="Password"
                placeholder="***********"
                style={{ marginTop: 16 }}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                status={hasError && 'danger'}
                secureTextEntry
              />
            )}
          />

          <Button
            onPress={handleSubmit((data) => mutation.mutate(data))}
            size="large"
            style={{ marginTop: 32 }}
          >
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
