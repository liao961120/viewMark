<template>
  <footer>
    <ul class="left">
      <li></li>
    </ul>
    <ul></ul>
    <ul class="right"></ul>
  </footer>
</template>

<script>
</script>

<style scoped>
ul {
  list-style-type: none;
  text-align: center;
  margin: 1.5px 0;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 5px;
  padding: 10px 0px;
}
a {
  font-size: 0.85em;
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 10px;
  background: var(--btn-inactive);
  color: var(--theme-dark);
}
a:hover {
  background: var(--theme-light);
  color: var(--theme-dark);
}

a.left:hover,
.btn-active,
.btn-full-screen,
.btn-full-screen:hover {
  background: var(--theme-light);
  color: var(--button-on);
}

footer {
  float: center;
  background: var(--theme-dark);
  padding: 0 8px;
  margin-bottom: 0px;
  width: 100%;
  min-height: 5%;
  /* position: sticky; */
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;

  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
}

.left,
.right {
  align-self: end;
  margin: 1.5px 3px;
}

.left li,
.right li {
  margin: 4px;
  padding: 2px;
}

.left a,
.right a {
  font-size: 0.8em;
  font-weight: bold;
  margin: 0px;
  padding: 5px;
}

.left {
  justify-self: start;
}
.right {
  justify-self: end;
}
</style>

