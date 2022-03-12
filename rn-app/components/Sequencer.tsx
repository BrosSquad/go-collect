import {
  forwardRef,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { EasingFunction, View, ViewStyle } from 'react-native'
import { SimpleAnimation } from 'react-native-simple-animations'

// https://github.com/joeyschroeder/react-native-simple-animations#configuration
export type AnimationConfig = {
  duration?: number
  delay?: number
  fade?: boolean
  easing?: EasingFunction
  direction?: 'down' | 'left' | 'right' | 'up'
  distance?: number
  friction?: number
  movementType?: 'slide' | 'spring'
  staticType?: 'bounce' | 'zoom'
  style?: ViewStyle
  tension?: number
}

export type SequenceItem = {
  component: () => JSX.Element
  animationConfig: AnimationConfig
}

type SequencerProps = {
  items: SequenceItem[]
  onSequenceEnd?: () => void
}

export type SequencerRef = {
  skip: () => void
}

const Sequencer = forwardRef<SequencerRef, SequencerProps>(
  ({ items, onSequenceEnd }: SequencerProps, ref) => {
    const [index, setIndex] = useState(0)

    const [item, setCurrentItem] = useState<SequenceItem>(items[index])

    useEffect(() => {
      if (!item) {
        return
      }
      const isLast = index === items.length - 1
      if (isLast) {
        onSequenceEnd && onSequenceEnd()
      } else {
        const {
          animationConfig: { duration, delay },
        } = item
        setTimeout(() => {
          let nextIndex: number
          setIndex((prev) => {
            nextIndex = prev + 1
            return nextIndex
          })
          setCurrentItem(items[nextIndex])
        }, (duration || 0) + (delay || 0))
      }
    }, [item, index, items.length, onSequenceEnd])

    useImperativeHandle(ref, () => ({
      skip: () => {
        const isLast = index === items.length - 1
        if (!isLast) {
          let nextIndex: number
          setIndex((prev) => {
            nextIndex = prev + 1
            return nextIndex
          })
          setCurrentItem(items[nextIndex])
        }
      },
    }))

    if (!item) {
      onSequenceEnd && onSequenceEnd()

      return null
    }

    const { animationConfig, component: Component } = item

    return (
      <View ref={ref as unknown as MutableRefObject<View>}>
        <SimpleAnimation {...animationConfig} animateOnUpdate>
          <Component />
        </SimpleAnimation>
      </View>
    )
  }
)

export default Sequencer
