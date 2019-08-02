<template>
  <div class="math two-cols outer">
    <div class="input math-input">
      <codemirror v-model="mathInput" v-bind:options="cmOptions"></codemirror>
    </div>

    <div class="preview">
      <div id="math-preview" v-html="mathRender"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import "codemirror/lib/codemirror.css";
import "codemirror/mode/stex/stex";
import "codemirror/theme/material.css";


// require active-line.js
import "codemirror/addon/selection/active-line";
import "codemirror/addon/selection/mark-selection";

// katex
import katex from "katex";
import "katex/dist/katex.min.css"

export default {
  data() {
    return {
      mathInput: "\\frac{a}{b}",
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "stex",
        theme: "material",
        styleSelectedText: true, //enable styling with .CodeMirror-selectedtext
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true
      }
    };
  },
  methods: {
    showCode: function() {
      console.log(this.mathInput);
    }
  },
  watch: {},
  computed: {
    mathRender: function() {
      var ele = document.querySelector("#math-preview");
      try {
        var html = katex.renderToString(this.mathInput, ele, {
          throwOnError: true
        });
      } catch (e) {
          var html = 'error';
      }

      return html;
    }
  }
};
</script>

<style>
div#math-preview {
  padding: 10px 10px 15px;
  overflow-x: auto;
  font-size: 1.1em;
}
</style>


