import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import {
  Avatar,
  Button,
  Divider,
  Icon,
  Text,
  Tooltip,
} from '@ui-kitten/components'
import { useEffect, useMemo, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useQuery } from 'react-query'
import ScreenLayout, { PADDING_X } from '../components/ScreenLayout'
import { randomColor, randomIcon } from '../components/utils'
import { goCollectTheme } from '../go-collect-theme'
import { getProfile } from '../requests'
import LoadingScreen from './LoadingScreen'

type Achievement = {
  id: number
  icon: string
  label: string
  background: keyof typeof goCollectTheme
  description: string
}

const ProfileScreen = () => {
  const [tooltipActiveId, setTooltipActiveId] = useState<number>()
  const isVisible = (id: number) => tooltipActiveId === id
  const navigation = useNavigation<any>()
  const { data, isLoading } = useQuery('profile', getProfile)

  useEffect(() => {
    if (tooltipActiveId) {
      setTimeout(() => {
        setTooltipActiveId(undefined)
      }, 2000)
    }
  }, [tooltipActiveId])

  const onLogout = async () => {
    await AsyncStorage.removeItem('user')
    navigation.navigate('Login')
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  const background = useMemo(() => randomColor(), [])
  const icon = useMemo(() => randomIcon(), [])

  const achievements = data?.achievement?.map(
    (a): Achievement => ({
      id: a.id,
      background,
      description: a.description,
      icon,
      label: a.name,
    })
  )

  return (
    <ScreenLayout omitPadding="y">
      <ScrollView style={{ paddingTop: PADDING_X + 16 }}>
        <Text category="h4" style={{ marginTop: 16 }}>
          Hello, Jaksa!
        </Text>
        <View style={styles.header}>
          <Avatar source={{ uri: 'https://i.pravatar.cc/100' }} size="giant" />
          <View>
            <Text category="h6" style={{ marginLeft: 16 }}>
              Jaksa Malisic
            </Text>
            <Text category="s1" style={{ marginLeft: 16 }}>
              @{data?.user?.username}, {data?.user?.city}
            </Text>
          </View>
        </View>
        <Divider style={{ marginVertical: 32 }} />
        <View style={styles.levelContainer}>
          <View style={styles.levelBadge}>
            <Icon name="star" fill="#fff" style={{ width: 64, height: 64 }} />
          </View>
          <Text category="h6" style={{ marginTop: 8 }}>
            {data?.user?.points}
          </Text>
          <Text category="s1" style={{ marginTop: 8 }}>
            PTS
          </Text>
        </View>
        <View style={styles.achievementsGrid}>
          {achievements.map(({ id, background, description, icon, label }) => (
            <Tooltip
              anchor={() => (
                <TouchableWithoutFeedback
                  onPress={() => setTooltipActiveId(id)}
                >
                  <View style={styles.achievementContainer}>
                    <View
                      key={id}
                      style={StyleSheet.flatten([
                        {
                          backgroundColor: goCollectTheme[background],
                          width: 64,
                          height: 64,
                        },
                        styles.achievementBadge,
                      ])}
                    >
                      <Icon
                        name={icon}
                        fill="#fff"
                        style={{ width: 48, height: 48 }}
                      />
                    </View>
                    <Text category="s1" style={{ marginTop: 8 }}>
                      {label}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
              visible={isVisible(id)}
              onBackdropPress={() => setTooltipActiveId(id)}
            >
              {description}
            </Tooltip>
          ))}
        </View>

        <Button status="danger" onPress={onLogout}>
          Logout
        </Button>
      </ScrollView>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {},
  levelContainer: {
    alignSelf: 'center',
    maxWidth: 88,
    alignItems: 'center',
  },
  achievementsGrid: {
    marginVertical: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
  },
  achievementContainer: {
    alignItems: 'center',
    marginHorizontal: 6,
    marginVertical: 16,
  },
  achievementBadge: {
    padding: 9,
    borderRadius: 12,
  },
  levelBadge: {
    padding: 12,
    backgroundColor: goCollectTheme['color-warning-400'],
    borderRadius: 100,
  },
})

export default ProfileScreen
