<template>
  <div class="outer">
    <h2>Syntax Highlighting for Code Chunks</h2>
    <input type="text" v-model="search" placeholder="Search" />

    <transition-group name="fade">
      <div v-if="showMessage" class="message" :key="'div'">
        Add syntax highlighting for
        <br />
        <span v-for="lang in toAdd" :key="lang.id" class="added-lang">{{ lang }}</span>
      </div>
    </transition-group>

    <div class="match">
      <div class="lang" v-for="lang in matchedLangs" :key="lang.id">
        <input
          type="checkbox"
          :value="lang"
          v-model="toAdd"
          :disabled="alreadyAdded.includes(lang) ? true : false"
        />
        <label>{{ lang }}</label>
      </div>
    </div>
    <footer>
      <ul class="left">
        <a onclick="window.history.back()" class="back">Back</a>
      </ul>
      <ul></ul>
      <ul class="right">
        <a @click="addSyntax">Highlight</a>
      </ul>
    </footer>
  </div>
</template>


<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      search: "",
      availLangs: [],
      toAdd: [],
      alreadyAdded: [],
      showMessage: false
    };
  },

  computed: {
    matchedLangs: function() {
      return this.availLangs.filter(lang => {
        return lang.includes(this.search.toLowerCase());
      });
    }
  },

  methods: {
    addSyntax: function() {
      this.toAdd.forEach(lang => {
        if (this.alreadyAdded.includes(lang)) return;
        this.alreadyAdded.unshift(lang); // Update added history
        this.addSyntaxToDOM(lang); // Attach script to dom
      });
      localStorage.setItem(
        "syntax-highlight",
        JSON.stringify(this.alreadyAdded)
      );
      // clean up
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.toAdd = [];
      }, 2500);
      setTimeout(() => {this.search = '';}, 100);
    },

    addSyntaxToDOM: function(lang) {
      const script = document.createElement("script");
      script.src = `./data/prism-components/prism-${lang}.min.js`;
      document.head.append(script.cloneNode());
    }
  },

  created() {
    // Get supported list
    this.$http
      .get("./data/supportLangs.json")
      .then(function(data) {
        return data.json();
      })
      .then(function(data) {
        for (let i = 0; i < data.length; i++) {
          this.availLangs.push(data[i]);
        }
      });
  },

  mounted() {
    // Retrieve previous stored syntax
    if (localStorage.getItem("syntax-highlight")) {
      this.alreadyAdded = JSON.parse(localStorage.getItem("syntax-highlight"));

      this.alreadyAdded.forEach(lang => {
        this.addSyntaxToDOM(lang);
      });
    }
  }
};
</script>

<style scoped>
.outer {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.match {
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.match > div {
  margin: 1.5px 0;
}
label {
  font-family: var(--mono);
  font-size: 0.9em;
}
input:disabled + label {
  color: gray;
}
input:disabled {
  position: relative;
}
input:disabled:before {
  position: absolute;
  top: -5px;
  left: -1.5px;
  content: "✓";
  font-size: 20px;
  color: green;
  font-weight: bold;
}

.message {
  position: fixed;
  top: 40%;
  left: 38.5%;
  width: 25%;
  min-height: 2.5em;
  padding: 10px;
  background: rgb(245, 245, 245);
  color: black;
  border-radius: 20px;
  border: 1px #444 solid;
  text-align: center;
  vertical-align: middle;
  font-size: 0.9em;
}
.added-lang {
  display: inline-block;
  margin: 3px 4px 0 0;
  padding: 4px 2px 2px 2px;
  font-family: var(--mono);
  color: blue;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
