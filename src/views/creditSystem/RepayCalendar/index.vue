<template>
    <div class="M_container">
      <div class="D_down">
        <FullCalendar ref="myCalendar" :options="calendarOptions">
          <template v-slot:eventContent="arg">
            <div class="calendar_detail">
              <div style="white-space: break-spaces; color: #3B68F0; margin-bottom: 4px; word">发货单：{{arg.event.extendedProps.dataSource[0].extDeliveryCode}}</div>
              <div style="margin-bottom: 4px; white-space: normal;">{{arg.event.extendedProps.dataSource[0].customerName}}</div>
              <div style="margin-bottom: 4px; white-space: normal;">剩余待还款金额：{{arg.event.extendedProps.dataSource[0].debtAmount}}</div>
              <div style="white-space:normal; width:100%; margin-bottom: 4px">跟进人：{{arg.event.extendedProps.dataSource[0].memberNameList.join('，')}}</div>
              <el-button style="margin-bottom: 20px;" type="text" size="mini" @click.stop="handleClick(arg.event.extendedProps.dataSource)" v-if="arg.event.extendedProps.dataSource && arg.event.extendedProps.dataSource.length > 1">查看更多</el-button>
            </div>
            </template>
        </FullCalendar>
      </div>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import moment from 'moment'
import { getDataByTime } from '../util'

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        // 引入的插件，比如fullcalendar/daygrid，fullcalendar/timegrid引入后才可显示月，周，日
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth', // 默认为那个视图（月：dayGridMonth，周：timeGridWeek，日：timeGridDay）
        events: [],
        firstDay: 1, // 设置一周中显示的第一天是哪天，周日是0，周一是1，类推
        locale: 'zh-cn', // 切换语言，当前为中文
        eventColor: '#3BB2E3', // 全部日历日程背景色
        initialDate: moment().format('YYYY-MM-DD'), // 自定义设置背景颜色时一定要初始化日期时间
        timeGridEventMinHeight: '200', // 设置事件的最小高度
        aspectRatio: 1.65, // 设置日历单元格宽度与高度的比例。
        slotDuration: '00:10:00',
        slotEventOverlap: false,
        eventMaxStack: 1,
        headerToolbar: { // 日历头部按钮位置
          left: '',
          center: 'prevYear,prev title next,nextYear',
          right: ''
        },
        buttonText: {
          today: '今天',
          month: '月',
          week: '周',
          day: '日'
        },
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false // 设置时间为24小时
        },
        moreLinkClassNames: 'moreEvents',
        eventClick: this.handleEventClick,
      },
      queryStartDate: '',
      queryEndDate: ''
      // queryStartDate: moment().format('YYYY-MM-DD 00:00:00'),
      // queryEndDate: moment().format('YYYY-MM-DD 23:59:59'),
    }
  },
  mounted() {
    this.getListData()
  },
  methods: {
    // 点击
    handleClick(dataSource) {
      const date = dataSource?.[0]?.lastDebtDate
      this.$router.push({ name: 'repayMent', query: { date } })
    },
    // 获取列表数据
    async getListData() {
      const data = await this.ajaxStore.credit.calendarDetailList({queryStartDate: this.queryStartDate, queryEndDate: this.queryEndDate})
      const result = getDataByTime(data?.data?.data ?? [])
      this.getEvents(result)
    },
    // 生成title
    getEvents(data) {
      Object.keys(data).forEach(key => {
        this.calendarOptions.events.push({
          start: key,
          end: key,
          date: key,
          dataSource: data[key] ?? []
        })
      })
    },
    /**
     * 点击日历日程事件
     *
     * info: 事件信息
     * event是日程（事件）对象
     * jsEvent是个javascript事件
     * view是当前视图对象。
     */
    handleEventClick(info) {
      console.log(info)
    },

  }
}
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
