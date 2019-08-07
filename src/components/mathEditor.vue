<template>
  <div class="math two-cols outer">
    <div class="input math-input">
      <codemirror
        v-model="mathInput"
        v-bind:options="cmOptions"
        v-on:update="onCmUpdate"
        v-on:ready="onCmReady"
      ></codemirror>
    </div>

    <div class="preview">
      <div id="math-preview" v-html="mathRender"></div>
    </div>

    <app-footer v-bind:isMathSnippet="true" v-bind:isMdSnippet="false"></app-footer>
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
import "katex/dist/katex.min.css";

// Components
import appFooter from "./footer.vue";

// Event bus
import { bus } from "../main";

export default {
  components: {
    "app-footer": appFooter
  },

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
      },
      cmObject: {}
    };
  },
  methods: {
    showCode: function() {
      console.log(this.mathInput);
    },
    onCmReady: function(cm) {
      // Expose cm object to data
      this.cmObject = cm;
    },
    onCmUpdate: function(cm) {
      localStorage.setItem("math-input", this.mathInput);
    }
  },
  computed: {
    mathRender: function() {
      var ele = document.querySelector("#math-preview");
      try {
        var html = katex.renderToString(this.mathInput, ele, {
          throwOnError: true
        });
      } catch (e) {
        var html = "error";
      }
      return html;
    }
  },

  created() {
    if (localStorage.getItem("math-input"))
      this.mathInput = localStorage.getItem("math-input");

    bus.$on("insertSnippet", data => {
      // Check md or math snippet
      if (data.isMdSnippet) return;

      this.mathInput += data.snippet;
      // Get cursor position
      var linenum = this.cmObject.getCursor().line + 0;
      var ch = this.cmObject.getCursor().ch + 0;
      this.cmObject.focus();
      // Move to cursor position
      setTimeout(() => {
        console.log(this.cmObject, linenum, ch);
        let ch_start = ch + parseInt(data.cursorPos[0]);
        let ch_end = ch + parseInt(data.cursorPos[1]);
        this.cmObject.setSelection(
          { line: linenum, ch: ch_start },
          { line: linenum, ch: ch_end }
        );
      }, 100);
    }); // end $on(insertSnippet)
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


