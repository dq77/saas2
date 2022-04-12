<template lang='pug'>
table.table.table-layout-main.parse-base
  tr(v-for='(row, index) in config' :key='index')
    template(v-for='(item, itemIndex) in row')
      th {{ item.label }}
      template(v-if='item.type === "file"')
        td
          //- /fs/file/download   /saas-ofc/org/goodsAlbum/getAttachment
          a(:href='toPrefixUrl(`/partner/common/file/download?fileKey=${data.fileKey}`)' target="_blank") {{ (data && data[item.key]) || '- -' }}
      template(v-else-if='item.type === "date"')
        td {{ data[item.key] ? moment(data[item.key]).format('YYYY-MM-DD') : '- -' }}
      template(v-else)
        td {{ (data && data[item.key]) || '- -' }}
</template>

<script>
// import { reactive, ref, toRefs } from '@vue/composition-api'
import { toPrefixUrl, toDateStr } from '@/utils/util'
import moment from 'moment'
export default {
  props: {
    config: {
      type: Array,
      defaultValue: () => {
        return []
      }
    },
    data: {
      type: Object,
      defaultValue: () => {
        return {}
      }
    }
  },
  setup (props) {
    return {
      moment,
      toPrefixUrl,
      toDateStr
    }
  }
}
</script>

<style lang='stylus' scoped>
.parse-base
  th
    width 10%
  td
    width 13.33%
</style>
