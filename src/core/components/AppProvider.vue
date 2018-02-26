<script>
import onlyChild from '../util/only-child'

export default {
  name: 'AppProvider',
  provide() {
    return this.container.container
  },
  props: { container: { type: Object, required: true } },
  render() {
    return onlyChild(this.$slots.default)
  },
}
</script>
