<template>
  <footer>
    <ul class="left">
      <template v-if="isMdSnippet">
        <li>
          <a v-on:click="toggleFullScreen" class="preview left ">Preview</a>
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
          <a v-on:click="toggleModal" class="left toggle-modal">Save/Load</a>
        </li>
      </template>
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
    isOneColumn: {
      type: Boolean
    }
  },
  data() {
    return {
      snippets: [],
      mdMode: ["view", "edit"]
    };
  },
  methods: {
    insertSnippet: function(snippet) {
      bus.$emit("insertSnippet", snippet);
    },

    ////////////// Methods for math editor //////////////////

    ////////////// Methods for md editor /////////////////
    toggleFullScreen: function(event) {
      bus.$emit("toggleFullScreen", this.mdMode[0]);

      event.target.classList.toggle("btn-full-screen");
      this.mdMode.push(this.mdMode.shift());
    },

    toggleModal: function(event) {
      var modal = document.querySelector(".modal");
      modal.classList.toggle("show-modal");
      document.querySelector("a.toggle-modal").classList.toggle("btn-active");
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
