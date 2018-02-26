<template>
  <main class="hos-page">
    <slot v-if="page" :page="page">
      <hos-component-renderer :components="page.acf.components"/>
    </slot>

    <slot v-if="error" :error="error" name="error">
      A funny error {{ error }}
      <!--<hos-route-error :error="error"/>-->
    </slot>
  </main>
</template>

<script>
import HosComponentRenderer from '../components/HosComponentRenderer'
import HosErrorSwitch from '../components/HosErrorSwitch'
import pageRoute from './page-route-mixin'

export default {
  name: 'HosPageRoute',
  components: { HosErrorSwitch, HosComponentRenderer },
  mixins: [pageRoute],
}
</script>
