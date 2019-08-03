<template>
  <nav>
    <ul class="left">
    </ul>
    <ul>
      <li>
        <router-link to="/">Markdown</router-link>
      </li>
      <li>
        <router-link to="/math">Math</router-link>
      </li>
      <li>
        <router-link to="/snippets">Snippets</router-link>
      </li>
    </ul>
    <ul class="right">
      <li>
        <router-link to="/viewer">Viewer</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
ul {
  list-style-type: none;
  text-align: center;
  margin: 0;
  padding: 0;
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
nav {
  background: #444;
  padding: 14px 0 14px 0;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  font-size: 0.9em;
  
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
}

.router-link-exact-active {
  background: var(--theme-light);
  color: var(--theme-dark);
}
</style>
