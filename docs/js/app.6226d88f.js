(function(t){function e(e){for(var i,o,a=e[0],c=e[1],p=e[2],u=0,d=[];u<a.length;u++)o=a[u],s[o]&&d.push(s[o][0]),s[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);l&&l(e);while(d.length)d.shift()();return r.push.apply(r,p||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,a=1;a<n.length;a++){var c=n[a];0!==s[c]&&(i=!1)}i&&(r.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},s={app:0},r=[];function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=e,a=a.slice();for(var p=0;p<a.length;p++)e(a[p]);var l=c;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var i=n("64a9"),s=n.n(i);s.a},"0669":function(t,e,n){},"12d8":function(t,e,n){"use strict";var i=n("86a1"),s=n.n(i);s.a},"234d":function(t,e,n){},"327b":function(t,e,n){"use strict";var i=n("9990"),s=n.n(i);s.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var i=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("app-nav"),n("keep-alive",[n("router-view")],1)],1)},r=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",[n("ul",[n("li",[n("router-link",{attrs:{to:"/"}},[t._v("Markdown")])],1),n("li",[n("router-link",{attrs:{to:"/math"}},[t._v("Math")])],1),n("li",[n("router-link",{attrs:{to:"/snippets"}},[t._v("Snippets")])],1)])])},a=[],c={},p=c,l=(n("cbb5"),n("2877")),u=Object(l["a"])(p,o,a,!1,null,"4d8c13c6",null),d=u.exports,m={components:{"app-nav":d}},h=m,f=(n("034f"),Object(l["a"])(h,s,r,!1,null,null,null)),v=f.exports,g=n("8f94"),S=n.n(g),b=n("8c4f"),_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"outer"},[n("md-save",{attrs:{mdInput:t.mdInput}}),n("div",{class:{container:t.isFullScreen,"two-cols":!t.isFullScreen}},[n("div",{staticClass:"input md-input"},[n("codemirror",{attrs:{options:t.cmOptions},on:{update:t.onCmUpdate,blur:t.onCmDefocus,ready:t.renderMath},model:{value:t.mdInput,callback:function(e){t.mdInput=e},expression:"mdInput"}})],1),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.isFullScreen,expression:"!isFullScreen"}],staticClass:"preview md-preview"},[n("div",{domProps:{innerHTML:t._s(t.mdRender)}})])]),n("app-footer",{attrs:{isMdSnippet:!0,isFullScreen:t.isFullScreen},scopedSlots:t._u([{key:"custom-md-btn1",fn:function(t){return n("li",{},[n("a",{attrs:{href:"#fullscreen"},on:{click:t.toggleFullScreen}})])}}])},[n("li",{attrs:{slot:"custom-md-btn2"},slot:"custom-md-btn2"},[n("a",{attrs:{href:"#"}},[t._v("slot 2")])])])],1)},y=[];n("a7be"),n("959b"),n("d2e8"),n("31c5"),n("9948");var I=n("3b2f"),R=n.n(I),w=(n("be0f"),n("8d74")),O=n.n(w),P=n("5118"),x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sidebar"},[n("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.title,expression:"title",modifiers:{lazy:!0}}],attrs:{type:"text",id:"title",required:"",placeholder:"Title"},domProps:{value:t.title},on:{change:function(e){t.title=e.target.value}}}),n("button",{attrs:{disabled:t.mdInputSaved},on:{click:t.saveArticle}},[t._v("Save")]),n("select",{directives:[{name:"model",rawName:"v-model",value:t.toLoad,expression:"toLoad"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.toLoad=e.target.multiple?n:n[0]}}},t._l(t.articles,function(e,i){return n("option",{key:e.id,domProps:{value:i}},[n("code",[t._v(t._s(t._f("toDate")(e.date)))]),t._v("\n      "+t._s(e.title)+"\n    ")])}),0),n("button",{on:{click:function(e){return t.loadArticle(t.idx)}}},[t._v("Load Article")]),n("br")])},M=[],j=(n("6762"),n("ac6a"),{props:{mdInput:{type:String}},data:function(){return{mdInputSaved:!1,articles:[],toLoad:0,title:""}},methods:{saveArticle:function(){if(this.title&&this.mdInput){var t=[],e=null;if(this.articles.forEach(function(e){t.push(e.title)}),t.includes(this.title)){e=t.indexOf(this.title);var n=!confirm("Article exists! Overwrite?");if(n)return}var i=(new Date).getTime(),s={date:i,title:this.title,content:this.mdInput};e?this.articles[e]=s:this.articles.push(s),localStorage.setItem("md-articles",JSON.stringify(this.articles)),rt.$emit("mdInputSaved",!0),this.title=""}},removeArticle:function(t){this.articles.splice(t,1),localStorage.setItem("md-articles",JSON.stringify(this.articles))},loadArticle:function(){this.mdInputSaved?rt.$emit("loadArticle",this.articles[this.toLoad].content):alert("Markdown content not saved!"),this.title=""}},mounted:function(){if(localStorage.getItem("md-articles"))try{this.articles=JSON.parse(localStorage.getItem("md-articles"))}catch(t){localStorage.removeItem("md-articles")}},created:function(){var t=this;rt.$on("mdInputSaved",function(e){t.mdInputSaved=e})},filters:{toDate:function(t){var e=new Date(t);return e.toISOString().substr(0,10)}}}),$=j,C=Object(l["a"])($,x,M,!1,null,"989e1ffc",null),k=C.exports,N=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",[n("ul",{staticClass:"left"},[this.toggleFullScreen?n("li",[n("a",{staticClass:"preview left",attrs:{href:"#"},on:{click:t.toggleFullScreen}},[t._v("Preview")])]):t._e()]),n("ul",[t._t("custom-math-btn"),t._l(t.snippets,function(e){return n("li",{key:e.id},[n("a",{attrs:{href:"#"},on:{click:function(n){return t.insertSnippet(e)}}},[t._v(t._s(e.name))])])})],2),n("ul",{staticClass:"right"},[t.isMdSnippet?n("li",[n("a",{staticClass:"prism right",attrs:{href:"#"},on:{click:t.addSyntaxHighlight}},[t._v("SyntaxHighlight")])]):t._e()])])},T=[],F={props:{isMdSnippet:{type:Boolean},isFullScreen:{type:Boolean}},data:function(){return{snippets:[]}},methods:{insertSnippet:function(t){rt.$emit("insertSnippet",{content:t.snippet,cursorPos:t.cursorPos})},toggleFullScreen:function(t){var e=this;rt.$emit("toggleFullScreen",{}),setTimeout(function(){var n=t.target;e.isFullScreen?n.className="":n.className="btn-full-screen"},100)},addSyntaxHighlight:function(t){var e=prompt("Enter a programming language for syntax highlighting.","python");if(null!=e){var n=document.createElement("script");n.setAttribute("src","https://cdn.jsdelivr.net/npm/prismjs@1.17.1/components/prism-".concat(e.toLowerCase(),".min.js")),document.head.append(n)}}},created:function(){var t=this,e=["mathSnippets","mdSnippets"].splice(this.isMdSnippet,1);localStorage.getItem(e)&&(this.snippets=JSON.parse(localStorage.getItem(e))),rt.$on("updateSnippets",function(n){t.snippets=n[e]})}},A=F,L=(n("e0cc"),Object(l["a"])(A,N,T,!1,null,"43279bd8",null)),E=L.exports,J=(n("3c43"),n("0e54")),H={components:{"md-save":k,"app-footer":E},data:function(){return{mdInput:"The pdf of the normal distribution is \n\n$$\n\\frac{1}{\\sqrt{2 \\pi} \\sigma} e ^ {- \\frac{(x - \\mu)^2}{2 \\sigma ^2}}\n$$",mdInputSaved:!1,cmOptions:{tabSize:4,mode:"markdown",theme:"material",styleSelectedText:!0,styleActiveLine:!0,lineNumbers:!0,lineWrapping:!0},cmObject:{},cmObject2:{},isFullScreen:!1}},methods:{toggleFullScreen:function(){this.isFullScreen=!this.isFullScreen},test:function(){this.mdInput="new text"},renderMath:function(){O()(document.querySelector(".md-preview"),{delimiters:[{left:"$$",right:"$$",display:!0},{left:"\\[",right:"\\]",display:!0},{left:"$",right:"$",display:!1},{left:"\\(",right:"\\)",display:!1}]})},onCmUpdate:function(t){var e=this;this.cmObject=t,localStorage.setItem("md-input",this.mdInput),rt.$emit("mdInputSaved",!1),Object(P["setTimeout"])(function(){e.renderMath()},0),Prism.highlightAll()},onCmDefocus:function(t){},currentCursor:function(){if(!this.cmObject.display)return"aa";var t=this.cmObject.getCursor().line,e=this.cmObject.getCursor().ch;return[t,e]}},computed:{mdRender:function(){var t=document.createElement("div");return t.innerHTML=J(this.mdInput),t.innerHTML}},created:function(){var t=this;localStorage.getItem("md-input")&&(this.mdInput=localStorage.getItem("md-input")),rt.$on("mdInputSaved",function(e){t.mdInputSaved=e}),rt.$on("loadArticle",function(e){t.mdInput=e,Object(P["setTimeout"])(function(){return rt.$emit("mdInputSaved",!0)},100)}),rt.$on("insertSnippet",function(e){t.mdInput+=e.content;var n=t.cmObject.getCursor().line+0,i=t.cmObject.getCursor().ch+0;t.cmObject.focus(),Object(P["setTimeout"])(function(){console.log(t.cmObject,n,i);var s=i+parseInt(e.cursorPos[0]),r=i+parseInt(e.cursorPos[1]);t.cmObject.setSelection({line:n,ch:s},{line:n,ch:r})},100)}),rt.$on("toggleFullScreen",function(e){t.isFullScreen=!t.isFullScreen})},mounted:function(){var t=document.createElement("link");t.setAttribute("rel","stylesheet"),t.setAttribute("href","https://cdn.jsdelivr.net/npm/prismjs@1.17.1/themes/prism.min.css"),document.head.append(t);var e=document.createElement("script");e.setAttribute("src","https://cdn.jsdelivr.net/npm/prismjs@1.17.1/prism.min.js"),document.head.append(e)}},z=H,D=(n("327b"),Object(l["a"])(z,_,y,!1,null,"50a892c7",null)),q=D.exports,B=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"math two-cols outer"},[n("div",{staticClass:"input math-input"},[n("codemirror",{attrs:{options:t.cmOptions},model:{value:t.mathInput,callback:function(e){t.mathInput=e},expression:"mathInput"}})],1),n("div",{staticClass:"preview"},[n("div",{attrs:{id:"math-preview"},domProps:{innerHTML:t._s(t.mathRender)}})])])},U=[],W=(n("f8d2"),{data:function(){return{mathInput:"\\frac{a}{b}",cmOptions:{tabSize:4,mode:"stex",theme:"material",styleSelectedText:!0,styleActiveLine:!0,lineNumbers:!0,lineWrapping:!0}}},methods:{showCode:function(){console.log(this.mathInput)}},watch:{},computed:{mathRender:function(){var t=document.querySelector("#math-preview");try{var e=R.a.renderToString(this.mathInput,t,{throwOnError:!0})}catch(n){e="error"}return e}}}),G=W,K=(n("d016"),Object(l["a"])(G,B,U,!1,null,null,null)),Q=K.exports,V=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"outer"},[n("form",[n("h3",[t._v("Register new snippet")]),n("ul",[n("li",[n("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.toRegister.name,expression:"toRegister.name",modifiers:{lazy:!0}}],attrs:{type:"text",placeholder:"Name",maxlength:"18"},domProps:{value:t.toRegister.name},on:{change:function(e){return t.$set(t.toRegister,"name",e.target.value)}}})]),n("li",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.toRegister.snippet,expression:"toRegister.snippet"}],attrs:{type:"text",placeholder:"Snippets"},domProps:{value:t.toRegister.snippet},on:{input:function(e){e.target.composing||t.$set(t.toRegister,"snippet",e.target.value)}}})]),n("li",[t._v("\n        Cursor (start | end) : "),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.toRegister.cursorPos[0],expression:"toRegister.cursorPos[0]"}],staticClass:"select-start",attrs:{type:"number",step:"1",min:"0"},domProps:{value:t.toRegister.cursorPos[0]},on:{input:function(e){e.target.composing||t.$set(t.toRegister.cursorPos,0,e.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.toRegister.cursorPos[1],expression:"toRegister.cursorPos[1]"}],staticClass:"select-end",attrs:{type:"number",step:"1",min:"0"},domProps:{value:t.toRegister.cursorPos[1]},on:{input:function(e){e.target.composing||t.$set(t.toRegister.cursorPos,1,e.target.value)}}})]),n("li",[t._v("\n        Snippet for:\n        "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.toRegister.isMdSnippet,expression:"toRegister.isMdSnippet"}],attrs:{required:""},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.$set(t.toRegister,"isMdSnippet",e.target.multiple?n:n[0])}}},[n("option",{domProps:{value:!0}},[t._v("Markdown")]),n("option",{domProps:{value:!1}},[t._v("Math")])])]),n("li",[n("button",{on:{click:t.register}},[t._v("Add Snippet")])])]),n("p",t._l(t.word2array(t.toRegister.snippet),function(e,i){return n("span",{key:e.id,class:{selected:t.isSelected(i)},attrs:{"data-pos":i}},[t._v(t._s(e))])}),0)]),n("div",{staticClass:"snippets-preview"},[n("table",[n("th",[t._v("Name")]),n("th",[t._v("Snippet (Md)")]),n("th",[t._v("Rendered")]),t._l(t.mdSnippets,function(e,i){return n("tr",{key:e.id},[n("td",{staticClass:"snippet-name"},[t._v(t._s(e.name))]),n("td",{staticClass:"snippet"},[t._v(t._s(e.snippet))]),n("td",{staticClass:"preview",domProps:{innerHTML:t._s(t.toMd(e.snippet))}}),n("td",[n("button",{on:{click:function(n){return t.removeSnippet(i,e.isMdSnippet)}}},[t._v("Remove")])])])})],2),n("table",[n("th",[t._v("Name")]),n("th",[t._v("Snippet (Math)")]),n("th",[t._v("Rendered")]),t._l(t.mathSnippets,function(e,i){return n("tr",{key:e.id},[n("td",{staticClass:"snippet-name"},[t._v(t._s(e.name))]),n("td",{staticClass:"snippet"},[t._v(t._s(e.snippet))]),n("td",{staticClass:"preview latex",domProps:{innerHTML:t._s(t.toMath(e.snippet))}}),n("td",[n("button",{on:{click:function(n){return t.removeSnippet(i,e.isMdSnippet)}}},[t._v("Remove")])])])})],2)])])},X=[],Y=n("0e54"),Z={data:function(){return{toRegister:{name:"",snippet:"",cursorPos:[0,0],isMdSnippet:!0},mdSnippets:[{name:"Link",snippet:"[link](https://)",cursorPos:0,isMdSnippet:!0}],mathSnippets:[{name:"Fraction",snippet:"\\frac{a}{b}",cursorPos:-4,isMdSnippet:!1}]}},methods:{register:function(){this.toRegister.isMdSnippet&&this.mdSnippets.push(Object.assign({},this.toRegister)),this.toRegister.isMdSnippet||this.mathSnippets.push(Object.assign({},this.toRegister)),this.mdSnippets.length>0&&localStorage.setItem("mdSnippets",JSON.stringify(this.mdSnippets)),this.mathSnippets.length>0&&localStorage.setItem("mathSnippets",JSON.stringify(this.mathSnippets)),this.toRegister.snippet="",this.toRegister.name="",this.toRegister.cursorPos[0]=0,this.toRegister.cursorPos[1]=0,rt.$emit("updateSnippets",{mdSnippets:this.mdSnippets,mathSnippets:this.mathSnippets})},removeSnippet:function(t,e){e?this.mdSnippets.splice(t,1):this.mathSnippets.splice(t,1),localStorage.setItem("mdSnippets",JSON.stringify(this.mdSnippets)),localStorage.setItem("mathSnippets",JSON.stringify(this.mathSnippets)),rt.$emit("updateSnippets",{mdSnippets:this.mdSnippets,mathSnippets:this.mathSnippets})},toMd:function(t){var e=document.createElement("div");return e.innerHTML=Y(t),e.innerHTML},toMath:function(t){var e=R.a.renderToString(t,{throwOnError:!1});return e},word2array:function(t){for(var e=[],n=0;n<t.length;n++)e.push(t.charAt(n));return e},isSelected:function(t){var e=this.toRegister.cursorPos;return parseInt(e[0])<=t&&t<parseInt(e[1])}},computed:{},watch:{"toRegister.cursorPos":function(){console.log("changed");var t=parseInt(this.toRegister.cursorPos[0]),e=parseInt(this.toRegister.cursorPos[1]);t>this.toRegister.snippet.length&&(this.toRegister.cursorPos[0]=this.toRegister.snippet.length),e>this.toRegister.snippet.length&&(this.toRegister.cursorPos[1]=this.toRegister.snippet.length),t>e&&(this.toRegister.cursorPos[1]=this.toRegister.cursorPos[0]),this.toRegister.cursorPos[1]=parseInt(this.toRegister.cursorPos[1]),this.toRegister.cursorPos[2]=parseInt(this.toRegister.cursorPos[2])}},created:function(){localStorage.getItem("mdSnippets")&&(this.mdSnippets=JSON.parse(localStorage.getItem("mdSnippets"))),localStorage.getItem("mathSnippets")&&(this.mathSnippets=JSON.parse(localStorage.getItem("mathSnippets"))),rt.$emit("updateSnippets",{mdSnippets:this.mdSnippets,mathSnippets:this.mathSnippets})},filters:{}},tt=Z,et=(n("12d8"),Object(l["a"])(tt,V,X,!1,null,"1cdfb800",null)),nt=et.exports,it=[{path:"/",component:q},{path:"/math",component:Q},{path:"/snippets",component:nt}];n.d(e,"bus",function(){return rt}),i["a"].use(b["a"]),i["a"].use(S.a),i["a"].config.productionTip=!1;var st=new b["a"]({routes:it}),rt=new i["a"]({});new i["a"]({render:function(t){return t(v)},router:st}).$mount("#app")},"64a9":function(t,e,n){},"75e0":function(t,e,n){},"86a1":function(t,e,n){},9990:function(t,e,n){},cbb5:function(t,e,n){"use strict";var i=n("75e0"),s=n.n(i);s.a},d016:function(t,e,n){"use strict";var i=n("234d"),s=n.n(i);s.a},e0cc:function(t,e,n){"use strict";var i=n("0669"),s=n.n(i);s.a}});
//# sourceMappingURL=app.6226d88f.js.map