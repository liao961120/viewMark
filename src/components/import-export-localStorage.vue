<template>
    <div class="outer">
        <div class="grid">
            <div class="articleIO">
                <h3>Articles</h3>
                <p>
                    Articles in
                    <a href="/#/reader">
                        <b>Reader</b>
                    </a>.
                </p>
                <button @click="exportJSON('md-articles')">Export</button>
                <code class="out-name">md-articles.json</code>

                <input type="file" ref="md-articles" @change="loadJSON('md-articles')" />
                <button @click="importJSON('md-articles')" :disabled="mdArticles == ''">Import</button>
            </div>

            <div class="mdSnippetIO">
                <h3>Markdown Snippets</h3>
                <p>Markdown snippets in markdown editor.</p>
                <button @click="exportJSON('md-snippets')">Export</button>
                <code class="out-name">md-snippets.json</code>

                <input type="file" ref="md-snippets" @change="loadJSON('md-snippets')" />
                <button @click="importJSON('md-snippets')" :disabled="mdSnippets == ''">Import</button>
            </div>

            <div class="mathSnippetIO">
                <h3>Math Snippets</h3>
                <p>Math snippets in math editor.</p>
                <button @click="exportJSON('math-snippets')">Export</button>
                <code class="out-name">math-snippets.json</code>

                <input type="file" ref="math-snippets" @change="loadJSON('math-snippets')" />
                <button @click="importJSON('math-snippets')" :disabled="mathSnippets == ''">Import</button>
            </div>
            <div class="configureIO">
                <!-- for syntax highligt, printing css -->
                <h3>Settings</h3>
                <p>CSS styles and syntax highlighting.</p>
                <button @click="exportSettings">Export</button>
                <code class="out-name">settings.json</code>

                <input type="file" ref="settings-input" @change="loadSettings" />
                <button @click="importSettings" :disabled="settings == ''">Import</button>
            </div>
        </div>
        <footer>
            <ul class="left"></ul>
            <ul></ul>
            <ul class="right"></ul>
        </footer>
    </div>
</template>

<script>
import { bus } from "../main";

export default {
    data() {
        return {
            mdArticles: "",
            mathSnippets: "",
            mdSnippets: "",
            settings: ""
        };
    },
    methods: {
        exportJSON: function(type) {
            if (!localStorage.getItem(type)) return;
            this.saveBlob(`${type}.json`, localStorage.getItem(type));
        },
        loadJSON: function(type) {
            var blob = this.$refs[type].files[0];
            blob.text()
                .then(function(text) {
                    // https://developer.mozilla.org/en-US/docs/Web/API/Blob/text
                    return JSON.parse(text);
                })
                .then(data => {
                    this[this.toCamel(type)] = data;
                });
        },
        importJSON: function(type) {
            var camelCase = this.toCamel(type);
            var outString = JSON.stringify(this[camelCase]);
            localStorage.setItem(type, outString);

            // Clean up
            document.querySelectorAll("input").forEach(ele => {
                ele.value = "";
            });
            this[camelCase] = "";
            if (window.confirm("Reload to update localStorage?")) {
                setTimeout(() => {
                    location.reload();
                }, 250);
            }
        },

        exportSettings: function() {
            // Combine multiple localStorage files
            var mediaPrint = localStorage.getItem("media-print");
            var syntaxHighlight = localStorage.getItem("syntax-highlight");
            var combine = {
                mediaPrint: mediaPrint,
                syntaxHighlight: JSON.parse(syntaxHighlight)
            };
            this.saveBlob("settings.json", JSON.stringify(combine));
        },

        loadSettings: function() {
            var blob = this.$refs["settings-input"].files[0];
            blob.text()
                .then(text => {
                    return JSON.parse(text);
                })
                .then(data => {
                    this.settings = data;
                });
        },

        importSettings: function() {
            localStorage.setItem("media-print", this.settings.mediaPrint);
            localStorage.setItem(
                "syntax-highlight",
                JSON.stringify(this.settings.syntaxHighlight)
            );
            // Clean up
            document.querySelectorAll("input").forEach(ele => {
                ele.value = "";
            });
            this.settings = "";
            if (window.confirm("Reload to update localStorage?")) {
                setTimeout(() => {
                    location.reload();
                }, 250);
            }
        },

        saveBlob: function(filename, data) {
            var blob = new Blob([data], { type: "application/json" });
            var elem = window.document.createElement("a");
            elem.style.display = "none";
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        },
        toCamel: function(snake) {
            return snake.replace(/(\-\w)/g, function(m) {
                return m[1].toUpperCase();
            });
        }
    }
};
</script>

<style scoped>
.outer {
    width: 85%;
    margin: 80px auto;
}
.grid {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 195px;
    gap: 20px;
}
.grid > div {
    border-radius: 15px;
    background: var(--article-box);
    padding: 18px;
    min-width: 255px;
}
.grid > div:hover {
    background: var(--article-box-hover);
}
.grid h3 {
    margin: 0 0 5px 0;
    font-size: 1.3rem;
}
.grid p {
    margin: 0 0 2.5em 0;
    font-size: 0.75rem;
    max-height: 1em;
    font-family: var(--serif);
}
.grid > div > input:nth-of-type(1) {
    display: inline-block;
    width: 65%;
}
.grid > div > button:nth-of-type(2) {
    display: inline-block;
    margin-left: 16%;
    margin-right: 0%;
    width: 19%;
}
.out-name {
    font-size: 0.7em;
    color: #444;
}
.out-name::before {
    content: " ";
}
.out-name::after {
    display: block;
    content: " ";
    margin-bottom: 0.9em;
}
</style>