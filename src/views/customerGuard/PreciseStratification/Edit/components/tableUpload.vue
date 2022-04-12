<template lang="pug">
.p-file-right
  .file-btn.gray
    el-upload(
      :action='toPrefixUrl("/partner/common/file/upload")'
      :show-file-list='false'
      multiple
      :limit="1"
      :file-list="emptyList || []"
      :on-success='(res, file) => handleChange(res, file)'
      accept='.pdf,.jpg,.png,.JPG,.PNG'
      :props="{url: 'fileKey'}"
    )
      el-button(size="small" type="text") {{row.fileKey ? '重新上传' : '点击上传'}}
  .file-edit(v-if='row.fileKey')
    .file-btn
      a(:href='`${baseUrl}/partner/common/file/download?fileKey=${row.fileKey}`', target='_blank')
        p 房产附件
    .file-btn
      el-button.red(size="small" type="text" @click='handleDelete') 删除
</template>
<script>
import { reactive, toRefs, watch } from '@vue/composition-api'
import { toPrefixUrl } from '@/utils/util'
import { baseUrl } from '@/utils/config'

export default {
  props: {
    row: {
      type: Object,
      defaultValue: () => {
        return {}
      }
    }
  },
  components: {
  },
  setup(props, {emit}) {
    const state = reactive({
      emptyList: [],
    })
    const handleChange = (res, file) => {
      console.log(res, file)
      state.emptyList = []
      if (res.code === '0') {
        emit('changeTableFile', res.data)
      }
    }
    const handleDelete = () => {
      emit('deleteTableFile')
    }
    const init = (row) => {
    }
    watch(() => props.row, (val, preVal) => {
      init(val)
    }, { immediate: true })
    return {
      baseUrl,
      toPrefixUrl,
      handleChange,
      handleDelete,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-file-right
  display flex
  align-items center
  .file-edit
    display flex
    align-items center
  .file-btn
    margin-right 10px
  a
    p
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      width 60px
      line-height 24px
.red
  color #f7564e
</style>
