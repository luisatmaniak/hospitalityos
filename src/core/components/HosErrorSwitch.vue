<script>
export default {
  name: 'HosErrorSwitch',
  functional: true,
  props: {
    error: { type: [Object, Boolean, String], default: false },
  },
  render(h, { props, slots }) {
    const { default: def, error } = slots()

    return props.error ? error : def
  },
}
</script>
