import { Layout } from '@ui-kitten/components'
import { ReactNode } from 'react'
import { ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ScreenLayoutProps = {
  children: ReactNode
  style?: ViewStyle
}

export const PADDING_X = 24

const ScreenLayout = ({ children, style }: ScreenLayoutProps) => {
  const { top, bottom, left, right } = useSafeAreaInsets()
  return (
    <Layout
      style={{
        flex: 1,
        paddingTop: top,
        paddingBottom: bottom,
        paddingLeft: PADDING_X + left,
        paddingRight: PADDING_X + right,
        ...style,
      }}
    >
      {children}
    </Layout>
  )
}

export default ScreenLayout
