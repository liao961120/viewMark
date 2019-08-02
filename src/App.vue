<template>
  <div id="app">
    <app-nav></app-nav>
    <!-- <math-editor></math-editor> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- <md-editor></md-editor> -->
  </div>
</template>

<script>
//import mdEditor from "./components/mdEditor";
//import mathEditor from "./components/mathEditor";
//import registerSnippets from "./components/registerSnippets";
import nav from "./components/nav";

export default {
  components: {
    "app-nav": nav
    //"register-snippets": registerSnippets,
    //"md-editor": mdEditor,
    //"math-editor": mathEditor
  }
};
</script>

<style>
@import './assets/variables.css';

html {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", Helvetica, "open sans", sans-serif;
}

nav a {
  font-weight: bold;
  font-family: "Alegreya", Georgia, serif;
  letter-spacing: 0.05em;
  font-size: 0.9em;
}

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

.CodeMirror {
  border: 1px solid #eee;
  overflow-x: hidden;
  height: auto;
  width: 70%;
}

.CodeMirror-scroll {
  min-height: 500px;
}

.CodeMirror-activeline-background.CodeMirror-linebackground {
  background: rgba(100, 100, 100, 0.5);
}

span.CodeMirror-selectedtext {
  color: #263238;
  background-color: rgba(98, 240, 3, 0.863);
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
