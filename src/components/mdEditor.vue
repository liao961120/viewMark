<template>
  <div class="outer">
    <div class="input md-input" v-show="!isFullView">
      <codemirror
        v-model="cache.mdInput"
        v-bind:options="cmOptions"
        v-on:update="onCmUpdate"
        v-on:blur="onCmDefocus"
        v-on:ready="onCmReady"
      ></codemirror>
    </div>

    <div class="preview md-preview" v-show="isFullView">
      <div v-html="mdRender" class="md-content"></div>
      <div class="toc">
        <div class="tocbot-toc"></div>
      </div>
    </div>

    <app-footer
      v-bind:isMdSnippet="true"
      v-bind:isMathSnippet="false"
      v-bind:isOneColumn="isOneColumn"
    ></app-footer>
    <md-save v-bind:cache="cache"></md-save>
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
var Prism = require("prismjs");
import "prismjs/themes/prism.css";

// katex
import katex from "katex";
import "katex/dist/katex.min.css";
import renderMathInElement from "katex/dist/contrib/auto-render.min";

// Markdown parser
let marked = require("marked");

// Toc
import "tocbot/dist/tocbot.min";
import "tocbot/dist/tocbot.css";

// components
import mdSave from "./mdSave.vue";
import appFooter from "./footer.vue";

// event bus
import { bus } from "../main";
import { setPriority } from "os";

// Mixins
import h6Modify from "../mixins/h6Modify";

export default {
  components: {
    "md-save": mdSave,
    "app-footer": appFooter
  },
  mixins: [h6Modify],
  data() {
    return {
      cache: {
        id: "",
        date: 0,
        title: "",
        tags: [],
        mdInput:
          "The *p.d.f.* of the normal distribution is \n\n$$\n\\frac{1}{\\sqrt{2 \\pi} \\sigma} e ^ {- \\frac{(x - \\mu)^2}{2 \\sigma ^2}}\n$$"
      },
      mdInputSaved: false,
      cmOptions: {
        // codemirror options
        tabSize: 2,
        mode: "markdown",
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
      cmObject: {},
      isOneColumn: false,
      isFullView: false
    };
  },
  methods: {
    toggleFullScreen() {
      this.isOneColumn = !this.isOneColumn;
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
      localStorage.setItem("md-input", JSON.stringify(this.cache));

      // Set mdInputSaved to false
      bus.$emit("mdInputSaved", false);

      // render Math
      setTimeout(() => {
        this.renderMath();
      }, 0);

      // Reload Prism
      Prism.highlightAll();

      // Modify h6
      this.attachH6();

      // Add toc to .md-content
      tocbot.init({
        // Where to render the table of contents.
        tocSelector: ".tocbot-toc",
        // Where to grab the headings to build the table of contents.
        contentSelector: ".md-content",
        // Which headings to grab inside of the contentSelector element.
        headingSelector: "h2, h3, h4, h5"
      });
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
      temp.innerHTML = marked(this.cache.mdInput);

      return temp.innerHTML;
    }
  },
  created() {
    var cache = localStorage.getItem("md-input");
    if (cache) this.cache = JSON.parse(cache);

    // Listen to 'mdInputSaved'
    bus.$on("mdInputSaved", data => {
      this.mdInputSaved = data;
    });

    // Listen to 'loadArticle': load content from local storage
    bus.$on("loadArticle", data => {
      console.log(data);
      this.cache.id = data.id;
      this.cache.date = data.date;
      this.cache.title = data.title;
      this.cache.tags = data.tags;
      this.cache.mdInput = data.content;

      setTimeout(() => bus.$emit("mdInputSaved", true), 100);
    });

    // Listen on snippet insertion
    bus.$on("insertSnippet", data => {
      // Check md or math snippet
      if (!data.isMdSnippet) return;

      // Insert snippet
      this.cache.mdInput += data.snippet;

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
      // one column edit -> one column view

      // two columns -> one column view
      if (data == "view") {
        this.isFullView = true;
        return;
      }
      // one column view -> one column edit
      if (data == "edit") {
        this.isFullView = false;
        return;
      }

      console.log(data);
      console.log("Bug found in toggleFullScreen, mdEditor line194");
    });
  },

  mounted() {}
};
</script>

<style scoped>
.outer {
}
.md-input {
  width: 80%;
  margin: 50px auto;
}
/* Full preview with toc */
.md-content {
  width: 65%;
  margin: 0 25% 0 10%;
  padding: 0;
}

/* Full Preview styles */
.full-view > div.input {
  display: none;
}
.full-view > div.preview,
.full-view > div.md-preview {
  width: 80%;
  padding: 10px auto;
  margin: 10px auto;
  font-family: var(--serif);
  font-size: 1.1em;
  overflow-wrap: break-word;
  text-align: justify;
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
  font-family: var(--serif);
  font-size: 0.9em;
  overflow-wrap: break-word;
  text-align: justify;
}
.two-cols::after {
  content: "";
  display: block;
  clear: both;
}
</style>

<style>
/* Codemirror styles */
.CodeMirror {
  border: 1px solid #eee;
  border-radius: 10px;
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
