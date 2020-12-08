import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/main/landing-page/LandingPage.vue'
import Login from '../views/auth/Login.vue'
import SignUp from '@/views/auth/SignUp.vue'
import CreatePin from '@/views/auth/CreatePin.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import Auth from '../views/auth/Auth.vue'
import Home from '@/views/main/home/Home'
import HomeComponent from '@/components/module/home/Home'
import SearchReceiver from '@/components/module/transfer/SearchReceiver'
import InputAmount from '@/components/module/transfer/InputAmount'
import Confirmation from '@/components/module/transfer/Confirmation'
import StatusSucceed from '@/components/module/transfer/StatusSucceed'
import StatusFailed from '@/components/module/transfer/StatusFailed'
import TransactionHistory from '@/components/module/history/TransactionHistory'
import TopUp from '@/components/module/topup/TopUp'
import Profile from '@/components/module/profile/Profile'
import PersonalInformation from '@/components/module/profile/PersonalInformation'
import ChangePin from '@/components/module/profile/ChangePin'
import AddPhoneNumber from '@/components/module/profile/AddPhoneNumber'
import EditPhoneNumber from '@/components/module/profile/EditPhoneNumber'
import ManagePhoneNumber from '@/components/module/profile/ManagePhoneNumber'
import EmailVerification from '@/views/email/EmailVerification'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home/home',
    children: [
      {
        path: 'home',
        name: 'HomeComponent',
        component: HomeComponent
      },
      {
        path: 'searchreceiver',
        name: 'SearchReceiver',
        component: SearchReceiver
      },
      {
        path: 'inputamount/:idUser',
        name: 'InputAmount',
        component: InputAmount
      },
      {
        path: 'confirmation',
        name: 'Confirmation',
        component: Confirmation
      },
      {
        path: 'statussucceed',
        name: 'StatusSucceed',
        component: StatusSucceed
      },
      {
        path: 'statusfailed',
        name: 'StatusFailed',
        component: StatusFailed
      },
      {
        path: 'transactionhistory',
        name: 'TransactionHistory',
        component: TransactionHistory
      },
      {
        path: 'topup',
        name: 'TopUp',
        component: TopUp
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'personalinformation',
        name: 'PersonalInformation',
        component: PersonalInformation
      },
      {
        path: 'changepin',
        name: 'ChangePin',
        component: ChangePin
      },
      {
        path: 'addphonenumber',
        name: 'AddPhoneNumber',
        component: AddPhoneNumber
      },
      {
        path: 'editphonenumber/:idUser',
        name: 'EditPhoneNumber',
        component: EditPhoneNumber
      },
      {
        path: 'managephonenumber',
        name: 'ManagePhoneNumber',
        component: ManagePhoneNumber
      }
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: SignUp
      },
      {
        path: 'createpin',
        name: 'CreatePin',
        component: CreatePin
      },
      {
        path: 'resetpassword',
        name: 'ResetPassword',
        component: ResetPassword
      }
    ]
  },
  {
    path: '/emailverification/:email',
    name: 'EmailVerification',
    component: EmailVerification
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
