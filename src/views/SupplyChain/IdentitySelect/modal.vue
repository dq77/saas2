<template lang="pug">
  Modal(:title='title' :visible='visible' sureTxt='确定' @cancleHandle="cancleHandle" @sureHandle="sureHandleModel")
    el-radio-group(v-model="currFactory")
      el-radio(v-for="(item, index) in customerTenants" :key="index" :label="item.tenantId") {{item.tenantName}}
</template>

<script>
import store from '@/store'
import useLoading from 'hooks/useLoading'
import { ref } from '@vue/composition-api'
import Modal from '@/components/qjd/modal/index'
// import ajaxStore from '@/apis'
// import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'

export default {
  components: {
    Modal
  },
  props: {
    title: String,
    visible: Boolean
  },
  setup(props, { root, emit }) {
    const { state: { userInfo: { customerTenants } } } = store
    const currFactory = ref('')
    const { loading, checkLoading } = useLoading()
    const cancleHandle = () => {
      emit('cancleHandle')
    }
    const sureHandleModel = () => {
      sureHandle(currFactory.value)
    }
    const sureHandle = async (val) => {
      if (val) {
        await store.dispatch('getCurFactory', {
          tenantId: val,
          applicationId: '1'
        })
        root.$router.push({name: 'dealerOrderManage', query: {isInit: true}})
      } else {
        Message.error('请选择厂家!')
      }
    }
    return {
      cancleHandle,
      sureHandle,
      customerTenants,
      loading,
      checkLoading,
      currFactory,
      sureHandleModel
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-radio
  display: block;
  line-height: 30px;
</style>
