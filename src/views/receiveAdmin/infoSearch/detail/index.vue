<template lang="pug">
.page-main
  Content
</template>
<script>
import { provide } from '@vue/composition-api'
import Content from '../../components/content'

export default {
  components: {
    Content,
  },
  setup() {
    // 定义列表类型
    provide('kind', 'see')
  }
}
</script>
