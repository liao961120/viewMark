<template>
  <div class="outer">
    <md-save v-bind:mdInput="mdInput"></md-save>
    <div v-bind:class="{'container': isFullScreen, 'two-cols': !isFullScreen}">
      <div class="input md-input">
        <codemirror
          v-model="mdInput"
          v-bind:options="cmOptions"
          v-on:update="onCmUpdate"
          v-on:blur="onCmDefocus"
          v-on:ready="onCmReady"
        ></codemirror>
      </div>

      <div class="preview md-preview" v-show="!isFullScreen">
        <div v-html="mdRender"></div>
      </div>
    </div>

    <app-footer v-bind:isMdSnippet="true" v-bind:isMathSnippet="false" v-bind:isFullScreen="isFullScreen"></app-footer>
  </div>
</template>

<script>
/* eslint-disable */
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown";
import "codemirror/theme/material.css";

// require active-line.js
import "codemirror/addon/selection/active-line";
import "codemirror/addon/selection/mark-selection";

// custom functions
import utils from "./utils";
import prism from "./prism";
import "../assets/prism.css";

// katex
import katex from "katex";
import "katex/dist/katex.min.css";
import renderMathInElement from "katex/dist/contrib/auto-render.min";

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
    "app-footer": appFooter
  },
  data() {
    return {
      mdInput:
        "The pdf of the normal distribution is \n\n$$\n\\frac{1}{\\sqrt{2 \\pi} \\sigma} e ^ {- \\frac{(x - \\mu)^2}{2 \\sigma ^2}}\n$$",
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
      cmObject: {},
      isFullScreen: false
    };
  },
  methods: {
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
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
    onCmReady(cm) {
      // Expose codemirror object to data
      this.cmObject = cm;
      
      this.renderMath();
    },
    onCmUpdate(cm) {
      // Save text to localStorage
      localStorage.setItem("md-input", this.mdInput);

      // Set mdInputSaved to false
      bus.$emit("mdInputSaved", false);

      // render Math
      setTimeout(() => {
        this.renderMath();
      }, 0);

      // Reload Prism
      Prism.highlightAll();
    },
    onCmDefocus(cm) {},
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

    // Listen to 'mdInputSaved'
    bus.$on("mdInputSaved", data => {
      this.mdInputSaved = data;
    });

    // Listen to 'loadArticle': load content from local storage
    bus.$on("loadArticle", data => {
      this.mdInput = data;
      setTimeout(() => bus.$emit("mdInputSaved", true), 100);
    });

    // Listen to snippet insertion
    bus.$on("insertSnippet", data => {
      // Insert snippet
      this.mdInput += data.content;

      // Get cursor position
      var linenum = this.cmObject.getCursor().line + 0;
      var ch = this.cmObject.getCursor().ch + 0;
      this.cmObject.focus();

      // Move to cursor position
      setTimeout(() => {
        let ch_start = ch + parseInt(data.cursorPos[0]);
        let ch_end = ch + parseInt(data.cursorPos[1]);
        this.cmObject.setSelection(
          { line: linenum, ch: ch_start },
          { line: linenum, ch: ch_end }
        );
      }, 100);
    });

    // Listen on toggle full screen
    bus.$on("toggleFullScreen", data => {
      this.isFullScreen = !this.isFullScreen;
    });
  },

  mounted() {}
};
</script>

<style>
.container {
  padding: 0 15%;
}

/* Two Column styles */
.two-cols > div.preview,
.two-cols > div.input {
  float: left;
  width: 43%;
  margin: 0 1% 0 2%;
  padding: 0 1%;
}

.two-cols > div.preview {
  border-style: solid;
  border-width: 1.5px;
  border-radius: 10px;
  font-family: "Alegreya", Alegreya, Ubuntu;
  overflow-wrap: break-word;
  text-align: justify;
}

.two-cols::after {
  content: "";
  display: block;
  clear: both;
}

/* Sidebar styles */
.sidebar {
  position: absolute;
  bottom: 200px;
  width: 5%;
  margin: 0;
  padding: 0;
  height: 0;
  z-index: 30;
}

.sidebar input {
  width: 100%;
}

/* Codemirror styles */
.CodeMirror {
  height: auto;
  width: auto;
  font-size: 1.1em;
}

.CodeMirror-scroll {
  min-height: 29em;
}

.CodeMirror-activeline-background.CodeMirror-linebackground {
  background: rgba(100, 100, 100, 0.5);
}

span.CodeMirror-selectedtext {
  color: #263238;
  background-color: rgba(98, 240, 3, 0.863);
}
</style>

<style scoped>
</style>
