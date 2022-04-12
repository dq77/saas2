<template lang="pug">
  el-dialog(title='开票信息' :visible.sync='_dialogVisible')
    Form(
      :formConfig='formConfig'
      :formData='formData'
      :labelPosition='"right"'
      :inline='false'
      @removeDymicInput='removeDymicInput'
      @addDymicInput='addDymicInput'
      class='dynamicInput'
      ref='formRef'
      v-bind='$attrs'
    )
      el-button(type='plain' @click='_dialogVisible = false') 取消
      el-button(type='primary'  @click='sureDialog') 确认
</template>

<script>
import Form from '../../Components/Form.vue'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    logisticsList: {
      type: Array,
    }
  },
  data() {
    return {
      formConfig: [
        {label: '发票号', type: 'dynamicInput', key: 'dynamicInputs'},
        {
          label: '物流公司',
          type: 'select',
          key: 'logisticsCompany',
          options: []
        },
        {label: '物流单号', type: 'input', key: 'logisticsOrderNo'},
      ],
      formData: {
        dynamicInputs: [{}],
        logisticsCompany: '',
        logisticsOrderNo: '',
      },
    }
  },
  components: {
    Form
  },
  computed: {
    _dialogVisible: {
      get() {
        return this.dialogVisible
      },
      set(val) {
        this.$emit('update:dialogVisible', val)
      }
    }
  },
  methods: {
    updateOptions(key, options = []) {
      const item = this.formConfig.find(item => item.key === key)
      if (!item) return
      item.options = options
    },
    addDymicInput() {
      const {formData} = this
      formData.dynamicInputs.push({
        value: '',
        key: Date.now()
      })
      this._dialogVisible = true
    },
    removeDymicInput(dyItem) {
      const {formData} = this
      var index = formData.dynamicInputs.indexOf(dyItem)
      if (index !== -1) {
        formData.dynamicInputs.splice(index, 1)
      }
      this._dialogVisible = true
    },
    editBillingInfo() {
      const { billingData } = this.$attrs
      const {logisticsCompany, logisticsOrderNo} = billingData
      this.resetFormData()
      Object.keys(billingData).forEach((item, index) => {
        if (item.indexOf('invoiceNo') >= 0) {
          this.formData.dynamicInputs.push({
            value: billingData[item],
            key: index
          })
        }
      })
      this.formData.logisticsCompany = logisticsCompany
      this.formData.logisticsOrderNo = logisticsOrderNo
    },
    resetFormData() {
      const { invoiceNosList } = this.$attrs
      this.formData = {
        dynamicInputs: invoiceNosList.length ? [] : [{}],
        logisticsCompany: '',
        logisticsOrderNo: '',
      }
    },
    async sureDialog() {
      const {logisticsCompany, logisticsOrderNo, dynamicInputs} = this.formData
      if (logisticsCompany || logisticsOrderNo) {
        if (!logisticsCompany) {
          this.$message.error('请选择物流公司')
          return
        }
        if (!logisticsOrderNo) {
          this.$message.error('请输入物流单号')
          return
        }
      }
      const invoiceNos = dynamicInputs.map(item => {
        return item.value
      })
      const params = {
        deliverInvoiceId: this.$attrs.billingId,
        invoiceNos,
        logisticsCompany,
        logisticsOrderNo
      }
      const res = await this.$http.factory.editBillingInfo(params)
      if (res.data && res.data.code === '0') {
        this.$parent.getBillingDetail()
        this._dialogVisible = false
        this.$refs.formRef.$refs.formRef.resetFields()
        this.formData.dynamicInputs = [{value: ''}]
      }
    },
  },
  watch: {
    logisticsList(val) {
      if (val) {
        this.updateOptions('logisticsCompany', val)
      }
    }
  }
}
</script>
