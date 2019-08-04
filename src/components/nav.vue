<template>
  <nav>
    <ul class="left">
      <li>
        <router-link to="/reader">Reader</router-link>
      </li>
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
    <ul class="right"></ul>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
  background: #444;
  padding: 10px 0 10px 0;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  font-size: 0.9em;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
}
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
  padding: 2.8px 5px;
  border-radius: 10px;
  font-weight: bold;
  font-family: var(--serif);
  letter-spacing: 0.07em;
  font-size: 0.9em;
}
.router-link-exact-active {
  background: var(--theme-light);
  color: var(--theme-dark);
}
</style>
