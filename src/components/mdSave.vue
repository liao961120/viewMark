<template>
  <div class="modal">
    <div class="modal-content">
      <div class="update" v-show="cache.title != ''">
        <h3>Current article</h3>
        <ul>
          <li>{{ cache.title }}</li>
          <li><span v-for="tag in cache.tags" :key="tag.id" class="tag">
              {{ tag }}
          </span></li>

          <li class="submit">
            <span v-show="articleUpdated" class="message">Content Updated!</span>
            <button @click="updateArticle">Update</button>
          </li>
        </ul>
      </div>
      <div class="save">
        <h3>New article</h3>
        <ul>
          <li>
            <input
              type="text"
              id="title"
              v-model.lazy="newArticle.title"
              required
              placeholder="Title"
            />
            <span class="preview">{{ this.newArticle.title }}</span>
          </li>
          <li>
            <input type="text" placeholder="Tag" v-model="tag" />
            <button v-on:click="addTag">Add</button>
            <div class="inline-list preview tags">
              <span class="tag" v-for="tag in newArticle.tags" v-bind:key="tag.id">{{ tag }}</span>
            </div>
          </li>
          <li class="submit">
            <span v-show="mdInputSaved" class="message">Article saved!</span>
            <button v-on:click="saveArticle" v-bind:disabled="mdInputSaved">Create</button>
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
          <li class="submit">
            <button v-on:click="loadArticle">Load</button>
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
    cache: {
      type: Object
    }
  },
  data() {
    return {
      mdInputSaved: false,
      articleUpdated: false,
      articles: [],
      toLoad: 0,
      tag: "",
      newArticle: {
        id: "",
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
    updateArticle: function() {
      // Get target article
      let savedTitles = [];
      let updateIdx = null;
      this.articles.forEach(ele => {
        savedTitles.push(ele.title);
      });
      if (!savedTitles.includes(this.cache.title)) {
        alert("bug at mdSave l.128");
        return;
      }

      updateIdx = savedTitles.indexOf(this.cache.title);
      // create new article
      const article = {
        id: this.cache.id,
        date: this.cache.date,
        title: this.cache.title,
        tags: this.cache.tags,
        content: this.cache.mdInput
      };
      // Save to localStorage
      this.articles[updateIdx] = utils.deepCopy(article);
      localStorage.setItem("md-articles", JSON.stringify(this.articles));

      // Update status
      bus.$emit("mdInputSaved", true);
      this.articleUpdated = true;
      setTimeout(() => {
        this.articleUpdated = false;
      }, 850);
    },
    saveArticle: function() {
      // validity check
      if (this.newArticle.title == "") return;
      if (this.cache.mdInput == "") return;

      // Check title conflict
      let savedTitles = [];
      let updateIdx = null;
      this.articles.forEach(ele => {
        savedTitles.push(ele.title);
      });
      if (savedTitles.includes(this.newArticle.title)) {
        alert("Article already exist!\nPlease choose a new title.");
        this.newArticle.title = "";
        this.newArticle.tags = [];
        return;
      }

      // Create article obj
      this.newArticle.id = new Date().getTime();
      this.newArticle.date = new Date().getTime();
      this.newArticle.content = this.cache.mdInput;

      // Add new article
      var article = utils.deepCopy(this.newArticle);
      this.articles.unshift(article);

      localStorage.setItem("md-articles", JSON.stringify(this.articles));

      // Update status
      bus.$emit("mdInputSaved", true);
      bus.$emit("loadArticle", this.articles[0])
      this.newArticle.title = "";
      this.newArticle.content = "";
      this.newArticle.tags = [];
    },

    removeArticle: function(idx) {
      this.articles.splice(idx, 1);
      localStorage.setItem("md-articles", JSON.stringify(this.articles));
    },

    loadArticle: function() {
      if (this.mdInputSaved)
        bus.$emit("loadArticle", this.articles[this.toLoad]);
      else if (confirm("Markdown content not saved!"))
        bus.$emit("loadArticle", this.articles[this.toLoad]);

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
    }

    document.querySelector(".close-button").onclick = toggleModal;
  },
  created() {
    // listen to 'mdInputSaved'
    bus.$on("mdInputSaved", data => {
      this.mdInputSaved = data;
    });

    // listen to localStorage update
    bus.$on("mdArticlesUpdated", data => {
      this.articles = data.articles;
    })
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
select {
  max-width: 35%;
}
.message {
  display: inline-block;
  color: rgb(107, 107, 107);
  background: rgb(231, 231, 231);
  border-radius: 4.5px;
  padding: 1px 3px;
  font-size: 0.7em;
}
.preview {
  display: inline-block;
  text-align: right;
  padding: 0 1em;
  margin: 0 auto;
  max-width: 15em;
  max-height: 1.5em;
  font-size: 0.8em;
}

.preview.inline-list {
  padding-left: 1em;
}

.preview code {
  font-size: 0.8em;
}

.submit {
  display: block;
  position: relative;
}
.submit > button {
  display: inline-block;
  width: 10.5%;
  margin: 15px 0 15px 89%;
}
.submit > span {
  position: absolute;
  top: 30%;
  left: 0%;
}

.modal-content > div {
  padding: 1.5px 8px;
  margin: 5px 0 15px;
  border-radius: 5px;
}
.modal-content > div:nth-child(1) {
  background: #8785ff78;
}
.modal-content > div:nth-child(1) li:nth-child(1) {
  font-family: var(--serif);
}
.modal-content > div:nth-child(2) {
  background: #fdff85;
}
.modal-content > div:nth-child(3) {
  background: #ff878578;
  margin-bottom: 0;
}
.modal-content .tag {
  font-family: var(--mono);
  font-size: 0.65em;
  display: inline-block;
  padding: 1px 3px;
  margin: 0 2px;
  border-radius: 5px;
  background: #6461ff;
  color: white;
}
.modal-content .inline-list .tag {
  font-size: 0.75em;
  background: #8e9100;
  margin-top: 0.7em;
}

.modal-content ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.modal-content h3 {
  margin: 10px 0;
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
  padding: 0.6rem 1rem;
  width: 28rem;
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


