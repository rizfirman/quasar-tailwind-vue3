import{P as D}from"./index.d50dfcb0.js";/*! js-cookie v3.0.5 | MIT */function s(e){for(var o=1;o<arguments.length;o++){var c=arguments[o];for(var f in c)e[f]=c[f]}return e}var v={read:function(e){return e[0]==='"'&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function l(e,o){function c(n,a,t){if(typeof document!="undefined"){t=s({},o,t),typeof t.expires=="number"&&(t.expires=new Date(Date.now()+t.expires*864e5)),t.expires&&(t.expires=t.expires.toUTCString()),n=encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var r="";for(var i in t)!t[i]||(r+="; "+i,t[i]!==!0&&(r+="="+t[i].split(";")[0]));return document.cookie=n+"="+e.write(a,n)+r}}function f(n){if(!(typeof document=="undefined"||arguments.length&&!n)){for(var a=document.cookie?document.cookie.split("; "):[],t={},r=0;r<a.length;r++){var i=a[r].split("="),u=i.slice(1).join("=");try{var d=decodeURIComponent(i[0]);if(t[d]=e.read(u,d),n===d)break}catch{}}return n?t[n]:t}}return Object.create({set:c,get:f,remove:function(n,a){c(n,"",s({},a,{expires:-1}))},withAttributes:function(n){return l(this.converter,s({},this.attributes,n))},withConverter:function(n){return l(s({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(e)}})}var p=l(v,{path:"/"});const C=D("detailData",{state:()=>({detailData:{}}),actions:{setDetailData(e){this.detailData=e,p.set("detailData",JSON.stringify(e),{expires:7})},loadDetailData(){const e=p.get("detailData");e&&(this.detailData=JSON.parse(e))},clearDetailData(){this.detailData={},p.remove("detailData")}}});export{C as u};
