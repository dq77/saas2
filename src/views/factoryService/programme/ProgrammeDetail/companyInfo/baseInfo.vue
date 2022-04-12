<template lang="pug">
.p-detail-card(v-loading='loading')
  BlueTable(:source='result' :columns='columns' :title='companyName')
    template(slot='operate' slot-scope='{row}')
      el-button.p-btn(type='text' @click='shareHolderDialogShow' :weblogs-anchor='weblogs') 查看
  el-dialog(
    width='90%'
    :center='true'
    :visible.sync='visible')
    ShareHolder(:companyName='companyName')
</template>

<script>
import { watch, ref } from '@vue/composition-api'
import BlueTable from '../components/blueTable'
import ShareHolder from '../../components/shareHolder'
import useBaseInfo from '@/views/factoryService/realEstate/hooks/useBaseInfo'
import { baseColumns, realEstateBaseColumns } from '../config'
export default {
  props: {
    companyName: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'realEstateCompany'
    }
  },

  components: { BlueTable, ShareHolder },

  setup(props, { root }) {
    const visible = ref(false)
    const { companyName, type } = props
    const { loading, result, doResult } = useBaseInfo({companyName})
    const columns = type === 'realEstateCompany' ? realEstateBaseColumns : baseColumns
    const weblogs = type === 'realEstateCompany' ? 'factory-customerEvaluation-eval-programme-shareView' : 'factory-customerEvaluation-eval-project-shareView'

    if (companyName) {
      doResult({ companyName })
    }

    const shareHolderDialogShow = () => {
      visible.value = true
    }

    watch(
      () => props.companyName,
      (value) => {
        doResult({ companyName: value })
      }
    )

    return {
      loading,
      result,
      columns,
      weblogs,
      visible,
      shareHolderDialogShow
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-btn
  color #25becd
.p-card-title
  background #728BC2
  color #fff
  font-size 18px
  padding 18px
  box-shadow 4px 7px 12px 0px rgba(60, 93, 164, 0.39)
</style>
