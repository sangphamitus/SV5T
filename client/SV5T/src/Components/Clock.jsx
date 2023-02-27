import React from 'react'
const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime()

  const [countDown, setCountDown] = React.useState(
    countDownDate - new Date().getTime(),
  )

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return getReturnValues(countDown)
}
const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

  return [days, hours, minutes, seconds]
}
function Clock() {
  const EndDate = 'Mar 3, 2023 23:00:00'
  const [days, hours, minutes, seconds] = useCountdown(EndDate)
  if (days + hours + minutes + seconds <= 0) {
    return (
      <div id="count-down-clock" style={{ color: 'white' }}>
        EXPIRED
      </div>
    )
  } else {
    return (
      <div id="count-down-clock">
        {days + ' days ' + hours + ':' + minutes + ':' + seconds}
      </div>
    )
  }
}

export default Clock
