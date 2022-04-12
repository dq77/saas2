<template lang="pug">
.file-form
  el-form(
    ref='fileListFormRef'
    :model='formData'
  )
    el-form-item.file-form__item(
      prop='selfCompany'
      label='被评估主体企业资料上传'
      :rules='fileListRules'
    )
      // .file-form__tips 仟金顶评估标准资料清单
      .file-form__upload
        UploadItem(@change='setFileList' type='selfCompany' :companyInfo='evaluateObject' accept='.zip,.rar' :max='1024')
    el-form-item.file-form__item.related(
      prop='relatedCompany'
      label='关联企业资料上传'
      :rules='fileListRules'
      v-if='formData.relatedCompany.length'
    )
      // .file-form__tips 仟金顶评估标准资料清单
      .file-form__upload
        UploadItem.upload-item(@change='setFileList' type='relatedCompany' v-for='(item, key) in formData.relatedCompany' :key='key' :id='item.id' :companyInfo='item' accept='.zip,.rar' :max='1024')
</template>

<script>
import { reactive, toRefs, watch } from '@vue/composition-api'
import { fileListRules } from './config'
import UploadItem from './uploadItem'
export default {
  props: {
    evaluateObject: {
      type: Object,
      default: () => {}
    },
    relevantList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    UploadItem
  },
  setup(props, { emit }) {
    const state = reactive({
      formData: {
        selfCompany: [],
        relatedCompany: []
      }
    })

    const setFileList = ({type, fileList, id}) => {
      if (id) {
        state.formData[type][id] = fileList
      } else {
        state.formData[type] = fileList
      }
      const data = []
      const { id: companyId, corporationName, uniformCreditCode } = props.evaluateObject
      data.push({
        id: companyId,
        corporationName,
        uniformCreditCode,
        partyType: 'EVALUATE_OBJECT',
        fileList: state.formData.selfCompany
      })
      const { relatedCompany } = state.formData
      for (const key in props.relevantList) {
        if (relatedCompany[props.relevantList[key].id]) {
          const { id: companyId, corporationName, uniformCreditCode } = props.relevantList[key]
          data.push({
            id: companyId,
            corporationName,
            uniformCreditCode,
            partyType: 'RELEVANT',
            fileList: relatedCompany[props.relevantList[key].id]
          })
        }
      }
      emit('change', data)
    }

    watch(
      () => props.relevantList,
      (value) => {
        state.formData.relatedCompany = value
        for (const key in value) {
          state.formData.relatedCompany[value[key].id] = value[key].fileList
        }
      }
    )

    watch(
      () => props.evaluateObject,
      (value) => {
        state.formData.selfCompany = value.fileList
      }
    )

    return {
      setFileList,
      fileListRules,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.file-form
  &__item
    position relative
  &__tips
    position absolute
    top 0
    left 160px
    color #848484
    cursor pointer
    text-decoration underline
  &__item.related
    .file-form__tips
      left 128px
  &__upload
    margin 40px 0 0 10px
    display flex
    flex-wrap wrap
    .upload-item
      margin 0 20px 20px 0
</style>
