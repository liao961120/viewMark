<template>
  <div class="modal">
    <div class="modal-content">
      <div class="save">
        <h3>Save article</h3>
        <ul>
          <li>
            <input
              type="text"
              id="title"
              v-model.lazy="newArticle.title"
              required
              placeholder="Title"
            />
            <span class="preview">
              <b>{{ this.newArticle.title }}</b>
            </span>
          </li>
          <li>
            <input type="text" placeholder="Tag" v-model="tag" />
            <button v-on:click="addTag">Add</button>
            <ul class="inline-list preview">
              <li v-for="tag in newArticle.tags" v-bind:key="tag.id">{{ tag }}&nbsp;</li>
            </ul>
          </li>
          <li class="submit">
            <button v-on:click="saveArticle" v-bind:disabled="mdInputSaved">Save</button>
            <span v-if="mdInputSaved" class="message">Article saved!</span>
          </li>
        </ul>
      </div>
      <div class="load">
        <h3>Load article</h3>
        <ul>
          <li>
            <select v-model="toLoad">
              <option
                v-for="(article, idx) in articles"
                v-bind:key="article.id"
                v-bind:value="idx"
              >{{ article.title }}</option>
            </select>
            <span v-if="articles[toLoad]" class="preview article-title">
              <b>{{ articles[toLoad].title }}</b> &nbsp;
              <code>{{ articles[toLoad].date | toDate }}</code>
            </span>
          </li>
          <li>
            <button v-on:click="loadArticle" class="submit">Load</button>
          </li>
        </ul>
      </div>
      <br />
      <button class="close-button">Close</button>
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
import utils from "./utils";


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
      tag: "",
      newArticle: {
        date: 0,
        title: "",
        tags: [],
        content: ""
      }
    };
  },

  watch: {
    tag: function() {
      let tag = this.tag;

      if (tag.match(/\s+/)) {
        this.tag = tag.replace(/\s+/, "");
      }
    }
  },

  methods: {
    addTag: function() {
      this.newArticle.tags.push(this.tag);
      this.tag = "";
    },

    saveArticle: function() {
      // validity check
      if (!this.newArticle.title) return;
      if (!this.mdInput) return;

      // Check title conflict
      let savedTitles = [];
      let updateIdx = null;
      this.articles.forEach(ele => {
        savedTitles.push(ele.title);
      });

      if (savedTitles.includes(this.newArticle.title)) {
        updateIdx = savedTitles.indexOf(this.newArticle.title);
        var keepOld = !confirm("Article exists! Overwrite?");
        if (keepOld) return;
      }

      // Create article obj
      this.newArticle.date = new Date().getTime();
      this.newArticle.content = this.mdInput;

      // Add new article
      var article = utils.deepCopy(this.newArticle);

      if (updateIdx != null) {
        this.articles[updateIdx] = article;
      } else this.articles.unshift(article);

      localStorage.setItem("md-articles", JSON.stringify(this.articles));

      // Update status
      bus.$emit("mdInputSaved", true);
      this.newArticle.title = "";
      this.newArticle.tags = [];
    },

    removeArticle: function(idx) {
      this.articles.splice(idx, 1);
      localStorage.setItem("md-articles", JSON.stringify(this.articles));
    },

    loadArticle: function() {
      if (this.mdInputSaved)
        bus.$emit("loadArticle", this.articles[this.toLoad].content);
      else if (confirm("Markdown content not saved!"))
        bus.$emit("loadArticle", this.articles[this.toLoad].content);

      // Cleaup
      this.newArticle.title = "";
      this.newArticle.tags = [];
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

    function toggleModal() {
      var modal = document.querySelector(".modal");
      modal.classList.toggle("show-modal");
      document.querySelector("a.toggle-modal").classList.toggle("btn-active");
    };

    document.querySelector('.close-button').onclick = toggleModal;

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
.inline-list,
.inline-list li {
  display: inline;
  font-size: 0.85em;
  font-style: italic;
}

select {
  max-width: 35%;
}

.preview {
  float: right;
}

.preview.article-title {
  float: none;
  display: block;
  height: 1.2em;
}

.preview code {
  font-size: 0.7em;
}

.submit {
  display: block;
  margin: 15px 0;
}

.modal-content ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.modal-content h3 {
  margin: 10px 0;
}

.modal-content > div {
  margin: 5px 0 20px;
}

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transform: scale(1.1);
  transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
  z-index: 100;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1rem 1.5rem;
  width: 24rem;
  border-radius: 0.5rem;
}

.close-button {
  float: right;
  width: 4em;
  line-height: 1.5rem;
  text-align: center;
  cursor: pointer;
  border-radius: 0.25rem;
  background-color: lightgray;
}

.close-button:hover {
  background-color: darkgray;
}

.show-modal {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
  transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
  z-index: 100;
}
</style>


