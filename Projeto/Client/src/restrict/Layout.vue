<template>
  <div>
    <Menu />
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Menu from '@/restrict/components/layout/Menu.vue';
  import { createToast } from 'mosha-vue-toastify';

  import { getTokenStorage } from '@/shared/services/storage-service';
  
  export default {
    components: {
      Menu
    },
    setup() {
      axios.defaults.headers = { Authorization: 'Bearer ' + getTokenStorage() };
      axios.interceptors.response.use(
        resp => resp,
        error => {
          if ([401, 403].indexOf(error.response.status) !== -1) {
            createToast('Sua sessão expirou!', { type: 'warning' });
            location.replace('/#/login');
            return;
          }
          return error;
      });
    }
  }
</script>

<style scoped>
  .main {
      box-sizing: border-box;
      margin-top: var(--menu-height);
      padding: 25px var(--horizontal-space);
      min-height: calc(100vh - var(--menu-height));
  }

  .main > .centred {
      margin-top: 10vh;
  }
</style>