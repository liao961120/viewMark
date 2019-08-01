<template>
  <nav>
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
  margin-bottom: 20px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
}
.router-link-exact-active {
  background: #eee;
  color: #444;
}
</style>
