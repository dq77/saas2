<template lang="pug">
PlainInfo(ref="plainRef")
</template>
<script>
import { ref } from '@vue/composition-api'
import PlainInfo from '../../plainInfo'

export default {
  components: {
    PlainInfo
  },
  setup() {
    const plainRef = ref()

    const refreshHandle = () => plainRef.value && plainRef.value.refreshHandle()

    return {
      plainRef,
      refreshHandle
    }
  }
}
</script>
