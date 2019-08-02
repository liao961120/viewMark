<template>
  <footer>
    <ul class="left">
      <li v-if="this.toggleFullScreen">
        <a href="#" v-on:click="toggleFullScreen" class="preview left">Preview</a>
      </li>
    </ul>
    <ul>
      <slot name="custom-math-btn"></slot>
      <li v-for="snippet in snippets" v-bind:key="snippet.id">
        <a href="#" v-on:click="insertSnippet(snippet)">{{ snippet.name }}</a>
      </li>
    </ul>
    <ul class="right">
      <li v-if="isMdSnippet">
        <a href="#" v-on:click="addSyntaxHighlight" class="prism right">SyntaxHighlight</a>
      </li>
    </ul>
  </footer>
</template>

<script>
import { bus } from "../main";

export default {
  props: {
    isMdSnippet: {
      type: Boolean
    },
    isFullScreen: {
      type: Boolean
    }
  },
  data() {
    return {
      snippets: []
    };
  },
  methods: {
    insertSnippet: function(snippet) {
      bus.$emit("insertSnippet", {
        content: snippet.snippet,
        cursorPos: snippet.cursorPos
      });
    },
    toggleFullScreen: function(event) {
      bus.$emit("toggleFullScreen", {});
      setTimeout(() => {
        var ele = event.target;
        if (this.isFullScreen) ele.className = "";
        else ele.className = "btn-full-screen";
      }, 100);
    },

    addSyntaxHighlight: function(event) {
      const lang = prompt(
        "Enter one programming language name for syntax highlighting.",
        "python"
      );
      if (lang == null) return;
      // Custom lang
      const script = document.createElement("script");
      script.setAttribute(
        "src",
        `https://cdn.jsdelivr.net/npm/prismjs@1.17.1/components/prism-${lang.toLowerCase()}.min.js`
      );
      document.head.append(script);
    }
  },
  created() {
    var item = ["mathSnippets", "mdSnippets"].splice(this.isMdSnippet, 1);

    // Initialize
    if (localStorage.getItem(item))
      this.snippets = JSON.parse(localStorage.getItem(item));

    bus.$on("updateSnippets", data => {
      this.snippets = data[item];
    });
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  text-align: center;
  margin: 0;
  padding: 0 5px;
}
li {
  display: inline-block;
  margin: 0 5px;
  padding: 10px 0px;
}
a {
  font-size: 0.85em;
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 10px;
  background: var(--btn-inactive);
  color: var(--theme-dark);
}
a:hover {
  background: var(--theme-light);
  color: var(--theme-dark);
}

a.preview:hover,
.btn-full-screen,
.btn-full-screen:hover {
  background: var(--theme-light);
  color: var(--theme-red);
  font-weight: bold;
}

footer {
  float: center;
  background: var(--theme-dark);
  padding: 14px 0 14px 0;
  margin-bottom: 0px;
  width: 100%;
  /* position: sticky; */
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;

  display: grid;
  grid-template-columns: 1fr 3fr 1fr; 
}

.left, .right {
  align-self: end;
}
.left {
  justify-self: start;
}
.right {
  justify-self: end;
}

</style>

