<template>
  <div class="math">
    <div class="math-input">
      <codemirror v-model="mathInput" v-bind:options="cmOptions"></codemirror>
    </div>

    <div class="math-preview">
      <h3>Preview</h3>
      <div id="math-preview" v-html="mathRender"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import "codemirror/lib/codemirror.css";
import "codemirror/mode/stex/stex";
import "codemirror/theme/base16-dark.css";

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
        theme: "base16-dark",
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
div.math {
  display: flex
}
div.math > div {
  flex: 50%;
}

div.math-input {
  margin: 0 20px;
}
.math-preview {
  margin: 0px 0px;
  padding: 0 0px;
}
.math-preview > * {
  text-align: center;
  margin: 0.01em;
  font-size: 1.2em;
  line-height: 1.8em;
}
.math-preview > h3 {
  margin: 0px auto;
  font-size: 1em;
  text-align: center;
}

.math-input .CodeMirror {
/*  margin: 0px 20px;  */
/*  min-width: 300px;  */
  height: auto;
  width: auto;
  font-size: 1.1em;
  /*width: 90%;*/
}

.math-input .CodeMirror-scroll {
  min-height: 300px;
}

.math-input .CodeMirror-activeline-background.CodeMirror-linebackground {
  background: rgba(100, 100, 100, 0.5);
}

.math-input span.CodeMirror-selectedtext {
  color: #263238;
  background-color: rgba(98, 240, 3, 0.863);
}
</style>


