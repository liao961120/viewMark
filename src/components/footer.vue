<template>
  <footer>
    <ul class="left">
      <template v-if="isMdSnippet">
        <li>
          <a v-on:click="toggleFullScreen" class="preview left">Preview</a>
        </li>
        <li>
          <a v-on:click="toggleModal" class="left toggle-modal">Save/Load</a>
        </li>

        <template v-if="isMathSnippet"></template>
      </template>
    </ul>
    <ul>
      <li v-for="snippet in snippets" v-bind:key="snippet.id">
        <a v-on:click="insertSnippet(snippet)">{{ snippet.name }}</a>
      </li>
    </ul>
    <ul class="right">
      <template v-if="isMdSnippet">
        <li>
          <a v-on:click="addSyntaxHighlight" class="prism right">Highlight Code</a>
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
      bus.$emit("insertSnippet", snippet);
    },

    ////////////// Methods for math editor //////////////////

    ////////////// Methods for md editor /////////////////
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
