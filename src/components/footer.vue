<template>
  <footer>
    <ul class="left">
      <template v-if="isMdSnippet">
        <li>
          <a href="#" v-on:click="toggleFullScreen" class="preview left">Preview</a>
        </li>
        <li>
          <a href="#" v-on:click="toggleModal" class="left toggle-modal">Save/Load</a>
        </li>

        <template v-if="isMathSnippet"></template>
      </template>
    </ul>
    <ul>
      <li v-for="snippet in snippets" v-bind:key="snippet.id">
        <a href="#" v-on:click="insertSnippet(snippet)">{{ snippet.name }}</a>
      </li>
    </ul>
    <ul class="right">
      <template v-if="isMdSnippet">
        <li>
          <a href="#" v-on:click="addSyntaxHighlight" class="prism right">Highlight Code</a>
        </li>
      </template>
      <template v-if="isMathSnippet"></template>
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
    isMathSnippet: {
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

    ///////////////// Methods for math editor ////////////////////////////

    ///////////////// Methods for md editor //////////////////////////////
    toggleFullScreen: function(event) {
      bus.$emit("toggleFullScreen", {});
      setTimeout(() => {
        event.target.classList.toggle("btn-full-screen");
      }, 100);
    },

    toggleModal: function(event) {
      var modal = document.querySelector(".modal");
      modal.classList.toggle("show-modal");

      document.querySelector("a.toggle-modal").classList.toggle("btn-active");
    },

    addSyntaxHighlight: function(event) {
      const lang = prompt(
        "Enter a programming language for syntax highlighting.",
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
  },

  mounted() {}
};
</script>

<style scoped>
ul {
  list-style-type: none;
  text-align: center;
  margin: 1.5px 0;
  padding: 0;
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

a.left:hover,
.btn-active,
.btn-full-screen,
.btn-full-screen:hover {
  background: var(--theme-light);
  color: var(--button-on);
}

footer {
  background: var(--theme-dark);
  padding: 2px 3px 5px;
  margin-bottom: 0px;
  width: 100%;
  min-height: 5%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;

  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
}

.left,
.right {
  align-self: end;
  margin: 1.5px 3px;
}

.left li,
.right li {
  margin: 4px;
  padding: 2px;
}

.left a,
.right a {
  font-size: 0.8em;
  font-weight: bold;
  margin: 0px;
  padding: 5px;
}

.left {
  justify-self: start;
}
.right {
  justify-self: end;
}
</style>

