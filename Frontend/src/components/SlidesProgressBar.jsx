import { useState } from 'react'
import Countdown from 'react-countdown'

export default function SlidesProgressBar({ slidesCount = 1 }) {
  const [slidesProgress, setSlidesProgress] = useState(0)

  return (
    <div
      style={{
        padding: '0.7rem 0.5rem 0rem 0.5rem',
      }}
    >
      <div
        style={{
          width: '100%',
          backgroundColor: '#D9D9D980',
        }}
      >
        <Countdown
          date={Date.now() + 5000}
          intervalDelay={0}
          precision={3}
          renderer={({ seconds }) => {
            return (
              <div
                style={{
                  height: '8px',
                  width: `${(100 / 5) * (5 - seconds)}%`,
                  borderRadius: '8px',
                  backgroundColor: 'white',
                }}
              ></div>
            )
          }}
        />
      </div>
    </div>
  )
}
