import { reactive, toRefs } from '@vue/composition-api'
export default ({
  config = [],
  isGroups
}) => {
  const state = reactive({
    dataSource: [],
    currentIndex: 0,
    current: ''
  })

  const initDataSource = (list) => {
    state.dataSource = JSON.parse(JSON.stringify(list))
    state.current = isGroups ? state.dataSource[0].lists[0] : state.dataSource[0]
  }
  initDataSource(config)

  const changeGroup = ({ item, index }) => {
    state.currentIndex = index
    state.current = item
  }

  return {
    ...toRefs(state),
    changeGroup,
    initDataSource
  }
}
