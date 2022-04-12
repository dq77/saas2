<template lang="pug">
  el-dialog(:title="`${title}销售组织`", :visible.sync="dialogVisible", width="440px", :before-close="cancleHandle")
    el-form.p-form(label-width='100px', ref='formRef', :rules='rules', :model='form')
      .p-warning(v-if="type === 'delete'")
        i.el-icon-warning
        span 删除销售组织后系统将自动禁用该销售组织的授信额度申请
      el-form-item(label='销售组织编号', prop='code', v-if="type !== 'delete'")
        el-input(v-model="form.code", placeholder="请输入销售组织编号", :disabled="type !== 'add'")
      el-form-item(label='销售组织名称', prop='name')
        el-input(v-model="form.name", placeholder="请输入销售组织名称", :disabled="type === 'delete'", maxlength="50", show-word-limit)
    .p-dialog-footer(slot="footer")
      el-button(@click='cancleHandle') 取 消
      el-button(type='primary', :loading='loading', @click="sureHandle") 确 定
</template>
<script>
import ajaxStore from '@/apis'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    type: String,
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        code: '',
        name: ''
      },
      rules: {
        code: [{ required: true, message: '请输入销售组织编号' }],
        name: [{ required: true, message: '请输入销售组织名称' }]
      },
      loading: false
    }
  },
  watch: {
    dialogVisible(val) {
      val && this._setForm()
      !val && this._resetForm()
      this.$refs.formRef && this.$refs.formRef.resetFields()
    }
  },
  computed: {
    title() {
      return this.type === 'add' ? '添加' : this.type === 'change' ? '修改' : this.type === 'delete' ? '删除' : ''
    }
  },
  methods: {
    sureHandle() {
      const { type, $refs: { formRef }, detail: { id: salesAreaId } } = this
      type === 'delete' && this._delete({ salesAreaId })
      type !== 'delete' && formRef.validate(valid => valid && this.submitHandle())
    },
    submitHandle() {
      this.loading = true
      const { detail: { id, memberId } } = this
      this.type === 'add' && this._add({ ...this.form, status: 1})
      this.type === 'change' && this._change({ ...this.form, id, memberId, status: 1})
    },
    _add(params) {
      const { addSale } = ajaxStore.common.account
      addSale(params).then((res = {}) => {
        const { data: { code } } = res
        this.loading = false
        code === '0' && this._callBack('添加成功')
      })
    },
    _change(params) {
      const { changeSale } = ajaxStore.common.account
      changeSale(params).then((res = {}) => {
        const { data: { code } } = res
        this.loading = false
        code === '0' && this._callBack('修改成功')
      })
    },
    _delete(params) {
      const { deleteSale } = ajaxStore.common.account
      this.loading = true
      deleteSale(params).then((res = {}) => {
        const { data: { code } } = res
        this.loading = false
        code === '0' && this._callBack('删除成功')
      })
    },
    _callBack(message) {
      this.$message.success(message)
      this.$emit('updateHandle')
      this.resetHandle()
    },
    cancleHandle() {
      this.resetHandle()
    },
    resetHandle() {
      this.$emit('closeHandle')
    },
    _setForm() {
      const { code, name } = this.detail
      this.form = { code, name }
    },
    _resetForm() {
      this.form = { code: '', name: '' }
    }
  }
}
</script>
<style lang="stylus" scoped>
.p-warning
  display flex
  margin-bottom 20px
  i
    margin-right 10px
    font-size 20px
/deep/ .el-form-item__content
  width 260px
</style>
