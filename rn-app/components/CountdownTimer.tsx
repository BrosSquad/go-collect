import { Text } from '@ui-kitten/components'
import { useEffect, useState } from 'react'

type CountdownTimerProps = {
  endTime: string
}

const CountdownTimer = ({ endTime }: CountdownTimerProps) => {
  const {
    isFinished,
    countdown: { days, hours, minutes },
  } = useCountdown(endTime)

  if (isFinished) {
    return null
  }

  return (
    <Text style={{ textAlign: 'center', marginTop: 4 }}>
      {days} days {hours} hours and {minutes} minutes left!
    </Text>
  )
}

export function useCountdown(endTime: string, startTime?: string) {
  const [isFinished, setIsFinished] = useState(false)
  const countDownDate = new Date(endTime).getTime()

  const calc = () => {
    const now = startTime ? new Date(startTime).getTime() : new Date().getTime()

    const distance = countDownDate - now

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

    return {
      days,
      hours,
      minutes,
      distance,
    }
  }

  const [countdown, setCountdown] = useState(() => {
    const { days, hours, minutes } = calc()
    return { days, hours, minutes }
  })

  useEffect(() => {
    const x = setInterval(() => {
      const { days, distance, hours, minutes } = calc()

      if (distance < 0) {
        clearInterval(x)
        setIsFinished(true)
      }

      setCountdown({
        days,
        hours,
        minutes,
      })
    }, 60 * 1000)
  }, [endTime, startTime])

  return {
    isFinished,
    countdown,
  } as const
}

export default CountdownTimer
