<template>
  <q-page>
    <q-table
      id="table"
      title="打卡歷史紀錄"
      :rows="leaves"
      :columns="columns"
      row-key="name"
      selection="multiple"
      v-model:selected="selected"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-startDate="props">
        <q-td :props="props">
          <q-input filled v-model="time" mask="time" :rules="['time']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="time">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
        </q-td>
      </template>

      <template v-slot:body-cell-endDate="props">
        <q-td :props="props">
          <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="time">
                <div class="row items-center justify-start">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
          <q-input filled v-model="time" mask="time" :rules="['time']">

      </q-input>
        </q-td>
      </template>
    </q-table>
    <div class="tableBtn">
      <div class="row justify-end">
        <q-btn
          v-if="selected[0]"
          icon="edit_note"
          color="info"
          label="編輯"
          @click="UserEdit = true"
        />
        <q-btn
          v-if="selected[0]"
          icon="delete"
          color="red"
          label="刪除"
          @click="delete1"
        ></q-btn>
      </div>
      <div class="row justify-end q-ma-lg">
        <q-btn
          icon="upload_file"
          color="green"
          label="匯出excel"
          @click="exportToExcel"
        />
      </div>
    </div>
    <div class="q-pa-md">
      <FullCalendar/>
    </div>
    <!-- -------------------------------- -->
    <q-dialog v-model="UserEdit" persistent>
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">會員id</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input outline v-model="selected[0].id" readonly />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">姓名</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input outline type="text" v-model="selected[0].name" />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">帳號</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input outline type="text" v-model="selected[0].account" />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">密碼</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input outline type="password" v-model="selected[0].password" />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">手機</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input outline type="text" v-model="selected[0].phone" />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">角色:管理員:1 使用者:0</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input outline type="text" v-model="selected[0].role" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="更改" v-close-popup @click="edit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- ------------------------------- -->
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import ExcelJS from 'exceljs'
import FullCalendar from 'src/components/FullCalendar.vue'
// const leaves = reactive([])
const selected = ref([])
const filter = ref('')
const UserEdit = ref(false)
const time = ref('')
// -----------
const columns = [
  {
    name: 'id',
    field: 'id',
    label: '工號'
  },
  {
    name: 'name',
    field: 'name',
    label: '姓名',
    align: 'center'
  },

  {
    name: 'Date',
    field: 'Date',
    label: '日期'
  },
  {
    name: 'startTime',
    field: 'startTime',
    label: '上班打卡時間'
  },
  {
    name: 'endTime',
    field: 'endTime',
    label: '下班打卡時間'
  },
  {
    name: 'startDate',
    field: 'startDate',
    label: '上班時間',
    editable: true
  },
  {
    name: 'endDate',
    field: 'endDate',
    label: '下班時間',
    editable: true
  },
  {
    name: 'state',
    field: 'state',
    label: '審核結果',
    sortable: true
  }
]

const leaves = [
  {
    id: '123',
    name: '1234',
    Date: new Date().toLocaleDateString(),
    startTime:
      new Date()
        .toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
        .split(':')[0] +
      ':' +
      new Date()
        .toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
        .split(':')[1],
    endTime:
      new Date()
        .toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
        .split(':')[0] +
      ':' +
      new Date()
        .toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
        .split(':')[1],
    startDate: '',
    endDate: '',
    state: '已審核'
  },
  {
    id: '4526',
    name: '145623',
    Date: new Date().toLocaleDateString(),
    startTime:
      new Date()
        .toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
        .split(':')[0] +
      ':' +
      new Date()
        .toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
        .split(':')[1],
    endTime:
      new Date()
        .toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
        .split(':')[0] +
      ':' +
      new Date()
        .toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
        .split(':')[1],
    startDate: '',
    endDate: '',
    state: '已審核'
  }
]

const exportToExcel = () => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('假單歷史紀錄')

  // Define the table headers
  const headers = columns.map((column) => column.label)
  worksheet.addRow(headers)

  // Add the table data
  leaves.forEach((leave) => {
    worksheet.addRow([
      leave.name,
      leave.leaveType,
      leave.startDate,
      leave.endDate,
      leave.state
    ])
  })
  // Set column widths
  worksheet.columns.forEach((column) => {
    column.width = 15
  })

  // Generate the Excel file
  workbook.xlsx.writeBuffer().then((buffer) => {
    const today = new Date()
    const dateString =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      today.getDate().toString().padStart(2, '0')
    const fileName = `history_${dateString}.xlsx`
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  })
}
</script>
<style lang="scss">
.q-card {
  width: 500px;
  margin: auto;
}
#table {
  width: 80%;
  margin: auto;
  margin-top: 32px;
}
.tableBtn {
  width: 80%;
  margin: auto;
  margin-top: 32px;
}
</style>
