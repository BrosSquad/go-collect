import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { AppStateStatus, Platform } from 'react-native'
import useAppState from 'react-native-appstate-hook'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { focusManager, QueryClientProvider } from 'react-query'
import { goCollectTheme } from './go-collect-theme'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import { queryClient } from './queryClient'

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    // Refetch when app is foregrounded
    focusManager.setFocused(status === 'active')
  }
}

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  useAppState({
    onChange: onAppStateChange,
  })

  if (!isLoadingComplete) {
    return null
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{ ...eva[colorScheme], ...goCollectTheme }}
        >
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </ApplicationProvider>
      </QueryClientProvider>
    </>
  )
}
