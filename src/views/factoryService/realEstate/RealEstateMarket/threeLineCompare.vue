<template lang="pug">
Card.p-card(title='三条红线对比' noWrap)
  el-scrollbar.p-redline-content
    Table.p-table(
      :dataSource="subscribeResult || []"
      :columns="threeLineCompareColumns"
      :loading="subscribeThreeRedLineLoading"
    )
</template>

<script>
import { watch } from '@vue/composition-api'
import Card from '@/components/Card'
import useFollow from '../hooks/useFollow'
import useApis from './api'
import { getCompanyList } from './utils'
import { threeLineCompareColumns } from './config'
import Table from '@/components/qjd/table'
// import useTable from 'hooks/useTable'
export default {
  components: {
    Card,
    Table
  },
  props: {
    mode: {
      type: String,
    },
    refresh: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const {
      followCompanyList,
      getFollowCompanyList
    } = useFollow()

    const {
      subscribeResult,
      doSubscribeThreeRedLineResult,
      subscribeThreeRedLineLoading
    } = useApis({})

    const loadData = async () => {
      await getFollowCompanyList({cache: true})
      if (props.mode === 'follow' && !followCompanyList.value.length) {
        subscribeResult.value = []
        return
      }
      doSubscribeThreeRedLineResult({
        companyList: getCompanyList(followCompanyList.value, props.mode, 'post')
      })
    }

    watch(
      () => props.refresh,
      (value) => {
        loadData()
      }
    )

    return {
      subscribeResult,
      subscribeThreeRedLineLoading,
      threeLineCompareColumns,
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
.p-card
  min-width 0
.p-table
  padding 0 12px
.p-table-content
  max-height 200px
  overflow hidden
.p-redline-content
  height 248px
  overflow hidden
</style>
