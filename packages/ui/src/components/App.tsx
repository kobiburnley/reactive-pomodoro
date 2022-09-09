import React, { useEffect, useState } from 'react'
import { appStore } from '../stores/appStore'
import { styles } from '../styles'

const style = document.createElement('style')
style.appendChild(document.createTextNode(styles))
document.head.appendChild(style)

export function App() {
  const [
    {
      start$,
      pause$,
      timer: { timerDisplay$, backgroundImage$, init$ },
    },
  ] = useState(() => appStore())

  const [timerDisplay, setTimerDisplay] = useState('')

  useEffect(() => {
    const sub = timerDisplay$.subscribe((val) => {
      setTimerDisplay(val)
    })

    init$.next()

    return () => {
      sub.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const sub = backgroundImage$.subscribe((imageUrl) => {
      // document.body.style.backgroundImage = `url(${imageUrl})`
    })

    return () => {
      sub.unsubscribe()
    }
  }, [])

  return (
    <div id="container">
      <nav>
        <span id="settings">⚙️</span>
      </nav>
      <div id="duration-selector">
        <div>
          <input type="number" id="minutes" min="0" max="60" />
          <label htmlFor="minutes">minutes</label>
        </div>
        <button id="set-duration">set</button>
      </div>
      <header>
        <h1 id="timer">{timerDisplay}</h1>
      </header>
      <div id="buttons">
        <button id="start" onClick={(e) => start$.next(e.nativeEvent)}>
          ▶️
        </button>
        <button id="pause" onClick={(e) => pause$.next(e.nativeEvent)}>
          ⏸️
        </button>
        <button id="restart">↻</button>
      </div>
    </div>
  )
}
