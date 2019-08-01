<template>
  <div class="outer">
    <div class="container">
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

      <div class="md-preview" v-show="!isFullScreen">
        <h2>Preview</h2>
        <div v-html="mdRender"></div>
      </div>
    </div>
    <app-footer v-bind:isMdSnippet="true" v-bind:isFullScreen="isFullScreen">
      <li slot-scope="props" slot="custom-md-btn1">
        <a href="#fullscreen" v-on:click="props.toggleFullScreen"></a>
      </li>

      <li slot="custom-md-btn2">
        <a href="#">slot 2</a>
      </li>
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
    "app-footer": appFooter
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
      cmObject: {},
      isFullScreen: false
    };
  },
  methods: {
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
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
      // Expose codemirror object to data
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

      // Set cursor position
      var linenum = this.cmObject.getCursor().line + 0;
      var ch = this.cmObject.getCursor().ch + 0;
      this.cmObject.focus();

      // Move to cursor position
      var cleanInput = this.mdInput.replace(/\r?\n|\r/g, "");
      // Codemirror undocumented api: triggerOnKeyDown

      setTimeout(() => {
        // Press 'end' key
        this.cmObject.triggerOnKeyDown({ type: "keydown", keyCode: 35 });
      }, 50);
      // Move cursor forward based on cursorPos
      for (let i = 0; i > parseInt(data.cursorPos); i--) {
        setTimeout(() => {
          // Press 'leftArrow' key
          this.cmObject.triggerOnKeyDown({ type: "keydown", keyCode: 37 });
        }, 100);
      }
    });

    // Listen on toggle full screen
    bus.$on("toggleFullScreen", data => {
      this.isFullScreen = !this.isFullScreen;
      
      var btn = document.querySelector('a[href="#fullscreen"]');
      console.log(btn)
      if (this.isFullScreen)
        btn.className = 'btn-full-screen';
      else
        btn.className = 'btn';
    });
  },

  mounted: function() {
    /*
    document.addEventListener("keydown", () => {
      console.log("pressed key");
    });
    */
  }
};
</script>

<style>
.container {
  padding: 0 15%;
}
.md-input .CodeMirror {
  height: auto;
  width: auto;
  font-size: 1.1em;
}

.md-input .CodeMirror-scroll {
  min-height: 35em;
}

.md-input .CodeMirror-activeline-background.CodeMirror-linebackground {
  background: rgba(100, 100, 100, 0.5);
}

.md-input span.CodeMirror-selectedtext {
  color: #263238;
  background-color: rgba(98, 240, 3, 0.863);
}

.full-screen {
  position: fixed;
  margin-top: 50px;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
}

.full-screen .CodeMirror-scroll {
  min-height: 700px;
}

.full-screen .CodeMirror {
  width: auto;
}


.btn-full-screen {
  background: #eee;
  color: #444;
}
</style>

<style scoped>
</style>
