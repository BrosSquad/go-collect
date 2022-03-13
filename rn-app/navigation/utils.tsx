// @ts-nocheck
import { Icon } from '@ui-kitten/components'
import { useEffect, useRef } from 'react'

type TabBarIconProps = {
  name: string
  color: string
  size: number
  isAnimated?: boolean
}

function TabBarIcon({
  name,
  color,
  size = 32,
  isAnimated = false,
}: TabBarIconProps) {
  const ref = useRef<Icon>(null)

  useEffect(() => {
    if (isAnimated) {
      ref.current?.startAnimation()
    }
  }, [isAnimated])

  return (
    <Icon
      ref={ref}
      name={name}
      fill={color}
      animation="pulse"
      animationConfig={{ cycles: Infinity }}
      style={{
        width: size,
        height: size,
      }}
    />
  )
}

export default TabBarIcon
