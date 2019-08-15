<template>
  <div class="single-article">
    <h1 class="title">{{ article.title }}</h1>
    <div class="article-info">
      <ul class="tags">
        <li v-for="tag in article.tags" v-bind:key="tag.id" class="tag">{{ tag }}</li>
      </ul>
      <ul>
        <li class="date">{{ article.date | toDate }}</li>
      </ul>
    </div>

    <div v-html="mdRender" class="content md-content"></div>
    <div class="toc">
      <div class="tocbot-toc"></div>
    </div>

    <footer>
      <ul class="left"></ul>
      <ul class="center">
        <li></li>
      </ul>
      <ul class="right"></ul>
    </footer>
  </div>
</template>

<script>
// katex
import "katex/dist/katex.min.css";
import renderMathInElement from "katex/dist/contrib/auto-render.min";
// Markdown parser
const uslug = require("uslug");
const uslugify = s => {
  var url_escaped = String(s).trim().toLowerCase().replace(/\s+/g, '-');
  if (/^[a-zA-Z0-9_-]*$/.test(url_escaped))  // ASCII code
    return encodeURIComponent(url_escaped)
  else  // Unicode
    return uslug(url_escaped.substring(0, 4))
};
var md = require("markdown-it")()
  .use(require("markdown-it-footnote"))
  .use(require("markdown-it-anchor").default, {slugify: uslugify})

var Prism = require("prismjs");
import "prismjs/themes/prism.css";
// Toc
import "tocbot/dist/tocbot.min";
import "tocbot/dist/tocbot.css";

// Event bus
import { bus } from "../main";
// Mixins
import h6Modify from "../mixins/h6Modify";

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

  methods: {},

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
      temp.innerHTML = md.render(this.article.content);
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

    // Add toc to .md-content
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".tocbot-toc",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".md-content",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h2, h3, h4, h5",
      collapseDepth: 3,
    });
  }
};
</script>

<style scoped>
.single-article {
  width: 80%;
  padding: 0 auto;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 4.5fr 1fr;
  grid-auto-rows: minmax(2em, auto);
  grid-template-areas:
    "title toc"
    "article-info toc"
    "md-content toc";
}
.title {
  margin-top: 10px;
  margin-bottom: 5px;
}
.article-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
.content {
  font-size: 1.1em;
  font-family: var(--serif);
  margin: 20px 0;
  padding: 10px 0;
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

/* grid areas */
.single-article > h1 {
  grid-area: title;
}
.single-article > .article-info {
  grid-area: article-info;
}
.single-article > .md-content {
  grid-area: md-content;
}
.single-article > .toc {
  grid-area: toc;
}
</style>

