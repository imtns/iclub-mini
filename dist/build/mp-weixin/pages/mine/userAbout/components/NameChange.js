require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/userAbout/components/NameChange"],{"232e":function(n,e,t){"use strict";t.r(e);var i=t("3651"),u=t("e896");for(var a in u)["default"].indexOf(a)<0&&function(n){t.d(e,n,(function(){return u[n]}))}(a);t("9555");var c,o=t("f0c5"),r=Object(o["a"])(u["default"],i["b"],i["c"],!1,null,"aa969b8a",null,!1,i["a"],c);e["default"]=r.exports},3651:function(n,e,t){"use strict";t.d(e,"b",(function(){return u})),t.d(e,"c",(function(){return a})),t.d(e,"a",(function(){return i}));var i={uniPopup:function(){return t.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(t.bind(null,"27c0"))}},u=function(){var n=this,e=n.$createElement;n._self._c},a=[]},"418e":function(n,e,t){},9555:function(n,e,t){"use strict";var i=t("418e"),u=t.n(i);u.a},d876:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{initialNickName:String},data:function(){return{localNickName:this.initialNickName}},methods:{open:function(){this.$refs.nameChange.open()},close:function(){this.localNickName=this.initialNickName,this.$refs.nameChange.close()},cleanNickName:function(){this.localNickName=""},submitName:function(){this.$emit("submit",this.localNickName)}}};e.default=i},e896:function(n,e,t){"use strict";t.r(e);var i=t("d876"),u=t.n(i);for(var a in i)["default"].indexOf(a)<0&&function(n){t.d(e,n,(function(){return i[n]}))}(a);e["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/mine/userAbout/components/NameChange-create-component',
    {
        'pages/mine/userAbout/components/NameChange-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("232e"))
        })
    },
    [['pages/mine/userAbout/components/NameChange-create-component']]
]);
