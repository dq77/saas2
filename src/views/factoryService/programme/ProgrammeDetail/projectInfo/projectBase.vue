<template lang="pug">
.p-detail-card(v-loading='loading')
  BlueTable(:source='result' :columns='projectBaseColumns' :title='tableTitle' width='50%')
</template>

<script>
import useProjectBase from '../hooks/useProjectBase'
import BlueTable from '../components/blueTable'
import { watch, inject } from '@vue/composition-api'
import { projectBaseColumns } from '../config'
export default {

  components: { BlueTable },

  setup(props, { root }) {
    const projectInfo = inject('projectInfo')
    const { projectId } = projectInfo.value

    const { loading, result, tableTitle, doResult } = useProjectBase()

    if (projectId) {
      doResult({ id: projectId })
    }

    watch(
      () => projectInfo.value.projectId,
      (value) => {
        if (value) {
          doResult({ id: value })
        }
      }
    )

    return {
      loading,
      result,
      tableTitle,
      projectBaseColumns
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
