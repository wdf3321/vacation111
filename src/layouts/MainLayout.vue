<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>

            <!-- <q-icon name="update" size="40px"/> -->

          <q-btn flat  to="/" size="sm"  id="cloud" >
            <img src="http://ods.dtstw.com/image/logo.png" alt="Chinabing"
                  title="Chinabing"
       >華餅差勤系統  </q-btn>
        </q-toolbar-title>

        <q-btn
        v-if="!isLogin"
        outline
          class="q-mx-10"
          color="primary"
          to="/login"
          text-color="white"
          label="登入/註冊"
          name="login"
        />

        <q-btn  dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>
    <q-drawer  v-model="rightDrawerOpen" side="right" overlay behavior="mobile" elevated >
      <!-- drawer content -->

    <q-list bordered padding class="rounded-borders text-primary">

<q-item

  v-if="!isAdmin"
  clickable
  v-ripple
  :active="link === 'inbox'"
  @click="link = 'inbox'"
  to="/user"
  active-class="my-menu-link"
>
  <q-item-section avatar>
    <q-icon name="date_range" />
  </q-item-section>

  <q-item-section>打卡申請</q-item-section>
</q-item>
<!-- <q-item
  v-if="isAdmin"
  clickable
  v-ripple
  :active="link === 'inbox'"
  @click="link = 'inbox'"
  to="/admin"
  active-class="my-menu-link"
>
  <q-item-section avatar>
    <q-icon name="date_range" />
  </q-item-section>

  <q-item-section>行事曆</q-item-section>
</q-item> -->
<!-- ------------------------------------ -->

<q-item
v-if="!isAdmin"
  clickable
  v-ripple
  :active="link === 'outbox'"
  @click="link = 'outbox'"
  to="/user/edit"
  active-class="my-menu-link"
>
  <q-item-section avatar>
    <q-icon name="account_circle" />
  </q-item-section>

  <q-item-section>班表</q-item-section>
</q-item>
<!-- <q-item
v-if="isAdmin"
  clickable
  v-ripple
  :active="link === 'outbox'"
  @click="link = 'outbox'"
  to="/admin/user"
  active-class="my-menu-link"
>
  <q-item-section avatar>
    <q-icon name="manage_accounts" />
  </q-item-section>

  <q-item-section>會員管理</q-item-section>
</q-item> -->
<!-- ---------------------------------------------------- -->

<q-item
v-if="!isAdmin"
  clickable
  v-ripple
  :active="link === 'trash'"
  @click="link = 'trash'"
  to="/user/vacation"
  active-class="my-menu-link"
>
  <q-item-section avatar>
    <q-icon name="edit_document" />
  </q-item-section>

  <q-item-section>人員管理</q-item-section>
</q-item>
<!-- <q-item
v-if="isAdmin"
  clickable
  v-ripple
  :active="link === 'trash'"
  @click="link = 'trash'"
  to="/admin/review"
  active-class="my-menu-link"
>
  <q-item-section avatar>
    <q-icon name="free_cancellation" />
  </q-item-section>

  <q-item-section>休假審核</q-item-section>
</q-item> -->
<!-- ------------------------------------------------------- -->
<q-item
v-if="!isAdmin"
  clickable
  v-ripple
  :active="link === 'trash'"
  @click="link = 'trash'"
  to="/admin"
  active-class="my-menu-link"
>
  <q-item-section avatar>
    <q-icon name="edit_document" />
  </q-item-section>

  <q-item-section>歷史紀錄</q-item-section>
</q-item>
<!-- <q-item
v-if="isAdmin"
  clickable
  v-ripple
  :active="link === 'trash'"
  @click="link = 'trash'"
  to="/admin/limit"
  active-class="my-menu-link"
>
  <q-item-section avatar>
    <q-icon name="manage_history" />
  </q-item-section>

  <q-item-section>假單歷史紀錄</q-item-section>
</q-item> -->
<!-- ---------------------------------------------------------- -->
<!-- <q-item
v-if="isAdmin"
  clickable
  v-ripple
  :active="link === 'trash'"
  @click="link = 'trash'"
  to="/admin/Bulletin"
  active-class="my-menu-link"
>
  <q-item-section avatar>
    <q-icon name="format_list_bulleted_add" />
  </q-item-section>

  <q-item-section>公告管理</q-item-section>
</q-item> -->
<!-- ---------------------------------------------------------- -->
<q-separator spaced />

<q-item
v-if="isLogin"
  clickable
  v-ripple
  :active="link === 'help'"
  @click="link = 'help'"
  active-class="my-menu-link"
>

  <q-item-section> <q-btn

          class="q-mx-10"
          color="red"
          text-color="white"
          label="登出"
          name="logout"
          @click="logout"
          icon="logout"
          rounded
        /></q-item-section>
</q-item>
</q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer id="footer" class="column justify-center items-center bg-grey-8  text-white">
   <p>2023</p>

  </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from 'src/stores/user'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
const user = useUserStore()
const { isLogin, isAdmin } = storeToRefs(user)
const router = useRouter()
const rightDrawerOpen = ref(false)
function toggleRightDrawer () {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
const logout = async () => {
  await user.logout()
  router.push('/')
}
</script>

<style lang="scss">
.q-toolbar {
  height: 7vh;
  background: rgb(233, 199, 203);
}
#cloud{
  font-size: 30px !important;
img{
  width: 40px;
  height: 40px;
}
}
@media screen and (max-width: 768px) {
#cloud{
width: 100%;
font-size: 25px !important;
img{
width: 50px;
height: 50px;
}
}
}
// ---
</style>
