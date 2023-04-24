<template>
  <div ref="calendar"></div>
</template>

<script setup>
import { Calendar } from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'

const events = [
  {
    title: 'Event 1',
    start: '2023-04-20T10:00:00',
    end: '2023-04-20T12:00:00',
    classNames: ['event-1']
  },
  {
    title: 'Event 2',
    start: '2023-04-21T14:00:00',
    end: '2023-04-21T16:00:00',
    classNames: ['event-2']
  }
]

const calendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  selectable: true,
  select: (info) => {
    console.log(info.startStr, info.endStr) // 取得選取的開始時間和結束時間
    // 在選取的日期上顯示事件
    this.$refs.calendar.getApi().addEvent({
      title: 'New Event',
      start: info.startStr,
      end: info.endStr
    })
  },
  events
}
</script>

<style>
  .event-1 {
    background-color: red;
  }
  .event-2 {
    background-color: blue;
  }
</style>
