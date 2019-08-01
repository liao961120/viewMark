<template>
  <footer>
    <ul>
      <li v-if="this.toggleFullScreen">
        <a href="#" v-on:click="toggleFullScreen">Preview</a>
      </li>
      <slot name="custom-math-btn"></slot>
      <li v-for="snippet in snippets" v-bind:key="snippet.id">
        <a href="#" v-on:click="insertSnippet(snippet)">{{ snippet.name }}</a>
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
        if (this.isFullScreen)
          ele.className = "";
        else
          ele.className = "btn-full-screen";
      }, 100);
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
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  font-size: 0.75em;
  color: #fff;
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 10px;
}
a:hover {
  background: #eee;
  color: #444;
}

footer {
  float: center;
  background: #444;
  padding: 14px 0 14px 0;
  margin-bottom: 0px;
  width: 100%;
  position: sticky;
  bottom: 0;
  z-index: 100;
}

.btn-full-screen {
  background: #eee;
  color: #444;
}
</style>

