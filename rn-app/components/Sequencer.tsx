import { useState } from 'react'
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

type SequencerConfig = {
  item: SequenceItem
}

type SequencerProps = {
  config: SequencerConfig
}

const Sequencer = ({ config }: SequencerProps) => {
  if (!config.item) {
    return null
  }

  const { animationConfig, component: Component } = config.item

  return (
    <SimpleAnimation {...animationConfig} animateOnUpdate>
      <Component />
    </SimpleAnimation>
  )
}

type UseSequencerParams = {
  items: SequenceItem[]
  onSequenceEnd?: () => void | Promise<void>
}

export const useSequencer = ({ items, onSequenceEnd }: UseSequencerParams) => {
  const [index, setIndex] = useState(0)
  const [item, setCurrentItem] = useState<SequenceItem>(items[index])

  const next = () => {
    const isLast = index === items.length - 1
    if (!isLast) {
      let nextIndex: number
      setIndex((prev) => {
        nextIndex = prev + 1
        return nextIndex
      })
      setCurrentItem(items[nextIndex])
    } else {
      onSequenceEnd && onSequenceEnd()
    }
  }

  return {
    next,
    currentIndex: index,
    isLast: index === items.length - 1,
    sequencerConfig: {
      item,
    } as SequencerConfig,
  } as const
}

export default Sequencer
