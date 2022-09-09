import {BehaviorSubject, merge, NEVER, Observable, of, Subject, timer} from 'rxjs'
import {
  map,
  sample,
  share,
  switchMap,
  takeWhile,
  withLatestFrom,
} from 'rxjs/operators'

export function timerStore({
  start$,
  pause$,
  reset$,
  imageUrl$,
  save$,
}: {
  start$: Observable<Event>
  pause$: Observable<Event>
  reset$: Observable<Event>
  imageUrl$: Observable<string>
  save$: Observable<Event>
}) {
  const latestTimer$ = new BehaviorSubject(1500)

  const initialDuration$ = new BehaviorSubject(1500)

  const init$ = new Subject<void>()

  const countdown = () =>
    timer(0, 1000).pipe(
      withLatestFrom(latestTimer$),
      map(([i, lastValue]) => lastValue - i),
      takeWhile((secs) => secs >= 0),
    )

  const timer$ = merge(
    start$.pipe(map(() => 'start')),
    merge(pause$, reset$).pipe(map(() => 'stop')),
    init$,
  ).pipe(
    switchMap((val) => {
      // console.log(val, latestTimer$.value)

      switch (val) {
        case 'start':
          return countdown()
        case 'stop':
          return NEVER
        default:
          return initialDuration$;
      }
    }),
    share(),
  )

  const pausedTimerValue$ = timer$.pipe(sample(pause$))

  const resetTimerValue$ = merge(reset$, save$).pipe(
    withLatestFrom(initialDuration$),
    map(([e, duration]) => duration),
  )

  merge(pausedTimerValue$, resetTimerValue$).subscribe(latestTimer$)

  const timerDisplayFormatter = (ms: number) =>
    `${Math.floor(ms / 60)}:${(ms % 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    })}`

  const resetTimerDisplay$ = resetTimerValue$.pipe(map(timerDisplayFormatter))

  const timerDisplay$ = timer$.pipe(map(timerDisplayFormatter))

  const backgroundImage$ = timer(0, 120000).pipe(switchMap(() => imageUrl$))

  return {
    resetTimerDisplay$,
    timerDisplay$,
    timer$,
    backgroundImage$,
    latestTimer$,
    init$
  }
}
