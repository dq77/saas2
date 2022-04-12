<template lang="pug">
.page-main
  list-page(
    ref='listPage'
    :config='listPageConfig'
    @selectionChange='selectionChange'
  )
    template(slot='vipLevel' slot-scope='{row}')
      div {{levelEnum[row.vipLevel] || '- -'}}
    template(slot='businessNameList' slot-scope='{row}')
      .p-member-text-wrap
        el-tooltip(placement='top' content='分配业务员')
          i.iconfont.iconfenpeiyewuyuan.p-icon-assign(@click='clickAssign(row, "1")')
        el-tooltip(placement='top')
          span(slot='content') {{memberToStr(row.businessNameList)}}
          .u-member-text
            span {{memberToStr(row.businessNameList)}}
    template(slot='customerServiceNameList' slot-scope='{row}')
      .p-member-text-wrap
        el-tooltip(placement='top' content='分配客服')
          i.iconfont.iconfenpeiyewuyuan.p-icon-assign(@click='clickAssign(row, "2")')
        el-tooltip(placement='top')
          span(slot='content') {{memberToStr(row.customerServiceNameList)}}
          .u-member-text
            span {{memberToStr(row.customerServiceNameList)}}
    template(slot='operate' slot-scope='{row}')
      // 厂服改版3.0遗漏客户管理的权限项，这里先注释，不判断权限
      //- el-button(type='text' @click='clickToDetail(row, "edit")' v-if='permissions["PTN:SUPPLIER:MEMBER:QUERY"] && (permissions["PTN:SUPPLIER:MEMBER:UPDATE"] || permissions["PTN:SUPPLIER:MEMBER:DELETE"])') 编辑
      //- el-button(type='text' @click='clickToDetail(row, "view")' v-if='permissions["PTN:SUPPLIER:MEMBER:QUERY"]') 查看
      el-button(type='text' @click='clickToEdit(row)') 编辑
      el-button(type='text' @click='clickToDetail(row)' weblogs-anchor="common-customer-look") 查看
      //- router-link.p-margin10(:to='{ name: "enterpriseImage", query: { companyName: row.customerName, creditCode: row.socialCode} }' v-if='permissions["PTN:SUPPLIER:CUSTOMER:PORTRAIT"]' weblogs-anchor="common-customer-portrait") 客户画像
      //- el-button(type='text' @click='clickToValueStratification(row)' v-if='permissions["PTN:SUPPLIER:VALUE:STRATIFICATION"]' weblogs-anchor="common-customer-stratification") 价值分层
  //- 业务员、客服 分配
  el-dialog(
    width='400px'
    :title='`${dialogAssign.typeStr}分配`'
    :visible.sync='dialogAssign.visible'
  )
    el-form(label-width='90px')
      el-form-item(label='公司名称：') {{dialogAssign.companyName}}
      el-form-item(
        :label='`${dialogAssign.typeStr}：`'
      )
        el-select.width-100(
          multiple
          v-model='dialogAssign.memberId'
          filterable
        )
          el-option(
            v-for='option in memberList'
            :key='option.id'
            :label='option.memberName'
            :value='option.id'
          )
    .dialog-footer(slot='footer')
      el-button(@click='clickCancelAssign') 取消
      el-button(
        type='primary'
        :loading='dialogAssign.loading'
        @click='clickSureAssign'
      ) 确定
  DialogAddToValueStratification(ref='toValueStratification' :info='selectedValueStratification')
</template>

<script>
import { mapState } from 'vuex'
import ListPage from '@/components/ListPage'
import { customerCreateTypeMap, customerStatusMap, customerTypeMap } from '@/utils/enums'
import ajaxStore from '@/apis'
import DialogAddToValueStratification from './DialogAddToValueStratification'

export default {
  components: { ListPage, DialogAddToValueStratification },
  data () {
    return {
      memberList: [], // 员工列表
      dialogAssign: {
        visible: false,
        loading: false,
        companyName: '',
        customerId: '',
        type: '',
        typeStr: '',
        memberId: [],
      },
      // selection
      multipleSelection: [],
      buttonDisabled: true,
      selectedValueStratification: {}
    }
  },
  computed: {
    listPageConfig () {
      const getCustomerList = ajaxStore.common.customer.getCustomerList
      const headButtonGroup = [
        {
          type: 'text',
          text: '新建客户',
          method: this.clickToCreate,
          weblogs: 'common-customer-create'
        },
        {
          type: 'text',
          text: '批量导入',
          method: this.clickToImport
        }
      ]
      if (this.permissions['PTN:SUPPLIER:WATCH:LIST']) {
        headButtonGroup[2] = {
          type: 'text',
          text: '风险监控',
          disabled: this.buttonDisabled,
          method: this.clickAddToRiskManagement
        }
      }

      return {
        // 厂服改版3.0遗漏客户管理的权限项，这里先注释，不判断权限
        // headButtonGroup: this.permissions['PTN:SUPPLIER:MEMBER:CREATE'] && [
        headButtonGroup: headButtonGroup,
        searchParams: [
          [
            {
              type: 'text',
              formItemName: 'customerName',
              label: '客户名称',
              placeholder: '请输入客户名称',
              col: 6,
            },
            {
              type: 'text',
              formItemName: 'extCustomCode',
              label: '外部编号',
              placeholder: '请输入外部编号',
              col: 6,
            },
            {
              type: 'text',
              formItemName: 'socialCode',
              label: '社会信用代码',
              placeholder: '请输入社会信用代码',
              col: 6,
            },
            {
              type: 'select',
              formItemName: 'customerType',
              label: '客户类型',
              placeholder: '请选择客户类型',
              col: 6,
              enum: customerTypeMap
            },
          ],
          [
            {
              type: 'daterange',
              label: '创建时间',
              formItemName_start: 'queryStartDate',
              formItemName_end: 'queryEndDate',
              placeholder_start: '请选择起始日',
              placeholder_end: '请选择截止日',
              col: 6
            }
          ]
        ],
        tableHeader: [
          { name: '客户名称', property: 'customerName', minWidth: 200, formatter: (v) => v || '- -' },
          { name: '社会信用代码', property: 'socialCode', minWidth: 180, formatter: (v) => v || '- -' },
          { name: '联系邮箱', property: 'contactEmail', minWidth: 150, formatter: (v) => v || '- -' },
          { name: '联系电话', property: 'contactPhone', minWidth: 130, formatter: (v) => v || '- -' },
          { name: '等级（外部）', tdSlotName: 'vipLevel', minWidth: 100 },
          { name: '客户编号（外部）', property: 'extCustomCode', minWidth: 120, formatter: (v) => v || '- -' },
          { name: '法人姓名', property: 'legalPersonName', minWidth: 100, formatter: (v) => v || '- -' },
          { name: '法人/个人身份证号', property: 'legalPersonCode', minWidth: 170, formatter: (v) => v ? this.encrypIdCard(v) : '- -' },
          { name: '法人手机号', property: 'legalPersonMobile', minWidth: 130, formatter: (v) => v || '- -' },
          { name: '业务员', property: 'businessNameList', tdSlotName: 'businessNameList', minWidth: 130, maxWidth: 200, formatter: (v) => v || '- -' },
          { name: '客服', property: 'customerServiceNameList', tdSlotName: 'customerServiceNameList', minWidth: 100, formatter: (v) => v || '- -' },
          { name: '备注', property: 'remark', minWidth: 100, formatter: (v) => v || '- -' },
          { name: '创建方式', property: 'createType', minWidth: 100, formatter: (v) => customerCreateTypeMap[v] || '- -' },
          { name: '创建时间', property: 'createdTime', minWidth: 160, formatter: (v) => v || '- -' },
          { name: '状态', property: 'status', minWidth: 80, formatter: (v) => customerStatusMap[v] || '- -' },
          { name: '客户类型', property: 'customerType', minWidth: 80, formatter: (v) => customerTypeMap[v] || '- -' },
          { name: '操作', property: 'operate', tdSlotName: 'operate', align: 'center', fixed: 'right', minWidth: 120 },
        ],
        getTableList: {
          type: 'component',
          fn: getCustomerList
        },
        hasSelection: (this.permissions['PTN:SUPPLIER:WATCH:LIST'] && true)
      }
    },
    ...mapState(['permissions']),
    levelEnum() {
      const arr = this.$store.state.customer.levelEnum || []
      const res = {}
      arr.forEach(item => (res[item.dictCode] = item.dictName))
      return res
    }
  },
  methods: {
    clickToCreate() {
      this.$router.push({ name: 'customerCreate' })
    },
    clickToImport() {
      this.$router.push({ name: 'customerImport'})
    },
    clickToEdit(row) {
      this.$router.push({
        name: 'customerEdit',
        query: { customerId: row.id, customerType: row.customerType }
      })
    },
    clickToDetail(row) {
      this.$router.push({
        name: 'customerDetail',
        query: { customerId: row.id, customerType: row.customerType }
      })
    },
    clickToValueStratification(row) {
      this.selectedValueStratification = row
      this.getSincerityList(row.customerName)
    },
    selectionChange(val) {
      this.multipleSelection = val
      if (val && val.length > 0) {
        this.buttonDisabled = false
      } else {
        this.buttonDisabled = true
      }
    },
    // 添加风险管理-关注列表
    clickAddToRiskManagement() {
      this.$confirm('确定要添加风险监控吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            try {
              instance.confirmButtonLoading = true
              const list = this.multipleSelection && this.multipleSelection.map(item => {
                return { companyName: item.customerName }
              })
              const res = await ajaxStore.risk.batchSubscribe(list)
              if (res.data && res.data.code === '0') {
                this.$message.success('添加成功')
              }
            } catch (error) {
              console.error(error)
            }
            this.$refs.listPage && this.$refs.listPage.clearSelection()
            this.multipleSelection = []
            instance.confirmButtonLoading = false
          }
          done()
        }
      })
    },
    // 分配业务员、客服
    clickAssign(row, type) {
      this.dialogAssign.visible = true
      this.dialogAssign.loading = false
      this.dialogAssign.companyName = row.customerName
      this.dialogAssign.customerId = row.id
      this.dialogAssign.type = type
      this.dialogAssign.typeStr = type === '1' ? '业务员' : '客服'
      this.dialogAssign.memberId = type === '1' ? this.memberToFilter(row.businessNameList) : this.memberToFilter(row.customerServiceNameList)
    },
    clickCancelAssign() {
      this.dialogAssign.visible = false
      this.dialogAssign.loading = false
    },
    async clickSureAssign() {
      this.dialogAssign.loading = true
      const { customerId, memberId, type } = this.dialogAssign

      const res = await ajaxStore.common.customer.bindCustomer({ customerId, memberId, type })
      this.dialogAssign.loading = false
      if (res.data && res.data.code === '0') {
        this.dialogAssign.visible = false
        this.$message.success('分配成功')
        this.$refs.listPage.getTableList()
      }
    },
    encrypIdCard (v) {
      if (v && v.length === 18) {
        const arr = v.split('')
        arr.splice(6, 10, '**********')
        return arr.join('')
      }
      return v
    },
    // 业务员、客服 数组 中文显示
    memberToStr(list) {
      if (list && list.length > 0) {
        return list.map(item => item.memberName).join('、')
      }
      return ''
    },
    // 业务员、客服 提取id列表
    memberToFilter(list) {
      if (list && list.length > 0) {
        return list.map(item => item.id)
      }
      return []
    },
    async getMemberList() {
      const res = await ajaxStore.common.customer.getSubAccountList({ fileFlag: '1', pageNo: '1', pageSize: 9999 })
      if (res.data && res.data.code === '0') {
        this.memberList = res.data.data.pagedRecords
      }
    },
    // 校验是否添加过价值分层
    async getSincerityList(name) {
      const params = {
        pageNo: 1,
        pageSize: 10,
        corpName: name
      }
      const res = await ajaxStore.risk.getPageCustomized(params)
      if (res.data && res.data.code === '0') {
        const data = res.data.data
        if (data.totalCount > 0) {
          this.$message.info('当前企业已添加至价值分层。')
        } else {
          this.$refs.toValueStratification.visible = true
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('customer/getLevelEnum')
    this.getMemberList()
  }
}
</script>

<style lang="stylus" scoped>
.p-icon-assign
  font-size 16px
  vertical-align middle
  margin-right 6px
  cursor pointer
.p-member-text-wrap
  display flex
  .u-member-text
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
.p-margin10
  margin 0 10px
</style>
