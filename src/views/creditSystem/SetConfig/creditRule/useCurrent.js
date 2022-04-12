import { ref } from '@vue/composition-api'

export default () => {
  const currentIndex = ref(1)

  const selectHandle = index => { currentIndex.value = index }

  return {
    currentIndex,
    selectHandle
  }
}
