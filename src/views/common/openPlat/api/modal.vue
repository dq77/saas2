<template lang="pug">
  el-dialog(:title="title", :visible.sync="dialogVisible", width="30%", :before-close="cancleHandle", :width="'500px'")
    div(v-if="type === 'delete'") 应用删除后Token便置为失效，且后续不可在进行调用
    div(v-if="type === 'see'") {{ token }}
    el-form.p-form(label-width='100px', ref='formRef', :rules='rules', :model='form' v-if="type === 'add'")
      el-form-item(label='应用名称', prop='appName', )
        el-input(v-model="form.appName", placeholder="请输入应用名称", :disabled="type !== 'add'")
      el-form-item(label='应用权限', prop='permissions')
        el-checkbox-group(v-model="form.permissions")
          el-checkbox( v-for="(item, index) in checkOptions", :key="index", :label="item.permissionCode ? item.permissionCode : ''") {{ item.permissionName ? item.permissionName : '' }}
    .modal-buttons
      el-button(@click="cancleHandle") 取消
      el-button(type="primary", @click="sureHandle", :loading="loading", v-if="type !== 'see'") 确定
</template>
<script>
import ajaxStore from '@/apis'
export default {
  props: {
    dialogVisible: Boolean,
    type: String,
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    title() {
      return this.type === 'add' ? '新增' : this.type === 'delete' ? '删除' : this.type === 'see' ? '查看' : ''
    }
  },
  data() {
    return {
      form: {
        appName: '',
        permissions: []
      },
      rules: {
        appName: [{ required: true, message: '请输入应用名称' }],
        permissions: [{ required: true, message: '请选择应用权限' }]
      },
      checkOptions: [],
      loading: false,
      token: null
    }
  },
  watch: {
    type(val) {
      val === 'add' && this._getPermissions()
      val === 'see' && this._getToken({ appId: this.detail.appId })
    },
    dialogVisible(val) {
      if (!val) {
        this.token = null
        // this.type = ''
        this.$parent.type = ''
      }
      this.$refs.formRef && this.$refs.formRef.resetFields()
    }
  },
  methods: {
    cancleHandle() {
      this.$emit('cancleHandle')
    },
    sureHandle() {
      const { type, $refs: { formRef }, detail: { appId } } = this
      type === 'delete' && this._delete({ appId })
      type === 'add' && formRef.validate(valid => valid && this._add({ ...this.form }))
    },
    _add(params) {
      this.loading = true
      const { createApp } = ajaxStore.common.openPlat
      createApp(params).then((res = {}) => {
        const { data: { code } } = res
        this.loading = false
        code === '0' && this._callBack('创建成功')
      })
    },
    _delete(params) {
      const { deleteApp } = ajaxStore.common.openPlat
      this.loading = true
      deleteApp(params).then((res = {}) => {
        const { data: { code } } = res
        this.loading = false
        code === '0' && this._callBack('删除成功')
      })
    },
    _callBack(message) {
      this.$message.success(message)
      this.$emit('updateHandle')
      this.$emit('cancleHandle')
    },
    async _getPermissions() {
      const { getPermissions } = ajaxStore.common.openPlat
      const res = await getPermissions()
      const { data: { code, data } } = res || {}
      if (code === '0') {
        this.checkOptions = data
      }
    },
    async _getToken(params) {
      const { getToken } = ajaxStore.common.openPlat
      const res = await getToken(params)
      const { data: { code, data } } = res || {}
      if (code === '0') {
        this.token = data
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.modal-buttons
  display flex
  justify-content center
  padding-top 40px
</style>
