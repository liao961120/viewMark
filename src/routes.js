import mdEditor from "./components/mdEditor.vue"
import mathEditor from "./components/mathEditor.vue"
import registerSnippets from "./components/registerSnippets.vue"
import articleViewer from "./components/viewer.vue"
import mediaPrint from "./components/mediaPrint.vue"
import addSyntax from "./components/syntax.vue"

export default [
    {path: '/', component: mdEditor},
    {path: '/math', component: mathEditor},
    {path: '/snippets', component: registerSnippets},
    {path: '/reader', component: articleViewer},
    {path: '/print', component: mediaPrint},
    {path: '/syntax', component: addSyntax},
]