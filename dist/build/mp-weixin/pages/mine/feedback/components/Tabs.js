require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/feedback/components/Tabs"],{"0b09":function(t,e,n){"use strict";var a=n("1130"),u=n.n(a);u.a},1130:function(t,e,n){},"4a5e":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"Tabs",props:{defaultSelect:{type:Number,default:1}},data:function(){return{showBg:1,selIndex:1,bg:["","https://udstatic.imeik.com/pcUploads/1704694589193/tit%402x.png","https://udstatic.imeik.com/pcUploads/1704694709252/tit.png"],list:[{name:"提交反馈",value:1},{name:"反馈记录",value:2}]}},methods:{actived:function(t,e){this.showBg=e,this.selIndex=t,this.$emit("click",t)}}};e.default=a},7245:function(t,e,n){"use strict";n.r(e);var a=n("e922"),u=n("b06c");for(var c in u)["default"].indexOf(c)<0&&function(t){n.d(e,t,(function(){return u[t]}))}(c);n("0b09");var i,r=n("f0c5"),s=Object(r["a"])(u["default"],a["b"],a["c"],!1,null,"67d0c164",null,!1,a["a"],i);e["default"]=s.exports},b06c:function(t,e,n){"use strict";n.r(e);var a=n("4a5e"),u=n.n(a);for(var c in a)["default"].indexOf(c)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(c);e["default"]=u.a},e922:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return a}));var u=function(){var t=this,e=t.$createElement;t._self._c},c=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/mine/feedback/components/Tabs-create-component',
    {
        'pages/mine/feedback/components/Tabs-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7245"))
        })
    },
    [['pages/mine/feedback/components/Tabs-create-component']]
]);
