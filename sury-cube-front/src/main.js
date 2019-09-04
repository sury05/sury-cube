import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import mixin from './mixin';
import messageHandler from './socket/handler';

Vue.config.productionTip = false;

messageHandler();

new Vue({
  router,
  store,
  vuetify,
  mixin: [mixin],
  render: h => h(App),
}).$mount('#app');
