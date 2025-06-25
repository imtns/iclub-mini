(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/form/view-item"],{"0a14":function(t,e,n){"use strict";n.r(e);var a=n("29c5"),o=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},"1d89b":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.getLabel(t.model,t.field)),a=t.getLabel(t.model,t.field);t.$mp.data=Object.assign({},{$root:{m0:n,m1:a}})},i=[]},"29c5":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("2946"),o={name:"view-item",props:{field:{type:Object,default:function(){}},model:{type:Object,default:function(){}},formatValue:{type:Function,default:null}},methods:{getLabel:function(){return this.formatValue?this.formatValue(this.model,this.field):(0,a.getShowLabel)(this.model,this.field)},onLongPressed:function(e){var n=this;console.log(e),t.setClipboardData({data:e,success:function(e){t.vibrateShort({}),n.$refs.toast.show({message:"内容已复制"})}})}}};e.default=o}).call(this,n("543d")["default"])},"31cc":function(t,e,n){"use strict";n.r(e);var a=n("1d89b"),o=n("0a14");for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("fd60");var u,f=n("f0c5"),c=Object(f["a"])(o["default"],a["b"],a["c"],!1,null,"b7b9da72",null,!1,a["a"],u);e["default"]=c.exports},"7f4c":function(t,e,n){},fd60:function(t,e,n){"use strict";var a=n("7f4c"),o=n.n(a);o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/form/view-item-create-component',
    {
        'components/form/view-item-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("31cc"))
        })
    },
    [['components/form/view-item-create-component']]
]);
