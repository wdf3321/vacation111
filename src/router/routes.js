import MainLayout from 'layouts/MainLayout.vue'
import AdminLayout from 'layouts/AdminLayout.vue'
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('src/pages/IndexPage.vue'),
        meta: {
          title: '出勤系統',
          login: false,
          admin: false
        }
      }, {
        path: '/Punchrecord',
        component: () => import('pages/admin/PunchrecordPage.vue'),
        meta: {
          title: '打卡紀錄',
          login: false,
          admin: false
        }
      }
    ]
  },

  {
    path: '/admin/Punchrecord',
    component: AdminLayout,
    children: [
      {
        path: '/admin',
        component: () => import('pages/admin/PunchrecordPage.vue'),
        meta: {
          title: '管理員',
          login: true,
          admin: true
        }
      }]
  },
  // Always lve this as last one,
  // bueat you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
