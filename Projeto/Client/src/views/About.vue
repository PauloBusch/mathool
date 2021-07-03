<template>
  <div class="about">
    <h1>This is an about page</h1>
    <MarkHtml v-bind:archive="this.arq" />
  </div>
</template>
<script>
// @ is an alias to /src
import MarkHtml from '@/components/MarkHtml.vue';
import mark from '!raw-loader!../../README.md';

export default {
  name: 'About',
  data(){
    return {
      arq: mark
      };
  },
  components: {
    MarkHtml
  }
}
</script>
