<template>
  <div>
    <ul>
      <li>
        <input type="text" required placeholder="Snippets" />
      </li>
      <li>
        <input type="number" placeholder="Cursor position" step="1" />
      </li>
      <li>
        Snippet Type:
        <select v-model="isMdSnippet">
          <option v-bind:value="true">Markdown</option>
          <option v-bind:value="false">Math</option>
        </select>
      </li>
      <li>
        <button>Add Snippet</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMdSnippet: true
    };
  }
};
</script>


<style scoped>
li {
  list-style-type: none;
  margin: 10px 0;
}
li:last-child {
    /*float: center;*/
}
</style>

