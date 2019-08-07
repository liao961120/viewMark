<template>
  <div id="app">
    <app-nav></app-nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import nav from "./components/nav";

export default {
  components: {
    "app-nav": nav
  }
};
</script>

<style>
@import "./assets/variables.css";
@import "./assets/print.css";

html {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", Helvetica, "open sans", sans-serif;
}

a {
  user-select: none;
  cursor: pointer;
  color: #002efe;
  text-decoration: underline;
}
a:hover {
  text-decoration: none;
}

/*/////////////// Footer start /////////////////*/
footer {
  background: var(--theme-dark);
  padding: 2px 3px 5px;
  margin-bottom: 0px;
  width: 100%;
  min-height: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
}
footer ul {
  list-style-type: none;
  text-align: center;
  margin: 0px 0;
  padding: 0;
}
footer li {
  display: inline-block;
  margin: 0 3px;
  padding: 3.5px 0px;
}
footer a {
  font-size: 0.75em;
  text-decoration: none;
  padding: 4px 6px;
  border-radius: 10px;
  background: var(--btn-inactive);
  color: var(--theme-dark);
}
footer a:hover {
  background: var(--theme-light);
  color: var(--theme-dark);
}
footer a.left:hover,
footer .btn-active,
footer .btn-full-screen,
footer .btn-full-screen:hover {
  background: var(--theme-light);
  color: var(--button-on);
}
footer .left,
footer .right {
  align-self: end;
  /* margin: 1.5px 3px; */
}
footer .left {
  justify-self: start;
}
footer .right {
  justify-self: end;
}
footer .left li,
footer .right li {
  /* margin: 4px;
  padding: 2px; */
}
footer .left a,
footer .right a {
  font-weight: bold;
}
/* single article style */
footer .back::before {
  content: "\00ab ";
  display: inline-block;
  width: 0;
  opacity: 0;
  transition: 0.4s;
}
footer .back:hover::before {
  opacity: 1;
  width: 0.8em;
}
/*//////////////// Footer end ////////////////////*/

.outer {
  position: relative;
  margin: 70px 0 75px; /* space for nav and footer */
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Alegreya", Georgia, serif;
}

.message {
  display: inline-block;
  padding: 0 0 0 10px;
  font-size: 0.7em;
  color: var(--message);
}

/* Scroll bars */
/* width */
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 3px grey;
  border-radius: 6px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(144, 144, 144);
  border-radius: 6px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(98, 98, 98);
}

/* alegreya-regular - latin */
@font-face {
  font-family: "Alegreya";
  font-style: normal;
  font-weight: 400;
  src: local("Alegreya Regular"), local("Alegreya-Regular"),
    url("./assets/fonts/alegreya-v13-latin-regular.woff2") format("woff2"),
    /* Super Modern Browsers */
      url("./assets/fonts/alegreya-v13-latin-regular.woff") format("woff"); /* Modern Browsers */
}
/* alegreya-italic - latin */
@font-face {
  font-family: "Alegreya";
  font-style: italic;
  font-weight: 400;
  src: local("Alegreya Italic"), local("Alegreya-Italic"),
    url("./assets/fonts/alegreya-v13-latin-italic.woff2") format("woff2"),
    /* Super Modern Browsers */
      url("./assets/fonts/alegreya-v13-latin-italic.woff") format("woff"); /* Modern Browsers */
}
/* alegreya-900 - latin */
@font-face {
  font-family: "Alegreya";
  font-style: normal;
  font-weight: 900;
  src: local("Alegreya Black"), local("Alegreya-Black"),
    url("./assets/fonts/alegreya-v13-latin-900.woff2") format("woff2"),
    /* Super Modern Browsers */
      url("./assets/fonts/alegreya-v13-latin-900.woff") format("woff"); /* Modern Browsers */
}
/* alegreya-900italic - latin */
@font-face {
  font-family: "Alegreya";
  font-style: italic;
  font-weight: 900;
  src: local("Alegreya Black Italic"), local("Alegreya-BlackItalic"),
    url("~./assets/fonts/alegreya-v13-latin-900italic.woff2") format("woff2"),
    /* Super Modern Browsers */
      url("~./assets/fonts/alegreya-v13-latin-900italic.woff") format("woff"); /* Modern Browsers */
}
</style>
