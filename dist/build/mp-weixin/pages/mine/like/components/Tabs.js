require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/like/components/Tabs"],{"0dd4":function(e,n,t){"use strict";var a=t("7343"),i=t.n(a);i.a},"106a":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={name:"TabsThree",props:{loading:Boolean},data:function(){return{showBg:0,selIndex:"1",list:[{name:"我的收藏",value:"1"},{name:"我的点赞",value:"2"}]}},methods:{actived:function(e,n){this.loading||this.selIndex===e||(this.showBg=n,this.selIndex=e,this.$emit("click",e))}}};n.default=a},"66a4":function(e,n,t){"use strict";var a;t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return u})),t.d(n,"a",(function(){return a}));var i=function(){var e=this,n=e.$createElement;e._self._c},u=[]},7343:function(e,n,t){},eaa2:function(e,n,t){"use strict";t.r(n);var a=t("66a4"),i=t("ef5e");for(var u in i)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return i[e]}))}(u);t("0dd4");var r,c=t("f0c5"),o=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"c37fcf28",null,!1,a["a"],r);n["default"]=o.exports},ef5e:function(e,n,t){"use strict";t.r(n);var a=t("106a"),i=t.n(a);for(var u in a)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return a[e]}))}(u);n["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/mine/like/components/Tabs-create-component',
    {
        'pages/mine/like/components/Tabs-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("eaa2"))
        })
    },
    [['pages/mine/like/components/Tabs-create-component']]
]);
