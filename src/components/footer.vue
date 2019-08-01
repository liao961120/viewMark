<template>
  <footer>
    <ul>
      <li>
        <slot name="custom-btn"></slot>
      </li>
      <li v-for="snippet in snippets" v-bind:key="snippet.id">
        <a href="#" v-on:click="insertSnippet(snippet)">{{ snippet.name }}</a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    insertSnippet: function() {}
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  text-align: center;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #fff;
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 10px;
}
a:hover {
  background: #eee;
  color: #444;
}

footer {
  background: #444;
  padding: 14px 0 14px 0;
  margin-bottom: 0px;
  width: 100%;
  position: sticky;
  bottom: 0;
  z-index: 100;
}
</style>

