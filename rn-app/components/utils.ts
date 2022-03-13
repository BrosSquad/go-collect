import { goCollectTheme } from '../go-collect-theme'

export const randomIcon = () => {
  const icons = [
    'bulb',
    'archive-outline',
    'award-outline',
    'briefcase-outline',
    'charging-outline',
    'color-picker-outline',
    'file-text-outline',
    'home-outline',
    'monitor-outline',
    'trash-2-outline',
    'umbrella-outline',
  ]

  return icons[Math.floor(Math.random() * icons.length)]
}

export const randomColor = () => {
  const colors = [
    goCollectTheme['color-danger-400'],
    goCollectTheme['color-info-400'],
    goCollectTheme['color-primary-400'],
    goCollectTheme['color-warning-400'],
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}
