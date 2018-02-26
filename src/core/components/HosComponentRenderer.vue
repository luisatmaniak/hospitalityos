<script>
import { $userComponents } from '../catalog'
import BaseComponentRenderer from './BaseComponentRenderer'

export default {
  name: 'HosComponentRenderer',
  functional: true,
  inject: [$userComponents],
  props: { components: { type: [Array, Boolean], required: true } },
  render(h, { props, injections }) {
    return (
      <BaseComponentRenderer
        components={props.components}
        componentCatalog={injections[$userComponents]}
      />
    )
  },
}
</script>
