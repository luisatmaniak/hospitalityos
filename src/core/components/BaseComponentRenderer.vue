<script>
export default {
  name: 'BaseComponentRenderer',
  functional: true,
  props: {
    components: { type: [Array, Boolean], required: true },
    componentCatalog: { type: Object, required: true },
  },
  render(h, { props: { components, componentCatalog } }) {
    return (
      components &&
      components.map(({ acf_fc_layout, ...props }) => {
        const Component = componentCatalog[acf_fc_layout]
        return h(Component, { props })
      })
    )
  },
}
</script>
