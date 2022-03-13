import {
  Avatar,
  Button,
  Divider,
  Icon,
  Text,
  Tooltip,
} from '@ui-kitten/components'
import { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import ScreenLayout, { PADDING_X } from '../components/ScreenLayout'
import { goCollectTheme } from '../go-collect-theme'

type Achievement = {
  id: number
  icon: string
  label: string
  background: keyof typeof goCollectTheme
  description: string
}

const achievements: Achievement[] = [
  {
    id: 1,
    icon: 'bulb',
    label: 'EMP Cleaner',
    description: 'Collected more than 3k PTS of electric waste.',
    background: 'color-danger-400',
  },
  {
    id: 2,
    icon: 'sync',
    label: 'Plastic Devourer',
    description: 'Collected more than 3k PTS of plastic waste.',
    background: 'color-warning-400',
  },
  {
    id: 3,
    icon: 'shield',
    label: 'Heavy weight',
    description: 'Helped carry more than 2k of any waste',
    background: 'color-info-400',
  },
  {
    id: 4,
    icon: 'shield',
    label: 'Heavy weight',
    description: 'Helped carry more than 2k of any waste',
    background: 'color-info-400',
  },
]

const ProfileScreen = () => {
  const [tooltipActiveId, setTooltipActiveId] = useState<number>()
  const isVisible = (id: number) => tooltipActiveId === id

  useEffect(() => {
    if (tooltipActiveId) {
      setTimeout(() => {
        setTooltipActiveId(undefined)
      }, 2000)
    }
  }, [tooltipActiveId])

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
              @jaksm, Belgrade
            </Text>
          </View>
        </View>
        <Divider style={{ marginVertical: 32 }} />
        <View style={styles.levelContainer}>
          <View style={styles.levelBadge}>
            <Icon name="star" fill="#fff" style={{ width: 64, height: 64 }} />
          </View>
          <Text category="h6" style={{ marginTop: 8 }}>
            6.500
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

        <Button status="danger">Logout</Button>
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
