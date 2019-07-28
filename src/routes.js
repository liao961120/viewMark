import mdEditor from "./components/mdEditor.vue"
import mathEditor from "./components/mathEditor.vue"

export default [
    {path: '/', component: mdEditor},
    {path: '/math', component: mathEditor},
]