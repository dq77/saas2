import { reactive } from '@vue/composition-api'
export default function usePageType(root) {
  const state = reactive({
    pageType: ''
  })
  const _init = () => {
    state.pageType = root.$route.query.id ? 'assessmentDetail' : 'projectInfo'
  }
  _init()
  return {
    pageType: state.pageType
  }
}
