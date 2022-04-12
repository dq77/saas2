<template lang="pug">
.news-main
  HotWords(ref='news-hotWords')
  NewsList
</template>

<script>
import HotWords from './hotWords'
import NewsList from './newsList'
import { ref, getCurrentInstance } from '@vue/composition-api'
import useEventBus from '@/hooks/useEventBus'
import busStore from '@/utils/busStore'
export default {
  components: {
    HotWords,
    NewsList
  },
  setup(props) {
    const refs = ref(null)
    refs.value = getCurrentInstance().refs

    const { emitEvent } = useEventBus({
      event: busStore.getRefs
    })

    emitEvent(refs)
  }
}
</script>

<style lang="stylus" scoped>
.news-main
  padding 40px 20px
</style>
