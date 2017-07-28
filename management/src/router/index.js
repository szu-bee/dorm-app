import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import living from '@/components/living'
import statistics from '@/components/statistics'
import booking from '@/components/booking'
import noti from '@/components/noti'
import changePass from '@/components/change-pass'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: home },
    { path: '/living', component: living },
    { path: '/statistics', component: statistics },
    { path: '/booking', component: booking },
    { path: '/noti', component: noti },
    { path: '/change-pass', component: changePass }
  ]
})
