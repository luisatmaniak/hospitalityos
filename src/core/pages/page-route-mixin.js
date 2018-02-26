import { mapGetters } from 'vuex'
import { pageErrorInCurrentRoute, pageInCurrentRoute, requestPageBySlug } from './pages'

const pageRoute = {
  asyncData: ({ store, route }) => {
    return store.dispatch(requestPageBySlug, { slug: route.params.slug })
  },
  computed: {
    ...mapGetters({
      page: pageInCurrentRoute,
      error: pageErrorInCurrentRoute,
    }),
  },
}

export default pageRoute
