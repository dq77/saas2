<template lang="pug">
.page-main
  div(style="background: #fff")
    div(style="padding: 20px; min-height: 400px;")
      TeachList(:dataSource="dataSource")
</template>
<script>
import { ref } from '@vue/composition-api'
import TeachList from '../components/teachList.vue'
import { teachDatas } from './config'

export default {
  components: {
    TeachList
  },
  setup() {
    const dataSource = ref(teachDatas)

    return {
      dataSource
    }
  },
}
</script>
