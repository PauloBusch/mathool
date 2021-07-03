<template>
  <div class="markdown-reader">
    <MarkdownToHtml v-bind:content="this.content" />
  </div>
</template>

<script>
  import MarkdownToHtml from './MarkdownToHtml.vue';

  export default {
    computed: {
      content() {
        return require(`!raw-loader!../../${this.$route.meta.file}`).default;
      }
    },
    components: {
      MarkdownToHtml
    }
  }
</script>
