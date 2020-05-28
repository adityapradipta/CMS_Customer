import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Dashboard from '../views/Dashboard.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Cart from '../components/Cart.vue'
import Customer from '../components/Customer.vue'
import CustomerEdit from '../components/CustomerEdit.vue'
import CurrentOrder from '../components/CurrentOrder.vue'
import OrderHistory from '../components/History.vue'
import ProductDetail from '../components/ProductDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer,
    children: [
      {
        path: 'edit',
        name: 'CustomerEdit',
        component: CustomerEdit
      }
    ]
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/current_order',
    name: 'CurrentOrder',
    component: CurrentOrder
  },
  {
    path: '/history',
    name: 'OrderHistory',
    component: OrderHistory
  },
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
    children: [
      {
        path: 'register',
        name: 'Register',
        component: Register
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
