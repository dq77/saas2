<template lang="pug">
.search
  el-input.search-input(
    placeholder='请输入企业名称'
    v-model='companyName'
    clearable
    @change='changeComapnyName'
  )
    i.icon.iconfont.iconsousuo.search-icon(slot='suffix')
</template>

<script>
import { toRefs, reactive, watch } from '@vue/composition-api'
import useEventBus from '@/hooks/useEventBus'
import busStore from '@/utils/busStore'
import useRealEstateList from '../hooks/useRealEstateList'
export default {
  props: {
    name: {
      type: String
    },
    type: {
      type: String,
      default: 'realEstate'
    }
  },

  setup(props, { root }) {
    const state = reactive({
      companyName: '',
      companyList: []
    })

    const { emitEvent, initEvent } = useEventBus({
      event: busStore.searchTicket
    })
    initEvent((companyName) => {
      state.companyName = companyName
    })

    const { getCompanyList, realEstateList } = useRealEstateList()
    getCompanyList()

    state.companyList = realEstateList

    const changeComapnyName = () => {
      emitEvent(state.companyName)
    }

    watch(() => props.name, (val) => {
      state.companyName = val
    })

    return {
      changeComapnyName,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-input
  width 330px
.search-icon
  font-size 22px
  line-height 32px
</style>
