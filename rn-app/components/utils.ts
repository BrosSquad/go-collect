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
  const colors = Object.values(goCollectTheme).filter((color: string) =>
    color.startsWith('#')
  )

  return colors[Math.floor(Math.random() * colors.length)]
}
