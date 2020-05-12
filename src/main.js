import VueCountdownTimer from 'vuejs-countdown-timer'
import Vue from 'vue'
import App from './App.vue'

import './scss/app.scss';
import './scss/sweetAlertCustom.scss';

import VueSweetalert2 from 'vue-sweetalert2';


import theNavBar from "./components/commons/NavBar"
import router from './router'


Vue.use(VueSweetalert2);

Vue.use(VueCountdownTimer);
Vue.component('Navbar', theNavBar);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
