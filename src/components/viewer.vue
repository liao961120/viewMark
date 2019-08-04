<template>
  <div class="outer">
    <!-- Multi Articles view -->
    <transition name="fade2">
      <div class="articles" v-show="!viewArticle.show">
        <div class="filter">
          <h2>Search:</h2>
          <ul>
            <li>
              <input type="text" placeholder="title" v-model="filter.title" />
            </li>
            <li>
              <input
                type="text"
                placeholder="tags"
                v-model="filter.tags"
                v-on:focus="filter.focusTags = true"
                v-on:blur="filter.focusTags = false"
              />
              <span v-if="filter.focusTags" class="message">1 space between each tag</span>
            </li>
            <li>
              <input type="text" placeholder="content" v-model="filter.content" />
            </li>
          </ul>
        </div>

        <div
          v-for="(article, idx) in filterGeneric"
          v-bind:key="article.id"
          v-bind:value="idx"
          class="article"
        >
          <h3>
            <a href="#" v-on:click="toArticle(idx)">{{ article.title | trimString(25) }}</a>
          </h3>
          <span class="date">{{ article.date | toDate }}</span>
          <ul class="tags">
            <li v-for="tag in article.tags" v-bind:key="tag.id" class="tag">{{ tag }}</li>
          </ul>
          <div class="content">{{ article.content | trimString(150) }}</div>
          <button v-on:click="deleteArticle(idx)">Delete</button>
        </div>
      </div>
    </transition>

    <!-- Single Article view -->
    <div v-if="viewArticle.idx != null">
      <transition-group name="fade" tag="div">
        <single-article
          v-show="viewArticle.show"
          v-bind:article="articles[viewArticle.idx]"
          v-bind:key="'article'"
          v-bind:viewArticle="viewArticle"
        ></single-article>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { bus } from "../main";

// Components
import singleArticle from "./singleArticle";
import { setTimeout } from "timers";

export default {
  components: {
    "single-article": singleArticle
  },
  data() {
    return {
      articles: [],
      viewArticle: {
        idx: null,
        show: false
      },
      filter: {
        title: "",
        content: "",
        tags: "",
        focusTags: false
      }
    };
  },
  watch: {
    "filter.title": function() {
      this.filter.content = "";
      this.filter.tags = "";
    },
    "filter.content": function() {
      this.filter.title = "";
      this.filter.tags = "";
    },
    "filter.tags": function() {
      this.filter.title = "";
      this.filter.content = "";
    }
  },

  methods: {
    toArticle: function(idx) {
      this.viewArticle.show = false;
      this.viewArticle.idx = null;

      setTimeout(() => {
        this.viewArticle.idx = idx;
        this.viewArticle.show = true;
      }, 100);
    },

    deleteArticle: function(idx) {}
  },

  filters: {
    toDate: function(value) {
      var date = new Date(value);
      return date.toISOString().substr(0, 10);
    },
    trimString: function(value, len) {
      let trimmed = value.substr(0, len);
      if (trimmed != value) trimmed += " ...";
      return trimmed;
    }
  },

  computed: {
    filterGeneric: function() {
      if (this.filter.title != "") return this.filterTitleArticles;
      if (this.filter.content != "") return this.filterContentArticles;
      if (this.filter.tags != "") return this.filterTagsArticles;

      return this.articles;
    },

    filterTitleArticles: function() {
      return this.articles.filter(article => {
        return article.title
          .trim()
          .toLowerCase()
          .includes(this.filter.title.trim().toLowerCase());
      });
    },

    filterContentArticles: function() {
      return this.articles.filter(article => {
        return article.content
          .trim()
          .toLowerCase()
          .includes(this.filter.content.trim().toLowerCase());
      });
    },

    filterTagsArticles: function() {
      var searchTags = this.filter.tags.trim().split(" ");
      return this.articles.filter(article => {
        // Retrieve tags of an article
        var articleTags = [];
        article.tags.forEach(ele => {
          articleTags.push(ele.trim().toLowerCase());
        });
        articleTags.push(""); // empty tag to deal with empty search

        // Filter out article if not every search tags is contained in the article
        for (let i = 0; i < searchTags.length; i++) {
          var hasPartialMatch = [];
          articleTags.forEach(tag => {
            if (tag != "")
              hasPartialMatch.push(
                tag.includes(searchTags[i].trim().toLowerCase())
              );
            else hasPartialMatch.push(true);
          });

          hasPartialMatch.pop(-1);
          if (
            hasPartialMatch.every(ele => {
              return ele == false;
            })
          )
            return false;
        }
        return true;
      });
    }
  },//end computed()


  created() {
    if (localStorage.getItem("md-articles"))
      this.articles = JSON.parse(localStorage.getItem("md-articles"));

    // Update when new article added
    bus.$on("mdInputSaved", () => {
      this.articles = JSON.parse(localStorage.getItem("md-articles"));
    });

    // Navigate back to here from single article
    bus.$on('toReader', () => {
      this.viewArticle.show = false;
      this.viewArticle.idx = null;
    });

  }//end created()
};
</script>


<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

.filter {
  padding: 0 1% 1%;
}
.filter > input {
  display: block;
  margin: 3px 0;
}
.filter > h2 {
  margin: 0.5em 0 0.15em;
}

.articles {
  padding: 0 2.2%;
  margin: 0;
}

.article {
  display: inline-block;
  min-width: 250px;
  width: 21.5%;
  padding: 1%;
  margin: 0.7%;
  border-radius: 3%;
  background: var(--article-box);
  position: relative;
}
.article:hover {
  background: var(--article-box-hover);
}

.article > h3 {
  height: 1.2em;
  margin-top: 0.28em;
  font-size: 1em;
  overflow: hidden;
}

.date {
  font-size: 0.6em;
  font-style: italic;
  position: absolute;
  right: 0;
  top: 0;
  padding: 6px;
}

.tags {
  height: 1em;
}
.tags > li {
  display: inline;
  padding: 0 0.3em 0 0;
  margin: 0;
  font-size: 0.5em;
  font-family: var(--mono);
}
.tags > li::after {
  content: ",";
}
.tags > li:last-child::after {
  content: "";
}

.content {
  font-size: 0.7em;
  font-family: var(--serif);
  overflow-wrap: break-word;
  height: 7em;
  padding: 0 0 5px;
}
</style>
