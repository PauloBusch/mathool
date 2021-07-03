<template>
  <div class="markdown-reader">
    <app-markdown-to-html v-bind:content="this.content" />
  </div>
</template>

<script>
  import MarkdownToHtml from './MarkdownToHtml.vue';

  export default {
    name: 'About',
    computed: {
      content() {
        return require(`!raw-loader!../../${this.$route.meta.file}`).default;
      }
    },
    components: {
      'app-markdown-to-html': MarkdownToHtml
    }
  }
</script>
