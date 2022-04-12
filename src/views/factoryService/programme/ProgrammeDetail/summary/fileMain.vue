<template lang="pug">
.p-file-main
  .p-file-item(v-for='item in fileList')
    img.p-img-item(:src='getFileUrl(item.fileKey)' v-if='/jpg|jpeg|png/.test(item.name.split(".")[1])')
    .p-file-item-icon(:src='getFileUrl(item.fileKey)' v-else)
    .p-file-name-main
      .p-file-name 文件名：{{item.name}}
      .p-file-download(@click='download(item)')
</template>
<script>
import { toPrefixUrl } from '@/utils/util'
export default {
  props: {
    fileList: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props, { emit }) {
    const getFileUrl = (fileKey) => {
      return toPrefixUrl(`/partner/common/file/download?fileKey=${fileKey}`)
    }
    const download = (file) => {
      window.open(getFileUrl(file.fileKey))
    }
    return {
      getFileUrl,
      download
    }
  }

}
</script>
<style lang="stylus" scoped>
.p-file-main
  margin-bottom 50px
  display flex
  flex-wrap wrap
.p-file-item
  margin-right 25px
  margin-bottom 25px
.p-img-item
  display block
  width 300px
  height 300px
  border 1px solid #EDEDED
.p-file-item-icon
  border 1px solid #EDEDED
  display block
  background url('//cdn.qjdchina.com/static-online/saas/factoryService/programme/file.svg') 50% 50% no-repeat
  background-size 50%
  width 300px
  height 300px
.p-file-name
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  width 250px
  height 30px
  line-height 30px
.p-file-name-main
  display flex
  margin-top 10px
  justify-content space-between
.p-file-download
  background url('//cdn.qjdchina.com/static-online/saas/factoryService/programme/download.svg') no-repeat
  background-size 100%
  width 20px
  height 20px
  cursor pointer
  margin-left 20px
</style>
