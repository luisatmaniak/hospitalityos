import http from './core/services/http/http.client'
import findAsyncData from './core/util/find-async-data'
import createApp from './create-app'
import createDiContainer from './services/create-di-container'

const container = createDiContainer()

container.register(http)

const { app, store, router } = createApp(container)

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    // const prevMatched = router.getMatchedComponents(from)

    // let diffed = false
    const activated = matched
    // matched.filter(
    //   (c, i) => diffed || (diffed = prevMatched[i] !== c)
    // );

    if (!activated.length) {
      return next()
    }

    // start loading indicator
    Promise.all(
      activated.map(Component => {
        return Promise.all(
          findAsyncData(Component).map(asyncData =>
            asyncData({
              store,
              route: router.currentRoute,
            }),
          ),
        )
      }),
    )
      .then(() => {
        // stop loading indicator
        next()
      })
      .catch(next)
  })

  app.$mount('#app')
})

if (navigator.serviceWorker && window.location.protocol === 'https:') {
  navigator.serviceWorker.register('/service-worker.js')
}
