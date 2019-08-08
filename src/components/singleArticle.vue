<template>
  <div class="single-article">
    <h1 class="title">{{ article.title }}</h1>
    <div class="article-info">
      <ul class="tags left">
        <li v-for="tag in article.tags" v-bind:key="tag.id" class="tag">{{ tag }}</li>
      </ul>
      <ul class="center"></ul>
      <ul class="right">
        <li class="date">{{ article.date | toDate }}</li>
      </ul>
    </div>
    <div v-html="mdRender" class="content md-content"></div>
    <footer>
      <ul class="left">
      </ul>
      <ul class="center">
        <li></li>
      </ul>
      <ul class="right">
      </ul>
    </footer>
  </div>
</template>

<script>
///// Parsers //////
// katex
import "katex/dist/katex.min.css";
import renderMathInElement from "katex/dist/contrib/auto-render.min";
// Markdown parser
let marked = require("marked");
var Prism = require('prismjs');
import 'prismjs/themes/prism.css';

// Event bus
import { bus } from '../main';
// Mixins
import h6Modify from '../mixins/h6Modify';

export default {
  props: {
    article: Object,
    viewArticle: Object
  },
  mixins: [h6Modify],

  data() {
    return {
      id: parseInt(this.$route.params.id),
      idIsValid: true
      //articles: [],
    };
  },

  methods: {
  },

  filters: {
    toDate: function(value) {
      var date = new Date(value);
      return date.toISOString().substr(0, 10);
    }
  },

  computed: {
    mdRender: function() {
      // render Markdown
      var temp = document.createElement("div");
      temp.innerHTML = marked(this.article.content);
      return temp.innerHTML;
    }
  },

  created() {},

  mounted() {
    // Render math
    var target = document.querySelector(".md-content");
    if (target) {
      renderMathInElement(target, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false }
        ]
      });
    }
    
    // Syntax highlight
    Prism.highlightAll();

    // Modify h6 paragraph
    this.attachH6();
  }
};
</script>

<style scoped>
.single-article {
  width: 80%;
  padding: 10px auto;
  margin: 10px auto;
}

h2 {
  margin: 10px 0;
  font-size: 1.8em;
}

.article-info {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
}
.article-info ul {
  list-style-type: none;
  padding: 0;
}
.article-info .tags,
.article-info .date {
  height: 1em;
  font-size: 0.8em;
}
.article-info .date {
  font-style: italic;
  text-align: right;
}

.md-content {
  overflow-wrap: break-word;
  text-align: justify;
}

li.tag {
  display: inline;
  padding: 3px 5px;
  margin: 1px 8px 1px 0;
  border-radius: 5px;
  background: rgb(194, 194, 194);
  font-family: var(--mono);
}
li.tag:hover {
  background: rgb(211, 211, 211);
}

.content {
  font-size: 1.1em;
  font-family: var(--serif);
  margin: 20px 0;
  padding: 10px 0;
}
</style>

