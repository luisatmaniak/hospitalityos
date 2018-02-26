/**
 * Injects all services in `container` to the store this plugin is attached to.
 *
 * This allows actions to access services in the container:
 *
 * ```js
 * actions: {
 *    async findSomething() {
 *       const res = await this.$http.get(...)
 *    }
 * }
 * ```
 *
 * This also registers the store in the container.
 *
 * Instantiation of services is lazy, which means no instances are created until accessed for the
 * first time.
 *
 * @param {Bottle} container
 */
const inject = container => store => {
  // adds the store to the DI container
  container.constant('$store', store)

  container.list().forEach(serviceId => {
    if (process.env.NODE_ENV !== 'production') {
      if (serviceId in store) throw new Error(`${serviceId} already exists in the store!`)
    }

    const depContainer = container.container
    Object.defineProperty(store, serviceId, {
      configurable: false,
      enumerable: true,
      get() {
        return depContainer[serviceId]
      },
    })
  })
}

export default inject
