<template>

<div class="markdown" v-html="markdownToHtml"> </div>
</template>

<script>
import marked from 'marked';
// import mark from '!raw-loader!../../README.md';
// import mark from '!raw-loader!  {{this.archive}}';

export default {
  name: 'MarkHtml',
  data() {
    return {
      markdown: ''
    }
  },
     props: {
       archive: String
   },

  computed: {
    markdownToHtml() {

      return marked(this.archive);
    }
  }

}
</script>

<style coped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  }

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
  .markdown{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
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

</style>
