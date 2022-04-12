<script>
export default {
  name: 'ColumRender',
  functional: true,
  props: {
    scope: Object,
    render: Function
  },
  render: (h, ctx) => {
    const { render, scope } = ctx.props
    // debugger
    return render ? render(h, scope) : ''
  }
}
</script>
