<template>
  <div class="outer">
    <textarea v-model.lazy="mediaPrint"></textarea>
    <button @click="update">Update</button>
    <footer>
      <ul class="left">
        <li>
          <a onclick="window.history.back()" class="back">Back</a>
        </li>
      </ul>
      <ul class="center">
        <li></li>
      </ul>
      <ul class="right">
        <li></li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaPrint: `@media print {
  nav, footer {
    display: none !important;
  }
  div.outer {
    margin: 0 auto;
  }
  .single-article {
    width: 100% !important;
    margin: 1cm !important;
  }
  .article-info {
    display: grid;
    grid-template-columns: 1fr 1fr !important;
  }
  .article-info .date {
    text-align: left !important;
  }
  .content {
    padding: 0 !important;
    margin-top: 1cm !important;
  }
}`
    };
  },
  methods: {
    update: function() {
      localStorage.setItem("media-print", this.mediaPrint);
      this.loadStyle();
    },
    loadStyle: function() {
      var style = document.querySelector("style.media-print");
      style.innerText = this.mediaPrint;
    }
  },
  created() {
    var mediaPrint = localStorage.getItem("media-print");
    if (mediaPrint) this.mediaPrint = mediaPrint;
  },
  mounted() {
    var style = document.querySelector("style.media-print");
    if (!style) {
      style = document.createElement("style");
      style.className = "media-print";
    }
    document.head.append(style);
    this.loadStyle();
  }
};
</script>

<style>
textarea {
  display: block;
  width: 80%;
  margin: 20px auto;
  height: 25rem;
  font-size: 0.9em;
}
button {
  display: block;
  margin: 0 10% 0 auto;
}
</style>

