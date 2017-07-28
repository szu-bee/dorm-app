import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import ruleZh from '@/components/rule-zh'
import ruleEn from '@/components/rule-en'
import bookingForm from '@/components/booking-form'
import viewResult from '@/components/view-result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/rule-zh',
      name: 'rule-zh',
      component: ruleZh
    },
    {
      path: '/rule-en',
      name: 'rule-en',
      component: ruleEn
    },
    {
      path: '/booking-form',
      name: 'bookingForm',
      component: bookingForm
    },
    {
      path: '/view-result',
      name: 'viewResult',
      component: viewResult
    }
  ]
})
