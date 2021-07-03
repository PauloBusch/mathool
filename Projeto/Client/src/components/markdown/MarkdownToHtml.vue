<template>
  <div class="markdown" v-html="markdownToHtml"></div>
</template>

<script>
  import marked from 'marked';

  export default {
    name: 'app-markdown-to-html',
    props: {
      content: String
    },
    data() {
      return { markdown: '' };
    },
    computed: {
      markdownToHtml() {
        return marked(this.content);
      }
    }
  }
</script>

<style coped>
  .markdown table {
    display: block;
    flex-wrap: wrap;
    max-width: 100%;
    overflow: auto;
    width: 100%;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    border-collapse: collapse;
    border-spacing: 0;
  }

  .markdown table td, .markdown table th {
    border: 1px solid rgb(168, 168, 168);
    padding: 8px 13px;
    width: 180px;
    max-width: 100%;
  }

  .markdown thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
  }

  .markdown tr:nth-child(odd) {
    background-color:#ffffff;
  }

  .markdown	tr:nth-child(even) {
    background-color:rgb(235, 235, 235);
  }

  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }

  .markdown {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .markdown a {
    opacity: .8;
    transition: .2s;
    color: var(--secondary);
  }

  .markdown a:hover {
    opacity: 1;
  }

  .markdown pre {
    display: flex;
    background-color: #e7f2fd;
  }

  .markdown pre code {
    padding:5px 20px 5px 10px;
  }

  .markdown pre code::before{
    content: ' >';
    color: green;
    font-weight: bolder;
    padding: 5px;
    position: relative;
    left: -10px;
    border-left: 2px solid green;
  }

  .markdown ul li {
    text-align: start;
    padding-left: 5px;
  }

  .markdown blockquote {
    background: #99999927;
    padding: 15px;
    min-width: 200px;
    max-width: 70%;
    position: relative;
    margin-top: 40px;
  }

  .markdown blockquote  p::before{
    content: '“';
    font-size: 300px;
    position: absolute;
    color: rgba(92, 87, 156, 0.541);
    top: -100px;
    left: -40px;
    max-height: 10px !important;
    margin: 0;
  }
</style>
