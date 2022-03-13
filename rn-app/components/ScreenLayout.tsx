import { Layout } from '@ui-kitten/components'
import { ReactNode } from 'react'
import { useWindowDimensions, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ScreenLayoutProps = {
  children: ReactNode
  style?: ViewStyle
  omitPadding?: 'x' | 'y' | 'all'
}

export const PADDING_X = 24

const ScreenLayout = ({ children, style, omitPadding }: ScreenLayoutProps) => {
  const { top, bottom, left, right } = useSafeAreaInsets()
  const { height, width } = useWindowDimensions()

  const calcPadding = (direction: 'x' | 'y', inset: number) => {
    if (omitPadding === 'all') return undefined
    if (!omitPadding) return inset
    if (direction === 'x' && omitPadding === 'x') return undefined
    if (direction === 'y' && omitPadding === 'y') return undefined
    return inset
  }

  const paddingTop = calcPadding('y', top)
  const paddingBottom = calcPadding('y', bottom)
  const paddingLeft = calcPadding('x', PADDING_X + left)
  const paddingRight = calcPadding('x', PADDING_X + right)

  return (
    <Layout
      style={{
        flex: 1,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        ...style,
      }}
    >
      {children}
    </Layout>
  )
}

export default ScreenLayout
