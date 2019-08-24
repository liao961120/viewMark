<template>
  <div class="outer">
    <div class="navigate">
      <router-link to="/syntax" tag="div" class="one">
        <h3>Syntax Highlight</h3>
        <p>Add syntax highlighting support for Markdown code chunks.</p>
      </router-link>

      <router-link to="/print" tag="div" class="two">
        <h3>Printing Styles</h3>
        <p>
          Configure CSS
          <code>@media print</code> for article printing with the browser.
        </p>
      </router-link>

      <router-link to="/importExport" tag="div" class="three">
        <h3>Data I/O</h3>
        <p>Save/Import articles, snippets, and settings to/from JSON files.</p>
      </router-link>
    </div>

    <footer>
      <ul class="left"></ul>
      <ul></ul>
      <ul class="right"></ul>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.outer {
  margin: 0;
  padding: 0;
}
.navigate {
  width: 80%;
  margin: 0 auto;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, minmax(200px, auto));
  gap: 20px 30px;
}
.one,
.two,
.three {
  grid-row: 2 / 3;
}
.one {
  grid-column: 1 / 2;
}
.two {
  grid-column: 2 / 3;
}
.three {
  grid-column: 3 / 4;
}
.navigate > div {
  cursor: pointer;
  margin: 0;
  padding: 18px;
  background: var(--article-box);
  border-radius: 15px;
  min-width: 200px;
}
.navigate > div:hover {
  background: var(--article-box-hover);
}
.navigate h3 {
  margin: 0;
}

.article > h3 {
  height: 1.2em;
  margin-top: 0.28em;
  font-size: 1em;
  overflow: hidden;
}
</style>
