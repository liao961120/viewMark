(function(t){function e(e){for(var n,a,o=e[0],l=e[1],c=e[2],p=0,d=[];p<o.length;p++)a=o[p],r[a]&&d.push(r[a][0]),r[a]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(d.length)d.shift()();return s.push.apply(s,c||[]),i()}function i(){for(var t,e=0;e<s.length;e++){for(var i=s[e],n=!0,o=1;o<i.length;o++){var l=i[o];0!==r[l]&&(n=!1)}n&&(s.splice(e--,1),t=a(a.s=i[0]))}return t}var n={},r={app:0},s=[];function a(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=n,a.d=function(t,e,i){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(i,n,function(e){return t[e]}.bind(null,n));return i},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;s.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"034f":function(t,e,i){"use strict";var n=i("64a9"),r=i.n(n);r.a},"0a0e":function(t,e,i){},"0d09":function(t,e,i){},1558:function(t,e,i){"use strict";(function(t,e){i("456d"),i("3b2b"),i("4917"),i("ac6a"),i("6b54"),i("a481");var n="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},r=function(t){var e=/\blang(?:uage)?-([\w-]+)\b/i,i=0,n={manual:t.Prism&&t.Prism.manual,disableWorkerMessageHandler:t.Prism&&t.Prism.disableWorkerMessageHandler,util:{encode:function(t){return t instanceof r?new r(t.type,n.util.encode(t.content),t.alias):Array.isArray(t)?t.map(n.util.encode):t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(t){return Object.prototype.toString.call(t).slice(8,-1)},objId:function(t){return t.__id||Object.defineProperty(t,"__id",{value:++i}),t.__id},clone:function t(e,i){var r,s,a=n.util.type(e);switch(i=i||{},a){case"Object":if(s=n.util.objId(e),i[s])return i[s];for(var o in r={},i[s]=r,e)e.hasOwnProperty(o)&&(r[o]=t(e[o],i));return r;case"Array":return s=n.util.objId(e),i[s]?i[s]:(r=[],i[s]=r,e.forEach(function(e,n){r[n]=t(e,i)}),r);default:return e}}},languages:{extend:function(t,e){var i=n.util.clone(n.languages[t]);for(var r in e)i[r]=e[r];return i},insertBefore:function(t,e,i,r){var s=(r=r||n.languages)[t],a={};for(var o in s)if(s.hasOwnProperty(o)){if(o==e)for(var l in i)i.hasOwnProperty(l)&&(a[l]=i[l]);i.hasOwnProperty(o)||(a[o]=s[o])}var c=r[t];return r[t]=a,n.languages.DFS(n.languages,function(e,i){i===c&&e!=t&&(this[e]=a)}),a},DFS:function t(e,i,r,s){s=s||{};var a=n.util.objId;for(var o in e)if(e.hasOwnProperty(o)){i.call(e,o,e[o],r||o);var l=e[o],c=n.util.type(l);"Object"!==c||s[a(l)]?"Array"!==c||s[a(l)]||(s[a(l)]=!0,t(l,i,o,s)):(s[a(l)]=!0,t(l,i,null,s))}}},plugins:{},highlightAll:function(t,e){n.highlightAllUnder(document,t,e)},highlightAllUnder:function(t,e,i){var r={callback:i,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",r);for(var s,a=t.querySelectorAll(r.selector),o=0;s=a[o++];)n.highlightElement(s,!0===e,r.callback)},highlightElement:function(i,r,s){for(var a,o="none",l=i;l&&!e.test(l.className);)l=l.parentNode;l&&(o=(l.className.match(e)||[,"none"])[1].toLowerCase(),a=n.languages[o]),i.className=i.className.replace(e,"").replace(/\s+/g," ")+" language-"+o,i.parentNode&&(l=i.parentNode,/pre/i.test(l.nodeName)&&(l.className=l.className.replace(e,"").replace(/\s+/g," ")+" language-"+o));var c={element:i,language:o,grammar:a,code:i.textContent},u=function(t){c.highlightedCode=t,n.hooks.run("before-insert",c),c.element.innerHTML=c.highlightedCode,n.hooks.run("after-highlight",c),n.hooks.run("complete",c),s&&s.call(c.element)};if(n.hooks.run("before-sanity-check",c),c.code)if(n.hooks.run("before-highlight",c),c.grammar)if(r&&t.Worker){var p=new Worker(n.filename);p.onmessage=function(t){u(t.data)},p.postMessage(JSON.stringify({language:c.language,code:c.code,immediateClose:!0}))}else u(n.highlight(c.code,c.grammar,c.language));else u(n.util.encode(c.code));else n.hooks.run("complete",c)},highlight:function(t,e,i){var s={code:t,grammar:e,language:i};return n.hooks.run("before-tokenize",s),s.tokens=n.tokenize(s.code,s.grammar),n.hooks.run("after-tokenize",s),r.stringify(n.util.encode(s.tokens),s.language)},matchGrammar:function(t,e,i,s,a,o,l){for(var c in i)if(i.hasOwnProperty(c)&&i[c]){if(c==l)return;var u=i[c];u="Array"===n.util.type(u)?u:[u];for(var p=0;p<u.length;++p){var d=u[p],m=d.inside,f=!!d.lookbehind,h=!!d.greedy,g=0,v=d.alias;if(h&&!d.pattern.global){var S=d.pattern.toString().match(/[imuy]*$/)[0];d.pattern=RegExp(d.pattern.source,S+"g")}d=d.pattern||d;for(var b=s,w=a;b<e.length;w+=e[b].length,++b){var y=e[b];if(e.length>t.length)return;if(!(y instanceof r)){if(h&&b!=e.length-1){if(d.lastIndex=w,!(k=d.exec(t)))break;for(var _=k.index+(f?k[1].length:0),C=k.index+k[0].length,A=b,I=w,O=e.length;A<O&&(I<C||!e[A].type&&!e[A-1].greedy);++A)(I+=e[A].length)<=_&&(++b,w=I);if(e[b]instanceof r)continue;x=A-b,y=t.slice(w,I),k.index-=w}else{d.lastIndex=0;var k=d.exec(y),x=1}if(k){f&&(g=k[1]?k[1].length:0),C=(_=k.index+g)+(k=k[0].slice(g)).length;var R=y.slice(0,_),P=y.slice(C),$=[b,x];R&&(++b,w+=R.length,$.push(R));var M=new r(c,m?n.tokenize(k,m):k,v,k,h);if($.push(M),P&&$.push(P),Array.prototype.splice.apply(e,$),1!=x&&n.matchGrammar(t,e,i,b,w,!0,c),o)break}else if(o)break}}}}},tokenize:function(t,e){var i=[t],r=e.rest;if(r){for(var s in r)e[s]=r[s];delete e.rest}return n.matchGrammar(t,i,e,0,0,!1),i},hooks:{all:{},add:function(t,e){var i=n.hooks.all;i[t]=i[t]||[],i[t].push(e)},run:function(t,e){var i=n.hooks.all[t];if(i&&i.length)for(var r,s=0;r=i[s++];)r(e)}},Token:r};function r(t,e,i,n,r){this.type=t,this.content=e,this.alias=i,this.length=0|(n||"").length,this.greedy=!!r}if(t.Prism=n,r.stringify=function(t,e){if("string"==typeof t)return t;if(Array.isArray(t))return t.map(function(t){return r.stringify(t,e)}).join("");var i={type:t.type,content:r.stringify(t.content,e),tag:"span",classes:["token",t.type],attributes:{},language:e};if(t.alias){var s=Array.isArray(t.alias)?t.alias:[t.alias];Array.prototype.push.apply(i.classes,s)}n.hooks.run("wrap",i);var a=Object.keys(i.attributes).map(function(t){return t+'="'+(i.attributes[t]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+(a?" "+a:"")+">"+i.content+"</"+i.tag+">"},!t.document)return t.addEventListener&&(n.disableWorkerMessageHandler||t.addEventListener("message",function(e){var i=JSON.parse(e.data),r=i.language,s=i.code,a=i.immediateClose;t.postMessage(n.highlight(s,n.languages[r],r)),a&&t.close()},!1)),n;var s=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return s&&(n.filename=s.src,n.manual||s.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(n.highlightAll):window.setTimeout(n.highlightAll,16):document.addEventListener("DOMContentLoaded",n.highlightAll))),n}(n);t.exports&&(t.exports=r),"undefined"!=typeof e&&(e.Prism=r)}).call(this,i("dd40")(t),i("c8ba"))},"1a7c":function(t,e,i){"use strict";var n=i("4daf"),r=i.n(n);r.a},"234d":function(t,e,i){},"327b":function(t,e,i){"use strict";var n=i("9990"),r=i.n(n);r.a},"463c":function(t,e,i){"use strict";var n=i("d602"),r=i("9bd5"),s=i("2877"),a=Object(s["a"])(r["default"],n["a"],n["b"],!1,null,null,null);e["default"]=a.exports},"4daf":function(t,e,i){},5351:function(t,e,i){},"56d7":function(t,e,i){"use strict";i.r(e);i("cadf"),i("551c"),i("f751"),i("097d");var n=i("2b0e"),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("app-nav"),i("keep-alive",[i("router-view")],1)],1)},s=[],a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("nav",[i("ul",{staticClass:"left"},[i("li",[i("router-link",{attrs:{to:"/reader"}},[t._v("Reader")])],1)]),i("ul",[i("li",[i("router-link",{attrs:{to:"/"}},[t._v("Markdown")])],1),i("li",[i("router-link",{attrs:{to:"/math"}},[t._v("Math")])],1),i("li",[i("router-link",{attrs:{to:"/snippets"}},[t._v("Snippets")])],1)]),i("ul",{staticClass:"right"})])},o=[],l={},c=l,u=(i("1a7c"),i("2877")),p=Object(u["a"])(c,a,o,!1,null,"6b23b3c6",null),d=p.exports,m={components:{"app-nav":d}},f=m,h=(i("034f"),Object(u["a"])(f,r,s,!1,null,null,null)),g=h.exports,v=i("8f94"),S=i.n(v),b=i("8c4f"),w=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"outer"},[i("md-save",{attrs:{mdInput:t.mdInput}}),i("div",{class:{container:t.isFullScreen,"two-cols":!t.isFullScreen}},[i("div",{staticClass:"input md-input"},[i("codemirror",{attrs:{options:t.cmOptions},on:{update:t.onCmUpdate,blur:t.onCmDefocus,ready:t.onCmReady},model:{value:t.mdInput,callback:function(e){t.mdInput=e},expression:"mdInput"}})],1),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.isFullScreen,expression:"!isFullScreen"}],staticClass:"preview md-preview"},[i("div",{domProps:{innerHTML:t._s(t.mdRender)}})])]),i("app-footer",{attrs:{isMdSnippet:!0,isMathSnippet:!1,isFullScreen:t.isFullScreen}})],1)},y=[];i("a7be"),i("959b"),i("d2e8"),i("31c5"),i("9948");function _(t,e){var i=[];if(t)for(var n=t.childNodes,r=n.length;r--;){var s=n[r],a=s.nodeType;3==a?e&&!e(s,t)||i.push(s):1!=a&&9!=a&&11!=a||(i=i.concat(_(s,e)))}return i}function C(t){var e=[];e.push(t.nodeName);while(t.parentNode)e.unshift(t.parentNode.nodeName),t=t.parentNode;return e}function A(t){var e=JSON.parse(JSON.stringify(t));return e}var I={deepCopy:A,getAllParents:C,getTextNodesIn:_},O=I,k=(i("1558"),i("fccc"),i("3b2f")),x=i.n(k),R=(i("be0f"),i("8d74")),P=i.n(R),$=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"modal"},[i("div",{staticClass:"modal-content"},[i("div",{staticClass:"save"},[i("h3",[t._v("Save article")]),i("ul",[i("li",[i("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.newArticle.title,expression:"newArticle.title",modifiers:{lazy:!0}}],attrs:{type:"text",id:"title",required:"",placeholder:"Title"},domProps:{value:t.newArticle.title},on:{change:function(e){return t.$set(t.newArticle,"title",e.target.value)}}}),i("span",{staticClass:"preview"},[i("b",[t._v(t._s(this.newArticle.title))])])]),i("li",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.tag,expression:"tag"}],attrs:{type:"text",placeholder:"Tag"},domProps:{value:t.tag},on:{input:function(e){e.target.composing||(t.tag=e.target.value)}}}),i("button",{on:{click:t.addTag}},[t._v("Add")]),i("ul",{staticClass:"inline-list preview"},t._l(t.newArticle.tags,function(e){return i("li",{key:e.id},[t._v(t._s(e)+" ")])}),0)]),i("li",{staticClass:"submit"},[i("button",{attrs:{disabled:t.mdInputSaved},on:{click:t.saveArticle}},[t._v("Save")]),t.mdInputSaved?i("span",{staticClass:"message"},[t._v("Article saved!")]):t._e()])])]),i("div",{staticClass:"load"},[i("h3",[t._v("Load article")]),i("ul",[i("li",[i("select",{directives:[{name:"model",rawName:"v-model",value:t.toLoad,expression:"toLoad"}],on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.toLoad=e.target.multiple?i:i[0]}}},t._l(t.articles,function(e,n){return i("option",{key:e.id,domProps:{value:n}},[t._v(t._s(e.title))])}),0),t.articles[t.toLoad]?i("span",{staticClass:"preview article-title"},[i("b",[t._v(t._s(t.articles[t.toLoad].title))]),t._v("  \n            "),i("code",[t._v(t._s(t._f("toDate")(t.articles[t.toLoad].date)))])]):t._e()]),i("li",[i("button",{staticClass:"submit",on:{click:t.loadArticle}},[t._v("Load")])])])]),i("br"),i("button",{staticClass:"close-button"},[t._v("Close")])])])},M=[],j=(i("6762"),i("ac6a"),i("a481"),i("4917"),{props:{mdInput:{type:String}},data:function(){return{mdInputSaved:!1,articles:[],toLoad:0,tag:"",newArticle:{date:0,title:"",tags:[],content:""}}},watch:{tag:function(){var t=this.tag;t.match(/\s+/)&&(this.tag=t.replace(/\s+/,""))}},methods:{addTag:function(){this.newArticle.tags.push(this.tag),this.tag=""},saveArticle:function(){if(this.newArticle.title&&this.mdInput){var t=[],e=null;if(this.articles.forEach(function(e){t.push(e.title)}),t.includes(this.newArticle.title)){e=t.indexOf(this.newArticle.title);var i=!confirm("Article exists! Overwrite?");if(i)return}this.newArticle.date=(new Date).getTime(),this.newArticle.content=this.mdInput;var n=O.deepCopy(this.newArticle);null!=e?this.articles[e]=n:this.articles.unshift(n),localStorage.setItem("md-articles",JSON.stringify(this.articles)),It.$emit("mdInputSaved",!0),this.newArticle.title="",this.newArticle.tags=[]}},removeArticle:function(t){this.articles.splice(t,1),localStorage.setItem("md-articles",JSON.stringify(this.articles))},loadArticle:function(){this.mdInputSaved?It.$emit("loadArticle",this.articles[this.toLoad].content):confirm("Markdown content not saved!")&&It.$emit("loadArticle",this.articles[this.toLoad].content),this.newArticle.title="",this.newArticle.tags=[]}},mounted:function(){if(localStorage.getItem("md-articles"))try{this.articles=JSON.parse(localStorage.getItem("md-articles"))}catch(e){localStorage.removeItem("md-articles")}function t(){var t=document.querySelector(".modal");t.classList.toggle("show-modal"),document.querySelector("a.toggle-modal").classList.toggle("btn-active")}document.querySelector(".close-button").onclick=t},created:function(){var t=this;It.$on("mdInputSaved",function(e){t.mdInputSaved=e})},filters:{toDate:function(t){var e=new Date(t);return e.toISOString().substr(0,10)}}}),N=j,T=(i("f7cf"),Object(u["a"])(N,$,M,!1,null,"834d1d70",null)),L=T.exports,E=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("footer",[i("ul",{staticClass:"left"},[t.isMdSnippet?[i("li",[i("a",{staticClass:"preview left",on:{click:t.toggleFullScreen}},[t._v("Preview")])]),i("li",[i("a",{staticClass:"left toggle-modal",on:{click:t.toggleModal}},[t._v("Save/Load")])]),t.isMathSnippet?void 0:t._e()]:t._e()],2),i("ul",t._l(t.snippets,function(e){return i("li",{key:e.id},[i("a",{on:{click:function(i){return t.insertSnippet(e)}}},[t._v(t._s(e.name))])])}),0),i("ul",{staticClass:"right"},[t.isMdSnippet?[i("li",[i("a",{staticClass:"prism right",on:{click:t.addSyntaxHighlight}},[t._v("Highlight Code")])])]:t._e(),t.isMathSnippet?void 0:t._e()],2)])},F=[],H={props:{isMdSnippet:{type:Boolean},isMathSnippet:{type:Boolean},isFullScreen:{type:Boolean}},data:function(){return{snippets:[]}},methods:{insertSnippet:function(t){It.$emit("insertSnippet",t)},toggleFullScreen:function(t){It.$emit("toggleFullScreen",{}),setTimeout(function(){t.target.classList.toggle("btn-full-screen")},100)},toggleModal:function(t){var e=document.querySelector(".modal");e.classList.toggle("show-modal"),document.querySelector("a.toggle-modal").classList.toggle("btn-active")},addSyntaxHighlight:function(t){var e=prompt("Enter a programming language for syntax highlighting.","python");if(null!=e){var i=document.createElement("script");i.setAttribute("src","https://cdn.jsdelivr.net/npm/prismjs@1.17.1/components/prism-".concat(e.toLowerCase(),".min.js")),document.head.append(i)}}},created:function(){var t=this,e=["mathSnippets","mdSnippets"].splice(this.isMdSnippet,1);localStorage.getItem(e)&&(this.snippets=JSON.parse(localStorage.getItem(e))),It.$on("updateSnippets",function(i){t.snippets=i[e]})},mounted:function(){}},J=H,D=Object(u["a"])(J,E,F,!1,null,null,null),q=D.exports,z=(i("3c43"),i("0e54")),W={components:{"md-save":L,"app-footer":q},data:function(){return{mdInput:"The pdf of the normal distribution is \n\n$$\n\\frac{1}{\\sqrt{2 \\pi} \\sigma} e ^ {- \\frac{(x - \\mu)^2}{2 \\sigma ^2}}\n$$",mdInputSaved:!1,cmOptions:{tabSize:4,mode:"markdown",theme:"material",styleSelectedText:!0,styleActiveLine:!0,lineNumbers:!0,lineWrapping:!0},cmObject:{},isFullScreen:!1}},methods:{toggleFullScreen:function(){this.isFullScreen=!this.isFullScreen},renderMath:function(){P()(document.querySelector(".md-preview"),{delimiters:[{left:"$$",right:"$$",display:!0},{left:"\\[",right:"\\]",display:!0},{left:"$",right:"$",display:!1},{left:"\\(",right:"\\)",display:!1}]})},onCmReady:function(t){this.cmObject=t,this.renderMath()},onCmUpdate:function(t){var e=this;localStorage.setItem("md-input",this.mdInput),It.$emit("mdInputSaved",!1),setTimeout(function(){e.renderMath()},0),Prism.highlightAll()},onCmDefocus:function(t){},currentCursor:function(){if(!this.cmObject.display)return"aa";var t=this.cmObject.getCursor().line,e=this.cmObject.getCursor().ch;return[t,e]}},computed:{mdRender:function(){var t=document.createElement("div");return t.innerHTML=z(this.mdInput),t.innerHTML}},created:function(){var t=this;localStorage.getItem("md-input")&&(this.mdInput=localStorage.getItem("md-input")),It.$on("mdInputSaved",function(e){t.mdInputSaved=e}),It.$on("loadArticle",function(e){t.mdInput=e,setTimeout(function(){return It.$emit("mdInputSaved",!0)},100)}),It.$on("insertSnippet",function(e){if(e.isMdSnippet){t.mdInput+=e.snippet;var i=t.cmObject.getCursor().line+0,n=t.cmObject.getCursor().ch+0;t.cmObject.focus(),setTimeout(function(){var r=n+parseInt(e.cursorPos[0]),s=n+parseInt(e.cursorPos[1]);t.cmObject.setSelection({line:i,ch:r},{line:i,ch:s})},100)}}),It.$on("toggleFullScreen",function(e){t.isFullScreen=!t.isFullScreen})},mounted:function(){}},G=W,B=(i("327b"),Object(u["a"])(G,w,y,!1,null,"016e66b0",null)),U=B.exports,V=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"math two-cols outer"},[i("div",{staticClass:"input math-input"},[i("codemirror",{attrs:{options:t.cmOptions},on:{update:t.onCmUpdate,ready:t.onCmReady},model:{value:t.mathInput,callback:function(e){t.mathInput=e},expression:"mathInput"}})],1),i("div",{staticClass:"preview"},[i("div",{attrs:{id:"math-preview"},domProps:{innerHTML:t._s(t.mathRender)}})]),i("app-footer",{attrs:{isMathSnippet:!0,isMdSnippet:!1}})],1)},K=[],Q=(i("f8d2"),{components:{"app-footer":q},data:function(){return{mathInput:"\\frac{a}{b}",cmOptions:{tabSize:4,mode:"stex",theme:"material",styleSelectedText:!0,styleActiveLine:!0,lineNumbers:!0,lineWrapping:!0},cmObject:{}}},methods:{showCode:function(){console.log(this.mathInput)},onCmReady:function(t){this.cmObject=t},onCmUpdate:function(t){localStorage.setItem("math-input",this.mathInput)}},computed:{mathRender:function(){var t=document.querySelector("#math-preview");try{var e=x.a.renderToString(this.mathInput,t,{throwOnError:!0})}catch(i){e="error"}return e}},created:function(){var t=this;localStorage.getItem("math-input")&&(this.mathInput=localStorage.getItem("math-input")),It.$on("insertSnippet",function(e){if(!e.isMdSnippet){t.mathInput+=e.snippet;var i=t.cmObject.getCursor().line+0,n=t.cmObject.getCursor().ch+0;t.cmObject.focus(),setTimeout(function(){console.log(t.cmObject,i,n);var r=n+parseInt(e.cursorPos[0]),s=n+parseInt(e.cursorPos[1]);t.cmObject.setSelection({line:i,ch:r},{line:i,ch:s})},100)}})}}),X=Q,Y=(i("d016"),Object(u["a"])(X,V,K,!1,null,null,null)),Z=Y.exports,tt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"outer"},[i("form",[i("h3",[t._v("Register new snippet")]),i("ul",[i("li",[i("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.toRegister.name,expression:"toRegister.name",modifiers:{lazy:!0}}],attrs:{type:"text",placeholder:"Name",maxlength:"18"},domProps:{value:t.toRegister.name},on:{change:function(e){return t.$set(t.toRegister,"name",e.target.value)}}})]),i("li",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.toRegister.snippet,expression:"toRegister.snippet"}],attrs:{type:"text",placeholder:"Snippets"},domProps:{value:t.toRegister.snippet},on:{input:function(e){e.target.composing||t.$set(t.toRegister,"snippet",e.target.value)}}})]),i("li",[t._v("\n        Cursor (start | end) : "),i("br"),i("input",{directives:[{name:"model",rawName:"v-model",value:t.toRegister.cursorPos[0],expression:"toRegister.cursorPos[0]"}],staticClass:"select-start",attrs:{type:"number",step:"1",min:"0"},domProps:{value:t.toRegister.cursorPos[0]},on:{input:function(e){e.target.composing||t.$set(t.toRegister.cursorPos,0,e.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.toRegister.cursorPos[1],expression:"toRegister.cursorPos[1]"}],staticClass:"select-end",attrs:{type:"number",step:"1",min:"0"},domProps:{value:t.toRegister.cursorPos[1]},on:{input:function(e){e.target.composing||t.$set(t.toRegister.cursorPos,1,e.target.value)}}})]),i("li",[t._v("\n        Snippet for:\n        "),i("select",{directives:[{name:"model",rawName:"v-model",value:t.toRegister.isMdSnippet,expression:"toRegister.isMdSnippet"}],attrs:{required:""},on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.$set(t.toRegister,"isMdSnippet",e.target.multiple?i:i[0])}}},[i("option",{domProps:{value:!0}},[t._v("Markdown")]),i("option",{domProps:{value:!1}},[t._v("Math")])])]),i("li",[i("button",{on:{click:t.register}},[t._v("Add Snippet")])])]),i("p",t._l(t.word2array(t.toRegister.snippet),function(e,n){return i("span",{key:e.id,class:{selected:t.isSelected(n)},attrs:{"data-pos":n}},[t._v(t._s(e))])}),0)]),i("div",{staticClass:"snippets-preview"},[i("table",[i("th",[t._v("Name")]),i("th",[t._v("Snippet (Md)")]),i("th",[t._v("Rendered")]),t._l(t.mdSnippets,function(e,n){return i("tr",{key:e.id},[i("td",{staticClass:"snippet-name"},[t._v(t._s(e.name))]),i("td",{staticClass:"snippet"},[t._v(t._s(e.snippet))]),i("td",{staticClass:"preview",domProps:{innerHTML:t._s(t.toMd(e.snippet))}}),i("td",[i("button",{on:{click:function(i){return t.removeSnippet(n,e.isMdSnippet)}}},[t._v("Remove")])])])})],2),i("table",[i("th",[t._v("Name")]),i("th",[t._v("Snippet (Math)")]),i("th",[t._v("Rendered")]),t._l(t.mathSnippets,function(e,n){return i("tr",{key:e.id},[i("td",{staticClass:"snippet-name"},[t._v(t._s(e.name))]),i("td",{staticClass:"snippet"},[t._v(t._s(e.snippet))]),i("td",{staticClass:"preview latex",domProps:{innerHTML:t._s(t.toMath(e.snippet))}}),i("td",[i("button",{on:{click:function(i){return t.removeSnippet(n,e.isMdSnippet)}}},[t._v("Remove")])])])})],2)]),i("app-footer")],1)},et=[],it=i("463c"),nt=i("0e54"),rt={components:{"app-footer":it["default"]},data:function(){return{toRegister:{name:"",snippet:"",cursorPos:[0,0],isMdSnippet:!0},mdSnippets:[],mathSnippets:[]}},methods:{register:function(){this.toRegister.isMdSnippet&&this.mdSnippets.push(Object.assign({},this.toRegister)),this.toRegister.isMdSnippet||this.mathSnippets.push(Object.assign({},this.toRegister)),this.mdSnippets.length>0&&localStorage.setItem("mdSnippets",JSON.stringify(this.mdSnippets)),this.mathSnippets.length>0&&localStorage.setItem("mathSnippets",JSON.stringify(this.mathSnippets)),this.toRegister.snippet="",this.toRegister.name="",this.toRegister.cursorPos[0]=0,this.toRegister.cursorPos[1]=0,It.$emit("updateSnippets",{mdSnippets:this.mdSnippets,mathSnippets:this.mathSnippets})},removeSnippet:function(t,e){e?this.mdSnippets.splice(t,1):this.mathSnippets.splice(t,1),localStorage.setItem("mdSnippets",JSON.stringify(this.mdSnippets)),localStorage.setItem("mathSnippets",JSON.stringify(this.mathSnippets)),It.$emit("updateSnippets",{mdSnippets:this.mdSnippets,mathSnippets:this.mathSnippets})},toMd:function(t){var e=document.createElement("div");return e.innerHTML=nt(t),e.innerHTML},toMath:function(t){var e=x.a.renderToString(t,{throwOnError:!1});return e},word2array:function(t){for(var e=[],i=0;i<t.length;i++)e.push(t.charAt(i));return e},isSelected:function(t){var e=this.toRegister.cursorPos;return parseInt(e[0])<=t&&t<parseInt(e[1])}},computed:{},watch:{"toRegister.snippet":function(){this.toRegister.cursorPos[1]=this.toRegister.snippet.length},"toRegister.cursorPos":function(){var t=parseInt(this.toRegister.cursorPos[0]),e=parseInt(this.toRegister.cursorPos[1]);t>this.toRegister.snippet.length&&(this.toRegister.cursorPos[0]=this.toRegister.snippet.length),e>this.toRegister.snippet.length&&(this.toRegister.cursorPos[1]=this.toRegister.snippet.length),t>e&&(this.toRegister.cursorPos[1]=this.toRegister.cursorPos[0]),this.toRegister.cursorPos[1]=parseInt(this.toRegister.cursorPos[1]),this.toRegister.cursorPos[2]=parseInt(this.toRegister.cursorPos[2])}},created:function(){localStorage.getItem("mdSnippets")&&(this.mdSnippets=JSON.parse(localStorage.getItem("mdSnippets"))),localStorage.getItem("mathSnippets")&&(this.mathSnippets=JSON.parse(localStorage.getItem("mathSnippets"))),It.$emit("updateSnippets",{mdSnippets:this.mdSnippets,mathSnippets:this.mathSnippets})},filters:{}},st=rt,at=(i("86c5"),Object(u["a"])(st,tt,et,!1,null,"353aabe0",null)),ot=at.exports,lt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"outer"},[i("transition",{attrs:{name:"fade2"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.viewArticle.show,expression:"!viewArticle.show"}],staticClass:"articles"},[i("div",{staticClass:"filter"},[i("h2",[t._v("Search:")]),i("ul",[i("li",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.title,expression:"filter.title"}],attrs:{type:"text",placeholder:"title"},domProps:{value:t.filter.title},on:{input:function(e){e.target.composing||t.$set(t.filter,"title",e.target.value)}}})]),i("li",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.tags,expression:"filter.tags"}],attrs:{type:"text",placeholder:"tags"},domProps:{value:t.filter.tags},on:{focus:function(e){t.filter.focusTags=!0},blur:function(e){t.filter.focusTags=!1},input:function(e){e.target.composing||t.$set(t.filter,"tags",e.target.value)}}}),t.filter.focusTags?i("span",{staticClass:"message"},[t._v("1 space between each tag")]):t._e()]),i("li",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.content,expression:"filter.content"}],attrs:{type:"text",placeholder:"content"},domProps:{value:t.filter.content},on:{input:function(e){e.target.composing||t.$set(t.filter,"content",e.target.value)}}})])])]),t._l(t.filterGeneric,function(e,n){return i("div",{key:e.id,staticClass:"article",attrs:{value:n}},[i("h3",[i("a",{on:{click:function(e){return t.toArticle(n)}}},[t._v(t._s(t._f("trimString")(e.title,25)))])]),i("span",{staticClass:"date"},[t._v(t._s(t._f("toDate")(e.date)))]),i("ul",{staticClass:"tags"},t._l(e.tags,function(e){return i("li",{key:e.id,staticClass:"tag"},[t._v(t._s(e))])}),0),i("div",{staticClass:"content"},[t._v(t._s(t._f("trimString")(e.content,150)))]),i("button",{on:{click:function(e){return t.deleteArticle(n)}}},[t._v("Delete")])])})],2)]),null!=t.viewArticle.idx?i("div",[i("transition-group",{attrs:{name:"fade",tag:"div"}},[i("single-article",{directives:[{name:"show",rawName:"v-show",value:t.viewArticle.show,expression:"viewArticle.show"}],key:"article",attrs:{article:t.articles[t.viewArticle.idx],viewArticle:t.viewArticle}})],1)],1):t._e(),i("footer",{directives:[{name:"show",rawName:"v-show",value:!t.viewArticle.show,expression:"!viewArticle.show"}]})],1)},ct=[],ut=i("7618"),pt=(i("28a5"),i("2fdb"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"single-article"},[i("h2",[t._v(t._s(t.article.title))]),i("div",{staticClass:"article-info"},[i("ul",{staticClass:"tags left"},t._l(t.article.tags,function(e){return i("li",{key:e.id,staticClass:"tag"},[t._v(t._s(e))])}),0),i("ul",{staticClass:"center"}),i("ul",{staticClass:"right"},[i("li",{staticClass:"date"},[t._v(t._s(t._f("toDate")(t.article.date)))])])]),i("div",{staticClass:"content md-content",domProps:{innerHTML:t._s(t.mdRender)}}),i("footer",[i("ul",{staticClass:"left"},[i("li",[i("a",{staticClass:"back",on:{click:t.back2Reader}},[t._v("Back")])])]),t._m(0),t._m(1)])])}),dt=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ul",{staticClass:"center"},[i("li")])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ul",{staticClass:"right"},[i("li")])}],mt=i("0e54"),ft={props:{article:Object,viewArticle:Object},data:function(){return{id:parseInt(this.$route.params.id),idIsValid:!0}},methods:{back2Reader:function(){It.$emit("toReader",!0)}},filters:{toDate:function(t){var e=new Date(t);return e.toISOString().substr(0,10)}},computed:{mdRender:function(){var t=document.createElement("div");return t.innerHTML=mt(this.article.content),t.innerHTML}},created:function(){},mounted:function(){var t=document.querySelector(".md-content");t&&P()(t,{delimiters:[{left:"$$",right:"$$",display:!0},{left:"\\[",right:"\\]",display:!0},{left:"$",right:"$",display:!1},{left:"\\(",right:"\\)",display:!1}]}),Prism.highlightAll()}},ht=ft,gt=(i("c87a"),Object(u["a"])(ht,pt,dt,!1,null,"6c486f7e",null)),vt=gt.exports,St=i("5118"),bt={components:{"single-article":vt},data:function(){return{articles:[],viewArticle:{idx:null,show:!1},filter:{title:"",content:"",tags:"",focusTags:!1}}},watch:{"filter.title":function(){this.filter.content="",this.filter.tags=""},"filter.content":function(){this.filter.title="",this.filter.tags=""},"filter.tags":function(){this.filter.title="",this.filter.content=""}},methods:{toArticle:function(t){var e=this;this.viewArticle.show=!1,this.viewArticle.idx=null,Object(St["setTimeout"])(function(){e.viewArticle.idx=t,e.viewArticle.show=!0},100)},deleteArticle:function(t){}},filters:{toDate:function(t){var e=new Date(t);return e.toISOString().substr(0,10)},trimString:function(t,e){var i=t.substr(0,e);return i!=t&&(i+=" ..."),i}},computed:{filterGeneric:function(){return""!=this.filter.title?this.filterTitleArticles:""!=this.filter.content?this.filterContentArticles:""!=this.filter.tags?this.filterTagsArticles:this.articles},filterTitleArticles:function(){var t=this;return this.articles.filter(function(e){return e.title.trim().toLowerCase().includes(t.filter.title.trim().toLowerCase())})},filterContentArticles:function(){var t=this;return this.articles.filter(function(e){return e.content.trim().toLowerCase().includes(t.filter.content.trim().toLowerCase())})},filterTagsArticles:function(){var t=this.filter.tags.trim().split(" ");return this.articles.filter(function(e){var i=[];e.tags.forEach(function(t){i.push(t.trim().toLowerCase())}),i.push("");for(var n=function(e){if(s=[],i.forEach(function(i){""!=i?s.push(i.includes(t[e].trim().toLowerCase())):s.push(!0)}),s.pop(-1),s.every(function(t){return 0==t}))return{v:!1}},r=0;r<t.length;r++){var s,a=n(r);if("object"===Object(ut["a"])(a))return a.v}return!0})}},created:function(){var t=this;localStorage.getItem("md-articles")&&(this.articles=JSON.parse(localStorage.getItem("md-articles"))),It.$on("mdInputSaved",function(){t.articles=JSON.parse(localStorage.getItem("md-articles"))}),It.$on("toReader",function(){t.viewArticle.show=!1,t.viewArticle.idx=null})}},wt=bt,yt=(i("6bc6"),Object(u["a"])(wt,lt,ct,!1,null,"556af9b8",null)),_t=yt.exports,Ct=[{path:"/",component:U},{path:"/math",component:Z},{path:"/snippets",component:ot},{path:"/reader",component:_t}];i.d(e,"bus",function(){return It}),n["a"].use(b["a"]),n["a"].use(S.a),n["a"].config.productionTip=!1;var At=new b["a"]({routes:Ct}),It=new n["a"]({});new n["a"]({render:function(t){return t(g)},router:At}).$mount("#app")},"64a9":function(t,e,i){},"6bc6":function(t,e,i){"use strict";var n=i("0d09"),r=i.n(n);r.a},"86c5":function(t,e,i){"use strict";var n=i("5351"),r=i.n(n);r.a},"8cab":function(t,e,i){},9990:function(t,e,i){},"9bd5":function(t,e,i){"use strict";var n=i("b8b2"),r=i.n(n);e["default"]=r.a},b8b2:function(t,e){},c87a:function(t,e,i){"use strict";var n=i("0a0e"),r=i.n(n);r.a},d016:function(t,e,i){"use strict";var n=i("234d"),r=i.n(n);r.a},d602:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("footer",[i("ul",{staticClass:"left"},[i("li")]),i("ul"),i("ul",{staticClass:"right"})])}];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return r})},f7cf:function(t,e,i){"use strict";var n=i("8cab"),r=i.n(n);r.a},fccc:function(t,e,i){}});
//# sourceMappingURL=app.39fb5f7a.js.map