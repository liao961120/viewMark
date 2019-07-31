<template>
  <div id="app">
    <app-nav></app-nav>
    <register-snippets></register-snippets>
    <!-- <math-editor></math-editor> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- <md-editor></md-editor> -->
  </div>
</template>

<script>
import mdEditor from "./components/mdEditor";
import mathEditor from "./components/mathEditor";
import registerSnippets from "./components/registerSnippets";
import nav from "./components/nav";

export default {
  components: {
    "register-snippets": registerSnippets,
    "app-nav": nav,
    "md-editor": mdEditor,
    "math-editor": mathEditor
  }
};
</script>

<style>
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
</style>
