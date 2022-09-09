import { Observable, Subject } from 'rxjs'
import { share } from 'rxjs/operators'
import { timerStore } from './timerStore'

export function appStore() {
  const start$ = new Subject<Event>()
  const pause$ = new Subject<Event>()
  const reset$ = new Subject<Event>()

  return {
    start$,
    pause$,
    timer: timerStore({
      start$,
      pause$,
      reset$,
      imageUrl$: new Observable((observer) => {
        fetch('https://source.unsplash.com/collection/540518/1600x900').then(
          (res) => {
            if (res.ok) {
              observer.next(res.url)
            }
          },
        )
      }),
      save$: new Subject<Event>().pipe(share()),
    }),
  }
}
