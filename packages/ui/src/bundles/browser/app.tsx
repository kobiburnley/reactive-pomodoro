import { filter, share } from 'rxjs/operators'
import { fromEvent, Observable } from 'rxjs'
import ReactDOM from 'react-dom'
import React from 'react'
import { styles } from '../../styles'
import { timerStore } from '../../stores/timerStore'

ReactDOM.render(
  <>
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
        <h1 id="timer">25:00</h1>
      </header>
      <div id="buttons">
        <button id="start">▶️</button>
        <button id="pause">⏸️</button>
        <button id="restart">↻</button>
      </div>
    </div>
    <style>{styles}</style>
  </>,
  document.getElementById('root'),
)

const body = document.getElementsByTagName('body')[0] as HTMLElement
console.log(body.innerHTML)

const durationSelector = document.getElementById(
  'duration-selector',
) as HTMLElement

const timerDisplay = document.getElementById('timer') as HTMLElement

const startBtn = document.getElementById('start') as HTMLElement
const pauseBtn = document.getElementById('pause') as HTMLElement
const resetBtn = document.getElementById('restart') as HTMLElement

const settingsBtn = document.getElementById('settings') as HTMLElement
const setDurationBtn = document.getElementById('set-duration') as HTMLElement
const minutesInput = document.getElementById('minutes') as HTMLInputElement

const { resetTimerDisplay$, timerDisplay$, timer$, backgroundImage$ } =
  timerStore({
    start$: fromEvent(startBtn, 'click'),
    pause$: fromEvent(pauseBtn, 'click'),
    reset$: fromEvent(resetBtn, 'click'),
    imageUrl$: new Observable((observer) => {
      fetch('https://source.unsplash.com/collection/540518/1600x900').then(
        (res) => {
          if (res.ok) {
            observer.next(res.url)
          }
        },
      )
    }),
    save$: fromEvent(setDurationBtn, 'click').pipe(share()),
  })

backgroundImage$.subscribe((imageUrl) => {
  body.style.backgroundImage = `url(${imageUrl})`
})

resetTimerDisplay$.subscribe((timer) => {
  timerDisplay.innerHTML = timer
})

timerDisplay$.subscribe((timer) => {
  timerDisplay.innerHTML = timer
})

timer$.pipe(filter((val) => val === 0)).subscribe(() => {
  alert(`you're done!`)
})
