<template>
  <div class="outer">
    <div class="articleIO">
      <h2>Import/Export Articles</h2>
      <button @click="exportJSON('md-articles')">Export</button>
      <br />

      <input type="file" ref="md-articles" @change="loadJSON('md-articles')" />
      <button @click="importJSON('md-articles')" v-if="mdArticles != ''">Import</button>
      <ul>
        <li v-for="article in mdArticles" :key="article.id">{{ article.title}}</li>
      </ul>
    </div>
    <div class="snippetIO">
      <h2>Import/Export Snippets</h2>
      <button @click="exportJSON('math-snippets')">Export Math Snippets</button>
      <br />

      <input type="file" ref="math-snippets" @change="loadJSON('math-snippets')" />
      <button @click="importJSON('math-snippets')" v-if="mathSnippets != ''">Import</button>
      <ul>
        <li v-for="snippet in mathSnippets" :key="snippet.id">{{ snippet.title }}</li>
      </ul>
    </div>
    <div class="configureIO">
      <!-- for syntax hiighligt, printing css -->
    </div>
  </div>
</template>

<script>
import { bus } from "../main";

export default {
  data() {
    return {
      mdArticles: "",
      mathSnippets: "",
      mdSnippets: ""
    };
  },
  methods: {
    exportJSON: function(type) {
      if (!localStorage.getItem(type)) return;
      this.saveBlob(`${type}.json`, localStorage.getItem(type));
    },
    importJSON: function(type) {
      var camelCase = this.toCamel(type);
      if (this[camelCase] == "") return;

      var outString = JSON.stringify(this[camelCase]);
      localStorage.setItem(type, outString);

      // Clean up
      document.querySelectorAll("input").forEach(ele => {
        ele.value = "";
      });
      this[camelCase] = "";
      if (window.confirm("Reload to update localStorage?")) {
        setTimeout(() => {
          location.reload();
        }, 250);
      }
    },
    loadJSON: function(type) {
      var blob = this.$refs[type].files[0];
      blob
        .text()
        .then(function(text) {
          // https://developer.mozilla.org/en-US/docs/Web/API/Blob/text
          return JSON.parse(text);
        })
        .then(data => {
          this[this.toCamel(type)] = data;
        });
    },
    toCamel: function(snake) {
      return snake.replace(/(\-\w)/g, function(m) {
        return m[1].toUpperCase();
      });
    },
    saveBlob: function(filename, data) {
      var blob = new Blob([data], { type: "application/json" });
      var elem = window.document.createElement("a");
      elem.style.display = "none";
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
  }
};
</script>

<style scoped>
.outer {
  width: 85%;
  margin: 80px auto;
}
</style>