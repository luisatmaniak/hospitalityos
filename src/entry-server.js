import { $req } from './core/catalog.server'
import http from './core/services/http/http.server'
import findAsyncData from './core/util/find-async-data'
import createApp from './create-app'
import createDiContainer from './services/create-di-container'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  return new Promise((resolve, reject) => {
    const container = createDiContainer()

    container.constant($req, context.req)
    container.register(http)

    const { app, store, router } = createApp(container)

    router.push(context.req.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // Call fetchData hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      Promise.all(
        matchedComponents.map(Component => {
          // TODO mixin gets applied during rendering, so we need to look it up ahead of time
          // decide if this is the correct approach
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
          // After all preFetch hooks are resolved, our store is now
          // filled with the state needed to render the app.
          // Expose the state on the render context, and let the request handler
          // inline the state in the HTML response. This allows the client-side
          // store to pick-up the server-side state without having to duplicate
          // the initial data fetching on the client.
          context.state = store.state
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
}
