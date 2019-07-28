import Vue from 'vue'
import App from './App.vue'
import VueCodemirror from 'vue-codemirror'
import VueRouter from 'vue-router'
import Routes from './routes'


Vue.use(VueRouter)
Vue.use(VueCodemirror)
Vue.config.productionTip = false


// register routes
const router = new VueRouter({
  routes: Routes
})


new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
