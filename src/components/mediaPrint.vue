<template>
  <div class="outer">
    <codemirror v-model.lazy="mediaPrint" :options="cmOptions"></codemirror>
    <footer>
      <ul class="left">
        <li>
          <a onclick="window.history.back()" class="back">Back</a>
        </li>
      </ul>
      <ul class="center">
        <li></li>
      </ul>
      <ul class="right">
        <li>
          <a @click="update">Update</a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
/* eslint-disable */
import "codemirror/lib/codemirror.css";
import "codemirror/mode/css/css";
import "codemirror/theme/material.css";
// require active-line.js
import "codemirror/addon/selection/active-line";
import "codemirror/addon/selection/mark-selection";

export default {
  data() {
    return {
      cmOptions: {
        // codemirror options
        tabSize: 2,
        mode: "css",
        theme: "material",
        styleSelectedText: true, //enable styling with .CodeMirror-selectedtext
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: {
          // Tab to space
          Tab: function(cm) {
            var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
            cm.replaceSelection(spaces);
          }
        }
      },
      mediaPrint: `@media print {
  body {
    font-size: 12pt;
  }
  p {
    font-size: 1em !important;
  }
  h1, h2, h3, h4, h5 {
    page-break-after: avoid;
  }
  nav, footer {
    display: none !important;
  }
  div.outer {
    margin: 0 auto;
  }
  .single-article {
    width: 90% !important;
    margin: 1cm !important;
  }
  .article-info {
    display: grid;
    grid-template-columns: 1fr 1fr !important;
  }
  .article-info .date {
    text-align: left !important;
  }
  .content {
    padding: 0 !important;
    margin-top: 1cm !important;
  }
  pre, blockquote {
    page-break-inside: avoid;
  }
}`
    };
  },
  methods: {
    update: function() {
      localStorage.setItem("media-print", this.mediaPrint);
      this.loadStyle();
    },
    loadStyle: function() {
      var style = document.querySelector("style.media-print");
      style.innerText = this.mediaPrint;
    }
  },
  created() {
    var mediaPrint = localStorage.getItem("media-print");
    if (mediaPrint) this.mediaPrint = mediaPrint;
  },
  mounted() {
    var style = document.querySelector("style.media-print");
    if (!style) {
      style = document.createElement("style");
      style.className = "media-print";
    }
    document.head.append(style);
    this.loadStyle();
  }
};
</script>

<style scoped>
.outer {
  width: 75%;
  margin-left: auto;
  margin-right: auto;
}
button {
  display: block;
  margin: 0 10% 0 auto;
}
</style>

