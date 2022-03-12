import { useEffect, useState } from 'react'
import { EasingFunction, ViewStyle } from 'react-native'
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

const Sequencer = ({ items, onSequenceEnd }: SequencerProps) => {
  const [index, setIndex] = useState(0)
  const [{ component: Component, animationConfig }, setCurrentItem] =
    useState<SequenceItem>(items[index])

  useEffect(() => {
    const isLast = index === items.length - 1
    if (isLast) {
      onSequenceEnd && onSequenceEnd()
    } else {
      setTimeout(() => {
        let nextIndex: number
        setIndex((prev) => {
          nextIndex = prev + 1
          return nextIndex
        })
        setCurrentItem(items[nextIndex])
      }, (animationConfig.duration || 0) + (animationConfig.delay || 0))
    }
  }, [
    animationConfig.duration,
    animationConfig.delay,
    index,
    items.length,
    onSequenceEnd,
  ])

  return (
    <SimpleAnimation {...animationConfig} animateOnUpdate>
      <Component />
    </SimpleAnimation>
  )
}

export default Sequencer
