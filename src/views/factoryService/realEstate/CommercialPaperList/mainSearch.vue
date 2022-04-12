<template lang="pug">
.p-search-input
  SearchCompany(:name='name')
  .p-hot-key
    span 热门搜索：
    template(v-for='(item, index) in hotKey')
      .p-key-item(:key='item.value' @click='doSearch(item.value)') {{item.name}}
        span(v-if='index !== hotKey.length - 1') |
</template>

<script>
import SearchCompany from './searchCompany'
import { reactive, toRefs } from '@vue/composition-api'
import busStore from '@/utils/busStore'
import useEventBus from '@/hooks/useEventBus'
export default {
  components: {
    SearchCompany
  },

  setup(props, { root }) {
    const state = reactive({
      hotKey: [
        {
          name: '恒大',
          value: '恒大'
        },
        {
          name: '融创',
          value: '融创'
        },
        {
          name: '世茂',
          value: '世茂'
        }
      ],
      name: ''
    })

    const { emitEvent } = useEventBus({
      event: busStore.searchTicket
    })

    const doSearch = (companyName) => {
      state.name = companyName
      emitEvent(companyName)
    }

    return {
      doSearch,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-search-input
  color #494949
  display flex
  align-items center
.p-hot-key
  display flex
  align-items center
  margin-left 16px
.p-key-item:hover
  color #3C5DA4
  cursor pointer
.p-key-item span
  margin 0 10px
  color #CDD0D4
</style>
