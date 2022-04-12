<template lang="pug">
div
  .org-btn
    el-button(type="primary" @click="dingUserHandle" weblogs-anchor="common-account-ding") 同步钉钉组织架构
  .p-tree(v-loading='loading')
    el-tree(
      id='fixtree'
      ref='tree'
      :data="data"
      :props="defaultProps"
      :default-expanded-keys='expandedKeys'
      highlight-current
      @node-click="handleNodeClick"
      @node-expand='handleNodeExpand'
      @node-collapse='handleNodeCollapse'
      node-key='id'
    )
      span.p-tree-node(slot-scope="{ node, data }")
        .org-tree-left
          span {{ data.departmentName }}
          img(
            v-if="data && data.oaDepartmentId"
            :src="`${$assetsBaseUrl}/common/dingLight.png`"
          )
        .p-edit(v-if="!(data && data.oaDepartmentId)")
          el-tooltip(placement="top" content='删除' v-if='!data.childrens || (data.childrens && !data.childrens.length)')
            el-button.p-link-color(type="text" size="mini" @click.stop="() => remove(node, data)" v-if='node.level !== 1 && permissions["PTN:SUPPLIER:DEPARTMENT:DELETE"]')
              i.p-icon.el-icon-remove-outline
          template(v-if='!data.newNode')
            el-tooltip(placement="top" content='修改')
              el-button.p-link-color(type="text" size="mini" @click.stop="() => edit(node, data)" v-if='node.level !== 1 && permissions["PTN:SUPPLIER:DEPARTMENT:UPDATE"]')
                i.p-icon.el-icon-edit-outline
            el-tooltip(placement="top" content='添加')
              el-button.p-link-color(type="text" size="mini" @click.stop="() => append(data)" v-if='permissions["PTN:SUPPLIER:DEPARTMENT:CREATE"]')
                i.p-icon.el-icon-circle-plus-outline
            el-tooltip(placement="top" content='管理者')
                el-button.p-link-color(type="text" size="mini" @click.stop="manager(data)" v-if='node.level !== 1')
                  i.p-icon.el-icon-user
    el-dialog(
      :title='dialogNode.title'
      :visible.sync='dialogNode.visible'
      :close-on-click-modal='false'
      width='440px'
      :before-close='handleNodeChange'
    )
      div.p-warning(v-if='dialogNode.status === "delete"')
        i.el-icon-warning
        span 删除此部门后，该部门下的客户将被释放为无部门所属关系，该部门关联账号的权限将被重置为可浏览全部客户数据的权限。请确认是否删除？
      el-form.p-form(
        label-width='100px'
        ref='dialogNodeForm'
        :rules='dialogNode.rules'
        :model='dialogNode.form'
      )
        el-form-item(v-if='dialogNode.status === "manager"' label='部门人员' prop='supervisorId')
          select-account-list(
            :supervisorId='String(dialogNode.form.supervisorId)'
            :departmentId='String(dialogNode.form.id)'
            @change='changeSelectAccountList'
          )
        el-form-item(v-else label='部门名称' prop='name' required)
          el-input(v-model='dialogNode.form.name' maxlength='20' :disabled='dialogNode.status === "delete"' clearable)
      .p-dialog-footer(slot="footer")
        el-button(@click='closeDialog') 取 消
        el-button(type='primary' @click="handleNodeChangeConfirm" :loading='dialogNode.loading') 确 定
</template>

<script>
import { mapState } from 'vuex'
import SelectAccountList from '@/components/SelectAccountList'
import ajaxStore from '@/apis'
import { weblogsDom } from '@/utils/qjd/weblogs'
export default {
  components: { SelectAccountList },
  data() {
    return {
      loading: false,
      data: [],
      currentKey: null,
      expandedKeys: [],
      defaultProps: {
        children: 'childrens',
        label: 'departmentName',
        disabled: 'disabled'
      },
      dialogNode: {
        loading: false,
        visible: false,
        title: '添加部门',
        status: 'add',
        form: {
          name: '',
          parentId: -1,
          id: '', // 当前id
          orderWeight: 0, // 权重排序 暂未使用
          supervisorId: '', // 管理者id
        },
        rules: {
          name: [
            { required: true, message: '请输入部门名称', trigger: ['change', 'blur'] },
          ],
        }
      }
    }
  },
  computed: {
    ...mapState(['permissions'])
  },
  methods: {
    async dingUserHandle() {
      try {
        const { setDingUser, getOrganTree } = ajaxStore.common.account
        const res = await setDingUser()
        const { data: { code } } = res
        if (code === '0') {
          this.$message.success('同步成功')
          getOrganTree()
        }
      } catch (error) {
        console.log(`error: ${error}`)
      }
    },
    handleNodeChange () {
      this.dialogNode.visible = !this.dialogNode.visible
    },
    addExpandedKeys (id) {
      if (this.expandedKeys.indexOf(id) === -1) {
        this.expandedKeys.push(id)
      }
    },
    removeExpandedKeys (id) {
      this.expandedKeys.forEach((item, index) => {
        if (item === id) {
          this.expandedKeys.splice(index, 1)
        }
      })
    },
    handleNodeExpand (data) {
      this.addExpandedKeys(data.id)
    },
    handleNodeCollapse(data) {
      const idList = [data.id, ...this.getTreeNodeId(data.childrens)]
      idList.forEach(item => {
        this.removeExpandedKeys(item)
      })
    },
    changeSelectAccountList(value) {
      this.dialogNode.form.supervisorId = value || null
    },
    getTreeNodeId (data) {
      const idList = []
      if (data && data.length) {
        data.forEach((item, index) => {
          idList.push(item.id)
          if (item.childrens && item.childrens.length) {
            this.getTreeNodeId(item.childrens)
          }
        })
      }
      return idList
    },
    handleNodeClick (data) {
      if (data.disabled) { // 样式
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.currentKey)
        })
        return
      }
      this.currentKey = data.id
      this.$emit('clickNode', data.id)
    },
    append(data) {
      this.dialogNode.visible = true
      this.dialogNode.title = '添加部门'
      this.dialogNode.status = 'add'
      this.dialogNode.form.name = ''
      this.dialogNode.form.parentId = data.id
      this.$refs.dialogNodeForm && this.$refs.dialogNodeForm.resetFields()
    },
    remove(node, data) {
      this.dialogNode.visible = true
      this.dialogNode.title = '删除部门'
      this.dialogNode.status = 'delete'
      this.dialogNode.form.name = data.departmentName
      this.dialogNode.form.id = data.id

      if (node.parent.level === 1) { // 首层公司名
        this.currentKey = null // 初始化
      } else {
        this.currentKey = node.parent.data.id
      }
    },
    edit(node, data) {
      this.dialogNode.visible = true
      this.dialogNode.title = '修改部门名称'
      this.dialogNode.status = 'edit'
      this.dialogNode.form.name = data.departmentName
      this.dialogNode.form.id = data.id
      this.dialogNode.form.parentId = data.parentDepartmentId

      this.currentKey = data.id
    },
    manager(data) {
      this.dialogNode.visible = true
      this.dialogNode.title = '设置管理者'
      this.dialogNode.status = 'manager'
      this.dialogNode.form.id = data.id
      this.dialogNode.form.supervisorId = (data.supervisorIdList && data.supervisorIdList[0]) || null
      // this.dialogNode.form.parentId = data.parentDepartmentId

      this.currentKey = data.id
    },
    handleTreeData (data) {
      if (data && data.length) {
        data.forEach((item, index) => {
          this.$set(item, 'isEdit', false)
          if (item?.supervisorIdList?.length) {
            item.supervisorIdList = item.supervisorIdList.map(id => String(id))
          }
          if (item.childrens && item.childrens.length) {
            this.handleTreeData(item.childrens)
          }
        })
      }
    },
    handleNodeChangeConfirm () {
      this.$refs.dialogNodeForm && this.$refs.dialogNodeForm.validate(async valid => {
        if (valid) {
          let confirm = false
          let message = '添加成功!'
          let target = '组织架构管理-'
          switch (this.dialogNode.status) {
            case 'add':
              confirm = await this.addPorgTree()
              message = '添加成功!'
              target += '添加-确定'
              break
            case 'delete':
              confirm = await this.deletePorgTree()
              message = '删除成功!'
              target += '删除'
              break
            case 'edit':
              confirm = await this.editPorgTree()
              message = '修改成功!'
              target += '修改'
              break
            case 'manager':
              confirm = await this.bindManager()
              message = '设置成功!'
              target += '管理者-确定'
              break
          }
          weblogsDom(target)
          if (confirm) {
            this.$message({
              type: 'success',
              message: message
            })
            this.handleNodeChange()
            this.getPorgTree()
          }
        }
      })
    },
    closeDialog() {
      this.dialogNode.visible = false
      let target = '组织架构管理-'
      switch (this.dialogNode.status) {
        case 'add':
          target += '添加-取消'
          break
        case 'manager':
          target += '管理者-取消'
          break
      }
      weblogsDom(target)
    },
    async getPorgTree () {
      this.loading = true
      const res = await ajaxStore.common.account.getOrganTree()
      this.loading = false
      if (res.data && res.data.code === '0') {
        const data = res.data.data
        this.data = [{
          id: '',
          departmentName: this.$store.state.userInfo.company,
          childrens: data
        }]
        this.handleTreeData(this.data)
        // 展开
        if (!this.expandedKeys.length) {
          this.$nextTick(() => {
            this.expandedKeys.push(this.data[0].id)
          })
        }

        if (this.currentKey) { // 添加时
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.currentKey)
          })
          this.$emit('clickNode', this.currentKey)
        } else {
          this.data.forEach((item, index) => {
            this.$set(item, 'disabled', true)
            item.childrens && item.childrens.forEach((item2, index2) => {
              if (index2 === 0) {
                this.handleNodeClick(item2)
                this.$nextTick(() => { // 默认高亮选中节点
                  this.$refs.tree.setCurrentKey(item2.id)
                  this.currentKey = item2.id
                })
              }
            })
          })
        }
      }
    },
    async addPorgTree () {
      this.dialogNode.loading = true
      const data = {
        departmentName: this.dialogNode.form.name,
        parentDepartmentId: this.dialogNode.form.parentId
      }
      if (!data.parentDepartmentId) delete data.parentDepartmentId
      const res = await ajaxStore.common.account.createOrgan(data)
      this.dialogNode.loading = false
      if (res.data && res.data.code === '0') {
        this.currentKey = res.data.data
        this.addExpandedKeys(this.dialogNode.form.parentId)
        return true
      }
    },
    async deletePorgTree () {
      this.dialogNode.loading = true
      const res = await ajaxStore.common.account.delOrgan({ id: this.dialogNode.form.id })
      this.dialogNode.loading = false
      if (res.data && res.data.code === '0') {
        this.removeExpandedKeys(this.dialogNode.form.id)
        return true
      }
    },
    async editPorgTree () {
      this.dialogNode.loading = true
      const data = {
        departmentName: this.dialogNode.form.name,
        parentDepartmentId: this.dialogNode.form.parentId,
        id: this.dialogNode.form.id
      }
      if (!data.parentDepartmentId) delete data.parentDepartmentId
      const res = await ajaxStore.common.account.updateOrgan(data)
      this.dialogNode.loading = false
      if (res.data && res.data.code === '0') {
        return true
      }
    },
    async bindManager() {
      this.dialogNode.loading = true
      const data = {
        departmentId: this.dialogNode.form.id,
        memberId: this.dialogNode.form.supervisorId ? [this.dialogNode.form.supervisorId] : [],
      }
      const res = await ajaxStore.common.account.bindManager(data)
      this.dialogNode.loading = false
      if (res.data && res.data.code === '0') {
        return true
      }
    },
  },
  mounted() {
    this.getPorgTree()
  }
}
</script>

<style lang="stylus" scoped>
link-color = #4a71f0

#fixtree
  display inline-block
.p-tree-node
  flex 1
  display flex
  align-items center
  justify-content space-between
  font-size 14px
  padding-right 8px
.p-warning
  margin-top 20px
  display flex
  i
    margin-right 10px
    font-size 20px
.p-form
  margin-top 20px
.p-icon
  font-size 20px

.p-edit
  margin-left 5px

/deep/ .el-form-item__content
  width 260px
  // height 24px
/deep/ .el-tree.el-tree--highlight-current
  min-width 100%
</style>
<style lang="stylus">
.p-edit .el-button+.el-button
  margin-left 5px

.p-tree .el-tree.el-tree--highlight-current > .el-tree-node > .el-tree-node__content
  background-color  #fff
  cursor default
.p-tree .el-tree.el-tree--highlight-current > .el-tree-node .el-tree-node__content
  height 32px
.org-btn
  display flex
  justify-content flex-end
  padding-bottom 20px
.org-tree-left
  display flex
  align-items center
  span
    margin-right 6px
  img
    width 16px
    height 16px
</style>
