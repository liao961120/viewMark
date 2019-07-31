<template>
  <div action>
    <input type="text" id="title" v-model.lazy="title" required placeholder="Title" />
    <button v-on:click="saveArticle" v-bind:disabled="mdInputSaved">Save</button>
    <select v-model="toLoad">
      <option v-for="(article, idx) in articles" v-bind:key="article.id" v-bind:value="idx">
        <code>{{ article.date | toDate }}</code>
        {{ article.title }}
      </option>
    </select>
    <button v-on:click="loadArticle(idx)">Load Article</button>
    <!-- <button v-on:click="saveArticle">save</button> -->
    <br />

    <div class="preview">
      <ul>
        <li>title: {{ title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
/*
ToDo:
  * Remove articles
*/

// Event bus
import { bus } from "../main";

export default {
  props: {
    mdInput: {
      type: String
    }
  },
  data() {
    return {
      mdInputSaved: false,
      articles: [],
      toLoad: 0,
      title: ""
    };
  },
  methods: {
    saveArticle: function() {

      // validity check
      if (!this.title) return;
      if (!this.mdInput) return;
      
      // Check title conflict
      let savedTitles = [];
      let updateIdx = null;
      this.articles.forEach(ele => {savedTitles.push(ele.title);});
      if (savedTitles.includes(this.title)) {
          updateIdx = savedTitles.indexOf(this.title);
          var keepOld = !confirm('Article exists! Overwrite?');
          if (keepOld) return
      }

      // Create article obj
      var now = new Date().getTime();
      var article = {
        date: now,
        title: this.title,
        content: this.mdInput
      };

      // Add new article
      if (updateIdx)
        this.articles[updateIdx] = article;
      else 
        this.articles.push(article);
      localStorage.setItem("md-articles", JSON.stringify(this.articles));

      // Update status
      bus.$emit("mdInputSaved", true);
      this.title = '';
    },

    removeArticle: function(idx) {
      this.articles.splice(idx, 1);
      localStorage.setItem("md-articles", JSON.stringify(this.articles));
    },

    loadArticle: function() {
      if (this.mdInputSaved)
        bus.$emit("loadArticle", this.articles[this.toLoad].content);
      else 
        alert('Markdown content not saved!')
      // Cleaup
      this.title = '';
    }
  },


  mounted() {
    if (localStorage.getItem("md-articles")) {
      try {
        this.articles = JSON.parse(localStorage.getItem("md-articles"));
      } catch (error) {
        localStorage.removeItem("md-articles");
      }
    }
  },
  created() {
    // listen to 'mdInputSaved'
    bus.$on("mdInputSaved", data => {
      this.mdInputSaved = data;
    });
  },
  filters: {
    toDate: function(value) {
      var date = new Date(value);
      return date.toISOString().substr(0, 10);
    }
  }
};
</script>

<style scoped>
</style>


