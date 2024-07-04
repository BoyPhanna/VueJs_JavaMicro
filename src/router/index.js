import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Department from '@/views/department/DepartmentView.vue'
import StuffInDepartment from '@/views/department/StuffInDepartment.vue'
import StaffForm from '@/views/staff/StaffFormView.vue'
import StaffUpdade from '@/views/staff/StaffUpdateView.vue'
import AllClientView from '@/views/client/AllClientView.vue'
import AddNewClient from '@/views/client/AddNewClientView.vue'
import UpdateClientInfo from '@/views/client/UpdateClientnfo.vue'
import AllLandTitle from '@/views/landTitle/AllLandTitleView.vue'
import UpdateLandTitle from '@/views/landTitle/UpdateLandTitleView.vue'
import AddLandTitle from '@/views/landTitle/AddLandTitleView.vue'
import AllAccount from '@/views/account/AllAccountView.vue'
import AccountDetail from '@/views/account/AccountDetailView.vue'
import Schedule from '@/views/account/ScheduleView.vue'
import LoanHistory from '@/views/account/LoanHistoryView.vue'
import HistoryPayment from '@/views/account/HistoryPaymentView.vue'
import CreateAccount from '@/views/account/CreateAccountView.vue'
import Payment from '@/views/account/PaymentView.vue'
import LoanOverDue from '@/views/account/LoanOverDueView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/department',
      name: 'department',
      component: Department
    },
    
    {
      path: '/department/:id',
      name: 'department-staff',
      component: StuffInDepartment
    },
    {
      path: '/staff/form/:id',
      name: 'staff-create',
      component: StaffForm
    },
    {
      path: '/staff/update/:id',
      name: 'staff-update',
      component: StaffUpdade
    },
    
    {
      path: '/client',
      name: 'all-client-info',
      component: AllClientView
    },
    {
      path: '/client/add',
      name: 'add-new-client',
      component: AddNewClient
    },
    {
      path: '/client/update/:id',
      name: 'update-client',
      component: UpdateClientInfo
    },
    {
      path: '/landtitle',
      name: 'all-landTitles',
      component: AllLandTitle
    },
    {
      path: '/landtitle/add',
      name: 'add-landTitles',
      component: AddLandTitle
    },
    {
      path: '/landtitle/update/:id',
      name: 'landTitle-update',
      component: UpdateLandTitle
    },
    
    {
      path: '/account',
      name: 'all-account',
      component: AllAccount
    },
    {
      path: '/account/:id',
      name: 'account-detail',
      component: AccountDetail
    },
    {
      path: '/account/scheduleclient/:id',
      name: 'account-schedule',
      component: Schedule
    },
    {
      path: '/account/history/:id',
      name: 'account-history',
      component: LoanHistory
    },
    {
      path: '/account/pay/history/:id',
      name: 'account-historyPayment',
      component: HistoryPayment
    },
    {
      path: '/account/create',
      name: 'account-create',
      component: CreateAccount
    },
    {
      path: '/account/pay',
      name: 'account-pay',
      component: Payment
    },
    {
      path: '/loanoverdue',
      name: 'loan-over-due',
      component: LoanOverDue
    },
    
  ]
})

export default router
