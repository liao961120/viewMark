<template>
  <div>
    <h2>{{ article.title }}</h2>
    <p>{{ article.date | toDate }}</p>
    <ul class="tags">
      <li v-for="tag in article.tags" v-bind:key="tag.id" class="tag">{{ tag }}</li>
    </ul>
    <div class="content">{{ article.content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    article: Object
  },

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

  computed: {},

  created() {}
};
</script>
