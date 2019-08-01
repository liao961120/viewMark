<template>
  <div>
    <div class="md-input">
      <codemirror
        v-model="mdInput"
        v-bind:options="cmOptions"
        v-on:update="onCmUpdate"
        v-on:blur="onCmDefocus"
        v-on:ready="renderMath"
      ></codemirror>

      <md-save v-bind:mdInput="mdInput"></md-save>

      <!-- <button v-on:click="test">test</button> -->
    </div>

    <div class="md-preview">
      <h2>Preview</h2>
      <div v-html="mdRender"></div>
    </div>

    <app-footer>

    </app-footer>

  </div>
</template>

<script>
/*
ToDo: snippets
*/


/* eslint-disable */
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown";
import "codemirror/theme/material.css";

// require active-line.js
import "codemirror/addon/selection/active-line";
import "codemirror/addon/selection/mark-selection";

// custom functions
import utils from "./utils";

// katex
import katex from "katex";
import "katex/dist/katex.min.css";
import renderMathInElement from "katex/dist/contrib/auto-render.min";
import { setInterval, setTimeout } from "timers";

// Markdown parser
let marked = require("marked");

// components
import mdSave from "./mdSave.vue";
import appFooter from "./footer.vue";

// event bus
import { bus } from "../main";
import { setPriority } from "os";

export default {
  components: {
    "md-save": mdSave,
    "app-footer": appFooter,
  },
  data() {
    return {
      mdInput: "$$\\frac{a}{b}$$",
      mdInputSaved: false,
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "markdown",
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
    test() {
      this.mdInput = "new text";
    },
    renderMath() {
      // Render Math in Preview
      renderMathInElement(document.querySelector(".md-preview"), {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false }
        ]
      });
    },
    onCmUpdate(cm) {
      console.log("cm updated");
      this.cmObject = cm;

      // Save text to localStorage
      localStorage.setItem("md-input", this.mdInput);

      // Set mdInputSaved to false
      bus.$emit("mdInputSaved", false);
    },
    onCmDefocus(cm) {
      // render Math
      this.renderMath();
    },
    currentCursor: function() {
      if (!this.cmObject.display) return "aa";
      var linenum = this.cmObject.getCursor().line;
      var ch = this.cmObject.getCursor().ch;
      return [linenum, ch];
    }
  },
  computed: {
    mdRender: function() {
      // render Markdown
      var temp = document.createElement("div");
      temp.innerHTML = marked(this.mdInput);

      return temp.innerHTML;
    }
  },
  created() {
    if (localStorage.getItem("md-input"))
      this.mdInput = localStorage.getItem("md-input");

    // listen to 'mdInputSaved'
    bus.$on("mdInputSaved", data => {
      this.mdInputSaved = data;
      console.log(`Editor on mdInputSaved ${data}`);
    });

    // Listen to 'loadArticle': load content from local storage
    bus.$on("loadArticle", data => {
      this.mdInput = data;
      setTimeout(() => bus.$emit("mdInputSaved", true), 100);
    });
  },
  mounted: function() {}
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

