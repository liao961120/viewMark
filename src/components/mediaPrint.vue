<template>
    <div class="outer">
        <codemirror v-model.lazy="mediaPrint" :options="cmOptions"></codemirror>
        <footer>
            <ul class="left"></ul>
            <ul class="center">
                <li></li>
            </ul>
            <ul class="right">
                <li>
                    <a @click="update">Update</a>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
/* eslint-disable */
import "codemirror/lib/codemirror.css";
import "codemirror/mode/css/css";
import "codemirror/theme/material.css";
// require active-line.js
import "codemirror/addon/selection/active-line";
import "codemirror/addon/selection/mark-selection";

export default {
    data() {
        return {
            cmOptions: {
                // codemirror options
                tabSize: 2,
                mode: "css",
                theme: "material",
                styleSelectedText: true, //enable styling with .CodeMirror-selectedtext
                styleActiveLine: true,
                lineNumbers: true,
                lineWrapping: true,
                extraKeys: {
                    // Tab to space
                    Tab: function(cm) {
                        var spaces = Array(cm.getOption("indentUnit") + 1).join(
                            " "
                        );
                        cm.replaceSelection(spaces);
                    }
                }
            },
            mediaPrint: ""
        };
    },
    methods: {
        update: function() {
            localStorage.setItem("media-print", this.mediaPrint);
            this.loadStyle();
        },
        loadStyle: function() {
            var style = document.querySelector("style.media-print");
            style.innerText = this.mediaPrint;
        }
    },
    created() {
        var mediaPrint = localStorage.getItem("media-print");
        if (mediaPrint) this.mediaPrint = mediaPrint;
        else {
            this.$http
                .get("./data/print.css.json")
                .then(data => {
                    return data.json();
                })
                .then(data => {
                    this.mediaPrint = data;
                });
        }
    },
    mounted() {
        var style = document.querySelector("style.media-print");
        if (!style) {
            style = document.createElement("style");
            style.className = "media-print";
        }
        document.head.append(style);
        this.loadStyle();
    }
};
</script>

<style scoped>
.outer {
    width: 75%;
    margin-left: auto;
    margin-right: auto;
}
button {
    display: block;
    margin: 0 10% 0 auto;
}
</style>

