// 客户模式点击header中“我的账户”的弹框
<template lang="pug">
  el-dialog(
    title='我的账户'
    width='400px'
    :visible='visible'
    @close='closeDialog'
  )
    el-form
      el-form-item(label='企业名称：')
        span {{ companyName }}
      el-form-item(label='登录账号：')
        div(v-if='mode==="read"')
          span {{ accountNum }}
          el-button.p-btn(type='text' @click='mode="write"') 修改
        div(v-else)
          el-input.p-input(v-model='accountNum' maxlength='11')
          el-button.p-btn(
            type='text'
            :loading='loading'
            @click='clickSave'
          ) 保存
</template>

<script>
import { defineComponent, ref, watch } from '@vue/composition-api'
import { Message } from 'element-ui'
import store from '@/store'
import ajaxStore from '@/apis'

export default defineComponent({
  setup() {
    const mode = ref('read') // read查看状态，write编辑状态
    const loading = ref(false)
    const companyName = store.state.userInfo.company
    const accountNum = ref(store.state.userInfo.mobile)
    const visible = ref(false)

    const clickSave = async () => {
      loading.value = true
      const res = await ajaxStore.common.changeLoginAccount({ newLoginAccount: accountNum.value })
      loading.value = false
      if (res?.data?.code === '0') {
        store.commit('setMobile', accountNum.value)
        mode.value = 'read'
        Message.success('修改成功')
      }
    }

    const closeDialog = () => {
      store.commit('save', { showCustomerAccountDialog: false })
      visible.value = false
    }

    watch(
      () => store.state.showCustomerAccountDialog,
      (newVal) => {
        if (newVal === true) {
          mode.value = 'read'
          visible.value = true
          accountNum.value = store.state.userInfo.mobile
        }
      }
    )

    return {
      visible,
      loading,
      companyName,
      accountNum,
      mode,
      clickSave,
      closeDialog,
    }
  },
})
</script>

<style lang="stylus" scoped>
.p-input
  width 130px
.p-btn
  margin-left 10px
</style>
