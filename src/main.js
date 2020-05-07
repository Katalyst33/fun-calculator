


import Vue from 'vue'
import App from './App.vue'

import './scss/bulma.scss';
import './scss/sweet.scss';

import VueSweetalert2 from 'vue-sweetalert2';


import theNavBar from "./components/commons/NavBar"
import router from './router'


Vue.use(VueSweetalert2);

Vue.component('Navbar', theNavBar);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
