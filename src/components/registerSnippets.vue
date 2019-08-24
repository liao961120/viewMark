<template>
    <div class="outer">
        <h2>Register new snippet</h2>
        <form>
            <ul>
                <li>
                    <input
                        type="text"
                        placeholder="Name"
                        v-model.lazy="toRegister.name"
                        maxlength="18"
                    />
                </li>
                <li>
                    <input type="text" placeholder="Snippet" v-model="toRegister.snippet" />
                </li>
                <li>
                    Cursor (start | end) :
                    <br />
                    <input
                        type="number"
                        step="1"
                        min="0"
                        v-model="toRegister.cursorPos[0]"
                        class="select-start"
                    />
                    <input
                        type="number"
                        step="1"
                        min="0"
                        v-model="toRegister.cursorPos[1]"
                        class="select-end"
                    />
                </li>
                <li>
                    Snippet for:
                    <select v-model="toRegister.isMdSnippet" required>
                        <option v-bind:value="true">Markdown</option>
                        <option v-bind:value="false">Math</option>
                    </select>
                </li>
                <li>
                    <button v-on:click="register">Add Snippet</button>
                </li>
            </ul>

            <p>
                <span
                    v-for="(ch, i) in word2array(toRegister.snippet)"
                    v-bind:key="ch.id"
                    v-bind:data-pos="i"
                    v-bind:class="{'selected': isSelected(i)}"
                >{{ ch }}</span>
            </p>
        </form>

        <div class="snippets-preview">
            <table>
                <th>Name</th>
                <th>Snippet (Md)</th>
                <th>Rendered</th>
                <tr v-for="(snippet, idx) in mdSnippets" v-bind:key="snippet.id">
                    <td class="snippet-name">{{ snippet.name }}</td>
                    <td class="snippet">{{ snippet.snippet }}</td>
                    <td class="preview" v-html="toMd(snippet.snippet)"></td>
                    <td>
                        <button v-on:click="removeSnippet(idx, snippet.isMdSnippet)">Remove</button>
                    </td>
                </tr>
            </table>

            <table>
                <th>Name</th>
                <th>Snippet (Math)</th>
                <th>Rendered</th>
                <tr v-for="(snippet, idx) in mathSnippets" v-bind:key="snippet.id">
                    <td class="snippet-name">{{ snippet.name }}</td>
                    <td class="snippet">{{ snippet.snippet }}</td>
                    <td class="preview latex" v-html="toMath(snippet.snippet)"></td>
                    <td>
                        <button v-on:click="removeSnippet(idx, snippet.isMdSnippet)">Remove</button>
                    </td>
                </tr>
            </table>
        </div>

        <footer>
            <ul class="left">
                <li></li>
            </ul>
            <ul></ul>
            <ul class="right"></ul>
        </footer>
    </div>
</template>

<script>
// Markdown parser
var md = require("markdown-it")()
    .use(require("markdown-it-footnote"))
    .use(require("markdown-it-anchor").default);

// katex
import katex from "katex";
import "katex/dist/katex.min.css";

// Components

// Event bus
import { bus } from "../main";

export default {
    data() {
        return {
            toRegister: {
                name: "",
                snippet: "",
                cursorPos: [0, 0],
                isMdSnippet: true
            },
            mdSnippets: [],
            mathSnippets: []
        };
    }, //end data

    methods: {
        register: function() {
            // Update data
            if (this.toRegister.isMdSnippet)
                this.mdSnippets.push(Object.assign({}, this.toRegister));
            if (!this.toRegister.isMdSnippet)
                this.mathSnippets.push(Object.assign({}, this.toRegister));

            // Save to localStorage
            if (this.mdSnippets.length > 0)
                localStorage.setItem(
                    "md-snippets",
                    JSON.stringify(this.mdSnippets)
                );
            if (this.mathSnippets.length > 0)
                localStorage.setItem(
                    "math-snippets",
                    JSON.stringify(this.mathSnippets)
                );

            // Clean up
            this.toRegister.snippet = "";
            this.toRegister.name = "";
            this.toRegister.cursorPos[0] = 0;
            this.toRegister.cursorPos[1] = 0;

            // Emit event
            bus.$emit("updateSnippets", {
                mdSnippets: this.mdSnippets,
                mathSnippets: this.mathSnippets
            });
        },

        removeSnippet: function(idx, isMdSnippet) {
            if (isMdSnippet) this.mdSnippets.splice(idx, 1);
            else this.mathSnippets.splice(idx, 1);

            localStorage.setItem(
                "md-snippets",
                JSON.stringify(this.mdSnippets)
            );
            localStorage.setItem(
                "math-snippets",
                JSON.stringify(this.mathSnippets)
            );

            // Emit event
            bus.$emit("updateSnippets", {
                mdSnippets: this.mdSnippets,
                mathSnippets: this.mathSnippets
            });
        },

        toMd: function(value) {
            // render Markdown
            var temp = document.createElement("div");
            temp.innerHTML = md.render(value);
            return temp.innerHTML;
        },

        toMath: function(value) {
            var html = katex.renderToString(value, { throwOnError: false });
            return html;
        },

        word2array: function(str) {
            var a = [];
            for (let i = 0; i < str.length; i++) a.push(str.charAt(i));
            return a;
        },

        isSelected: function(pos) {
            var cursorPos = this.toRegister.cursorPos;
            if (parseInt(cursorPos[0]) <= pos && pos < parseInt(cursorPos[1]))
                return true;
            return false;
        }
    },

    computed: {},

    watch: {
        "toRegister.snippet": function() {
            this.toRegister.cursorPos[1] = this.toRegister.snippet.length;
        },
        "toRegister.cursorPos": function() {
            var start = parseInt(this.toRegister.cursorPos[0]);
            var end = parseInt(this.toRegister.cursorPos[1]);

            if (start > this.toRegister.snippet.length)
                this.toRegister.cursorPos[0] = this.toRegister.snippet.length;

            if (end > this.toRegister.snippet.length)
                this.toRegister.cursorPos[1] = this.toRegister.snippet.length;

            if (start > end)
                this.toRegister.cursorPos[1] = this.toRegister.cursorPos[0];

            this.toRegister.cursorPos[1] = parseInt(
                this.toRegister.cursorPos[1]
            );
            this.toRegister.cursorPos[2] = parseInt(
                this.toRegister.cursorPos[2]
            );
        }
    },

    created() {
        // Load snippets
        if (localStorage.getItem("md-snippets"))
            this.mdSnippets = JSON.parse(localStorage.getItem("md-snippets"));
        if (localStorage.getItem("math-snippets"))
            this.mathSnippets = JSON.parse(
                localStorage.getItem("math-snippets")
            );

        // Emit event
        bus.$emit("updateSnippets", {
            mdSnippets: this.mdSnippets,
            mathSnippets: this.mathSnippets
        });
    },

    filters: {}
};
</script>


<style scoped>
.outer {
    margin: 55px 0 0 0;
    padding: 0;
}
h2 {
    text-align: center;
}
form {
    margin: 10px auto;
    width: 12%;
    min-width: 218px;
    padding: 0 0;
}
form > ul {
    margin: 0;
    padding: 0 10%;
}

form input {
    width: 98%;
}
form .select-start,
.select-end {
    display: inline-block;
    width: 38%;
    margin: 4px 0 6px;
    padding: 0;
}
form .select-start {
    margin-left: 0;
    margin-right: 19%;
    padding: 0;
}
/* 
input[type="number"] {
  width: 2.75em;
  margin: 0 0 0 10px;
} */
form > h3,
p {
    text-align: center;
}

form > p {
    border: black solid 1px;
    border-radius: 5px;
    padding: 10px;
    font-size: 0.8em;
    letter-spacing: 0;
    font-family: var(--mono);
    overflow-wrap: break-word;
}

span.selected {
    background-color: rgba(133, 255, 63, 0.63);
}
li {
    list-style-type: none;
    margin: 10px 0;
    font-size: 0.85em;
}

div.snippets-preview {
    display: flex;
}
div > table {
    flex: 50%;
    margin: 5%;
}
.snippet {
    font-family: var(--mono);
    font-size: 0.8em;
    letter-spacing: 0.05em;
}
th,
td {
    height: 3.2em;
    text-align: center;
    vertical-align: middle;
}
</style>

