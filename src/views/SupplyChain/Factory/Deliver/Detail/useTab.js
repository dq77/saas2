import { ref } from '@vue/composition-api'
export default function ({
  defaultKey
}) {
  const currentKey = ref(defaultKey)

  const changeTopNav = (val) => {
    currentKey.value = val
  }

  return {
    currentKey,
    changeTopNav,
  }
}
