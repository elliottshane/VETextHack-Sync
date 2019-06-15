import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.filter('phone', function (phone) {
  return phone.replace(/[^0-9]/g, '')
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
});
new Vue({
  router,
  store,
  render: function (h) { return h(App) },
  created() {
    this.$store.dispatch("loadResults");
  }
}).$mount('#app')
