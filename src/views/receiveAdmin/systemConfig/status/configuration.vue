<template lang='pug'>
.config(v-loading='tableApis.loading')
  .config-title 请按您需要配置收款状态：
  Card(
    v-for='item in tableApis.dataSource'
    :key='item.id'
    :data='item'
    v-bind='$attrs'
    @cancelHandle='tableApis.deleteDataSource'
    @resetHandle='tableApis.resetHandle'
  )
  .config-add
    el-button.config-add--button(@click='addHandle') + 添加状态
</template>

<script>
import Card from './card'
import { reactive, toRefs } from '@vue/composition-api'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { deepCopy } from '@/utils/qjd'
import { defaultData } from './config'

export default {
  components: {
    Card
  },
  setup (props) {
    // ajaxStore
    const { receive: { configStatusList } } = ajaxStore
    // methods
    const addHandle = () => {
      tableApis.addDataSource(deepCopy(defaultData))
    }
    // table
    const tableApis = useTable({
      request: configStatusList,
      isPage: false,
      editDataSource: true,
      callback: (data) => {
        data.forEach(item => {
          item.loading = false
        })
        return {
          dataSource: deepCopy(data)
        }
      }
    })

    const state = reactive({ tableApis })

    return {
      addHandle,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../components/style.styl'

.config-add
  width 100%
  height 100px
  background #FFFFFF
  border-radius 4px
  border 1px dashed #E1E1E1
  line-height 100px
  text-align center
  &--button
    width 114px
    color #3B68F0
    border-color #3B68F0
</style>
