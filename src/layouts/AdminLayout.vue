<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-btn flat  to="/" size="sm"  id="cloud" >
            <img src="http://ods.dtstw.com/image/logo.png" alt="Chinabing"
                  title="Chinabing"
       >華餅差勤系統  </q-btn>
       <div class="row justify-center">

        <div id="days" >
          現在時間: {{date}}</div>
        <div id="times" > {{ time }}</div>

      </div>
        </q-toolbar-title>

          <q-btn
          color="red"
          @click="logout"
          label="登出"
          icon="logout"
          rounded
        />

      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
        :width="200"
        :breakpoint="600"
        bordered
        class="bg-grey-1"
      >
        <q-scroll-area class="fit">
          <q-list>

            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item :to="menuItem.a" clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section >
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
            </template>

          </q-list>
        </q-scroll-area>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer bordered class="bg-primary text-white ">

    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from 'src/stores/user'
import { useRouter } from 'vue-router'

// ----------------------

const date = ref('')
const time = ref('')

function updateDateTime () {
  date.value = new Date().toLocaleDateString()
  time.value = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false }).split(':')[0] + ':' + new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false }).split(':')[1]
  // console.log(time, date)
}

let interval

onMounted(() => {
  updateDateTime()
  interval = setInterval(() => {
    updateDateTime()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
  return {
    date,
    time
  }
})

// -----------

const user = useUserStore()

const router = useRouter()
const drawer = ref(false)
const miniState = ref(true)
function toggleLeftDrawer () {
  drawer.value = !drawer.value
}

const logout = async () => {
  await user.logout()
  router.push('/')
}
const menuList = [
  {
    icon: 'date_range',
    label: '打卡歷史紀錄',
    separator: false,
    a: '/admin'
  },
  {
    icon: 'manage_accounts',
    label: '會員管理',
    separator: false,
    a: '/admin/user'
  },
  {
    icon: 'free_cancellation',
    label: '打卡',
    separator: false,
    a: '/admin/review'
  },
  {
    icon: 'free_cancellation',
    label: '班表',
    separator: false,
    a: '/admin/review'
  },
  {
    icon: 'home',
    label: '首頁',
    separator: false,
    a: '/'
  }

]

</script>

<style>
#times{
    font-family: 'Share Tech Mono', monospace;
    color: #ffffff;
    text-align: center;
    position: absolute;
    font-size: 40px;
    left: 60%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #daf6ff;
    text-shadow: 0 0 20px rgba(#7bcdd0, 1),
                 0 0 20px rgba(#7BD08D, 0);
}
#days{
    font-family: 'Share Tech Mono', monospace;
    color: #ffffff;
    text-align: center;
    position: absolute;
    left: 38%;
    top: 50%;
    font-size: 30px;
    transform: translate(-50%, -50%);
    color: #daf6ff;
    text-shadow: 0 0 20px rgba(#7bcdd0, 1),
                 0 0 20px rgba(#7BD08D, 0);
}
</style>
