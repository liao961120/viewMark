<template>
  <div>
    <div class="md-input">
      <codemirror v-model="mdInput" v-bind:options="cmOptions"></codemirror>
    </div>

    <div class="md-preview">
      <h2>Preview</h2>
      <div v-html="mdRender"></div>
    </div>
  </div>
</template>

<script>
///////////// To do /////////////////
//   Mathjax autorender preprocess: replace [a-zA-Z0-9]_{ with \_{} https://github.com/KaTeX/KaTeX/issues/1676#issuecomment-417078078  

/* eslint-disable */
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown";
import "codemirror/theme/material.css";

// require active-line.js
import "codemirror/addon/selection/active-line";
import "codemirror/addon/selection/mark-selection";
let marked = require("marked");

export default {
  data() {
    return {
      mdInput: "$$\\frac{a}{b}$$",
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "markdown",
        theme: "material",
        styleSelectedText: true, //enable styling with .CodeMirror-selectedtext
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true
      }
    };
  },
  methods: {
    getMath: function() {
      console.log(this.mdInput);
    }
  },
  computed: {
    mdRender: function() {
      //return null
      return marked(this.mdInput);
    }
  },
  mounted: function() {
    let mathjax = document.createElement('script');
    //let mathjaxPath = require('../assets/mathjax.js');
    mathjax.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_CHTML';
    mathjax.async = true;
    document.head.append(mathjax);
  }
};
</script>

<style>
.md-input .CodeMirror {
  border: 1px solid #eee;
  overflow-x: hidden;
  height: auto;
  width: 70%;
}

.md-input .CodeMirror-scroll {
  min-height: 500px;
}

.md-input .CodeMirror-activeline-background.CodeMirror-linebackground {
  background: rgba(100, 100, 100, 0.5);
}

.md-input span.CodeMirror-selectedtext {
  color: #263238;
  background-color: rgba(98, 240, 3, 0.863);
}
</style>

