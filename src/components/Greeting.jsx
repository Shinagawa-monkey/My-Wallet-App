import { useState, useEffect } from 'react'

export const Greeting = () => {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const currentDate = new Date()
    const currentHour = currentDate.getHours()

    if (currentHour < 12) {
      setGreeting('Good morning, ')
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon, ')
    } else {
      setGreeting('Good evening, ')
    }
  }, [])

  return { greeting }
}
