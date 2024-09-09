import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthLoginView from '@/views/auth/AuthLoginView.vue'
import HomePageView from '@/views/HomePageView.vue'
import ChangePasswordView from '@/views/auth/ChangePasswordView.vue'
import InvoiceView from '@/views/InvoiceView.vue'
import BulkDownloadView from '@/views/BulkDownloadView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'login', component: AuthLoginView },
    { path: '/home', name: 'home', component: HomePageView },
    { path: '/changePassword', name: 'changePassword', component: ChangePasswordView },
    { path: '/invoice', name: 'invoice', component: InvoiceView },
    { path: '/bulkDownload', name: 'bulkDownload', component: BulkDownloadView }
  ]
})

export default router
