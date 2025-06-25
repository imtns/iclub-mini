require('../../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages-activity/incentive/signup/components/Tabs"],{"17eb":function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return u}));var i=function(){var t=this,n=t.$createElement;t._self._c},a=[]},"6cb9":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={name:"Tabs",props:{value:{type:String,default:"1"}},data:function(){return{showBg:0,bg:["https://udstatic.imeik.com/pcUploads/1704694589193/tit%402x.png","https://udstatic.imeik.com/pcUploads/1704694709252/tit.png"],list:[{name:"注射信息",value:"1"},{name:"报名信息",value:"2"}]}},computed:{currentType:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}},methods:{actived:function(t,n){this.showBg=n,this.currentType=t}}};n.default=u},"784b":function(t,n,e){},b4b7:function(t,n,e){"use strict";e.r(n);var u=e("17eb"),i=e("d882");for(var a in i)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("f11b");var c,r=e("f0c5"),o=Object(r["a"])(i["default"],u["b"],u["c"],!1,null,"875a43d4",null,!1,u["a"],c);n["default"]=o.exports},d882:function(t,n,e){"use strict";e.r(n);var u=e("6cb9"),i=e.n(u);for(var a in u)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return u[t]}))}(a);n["default"]=i.a},f11b:function(t,n,e){"use strict";var u=e("784b"),i=e.n(u);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages-activity/incentive/signup/components/Tabs-create-component',
    {
        'pages-activity/incentive/signup/components/Tabs-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b4b7"))
        })
    },
    [['pages-activity/incentive/signup/components/Tabs-create-component']]
]);
