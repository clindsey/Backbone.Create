(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

// Make it safe to do console.log() always.
(function (con) {
  var method;
  var dummy = function() {};
  var methods = ('assert,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' + 
     'time,timeEnd,trace,warn').split(',');
  while (method = methods.pop()) {
    con[method] = con[method] || dummy;
  }
})(window.console = window.console || {});
;

/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);;

/*!
 * Lo-Dash 0.10.0 <http://lodash.com>
 * (c) 2012 John-David Dalton <http://allyoucanleet.com/>
 * Based on Underscore.js 1.4.2 <http://underscorejs.org>
 * (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
 * Available under MIT license <http://lodash.com/license>
 */
;(function(window, undefined) {

  /** Detect free variable `exports` */
  var freeExports = typeof exports == 'object' && exports;

  /** Detect free variable `global` and use it as `window` */
  var freeGlobal = typeof global == 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    window = freeGlobal;
  }

  /** Used for array and object method references */
  var arrayRef = [],
      // avoid a Closure Compiler bug by creatively creating an object
      objectRef = new function(){};

  /** Used to generate unique IDs */
  var idCounter = 0;

  /** Used internally to indicate various things */
  var indicatorObject = objectRef;

  /** Used by `cachedContains` as the default size when optimizations are enabled for large arrays */
  var largeArraySize = 30;

  /** Used to restore the original `_` reference in `noConflict` */
  var oldDash = window._;

  /** Used to detect template delimiter values that require a with-statement */
  var reComplexDelimiter = /[-?+=!~*%&^<>|{(\/]|\[\D|\b(?:delete|in|instanceof|new|typeof|void)\b/;

  /** Used to match HTML entities */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#x27);/g;

  /** Used to match empty string literals in compiled template source */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Used to match regexp flags from their coerced string values */
  var reFlags = /\w*$/;

  /** Used to insert the data object variable into compiled template source */
  var reInsertVariable = /(?:__e|__t = )\(\s*(?![\d\s"']|this\.)/g;

  /** Used to detect if a method is native */
  var reNative = RegExp('^' +
    (objectRef.valueOf + '')
      .replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&')
      .replace(/valueOf|for [^\]]+/g, '.+?') + '$'
  );

  /**
   * Used to match ES6 template delimiters
   * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-7.8.6
   */
  var reEsTemplate = /\$\{((?:(?=\\?)\\?[\s\S])*?)}/g;

  /** Used to match "interpolate" template delimiters */
  var reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to ensure capturing order of template delimiters */
  var reNoMatch = /($^)/;

  /** Used to match HTML characters */
  var reUnescapedHtml = /[&<>"']/g;

  /** Used to match unescaped characters in compiled string literals */
  var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

  /** Used to fix the JScript [[DontEnum]] bug */
  var shadowed = [
    'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
    'toLocaleString', 'toString', 'valueOf'
  ];

  /** Used to make template sourceURLs easier to identify */
  var templateCounter = 0;

  /** Native method shortcuts */
  var ceil = Math.ceil,
      concat = arrayRef.concat,
      floor = Math.floor,
      getPrototypeOf = reNative.test(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
      hasOwnProperty = objectRef.hasOwnProperty,
      push = arrayRef.push,
      propertyIsEnumerable = objectRef.propertyIsEnumerable,
      slice = arrayRef.slice,
      toString = objectRef.toString;

  /* Native method shortcuts for methods with the same name as other `lodash` methods */
  var nativeBind = reNative.test(nativeBind = slice.bind) && nativeBind,
      nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray,
      nativeIsFinite = window.isFinite,
      nativeIsNaN = window.isNaN,
      nativeKeys = reNative.test(nativeKeys = Object.keys) && nativeKeys,
      nativeMax = Math.max,
      nativeMin = Math.min,
      nativeRandom = Math.random;

  /** `Object#toString` result shortcuts */
  var argsClass = '[object Arguments]',
      arrayClass = '[object Array]',
      boolClass = '[object Boolean]',
      dateClass = '[object Date]',
      funcClass = '[object Function]',
      numberClass = '[object Number]',
      objectClass = '[object Object]',
      regexpClass = '[object RegExp]',
      stringClass = '[object String]';

  /**
   * Detect the JScript [[DontEnum]] bug:
   *
   * In IE < 9 an objects own properties, shadowing non-enumerable ones, are
   * made non-enumerable as well.
   */
  var hasDontEnumBug;

  /** Detect if own properties are iterated after inherited properties (IE < 9) */
  var iteratesOwnLast;

  /**
   * Detect if `Array#shift` and `Array#splice` augment array-like objects
   * incorrectly:
   *
   * Firefox < 10, IE compatibility mode, and IE < 9 have buggy Array `shift()`
   * and `splice()` functions that fail to remove the last element, `value[0]`,
   * of array-like objects even though the `length` property is set to `0`.
   * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
   * is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
   */
  var hasObjectSpliceBug = (hasObjectSpliceBug = { '0': 1, 'length': 1 },
    arrayRef.splice.call(hasObjectSpliceBug, 0, 1), hasObjectSpliceBug[0]);

  /** Detect if an `arguments` object's indexes are non-enumerable (IE < 9) */
  var noArgsEnum = true;

  (function() {
    var props = [];
    function ctor() { this.x = 1; }
    ctor.prototype = { 'valueOf': 1, 'y': 1 };
    for (var prop in new ctor) { props.push(prop); }
    for (prop in arguments) { noArgsEnum = !prop; }

    hasDontEnumBug = !/valueOf/.test(props);
    iteratesOwnLast = props[0] != 'x';
  }(1));

  /** Detect if an `arguments` object's [[Class]] is unresolvable (Firefox < 4, IE < 9) */
  var noArgsClass = !isArguments(arguments);

  /** Detect if `Array#slice` cannot be used to convert strings to arrays (Opera < 10.52) */
  var noArraySliceOnStrings = slice.call('x')[0] != 'x';

  /**
   * Detect lack of support for accessing string characters by index:
   *
   * IE < 8 can't access characters by index and IE 8 can only access
   * characters by index on string literals.
   */
  var noCharByIndex = ('x'[0] + Object('x')[0]) != 'xx';

  /**
   * Detect if a node's [[Class]] is unresolvable (IE < 9)
   * and that the JS engine won't error when attempting to coerce an object to
   * a string without a `toString` property value of `typeof` "function".
   */
  try {
    var noNodeClass = ({ 'toString': 0 } + '', toString.call(window.document || 0) == objectClass);
  } catch(e) { }

  /* Detect if `Function#bind` exists and is inferred to be fast (all but V8) */
  var isBindFast = nativeBind && /\n|Opera/.test(nativeBind + toString.call(window.opera));

  /* Detect if `Object.keys` exists and is inferred to be fast (IE, Opera, V8) */
  var isKeysFast = nativeKeys && /^.+$|true/.test(nativeKeys + !!window.attachEvent);

  /**
   * Detect if sourceURL syntax is usable without erroring:
   *
   * The JS engine in Adobe products, like InDesign, will throw a syntax error
   * when it encounters a single line comment beginning with the `@` symbol.
   *
   * The JS engine in Narwhal will generate the function `function anonymous(){//}`
   * and throw a syntax error.
   *
   * Avoid comments beginning `@` symbols in IE because they are part of its
   * non-standard conditional compilation support.
   * http://msdn.microsoft.com/en-us/library/121hztk3(v=vs.94).aspx
   */
  try {
    var useSourceURL = (Function('//@')(), !window.attachEvent);
  } catch(e) { }

  /** Used to identify object classifications that `_.clone` supports */
  var cloneableClasses = {};
  cloneableClasses[argsClass] = cloneableClasses[funcClass] = false;
  cloneableClasses[arrayClass] = cloneableClasses[boolClass] = cloneableClasses[dateClass] =
  cloneableClasses[numberClass] = cloneableClasses[objectClass] = cloneableClasses[regexpClass] =
  cloneableClasses[stringClass] = true;

  /** Used to determine if values are of the language type Object */
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  /** Used to escape characters for inclusion in compiled string literals */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\t': 't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /*--------------------------------------------------------------------------*/

  /**
   * The `lodash` function.
   *
   * @name _
   * @constructor
   * @category Chaining
   * @param {Mixed} value The value to wrap in a `lodash` instance.
   * @returns {Object} Returns a `lodash` instance.
   */
  function lodash(value) {
    // exit early if already wrapped
    if (value && value.__wrapped__) {
      return value;
    }
    // allow invoking `lodash` without the `new` operator
    if (!(this instanceof lodash)) {
      return new lodash(value);
    }
    this.__wrapped__ = value;
  }

  /**
   * By default, the template delimiters used by Lo-Dash are similar to those in
   * embedded Ruby (ERB). Change the following template settings to use alternative
   * delimiters.
   *
   * @static
   * @memberOf _
   * @type Object
   */
  lodash.templateSettings = {

    /**
     * Used to detect `data` property values to be HTML-escaped.
     *
     * @static
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'escape': /<%-([\s\S]+?)%>/g,

    /**
     * Used to detect code to be evaluated.
     *
     * @static
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'evaluate': /<%([\s\S]+?)%>/g,

    /**
     * Used to detect `data` property values to inject.
     *
     * @static
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'interpolate': reInterpolate,

    /**
     * Used to reference the data object in the template text.
     *
     * @static
     * @memberOf _.templateSettings
     * @type String
     */
    'variable': ''
  };

  /*--------------------------------------------------------------------------*/

  /**
   * The template used to create iterator functions.
   *
   * @private
   * @param {Obect} data The data object used to populate the text.
   * @returns {String} Returns the interpolated text.
   */
  var iteratorTemplate = template(
    // conditional strict mode
    '<% if (obj.useStrict) { %>\'use strict\';\n<% } %>' +

    // the `iteratee` may be reassigned by the `top` snippet
    'var index, value, iteratee = <%= firstArg %>, ' +
    // assign the `result` variable an initial value
    'result = <%= firstArg %>;\n' +
    // exit early if the first argument is falsey
    'if (!<%= firstArg %>) return result;\n' +
    // add code before the iteration branches
    '<%= top %>;\n' +

    // array-like iteration:
    '<% if (arrayLoop) { %>' +
    'var length = iteratee.length; index = -1;\n' +
    'if (typeof length == \'number\') {' +

    // add support for accessing string characters by index if needed
    '  <% if (noCharByIndex) { %>\n' +
    '  if (isString(iteratee)) {\n' +
    '    iteratee = iteratee.split(\'\')\n' +
    '  }' +
    '  <% } %>\n' +

    // iterate over the array-like value
    '  while (++index < length) {\n' +
    '    value = iteratee[index];\n' +
    '    <%= arrayLoop %>\n' +
    '  }\n' +
    '}\n' +
    'else {' +

    // object iteration:
    // add support for iterating over `arguments` objects if needed
    '  <%  } else if (noArgsEnum) { %>\n' +
    '  var length = iteratee.length; index = -1;\n' +
    '  if (length && isArguments(iteratee)) {\n' +
    '    while (++index < length) {\n' +
    '      value = iteratee[index += \'\'];\n' +
    '      <%= objectLoop %>\n' +
    '    }\n' +
    '  } else {' +
    '  <% } %>' +

    // Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
    // (if the prototype or a property on the prototype has been set)
    // incorrectly sets a function's `prototype` property [[Enumerable]]
    // value to `true`. Because of this Lo-Dash standardizes on skipping
    // the the `prototype` property of functions regardless of its
    // [[Enumerable]] value.
    '  <% if (!hasDontEnumBug) { %>\n' +
    '  var skipProto = typeof iteratee == \'function\' && \n' +
    '    propertyIsEnumerable.call(iteratee, \'prototype\');\n' +
    '  <% } %>' +

    // iterate own properties using `Object.keys` if it's fast
    '  <% if (isKeysFast && useHas) { %>\n' +
    '  var ownIndex = -1,\n' +
    '      ownProps = objectTypes[typeof iteratee] ? nativeKeys(iteratee) : [],\n' +
    '      length = ownProps.length;\n\n' +
    '  while (++ownIndex < length) {\n' +
    '    index = ownProps[ownIndex];\n' +
    '    <% if (!hasDontEnumBug) { %>if (!(skipProto && index == \'prototype\')) {\n  <% } %>' +
    '    value = iteratee[index];\n' +
    '    <%= objectLoop %>\n' +
    '    <% if (!hasDontEnumBug) { %>}\n<% } %>' +
    '  }' +

    // else using a for-in loop
    '  <% } else { %>\n' +
    '  for (index in iteratee) {<%' +
    '    if (!hasDontEnumBug || useHas) { %>\n    if (<%' +
    '      if (!hasDontEnumBug) { %>!(skipProto && index == \'prototype\')<% }' +
    '      if (!hasDontEnumBug && useHas) { %> && <% }' +
    '      if (useHas) { %>hasOwnProperty.call(iteratee, index)<% }' +
    '    %>) {' +
    '    <% } %>\n' +
    '    value = iteratee[index];\n' +
    '    <%= objectLoop %>;' +
    '    <% if (!hasDontEnumBug || useHas) { %>\n    }<% } %>\n' +
    '  }' +
    '  <% } %>' +

    // Because IE < 9 can't set the `[[Enumerable]]` attribute of an
    // existing property and the `constructor` property of a prototype
    // defaults to non-enumerable, Lo-Dash skips the `constructor`
    // property when it infers it's iterating over a `prototype` object.
    '  <% if (hasDontEnumBug) { %>\n\n' +
    '  var ctor = iteratee.constructor;\n' +
    '    <% for (var k = 0; k < 7; k++) { %>\n' +
    '  index = \'<%= shadowed[k] %>\';\n' +
    '  if (<%' +
    '      if (shadowed[k] == \'constructor\') {' +
    '        %>!(ctor && ctor.prototype === iteratee) && <%' +
    '      } %>hasOwnProperty.call(iteratee, index)) {\n' +
    '    value = iteratee[index];\n' +
    '    <%= objectLoop %>\n' +
    '  }' +
    '    <% } %>' +
    '  <% } %>' +
    '  <% if (arrayLoop || noArgsEnum) { %>\n}<% } %>\n' +

    // add code to the bottom of the iteration function
    '<%= bottom %>;\n' +
    // finally, return the `result`
    'return result'
  );

  /** Reusable iterator options for `assign` and `defaults` */
  var assignIteratorOptions = {
    'args': 'object, source, guard',
    'top':
      'for (var argsIndex = 1, argsLength = typeof guard == \'number\' ? 2 : arguments.length; argsIndex < argsLength; argsIndex++) {\n' +
      '  if ((iteratee = arguments[argsIndex])) {',
    'objectLoop': 'result[index] = value',
    'bottom': '  }\n}'
  };

  /**
   * Reusable iterator options shared by `forEach`, `forIn`, and `forOwn`.
   */
  var forEachIteratorOptions = {
    'args': 'collection, callback, thisArg',
    'top': 'callback = createCallback(callback, thisArg)',
    'arrayLoop': 'if (callback(value, index, collection) === false) return result',
    'objectLoop': 'if (callback(value, index, collection) === false) return result'
  };

  /** Reusable iterator options for `forIn` and `forOwn` */
  var forOwnIteratorOptions = {
    'arrayLoop': null
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a function optimized to search large arrays for a given `value`,
   * starting at `fromIndex`, using strict equality for comparisons, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {Mixed} value The value to search for.
   * @param {Number} [fromIndex=0] The index to search from.
   * @param {Number} [largeSize=30] The length at which an array is considered large.
   * @returns {Boolean} Returns `true` if `value` is found, else `false`.
   */
  function cachedContains(array, fromIndex, largeSize) {
    fromIndex || (fromIndex = 0);

    var length = array.length,
        isLarge = (length - fromIndex) >= (largeSize || largeArraySize);

    if (isLarge) {
      var cache = {},
          index = fromIndex - 1;

      while (++index < length) {
        // manually coerce `value` to a string because `hasOwnProperty`, in some
        // older versions of Firefox, coerces objects incorrectly
        var key = array[index] + '';
        (hasOwnProperty.call(cache, key) ? cache[key] : (cache[key] = [])).push(array[index]);
      }
    }
    return function(value) {
      if (isLarge) {
        var key = value + '';
        return hasOwnProperty.call(cache, key) && indexOf(cache[key], value) > -1;
      }
      return indexOf(array, value, fromIndex) > -1;
    }
  }

  /**
   * Used by `_.max` and `_.min` as the default `callback` when a given
   * `collection` is a string value.
   *
   * @private
   * @param {String} value The character to inspect.
   * @returns {Number} Returns the code unit of given character.
   */
  function charAtCallback(value) {
    return value.charCodeAt(0);
  }

  /**
   * Used by `sortBy` to compare transformed `collection` values, stable sorting
   * them in ascending order.
   *
   * @private
   * @param {Object} a The object to compare to `b`.
   * @param {Object} b The object to compare to `a`.
   * @returns {Number} Returns the sort order indicator of `1` or `-1`.
   */
  function compareAscending(a, b) {
    var ai = a.index,
        bi = b.index;

    a = a.criteria;
    b = b.criteria;

    // ensure a stable sort in V8 and other engines
    // http://code.google.com/p/v8/issues/detail?id=90
    if (a !== b) {
      if (a > b || a === undefined) {
        return 1;
      }
      if (a < b || b === undefined) {
        return -1;
      }
    }
    return ai < bi ? -1 : 1;
  }

  /**
   * Creates a function that, when called, invokes `func` with the `this`
   * binding of `thisArg` and prepends any `partailArgs` to the arguments passed
   * to the bound function.
   *
   * @private
   * @param {Function|String} func The function to bind or the method name.
   * @param {Mixed} [thisArg] The `this` binding of `func`.
   * @param {Array} partialArgs An array of arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   */
  function createBound(func, thisArg, partialArgs) {
    var isFunc = isFunction(func),
        isPartial = !partialArgs,
        key = thisArg;

    // juggle arguments
    if (isPartial) {
      partialArgs = thisArg;
    }
    if (!isFunc) {
      thisArg = func;
    }

    function bound() {
      // `Function#bind` spec
      // http://es5.github.com/#x15.3.4.5
      var args = arguments,
          thisBinding = isPartial ? this : thisArg;

      if (!isFunc) {
        func = thisArg[key];
      }
      if (partialArgs.length) {
        args = args.length
          ? partialArgs.concat(slice.call(args))
          : partialArgs;
      }
      if (this instanceof bound) {
        // get `func` instance if `bound` is invoked in a `new` expression
        noop.prototype = func.prototype;
        thisBinding = new noop;

        // mimic the constructor's `return` behavior
        // http://es5.github.com/#x13.2.2
        var result = func.apply(thisBinding, args);
        return isObject(result)
          ? result
          : thisBinding
      }
      return func.apply(thisBinding, args);
    }
    return bound;
  }

  /**
   * Produces an iteration callback bound to an optional `thisArg`. If `func` is
   * a property name, the callback will return the property value for a given element.
   *
   * @private
   * @param {Function|String} [func=identity|property] The function called per
   * iteration or property name to query.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Function} Returns a callback function.
   */
  function createCallback(func, thisArg) {
    if (!func) {
      return identity;
    }
    if (typeof func != 'function') {
      return function(object) {
        return object[func];
      };
    }
    if (thisArg !== undefined) {
      return function(value, index, object) {
        return func.call(thisArg, value, index, object);
      };
    }
    return func;
  }

  /**
   * Creates compiled iteration functions.
   *
   * @private
   * @param {Object} [options1, options2, ...] The compile options object(s).
   *  useHas - A boolean to specify using `hasOwnProperty` checks in the object loop.
   *  args - A string of comma separated arguments the iteration function will accept.
   *  top - A string of code to execute before the iteration branches.
   *  arrayLoop - A string of code to execute in the array loop.
   *  objectLoop - A string of code to execute in the object loop.
   *  bottom - A string of code to execute after the iteration branches.
   *
   * @returns {Function} Returns the compiled function.
   */
  function createIterator() {
    var data = {
      'arrayLoop': '',
      'bottom': '',
      'hasDontEnumBug': hasDontEnumBug,
      'isKeysFast': isKeysFast,
      'objectLoop': '',
      'noArgsEnum': noArgsEnum,
      'noCharByIndex': noCharByIndex,
      'shadowed': shadowed,
      'top': '',
      'useHas': true
    };

    // merge options into a template data object
    for (var object, index = 0; object = arguments[index]; index++) {
      for (var key in object) {
        data[key] = object[key];
      }
    }
    var args = data.args;
    data.firstArg = /^[^,]+/.exec(args)[0];

    // create the function factory
    var factory = Function(
        'createCallback, hasOwnProperty, isArguments, isString, objectTypes, ' +
        'nativeKeys, propertyIsEnumerable',
      'return function(' + args + ') {\n' + iteratorTemplate(data) + '\n}'
    );
    // return the compiled function
    return factory(
      createCallback, hasOwnProperty, isArguments, isString, objectTypes,
      nativeKeys, propertyIsEnumerable
    );
  }

  /**
   * Used by `template` to escape characters for inclusion in compiled
   * string literals.
   *
   * @private
   * @param {String} match The matched character to escape.
   * @returns {String} Returns the escaped character.
   */
  function escapeStringChar(match) {
    return '\\' + stringEscapes[match];
  }

  /**
   * Used by `escape` to convert characters to HTML entities.
   *
   * @private
   * @param {String} match The matched character to escape.
   * @returns {String} Returns the escaped character.
   */
  function escapeHtmlChar(match) {
    return htmlEscapes[match];
  }

  /**
   * A no-operation function.
   *
   * @private
   */
  function noop() {
    // no operation performed
  }

  /**
   * Used by `unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {String} match The matched character to unescape.
   * @returns {String} Returns the unescaped character.
   */
  function unescapeHtmlChar(match) {
    return htmlUnescapes[match];
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Assigns own enumerable properties of source object(s) to the `destination`
   * object. Subsequent sources will overwrite propery assignments of previous
   * sources.
   *
   * @static
   * @memberOf _
   * @alias extend
   * @category Objects
   * @param {Object} object The destination object.
   * @param {Object} [source1, source2, ...] The source objects.
   * @returns {Object} Returns the destination object.
   * @example
   *
   * _.assign({ 'name': 'moe' }, { 'age': 40 });
   * // => { 'name': 'moe', 'age': 40 }
   */
  var assign = createIterator(assignIteratorOptions);

  /**
   * Checks if `value` is an `arguments` object.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
   * @example
   *
   * (function() { return _.isArguments(arguments); })(1, 2, 3);
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  function isArguments(value) {
    return toString.call(value) == argsClass;
  }
  // fallback for browsers that can't detect `arguments` objects by [[Class]]
  if (noArgsClass) {
    isArguments = function(value) {
      return value ? hasOwnProperty.call(value, 'callee') : false;
    };
  }

  /**
   * Iterates over `object`'s own and inherited enumerable properties, executing
   * the `callback` for each property. The `callback` is bound to `thisArg` and
   * invoked with three arguments; (value, key, object). Callbacks may exit iteration
   * early by explicitly returning `false`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns `object`.
   * @example
   *
   * function Dog(name) {
   *   this.name = name;
   * }
   *
   * Dog.prototype.bark = function() {
   *   alert('Woof, woof!');
   * };
   *
   * _.forIn(new Dog('Dagny'), function(value, key) {
   *   alert(key);
   * });
   * // => alerts 'name' and 'bark' (order is not guaranteed)
   */
  var forIn = createIterator(forEachIteratorOptions, forOwnIteratorOptions, {
    'useHas': false
  });

  /**
   * Iterates over an object's own enumerable properties, executing the `callback`
   * for each property. The `callback` is bound to `thisArg` and invoked with three
   * arguments; (value, key, object). Callbacks may exit iteration early by explicitly
   * returning `false`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns `object`.
   * @example
   *
   * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
   *   alert(key);
   * });
   * // => alerts '0', '1', and 'length' (order is not guaranteed)
   */
  var forOwn = createIterator(forEachIteratorOptions, forOwnIteratorOptions);

  /**
   * A fallback implementation of `isPlainObject` that checks if a given `value`
   * is an object created by the `Object` constructor, assuming objects created
   * by the `Object` constructor have no inherited enumerable properties and that
   * there are no `Object.prototype` extensions.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if `value` is a plain object, else `false`.
   */
  function shimIsPlainObject(value) {
    // avoid non-objects and false positives for `arguments` objects
    var result = false;
    if (!(value && typeof value == 'object') || isArguments(value)) {
      return result;
    }
    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
    // methods that are `typeof` "string" and still can coerce nodes to strings.
    // Also check that the constructor is `Object` (i.e. `Object instanceof Object`)
    var ctor = value.constructor;
    if ((!noNodeClass || !(typeof value.toString != 'function' && typeof (value + '') == 'string')) &&
        (!isFunction(ctor) || ctor instanceof ctor)) {
      // IE < 9 iterates inherited properties before own properties. If the first
      // iterated property is an object's own property then there are no inherited
      // enumerable properties.
      if (iteratesOwnLast) {
        forIn(value, function(value, key, object) {
          result = !hasOwnProperty.call(object, key);
          return false;
        });
        return result === false;
      }
      // In most environments an object's own properties are iterated before
      // its inherited properties. If the last iterated property is an object's
      // own property then there are no inherited enumerable properties.
      forIn(value, function(value, key) {
        result = key;
      });
      return result === false || hasOwnProperty.call(value, result);
    }
    return result;
  }

  /**
   * A fallback implementation of `Object.keys` that produces an array of the
   * given object's own enumerable property names.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns a new array of property names.
   */
  function shimKeys(object) {
    var result = [];
    forOwn(object, function(value, key) {
      result.push(key);
    });
    return result;
  }

  /**
   * Used to convert characters to HTML entities:
   *
   * Though the `>` character is escaped for symmetry, characters like `>` and `/`
   * don't require escaping in HTML and have no special meaning unless they're part
   * of a tag or an unquoted attribute value.
   * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
   */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
  };

  /** Used to convert HTML entities to characters */
  var htmlUnescapes = invert(htmlEscapes);

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a clone of `value`. If `deep` is `true`, all nested objects will
   * also be cloned otherwise they will be assigned by reference. Functions, DOM
   * nodes, `arguments` objects, and objects created by constructors other than
   * `Object` are **not** cloned.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to clone.
   * @param {Boolean} deep A flag to indicate a deep clone.
   * @param- {Object} [guard] Internally used to allow this method to work with
   *  others like `_.map` without using their callback `index` argument for `deep`.
   * @param- {Array} [stackA=[]] Internally used to track traversed source objects.
   * @param- {Array} [stackB=[]] Internally used to associate clones with their
   *  source counterparts.
   * @returns {Mixed} Returns the cloned `value`.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * _.clone({ 'name': 'moe' });
   * // => { 'name': 'moe' }
   *
   * var shallow = _.clone(stooges);
   * shallow[0] === stooges[0];
   * // => true
   *
   * var deep = _.clone(stooges, true);
   * shallow[0] === stooges[0];
   * // => false
   */
  function clone(value, deep, guard, stackA, stackB) {
    if (value == null) {
      return value;
    }
    if (guard) {
      deep = false;
    }
    // inspect [[Class]]
    var isObj = isObject(value);
    if (isObj) {
      // don't clone `arguments` objects, functions, or non-object Objects
      var className = toString.call(value);
      if (!cloneableClasses[className] || (noArgsClass && isArguments(value))) {
        return value;
      }
      var isArr = className == arrayClass;
      isObj = isArr || (className == objectClass ? isPlainObject(value) : isObj);
    }
    // shallow clone
    if (!isObj || !deep) {
      // don't clone functions
      return isObj
        ? (isArr ? slice.call(value) : assign({}, value))
        : value;
    }

    var ctor = value.constructor;
    switch (className) {
      case boolClass:
      case dateClass:
        return new ctor(+value);

      case numberClass:
      case stringClass:
        return new ctor(value);

      case regexpClass:
        return ctor(value.source, reFlags.exec(value));
    }
    // check for circular references and return corresponding clone
    stackA || (stackA = []);
    stackB || (stackB = []);

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == value) {
        return stackB[length];
      }
    }
    // init cloned object
    var result = isArr ? ctor(value.length) : {};

    // add the source value to the stack of traversed objects
    // and associate it with its clone
    stackA.push(value);
    stackB.push(result);

    // recursively populate clone (susceptible to call stack limits)
    (isArr ? forEach : forOwn)(value, function(objValue, key) {
      result[key] = clone(objValue, deep, null, stackA, stackB);
    });

    return result;
  }

  /**
   * Assigns own enumerable properties of source object(s) to the `destination`
   * object for all `destination` properties that resolve to `null`/`undefined`.
   * Once a property is set, additional defaults of the same property will be
   * ignored.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The destination object.
   * @param {Object} [default1, default2, ...] The default objects.
   * @returns {Object} Returns the destination object.
   * @example
   *
   * var iceCream = { 'flavor': 'chocolate' };
   * _.defaults(iceCream, { 'flavor': 'vanilla', 'sprinkles': 'rainbow' });
   * // => { 'flavor': 'chocolate', 'sprinkles': 'rainbow' }
   */
  var defaults = createIterator(assignIteratorOptions, {
    'objectLoop': 'if (result[index] == null) ' + assignIteratorOptions.objectLoop
  });

  /**
   * Creates a sorted array of all enumerable properties, own and inherited,
   * of `object` that have function values.
   *
   * @static
   * @memberOf _
   * @alias methods
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns a new array of property names that have function values.
   * @example
   *
   * _.functions(_);
   * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
   */
  function functions(object) {
    var result = [];
    forIn(object, function(value, key) {
      if (isFunction(value)) {
        result.push(key);
      }
    });
    return result.sort();
  }

  /**
   * Checks if the specified object `property` exists and is a direct property,
   * instead of an inherited property.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to check.
   * @param {String} property The property to check for.
   * @returns {Boolean} Returns `true` if key is a direct property, else `false`.
   * @example
   *
   * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
   * // => true
   */
  function has(object, property) {
    return object ? hasOwnProperty.call(object, property) : false;
  }

  /**
   * Creates an object composed of the inverted keys and values of the given `object`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to invert.
   * @returns {Object} Returns the created inverted object.
   * @example
   *
   *  _.invert({ 'first': 'Moe', 'second': 'Larry', 'third': 'Curly' });
   * // => { 'Moe': 'first', 'Larry': 'second', 'Curly': 'third' } (order is not guaranteed)
   */
  function invert(object) {
    var result = {};
    forOwn(object, function(value, key) {
      result[value] = key;
    });
    return result;
  }

  /**
   * Checks if `value` is an array.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is an array, else `false`.
   * @example
   *
   * (function() { return _.isArray(arguments); })();
   * // => false
   *
   * _.isArray([1, 2, 3]);
   * // => true
   */
  var isArray = nativeIsArray || function(value) {
    return toString.call(value) == arrayClass;
  };

  /**
   * Checks if `value` is a boolean (`true` or `false`) value.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a boolean value, else `false`.
   * @example
   *
   * _.isBoolean(null);
   * // => false
   */
  function isBoolean(value) {
    return value === true || value === false || toString.call(value) == boolClass;
  }

  /**
   * Checks if `value` is a date.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a date, else `false`.
   * @example
   *
   * _.isDate(new Date);
   * // => true
   */
  function isDate(value) {
    return toString.call(value) == dateClass;
  }

  /**
   * Checks if `value` is a DOM element.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a DOM element, else `false`.
   * @example
   *
   * _.isElement(document.body);
   * // => true
   */
  function isElement(value) {
    return value ? value.nodeType === 1 : false;
  }

  /**
   * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
   * length of `0` and objects with no own enumerable properties are considered
   * "empty".
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Array|Object|String} value The value to inspect.
   * @returns {Boolean} Returns `true` if the `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({});
   * // => true
   *
   * _.isEmpty('');
   * // => true
   */
  function isEmpty(value) {
    var result = true;
    if (!value) {
      return result;
    }
    var className = toString.call(value),
        length = value.length;

    if ((className == arrayClass || className == stringClass ||
        className == argsClass || (noArgsClass && isArguments(value))) ||
        (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
      return !length;
    }
    forOwn(value, function() {
      return (result = false);
    });
    return result;
  }

  /**
   * Performs a deep comparison between two values to determine if they are
   * equivalent to each other.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} a The value to compare.
   * @param {Mixed} b The other value to compare.
   * @param- {Object} [stackA=[]] Internally used track traversed `a` objects.
   * @param- {Object} [stackB=[]] Internally used track traversed `b` objects.
   * @returns {Boolean} Returns `true` if the values are equvalent, else `false`.
   * @example
   *
   * var moe = { 'name': 'moe', 'luckyNumbers': [13, 27, 34] };
   * var clone = { 'name': 'moe', 'luckyNumbers': [13, 27, 34] };
   *
   * moe == clone;
   * // => false
   *
   * _.isEqual(moe, clone);
   * // => true
   */
  function isEqual(a, b, stackA, stackB) {
    // exit early for identical values
    if (a === b) {
      // treat `+0` vs. `-0` as not equal
      return a !== 0 || (1 / a == 1 / b);
    }
    // a strict comparison is necessary because `null == undefined`
    if (a == null || b == null) {
      return a === b;
    }
    // compare [[Class]] names
    var className = toString.call(a);
    if (className != toString.call(b)) {
      return false;
    }
    switch (className) {
      case boolClass:
      case dateClass:
        // coerce dates and booleans to numbers, dates to milliseconds and booleans
        // to `1` or `0`, treating invalid dates coerced to `NaN` as not equal
        return +a == +b;

      case numberClass:
        // treat `NaN` vs. `NaN` as equal
        return a != +a
          ? b != +b
          // but treat `+0` vs. `-0` as not equal
          : (a == 0 ? (1 / a == 1 / b) : a == +b);

      case regexpClass:
      case stringClass:
        // coerce regexes to strings (http://es5.github.com/#x15.10.6.4)
        // treat string primitives and their corresponding object instances as equal
        return a == b + '';
    }
    // exit early, in older browsers, if `a` is array-like but not `b`
    var isArr = className == arrayClass || className == argsClass;
    if (noArgsClass && !isArr && (isArr = isArguments(a)) && !isArguments(b)) {
      return false;
    }
    if (!isArr) {
      // unwrap any `lodash` wrapped values
      if (a.__wrapped__ || b.__wrapped__) {
        return isEqual(a.__wrapped__ || a, b.__wrapped__ || b);
      }
      // exit for functions and DOM nodes
      if (className != objectClass || (noNodeClass && (
          (typeof a.toString != 'function' && typeof (a + '') == 'string') ||
          (typeof b.toString != 'function' && typeof (b + '') == 'string')))) {
        return false;
      }
      var ctorA = a.constructor,
          ctorB = b.constructor;

      // non `Object` object instances with different constructors are not equal
      if (ctorA != ctorB && !(
            isFunction(ctorA) && ctorA instanceof ctorA &&
            isFunction(ctorB) && ctorB instanceof ctorB
          )) {
        return false;
      }
    }
    // assume cyclic structures are equal
    // the algorithm for detecting cyclic structures is adapted from ES 5.1
    // section 15.12.3, abstract operation `JO` (http://es5.github.com/#x15.12.3)
    stackA || (stackA = []);
    stackB || (stackB = []);

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == a) {
        return stackB[length] == b;
      }
    }

    var index = -1,
        result = true,
        size = 0;

    // add `a` and `b` to the stack of traversed objects
    stackA.push(a);
    stackB.push(b);

    // recursively compare objects and arrays (susceptible to call stack limits)
    if (isArr) {
      // compare lengths to determine if a deep comparison is necessary
      size = a.length;
      result = size == b.length;

      if (result) {
        // deep compare the contents, ignoring non-numeric properties
        while (size--) {
          if (!(result = isEqual(a[size], b[size], stackA, stackB))) {
            break;
          }
        }
      }
      return result;
    }
    // deep compare objects
    for (var key in a) {
      if (hasOwnProperty.call(a, key)) {
        // count the number of properties.
        size++;
        // deep compare each property value.
        if (!(hasOwnProperty.call(b, key) && isEqual(a[key], b[key], stackA, stackB))) {
          return false;
        }
      }
    }
    // ensure both objects have the same number of properties
    for (key in b) {
      // The JS engine in Adobe products, like InDesign, has a bug that causes
      // `!size--` to throw an error so it must be wrapped in parentheses.
      // https://github.com/documentcloud/underscore/issues/355
      if (hasOwnProperty.call(b, key) && !(size--)) {
        // `size` will be `-1` if `b` has more properties than `a`
        return false;
      }
    }
    // handle JScript [[DontEnum]] bug
    if (hasDontEnumBug) {
      while (++index < 7) {
        key = shadowed[index];
        if (hasOwnProperty.call(a, key) &&
            !(hasOwnProperty.call(b, key) && isEqual(a[key], b[key], stackA, stackB))) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Checks if `value` is, or can be coerced to, a finite number.
   *
   * Note: This is not the same as native `isFinite`, which will return true for
   * booleans and empty strings. See http://es5.github.com/#x15.1.2.5.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a finite number, else `false`.
   * @example
   *
   * _.isFinite(-101);
   * // => true
   *
   * _.isFinite('10');
   * // => true
   *
   * _.isFinite(true);
   * // => false
   *
   * _.isFinite('');
   * // => false
   *
   * _.isFinite(Infinity);
   * // => false
   */
  function isFinite(value) {
    return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
  }

  /**
   * Checks if `value` is a function.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   */
  function isFunction(value) {
    return typeof value == 'function';
  }
  // fallback for older versions of Chrome and Safari
  if (isFunction(/x/)) {
    isFunction = function(value) {
      return toString.call(value) == funcClass;
    };
  }

  /**
   * Checks if `value` is the language type of Object.
   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(1);
   * // => false
   */
  function isObject(value) {
    // check if the value is the ECMAScript language type of Object
    // http://es5.github.com/#x8
    // and avoid a V8 bug
    // http://code.google.com/p/v8/issues/detail?id=2291
    return value ? objectTypes[typeof value] : false;
  }

  /**
   * Checks if `value` is `NaN`.
   *
   * Note: This is not the same as native `isNaN`, which will return true for
   * `undefined` and other values. See http://es5.github.com/#x15.1.2.4.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is `NaN`, else `false`.
   * @example
   *
   * _.isNaN(NaN);
   * // => true
   *
   * _.isNaN(new Number(NaN));
   * // => true
   *
   * isNaN(undefined);
   * // => true
   *
   * _.isNaN(undefined);
   * // => false
   */
  function isNaN(value) {
    // `NaN` as a primitive is the only value that is not equal to itself
    // (perform the [[Class]] check first to avoid errors with some host objects in IE)
    return toString.call(value) == numberClass && value != +value
  }

  /**
   * Checks if `value` is `null`.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is `null`, else `false`.
   * @example
   *
   * _.isNull(null);
   * // => true
   *
   * _.isNull(undefined);
   * // => false
   */
  function isNull(value) {
    return value === null;
  }

  /**
   * Checks if `value` is a number.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a number, else `false`.
   * @example
   *
   * _.isNumber(8.4 * 5);
   * // => true
   */
  function isNumber(value) {
    return toString.call(value) == numberClass;
  }

  /**
   * Checks if a given `value` is an object created by the `Object` constructor.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Stooge(name, age) {
   *   this.name = name;
   *   this.age = age;
   * }
   *
   * _.isPlainObject(new Stooge('moe', 40));
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'name': 'moe', 'age': 40 });
   * // => true
   */
  var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
    if (!(value && typeof value == 'object')) {
      return false;
    }
    var valueOf = value.valueOf,
        objProto = typeof valueOf == 'function' && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

    return objProto
      ? value == objProto || (getPrototypeOf(value) == objProto && !isArguments(value))
      : shimIsPlainObject(value);
  };

  /**
   * Checks if `value` is a regular expression.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a regular expression, else `false`.
   * @example
   *
   * _.isRegExp(/moe/);
   * // => true
   */
  function isRegExp(value) {
    return toString.call(value) == regexpClass;
  }

  /**
   * Checks if `value` is a string.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a string, else `false`.
   * @example
   *
   * _.isString('moe');
   * // => true
   */
  function isString(value) {
    return toString.call(value) == stringClass;
  }

  /**
   * Checks if `value` is `undefined`.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is `undefined`, else `false`.
   * @example
   *
   * _.isUndefined(void 0);
   * // => true
   */
  function isUndefined(value) {
    return value === undefined;
  }

  /**
   * Creates an array composed of the own enumerable property names of `object`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns a new array of property names.
   * @example
   *
   * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
   * // => ['one', 'two', 'three'] (order is not guaranteed)
   */
  var keys = !nativeKeys ? shimKeys : function(object) {
    // avoid iterating over the `prototype` property
    return typeof object == 'function' && propertyIsEnumerable.call(object, 'prototype')
      ? shimKeys(object)
      : (isObject(object) ? nativeKeys(object) : []);
  };

  /**
   * Merges enumerable properties of the source object(s) into the `destination`
   * object. Subsequent sources will overwrite propery assignments of previous
   * sources.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The destination object.
   * @param {Object} [source1, source2, ...] The source objects.
   * @param- {Object} [indicator] Internally used to indicate that the `stack`
   *  argument is an array of traversed objects instead of another source object.
   * @param- {Array} [stackA=[]] Internally used to track traversed source objects.
   * @param- {Array} [stackB=[]] Internally used to associate values with their
   *  source counterparts.
   * @returns {Object} Returns the destination object.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe' },
   *   { 'name': 'larry' }
   * ];
   *
   * var ages = [
   *   { 'age': 40 },
   *   { 'age': 50 }
   * ];
   *
   * _.merge(stooges, ages);
   * // => [{ 'name': 'moe', 'age': 40 }, { 'name': 'larry', 'age': 50 }]
   */
  function merge(object, source, indicator) {
    var args = arguments,
        index = 0,
        length = 2,
        stackA = args[3],
        stackB = args[4];

    if (indicator !== indicatorObject) {
      stackA = [];
      stackB = [];

      // work with `_.reduce` by only using its callback `accumulator` and `value` arguments
      if (typeof indicator != 'number') {
        length = args.length;
      }
    }
    while (++index < length) {
      forOwn(args[index], function(source, key) {
        var found, isArr, value;
        if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
          // avoid merging previously merged cyclic sources
          var stackLength = stackA.length;
          while (stackLength--) {
            found = stackA[stackLength] == source;
            if (found) {
              break;
            }
          }
          if (found) {
            object[key] = stackB[stackLength];
          }
          else {
            // add `source` and associated `value` to the stack of traversed objects
            stackA.push(source);
            stackB.push(value = (value = object[key], isArr)
              ? (isArray(value) ? value : [])
              : (isPlainObject(value) ? value : {})
            );
            // recursively merge objects and arrays (susceptible to call stack limits)
            object[key] = merge(value, source, indicatorObject, stackA, stackB);
          }
        } else if (source != null) {
          object[key] = source;
        }
      });
    }
    return object;
  }

  /**
   * Creates a shallow clone of `object` excluding the specified properties.
   * Property names may be specified as individual arguments or as arrays of
   * property names. If `callback` is passed, it will be executed for each property
   * in the `object`, omitting the properties `callback` returns truthy for. The
   * `callback` is bound to `thisArg` and invoked with three arguments; (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The source object.
   * @param {Function|String} callback|[prop1, prop2, ...] The properties to omit
   *  or the function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns an object without the omitted properties.
   * @example
   *
   * _.omit({ 'name': 'moe', 'age': 40, 'userid': 'moe1' }, 'userid');
   * // => { 'name': 'moe', 'age': 40 }
   *
   * _.omit({ 'name': 'moe', '_hint': 'knucklehead', '_seed': '96c4eb' }, function(value, key) {
   *   return key.charAt(0) == '_';
   * });
   * // => { 'name': 'moe' }
   */
  function omit(object, callback, thisArg) {
    var isFunc = typeof callback == 'function',
        result = {};

    if (isFunc) {
      callback = createCallback(callback, thisArg);
    } else {
      var props = concat.apply(arrayRef, arguments);
    }
    forIn(object, function(value, key, object) {
      if (isFunc
            ? !callback(value, key, object)
            : indexOf(props, key, 1) < 0
          ) {
        result[key] = value;
      }
    });
    return result;
  }

  /**
   * Creates a two dimensional array of the given object's key-value pairs,
   * i.e. `[[key1, value1], [key2, value2]]`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns new array of key-value pairs.
   * @example
   *
   * _.pairs({ 'moe': 30, 'larry': 40, 'curly': 50 });
   * // => [['moe', 30], ['larry', 40], ['curly', 50]] (order is not guaranteed)
   */
  function pairs(object) {
    var result = [];
    forOwn(object, function(value, key) {
      result.push([key, value]);
    });
    return result;
  }

  /**
   * Creates a shallow clone of `object` composed of the specified properties.
   * Property names may be specified as individual arguments or as arrays of
   * property names. If `callback` is passed, it will be executed for each property
   * in the `object`, picking the properties `callback` returns truthy for. The
   * `callback` is bound to `thisArg` and invoked with three arguments; (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The source object.
   * @param {Function|String} callback|[prop1, prop2, ...] The properties to pick
   *  or the function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns an object composed of the picked properties.
   * @example
   *
   * _.pick({ 'name': 'moe', 'age': 40, 'userid': 'moe1' }, 'name', 'age');
   * // => { 'name': 'moe', 'age': 40 }
   *
   * _.pick({ 'name': 'moe', '_hint': 'knucklehead', '_seed': '96c4eb' }, function(value, key) {
   *   return key.charAt(0) != '_';
   * });
   * // => { 'name': 'moe' }
   */
  function pick(object, callback, thisArg) {
    var result = {};
    if (typeof callback != 'function') {
      var index = 0,
          props = concat.apply(arrayRef, arguments),
          length = props.length;

      while (++index < length) {
        var key = props[index];
        if (key in object) {
          result[key] = object[key];
        }
      }
    } else {
      callback = createCallback(callback, thisArg);
      forIn(object, function(value, key, object) {
        if (callback(value, key, object)) {
          result[key] = value;
        }
      });
    }
    return result;
  }

  /**
   * Creates an array composed of the own enumerable property values of `object`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns a new array of property values.
   * @example
   *
   * _.values({ 'one': 1, 'two': 2, 'three': 3 });
   * // => [1, 2, 3]
   */
  function values(object) {
    var result = [];
    forOwn(object, function(value) {
      result.push(value);
    });
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Checks if a given `target` element is present in a `collection` using strict
   * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
   * as the offset from the end of the collection.
   *
   * @static
   * @memberOf _
   * @alias include
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Mixed} target The value to check for.
   * @param {Number} [fromIndex=0] The index to search from.
   * @returns {Boolean} Returns `true` if the `target` element is found, else `false`.
   * @example
   *
   * _.contains([1, 2, 3], 1);
   * // => true
   *
   * _.contains([1, 2, 3], 1, 2);
   * // => false
   *
   * _.contains({ 'name': 'moe', 'age': 40 }, 'moe');
   * // => true
   *
   * _.contains('curly', 'ur');
   * // => true
   */
  function contains(collection, target, fromIndex) {
    var index = -1,
        length = collection ? collection.length : 0,
        result = false;

    fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
    if (typeof length == 'number') {
      result = (isString(collection)
        ? collection.indexOf(target, fromIndex)
        : indexOf(collection, target, fromIndex)
      ) > -1;
    } else {
      forEach(collection, function(value) {
        if (++index >= fromIndex) {
          return !(result = value === target);
        }
      });
    }
    return result;
  }

  /**
   * Creates an object composed of keys returned from running each element of
   * `collection` through a `callback`. The corresponding value of each key is
   * the number of times the key was returned by `callback`. The `callback` is
   * bound to `thisArg` and invoked with three arguments; (value, index|key, collection).
   * The `callback` argument may also be the name of a property to count by (e.g. 'length').
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function|String} callback|property The function called per iteration
   *  or property name to count by.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns the composed aggregate object.
   * @example
   *
   * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
   * // => { '4': 1, '6': 2 }
   *
   * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
   * // => { '4': 1, '6': 2 }
   *
   * _.countBy(['one', 'two', 'three'], 'length');
   * // => { '3': 2, '5': 1 }
   */
  function countBy(collection, callback, thisArg) {
    var result = {};
    callback = createCallback(callback, thisArg);
    forEach(collection, function(value, key, collection) {
      key = callback(value, key, collection);
      (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);
    });
    return result;
  }

  /**
   * Checks if the `callback` returns a truthy value for **all** elements of a
   * `collection`. The `callback` is bound to `thisArg` and invoked with three
   * arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias all
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Boolean} Returns `true` if all elements pass the callback check,
   *  else `false`.
   * @example
   *
   * _.every([true, 1, null, 'yes'], Boolean);
   * // => false
   */
  function every(collection, callback, thisArg) {
    var result = true;
    callback = createCallback(callback, thisArg);

    if (isArray(collection)) {
      var index = -1,
          length = collection.length;

      while (++index < length) {
        if (!(result = !!callback(collection[index], index, collection))) {
          break;
        }
      }
    } else {
      forEach(collection, function(value, index, collection) {
        return (result = !!callback(value, index, collection));
      });
    }
    return result;
  }

  /**
   * Examines each element in a `collection`, returning an array of all elements
   * the `callback` returns truthy for. The `callback` is bound to `thisArg` and
   * invoked with three arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias select
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a new array of elements that passed the callback check.
   * @example
   *
   * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
   * // => [2, 4, 6]
   */
  function filter(collection, callback, thisArg) {
    var result = [];
    callback = createCallback(callback, thisArg);

    if (isArray(collection)) {
      var index = -1,
          length = collection.length;

      while (++index < length) {
        var value = collection[index];
        if (callback(value, index, collection)) {
          result.push(value);
        }
      }
    } else {
      forEach(collection, function(value, index, collection) {
        if (callback(value, index, collection)) {
          result.push(value);
        }
      });
    }
    return result;
  }

  /**
   * Examines each element in a `collection`, returning the first one the `callback`
   * returns truthy for. The function returns as soon as it finds an acceptable
   * element, and does not iterate over the entire `collection`. The `callback` is
   * bound to `thisArg` and invoked with three arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias detect
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Mixed} Returns the element that passed the callback check,
   *  else `undefined`.
   * @example
   *
   * var even = _.find([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
   * // => 2
   */
  function find(collection, callback, thisArg) {
    var result;
    callback = createCallback(callback, thisArg);
    forEach(collection, function(value, index, collection) {
      if (callback(value, index, collection)) {
        result = value;
        return false;
      }
    });
    return result;
  }

  /**
   * Iterates over a `collection`, executing the `callback` for each element in
   * the `collection`. The `callback` is bound to `thisArg` and invoked with three
   * arguments; (value, index|key, collection). Callbacks may exit iteration early
   * by explicitly returning `false`.
   *
   * @static
   * @memberOf _
   * @alias each
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Array|Object|String} Returns `collection`.
   * @example
   *
   * _([1, 2, 3]).forEach(alert).join(',');
   * // => alerts each number and returns '1,2,3'
   *
   * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, alert);
   * // => alerts each number (order is not guaranteed)
   */
  var forEach = createIterator(forEachIteratorOptions);

  /**
   * Creates an object composed of keys returned from running each element of
   * `collection` through a `callback`. The corresponding value of each key is an
   * array of elements passed to `callback` that returned the key. The `callback`
   * is bound to `thisArg` and invoked with three arguments; (value, index|key, collection).
   * The `callback` argument may also be the name of a property to group by (e.g. 'length').
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function|String} callback|property The function called per iteration
   *  or property name to group by.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns the composed aggregate object.
   * @example
   *
   * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
   * // => { '4': [4.2], '6': [6.1, 6.4] }
   *
   * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
   * // => { '4': [4.2], '6': [6.1, 6.4] }
   *
   * _.groupBy(['one', 'two', 'three'], 'length');
   * // => { '3': ['one', 'two'], '5': ['three'] }
   */
  function groupBy(collection, callback, thisArg) {
    var result = {};
    callback = createCallback(callback, thisArg);
    forEach(collection, function(value, key, collection) {
      key = callback(value, key, collection);
      (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);
    });
    return result;
  }

  /**
   * Invokes the method named by `methodName` on each element in the `collection`,
   * returning an array of the results of each invoked method. Additional arguments
   * will be passed to each invoked method. If `methodName` is a function it will
   * be invoked for, and `this` bound to, each element in the `collection`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function|String} methodName The name of the method to invoke or
   *  the function invoked per iteration.
   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the method with.
   * @returns {Array} Returns a new array of the results of each invoked method.
   * @example
   *
   * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
   * // => [[1, 5, 7], [1, 2, 3]]
   *
   * _.invoke([123, 456], String.prototype.split, '');
   * // => [['1', '2', '3'], ['4', '5', '6']]
   */
  function invoke(collection, methodName) {
    var args = slice.call(arguments, 2),
        isFunc = typeof methodName == 'function',
        result = [];

    forEach(collection, function(value) {
      result.push((isFunc ? methodName : value[methodName]).apply(value, args));
    });
    return result;
  }

  /**
   * Creates an array of values by running each element in the `collection`
   * through a `callback`. The `callback` is bound to `thisArg` and invoked with
   * three arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias collect
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a new array of the results of each `callback` execution.
   * @example
   *
   * _.map([1, 2, 3], function(num) { return num * 3; });
   * // => [3, 6, 9]
   *
   * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
   * // => [3, 6, 9] (order is not guaranteed)
   */
  function map(collection, callback, thisArg) {
    var index = -1,
        length = collection ? collection.length : 0,
        result = Array(typeof length == 'number' ? length : 0);

    callback = createCallback(callback, thisArg);
    if (isArray(collection)) {
      while (++index < length) {
        result[index] = callback(collection[index], index, collection);
      }
    } else {
      forEach(collection, function(value, key, collection) {
        result[++index] = callback(value, key, collection);
      });
    }
    return result;
  }

  /**
   * Retrieves the maximum value of an `array`. If `callback` is passed,
   * it will be executed for each value in the `array` to generate the
   * criterion by which the value is ranked. The `callback` is bound to
   * `thisArg` and invoked with three arguments; (value, index, collection).
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Mixed} Returns the maximum value.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * _.max(stooges, function(stooge) { return stooge.age; });
   * // => { 'name': 'curly', 'age': 60 };
   */
  function max(collection, callback, thisArg) {
    var computed = -Infinity,
        index = -1,
        length = collection ? collection.length : 0,
        result = computed;

    if (callback || !isArray(collection)) {
      callback = !callback && isString(collection)
        ? charAtCallback
        : createCallback(callback, thisArg);

      forEach(collection, function(value, index, collection) {
        var current = callback(value, index, collection);
        if (current > computed) {
          computed = current;
          result = value;
        }
      });
    } else {
      while (++index < length) {
        if (collection[index] > result) {
          result = collection[index];
        }
      }
    }
    return result;
  }

  /**
   * Retrieves the minimum value of an `array`. If `callback` is passed,
   * it will be executed for each value in the `array` to generate the
   * criterion by which the value is ranked. The `callback` is bound to `thisArg`
   * and invoked with three arguments; (value, index, collection).
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Mixed} Returns the minimum value.
   * @example
   *
   * _.min([10, 5, 100, 2, 1000]);
   * // => 2
   */
  function min(collection, callback, thisArg) {
    var computed = Infinity,
        index = -1,
        length = collection ? collection.length : 0,
        result = computed;

    if (callback || !isArray(collection)) {
      callback = !callback && isString(collection)
        ? charAtCallback
        : createCallback(callback, thisArg);

      forEach(collection, function(value, index, collection) {
        var current = callback(value, index, collection);
        if (current < computed) {
          computed = current;
          result = value;
        }
      });
    } else {
      while (++index < length) {
        if (collection[index] < result) {
          result = collection[index];
        }
      }
    }
    return result;
  }

  /**
   * Retrieves the value of a specified property from all elements in
   * the `collection`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {String} property The property to pluck.
   * @returns {Array} Returns a new array of property values.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * _.pluck(stooges, 'name');
   * // => ['moe', 'larry', 'curly']
   */
  function pluck(collection, property) {
    var result = [];
    forEach(collection, function(value) {
      result.push(value[property]);
    });
    return result;
  }

  /**
   * Boils down a `collection` to a single value. The initial state of the
   * reduction is `accumulator` and each successive step of it should be returned
   * by the `callback`. The `callback` is bound to `thisArg` and invoked with 4
   * arguments; for arrays they are (accumulator, value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias foldl, inject
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [accumulator] Initial value of the accumulator.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Mixed} Returns the accumulated value.
   * @example
   *
   * var sum = _.reduce([1, 2, 3], function(memo, num) { return memo + num; });
   * // => 6
   */
  function reduce(collection, callback, accumulator, thisArg) {
    var noaccum = arguments.length < 3;
    callback = createCallback(callback, thisArg);
    forEach(collection, function(value, index, collection) {
      accumulator = noaccum
        ? (noaccum = false, value)
        : callback(accumulator, value, index, collection)
    });
    return accumulator;
  }

  /**
   * The right-associative version of `_.reduce`.
   *
   * @static
   * @memberOf _
   * @alias foldr
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [accumulator] Initial value of the accumulator.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Mixed} Returns the accumulated value.
   * @example
   *
   * var list = [[0, 1], [2, 3], [4, 5]];
   * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
   * // => [4, 5, 2, 3, 0, 1]
   */
  function reduceRight(collection, callback, accumulator, thisArg) {
    var iteratee = collection,
        length = collection ? collection.length : 0,
        noaccum = arguments.length < 3;

    if (typeof length != 'number') {
      var props = keys(collection);
      length = props.length;
    } else if (noCharByIndex && isString(collection)) {
      iteratee = collection.split('');
    }
    forEach(collection, function(value, index, collection) {
      index = props ? props[--length] : --length;
      accumulator = noaccum
        ? (noaccum = false, iteratee[index])
        : callback.call(thisArg, accumulator, iteratee[index], index, collection);
    });
    return accumulator;
  }

  /**
   * The opposite of `_.filter`, this method returns the values of a
   * `collection` that `callback` does **not** return truthy for.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a new array of elements that did **not** pass the
   *  callback check.
   * @example
   *
   * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
   * // => [1, 3, 5]
   */
  function reject(collection, callback, thisArg) {
    callback = createCallback(callback, thisArg);
    return filter(collection, function(value, index, collection) {
      return !callback(value, index, collection);
    });
  }

  /**
   * Creates an array of shuffled `array` values, using a version of the
   * Fisher-Yates shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to shuffle.
   * @returns {Array} Returns a new shuffled collection.
   * @example
   *
   * _.shuffle([1, 2, 3, 4, 5, 6]);
   * // => [4, 1, 6, 3, 5, 2]
   */
  function shuffle(collection) {
    var index = -1,
        result = Array(collection ? collection.length : 0);

    forEach(collection, function(value) {
      var rand = floor(nativeRandom() * (++index + 1));
      result[index] = result[rand];
      result[rand] = value;
    });
    return result;
  }

  /**
   * Gets the size of the `collection` by returning `collection.length` for arrays
   * and array-like objects or the number of own enumerable properties for objects.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to inspect.
   * @returns {Number} Returns `collection.length` or number of own enumerable properties.
   * @example
   *
   * _.size([1, 2]);
   * // => 2
   *
   * _.size({ 'one': 1, 'two': 2, 'three': 3 });
   * // => 3
   *
   * _.size('curly');
   * // => 5
   */
  function size(collection) {
    var length = collection ? collection.length : 0;
    return typeof length == 'number' ? length : keys(collection).length;
  }

  /**
   * Checks if the `callback` returns a truthy value for **any** element of a
   * `collection`. The function returns as soon as it finds passing value, and
   * does not iterate over the entire `collection`. The `callback` is bound to
   * `thisArg` and invoked with three arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias any
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Boolean} Returns `true` if any element passes the callback check,
   *  else `false`.
   * @example
   *
   * _.some([null, 0, 'yes', false], Boolean);
   * // => true
   */
  function some(collection, callback, thisArg) {
    var result;
    callback = createCallback(callback, thisArg);

    if (isArray(collection)) {
      var index = -1,
          length = collection.length;

      while (++index < length) {
        if ((result = callback(collection[index], index, collection))) {
          break;
        }
      }
    } else {
      forEach(collection, function(value, index, collection) {
        return !(result = callback(value, index, collection));
      });
    }
    return !!result;
  }

  /**
   * Creates an array, stable sorted in ascending order by the results of
   * running each element of `collection` through a `callback`. The `callback`
   * is bound to `thisArg` and invoked with three arguments; (value, index|key, collection).
   * The `callback` argument may also be the name of a property to sort by (e.g. 'length').
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function|String} callback|property The function called per iteration
   *  or property name to sort by.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a new array of sorted elements.
   * @example
   *
   * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
   * // => [3, 1, 2]
   *
   * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
   * // => [3, 1, 2]
   *
   * _.sortBy(['larry', 'brendan', 'moe'], 'length');
   * // => ['moe', 'larry', 'brendan']
   */
  function sortBy(collection, callback, thisArg) {
    var result = [];
    callback = createCallback(callback, thisArg);
    forEach(collection, function(value, index, collection) {
      result.push({
        'criteria': callback(value, index, collection),
        'index': index,
        'value': value
      });
    });

    var length = result.length;
    result.sort(compareAscending);
    while (length--) {
      result[length] = result[length].value;
    }
    return result;
  }

  /**
   * Converts the `collection`, to an array.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to convert.
   * @returns {Array} Returns the new converted array.
   * @example
   *
   * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
   * // => [2, 3, 4]
   */
  function toArray(collection) {
    if (collection && typeof collection.length == 'number') {
      return (noArraySliceOnStrings ? isString(collection) : typeof collection == 'string')
        ? collection.split('')
        : slice.call(collection);
    }
    return values(collection);
  }

  /**
   * Examines each element in a `collection`, returning an array of all elements
   * that contain the given `properties`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Object} properties The object of property values to filter by.
   * @returns {Array} Returns a new array of elements that contain the given `properties`.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * _.where(stooges, { 'age': 40 });
   * // => [{ 'name': 'moe', 'age': 40 }]
   */
  function where(collection, properties) {
    var props = keys(properties);
    return filter(collection, function(object) {
      var length = props.length;
      while (length--) {
        var result = object[props[length]] === properties[props[length]];
        if (!result) {
          break;
        }
      }
      return !!result;
    });
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates an array with all falsey values of `array` removed. The values
   * `false`, `null`, `0`, `""`, `undefined` and `NaN` are all falsey.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to compact.
   * @returns {Array} Returns a new filtered array.
   * @example
   *
   * _.compact([0, 1, false, 2, '', 3]);
   * // => [1, 2, 3]
   */
  function compact(array) {
    var index = -1,
        length = array ? array.length : 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (value) {
        result.push(value);
      }
    }
    return result;
  }

  /**
   * Creates an array of `array` elements not present in the other arrays
   * using strict equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to process.
   * @param {Array} [array1, array2, ...] Arrays to check.
   * @returns {Array} Returns a new array of `array` elements not present in the
   *  other arrays.
   * @example
   *
   * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
   * // => [1, 3, 4]
   */
  function difference(array) {
    var index = -1,
        length = array ? array.length : 0,
        flattened = concat.apply(arrayRef, arguments),
        contains = cachedContains(flattened, length),
        result = [];

    while (++index < length) {
      var value = array[index];
      if (!contains(value)) {
        result.push(value);
      }
    }
    return result;
  }

  /**
   * Gets the first element of the `array`. Pass `n` to return the first `n`
   * elements of the `array`.
   *
   * @static
   * @memberOf _
   * @alias head, take
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n] The number of elements to return.
   * @param- {Object} [guard] Internally used to allow this method to work with
   *  others like `_.map` without using their callback `index` argument for `n`.
   * @returns {Mixed} Returns the first element or an array of the first `n`
   *  elements of `array`.
   * @example
   *
   * _.first([5, 4, 3, 2, 1]);
   * // => 5
   */
  function first(array, n, guard) {
    if (array) {
      return (n == null || guard) ? array[0] : slice.call(array, 0, n);
    }
  }

  /**
   * Flattens a nested array (the nesting can be to any depth). If `shallow` is
   * truthy, `array` will only be flattened a single level.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to compact.
   * @param {Boolean} shallow A flag to indicate only flattening a single level.
   * @returns {Array} Returns a new flattened array.
   * @example
   *
   * _.flatten([1, [2], [3, [[4]]]]);
   * // => [1, 2, 3, 4];
   *
   * _.flatten([1, [2], [3, [[4]]]], true);
   * // => [1, 2, 3, [[4]]];
   */
  function flatten(array, shallow) {
    var index = -1,
        length = array ? array.length : 0,
        result = [];

    while (++index < length) {
      var value = array[index];

      // recursively flatten arrays (susceptible to call stack limits)
      if (isArray(value)) {
        push.apply(result, shallow ? value : flatten(value));
      } else {
        result.push(value);
      }
    }
    return result;
  }

  /**
   * Gets the index at which the first occurrence of `value` is found using
   * strict equality for comparisons, i.e. `===`. If the `array` is already
   * sorted, passing `true` for `fromIndex` will run a faster binary search.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to search.
   * @param {Mixed} value The value to search for.
   * @param {Boolean|Number} [fromIndex=0] The index to search from or `true` to
   *  perform a binary search on a sorted `array`.
   * @returns {Number} Returns the index of the matched value or `-1`.
   * @example
   *
   * _.indexOf([1, 2, 3, 1, 2, 3], 2);
   * // => 1
   *
   * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
   * // => 4
   *
   * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
   * // => 2
   */
  function indexOf(array, value, fromIndex) {
    var index = -1,
        length = array ? array.length : 0;

    if (typeof fromIndex == 'number') {
      index = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0) - 1;
    } else if (fromIndex) {
      index = sortedIndex(array, value);
      return array[index] === value ? index : -1;
    }
    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Gets all but the last element of `array`. Pass `n` to exclude the last `n`
   * elements from the result.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n=1] The number of elements to exclude.
   * @param- {Object} [guard] Internally used to allow this method to work with
   *  others like `_.map` without using their callback `index` argument for `n`.
   * @returns {Array} Returns all but the last element or `n` elements of `array`.
   * @example
   *
   * _.initial([3, 2, 1]);
   * // => [3, 2]
   */
  function initial(array, n, guard) {
    return array
      ? slice.call(array, 0, -((n == null || guard) ? 1 : n))
      : [];
  }

  /**
   * Computes the intersection of all the passed-in arrays using strict equality
   * for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} [array1, array2, ...] Arrays to process.
   * @returns {Array} Returns a new array of unique elements, in order, that are
   *  present in **all** of the arrays.
   * @example
   *
   * _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
   * // => [1, 2]
   */
  function intersection(array) {
    var args = arguments,
        argsLength = args.length,
        cache = {},
        result = [];

    forEach(array, function(value) {
      if (indexOf(result, value) < 0) {
        var length = argsLength;
        while (--length) {
          if (!(cache[length] || (cache[length] = cachedContains(args[length])))(value)) {
            return;
          }
        }
        result.push(value);
      }
    });
    return result;
  }

  /**
   * Gets the last element of the `array`. Pass `n` to return the last `n`
   * elements of the `array`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n] The number of elements to return.
   * @param- {Object} [guard] Internally used to allow this method to work with
   *  others like `_.map` without using their callback `index` argument for `n`.
   * @returns {Mixed} Returns the last element or an array of the last `n`
   *  elements of `array`.
   * @example
   *
   * _.last([3, 2, 1]);
   * // => 1
   */
  function last(array, n, guard) {
    if (array) {
      var length = array.length;
      return (n == null || guard) ? array[length - 1] : slice.call(array, -n || length);
    }
  }

  /**
   * Gets the index at which the last occurrence of `value` is found using strict
   * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
   * as the offset from the end of the collection.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to search.
   * @param {Mixed} value The value to search for.
   * @param {Number} [fromIndex=array.length-1] The index to search from.
   * @returns {Number} Returns the index of the matched value or `-1`.
   * @example
   *
   * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
   * // => 4
   *
   * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
   * // => 1
   */
  function lastIndexOf(array, value, fromIndex) {
    var index = array ? array.length : 0;
    if (typeof fromIndex == 'number') {
      index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
    }
    while (index--) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Creates an object composed from arrays of `keys` and `values`. Pass either
   * a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`, or
   * two arrays, one of `keys` and one of corresponding `values`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} keys The array of keys.
   * @param {Array} [values=[]] The array of values.
   * @returns {Object} Returns an object composed of the given keys and
   *  corresponding values.
   * @example
   *
   * _.object(['moe', 'larry', 'curly'], [30, 40, 50]);
   * // => { 'moe': 30, 'larry': 40, 'curly': 50 }
   */
  function object(keys, values) {
    var index = -1,
        length = keys ? keys.length : 0,
        result = {};

    while (++index < length) {
      var key = keys[index];
      if (values) {
        result[key] = values[index];
      } else {
        result[key[0]] = key[1];
      }
    }
    return result;
  }

  /**
   * Creates an array of numbers (positive and/or negative) progressing from
   * `start` up to but not including `stop`. This method is a port of Python's
   * `range()` function. See http://docs.python.org/library/functions.html#range.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Number} [start=0] The start of the range.
   * @param {Number} end The end of the range.
   * @param {Number} [step=1] The value to increment or descrement by.
   * @returns {Array} Returns a new range array.
   * @example
   *
   * _.range(10);
   * // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
   *
   * _.range(1, 11);
   * // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   *
   * _.range(0, 30, 5);
   * // => [0, 5, 10, 15, 20, 25]
   *
   * _.range(0, -10, -1);
   * // => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
   *
   * _.range(0);
   * // => []
   */
  function range(start, end, step) {
    start = +start || 0;
    step = +step || 1;

    if (end == null) {
      end = start;
      start = 0;
    }
    // use `Array(length)` so V8 will avoid the slower "dictionary" mode
    // http://www.youtube.com/watch?v=XAqIpGU8ZZk#t=16m27s
    var index = -1,
        length = nativeMax(0, ceil((end - start) / step)),
        result = Array(length);

    while (++index < length) {
      result[index] = start;
      start += step;
    }
    return result;
  }

  /**
   * The opposite of `_.initial`, this method gets all but the first value of
   * `array`. Pass `n` to exclude the first `n` values from the result.
   *
   * @static
   * @memberOf _
   * @alias drop, tail
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n=1] The number of elements to exclude.
   * @param- {Object} [guard] Internally used to allow this method to work with
   *  others like `_.map` without using their callback `index` argument for `n`.
   * @returns {Array} Returns all but the first value or `n` values of `array`.
   * @example
   *
   * _.rest([3, 2, 1]);
   * // => [2, 1]
   */
  function rest(array, n, guard) {
    return array
      ? slice.call(array, (n == null || guard) ? 1 : n)
      : [];
  }

  /**
   * Uses a binary search to determine the smallest index at which the `value`
   * should be inserted into `array` in order to maintain the sort order of the
   * sorted `array`. If `callback` is passed, it will be executed for `value` and
   * each element in `array` to compute their sort ranking. The `callback` is
   * bound to `thisArg` and invoked with one argument; (value). The `callback`
   * argument may also be the name of a property to order by.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to iterate over.
   * @param {Mixed} value The value to evaluate.
   * @param {Function|String} [callback=identity|property] The function called
   *  per iteration or property name to order by.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Number} Returns the index at which the value should be inserted
   *  into `array`.
   * @example
   *
   * _.sortedIndex([20, 30, 50], 40);
   * // => 2
   *
   * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
   * // => 2
   *
   * var dict = {
   *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
   * };
   *
   * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
   *   return dict.wordToNumber[word];
   * });
   * // => 2
   *
   * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
   *   return this.wordToNumber[word];
   * }, dict);
   * // => 2
   */
  function sortedIndex(array, value, callback, thisArg) {
    var low = 0,
        high = array ? array.length : low;

    // explicitly reference `identity` for better engine inlining
    callback = callback ? createCallback(callback, thisArg) : identity;
    value = callback(value);
    while (low < high) {
      var mid = (low + high) >>> 1;
      callback(array[mid]) < value
        ? low = mid + 1
        : high = mid;
    }
    return low;
  }

  /**
   * Computes the union of the passed-in arrays using strict equality for
   * comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} [array1, array2, ...] Arrays to process.
   * @returns {Array} Returns a new array of unique values, in order, that are
   *  present in one or more of the arrays.
   * @example
   *
   * _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
   * // => [1, 2, 3, 101, 10]
   */
  function union() {
    return uniq(concat.apply(arrayRef, arguments));
  }

  /**
   * Creates a duplicate-value-free version of the `array` using strict equality
   * for comparisons, i.e. `===`. If the `array` is already sorted, passing `true`
   * for `isSorted` will run a faster algorithm. If `callback` is passed, each
   * element of `array` is passed through a callback` before uniqueness is computed.
   * The `callback` is bound to `thisArg` and invoked with three arguments; (value, index, array).
   *
   * @static
   * @memberOf _
   * @alias unique
   * @category Arrays
   * @param {Array} array The array to process.
   * @param {Boolean} [isSorted=false] A flag to indicate that the `array` is already sorted.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a duplicate-value-free array.
   * @example
   *
   * _.uniq([1, 2, 1, 3, 1]);
   * // => [1, 2, 3]
   *
   * _.uniq([1, 1, 2, 2, 3], true);
   * // => [1, 2, 3]
   *
   * _.uniq([1, 2, 1.5, 3, 2.5], function(num) { return Math.floor(num); });
   * // => [1, 2, 3]
   *
   * _.uniq([1, 2, 1.5, 3, 2.5], function(num) { return this.floor(num); }, Math);
   * // => [1, 2, 3]
   */
  function uniq(array, isSorted, callback, thisArg) {
    var index = -1,
        length = array ? array.length : 0,
        result = [],
        seen = result;

    // juggle arguments
    if (typeof isSorted == 'function') {
      thisArg = callback;
      callback = isSorted;
      isSorted = false;
    }
    // init value cache for large arrays
    var isLarge = !isSorted && length > 74;
    if (isLarge) {
      var cache = {};
    }
    if (callback) {
      seen = [];
      callback = createCallback(callback, thisArg);
    }
    while (++index < length) {
      var value = array[index],
          computed = callback ? callback(value, index, array) : value;

      if (isLarge) {
        // manually coerce `computed` to a string because `hasOwnProperty`, in
        // some older versions of Firefox, coerces objects incorrectly
        seen = hasOwnProperty.call(cache, computed + '') ? cache[computed] : (cache[computed] = []);
      }
      if (isSorted
            ? !index || seen[seen.length - 1] !== computed
            : indexOf(seen, computed) < 0
          ) {
        if (callback || isLarge) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
    return result;
  }

  /**
   * Creates an array with all occurrences of the passed values removed using
   * strict equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to filter.
   * @param {Mixed} [value1, value2, ...] Values to remove.
   * @returns {Array} Returns a new filtered array.
   * @example
   *
   * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
   * // => [2, 3, 4]
   */
  function without(array) {
    var index = -1,
        length = array ? array.length : 0,
        contains = cachedContains(arguments, 1, 20),
        result = [];

    while (++index < length) {
      var value = array[index];
      if (!contains(value)) {
        result.push(value);
      }
    }
    return result;
  }

  /**
   * Groups the elements of each array at their corresponding indexes. Useful for
   * separate data sources that are coordinated through matching array indexes.
   * For a matrix of nested arrays, `_.zip.apply(...)` can transpose the matrix
   * in a similar fashion.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} [array1, array2, ...] Arrays to process.
   * @returns {Array} Returns a new array of grouped elements.
   * @example
   *
   * _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
   * // => [['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]
   */
  function zip(array) {
    var index = -1,
        length = array ? max(pluck(arguments, 'length')) : 0,
        result = Array(length);

    while (++index < length) {
      result[index] = pluck(arguments, index);
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a function that is restricted to executing `func` only after it is
   * called `n` times. The `func` is executed with the `this` binding of the
   * created function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Number} n The number of times the function must be called before
   * it is executed.
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * var renderNotes = _.after(notes.length, render);
   * _.forEach(notes, function(note) {
   *   note.asyncSave({ 'success': renderNotes });
   * });
   * // `renderNotes` is run once, after all notes have saved
   */
  function after(n, func) {
    if (n < 1) {
      return func();
    }
    return function() {
      if (--n < 1) {
        return func.apply(this, arguments);
      }
    };
  }

  /**
   * Creates a function that, when called, invokes `func` with the `this`
   * binding of `thisArg` and prepends any additional `bind` arguments to those
   * passed to the bound function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to bind.
   * @param {Mixed} [thisArg] The `this` binding of `func`.
   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var func = function(greeting) {
   *   return greeting + ' ' + this.name;
   * };
   *
   * func = _.bind(func, { 'name': 'moe' }, 'hi');
   * func();
   * // => 'hi moe'
   */
  function bind(func, thisArg) {
    // use `Function#bind` if it exists and is fast
    // (in V8 `Function#bind` is slower except when partially applied)
    return isBindFast || (nativeBind && arguments.length > 2)
      ? nativeBind.call.apply(nativeBind, arguments)
      : createBound(func, thisArg, slice.call(arguments, 2));
  }

  /**
   * Binds methods on `object` to `object`, overwriting the existing method.
   * If no method names are provided, all the function properties of `object`
   * will be bound.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Object} object The object to bind and assign the bound methods to.
   * @param {String} [methodName1, methodName2, ...] Method names on the object to bind.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var buttonView = {
   *  'label': 'lodash',
   *  'onClick': function() { alert('clicked: ' + this.label); }
   * };
   *
   * _.bindAll(buttonView);
   * jQuery('#lodash_button').on('click', buttonView.onClick);
   * // => When the button is clicked, `this.label` will have the correct value
   */
  function bindAll(object) {
    var funcs = arguments,
        index = funcs.length > 1 ? 0 : (funcs = functions(object), -1),
        length = funcs.length;

    while (++index < length) {
      var key = funcs[index];
      object[key] = bind(object[key], object);
    }
    return object;
  }

  /**
   * Creates a function that, when called, invokes the method at `object[key]`
   * and prepends any additional `bindKey` arguments to those passed to the bound
   * function. This method differs from `_.bind` by allowing bound functions to
   * reference methods that will be redefined or don't yet exist.
   * See http://michaux.ca/articles/lazy-function-definition-pattern.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Object} object The object the method belongs to.
   * @param {String} key The key of the method.
   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var object = {
   *   'name': 'moe',
   *   'greet': function(greeting) {
   *     return greeting + ' ' + this.name;
   *   }
   * };
   *
   * var func = _.bindKey(object, 'greet', 'hi');
   * func();
   * // => 'hi moe'
   *
   * object.greet = function(greeting) {
   *   return greeting + ', ' + this.name + '!';
   * };
   *
   * func();
   * // => 'hi, moe!'
   */
  function bindKey(object, key) {
    return createBound(object, key, slice.call(arguments, 2));
  }

  /**
   * Creates a function that is the composition of the passed functions,
   * where each function consumes the return value of the function that follows.
   * In math terms, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
   * Each function is executed with the `this` binding of the composed function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} [func1, func2, ...] Functions to compose.
   * @returns {Function} Returns the new composed function.
   * @example
   *
   * var greet = function(name) { return 'hi: ' + name; };
   * var exclaim = function(statement) { return statement + '!'; };
   * var welcome = _.compose(exclaim, greet);
   * welcome('moe');
   * // => 'hi: moe!'
   */
  function compose() {
    var funcs = arguments;
    return function() {
      var args = arguments,
          length = funcs.length;

      while (length--) {
        args = [funcs[length].apply(this, args)];
      }
      return args[0];
    };
  }

  /**
   * Creates a function that will delay the execution of `func` until after
   * `wait` milliseconds have elapsed since the last time it was invoked. Pass
   * `true` for `immediate` to cause debounce to invoke `func` on the leading,
   * instead of the trailing, edge of the `wait` timeout. Subsequent calls to
   * the debounced function will return the result of the last `func` call.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to debounce.
   * @param {Number} wait The number of milliseconds to delay.
   * @param {Boolean} immediate A flag to indicate execution is on the leading
   *  edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * var lazyLayout = _.debounce(calculateLayout, 300);
   * jQuery(window).on('resize', lazyLayout);
   */
  function debounce(func, wait, immediate) {
    var args,
        result,
        thisArg,
        timeoutId;

    function delayed() {
      timeoutId = null;
      if (!immediate) {
        result = func.apply(thisArg, args);
      }
    }
    return function() {
      var isImmediate = immediate && !timeoutId;
      args = arguments;
      thisArg = this;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(delayed, wait);

      if (isImmediate) {
        result = func.apply(thisArg, args);
      }
      return result;
    };
  }

  /**
   * Executes the `func` function after `wait` milliseconds. Additional arguments
   * will be passed to `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to delay.
   * @param {Number} wait The number of milliseconds to delay execution.
   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the function with.
   * @returns {Number} Returns the `setTimeout` timeout id.
   * @example
   *
   * var log = _.bind(console.log, console);
   * _.delay(log, 1000, 'logged later');
   * // => 'logged later' (Appears after one second.)
   */
  function delay(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function() { func.apply(undefined, args); }, wait);
  }

  /**
   * Defers executing the `func` function until the current call stack has cleared.
   * Additional arguments will be passed to `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to defer.
   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the function with.
   * @returns {Number} Returns the `setTimeout` timeout id.
   * @example
   *
   * _.defer(function() { alert('deferred'); });
   * // returns from the function before `alert` is called
   */
  function defer(func) {
    var args = slice.call(arguments, 1);
    return setTimeout(function() { func.apply(undefined, args); }, 1);
  }

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * passed, it will be used to determine the cache key for storing the result
   * based on the arguments passed to the memoized function. By default, the first
   * argument passed to the memoized function is used as the cache key. The `func`
   * is executed with the `this` binding of the memoized function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] A function used to resolve the cache key.
   * @returns {Function} Returns the new memoizing function.
   * @example
   *
   * var fibonacci = _.memoize(function(n) {
   *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
   * });
   */
  function memoize(func, resolver) {
    var cache = {};
    return function() {
      var key = resolver ? resolver.apply(this, arguments) : arguments[0];
      return hasOwnProperty.call(cache, key)
        ? cache[key]
        : (cache[key] = func.apply(this, arguments));
    };
  }

  /**
   * Creates a function that is restricted to execute `func` once. Repeat calls to
   * the function will return the value of the first call. The `func` is executed
   * with the `this` binding of the created function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * var initialize = _.once(createApplication);
   * initialize();
   * initialize();
   * // Application is only created once.
   */
  function once(func) {
    var result,
        ran = false;

    return function() {
      if (ran) {
        return result;
      }
      ran = true;
      result = func.apply(this, arguments);

      // clear the `func` variable so the function may be garbage collected
      func = null;
      return result;
    };
  }

  /**
   * Creates a function that, when called, invokes `func` with any additional
   * `partial` arguments prepended to those passed to the new function. This
   * method is similar to `bind`, except it does **not** alter the `this` binding.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to partially apply arguments to.
   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
   * @returns {Function} Returns the new partially applied function.
   * @example
   *
   * var greet = function(greeting, name) { return greeting + ': ' + name; };
   * var hi = _.partial(greet, 'hi');
   * hi('moe');
   * // => 'hi: moe'
   */
  function partial(func) {
    return createBound(func, slice.call(arguments, 1));
  }

  /**
   * Creates a function that, when executed, will only call the `func`
   * function at most once per every `wait` milliseconds. If the throttled
   * function is invoked more than once during the `wait` timeout, `func` will
   * also be called on the trailing edge of the timeout. Subsequent calls to the
   * throttled function will return the result of the last `func` call.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to throttle.
   * @param {Number} wait The number of milliseconds to throttle executions to.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * var throttled = _.throttle(updatePosition, 100);
   * jQuery(window).on('scroll', throttled);
   */
  function throttle(func, wait) {
    var args,
        result,
        thisArg,
        timeoutId,
        lastCalled = 0;

    function trailingCall() {
      lastCalled = new Date;
      timeoutId = null;
      result = func.apply(thisArg, args);
    }
    return function() {
      var now = new Date,
          remaining = wait - (now - lastCalled);

      args = arguments;
      thisArg = this;

      if (remaining <= 0) {
        clearTimeout(timeoutId);
        lastCalled = now;
        result = func.apply(thisArg, args);
      }
      else if (!timeoutId) {
        timeoutId = setTimeout(trailingCall, remaining);
      }
      return result;
    };
  }

  /**
   * Creates a function that passes `value` to the `wrapper` function as its
   * first argument. Additional arguments passed to the function are appended
   * to those passed to the `wrapper` function. The `wrapper` is executed with
   * the `this` binding of the created function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Mixed} value The value to wrap.
   * @param {Function} wrapper The wrapper function.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var hello = function(name) { return 'hello ' + name; };
   * hello = _.wrap(hello, function(func) {
   *   return 'before, ' + func('moe') + ', after';
   * });
   * hello();
   * // => 'before, hello moe, after'
   */
  function wrap(value, wrapper) {
    return function() {
      var args = [value];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
   * corresponding HTML entities.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {String} string The string to escape.
   * @returns {String} Returns the escaped string.
   * @example
   *
   * _.escape('Moe, Larry & Curly');
   * // => "Moe, Larry &amp; Curly"
   */
  function escape(string) {
    return string == null ? '' : (string + '').replace(reUnescapedHtml, escapeHtmlChar);
  }

  /**
   * This function returns the first argument passed to it.
   *
   * Note: It is used throughout Lo-Dash as a default callback.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Mixed} value Any value.
   * @returns {Mixed} Returns `value`.
   * @example
   *
   * var moe = { 'name': 'moe' };
   * moe === _.identity(moe);
   * // => true
   */
  function identity(value) {
    return value;
  }

  /**
   * Adds functions properties of `object` to the `lodash` function and chainable
   * wrapper.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} object The object of function properties to add to `lodash`.
   * @example
   *
   * _.mixin({
   *   'capitalize': function(string) {
   *     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
   *   }
   * });
   *
   * _.capitalize('larry');
   * // => 'Larry'
   *
   * _('curly').capitalize();
   * // => 'Curly'
   */
  function mixin(object) {
    forEach(functions(object), function(methodName) {
      var func = lodash[methodName] = object[methodName];

      lodash.prototype[methodName] = function() {
        var args = [this.__wrapped__];
        push.apply(args, arguments);

        var result = func.apply(lodash, args);
        if (this.__chain__) {
          result = new lodash(result);
          result.__chain__ = true;
        }
        return result;
      };
    });
  }

  /**
   * Reverts the '_' variable to its previous value and returns a reference to
   * the `lodash` function.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @returns {Function} Returns the `lodash` function.
   * @example
   *
   * var lodash = _.noConflict();
   */
  function noConflict() {
    window._ = oldDash;
    return this;
  }

  /**
   * Produces a random number between `min` and `max` (inclusive). If only one
   * argument is passed, a number between `0` and the given number will be returned.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Number} [min=0] The minimum possible value.
   * @param {Number} [max=1] The maximum possible value.
   * @returns {Number} Returns a random number.
   * @example
   *
   * _.random(0, 5);
   * // => a number between 1 and 5
   *
   * _.random(5);
   * // => also a number between 1 and 5
   */
  function random(min, max) {
    if (min == null && max == null) {
      max = 1;
    }
    min = +min || 0;
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + floor(nativeRandom() * ((+max || 0) - min + 1));
  }

  /**
   * Resolves the value of `property` on `object`. If `property` is a function
   * it will be invoked and its result returned, else the property value is
   * returned. If `object` is falsey, then `null` is returned.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} object The object to inspect.
   * @param {String} property The property to get the value of.
   * @returns {Mixed} Returns the resolved value.
   * @example
   *
   * var object = {
   *   'cheese': 'crumpets',
   *   'stuff': function() {
   *     return 'nonsense';
   *   }
   * };
   *
   * _.result(object, 'cheese');
   * // => 'crumpets'
   *
   * _.result(object, 'stuff');
   * // => 'nonsense'
   */
  function result(object, property) {
    // based on Backbone's private `getValue` function
    // https://github.com/documentcloud/backbone/blob/0.9.2/backbone.js#L1419-1424
    var value = object ? object[property] : null;
    return isFunction(value) ? object[property]() : value;
  }

  /**
   * A micro-templating method that handles arbitrary delimiters, preserves
   * whitespace, and correctly escapes quotes within interpolated code.
   *
   * Note: In the development build `_.template` utilizes sourceURLs for easier
   * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
   *
   * Note: Lo-Dash may be used in Chrome extensions by either creating a `lodash csp`
   * build and avoiding `_.template` use, or loading Lo-Dash in a sandboxed page.
   * See http://developer.chrome.com/trunk/extensions/sandboxingEval.html
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {String} text The template text.
   * @param {Obect} data The data object used to populate the text.
   * @param {Object} options The options object.
   *  escape - The "escape" delimiter regexp.
   *  evaluate - The "evaluate" delimiter regexp.
   *  interpolate - The "interpolate" delimiter regexp.
   *  sourceURL - The sourceURL of the template's compiled source.
   *  variable - The data object variable name.
   *
   * @returns {Function|String} Returns a compiled function when no `data` object
   *  is given, else it returns the interpolated text.
   * @example
   *
   * // using a compiled template
   * var compiled = _.template('hello <%= name %>');
   * compiled({ 'name': 'moe' });
   * // => 'hello moe'
   *
   * var list = '<% _.forEach(people, function(name) { %><li><%= name %></li><% }); %>';
   * _.template(list, { 'people': ['moe', 'larry', 'curly'] });
   * // => '<li>moe</li><li>larry</li><li>curly</li>'
   *
   * // using the "escape" delimiter to escape HTML in data property values
   * _.template('<b><%- value %></b>', { 'value': '<script>' });
   * // => '<b>&lt;script&gt;</b>'
   *
   * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
   * _.template('hello ${ name }', { 'name': 'curly' });
   * // => 'hello curly'
   *
   * // using the internal `print` function in "evaluate" delimiters
   * _.template('<% print("hello " + epithet); %>!', { 'epithet': 'stooge' });
   * // => 'hello stooge!'
   *
   * // using custom template delimiters
   * _.templateSettings = {
   *   'interpolate': /{{([\s\S]+?)}}/g
   * };
   *
   * _.template('hello {{ name }}!', { 'name': 'mustache' });
   * // => 'hello mustache!'
   *
   * // using the `sourceURL` option to specify a custom sourceURL for the template
   * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
   * compiled(data);
   * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
   *
   * // using the `variable` option to ensure a with-statement isn't used in the compiled template
   * var compiled = _.template('hello <%= data.name %>!', null, { 'variable': 'data' });
   * compiled.source;
   * // => function(data) {
   *   var __t, __p = '', __e = _.escape;
   *   __p += 'hello ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
   *   return __p;
   * }
   *
   * // using the `source` property to inline compiled templates for meaningful
   * // line numbers in error messages and a stack trace
   * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
   *   var JST = {\
   *     "main": ' + _.template(mainText).source + '\
   *   };\
   * ');
   */
  function template(text, data, options) {
    // based on John Resig's `tmpl` implementation
    // http://ejohn.org/blog/javascript-micro-templating/
    // and Laura Doktorova's doT.js
    // https://github.com/olado/doT
    text || (text = '');
    options || (options = {});

    var isEvaluating,
        result,
        settings = lodash.templateSettings,
        index = 0,
        interpolate = options.interpolate || settings.interpolate || reNoMatch,
        source = "__p += '",
        variable = options.variable || settings.variable,
        hasVariable = variable;

    // compile regexp to match each delimiter
    var reDelimiters = RegExp(
      (options.escape || settings.escape || reNoMatch).source + '|' +
      interpolate.source + '|' +
      (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
      (options.evaluate || settings.evaluate || reNoMatch).source + '|$'
    , 'g');

    text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
      interpolateValue || (interpolateValue = esTemplateValue);

      // escape characters that cannot be included in string literals
      source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);

      // replace delimiters with snippets
      source +=
        escapeValue ? "' +\n__e(" + escapeValue + ") +\n'" :
        evaluateValue ? "';\n" + evaluateValue + ";\n__p += '" :
        interpolateValue ? "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'" : '';

      isEvaluating || (isEvaluating = evaluateValue || reComplexDelimiter.test(escapeValue || interpolateValue));
      index = offset + match.length;
    });

    source += "';\n";

    // if `variable` is not specified and the template contains "evaluate"
    // delimiters, wrap a with-statement around the generated code to add the
    // data object to the top of the scope chain
    if (!hasVariable) {
      variable = 'obj';
      if (isEvaluating) {
        source = 'with (' + variable + ') {\n' + source + '\n}\n';
      }
      else {
        // avoid a with-statement by prepending data object references to property names
        var reDoubleVariable = RegExp('(\\(\\s*)' + variable + '\\.' + variable + '\\b', 'g');
        source = source
          .replace(reInsertVariable, '$&' + variable + '.')
          .replace(reDoubleVariable, '$1__d');
      }
    }

    // cleanup code by stripping empty strings
    source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
      .replace(reEmptyStringMiddle, '$1')
      .replace(reEmptyStringTrailing, '$1;');

    // frame code as the function body
    source = 'function(' + variable + ') {\n' +
      (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
      'var __t, __p = \'\', __e = _.escape' +
      (isEvaluating
        ? ', __j = Array.prototype.join;\n' +
          'function print() { __p += __j.call(arguments, \'\') }\n'
        : (hasVariable ? '' : ', __d = ' + variable + '.' + variable + ' || ' + variable) + ';\n'
      ) +
      source +
      'return __p\n}';

    // use a sourceURL for easier debugging
    // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
    var sourceURL = useSourceURL
      ? '\n//@ sourceURL=' + (options.sourceURL || '/lodash/template/source[' + (templateCounter++) + ']')
      : '';

    try {
      result = Function('_', 'return ' + source + sourceURL)(lodash);
    } catch(e) {
      e.source = source;
      throw e;
    }

    if (data) {
      return result(data);
    }
    // provide the compiled function's source via its `toString` method, in
    // supported environments, or the `source` property as a convenience for
    // inlining compiled templates during the build process
    result.source = source;
    return result;
  }

  /**
   * Executes the `callback` function `n` times, returning an array of the results
   * of each `callback` execution. The `callback` is bound to `thisArg` and invoked
   * with one argument; (index).
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Number} n The number of times to execute the callback.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a new array of the results of each `callback` execution.
   * @example
   *
   * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
   * // => [3, 6, 4]
   *
   * _.times(3, function(n) { mage.castSpell(n); });
   * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
   *
   * _.times(3, function(n) { this.cast(n); }, mage);
   * // => also calls `mage.castSpell(n)` three times
   */
  function times(n, callback, thisArg) {
    n = +n || 0;
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = callback.call(thisArg, index);
    }
    return result;
  }

  /**
   * The opposite of `_.escape`, this method converts the HTML entities
   * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#x27;` in `string` to their
   * corresponding characters.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {String} string The string to unescape.
   * @returns {String} Returns the unescaped string.
   * @example
   *
   * _.unescape('Moe, Larry &amp; Curly');
   * // => "Moe, Larry & Curly"
   */
  function unescape(string) {
    return string == null ? '' : (string + '').replace(reEscapedHtml, unescapeHtmlChar);
  }

  /**
   * Generates a unique id. If `prefix` is passed, the id will be appended to it.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {String} [prefix] The value to prefix the id with.
   * @returns {Number|String} Returns a numeric id if no prefix is passed, else
   *  a string id may be returned.
   * @example
   *
   * _.uniqueId('contact_');
   * // => 'contact_104'
   */
  function uniqueId(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Wraps the value in a `lodash` wrapper object.
   *
   * @static
   * @memberOf _
   * @category Chaining
   * @param {Mixed} value The value to wrap.
   * @returns {Object} Returns the wrapper object.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * var youngest = _.chain(stooges)
   *     .sortBy(function(stooge) { return stooge.age; })
   *     .map(function(stooge) { return stooge.name + ' is ' + stooge.age; })
   *     .first()
   *     .value();
   * // => 'moe is 40'
   */
  function chain(value) {
    value = new lodash(value);
    value.__chain__ = true;
    return value;
  }

  /**
   * Invokes `interceptor` with the `value` as the first argument, and then
   * returns `value`. The purpose of this method is to "tap into" a method chain,
   * in order to perform operations on intermediate results within the chain.
   *
   * @static
   * @memberOf _
   * @category Chaining
   * @param {Mixed} value The value to pass to `interceptor`.
   * @param {Function} interceptor The function to invoke.
   * @returns {Mixed} Returns `value`.
   * @example
   *
   * _.chain([1, 2, 3, 200])
   *  .filter(function(num) { return num % 2 == 0; })
   *  .tap(alert)
   *  .map(function(num) { return num * num })
   *  .value();
   * // => // [2, 200] (alerted)
   * // => [4, 40000]
   */
  function tap(value, interceptor) {
    interceptor(value);
    return value;
  }

  /**
   * Enables method chaining on the wrapper object.
   *
   * @name chain
   * @deprecated
   * @memberOf _
   * @category Chaining
   * @returns {Mixed} Returns the wrapper object.
   * @example
   *
   * _([1, 2, 3]).value();
   * // => [1, 2, 3]
   */
  function wrapperChain() {
    this.__chain__ = true;
    return this;
  }

  /**
   * Extracts the wrapped value.
   *
   * @name value
   * @memberOf _
   * @category Chaining
   * @returns {Mixed} Returns the wrapped value.
   * @example
   *
   * _([1, 2, 3]).value();
   * // => [1, 2, 3]
   */
  function wrapperValue() {
    return this.__wrapped__;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type String
   */
  lodash.VERSION = '0.10.0';

  // assign static methods
  lodash.assign = assign;
  lodash.after = after;
  lodash.bind = bind;
  lodash.bindAll = bindAll;
  lodash.bindKey = bindKey;
  lodash.chain = chain;
  lodash.clone = clone;
  lodash.compact = compact;
  lodash.compose = compose;
  lodash.contains = contains;
  lodash.countBy = countBy;
  lodash.debounce = debounce;
  lodash.defaults = defaults;
  lodash.defer = defer;
  lodash.delay = delay;
  lodash.difference = difference;
  lodash.escape = escape;
  lodash.every = every;
  lodash.filter = filter;
  lodash.find = find;
  lodash.first = first;
  lodash.flatten = flatten;
  lodash.forEach = forEach;
  lodash.forIn = forIn;
  lodash.forOwn = forOwn;
  lodash.functions = functions;
  lodash.groupBy = groupBy;
  lodash.has = has;
  lodash.identity = identity;
  lodash.indexOf = indexOf;
  lodash.initial = initial;
  lodash.intersection = intersection;
  lodash.invert = invert;
  lodash.invoke = invoke;
  lodash.isArguments = isArguments;
  lodash.isArray = isArray;
  lodash.isBoolean = isBoolean;
  lodash.isDate = isDate;
  lodash.isElement = isElement;
  lodash.isEmpty = isEmpty;
  lodash.isEqual = isEqual;
  lodash.isFinite = isFinite;
  lodash.isFunction = isFunction;
  lodash.isNaN = isNaN;
  lodash.isNull = isNull;
  lodash.isNumber = isNumber;
  lodash.isObject = isObject;
  lodash.isPlainObject = isPlainObject;
  lodash.isRegExp = isRegExp;
  lodash.isString = isString;
  lodash.isUndefined = isUndefined;
  lodash.keys = keys;
  lodash.last = last;
  lodash.lastIndexOf = lastIndexOf;
  lodash.map = map;
  lodash.max = max;
  lodash.memoize = memoize;
  lodash.merge = merge;
  lodash.min = min;
  lodash.mixin = mixin;
  lodash.noConflict = noConflict;
  lodash.object = object;
  lodash.omit = omit;
  lodash.once = once;
  lodash.pairs = pairs;
  lodash.partial = partial;
  lodash.pick = pick;
  lodash.pluck = pluck;
  lodash.random = random;
  lodash.range = range;
  lodash.reduce = reduce;
  lodash.reduceRight = reduceRight;
  lodash.reject = reject;
  lodash.rest = rest;
  lodash.result = result;
  lodash.shuffle = shuffle;
  lodash.size = size;
  lodash.some = some;
  lodash.sortBy = sortBy;
  lodash.sortedIndex = sortedIndex;
  lodash.tap = tap;
  lodash.template = template;
  lodash.throttle = throttle;
  lodash.times = times;
  lodash.toArray = toArray;
  lodash.unescape = unescape;
  lodash.union = union;
  lodash.uniq = uniq;
  lodash.uniqueId = uniqueId;
  lodash.values = values;
  lodash.where = where;
  lodash.without = without;
  lodash.wrap = wrap;
  lodash.zip = zip;

  // assign aliases
  lodash.all = every;
  lodash.any = some;
  lodash.collect = map;
  lodash.detect = find;
  lodash.drop = rest;
  lodash.each = forEach;
  lodash.extend = assign;
  lodash.foldl = reduce;
  lodash.foldr = reduceRight;
  lodash.head = first;
  lodash.include = contains;
  lodash.inject = reduce;
  lodash.methods = functions;
  lodash.select = filter;
  lodash.tail = rest;
  lodash.take = first;
  lodash.unique = uniq;

  // add pseudo private property to be used and removed during the build process
  lodash._iteratorTemplate = iteratorTemplate;

  /*--------------------------------------------------------------------------*/

  // add all static functions to `lodash.prototype`
  mixin(lodash);

  // add `lodash.prototype.chain` after calling `mixin()` to avoid overwriting
  // it with the wrapped `lodash.chain`
  lodash.prototype.chain = wrapperChain;
  lodash.prototype.value = wrapperValue;

  // add all mutator Array functions to the wrapper.
  forEach(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
    var func = arrayRef[methodName];

    lodash.prototype[methodName] = function() {
      var value = this.__wrapped__;
      func.apply(value, arguments);

      // avoid array-like object bugs with `Array#shift` and `Array#splice` in
      // Firefox < 10 and IE < 9
      if (hasObjectSpliceBug && value.length === 0) {
        delete value[0];
      }
      if (this.__chain__) {
        value = new lodash(value);
        value.__chain__ = true;
      }
      return value;
    };
  });

  // add all accessor Array functions to the wrapper.
  forEach(['concat', 'join', 'slice'], function(methodName) {
    var func = arrayRef[methodName];

    lodash.prototype[methodName] = function() {
      var value = this.__wrapped__,
          result = func.apply(value, arguments);

      if (this.__chain__) {
        result = new lodash(result);
        result.__chain__ = true;
      }
      return result;
    };
  });

  /*--------------------------------------------------------------------------*/

  // expose Lo-Dash
  // some AMD build optimizers, like r.js, check for specific condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lo-Dash to the global object even when an AMD loader is present in
    // case Lo-Dash was injected by a third-party script and not intended to be
    // loaded as a module. The global assignment can be reverted in the Lo-Dash
    // module via its `noConflict()` method.
    window._ = lodash;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define(function() {
      return lodash;
    });
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (freeExports) {
    // in Node.js or RingoJS v0.8.0+
    if (typeof module == 'object' && module && module.exports == freeExports) {
      (module.exports = lodash)._ = lodash;
    }
    // in Narwhal or RingoJS v0.7.0-
    else {
      freeExports._ = lodash;
    }
  }
  else {
    // in a browser or Rhino
    window._ = lodash;
  }
}(this));
;

//     Backbone.js 0.9.9

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to array methods.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.9.9';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
  Backbone.$ = root.jQuery || root.Zepto || root.ender;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
    } else if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
    } else {
      return true;
    }
  };

  // Optimized internal dispatch function for triggering events. Tries to
  // keep the usual cases speedy (most Backbone events have 3 arguments).
  var triggerEvents = function(obj, events, args) {
    var ev, i = -1, l = events.length;
    switch (args.length) {
    case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx);
    return;
    case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0]);
    return;
    case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1]);
    return;
    case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1], args[2]);
    return;
    default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind one or more space separated events, or an events map,
    // to a `callback` function. Passing `"all"` will bind the callback to
    // all events fired.
    on: function(name, callback, context) {
      if (!(eventsApi(this, 'on', name, [callback, context]) && callback)) return this;
      this._events || (this._events = {});
      var list = this._events[name] || (this._events[name] = []);
      list.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind events to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!(eventsApi(this, 'once', name, [callback, context]) && callback)) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      this.on(name, once, context);
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `events` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var list, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (list = this._events[name]) {
          events = [];
          if (callback || context) {
            for (j = 0, k = list.length; j < k; j++) {
              ev = list[j];
              if ((callback && callback !== (ev.callback._callback || ev.callback)) ||
                  (context && context !== ev.context)) {
                events.push(ev);
              }
            }
          }
          this._events[name] = events;
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(this, events, args);
      if (allEvents) triggerEvents(this, allEvents, arguments);
      return this;
    },

    // An inversion-of-control version of `on`. Tell *this* object to listen to
    // an event in another object ... keeping track of what it's listening to.
    listenTo: function(object, events, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = object._listenerId || (object._listenerId = _.uniqueId('l'));
      listeners[id] = object;
      object.on(events, callback || this, this);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(object, events, callback) {
      var listeners = this._listeners;
      if (!listeners) return;
      if (object) {
        object.off(events, callback, this);
        if (!events && !callback) delete listeners[object._listenerId];
      } else {
        for (var id in listeners) {
          listeners[id].off(null, null, this);
        }
        this._listeners = {};
      }
      return this;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var defaults;
    var attrs = attributes || {};
    this.cid = _.uniqueId('c');
    this.changed = {};
    this.attributes = {};
    this._changes = [];
    if (options && options.collection) this.collection = options.collection;
    if (options && options.parse) attrs = this.parse(attrs);
    if (defaults = _.result(this, 'defaults')) _.defaults(attrs, defaults);
    this.set(attrs, {silent: true});
    this._currentAttributes = _.clone(this.attributes);
    this._previousAttributes = _.clone(this.attributes);
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function(key, val, options) {
      var attr, attrs;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (_.isObject(key)) {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      // Extract attributes and options.
      var silent = options && options.silent;
      var unset = options && options.unset;

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      var now = this.attributes;

      // For each `set` attribute...
      for (attr in attrs) {
        val = attrs[attr];

        // Update or delete the current value, and track the change.
        unset ? delete now[attr] : now[attr] = val;
        this._changes.push(attr, val);
      }

      // Signal that the model's state has potentially changed, and we need
      // to recompute the actual changes.
      this._hasComputed = false;

      // Fire the `"change"` events.
      if (!silent) this.change(options);
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp), options)) return false;
        if (success) success(model, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, current, done;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || _.isObject(key)) {
        attrs = key;
        options = val;
      } else if (key != null) {
        (attrs = {})[key] = val;
      }
      options = options ? _.clone(options) : {};

      // If we're "wait"-ing to set changed attributes, validate early.
      if (options.wait) {
        if (attrs && !this._validate(attrs, options)) return false;
        current = _.clone(this.attributes);
      }

      // Regular saves `set` attributes before persisting to the server.
      var silentOptions = _.extend({}, options, {silent: true});
      if (attrs && !this.set(attrs, options.wait ? silentOptions : options)) {
        return false;
      }

      // Do not persist invalid models.
      if (!attrs && !this._validate(null, options)) return false;

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        done = true;
        var serverAttrs = model.parse(resp);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (!model.set(serverAttrs, options)) return false;
        if (success) success(model, resp, options);
      };

      // Finish configuring and sending the Ajax request.
      var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method == 'patch') options.attrs = attrs;
      var xhr = this.sync(method, this, options);

      // When using `wait`, reset attributes to original values unless
      // `success` has been called already.
      if (!done && options.wait) {
        this.clear(silentOptions);
        this.set(current, silentOptions);
      }

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Call this method to manually fire a `"change"` event for this model and
    // a `"change:attribute"` event for each changed attribute.
    // Calling this will cause all objects observing the model to update.
    change: function(options) {
      var changing = this._changing;
      this._changing = true;

      // Generate the changes to be triggered on the model.
      var triggers = this._computeChanges(true);

      this._pending = !!triggers.length;

      for (var i = triggers.length - 2; i >= 0; i -= 2) {
        this.trigger('change:' + triggers[i], this, triggers[i + 1], options);
      }

      if (changing) return this;

      // Trigger a `change` while there have been changes.
      while (this._pending) {
        this._pending = false;
        this.trigger('change', this, options);
        this._previousAttributes = _.clone(this.attributes);
      }

      this._changing = false;
      return this;
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (!this._hasComputed) this._computeChanges();
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false, old = this._previousAttributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Looking at the built up list of `set` attribute changes, compute how
    // many of the attributes have actually changed. If `loud`, return a
    // boiled-down list of only the real changes.
    _computeChanges: function(loud) {
      this.changed = {};
      var already = {};
      var triggers = [];
      var current = this._currentAttributes;
      var changes = this._changes;

      // Loop through the current queue of potential model changes.
      for (var i = changes.length - 2; i >= 0; i -= 2) {
        var key = changes[i], val = changes[i + 1];
        if (already[key]) continue;
        already[key] = true;

        // Check if the attribute has been modified since the last change,
        // and update `this.changed` accordingly. If we're inside of a `change`
        // call, also add a trigger to the list.
        if (current[key] !== val) {
          this.changed[key] = val;
          if (!loud) continue;
          triggers.push(key, val);
          current[key] = val;
        }
      }
      if (loud) this._changes = [];

      // Signals `this.changed` is current to prevent duplicate calls from `this.hasChanged`.
      this._hasComputed = true;
      return triggers;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. If a specific `error` callback has
    // been passed, call that instead of firing the general `"error"` event.
    _validate: function(attrs, options) {
      if (!this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validate(attrs, options);
      if (!error) return true;
      if (options && options.error) options.error(this, error, options);
      this.trigger('error', this, error, options);
      return false;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set. Pass **silent** to avoid
    // firing the `add` event for every new model.
    add: function(models, options) {
      var i, args, length, model, existing, needsSort;
      var at = options && options.at;
      var sort = ((options && options.sort) == null ? true : options.sort);
      models = _.isArray(models) ? models.slice() : [models];

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = models.length - 1; i >= 0; i--) {
        if(!(model = this._prepareModel(models[i], options))) {
          this.trigger("error", this, models[i], options);
          models.splice(i, 1);
          continue;
        }
        models[i] = model;

        existing = model.id != null && this._byId[model.id];
        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing || this._byCid[model.cid]) {
          if (options && options.merge && existing) {
            existing.set(model.attributes, options);
            needsSort = sort;
          }
          models.splice(i, 1);
          continue;
        }

        // Listen to added models' events, and index models for lookup by
        // `id` and by `cid`.
        model.on('all', this._onModelEvent, this);
        this._byCid[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (models.length) needsSort = sort;
      this.length += models.length;
      args = [at != null ? at : this.models.length, 0];
      push.apply(args, models);
      splice.apply(this.models, args);

      // Sort the collection if appropriate.
      if (needsSort && this.comparator && at == null) this.sort({silent: true});

      if (options && options.silent) return this;

      // Trigger `add` events.
      while (model = models.shift()) {
        model.trigger('add', model, this, options);
      }

      return this;
    },

    // Remove a model, or a list of models from the set. Pass silent to avoid
    // firing the `remove` event for every model removed.
    remove: function(models, options) {
      var i, l, index, model;
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];
      for (i = 0, l = models.length; i < l; i++) {
        model = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byCid[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: this.length}, options));
      return model;
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: 0}, options));
      return model;
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function(begin, end) {
      return this.models.slice(begin, end);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj.id != null ? obj.id : obj] || this._byCid[obj.cid || obj];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of `filter`.
    where: function(attrs) {
      if (_.isEmpty(attrs)) return [];
      return this.filter(function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) {
        throw new Error('Cannot sort a set without a comparator');
      }

      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options || !options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Smartly update a collection with a change set of models, adding,
    // removing, and merging as necessary.
    update: function(models, options) {
      var model, i, l, existing;
      var add = [], remove = [], modelMap = {};
      var idAttr = this.model.prototype.idAttribute;
      options = _.extend({add: true, merge: true, remove: true}, options);
      if (options.parse) models = this.parse(models);

      // Allow a single model (or no argument) to be passed.
      if (!_.isArray(models)) models = models ? [models] : [];

      // Proxy to `add` for this case, no need to iterate...
      if (options.add && !options.remove) return this.add(models, options);

      // Determine which models to add and merge, and which to remove.
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i];
        existing = this.get(model.id || model.cid || model[idAttr]);
        if (options.remove && existing) modelMap[existing.cid] = true;
        if ((options.add && !existing) || (options.merge && existing)) {
          add.push(model);
        }
      }
      if (options.remove) {
        for (i = 0, l = this.models.length; i < l; i++) {
          model = this.models[i];
          if (!modelMap[model.cid]) remove.push(model);
        }
      }

      // Remove models (if applicable) before we add and merge the rest.
      if (remove.length) this.remove(remove, options);
      if (add.length) this.add(add, options);
      return this;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.
    reset: function(models, options) {
      options || (options = {});
      if (options.parse) models = this.parse(models);
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      options.previousModels = this.models;
      this._reset();
      if (models) this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `add: true` is passed, appends the
    // models to the collection instead of resetting.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var collection = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        var method = options.update ? 'update' : 'reset';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      var collection = this;
      options = options ? _.clone(options) : {};
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!options.wait) collection.add(model, options);
      var success = options.success;
      options.success = function(model, resp, options) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Proxy to _'s chain. Can't be proxied the same way the rest of the
    // underscore methods are proxied because it relies on the underscore
    // constructor.
    chain: function() {
      return _(this.models).chain();
    },

    // Reset all internal state. Called when the collection is reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
      this._byCid = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options || (options = {});
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model._validate(attrs, options)) return false;
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference: function(model) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'sortedIndex', 'toArray', 'size', 'first', 'head', 'take',
    'initial', 'rest', 'tail', 'last', 'without', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, '([^\/]+)')
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).bind('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).bind('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        this.location.replace(this.root + this.location.search + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = this.getHash().replace(routeStripper, '');
        this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).unbind('popstate', this.checkUrl).unbind('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(this.getHash());
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: options};
      fragment = this.getFragment(fragment || '');
      if (this.fragment === fragment) return;
      this.fragment = fragment;
      var url = this.root + fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // For small amounts of DOM Elements, where a full-blown template isn't
    // needed, use **make** to manufacture elements, one at a time.
    //
    //     var el = this.make('li', {'class': 'row'}, this.model.escape('title'));
    //
    make: function(tagName, attributes, content) {
      var el = document.createElement(tagName);
      if (attributes) Backbone.$(el).attr(attributes);
      if (content != null) Backbone.$(el).html(content);
      return el;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Method "' + events[key] + '" does not exist');
        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.bind(eventName, method);
        } else {
          this.$el.delegate(selector, eventName, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.unbind('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure: function(options) {
      if (this.options) options = _.extend({}, _.result(this, 'options'), options);
      _.extend(this, _.pick(options, viewOptions));
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        this.setElement(this.make(_.result(this, 'tagName'), attrs), false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    var success = options.success;
    options.success = function(resp, status, xhr) {
      if (success) success(resp, status, xhr);
      model.trigger('sync', model, resp, options);
    };

    var error = options.error;
    options.error = function(xhr, status, thrown) {
      if (error) error(model, xhr, options);
      model.trigger('error', model, xhr, options);
    };

    // Make the request, allowing the user to override any Ajax options.
    var xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);
;

/**
 * |-------------------|
 * | Backbone-Mediator |
 * |-------------------|
 *  Backbone-Mediator is freely distributable under the MIT license.
 *
 *  <a href="https://github.com/chalbert/Backbone-Mediator">More details & documentation</a>
 *
 * @author Nicolas Gilbert
 *
 * @requires _
 * @requires Backbone
 */
(function(factory){
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone'], factory);
  } else {
    factory(_, Backbone);
  }

})(function (_, Backbone){
  'use strict';

  /**
   * @static
   */
  var channels = {},
      Subscriber,
      /** @borrows Backbone.View#delegateEvents */
      delegateEvents = Backbone.View.prototype.delegateEvents,
      /** @borrows Backbone.View#delegateEvents */
      undelegateEvents = Backbone.View.prototype.undelegateEvents;

  /**
   * @class
   */
  Backbone.Mediator = {

    /**
     * Subscribe to a channel
     *
     * @param channel
     */
    subscribe: function(channel, subscription, context, once) {
      if (!channels[channel]) channels[channel] = [];
      channels[channel].push({fn: subscription, context: context || this, once: once});
    },

    /**
     * Trigger all callbacks for a channel
     *
     * @param channel
     * @params N Extra parametter to pass to handler
     */
    publish: function(channel) {
      if (!channels[channel]) return;

      var args = [].slice.call(arguments, 1),
          subscription;

      for (var i = 0; i < channels[channel].length; i++) {
        subscription = channels[channel][i];
        subscription.fn.apply(subscription.context, args);
        if (subscription.once) {
          Backbone.Mediator.unsubscribe(channel, subscription.fn, subscription.context);
          i--;
        }
      }
    },

    /**
     * Cancel subscription
     *
     * @param channel
     * @param fn
     * @param context
     */

    unsubscribe: function(channel, fn, context){
      if (!channels[channel]) return;

      var subscription;
      for (var i = 0; i < channels[channel].length; i++) {
        subscription = channels[channel][i];
        if (subscription.fn === fn && subscription.context === context) {
          channels[channel].splice(i, 1);
          i--;
        }
      }
    },

    /**
     * Subscribing to one event only
     *
     * @param channel
     * @param subscription
     * @param context
     */
    subscribeOnce: function (channel, subscription, context) {
      Backbone.Mediator.subscribe(channel, subscription, context, true);
    }

  };

  /**
   * Allow to define convention-based subscriptions
   * as an 'subscriptions' hash on a view. Subscriptions
   * can then be easily setup and cleaned.
   *
   * @class
   */


  Subscriber = {

    /**
     * Extend delegateEvents() to set subscriptions
     */
    delegateEvents: function(){
      delegateEvents.apply(this, arguments);
      this.setSubscriptions();
    },

    /**
     * Extend undelegateEvents() to unset subscriptions
     */
    undelegateEvents: function(){
      undelegateEvents.apply(this, arguments);
      this.unsetSubscriptions();
    },

    /** @property {Object} List of subscriptions, to be defined */
    subscriptions: {},

    /**
     * Subscribe to each subscription
     * @param {Object} [subscriptions] An optional hash of subscription to add
     */

    setSubscriptions: function(subscriptions){
      if (subscriptions) _.extend(this.subscriptions || {}, subscriptions);
      subscriptions = subscriptions || this.subscriptions;
      if (!subscriptions || _.isEmpty(subscriptions)) return;
      // Just to be sure we don't set duplicate
      this.unsetSubscriptions(subscriptions);

      _.each(subscriptions, function(subscription, channel){
        var once;
        if (subscription.$once) {
          subscription = subscription.$once;
          once = true;
        }
        if (_.isString(subscription)) {
          subscription = this[subscription];
        }
        Backbone.Mediator.subscribe(channel, subscription, this, once);
      }, this);
    },

    /**
     * Unsubscribe to each subscription
     * @param {Object} [subscriptions] An optional hash of subscription to remove
     */
    unsetSubscriptions: function(subscriptions){
      subscriptions = subscriptions || this.subscriptions;
      if (!subscriptions || _.isEmpty(subscriptions)) return;
      _.each(subscriptions, function(subscription, channel){
        if (_.isString(subscription)) {
          subscription = this[subscription];
        }
        Backbone.Mediator.unsubscribe(channel, subscription.$once || subscription, this);
      }, this);
    }
  };

  /**
   * @lends Backbone.View.prototype
   */
  _.extend(Backbone.View.prototype, Subscriber);

  /**
   * @lends Backbone.Mediator
   */
  _.extend(Backbone.Mediator, {
    /**
     * Shortcut for publish
     * @function
     */
    pub: Backbone.Mediator.publish,
    /**
     * Shortcut for subscribe
     * @function
     */
    sub: Backbone.Mediator.subscribe
  });

  return Backbone;

});;

/* ------------------------------------------------------------------------- */
/* --- Backbone Core Modifications ----------------------------------------- */
/* ------------------------------------------------------------------------- */

/*** Provides super method ***/

(function(Backbone) {
	Backbone.Model.extend = Backbone.Collection.extend = Backbone.Router.extend = Backbone.View.extend = function(protoProps, classProps) {
		var child = inherits(this, protoProps, classProps);
		child.extend = this.extend;
		return child;
	};

	var ctor = function(){}, inherits = function(parent, protoProps, staticProps) {
		var child, _super = parent.prototype, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

		// The constructor function for the new subclass is either defined by you
		// (the "constructor" property in your `extend` definition), or defaulted
		// by us to simply call the parent's constructor.
		if (protoProps && protoProps.hasOwnProperty('constructor')) {
			child = protoProps.constructor;
		} else {
			child = function(){ parent.apply(this, arguments); };
		}

		// Inherit class (static) properties from parent.
		_.extend(child, parent);

		// Set the prototype chain to inherit from `parent`, without calling
		// `parent`'s constructor function.
		ctor.prototype = parent.prototype;
		child.prototype = new ctor();
		
		// Add prototype properties (instance properties) to the subclass,
		// if supplied.
		if (protoProps) {
			_.extend(child.prototype, protoProps);
			
			// Copy the properties over onto the new prototype
			for (var name in protoProps) {
				// Check if we're overwriting an existing function
				if (typeof protoProps[name] == "function" &&  typeof _super[name] == "function" && fnTest.test(protoProps[name])) {
					child.prototype[name] = (function(name, fn) {
						return function() {
							var tmp = this._super;

							// Add a new ._super() method that is the same method
							// but on the super-class
							this._super = _super[name];

							// The method only need to be bound temporarily, so we
							// remove it when we're done executing
							var ret = fn.apply(this, arguments);
							this._super = tmp;

							return ret;
						};
					})(name, protoProps[name]);
				}
			}
		}

		// Add static properties to the constructor function, if supplied.
		if (staticProps) _.extend(child, staticProps);

		// Correctly set child's `prototype.constructor`.
		child.prototype.constructor = child;

		// Set a convenience property in case the parent's prototype is needed later.
		child.__super__ = parent.prototype;

		return child;
	};
})(Backbone);;

/**
 * VERSION: beta 1.648
 * DATE: 2012-11-23
 * JavaScript (ActionScript 3 and 2 also available)
 * UPDATES AND DOCS AT: http://www.greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, easing.EasePack, plugins.CSSPlugin, plugins.RoundPropsPlugin
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue||(window._gsQueue=[])).push(function(){_gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(p,t,g){var n=function(E,c,e){g.call(this,E,c,e);this._cycle=0;this._yoyo=!0===this.vars.yoyo;this._repeat=this.vars.repeat||0;this._repeatDelay=this.vars.repeatDelay||0;this._dirty=!0},j=n.prototype=g.to({},0.1,{}),d=[];n.version=1.648;j.constructor=n;j.kill()._gc=!1;n.killTweensOf=n.killDelayedCallsTo=g.killTweensOf;n.getTweensOf=g.getTweensOf;n.ticker=g.ticker;
j.invalidate=function(){this._yoyo=!0===this.vars.yoyo;this._repeat=this.vars.repeat||0;this._repeatDelay=this.vars.repeatDelay||0;this._uncache(!0);return g.prototype.invalidate.call(this)};j.updateTo=function(E,c){var e=this.ratio,a;c&&(null!=this.timeline&&this._startTime<this._timeline._time)&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(a in E)this.vars[a]=E[a];if(this._initted)if(c)this._initted=
!1;else if(this._notifyPluginsOfEnabled&&this._firstPT&&g._onPluginEvent("_onDisable",this),0.998<this._time/this._duration)e=this._time,this.render(0,!0,!1),this._initted=!1,this.render(e,!0,!1);else if(0<this._time){this._initted=!1;this._init();e=1/(1-e);a=this._firstPT;for(var H;a;)H=a.s+a.c,a.c*=e,a.s=H-a.c,a=a._next}return this};j.render=function(a,c,e){var i=!this._dirty?this._totalDuration:this.totalDuration(),H=this._time,b=this._totalTime,v=this._cycle,h,x;if(a>=i){if(this._totalTime=i,
this._cycle=this._repeat,this._yoyo&&0!==(this._cycle&1)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=this._duration,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(h=!0,x="onComplete"),0===this._duration){if(0===a||0>this._rawPrevTime)this._rawPrevTime!==a&&(e=!0);this._rawPrevTime=a}}else if(0>=a){this._totalTime=this._time=this._cycle=0;this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0;if(0!==b||0===this._duration&&0<this._rawPrevTime)x=
"onReverseComplete",h=this._reversed;0>a?(this._active=!1,0===this._duration&&(0<=this._rawPrevTime&&(e=!0),this._rawPrevTime=a)):this._initted||(e=!0)}else if(this._totalTime=this._time=a,0!==this._repeat&&(a=this._duration+this._repeatDelay,this._cycle=this._totalTime/a>>0,0!==this._cycle&&this._cycle===this._totalTime/a&&this._cycle--,this._time=this._totalTime-this._cycle*a,this._yoyo&&0!==(this._cycle&1)&&(this._time=this._duration-this._time),this._time>this._duration?this._time=this._duration:
0>this._time&&(this._time=0)),this._easeType){var a=this._time/this._duration,i=this._easeType,q=this._easePower;if(1===i||3===i&&0.5<=a)a=1-a;3===i&&(a*=2);1===q?a*=a:2===q?a*=a*a:3===q?a*=a*a*a:4===q&&(a*=a*a*a*a);this.ratio=1===i?1-a:2===i?a:0.5>this._time/this._duration?a/2:1-a/2}else this.ratio=this._ease.getRatio(this._time/this._duration);if(H===this._time&&!e)b!==this._totalTime&&this._onUpdate&&(c||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||d));else{this._initted||
(this._init(),!h&&this._time&&(this.ratio=this._ease.getRatio(this._time/this._duration)));!this._active&&!this._paused&&(this._active=!0);if(0===b&&this.vars.onStart&&(0!==this._totalTime||0===this._duration))c||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||d);for(e=this._firstPT;e;){if(e.f)e.t[e.p](e.c*this.ratio+e.s);else e.t[e.p]=e.c*this.ratio+e.s;e=e._next}this._onUpdate&&(c||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||d));this._cycle!==
v&&(c||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||d));x&&!this._gc&&(h&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),c||this.vars[x]&&this.vars[x].apply(this.vars[x+"Scope"]||this,this.vars[x+"Params"]||d))}};n.to=function(a,c,e){return new n(a,c,e)};n.from=function(a,c,e){e.runBackwards=!0;!1!==e.immediateRender&&(e.immediateRender=!0);return new n(a,c,e)};n.fromTo=function(a,c,e,i){i.startAt=e;e.immediateRender&&
(i.immediateRender=!0);return new n(a,c,i)};n.staggerTo=n.allTo=function(a,c,e,i,H,b,d){var i=i||0,h=[],v=a.length,q=e.delay||0,B,s,g;for(s=0;s<v;s++){B={};for(g in e)B[g]=e[g];B.delay=q;s===v-1&&H&&(B.onComplete=function(){e.onComplete&&e.onComplete.apply(e.onCompleteScope,e.onCompleteParams);H.apply(d,b)});h[s]=new n(a[s],c,B);q+=i}return h};n.staggerFrom=n.allFrom=function(a,c,e,i,b,d,v){e.runBackwards=!0;!1!==e.immediateRender&&(e.immediateRender=!0);return n.staggerTo(a,c,e,i,b,d,v)};n.staggerFromTo=
n.allFromTo=function(a,c,e,i,b,d,v,h){i.startAt=e;e.immediateRender&&(i.immediateRender=!0);return n.staggerTo(a,c,i,b,d,v,h)};n.delayedCall=function(a,c,e,i,b){return new n(c,0,{delay:a,onComplete:c,onCompleteParams:e,onCompleteScope:i,onReverseComplete:c,onReverseCompleteParams:e,onReverseCompleteScope:i,immediateRender:!1,useFrames:b,overwrite:0})};n.set=function(a,c){return new n(a,0,c)};n.isTweening=function(a){for(var a=g.getTweensOf(a),c=a.length,e;-1<--c;)if((e=a[c])._active||e._startTime===
e.timeline._time&&e.timeline._active)return!0;return!1};var v=function(a,c){for(var e=[],i=0,b=a._first;b;)b instanceof g?e[i++]=b:(c&&(e[i++]=b),e=e.concat(v(b,c)),i=e.length),b=b._next;return e},b=n.getAllTweens=function(a){return v(p._rootTimeline,a).concat(v(p._rootFramesTimeline,a))};n.killAll=function(a,c,e,i){null==c&&(c=!0);null==e&&(e=!0);var H=b(!1!=i),d=H.length,i=c&&e&&i,v,h,x;for(x=0;x<d;x++)if(h=H[x],i||h instanceof t||(v=h.target===h.vars.onComplete)&&e||c&&!v)a?h.totalTime(h.totalDuration()):
h._enabled(!1,!1)};n.killChildTweensOf=function(a,c){if(null!=a)if(a.jquery)a.each(function(a,e){n.killChildTweensOf(e,c)});else{var e=g._tweenLookup,i=[],b,d;for(d in e)for(b=e[d].target.parentNode;b;)b===a&&(i=i.concat(e[d].tweens)),b=b.parentNode;b=i.length;for(e=0;e<b;e++)c&&i[e].totalTime(i[e].totalDuration()),i[e]._enabled(!1,!1)}};n.pauseAll=function(E,c,e){a(!0,E,c,e)};n.resumeAll=function(E,c,e){a(!1,E,c,e)};var a=function(a,c,e,i){void 0==c&&(c=!0);void 0==e&&(e=!0);for(var d=b(i),i=c&&
e&&i,v=d.length,g,h;-1<--v;)h=d[v],(i||h instanceof t||(g=h.target===h.vars.onComplete)&&e||c&&!g)&&h.paused(a)};j.progress=function(a){return!arguments.length?this._time/this.duration():this.totalTime(this.duration()*(this._yoyo&&0!==(this._cycle&1)?1-a:a)+this._cycle*(this._duration+this._repeatDelay),!1)};j.totalProgress=function(a){return!arguments.length?this._totalTime/this.totalDuration():this.totalTime(this.totalDuration()*a,!1)};j.time=function(a,c){if(!arguments.length)return this._time;
this._dirty&&this.totalDuration();a>this._duration&&(a=this._duration);this._yoyo&&0!==(this._cycle&1)?a=this._duration-a+this._cycle*(this._duration+this._repeatDelay):0!=this._repeat&&(a+=this._cycle*(this._duration+this._repeatDelay));return this.totalTime(a,c)};j.totalDuration=function(a){return!arguments.length?(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration):-1===this._repeat?
this:this.duration((a-this._repeat*this._repeatDelay)/(this._repeat+1))};j.repeat=function(a){if(!arguments.length)return this._repeat;this._repeat=a;return this._uncache(!0)};j.repeatDelay=function(a){if(!arguments.length)return this._repeatDelay;this._repeatDelay=a;return this._uncache(!0)};j.yoyo=function(a){if(!arguments.length)return this._yoyo;this._yoyo=a;return this};return n},!0);_gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(p,t,g){var n=function(a){t.call(this,
a);this._labels={};this.autoRemoveChildren=!0===this.vars.autoRemoveChildren;this.smoothChildTiming=!0===this.vars.smoothChildTiming;this._sortChildren=!0;this._onUpdate=this.vars.onUpdate;for(var a=j.length,b,c;-1<--a;)if(c=this.vars[j[a]])for(b=c.length;-1<--b;)"{self}"===c[b]&&(c=this.vars[j[a]]=c.concat(),c[b]=this);this.vars.tweens instanceof Array&&this.insertMultiple(this.vars.tweens,0,this.vars.align||"normal",this.vars.stagger||0)},j=["onStartParams","onUpdateParams","onCompleteParams","onReverseCompleteParams",
"onRepeatParams"],d=[],v=function(a){var b={},c;for(c in a)b[c]=a[c];return b},b=n.prototype=new t;n.version=1.641;b.constructor=n;b.kill()._gc=!1;b.to=function(a,b,c,e,i){return this.insert(new g(a,b,c),this._parseTimeOrLabel(i,e,!0))};b.from=function(a,b,c,e,i){return this.insert(g.from(a,b,c),this._parseTimeOrLabel(i,e,!0))};b.fromTo=function(a,b,c,e,i,d){return this.insert(g.fromTo(a,b,c,e),this._parseTimeOrLabel(d,i,!0))};b.staggerTo=function(a,b,c,e,i,d,j,F,h){j=new n({onComplete:j,onCompleteParams:F,
onCompleteScope:h});e=e||0;for(F=0;F<a.length;F++)null!=c.startAt&&(c.startAt=v(c.startAt)),j.insert(new g(a[F],b,v(c)),F*e);return this.insert(j,this._parseTimeOrLabel(d,i,!0))};b.staggerFrom=function(a,b,c,e,i,d,v,g,h){null==c.immediateRender&&(c.immediateRender=!0);c.runBackwards=!0;return this.staggerTo(a,b,c,e,i,d,v,g,h)};b.staggerFromTo=function(a,b,c,e,i,d,v,g,h,x){e.startAt=c;c.immediateRender&&(e.immediateRender=!0);return this.staggerTo(a,b,e,i,d,v,g,h,x)};b.call=function(a,b,c,e,i){return this.insert(g.delayedCall(0,
a,b,c),this._parseTimeOrLabel(i,e,!0))};b.set=function(a,b,c,e){b.immediateRender=!1;return this.insert(new g(a,0,b),this._parseTimeOrLabel(e,c,!0))};n.exportRoot=function(a,b){a=a||{};null==a.smoothChildTiming&&(a.smoothChildTiming=!0);var c=new n(a),e=c._timeline;null==b&&(b=!0);e._remove(c,!0);c._startTime=0;c._rawPrevTime=c._time=c._totalTime=e._time;for(var i=e._first,d;i;)d=i._next,(!b||!(i instanceof g&&i.target===i.vars.onComplete))&&c.insert(i,i._startTime-i._delay),i=d;e.insert(c,0);return c};
b.insert=function(a,b){if(!(a instanceof p)){if(a instanceof Array)return this.insertMultiple(a,b);if("string"===typeof a)return this.addLabel(a,this._parseTimeOrLabel(b||0,0,!0));if("function"===typeof a)a=g.delayedCall(0,a);else throw"ERROR: Cannot insert() "+a+" into the TimelineLite/Max because it is neither a tween, timeline, function, nor a String.";}t.prototype.insert.call(this,a,this._parseTimeOrLabel(b||0,0,!0));if(this._gc&&!this._paused&&this._time===this._duration&&this._time<this.duration())for(var c=
this;c._gc&&c._timeline;)c._timeline.smoothChildTiming?c.totalTime(c._totalTime,!0):c._enabled(!0,!1),c=c._timeline;return this};b.remove=function(a){if(a instanceof p)return this._remove(a,!1);if(a instanceof Array){for(var b=a.length;-1<--b;)this.remove(a[b]);return this}return"string"===typeof a?this.removeLabel(a):this.kill(null,a)};b.append=function(a,b){return this.insert(a,this._parseTimeOrLabel(null,b,!0))};b.insertMultiple=function(a,b,c,e){for(var c=c||"normal",e=e||0,i,d=this._parseTimeOrLabel(b||
0,0,!0),v=a.length,b=0;b<v;b++){if((i=a[b])instanceof Array)i=new n({tweens:i});this.insert(i,d);"string"===typeof i||"function"===typeof i||("sequence"===c?d=i._startTime+i.totalDuration()/i._timeScale:"start"===c&&(i._startTime-=i.delay()));d+=e}return this._uncache(!0)};b.appendMultiple=function(a,b,c,e){return this.insertMultiple(a,this._parseTimeOrLabel(null,b,!0),c,e)};b.addLabel=function(a,b){this._labels[a]=b;return this};b.removeLabel=function(a){delete this._labels[a];return this};b.getLabelTime=
function(a){return null!=this._labels[a]?this._labels[a]:-1};b._parseTimeOrLabel=function(a,b,c){if("string"===typeof b)return this._parseTimeOrLabel(b,c&&"number"===typeof a&&null==this._labels[b]?a-this.duration():0,c);b=b||0;return null==a?this.duration()+b:"string"===typeof a&&isNaN(a)?null==this._labels[a]?c?this._labels[a]=this.duration()+b:b:this._labels[a]+b:Number(a)+b};b.seek=function(a,b){return this.totalTime(this._parseTimeOrLabel(a),!1!=b)};b.stop=function(){return this.paused(!0)};
b.gotoAndPlay=function(a,b){return t.prototype.play.call(this,a,b)};b.gotoAndStop=function(a,b){return this.pause(a,b)};b.render=function(a,b,c){this._gc&&this._enabled(!0,!1);this._active=!this._paused;var e=!this._dirty?this._totalDuration:this.totalDuration(),i=this._time,v=this._startTime,g=this._timeScale,n=this._paused,h,x,q;if(a>=e){this._totalTime=this._time=e;if(!this._reversed&&!this._hasPausedChild()&&(h=!0,q="onComplete",0===this._duration&&(0===a||0>this._rawPrevTime)))this._rawPrevTime!==
a&&(c=!0);this._rawPrevTime=a;a=e+1E-6}else if(0>=a){this._totalTime=this._time=0;if(0!==i||0===this._duration&&0<this._rawPrevTime)q="onReverseComplete",h=this._reversed;0>a?(this._active=!1,0===this._duration&&0<=this._rawPrevTime&&(c=!0)):this._initted||(c=!0);this._rawPrevTime=a;a=-1E-6}else this._totalTime=this._time=this._rawPrevTime=a;if(this._time!==i||c){this._initted||(this._initted=!0);0===i&&this.vars.onStart&&0!==this._time&&(b||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||
d));if(this._time>i)for(c=this._first;c;){x=c._next;if(this._paused&&!n)break;else if(c._active||c._startTime<=this._time&&!c._paused&&!c._gc)c._reversed?c.render((!c._dirty?c._totalDuration:c.totalDuration())-(a-c._startTime)*c._timeScale,b,!1):c.render((a-c._startTime)*c._timeScale,b,!1);c=x}else for(c=this._last;c;){x=c._prev;if(this._paused&&!n)break;else if(c._active||c._startTime<=i&&!c._paused&&!c._gc)c._reversed?c.render((!c._dirty?c._totalDuration:c.totalDuration())-(a-c._startTime)*c._timeScale,
b,!1):c.render((a-c._startTime)*c._timeScale,b,!1);c=x}this._onUpdate&&(b||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||d));if(q&&!this._gc&&(v===this._startTime||g!=this._timeScale))if(0===this._time||e>=this.totalDuration())h&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),b||this.vars[q]&&this.vars[q].apply(this.vars[q+"Scope"]||this,this.vars[q+"Params"]||d)}};b._hasPausedChild=function(){for(var a=this._first;a;){if(a._paused||a instanceof
n&&a._hasPausedChild())return!0;a=a._next}return!1};b.getChildren=function(a,b,c,e){for(var e=e||-9999999999,i=[],d=this._first,v=0;d;)d._startTime<e||(d instanceof g?!1!=b&&(i[v++]=d):(!1!=c&&(i[v++]=d),!1!=a&&(i=i.concat(d.getChildren(!0,b,c)),v=i.length))),d=d._next;return i};b.getTweensOf=function(a,b){for(var c=g.getTweensOf(a),e=c.length,i=[],d=0;-1<--e;)if(c[e].timeline===this||b&&this._contains(c[e]))i[d++]=c[e];return i};b._contains=function(a){for(a=a.timeline;a;){if(a===this)return!0;a=
a.timeline}return!1};b.shiftChildren=function(a,b,c){for(var c=c||0,e=this._first;e;)e._startTime>=c&&(e._startTime+=a),e=e._next;if(b)for(var i in this._labels)this._labels[i]>=c&&(this._labels[i]+=a);return this._uncache(!0)};b._kill=function(a,b){if(null==a&&null==b)return this._enabled(!1,!1);for(var c=null==b?this.getChildren(!0,!0,!1):this.getTweensOf(b),e=c.length,i=!1;-1<--e;)c[e]._kill(a,b)&&(i=!0);return i};b.clear=function(a){var b=this.getChildren(!1,!0,!0),c=b.length;for(this._time=this._totalTime=
0;-1<--c;)b[c]._enabled(!1,!1);!1!=a&&(this._labels={});return this._uncache(!0)};b.invalidate=function(){for(var a=this._first;a;)a.invalidate(),a=a._next;return this};b._enabled=function(a,b){if(a===this._gc)for(var c=this._first;c;)c._enabled(a,!0),c=c._next;return t.prototype._enabled.call(this,a,b)};b.progress=function(a){return!arguments.length?this._time/this.duration():this.totalTime(this.duration()*a,!1)};b.duration=function(a){if(!arguments.length)return this._dirty&&this.totalDuration(),
this._duration;0!==this.duration()&&0!==a&&this.timeScale(this._duration/a);return this};b.totalDuration=function(a){if(!arguments.length){if(this._dirty){for(var b=0,c=this._first,e=-999999999999,i;c;)i=c._next,c._startTime<e&&this._sortChildren?this.insert(c,c._startTime-c._delay):e=c._startTime,0>c._startTime&&(b-=c._startTime,this.shiftChildren(-c._startTime,!1,-9999999999)),c=c._startTime+(!c._dirty?c._totalDuration:c.totalDuration())/c._timeScale,c>b&&(b=c),c=i;this._duration=this._totalDuration=
b;this._dirty=!1}return this._totalDuration}0!==this.totalDuration()&&0!==a&&this.timeScale(this._totalDuration/a);return this};b.usesFrames=function(){for(var a=this._timeline;a._timeline;)a=a._timeline;return a===p._rootFramesTimeline};b.rawTime=function(){return this._paused||0!==this._totalTime&&this._totalTime!==this._totalDuration?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale};return n},!0);_gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(p,
t,g){var n=function(d){p.call(this,d);this._repeat=this.vars.repeat||0;this._repeatDelay=this.vars.repeatDelay||0;this._cycle=0;this._yoyo=!0==this.vars.yoyo;this._dirty=!0},j=[],d=new g(null,null,1,0),g=n.prototype=new p;g.constructor=n;g.kill()._gc=!1;n.version=1.641;g.invalidate=function(){this._yoyo=!0===this.vars.yoyo;this._repeat=this.vars.repeat||0;this._repeatDelay=this.vars.repeatDelay||0;this._uncache(!0);return p.prototype.invalidate.call(this)};g.addCallback=function(d,b,a,g){return this.insert(t.delayedCall(0,
d,a,g),b)};g.removeCallback=function(d,b){if(null==b)this._kill(null,d);else for(var a=this.getTweensOf(d,!1),g=a.length,c=this._parseTimeOrLabel(b);-1<--g;)a[g]._startTime===c&&a[g]._enabled(!1,!1);return this};g.tweenTo=function(v,b){var b=b||{},a={ease:d,overwrite:2,useFrames:this.usesFrames(),immediateRender:!1},g,c;for(g in b)a[g]=b[g];a.time=this._parseTimeOrLabel(v);c=new t(this,Math.abs(Number(a.time)-this._time)/this._timeScale||0.001,a);a.onStart=function(){c.target.paused(!0);c.vars.time!==
c.target.time()&&c.duration(Math.abs(c.vars.time-c.target.time())/c.target._timeScale);b.onStart&&b.onStart.apply(b.onStartScope||c,b.onStartParams||j)};return c};g.tweenFromTo=function(d,b,a){a=a||{};a.startAt={time:this._parseTimeOrLabel(d)};d=this.tweenTo(b,a);return d.duration(Math.abs(d.vars.time-d.vars.startAt.time)/this._timeScale||0.001)};g.render=function(d,b,a){this._gc&&this._enabled(!0,!1);this._active=!this._paused;var g=!this._dirty?this._totalDuration:this.totalDuration(),c=this._time,
e=this._totalTime,i=this._startTime,n=this._timeScale,t=this._rawPrevTime,F=this._paused,h=this._cycle,x,q;if(d>=g){this._locked||(this._totalTime=g,this._cycle=this._repeat);if(!this._reversed&&!this._hasPausedChild()&&(x=!0,q="onComplete",0===this._duration&&(0===d||0>this._rawPrevTime)))this._rawPrevTime!==d&&(a=!0);this._rawPrevTime=d;this._yoyo&&0!==(this._cycle&1)?(this._time=0,d=-1E-6):(this._time=this._duration,d=this._duration+1E-6)}else if(0>=d){this._locked||(this._totalTime=this._cycle=
0);this._time=0;if(0!==c||0===this._duration&&0<this._rawPrevTime&&!this._locked)q="onReverseComplete",x=this._reversed;0>d?(this._active=!1,0===this._duration&&0<=this._rawPrevTime&&(a=!0)):this._initted||(a=!0);this._rawPrevTime=d;d=0===this._duration?0:-1E-6}else if(this._time=this._rawPrevTime=d,!this._locked&&(this._totalTime=d,0!==this._repeat)){var B=this._duration+this._repeatDelay;this._cycle=this._totalTime/B>>0;0!==this._cycle&&this._cycle===this._totalTime/B&&this._cycle--;this._time=
this._totalTime-this._cycle*B;this._yoyo&&0!==(this._cycle&1)&&(this._time=this._duration-this._time);this._time>this._duration?(this._time=this._duration,d=this._duration+1E-6):0>this._time?this._time=d=0:d=this._time}if(this._cycle!==h&&!this._locked){var B=this._yoyo&&0!==(h&1),s=B===(this._yoyo&&0!==(this._cycle&1)),O=this._totalTime,I=this._cycle,D=this._rawPrevTime,y=this._time;this._totalTime=h*this._duration;this._cycle<h?B=!B:this._totalTime+=this._duration;this._time=c;this._rawPrevTime=
0===this._duration?t-1E-5:t;this._cycle=h;this._locked=!0;c=B?0:this._duration;this.render(c,b,0===this._duration);b||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||j);s&&(c=B?this._duration+1E-6:-1E-6,this.render(c,!0,!1));this._time=y;this._totalTime=O;this._cycle=I;this._rawPrevTime=D;this._locked=!1}if(this._time===c&&!a)e!==this._totalTime&&this._onUpdate&&(b||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||
j));else{this._initted||(this._initted=!0);0===e&&this.vars.onStart&&0!==this._totalTime&&(b||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||j));if(this._time>c)for(a=this._first;a;){e=a._next;if(this._paused&&!F)break;else if(a._active||a._startTime<=this._time&&!a._paused&&!a._gc)a._reversed?a.render((!a._dirty?a._totalDuration:a.totalDuration())-(d-a._startTime)*a._timeScale,b,!1):a.render((d-a._startTime)*a._timeScale,b,!1);a=e}else for(a=this._last;a;){e=a._prev;
if(this._paused&&!F)break;else if(a._active||a._startTime<=c&&!a._paused&&!a._gc)a._reversed?a.render((!a._dirty?a._totalDuration:a.totalDuration())-(d-a._startTime)*a._timeScale,b,!1):a.render((d-a._startTime)*a._timeScale,b,!1);a=e}this._onUpdate&&(b||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||j));if(q&&!this._locked&&!this._gc&&(i===this._startTime||n!==this._timeScale))if(0===this._time||g>=this.totalDuration())x&&(this._timeline.autoRemoveChildren&&this._enabled(!1,
!1),this._active=!1),b||this.vars[q]&&this.vars[q].apply(this.vars[q+"Scope"]||this,this.vars[q+"Params"]||j)}};g.getActive=function(d,b,a){null==d&&(d=!0);null==b&&(b=!0);null==a&&(a=!1);var g=[],d=this.getChildren(d,b,a),b=0,a=d.length,c,e;for(c=0;c<a;c++)if(e=d[c],!e._paused&&e._timeline._time>=e._startTime&&e._timeline._time<e._startTime+e._totalDuration/e._timeScale){var i;a:{for(i=e._timeline;i;){if(i._paused){i=!0;break a}i=i._timeline}i=!1}i||(g[b++]=e)}return g};g.getLabelAfter=function(d){!d&&
0!==d&&(d=this._time);var b=this.getLabelsArray(),a=b.length,g;for(g=0;g<a;g++)if(b[g].time>d)return b[g].name;return null};g.getLabelBefore=function(d){null==d&&(d=this._time);for(var b=this.getLabelsArray(),a=b.length;-1<--a;)if(b[a].time<d)return b[a].name;return null};g.getLabelsArray=function(){var d=[],b=0,a;for(a in this._labels)d[b++]={time:this._labels[a],name:a};d.sort(function(a,b){return a.time-b.time});return d};g.progress=function(d){return!arguments.length?this._time/this.duration():
this.totalTime(this.duration()*(this._yoyo&&0!==(this._cycle&1)?1-d:d)+this._cycle*(this._duration+this._repeatDelay),!1)};g.totalProgress=function(d){return!arguments.length?this._totalTime/this.totalDuration():this.totalTime(this.totalDuration()*d,!1)};g.totalDuration=function(d){return!arguments.length?(this._dirty&&(p.prototype.totalDuration.call(this),this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration):-1===this._repeat?
this:this.duration((d-this._repeat*this._repeatDelay)/(this._repeat+1))};g.time=function(d,b){if(!arguments.length)return this._time;this._dirty&&this.totalDuration();d>this._duration&&(d=this._duration);this._yoyo&&0!==(this._cycle&1)?d=this._duration-d+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(d+=this._cycle*(this._duration+this._repeatDelay));return this.totalTime(d,b)};g.repeat=function(d){if(!arguments.length)return this._repeat;this._repeat=d;return this._uncache(!0)};
g.repeatDelay=function(d){if(!arguments.length)return this._repeatDelay;this._repeatDelay=d;return this._uncache(!0)};g.yoyo=function(d){if(!arguments.length)return this._yoyo;this._yoyo=d;return this};g.currentLabel=function(d){return!arguments.length?this.getLabelBefore(this._time+1E-8):this.seek(d,!0)};return n},!0);_gsDefine("plugins.BezierPlugin",["plugins.TweenPlugin"],function(p){var t=function(){p.call(this,"bezier",-1);this._overwriteProps.pop();this._func={};this._round={}},g=t.prototype=
new p("bezier",1),n=180/Math.PI,j=[],d=[],v=[],b={},a=function(a,b,c,d){this.a=a;this.b=b;this.c=c;this.d=d;this.da=d-a;this.ca=c-a;this.ba=b-a},E=t.bezierThrough=function(e,i,g,n,F,h){var x={},q=[],B,s,t,F="string"===typeof F?","+F+",":",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,";null==i&&(i=1);for(s in e[0])q.push(s);j.length=d.length=v.length=0;for(B=q.length;-1<--B;){s=q[B];
b[s]=-1!==F.indexOf(","+s+",");t=x;var I=s,D;D=e;var y=s,k=b[s],A=h,r=[],C=void 0,u=void 0,p=void 0,E=void 0,f=void 0,C=void 0;if(A){D=[A].concat(D);for(u=D.length;-1<--u;)if("string"===typeof(C=D[u][y]))"="===C.charAt(1)&&(D[u][y]=A[y]+Number(C.charAt(0)+C.substr(2)))}C=D.length-2;if(0>C)r[0]=new a(D[0][y],0,0,D[-1>C?0:1][y]);else{for(u=0;u<C;u++)p=D[u][y],E=D[u+1][y],r[u]=new a(p,0,0,E),k&&(f=D[u+2][y],j[u]=(j[u]||0)+(E-p)*(E-p),d[u]=(d[u]||0)+(f-E)*(f-E));r[u]=new a(D[u][y],0,0,D[u+1][y])}D=r;
t[I]=D}for(B=j.length;-1<--B;)j[B]=Math.sqrt(j[B]),d[B]=Math.sqrt(d[B]);if(!n){for(B=q.length;-1<--B;)if(b[s]){e=x[q[B]];t=e.length-1;for(F=0;F<t;F++)h=e[F+1].da/d[F]+e[F].da/j[F],v[F]=(v[F]||0)+h*h}for(B=v.length;-1<--B;)v[B]=Math.sqrt(v[B])}for(B=q.length;-1<--B;){s=q[B];e=x[s];F=i;h=g;t=n;s=b[s];I=e.length-1;D=0;for(var y=e[0].a,l=f=E=A=C=E=p=C=u=p=r=A=k=void 0,k=0;k<I;k++)u=e[D],A=u.a,r=u.d,p=e[D+1].d,s?(E=j[k],f=d[k],l=0.25*(f+E)*F/(t?0.5:v[k]||0.5),C=r-(r-A)*(t?0.5*F:l/E),p=r+(p-r)*(t?0.5*F:
l/f),E=r-(C+(p-C)*(3*E/(E+f)+0.5)/4)):(C=r-0.5*(r-A)*F,p=r+0.5*(p-r)*F,E=r-(C+p)/2),C+=E,p+=E,u.c=C,u.b=0!==k?y:y=u.a+0.6*(u.c-u.a),u.da=r-A,u.ca=C-A,u.ba=y-A,h?(A=c(A,y,C,r),e.splice(D,1,A[0],A[1],A[2],A[3]),D+=4):D++,y=p;u=e[D];u.b=y;u.c=y+0.4*(u.d-y);u.da=u.d-u.a;u.ca=u.c-u.a;u.ba=y-u.a;h&&(A=c(u.a,y,u.c,u.d),e.splice(D,1,A[0],A[1],A[2],A[3]))}return x},c=t.cubicToQuadratic=function(a,b,c,d){var g={a:a},h={},x={},q={c:d},n=(a+b)/2,s=(b+c)/2,c=(c+d)/2,b=(n+s)/2,s=(s+c)/2,j=(s-b)/8;g.b=n+(a-n)/4;
h.b=b+j;g.c=h.a=(g.b+h.b)/2;h.c=x.a=(b+s)/2;x.b=s-j;q.b=c+(d-c)/4;x.c=q.a=(x.b+q.b)/2;return[g,h,x,q]};t.quadraticToCubic=function(b,c,d){return new a(b,(2*c+b)/3,(2*c+d)/3,d)};g.constructor=t;t.API=2;t._cssRegister=function(){var a=window.com.greensock.plugins.CSSPlugin;if(a){var a=a._internals,b=a._parseToProxy,c=a._setPluginRatio,d=a._specialProps,g=a.CSSPropTween;a._registerComplexSpecialProp("bezier",null,function(a,e,q,n,s,j){e instanceof Array&&(e={values:e});var j=new t,q=e.values,p=q.length-
1,v=[],y={},k,A,r;if(0>p)return s;for(k=0;k<=p;k++)r=b(a,q[k],n,s,j,p!==k),v[k]=r.end;for(A in e)y[A]=e[A];y.values=v;s=new g(a,"bezier",0,0,r.pt,2);s.data=r;s.plugin=j;s.setRatio=c;0===y.autoRotate&&(y.autoRotate=!0);y.autoRotate&&!(y.autoRotate instanceof Array)&&(k=!0===y.autoRotate?0:Number(y.autoRotate)*_DEG2RAD,y.autoRotate=null!=r.end.left?[["left","top","rotation",k,!0]]:null!=r.end.x?[["x","y","rotation",k,!0]]:!1);y.autoRotate&&(n._transform||(s=d.rotation.parse(a,0,A,n,s,j,{})),r.autoRotate=
n._transform);j._onInitTween(r.proxy,y,n._tween);return s})}};g._onInitTween=function(b,c,d){this._target=b;c instanceof Array&&(c={values:c});this._props=[];this._timeRes=null==c.timeResolution?6:parseInt(c.timeResolution);var g=c.values||[],n={},h=g[0],d=c.autoRotate||d.vars.orientToBezier,x,q,j;this._autoRotate=d?d instanceof Array?d:[["x","y","rotation",!0===d?0:Number(d)||0]]:null;for(x in h)this._props.push(x);for(h=this._props.length;-1<--h;)x=this._props[h],this._overwriteProps.push(x),d=
this._func[x]="function"===typeof b[x],n[x]=!d?parseFloat(b[x]):b[x.indexOf("set")||"function"!==typeof b["get"+x.substr(3)]?x:"get"+x.substr(3)](),j||n[x]!==g[0][x]&&(j=n);if("cubic"!==c.type&&"quadratic"!==c.type&&"soft"!==c.type)n=E(g,isNaN(c.curviness)?1:c.curviness,!1,"thruBasic"===c.type,c.correlate,j);else{d=(d=c.type)||"soft";c={};j="cubic"===d?3:2;var d="soft"===d,h=[],s,t,p,v,y,k,A,r,C;d&&n&&(g=[n].concat(g));if(null==g||g.length<j+1)throw"invalid Bezier data";for(t in g[0])h.push(t);for(k=
h.length;-1<--k;){t=h[k];c[t]=y=[];C=0;r=g.length;for(A=0;A<r;A++)s=null==n?g[A][t]:"string"===typeof(p=g[A][t])&&"="===p.charAt(1)?n[t]+Number(p.charAt(0)+p.substr(2)):Number(p),d&&1<A&&A<r-1&&(y[C++]=(s+y[C-2])/2),y[C++]=s;r=C-j+1;for(A=C=0;A<r;A+=j)s=y[A],t=y[A+1],p=y[A+2],v=2===j?0:y[A+3],y[C++]=p=3===j?new a(s,t,p,v):new a(s,(2*t+s)/3,(2*t+p)/3,p);y.length=C}n=c}this._beziers=n;this._segCount=this._beziers[x].length;if(this._timeRes){h=this._beziers;x=this._timeRes;x=x>>0||6;n=[];t=[];g=p=0;
c=x-1;j=[];d=[];for(q in h){s=h[q];y=n;k=x;A=1/k;r=s.length;for(var u=void 0,P=void 0,L=v=C=P=void 0,f=u=void 0,l=void 0,l=L=void 0;-1<--r;){L=s[r];P=L.a;C=L.d-P;v=L.c-P;L=L.b-P;P=0;for(f=1;f<=k;f++)u=A*f,l=1-u,u=P-(P=(u*u*C+3*l*(u*v+l*L))*u),l=r*k+f-1,y[l]=(y[l]||0)+u*u}}h=n.length;for(q=0;q<h;q++)p+=Math.sqrt(n[q]),s=q%x,d[s]=p,s===c&&(g+=p,s=q/x>>0,j[s]=d,t[s]=g,p=0,d=[]);this._length=g;this._lengths=t;this._segments=j;this._l1=this._li=this._s1=this._si=0;this._l2=this._lengths[0];this._curSeg=
this._segments[0];this._s2=this._curSeg[0];this._prec=1/this._curSeg.length}if(d=this._autoRotate){d[0]instanceof Array||(this._autoRotate=d=[d]);for(h=d.length;-1<--h;)for(q=0;3>q;q++)x=d[h][q],this._func[x]="function"===typeof b[x]?b[x.indexOf("set")||"function"!==typeof b["get"+x.substr(3)]?x:"get"+x.substr(3)]:!1}return!0};g.setRatio=function(a){var c=this._segCount,b=this._func,d=this._target,g,h,j,q,p;if(this._timeRes){g=this._lengths;q=this._curSeg;a*=this._length;h=this._li;if(a>this._l2&&
h<c-1){for(c-=1;h<c&&(this._l2=g[++h])<=a;);this._l1=g[h-1];this._li=h;this._curSeg=q=this._segments[h];this._s2=q[this._s1=this._si=0]}else if(a<this._l1&&0<h){for(;0<h&&(this._l1=g[--h])>=a;);0===h&&a<this._l1?this._l1=0:h++;this._l2=g[h];this._li=h;this._curSeg=q=this._segments[h];this._s1=q[(this._si=q.length-1)-1]||0;this._s2=q[this._si]}g=h;a-=this._l1;h=this._si;if(a>this._s2&&h<q.length-1){for(c=q.length-1;h<c&&(this._s2=q[++h])<=a;);this._s1=q[h-1];this._si=h}else if(a<this._s1&&0<h){for(;0<
h&&(this._s1=q[--h])>=a;);0===h&&a<this._s1?this._s1=0:h++;this._s2=q[h];this._si=h}q=(h+(a-this._s1)/(this._s2-this._s1))*this._prec}else g=0>a?0:1<=a?c-1:c*a>>0,q=(a-g*(1/c))*c;c=1-q;for(h=this._props.length;-1<--h;)if(a=this._props[h],j=this._beziers[a][g],p=(q*q*j.da+3*c*(q*j.ca+c*j.ba))*q+j.a,this._round[a]&&(p=p+(0<p?0.5:-0.5)>>0),b[a])d[a](p);else d[a]=p;if(this._autoRotate){var c=this._autoRotate,s,t,v,E,y;for(h=c.length;-1<--h;)a=c[h][2],E=c[h][3]||0,y=!0===c[h][4]?1:n,j=this._beziers[c[h][0]][g],
p=this._beziers[c[h][1]][g],s=j.a+(j.b-j.a)*q,t=j.b+(j.c-j.b)*q,s+=(t-s)*q,t+=(j.c+(j.d-j.c)*q-t)*q,j=p.a+(p.b-p.a)*q,v=p.b+(p.c-p.b)*q,j+=(v-j)*q,v+=(p.c+(p.d-p.c)*q-v)*q,p=Math.atan2(v-j,t-s)*y+E,b[a]?b[a].call(d,p):d[a]=p}};g._roundProps=function(a,c){for(var b=this._overwriteProps,d=b.length;-1<--d;)if(a[b[d]]||a.bezier||a.bezierThrough)this._round[b[d]]=c};g._kill=function(a){var c=this._props,b,d;for(b in this._beziers)if(b in a){delete this._beziers[b];delete this._func[b];for(d=c.length;-1<
--d;)c[d]===b&&c.splice(d,1)}return p.prototype._kill.call(this,a)};p.activate([t]);return t},!0);_gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(p){var t=function(){p.call(this,"css");this._overwriteProps.length=0},g,n,j,d,v={},b=t.prototype=new p("css");b.constructor=t;t.version=1.648;t.API=2;t.defaultTransformPerspective=0;b="px";t.suffixMap={top:b,right:b,bottom:b,left:b,width:b,height:b,fontSize:b,padding:b,margin:b,perspective:b};var a=/(?:\d|\-\d|\.\d|\-\.\d)+/g,
E=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,c=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,e=/[^\d\-\.]/g,i=/(?:\d|\-|\+|=|#|\.)*/g,H=/opacity *= *([^)]*)/,X=/opacity:([^;]*)/,F=/([A-Z])/g,h=/-([a-z])/gi,x=function(a,$){return $.toUpperCase()},q=/(?:Left|Right|Width)/i,B=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,s=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,O=Math.PI/180,I=180/Math.PI,D={},y=document,k=y.createElement("div"),A=t._internals={_specialProps:v},r=navigator.userAgent,
C,u,P,L,f,l,m=r.indexOf("Android"),G=y.createElement("div");L=(P=-1!==r.indexOf("Safari")&&-1===r.indexOf("Chrome")&&(-1===m||3<Number(r.substr(m+8,1))))&&6>Number(r.substr(r.indexOf("Version/")+8,1));/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(r);f=parseFloat(RegExp.$1);G.innerHTML="<a style='top:1px;opacity:.55;'>a</a>";l=(r=G.getElementsByTagName("a")[0])?/^0.55/.test(r.style.opacity):!1;var w=function(a){return H.test("string"===typeof a?a:(a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/
100:1},J="",ea="",S=function(a,$){var $=$||k,f=$.style,c,b;if(void 0!==f[a])return a;a=a.charAt(0).toUpperCase()+a.substr(1);c=["O","Moz","ms","Ms","Webkit"];for(b=5;-1<--b&&void 0===f[c[b]+a];);return 0<=b?(ea=3===b?"ms":c[b],J="-"+ea.toLowerCase()+"-",ea+a):null},ba=y.defaultView?y.defaultView.getComputedStyle:function(){},M=t.getStyle=function(a,f,c,b,d){var m;if(!l&&"opacity"===f)return w(a);!b&&a.style[f]?m=a.style[f]:(c=c||ba(a,null))?m=(a=c.getPropertyValue(f.replace(F,"-$1").toLowerCase()))||
c.length?a:c[f]:a.currentStyle&&(c=a.currentStyle,m=c[f],!m&&"backgroundPosition"===f&&(m=c[f+"X"]+" "+c[f+"Y"]));return null!=d&&(!m||"none"===m||"auto"===m||"auto auto"===m)?d:m},ca=function(a,f,c){var b={},d=a._gsOverwrittenClassNamePT,m;if(d&&!c){for(;d;)d.setRatio(0),d=d._next;a._gsOverwrittenClassNamePT=null}if(f=f||ba(a,null))if(m=f.length)for(;-1<--m;)b[f[m].replace(h,x)]=f.getPropertyValue(f[m]);else for(m in f)b[m]=f[m];else if(f=a.currentStyle||a.style)for(m in f)b[m.replace(h,x)]=f[m];
l||(b.opacity=w(a));a=fa(a,f,!1);b.rotation=a.rotation*I;b.rotationX=a.rotationX*I;b.rotationY=a.rotationY*I;b.skewX=a.skewX*I;b.scaleX=a.scaleX;b.scaleY=a.scaleY;b.scaleZ=a.scaleZ;b.x=a.x;b.y=a.y;b.z=a.z;b.filters&&delete b.filters;return b},ka=function(a,f,c,b){var d={},a=a.style,m,z,l;for(z in c)if("cssText"!==z&&"length"!==z&&isNaN(z)&&f[z]!==(m=c[z]))if(-1===z.indexOf("Origin")&&("number"===typeof m||"string"===typeof m))d[z]=(""===m||"auto"===m||"none"===m)&&"string"===typeof f[z]&&""!==f[z].replace(e,
"")?0:m,void 0!==a[z]&&(l=new ga(a,z,a[z],l));if(b)for(z in b)"className"!==z&&(d[z]=b[z]);return{difs:d,firstMPT:l}},qa={width:["Left","Right"],height:["Top","Bottom"]},ra=["marginLeft","marginRight","marginTop","marginBottom"],T=function(a,f,c,b,d){if("px"===b||!b)return c;if("auto"===b||!c)return 0;var m=q.test(f),z=a,l=k.style,e=0>c;e&&(c=-c);"%"===b&&-1!==f.indexOf("border")?m=c/100*(m?a.clientWidth:a.clientHeight):(l.cssText="border-style:solid; border-width:0; position:absolute; line-height:0;",
"%"===b||"em"===b||!z.appendChild?(z=a.parentNode||y.body,l[m?"width":"height"]=c+b):l[m?"borderLeftWidth":"borderTopWidth"]=c+b,z.appendChild(k),m=parseFloat(k[m?"offsetWidth":"offsetHeight"]),z.removeChild(k),0===m&&!d&&(m=T(a,f,c,b,!0)));return e?-m:m},ha=function(a,f){if(null==a||""===a||"auto"===a||"auto auto"===a)a="0 0";var c=a.split(" "),b=-1!==a.indexOf("left")?"0%":-1!==a.indexOf("right")?"100%":c[0],d=-1!==a.indexOf("top")?"0%":-1!==a.indexOf("bottom")?"100%":c[1];null==d?d="0":"center"===
d&&(d="50%");if("center"===b||isNaN(parseFloat(b)))b="50%";f&&(f.oxp=-1!==b.indexOf("%"),f.oyp=-1!==d.indexOf("%"),f.oxr="="===b.charAt(1),f.oyr="="===d.charAt(1),f.ox=parseFloat(b.replace(e,"")),f.oy=parseFloat(d.replace(e,"")));return b+" "+d+(2<c.length?" "+c[2]:"")},la=function(a,f){return"string"===typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1")*parseFloat(a.substr(2)):parseFloat(a)-parseFloat(f)},U=function(a,f){return null==a?f:"string"===typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+
"1")*Number(a.substr(2))+f:Number(a)},Y=function(a,f){if(null==a)return f;var c=-1===a.indexOf("rad")?O:1,b="="===a.charAt(1),a=Number(a.replace(e,""))*c;return b?a+f:a},ia=function(a,f){var c=(("number"===typeof a?a*O:Y(a,f))-f)%(2*Math.PI);c!==c%Math.PI&&(c+=Math.PI*(0>c?2:-2));return f+c},Z={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,
0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},ja=function(f){if(!f||""===f)return Z.black;if(Z[f])return Z[f];if("number"===typeof f)return[f>>16,f>>8&255,f&255];if("#"===f.charAt(0)){if(4===f.length)var c=f.charAt(1),b=f.charAt(2),f=f.charAt(3),f="#"+c+c+b+b+f+f;f=parseInt(f.substr(1),16);return[f>>16,f>>8&255,f&255]}f=f.match(a)||Z.transparent;f[0]=Number(f[0]);f[1]=Number(f[1]);f[2]=Number(f[2]);
3<f.length&&(f[3]=Number(f[3]));return f},V="(?:\\b(?:(?:rgb|rgba)\\(.+?\\))|\\B#.+?\\b";for(b in Z)V+="|"+b+"\\b";var V=RegExp(V+")","gi"),ma=function(f,b,d){if(null==f)return function(a){return a};var m=b?(f.match(V)||[""])[0]:"",l=f.split(m).join("").match(c)||[],k=f.substr(0,f.indexOf(l[0])),z=")"===f.charAt(f.length-1)?")":"",e=-1!==f.indexOf(" ")?" ":",",g=l.length,aa=0<g?l[0].replace(a,""):"";return b?function(a){"number"===typeof a&&(a+=aa);var f=(a.match(V)||[m])[0],a=a.split(f).join("").match(c)||
[],b=a.length;if(g>b--)for(;++b<g;)a[b]=d?a[(b-1)/2>>0]:l[b];return k+a.join(e)+e+f+z}:function(a){"number"===typeof a&&(a+=aa);var a=a.match(c)||[],f=a.length;if(g>f--)for(;++f<g;)a[f]=d?a[(f-1)/2>>0]:l[f];return k+a.join(e)+z}},r=function(a){a=a.split(",");return function(f,c,b,d,m,l,k){c=(c+"").split(" ");k={};for(b=0;4>b;b++)k[a[b]]=c[b]=c[b]||c[(b-1)/2>>0];return d.parse(f,k,m,l)}};A._setPluginRatio=function(a){this.plugin.setRatio(a);for(var f=this.data,c=f.proxy,b=f.firstMPT,d;b;)d=c[b.v],
b.r?d=0<d?d+0.5>>0:d-0.5>>0:1E-6>d&&-1E-6<d&&(d=0),b.t[b.p]=d,b=b._next;f.autoRotate&&(f.autoRotate.rotation=c.rotation);if(1===a)for(b=f.firstMPT;b;){a=b.t;if(a.type){if(1===a.type){c=a.xs0+a.s+a.xs1;for(f=1;f<a.l;f++)c+=a["xn"+f]+a["xs"+(f+1)];a.e=c}}else a.e=a.s+a.xs0;b=b._next}};var ga=function(a,f,b,c,d){this.t=a;this.p=f;this.v=b;this.r=d;c&&(c._prev=this,this._next=c)};A._parseToProxy=function(a,f,b,c,d,m){var l=c,k={},e={},g=b._transform,i=D,j;b._transform=null;D=f;c=a=b.parse(a,f,c,d);D=
i;m&&(b._transform=g,l&&(l._prev=null,l._prev&&(l._prev._next=null)));for(;c&&c!==l;){if(1>=c.type&&(g=c.p,e[g]=c.s+c.c,k[g]=c.s,m||(j=new ga(c,"s",g,j,c.r),c.c=0),1===c.type))for(b=c.l;0<--b;)i="xn"+b,g=c.p+"_"+i,e[g]=c.data[i],k[g]=c[i],m||(j=new ga(c,i,g,j,c.rxp[i]));c=c._next}return{proxy:k,end:e,firstMPT:j,pt:a}};var N=A.CSSPropTween=function(a,f,c,b,m,l,k,e,i,aa,j){this.t=a;this.p=f;this.s=c;this.c=b;this.n=k||"css_"+f;a instanceof N||d.push(this.n);this.r=e;this.type=l||0;i&&(this.pr=i,g=!0);
this.b=void 0===aa?c:aa;this.e=void 0===j?c+b:j;m&&(this._next=m,m._prev=this)},da=t.parseComplex=function(f,c,b,d,m,k,z,e,g,i){var z=new N(f,c,0,0,z,i?2:1,null,!1,e,b,d),f=b.split(", ").join(",").split(" "),c=(d+"").split(", ").join(",").split(" "),b=f.length,e=!1!==C,j,h,n,G,p;b!==c.length&&(f=(k||"").split(" "),b=f.length);z.plugin=g;z.setRatio=i;for(k=0;k<b;k++)if(g=f[k],j=c[k],(i=parseFloat(g))||0===i)z.appendXtra("",i,la(j,i),j.replace(E,""),e&&-1!==j.indexOf("px"),!0);else if(m&&("#"===g.charAt(0)||
0===g.indexOf("rgb")||Z[g]))g=ja(g),j=ja(j),(i=6<g.length+j.length)&&!l&&0===j[3]?(z["xs"+z.l]+=z.l?" transparent":"transparent",z.e=z.e.split(c[k]).join("transparent")):(z.appendXtra(i?"rgba(":"rgb(",g[0],j[0]-g[0],",",!0,!0).appendXtra("",g[1],j[1]-g[1],",",!0).appendXtra("",g[2],j[2]-g[2],i?",":")",!0),i&&(g=4>g.length?1:g[3],z.appendXtra("",g,(4>j.length?1:j[3])-g,")",!1)));else if(i=g.match(a)){n=j.match(E);if(!n||n.length!==i.length)return z;for(j=h=0;j<i.length;j++)p=i[j],G=g.indexOf(p,h),
z.appendXtra(g.substr(h,G-h),Number(p),la(n[j],p),"",e&&"px"===g.substr(G+p.length,2),0===j),h=G+p.length;z["xs"+z.l]+=g.substr(h)}else z["xs"+z.l]+=z.l?" "+g:g;if(-1!==d.indexOf("=")&&z.data){d=z.xs0+z.data.s;for(k=1;k<z.l;k++)d+=z["xs"+k]+z.data["xn"+k];z.e=d+z["xs"+k]}z.l||(z.type=-1,z.xs0=z.e);return z.xfirst||z},Q=9,b=N.prototype;for(b.l=b.pr=0;0<--Q;)b["xn"+Q]=0,b["xs"+Q]="";b.xs0="";b._next=b._prev=b.xfirst=b.data=b.plugin=b.setRatio=b.rxp=null;b.appendXtra=function(a,f,c,b,d,m){var l=this.l;
this["xs"+l]+=m&&l?" "+a:a||"";if(!c&&0!==l&&!this.plugin)return this["xs"+l]+=f+(b||""),this;this.l++;this.type=this.setRatio?2:1;this["xs"+this.l]=b||"";if(0<l)return this.data["xn"+l]=f+c,this.rxp["xn"+l]=d,this["xn"+l]=f,this.plugin||(this.xfirst=new N(this,"xn"+l,f,c,this.xfirst||this,0,this.n,d,this.pr),this.xfirst.xs0=0),this;this.data={s:f+c};this.rxp={};this.s=f;this.c=c;this.r=d;return this};var na=function(a,f,c,b,d,m,l){this.p=b?S(a)||a:a;v[a]=v[this.p]=this;this.format=m||ma(f,d);c&&
(this.parse=c);this.clrs=d;this.dflt=f;this.pr=l||0},K=A._registerComplexSpecialProp=function(a,f,c,b,d,m,l){for(var a=a.split(","),f=f instanceof Array?f:[f],k=a.length;-1<--k;)new na(a[k],f[k],c,b&&0===k,d,m,l)},A=function(a,f){v[a]||K(a,null,function(a,c,b,d,m,l,k){var e=window.com.greensock.plugins[f];if(!e)return window.console&&console.log("Error: "+f+" js file not loaded."),m;e._cssRegister();return v[b].parse(a,c,b,d,m,l,k)})},b=na.prototype;b.parseComplex=function(a,f,c,b,d,m){return da(a,
this.p,f,c,this.clrs,this.dflt,b,this.pr,d,m)};b.parse=function(a,f,c,b,d,m){return this.parseComplex(a.style,this.format(M(a,c,j,!1,this.dflt)),this.format(f),d,m)};t.registerSpecialProp=function(a,f,c){K(a,null,function(a,b,d,m,l,k){l=new N(a,d,0,0,l,2,d,!1,c);l.plugin=k;l.setRatio=f(a,b,m._tween,d);return l},!1,!1,null,c)};var oa="scaleX scaleY scaleZ x y z skewX rotation rotationX rotationY perspective".split(" "),R=S("transform"),sa=J+"transform",pa=S("transformOrigin"),W=null!==S("perspective"),
fa=function(a,f,c){var b=c?a._gsTransform||{skewY:0}:{skewY:0},d=0>b.scaleX,m=W?parseFloat(M(a,pa,f,!1,"0 0 0").split(" ")[2])||b.zOrigin||0:0,l,k,e,g,i,j,h,n;R?l=M(a,sa,f,!0):a.currentStyle&&(l=(l=a.currentStyle.filter.match(B))&&4===l.length?l[0].substr(4)+","+Number(l[2].substr(4))+","+Number(l[1].substr(4))+","+l[3].substr(4)+","+(b?b.x:0)+","+(b?b.y:0):null);k=(l||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[];for(f=k.length;-1<--f;)k[f]=Number(k[f]);if(16===k.length){if(d=k[8],l=k[9],e=k[10],g=k[12],
i=k[13],j=k[14],b.zOrigin&&(j=-b.zOrigin,g=d*j-k[12],i=l*j-k[13],j=e*j+b.zOrigin-k[14]),!c||g!==b.x||i!==b.y||j!==b.z){h=k[0];n=k[1];var G=k[2],p=k[3],q=k[4],s=k[5],w=k[6],A=k[7];k=k[11];var J=b.rotationX=Math.atan2(w,e),v,S,r,u;J&&(r=Math.cos(-J),u=Math.sin(-J),J=q*r+d*u,v=s*r+l*u,S=w*r+e*u,d=q*-u+d*r,l=s*-u+l*r,e=w*-u+e*r,k=A*-u+k*r,q=J,s=v,w=S);if(J=b.rotationY=Math.atan2(d,h))r=Math.cos(-J),u=Math.sin(-J),v=n*r-l*u,S=G*r-e*u,l=n*u+l*r,e=G*u+e*r,k=p*u+k*r,h=h*r-d*u,n=v,G=S;if(J=b.rotation=Math.atan2(n,
s))r=Math.cos(-J),u=Math.sin(-J),h=h*r+q*u,v=n*r+s*u,s=n*-u+s*r,w=G*-u+w*r,n=v;Math.abs(b.rotationY)>Math.PI/2&&(b.rotationY*=-1,b.rotationX+=Math.PI,b.rotation=Math.PI-b.rotation);b.scaleX=Math.sqrt(h*h+n*n);b.scaleY=Math.sqrt(s*s+l*l);b.scaleZ=Math.sqrt(w*w+e*e);b.skewX=0;b.perspective=k?1/k:0;b.x=g;b.y=i;b.z=j}}else if(!W||0===k.length||b.x!==k[4]||b.y!==k[5]||!b.rotationX&&!b.rotationY){g=(l=6<=k.length)?k[0]:1;j=k[1]||0;i=k[2]||0;h=l?k[3]:1;b.x=k[4]||0;b.y=k[5]||0;l=Math.sqrt(g*g+j*j);e=Math.sqrt(h*
h+i*i);g=g||j?Math.atan2(j,g):b.rotation||0;i=i||h?Math.atan2(i,h)+g:b.skewX||0;j=l-Math.abs(b.scaleX||0);h=e-Math.abs(b.scaleY||0);Math.abs(i)>Math.PI/2&&Math.abs(i)<1.5*Math.PI&&(d?(l*=-1,i+=0>=g?Math.PI:-Math.PI,g+=0>=g?Math.PI:-Math.PI):(e*=-1,i+=0>=i?Math.PI:-Math.PI));d=(g-b.rotation)%Math.PI;n=(i-b.skewX)%Math.PI;if(void 0===b.skewX||1E-6<j||-1E-6>j||1E-6<h||-1E-6>h||1E-6<d||-1E-6>d||1E-6<n||-1E-6>n)b.scaleX=l,b.scaleY=e,b.rotation=g,b.skewX=i;W&&(b.rotationX=b.rotationY=b.z=0,b.perspective=
parseFloat(t.defaultTransformPerspective)||0,b.scaleZ=1)}b.zOrigin=m;for(f in b)1E-6>b[f]&&-1E-6<b[f]&&(b[f]=0);c&&(a._gsTransform=b);return b},ta=function(a){var b=this.data,c=-b.rotation,d=c+b.skewX,l=Math.cos(c)*b.scaleX,c=Math.sin(c)*b.scaleX,m=Math.sin(d)*-b.scaleY,d=Math.cos(d)*b.scaleY,k=1E-6,e=this.t.style,g=this.t.currentStyle,j;if(g){l<k&&l>-k&&(l=0);c<k&&c>-k&&(c=0);m<k&&m>-k&&(m=0);d<k&&d>-k&&(d=0);k=c;c=-m;m=-k;k=g.filter;e.filter="";var h=this.t.offsetWidth;j=this.t.offsetHeight;var n=
"absolute"!==g.position,G="progid:DXImageTransform.Microsoft.Matrix(M11="+l+", M12="+c+", M21="+m+", M22="+d,p=b.x,q=b.y,w,r;null!=b.ox&&(w=(b.oxp?0.01*h*b.ox:b.ox)-h/2,r=(b.oyp?0.01*j*b.oy:b.oy)-j/2,p+=w-(w*l+r*c),q+=r-(w*m+r*d));if(n)w=h/2,r=j/2,G+=", Dx="+(w-(w*l+r*c)+p)+", Dy="+(r-(w*m+r*d)+q)+")";else{var u=8>f?1:-1;w=b.ieOffsetX||0;r=b.ieOffsetY||0;b.ieOffsetX=Math.round((h-((0>l?-l:l)*h+(0>c?-c:c)*j))/2+p);b.ieOffsetY=Math.round((j-((0>d?-d:d)*j+(0>m?-m:m)*h))/2+q);for(Q=0;4>Q;Q++)h=ra[Q],
j=g[h],j=-1!==j.indexOf("px")?parseFloat(j):T(this.t,h,parseFloat(j),j.replace(i,""))||0,p=j!==b[h]?2>Q?-b.ieOffsetX:-b.ieOffsetY:2>Q?w-b.ieOffsetX:r-b.ieOffsetY,e[h]=(b[h]=Math.round(j-p*(0===Q||2===Q?1:u)))+"px";G+=", sizingMethod='auto expand')"}e.filter=-1!==k.indexOf("DXImageTransform.Microsoft.Matrix(")?k.replace(s,G):G+" "+k;if(0===a||1===a)if(1===l&&0===c&&0===m&&1===d&&(!n||-1!==G.indexOf("Dx=0, Dy=0")))(!H.test(k)||100===parseFloat(RegExp.$1))&&-1===k.indexOf("gradient(")&&e.removeAttribute("filter")}},
ua=function(){var a=this.data,f=a.perspective,b=a.scaleX,c=0,d=0,k=0,l=0,m=a.scaleY,e=0,g=0,j=0,i=0,h=a.scaleZ,n=0,G=0,p=0,q=f?-1/f:0,w=a.rotation,s=a.zOrigin,r,u,t,J,v;w&&(r=Math.cos(w),w=Math.sin(w),t=m*w,c=b*-w,m*=r,b*=r,l=t);if(w=a.rotationY)r=Math.cos(w),w=Math.sin(w),J=h*-w,v=q*-w,d=b*w,e=l*w,h*=r,q*=r,b*=r,l*=r,j=J,G=v;if(w=a.rotationX)r=Math.cos(w),w=Math.sin(w),u=c*r+d*w,t=m*r+e*w,J=i*r+h*w,v=p*r+q*w,d=c*-w+d*r,e=m*-w+e*r,h=i*-w+h*r,q=p*-w+q*r,c=u,m=t,i=J,p=v;s&&(n-=s,k=d*n,g=e*n,n=h*n+s);
k+=a.x;g+=a.y;n+=a.z;1E-6>n&&-1E-6<n&&(n=0);this.t.style[R]="matrix3d("+(1E-6>b&&-1E-6<b?0:b)+","+(1E-6>l&&-1E-6<l?0:l)+","+(1E-6>j&&-1E-6<j?0:j)+","+(1E-6>G&&-1E-6<G?0:G)+","+(1E-6>c&&-1E-6<c?0:c)+","+(1E-6>m&&-1E-6<m?0:m)+","+(1E-6>i&&-1E-6<i?0:i)+","+(1E-6>p&&-1E-6<p?0:p)+","+(1E-6>d&&-1E-6<d?0:d)+","+(1E-6>e&&-1E-6<e?0:e)+","+(1E-6>h&&-1E-6<h?0:h)+","+(1E-6>q&&-1E-6<q?0:q)+","+(1E-6>k&&-1E-6<k?0:k)+","+(1E-6>g&&-1E-6<g?0:g)+","+n+","+(f?1+-n/f:1)+")"},va=function(){var a=this.data;if(!a.rotation&&
!a.skewX)this.t.style[R]="matrix("+a.scaleX+",0,0,"+a.scaleY+","+a.x+","+a.y+")";else{var f=a.rotation,b=f-a.skewX,c=Math.cos(f)*a.scaleX,f=Math.sin(f)*a.scaleX,d=Math.sin(b)*-a.scaleY,b=Math.cos(b)*a.scaleY;this.t.style[R]="matrix("+(1E-6>c&&-1E-6<c?0:c)+","+(1E-6>f&&-1E-6<f?0:f)+","+(1E-6>d&&-1E-6<d?0:d)+","+(1E-6>b&&-1E-6<b?0:b)+","+a.x+","+a.y+")"}};K("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective",
null,function(a,f,b,c,m,k,l){if(c._transform)return m;var f=c._transform=fa(a,j,!0),e=a.style,g=oa.length,i,h,n,w;if("string"===typeof l.transform&&R)h=e[R],e[R]=l.transform,i=fa(a,null,!1),e[R]=h;else if("object"===typeof l){h=null!=l.rotation?l.rotation:null!=l.rotationZ?l.rotationZ:f.rotation*I;i={scaleX:U(null!=l.scaleX?l.scaleX:l.scale,f.scaleX),scaleY:U(null!=l.scaleY?l.scaleY:l.scale,f.scaleY),scaleZ:U(null!=l.scaleZ?l.scaleZ:l.scale,f.scaleZ),x:U(l.x,f.x),y:U(l.y,f.y),z:U(l.z,f.z),perspective:U(l.transformPerspective,
f.perspective)};i.rotation=null!=l.shortRotation||null!=l.shortRotationZ?ia(l.shortRotation||l.shortRotationZ||0,f.rotation):"number"===typeof h?h*O:Y(h,f.rotation);W&&(i.rotationX=null!=l.shortRotationX?ia(l.shortRotationX,f.rotationX):"number"===typeof l.rotationX?l.rotationX*O:Y(l.rotationX,f.rotationX),i.rotationY=null!=l.shortRotationY?ia(l.shortRotationY,f.rotationY):"number"===typeof l.rotationY?l.rotationY*O:Y(l.rotationY,f.rotationY),1E-6>i.rotationX&&-1E-6<i.rotationX&&(i.rotationX=0),1E-6>
i.rotationY&&-1E-6<i.rotationY&&(i.rotationY=0));i.skewX=null==l.skewX?f.skewX:"number"===typeof l.skewX?l.skewX*O:Y(l.skewX,f.skewX);i.skewY=null==l.skewY?f.skewY:"number"===typeof l.skewY?l.skewY*O:Y(l.skewY,f.skewY);if(h=i.skewY-f.skewY)i.skewX+=h,i.rotation+=h;1E-6>i.skewY&&-1E-6<i.skewY&&(i.skewY=0);1E-6>i.skewX&&-1E-6<i.skewX&&(i.skewX=0);1E-6>i.rotation&&-1E-6<i.rotation&&(i.rotation=0)}w=f.z||f.rotationX||f.rotationY||i.z||i.rotationX||i.rotationY;!w&&null!=i.scale&&(i.scaleZ=1);if(R){if(P){u=
!0;if(""===e.zIndex&&(h=M(a,"zIndex",j),"auto"===h||""===h))e.zIndex=0;L&&(e.WebkitBackfaceVisibility=l.WebkitBackfaceVisibility||(w?"visible":"hidden"))}}else e.zoom=1;m=new N(a,"transform",0,0,m,2);m.setRatio=w&&W?ua:R?va:ta;m.plugin=k;m.data=f;for(d.pop();-1<--g;)if(b=oa[g],n=i[b]-f[b],1E-6<n||-1E-6>n||null!=D[b])m=new N(f,b,f[b],n,m),m.xs0=0,m.plugin=k,c._overwriteProps.push(m.n);if((n=l.transformOrigin)||W&&w&&f.zOrigin)R?(n=(n||M(a,b,j,!1,"50% 50%"))+"",b=pa,m=new N(e,b,0,0,m,-1,"css_transformOrigin"),
m.b=e[b],m.plugin=k,W?(h=f.zOrigin,n=n.split(" "),f.zOrigin=(2<n.length?parseFloat(n[2]):h)||0,m.xs0=m.e=e[b]=n[0]+" "+(n[1]||"50%")+" 0px",m=new N(f,"zOrigin",0,0,m,-1,m.n),m.b=h,m.xs0=m.e=f.zOrigin):m.xs0=m.e=e[b]=n):ha(n+"",f);return m.t===a?(m._next&&(m._next._prev=null),m._next):m},!0);K("boxShadow","0px 0px 0px 0px #999",null,!0,!0);K("borderRadius","0px",function(a,f,b,c,d){var f=this.format(f),c=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],
l=a.style,m,k,e,g,i,h,w,G,p,r,q,s;G=parseFloat(a.offsetWidth);p=parseFloat(a.offsetHeight);f=f.split(" ");for(m=0;m<c.length;m++)this.p.indexOf("border")&&(c[m]=S(c[m])),g=e=M(a,c[m],j,!1,"0px"),i=k=f[m],h=parseFloat(g),q=g.substr((h+"").length),(s="="===i.charAt(1))?(w=parseInt(i.charAt(0)+"1"),i=i.substr(2),w*=parseFloat(i),r=i.substr((w+"").length-(0>w?1:0))||""):(w=parseFloat(i),r=i.substr((w+"").length)),""===r&&(r=n[b]||q),r!==q&&(g=T(a,"borderLeft",h,q),h=T(a,"borderTop",h,q),"%"===r?(g=100*
(g/G)+"%",e=100*(h/p)+"%"):"em"===r?(q=T(a,"borderLeft",1,"em"),g=g/q+"em",e=h/q+"em"):(g+="px",e=h+"px"),s&&(i=parseFloat(g)+w+r,k=parseFloat(e)+w+r)),d=da(l,c[m],g+" "+e,i+" "+k,!1,"0px",d);return d},!0,!1,ma("0px 0px 0px 0px",!1,!0));K("backgroundPosition","0 0",null,!1,!1,ha);K("backgroundSize","0 0",null,!1,!1,ha);K("perspective","0px",null,!0);K("perspectiveOrigin","50% 50%",null,!0);K("transformStyle","preserve-3d",null,!0);K("margin",null,r("marginTop,marginRight,marginBottom,marginLeft"));
K("padding",null,r("paddingTop,paddingRight,paddingBottom,paddingLeft"));K("clip","rect(0px,0px,0px,0px)");K("textShadow","0px 0px 0px #999",null,!1,!0);K("autoRound",null,function(a,f,b,c,d){return d});K("border","0px solid #000",function(a,f,b,c,d,l){return this.parseComplex(a.style,this.format(M(a,"borderTopWidth",j,!1,"0px")+" "+M(a,"borderTopStyle",j,!1,"solid")+" "+M(a,"borderTopColor",j,!1,"#000")),this.format(f),d,l)},!1,!0,function(a){var f=a.split(" ");return f[0]+" "+(f[1]||"solid")+" "+
(a.match(V)||["#000"])[0]});var wa=function(a){var f=this.t,a=this.s+this.c*a,b;100===a&&(f.removeAttribute("filter"),b=!M(this.data,"filter"));b||(this.xn1&&(f.filter=f.filter||"alpha(opacity=100)"),f.filter=-1===f.filter.indexOf("opacity")?f.filter+(" alpha(opacity="+(a>>0)+")"):f.filter.replace(H,"opacity="+(a>>0)))};K("opacity,alpha,autoAlpha","1",function(a,f,b,c,d,m){var k=parseFloat(M(a,"opacity",j,!1,"1")),f=parseFloat(f),e=a.style,g;"autoAlpha"===b&&(g=M(a,"visibility",j),1===k&&"hidden"===
g&&(k=0),d=new N(e,"visibility",0,0,d,-1,null,!1,0,0!==k?"visible":"hidden",0===f?"hidden":"visible"),d.xs0="visible",c._overwriteProps.push(d.n));l?d=new N(e,"opacity",k,f-k,d):(d=new N(e,"opacity",100*k,100*(f-k),d),d.xn1="autoAlpha"===b?1:0,e.zoom=1,d.type=2,d.b="alpha(opacity="+d.s+")",d.e="alpha(opacity="+(d.s+d.c)+")",d.data=a,d.plugin=m,d.setRatio=wa);return d});var xa=function(a){if(1===a||0===a){this.t.className=1===a?this.e:this.b;for(var a=this.data,f=this.t.style,b=f.removeProperty?"removeProperty":
"removeAttribute";a;){if(a.v)f[a.p]=a.v;else f[b](a.p.replace(F,"-$1").toLowerCase());a=a._next}}else this.t.className!==this.b&&(this.t.className=this.b)};K("className",null,function(a,f,b,c,d,l,m){var k=a.className,e=a.style.cssText,d=c._classNamePT=new N(a,b,0,0,d,2);d.setRatio=xa;d.b=k;d.e="="!==f.charAt(1)?f:"+"===f.charAt(0)?k+" "+f.substr(2):k.split(f.substr(2)).join("");c._tween._duration&&(f=ca(a,j,!0),a.className=d.e,m=ka(a,f,ca(a),m),a.className=k,d.data=m.firstMPT,a.style.cssText=e,d=
d.xfirst=c.parse(a,m.difs,d,l));return d});A("bezier","BezierPlugin");A("throwProps","ThrowPropsPlugin");b=t.prototype;b._firstPT=null;b._onInitTween=function(a,f,b){if(!a.nodeType)return!1;this._target=a;this._tween=b;C=f.autoRound;g=!1;n=f.suffixMap||t.suffixMap;j=ba(a,"");d=this._overwriteProps;var b=a.style,c,m,k;if(u&&""===b.zIndex&&(c=M(a,"zIndex",j),"auto"===c||""===c))b.zIndex=0;"string"===typeof f&&(m=b.cssText,c=ca(a,j),b.cssText=m+";"+f,c=ka(a,c,ca(a)).difs,!l&&X.test(f)&&(c.opacity=parseFloat(RegExp.$1)),
f=c,b.cssText=m);this._firstPT=a=this.parse(a,f,null);if(g){for(;a;){b=a._next;for(f=m;f&&f.pr>a.pr;)f=f._next;(a._prev=f?f._prev:k)?a._prev._next=a:m=a;(a._next=f)?f._prev=a:k=a;a=b}this._firstPT=m}return!0};b.parse=function(a,f,b,c){var d=a.style,m,l,k,e,g,i,h,w;for(m in f){g=f[m];if(l=v[m])b=l.parse(a,g,m,this,b,c,f);else if(l=M(a,m,j)+"",h="string"===typeof g,"color"===m||"fill"===m||"stroke"===m||-1!==m.indexOf("Color")||h&&!g.indexOf("rgb"))h||(g=ja(g),g=(3<g.length?"rgba(":"rgb(")+g.join(",")+
")"),b=da(d,m,l,g,!0,"transparent",b,0,c);else if(h&&(-1!==g.indexOf(" ")||-1!==g.indexOf(",")))b=da(d,m,l,g,!0,null,b,0,c);else{k=parseFloat(l);i=l.substr((k+"").length);if(""===l||"auto"===l)if("width"===m||"height"===m){k=a;w=m;e=j;i=parseFloat("width"===w?k.offsetWidth:k.offsetHeight);w=qa[w];var G=w.length;for(e=e||ba(k,null);-1<--G;)i-=parseFloat(M(k,"padding"+w[G],e,!0))||0,i-=parseFloat(M(k,"border"+w[G]+"Width",e,!0))||0;k=i;i="px"}else k="opacity"!==m?0:1,i="";(w=h&&"="===g.charAt(1))?(e=
parseInt(g.charAt(0)+"1"),g=g.substr(2),e*=parseFloat(g),h=g.substr((e+"").length-(0>e?1:0))||""):(e=parseFloat(g),h=h?g.substr((e+"").length)||"":"");""===h&&(h=n[m]||i);g=e||0===e?(w?e+k:e)+h:f[m];if(i!==h&&""!==h&&(e||0===e))if(k||0===k)if(k=T(a,m,k,i),"%"===h?(k/=T(a,m,100,"%")/100,100<k&&(k=100)):"em"===h?k/=T(a,m,1,"em"):(e=T(a,m,e,h),h="px"),w&&(e||0===e))g=e+k+h;w&&(e+=k);(k||0===k)&&(e||0===e)?(b=new N(d,m,k,e-k,b,0,"css_"+m,!1!==C&&("px"===h||"zIndex"===m),0,l,g),b.xs0=h):(b=new N(d,m,e||
k||0,0,b,-1,"css_"+m,!1,0,l,g),b.xs0="display"===m&&"none"===g?l:g)}c&&(b&&!b.plugin)&&(b.plugin=c)}return b};b.setRatio=function(a){var f=this._firstPT,b,c;if(1===a&&(this._tween._time===this._tween._duration||0===this._tween._time))for(;f;)2!==f.type?f.t[f.p]=f.e:f.setRatio(a),f=f._next;else if(a||!(this._tween._time===this._tween._duration||0===this._tween._time)||-1E-6===this._tween._rawPrevTime)for(;f;){b=f.c*a+f.s;f.r?b=0<b?b+0.5>>0:b-0.5>>0:1E-6>b&&-1E-6<b&&(b=0);if(f.type)if(1===f.type)if(c=
f.l,2===c)f.t[f.p]=f.xs0+b+f.xs1+f.xn1+f.xs2;else if(3===c)f.t[f.p]=f.xs0+b+f.xs1+f.xn1+f.xs2+f.xn2+f.xs3;else if(4===c)f.t[f.p]=f.xs0+b+f.xs1+f.xn1+f.xs2+f.xn2+f.xs3+f.xn3+f.xs4;else if(5===c)f.t[f.p]=f.xs0+b+f.xs1+f.xn1+f.xs2+f.xn2+f.xs3+f.xn3+f.xs4+f.xn4+f.xs5;else{b=f.xs0+b+f.xs1;for(c=1;c<f.l;c++)b+=f["xn"+c]+f["xs"+(c+1)];f.t[f.p]=b}else-1===f.type?f.t[f.p]=f.xs0:f.setRatio&&f.setRatio(a);else f.t[f.p]=b+f.xs0;f=f._next}else for(;f;)2!==f.type?f.t[f.p]=f.b:f.setRatio(a),f=f._next};b._linkCSSP=
function(a,f,b){a&&(f&&(f._prev=a),a._next&&(a._next._prev=a._prev),b&&(b._next=a),a._prev?a._prev._next=a._next:this._firstPT===a&&(this._firstPT=a._next),a._next=f,a._prev=b);return a};b._kill=function(a){var f=a,b=!1,c,d;if(a.css_autoAlpha||a.css_alpha){f={};for(d in a)f[d]=a[d];f.css_opacity=1;f.css_autoAlpha&&(f.css_visibility=1)}if(a.css_className&&(c=this._classNamePT))(a=c.xfirst)&&a._prev?this._linkCSSP(a._prev,c._next,a._prev._prev):a===this._firstPT&&(this._firstPT=null),c._next&&this._linkCSSP(c._next,
c._next._next,a._prev),this._target._gsOverwrittenClassNamePT=this._linkCSSP(c,this._target._gsOverwrittenClassNamePT),this._classNamePT=null,b=!0;return p.prototype._kill.call(this,f)||b};p.activate([t]);return t},!0);_gsDefine("plugins.RoundPropsPlugin",["plugins.TweenPlugin"],function(p){var t=function(){p.call(this,"roundProps",-1);this._overwriteProps.length=0},g=t.prototype=new p("roundProps",-1);g.constructor=t;t.API=2;g._onInitTween=function(g,j,d){this._tween=d;return!0};g._onInitAllProps=
function(){for(var g=this._tween,j=g.vars.roundProps instanceof Array?g.vars.roundProps:g.vars.roundProps.split(","),d=j.length,p={},b=g._propLookup.roundProps,a,t,c;-1<--d;)p[j[d]]=1;for(d=j.length;-1<--d;){a=j[d];for(t=g._firstPT;t;)c=t._next,t.pg?t.t._roundProps(p,!0):t.n===a&&(this._add(t.t,a,t.s,t.c),c&&(c._prev=t._prev),t._prev?t._prev._next=c:g._firstPT===t&&(g._firstPT=c),t._next=t._prev=null,g._propLookup[a]=b),t=c}return!1};g._add=function(g,j,d,p){this._addTween(g,j,d,d+p,j,!0);this._overwriteProps.push(j)};
p.activate([t]);return t},!0);_gsDefine("easing.Back",["easing.Ease"],function(p){var t=window.com.greensock._class,g=function(a,b){var c=t("easing."+a,function(){},!0),d=c.prototype=new p;d.constructor=c;d.getRatio=b;return c},n=function(a,b){var c=t("easing."+a,function(a){this._p1=a||0===a?a:1.70158;this._p2=1.525*this._p1},!0),d=c.prototype=new p;d.constructor=c;d.getRatio=b;d.config=function(a){return new c(a)};return c},j=n("BackOut",function(a){return(a-=1)*a*((this._p1+1)*a+this._p1)+1}),
d=n("BackIn",function(a){return a*a*((this._p1+1)*a-this._p1)}),n=n("BackInOut",function(a){return 1>(a*=2)?0.5*a*a*((this._p2+1)*a-this._p2):0.5*((a-=2)*a*((this._p2+1)*a+this._p2)+2)}),v=g("BounceOut",function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375}),b=g("BounceIn",function(a){return(a=1-a)<1/2.75?1-7.5625*a*a:a<2/2.75?1-(7.5625*(a-=1.5/2.75)*a+0.75):a<2.5/2.75?1-(7.5625*(a-=2.25/2.75)*a+0.9375):
1-(7.5625*(a-=2.625/2.75)*a+0.984375)}),a=g("BounceInOut",function(a){var b=0.5>a,a=b?1-2*a:2*a-1,a=a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375;return b?0.5*(1-a):0.5*a+0.5}),E=g("CircOut",function(a){return Math.sqrt(1-(a-=1)*a)}),c=g("CircIn",function(a){return-(Math.sqrt(1-a*a)-1)}),e=g("CircInOut",function(a){return 1>(a*=2)?-0.5*(Math.sqrt(1-a*a)-1):0.5*(Math.sqrt(1-(a-=2)*a)+1)}),i=2*Math.PI,H=function(a,
b,c){var d=t("easing."+a,function(a,b){this._p1=a||1;this._p2=b||c;this._p3=this._p2/i*(Math.asin(1/this._p1)||0)},!0),a=d.prototype=new p;a.constructor=d;a.getRatio=b;a.config=function(a,b){return new d(a,b)};return d},X=H("ElasticOut",function(a){return this._p1*Math.pow(2,-10*a)*Math.sin((a-this._p3)*i/this._p2)+1},0.3),F=H("ElasticIn",function(a){return-(this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*i/this._p2))},0.3),H=H("ElasticInOut",function(a){return 1>(a*=2)?-0.5*this._p1*Math.pow(2,
10*(a-=1))*Math.sin((a-this._p3)*i/this._p2):0.5*this._p1*Math.pow(2,-10*(a-=1))*Math.sin((a-this._p3)*i/this._p2)+1},0.45),h=g("ExpoOut",function(a){return 1-Math.pow(2,-10*a)}),x=g("ExpoIn",function(a){return Math.pow(2,10*(a-1))-0.001}),q=g("ExpoInOut",function(a){return 1>(a*=2)?0.5*Math.pow(2,10*(a-1)):0.5*(2-Math.pow(2,-10*(a-1)))}),B=Math.PI/2,s=g("SineOut",function(a){return Math.sin(a*B)}),O=g("SineIn",function(a){return-Math.cos(a*B)+1}),g=g("SineInOut",function(a){return-0.5*(Math.cos(Math.PI*
a)-1)}),I=t("easing.SlowMo",function(a,b,c){null==a?a=0.7:1<a&&(a=1);this._p=1!=a?b||0===b?b:0.7:0;this._p1=(1-a)/2;this._p2=a;this._p3=this._p1+this._p2;this._calcEnd=!0===c},!0),D=I.prototype=new p;D.constructor=I;D.getRatio=function(a){var b=a+(0.5-a)*this._p;return a<this._p1?this._calcEnd?1-(a=1-a/this._p1)*a:b-(a=1-a/this._p1)*a*a*a*b:a>this._p3?this._calcEnd?1-(a=(a-this._p3)/this._p1)*a:b+(a-b)*(a=(a-this._p3)/this._p1)*a*a*a:this._calcEnd?1:b};I.ease=new I(0.7,0.7);D.config=I.config=function(a,
b,c){return new I(a,b,c)};var y=t("easing.SteppedEase",function(a){a=a||1;this._p1=1/a;this._p2=a+1},!0),D=y.prototype=new p;D.constructor=y;D.getRatio=function(a){0>a?a=0:1<=a&&(a=0.999999999);return(this._p2*a>>0)*this._p1};D.config=y.config=function(a){return new y(a)};t("easing.Bounce",{easeOut:new v,easeIn:new b,easeInOut:new a},!0);t("easing.Circ",{easeOut:new E,easeIn:new c,easeInOut:new e},!0);t("easing.Elastic",{easeOut:new X,easeIn:new F,easeInOut:new H},!0);t("easing.Expo",{easeOut:new h,
easeIn:new x,easeInOut:new q},!0);t("easing.Sine",{easeOut:new s,easeIn:new O,easeInOut:new g},!0);return{easeOut:new j,easeIn:new d,easeInOut:new n}},!0)});
(function(p){var t=function(a){var a=a.split("."),b=p,c;for(c=0;c<a.length;c++)b[a[c]]=b=b[a[c]]||{};return b},g=t("com.greensock"),n,j,d,v,b,a={},E=function(f,b,c,d){this.sc=a[f]?a[f].sc:[];a[f]=this;this.gsClass=null;this.def=c;var e=b||[],g=[];this.check=function(b){for(var l=e.length,i=0,h;-1<--l;)(h=a[e[l]]||new E(e[l])).gsClass?g[l]=h.gsClass:(i++,b&&h.sc.push(this));if(0===i&&c){var b=("com.greensock."+f).split("."),l=b.pop(),j=t(b.join("."))[l]=this.gsClass=c.apply(c,g);d&&((p.GreenSockGlobals||
p)[l]=j,"function"===typeof define&&define.amd?define((p.GreenSockAMDPath?p.GreenSockAMDPath+"/":"")+f.split(".").join("/"),[],function(){return j}):"undefined"!==typeof module&&module.exports&&(module.exports=j));for(l=0;l<this.sc.length;l++)this.sc[l].check(!1)}};this.check(!0)},c=g._class=function(a,b,c){b=b||function(){};new E(a,[],function(){return b},c);return b};p._gsDefine=function(a,b,c,d){return new E(a,b,c,d)};var e=[0,0,1,1],i=[],H=c("easing.Ease",function(a,b,c,d){this._func=a;this._type=
c||0;this._power=d||0;this._params=b?e.concat(b):e},!0);d=H.prototype;d._calcEnd=!1;d.getRatio=function(a){if(this._func)return this._params[0]=a,this._func.apply(null,this._params);var b=this._type,c=this._power,d=1===b?1-a:2===b?a:0.5>a?2*a:2*(1-a);1===c?d*=d:2===c?d*=d*d:3===c?d*=d*d*d:4===c&&(d*=d*d*d*d);return 1===b?1-d:2===b?d:0.5>a?d/2:1-d/2};n=["Linear","Quad","Cubic","Quart","Quint"];for(j=n.length;-1<--j;)d=c("easing."+n[j],null,!0),v=c("easing.Power"+j,null,!0),d.easeOut=v.easeOut=new H(null,
null,1,j),d.easeIn=v.easeIn=new H(null,null,2,j),d.easeInOut=v.easeInOut=new H(null,null,3,j);c("easing.Strong",g.easing.Power4,!0);g.easing.Linear.easeNone=g.easing.Linear.easeIn;var X=c("events.EventDispatcher",function(a){this._listeners={};this._eventTarget=a||this});d=X.prototype;d.addEventListener=function(a,b,c,d,e){var e=e||0,g=this._listeners[a],i=0,h;null==g&&(this._listeners[a]=g=[]);for(h=g.length;-1<--h;)a=g[h],a.c===b?g.splice(h,1):0===i&&a.pr<e&&(i=h+1);g.splice(i,0,{c:b,s:c,up:d,pr:e})};
d.removeEventListener=function(a,b){var c=this._listeners[a],d;if(c)for(d=c.length;-1<--d;)if(c[d].c===b){c.splice(d,1);break}};d.dispatchEvent=function(a){var b=this._listeners[a];if(b)for(var c=b.length,d=this._eventTarget,e;-1<--c;)e=b[c],e.up?e.c.call(e.s||d,{type:a,target:d}):e.c.call(e.s||d)};var F=p.requestAnimationFrame,h=p.cancelAnimationFrame,x=Date.now||function(){return(new Date).getTime()};n=["ms","moz","webkit","o"];for(j=n.length;-1<--j&&!F;)F=p[n[j]+"RequestAnimationFrame"],h=p[n[j]+
"CancelAnimationFrame"]||p[n[j]+"CancelRequestAnimationFrame"];c("Ticker",function(a,b){var c=this,d=x(),e=!1!==b&&F,g,i,j,k,n,q=function(){null!=j&&(!e||!h?p.clearTimeout(j):h(j),j=null)},r=function(a){c.time=(x()-d)/1E3;if(!g||c.time>=n||a)c.frame++,n=c.time>n?c.time+k-(c.time-n):c.time+k-0.001,n<c.time+0.001&&(n=c.time+0.001),c.dispatchEvent("tick");!0!==a&&(j=i(r))};X.call(c);this.time=this.frame=0;this.tick=function(){r(!0)};this.fps=function(a){if(!arguments.length)return g;g=a;k=1/(g||60);
n=this.time+k;i=0===g?function(){}:!e||!F?function(a){return p.setTimeout(a,1E3*(n-c.time)+1>>0||1)}:F;q();j=i(r)};this.useRAF=function(a){if(!arguments.length)return e;q();e=a;c.fps(g)};c.fps(a);p.setTimeout(function(){e&&!j&&c.useRAF(!1)},1E3)});d=g.Ticker.prototype=new g.events.EventDispatcher;d.constructor=g.Ticker;var q=c("core.Animation",function(a,c){this.vars=c||{};this._duration=this._totalDuration=a||0;this._delay=Number(this.vars.delay)||0;this._timeScale=1;this._active=!0===this.vars.immediateRender;
this.data=this.vars.data;this._reversed=!0===this.vars.reversed;if(r){b||(B.tick(),b=!0);var d=this.vars.useFrames?A:r;d.insert(this,d._time);this.vars.paused&&this.paused(!0)}}),B=q.ticker=new g.Ticker;d=q.prototype;d._dirty=d._gc=d._initted=d._paused=!1;d._totalTime=d._time=0;d._rawPrevTime=-1;d._next=d._last=d._onUpdate=d._timeline=d.timeline=null;d._paused=!1;d.play=function(a,b){arguments.length&&this.seek(a,b);this.reversed(!1);return this.paused(!1)};d.pause=function(a,b){arguments.length&&
this.seek(a,b);return this.paused(!0)};d.resume=function(a,b){arguments.length&&this.seek(a,b);return this.paused(!1)};d.seek=function(a,b){return this.totalTime(Number(a),!1!=b)};d.restart=function(a,b){this.reversed(!1);this.paused(!1);return this.totalTime(a?-this._delay:0,!1!==b)};d.reverse=function(a,b){arguments.length&&this.seek(a||this.totalDuration(),b);this.reversed(!0);return this.paused(!1)};d.render=function(){};d.invalidate=function(){return this};d._enabled=function(a,b){this._gc=!a;
this._active=a&&!this._paused&&0<this._totalTime&&this._totalTime<this._totalDuration;!0!==b&&(a&&null==this.timeline?this._timeline.insert(this,this._startTime-this._delay):!a&&null!=this.timeline&&this._timeline._remove(this,!0));return!1};d._kill=function(){return this._enabled(!1,!1)};d.kill=function(a,b){this._kill(a,b);return this};d._uncache=function(a){for(a=a?this:this.timeline;a;)a._dirty=!0,a=a.timeline;return this};d.eventCallback=function(a,b,c,d){if(null==a)return null;if("on"===a.substr(0,
2)){if(1===arguments.length)return this.vars[a];if(null==b)delete this.vars[a];else if(this.vars[a]=b,this.vars[a+"Params"]=c,this.vars[a+"Scope"]=d,c)for(var e=c.length;-1<--e;)"{self}"===c[e]&&(c=this.vars[a+"Params"]=c.concat(),c[e]=this);"onUpdate"===a&&(this._onUpdate=b)}return this};d.delay=function(a){if(!arguments.length)return this._delay;this._timeline.smoothChildTiming&&this.startTime(this._startTime+a-this._delay);this._delay=a;return this};d.duration=function(a){if(!arguments.length)return this._dirty=
!1,this._duration;this._duration=this._totalDuration=a;this._uncache(!0);this._timeline.smoothChildTiming&&0<this._time&&this._time<this._duration&&0!==a&&this.totalTime(this._totalTime*(a/this._duration),!0);return this};d.totalDuration=function(a){this._dirty=!1;return!arguments.length?this._totalDuration:this.duration(a)};d.time=function(a,b){if(!arguments.length)return this._time;this._dirty&&this.totalDuration();a>this._duration&&(a=this._duration);return this.totalTime(a,b)};d.totalTime=function(a,
b){if(!arguments.length)return this._totalTime;if(this._timeline){0>a&&(a+=this.totalDuration());if(this._timeline.smoothChildTiming&&(this._dirty&&this.totalDuration(),a>this._totalDuration&&(a=this._totalDuration),this._startTime=(this._paused?this._pauseTime:this._timeline._time)-(!this._reversed?a:this._totalDuration-a)/this._timeScale,this._timeline._dirty||this._uncache(!1),!this._timeline._active))for(var c=this._timeline;c._timeline;)c.totalTime(c._totalTime,!0),c=c._timeline;this._gc&&this._enabled(!0,
!1);this._totalTime!==a&&this.render(a,b,!1)}return this};d.startTime=function(a){if(!arguments.length)return this._startTime;a!=this._startTime&&(this._startTime=a,this.timeline&&this.timeline._sortChildren&&this.timeline.insert(this,a-this._delay));return this};d.timeScale=function(a){if(!arguments.length)return this._timeScale;a=a||1E-6;if(this._timeline&&this._timeline.smoothChildTiming){var b=this._pauseTime||0===this._pauseTime?this._pauseTime:this._timeline._totalTime;this._startTime=b-(b-
this._startTime)*this._timeScale/a}this._timeScale=a;return this._uncache(!1)};d.reversed=function(a){if(!arguments.length)return this._reversed;a!==this._reversed&&(this._reversed=a,this.totalTime(this._totalTime,!0));return this};d.paused=function(a){if(!arguments.length)return this._paused;a!==this._paused&&this._timeline&&(!a&&this._timeline.smoothChildTiming&&(this._startTime+=this._timeline.rawTime()-this._pauseTime,this._uncache(!1)),this._pauseTime=a?this._timeline.rawTime():null,this._paused=
a,this._active=!this._paused&&0<this._totalTime&&this._totalTime<this._totalDuration);this._gc&&(a||this._enabled(!0,!1));return this};g=c("core.SimpleTimeline",function(a){q.call(this,0,a);this.autoRemoveChildren=this.smoothChildTiming=!0});d=g.prototype=new q;d.constructor=g;d.kill()._gc=!1;d._first=d._last=null;d._sortChildren=!1;d.insert=function(a,b){a._startTime=Number(b||0)+a._delay;a._paused&&this!==a._timeline&&(a._pauseTime=a._startTime+(this.rawTime()-a._startTime)/a._timeScale);a.timeline&&
a.timeline._remove(a,!0);a.timeline=a._timeline=this;a._gc&&a._enabled(!0,!0);var c=this._last;if(this._sortChildren)for(var d=a._startTime;c&&c._startTime>d;)c=c._prev;c?(a._next=c._next,c._next=a):(a._next=this._first,this._first=a);a._next?a._next._prev=a:this._last=a;a._prev=c;this._timeline&&this._uncache(!0);return this};d._remove=function(a,b){a.timeline===this&&(b||a._enabled(!1,!0),a.timeline=null,a._prev?a._prev._next=a._next:this._first===a&&(this._first=a._next),a._next?a._next._prev=
a._prev:this._last===a&&(this._last=a._prev),this._timeline&&this._uncache(!0));return this};d.render=function(a,b){var c=this._first,d;for(this._totalTime=this._time=this._rawPrevTime=a;c;){d=c._next;if(c._active||a>=c._startTime&&!c._paused)c._reversed?c.render((!c._dirty?c._totalDuration:c.totalDuration())-(a-c._startTime)*c._timeScale,b,!1):c.render((a-c._startTime)*c._timeScale,b,!1);c=d}};d.rawTime=function(){return this._totalTime};var s=c("TweenLite",function(a,b,c){q.call(this,b,c);if(null==
a)throw"Cannot tween an undefined reference.";this.target=a;this._overwrite=null==this.vars.overwrite?k[s.defaultOverwrite]:"number"===typeof this.vars.overwrite?this.vars.overwrite>>0:k[this.vars.overwrite];if((a instanceof Array||a.jquery)&&"object"===typeof a[0]){this._targets=a.slice(0);this._propLookup=[];this._siblings=[];for(a=0;a<this._targets.length;a++)c=this._targets[a],c.jquery?(this._targets.splice(a--,1),this._targets=this._targets.concat(c.constructor.makeArray(c))):(this._siblings[a]=
C(c,this,!1),1===this._overwrite&&1<this._siblings[a].length&&u(c,this,null,1,this._siblings[a]))}else this._propLookup={},this._siblings=C(a,this,!1),1===this._overwrite&&1<this._siblings.length&&u(a,this,null,1,this._siblings);(this.vars.immediateRender||0===b&&0===this._delay&&!1!==this.vars.immediateRender)&&this.render(-this._delay,!1,!0)},!0);d=s.prototype=new q;d.constructor=s;d.kill()._gc=!1;d.ratio=0;d._firstPT=d._targets=d._overwrittenProps=null;d._notifyPluginsOfEnabled=!1;s.version=1.642;
s.defaultEase=d._ease=new H(null,null,1,1);s.defaultOverwrite="auto";s.ticker=B;var O=s._plugins={},I=s._tweenLookup={},D=0,y={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,orientToBezier:1,immediateRender:1,repeat:1,
repeatDelay:1,data:1,paused:1,reversed:1},k={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},A=q._rootFramesTimeline=new g,r=q._rootTimeline=new g;r._startTime=B.time;A._startTime=B.frame;r._active=A._active=!0;q._updateRoot=function(){r.render((B.time-r._startTime)*r._timeScale,!1,!1);A.render((B.frame-A._startTime)*A._timeScale,!1,!1);if(!(B.frame%120)){var a,b,c;for(c in I){b=I[c].tweens;for(a=b.length;-1<--a;)b[a]._gc&&b.splice(a,1);0===b.length&&delete I[c]}}};
B.addEventListener("tick",q._updateRoot);var C=function(a,b,c){var d=a._gsTweenID,e;if(!I[d||(a._gsTweenID=d="t"+D++)])I[d]={target:a,tweens:[]};if(b&&(a=I[d].tweens,a[e=a.length]=b,c))for(;-1<--e;)a[e]===b&&a.splice(e,1);return I[d].tweens},u=function(a,b,c,d,e){var g,i,h;if(1===d||4<=d){a=e.length;for(g=0;g<a;g++)if((h=e[g])!==b)h._gc||h._enabled(!1,!1)&&(i=!0);else if(5===d)break;return i}var j=b._startTime+1E-10,k=[],n=0,p=0===b._duration,q;for(g=e.length;-1<--g;)if(!((h=e[g])===b||h._gc||h._paused))h._timeline!==
b._timeline?(q=q||P(b,0,p),0===P(h,q,p)&&(k[n++]=h)):h._startTime<=j&&h._startTime+h.totalDuration()/h._timeScale+1E-10>j&&((p||!h._initted)&&2E-10>=j-h._startTime||(k[n++]=h));for(g=n;-1<--g;)if(h=k[g],2===d&&h._kill(c,a)&&(i=!0),2!==d||!h._firstPT&&h._initted)h._enabled(!1,!1)&&(i=!0);return i},P=function(a,b,c){for(var d=a._timeline,e=d._timeScale,g=a._startTime;d._timeline;){g+=d._startTime;e*=d._timeScale;if(d._paused)return-100;d=d._timeline}g/=e;return g>b?g-b:c&&g===b||!a._initted&&2E-10>
g-b?1E-10:(g+=a.totalDuration()/a._timeScale/e)>b?0:g-b-1E-10};d._init=function(){this.vars.startAt&&(this.vars.startAt.overwrite=0,this.vars.startAt.immediateRender=!0,s.to(this.target,0,this.vars.startAt));var a,b;this._ease=this.vars.ease instanceof H?this.vars.easeParams instanceof Array?this.vars.ease.config.apply(this.vars.ease,this.vars.easeParams):this.vars.ease:"function"===typeof this.vars.ease?new H(this.vars.ease,this.vars.easeParams):s.defaultEase;this._easeType=this._ease._type;this._easePower=
this._ease._power;this._firstPT=null;if(this._targets)for(a=this._targets.length;-1<--a;){if(this._initProps(this._targets[a],this._propLookup[a]={},this._siblings[a],this._overwrittenProps?this._overwrittenProps[a]:null))b=!0}else b=this._initProps(this.target,this._propLookup,this._siblings,this._overwrittenProps);b&&s._onPluginEvent("_onInitAllProps",this);this._overwrittenProps&&null==this._firstPT&&"function"!==typeof this.target&&this._enabled(!1,!1);if(this.vars.runBackwards)for(a=this._firstPT;a;)a.s+=
a.c,a.c=-a.c,a=a._next;this._onUpdate=this.vars.onUpdate;this._initted=!0};d._initProps=function(a,b,c,d){var e,g,i,h,j,k;if(null==a)return!1;for(e in this.vars){if(y[e]){if("onStartParams"===e||"onUpdateParams"===e||"onCompleteParams"===e||"onReverseCompleteParams"===e||"onRepeatParams"===e)if(j=this.vars[e])for(g=j.length;-1<--g;)"{self}"===j[g]&&(j=this.vars[e]=j.concat(),j[g]=this)}else if(O[e]&&(h=new O[e])._onInitTween(a,this.vars[e],this)){this._firstPT=k={_next:this._firstPT,t:h,p:"setRatio",
s:0,c:1,f:!0,n:e,pg:!0,pr:h._priority};for(g=h._overwriteProps.length;-1<--g;)b[h._overwriteProps[g]]=this._firstPT;if(h._priority||h._onInitAllProps)i=!0;if(h._onDisable||h._onEnable)this._notifyPluginsOfEnabled=!0}else this._firstPT=b[e]=k={_next:this._firstPT,t:a,p:e,f:"function"===typeof a[e],n:e,pg:!1,pr:0},k.s=!k.f?parseFloat(a[e]):a[e.indexOf("set")||"function"!==typeof a["get"+e.substr(3)]?e:"get"+e.substr(3)](),g=this.vars[e],k.c="number"===typeof g?g-k.s:"string"===typeof g&&"="===g.charAt(1)?
parseInt(g.charAt(0)+"1")*Number(g.substr(2)):Number(g)||0;k&&k._next&&(k._next._prev=k)}return d&&this._kill(d,a)?this._initProps(a,b,c,d):1<this._overwrite&&this._firstPT&&1<c.length&&u(a,this,b,this._overwrite,c)?(this._kill(b,a),this._initProps(a,b,c,d)):i};d.render=function(a,b,c){var d=this._time,e,g;if(a>=this._duration){if(this._totalTime=this._time=this._duration,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(e=!0,g="onComplete"),0===this._duration){if(0===a||0>
this._rawPrevTime)this._rawPrevTime!==a&&(c=!0);this._rawPrevTime=a}}else if(0>=a){this._totalTime=this._time=0;this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0;if(0!==d||0===this._duration&&0<this._rawPrevTime)g="onReverseComplete",e=this._reversed;0>a?(this._active=!1,0===this._duration&&(0<=this._rawPrevTime&&(c=!0),this._rawPrevTime=a)):this._initted||(c=!0)}else if(this._totalTime=this._time=a,this._easeType){var h=a/this._duration,j=this._easeType,k=this._easePower;if(1===j||3===j&&0.5<=
h)h=1-h;3===j&&(h*=2);1===k?h*=h:2===k?h*=h*h:3===k?h*=h*h*h:4===k&&(h*=h*h*h*h);this.ratio=1===j?1-h:2===j?h:0.5>a/this._duration?h/2:1-h/2}else this.ratio=this._ease.getRatio(a/this._duration);if(this._time!==d||c){this._initted||(this._init(),!e&&this._time&&(this.ratio=this._ease.getRatio(this._time/this._duration)));!this._active&&!this._paused&&(this._active=!0);if(0===d&&this.vars.onStart&&(0!==this._time||0===this._duration))b||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||
i);for(a=this._firstPT;a;){if(a.f)a.t[a.p](a.c*this.ratio+a.s);else a.t[a.p]=a.c*this.ratio+a.s;a=a._next}this._onUpdate&&(b||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||i));g&&!this._gc&&(e&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),b||this.vars[g]&&this.vars[g].apply(this.vars[g+"Scope"]||this,this.vars[g+"Params"]||i))}};d._kill=function(a,b){"all"===a&&(a=null);if(null==a&&(null==b||b==this.target))return this._enabled(!1,!1);var b=
b||this._targets||this.target,c,d,e,g,h,i,j;if((b instanceof Array||b.jquery)&&"object"===typeof b[0])for(c=b.length;-1<--c;)this._kill(a,b[c])&&(h=!0);else{if(this._targets)for(c=this._targets.length;-1<--c;){if(b===this._targets[c]){g=this._propLookup[c]||{};this._overwrittenProps=this._overwrittenProps||[];d=this._overwrittenProps[c]=a?this._overwrittenProps[c]||{}:"all";break}}else{if(b!==this.target)return!1;g=this._propLookup;d=this._overwrittenProps=a?this._overwrittenProps||{}:"all"}if(g)for(e in i=
a||g,j=a!=d&&"all"!=d&&a!=g&&(null==a||!0!=a._tempKill),i){if(c=g[e]){c.pg&&c.t._kill(i)&&(h=!0);if(!c.pg||0===c.t._overwriteProps.length)c._prev?c._prev._next=c._next:c===this._firstPT&&(this._firstPT=c._next),c._next&&(c._next._prev=c._prev),c._next=c._prev=null;delete g[e]}j&&(d[e]=1)}}return h};d.invalidate=function(){this._notifyPluginsOfEnabled&&s._onPluginEvent("_onDisable",this);this._onUpdate=this._overwrittenProps=this._firstPT=null;this._initted=this._active=this._notifyPluginsOfEnabled=
!1;this._propLookup=this._targets?{}:[];return this};d._enabled=function(a,b){if(a&&this._gc)if(this._targets)for(var c=this._targets.length;-1<--c;)this._siblings[c]=C(this._targets[c],this,!0);else this._siblings=C(this.target,this,!0);q.prototype._enabled.call(this,a,b);return this._notifyPluginsOfEnabled&&this._firstPT?s._onPluginEvent(a?"_onEnable":"_onDisable",this):!1};s.to=function(a,b,c){return new s(a,b,c)};s.from=function(a,b,c){c.runBackwards=!0;!1!=c.immediateRender&&(c.immediateRender=
!0);return new s(a,b,c)};s.fromTo=function(a,b,c,d){d.startAt=c;c.immediateRender&&(d.immediateRender=!0);return new s(a,b,d)};s.delayedCall=function(a,b,c,d,e){return new s(b,0,{delay:a,onComplete:b,onCompleteParams:c,onCompleteScope:d,onReverseComplete:b,onReverseCompleteParams:c,onReverseCompleteScope:d,immediateRender:!1,useFrames:e,overwrite:0})};s.set=function(a,b){return new s(a,0,b)};s.killTweensOf=s.killDelayedCallsTo=function(a,b){for(var c=s.getTweensOf(a),d=c.length;-1<--d;)c[d]._kill(b,
a)};s.getTweensOf=function(a){if(null!=a){var b,c,d;if((a instanceof Array||a.jquery)&&"object"===typeof a[0]){b=a.length;for(c=[];-1<--b;)c=c.concat(s.getTweensOf(a[b]));for(b=c.length;-1<--b;){d=c[b];for(a=b;-1<--a;)d===c[a]&&c.splice(b,1)}}else{c=C(a).concat();for(b=c.length;-1<--b;)c[b]._gc&&c.splice(b,1)}return c}};var L=c("plugins.TweenPlugin",function(a,b){this._overwriteProps=(a||"").split(",");this._propName=this._overwriteProps[0];this._priority=b||0},!0);d=L.prototype;L.version=12;L.API=
2;d._firstPT=null;d._addTween=function(a,b,c,d,e,g){var h;if(null!=d&&(h="number"===typeof d||"="!==d.charAt(1)?Number(d)-c:parseInt(d.charAt(0)+"1")*Number(d.substr(2))))this._firstPT=a={_next:this._firstPT,t:a,p:b,s:c,c:h,f:"function"===typeof a[b],n:e||b,r:g},a._next&&(a._next._prev=a)};d.setRatio=function(a){for(var b=this._firstPT,c;b;){c=b.c*a+b.s;b.r&&(c=c+(0<c?0.5:-0.5)>>0);if(b.f)b.t[b.p](c);else b.t[b.p]=c;b=b._next}};d._kill=function(a){if(null!=a[this._propName])this._overwriteProps=[];
else for(var b=this._overwriteProps.length;-1<--b;)null!=a[this._overwriteProps[b]]&&this._overwriteProps.splice(b,1);for(b=this._firstPT;b;)null!=a[b.n]&&(b._next&&(b._next._prev=b._prev),b._prev?(b._prev._next=b._next,b._prev=null):this._firstPT===b&&(this._firstPT=b._next)),b=b._next;return!1};d._roundProps=function(a,b){for(var c=this._firstPT;c;){if(a[this._propName]||null!=c.n&&a[c.n.split(this._propName+"_").join("")])c.r=b;c=c._next}};s._onPluginEvent=function(a,b){var c=b._firstPT,d;if("_onInitAllProps"===
a){for(var e,g,h,i;c;){i=c._next;for(e=g;e&&e.pr>c.pr;)e=e._next;(c._prev=e?e._prev:h)?c._prev._next=c:g=c;(c._next=e)?e._prev=c:h=c;c=i}c=b._firstPT=g}for(;c;)c.pg&&"function"===typeof c.t[a]&&c.t[a]()&&(d=!0),c=c._next;return d};L.activate=function(a){for(var b=a.length;-1<--b;)a[b].API===L.API&&(s._plugins[(new a[b])._propName]=a[b]);return!0};if(n=p._gsQueue){for(j=0;j<n.length;j++)n[j]();for(d in a)a[d].def||console.log("Warning: TweenLite encountered missing dependency: com.greensock."+d)}})(window);;

/*!
 * VERSION: beta 1.27
 * DATE: 2012-07-27
 * JavaScript (ActionScript 3 and 2 also available)
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue||(window._gsQueue=[])).push(function(){_gsDefine("easing.Back",["easing.Ease"],function(g){var c=window.com.greensock._class,b=function(a,l){var b=c("easing."+a,function(){},!0),d=b.prototype=new g;d.constructor=b;d.getRatio=l;return b},h=function(a,l){var b=c("easing."+a,function(a){this._p1=a||0===a?a:1.70158;this._p2=1.525*this._p1},!0),d=b.prototype=new g;d.constructor=b;d.getRatio=l;d.config=function(a){return new b(a)};return b},n=h("BackOut",function(a){return(a-=1)*a*((this._p1+ 1)*a+this._p1)+1}),o=h("BackIn",function(a){return a*a*((this._p1+1)*a-this._p1)}),h=h("BackInOut",function(a){return 1>(a*=2)?0.5*a*a*((this._p2+1)*a-this._p2):0.5*((a-=2)*a*((this._p2+1)*a+this._p2)+2)}),p=b("BounceOut",function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375}),q=b("BounceIn",function(a){return(a=1-a)<1/2.75?1-7.5625*a*a:a<2/2.75?1-(7.5625*(a-=1.5/2.75)*a+0.75):a<2.5/2.75?1-(7.5625*(a-= 2.25/2.75)*a+0.9375):1-(7.5625*(a-=2.625/2.75)*a+0.984375)}),r=b("BounceInOut",function(a){var b=0.5>a,a=b?1-2*a:2*a-1,a=a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375;return b?0.5*(1-a):0.5*a+0.5}),s=b("CircOut",function(a){return Math.sqrt(1-(a-=1)*a)}),t=b("CircIn",function(a){return-(Math.sqrt(1-a*a)-1)}),u=b("CircInOut",function(a){return 1>(a*=2)?-0.5*(Math.sqrt(1-a*a)-1):0.5*(Math.sqrt(1-(a-=2)*a)+1)}),i= 2*Math.PI,j=function(a,b,e){var d=c("easing."+a,function(a,b){this._p1=a||1;this._p2=b||e;this._p3=this._p2/i*(Math.asin(1/this._p1)||0)},!0),a=d.prototype=new g;a.constructor=d;a.getRatio=b;a.config=function(a,b){return new d(a,b)};return d},v=j("ElasticOut",function(a){return this._p1*Math.pow(2,-10*a)*Math.sin((a-this._p3)*i/this._p2)+1},0.3),w=j("ElasticIn",function(a){return-(this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*i/this._p2))},0.3),j=j("ElasticInOut",function(a){return 1>(a*=2)? -0.5*this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*i/this._p2):0.5*this._p1*Math.pow(2,-10*(a-=1))*Math.sin((a-this._p3)*i/this._p2)+1},0.45),x=b("ExpoOut",function(a){return 1-Math.pow(2,-10*a)}),y=b("ExpoIn",function(a){return Math.pow(2,10*(a-1))-0.001}),z=b("ExpoInOut",function(a){return 1>(a*=2)?0.5*Math.pow(2,10*(a-1)):0.5*(2-Math.pow(2,-10*(a-1)))}),m=Math.PI/2,A=b("SineOut",function(a){return Math.sin(a*m)}),B=b("SineIn",function(a){return-Math.cos(a*m)+1}),b=b("SineInOut",function(a){return-0.5* (Math.cos(Math.PI*a)-1)}),f=c("easing.SlowMo",function(a,b,c){null==a?a=0.7:1<a&&(a=1);this._p=1!=a?b||0===b?b:0.7:0;this._p1=(1-a)/2;this._p2=a;this._p3=this._p1+this._p2;this._calcEnd=!0===c},!0),e=f.prototype=new g;e.constructor=f;e.getRatio=function(a){var b=a+(0.5-a)*this._p;return a<this._p1?this._calcEnd?1-(a=1-a/this._p1)*a:b-(a=1-a/this._p1)*a*a*a*b:a>this._p3?this._calcEnd?1-(a=(a-this._p3)/this._p1)*a:b+(a-b)*(a=(a-this._p3)/this._p1)*a*a*a:this._calcEnd?1:b};f.ease=new f(0.7,0.7);e.config= f.config=function(a,b,c){return new f(a,b,c)};var k=c("easing.SteppedEase",function(a){a=a||1;this._p1=1/a;this._p2=a+1},!0),e=k.prototype=new g;e.constructor=k;e.getRatio=function(a){0>a?a=0:1<=a&&(a=0.999999999);return(this._p2*a>>0)*this._p1};e.config=k.config=function(a){return new k(a)};c("easing.Bounce",{easeOut:new p,easeIn:new q,easeInOut:new r},!0);c("easing.Circ",{easeOut:new s,easeIn:new t,easeInOut:new u},!0);c("easing.Elastic",{easeOut:new v,easeIn:new w,easeInOut:new j},!0);c("easing.Expo", {easeOut:new x,easeIn:new y,easeInOut:new z},!0);c("easing.Sine",{easeOut:new A,easeIn:new B,easeInOut:new b},!0);return{easeOut:new n,easeIn:new o,easeInOut:new h}},!0)});window._gsDefine&&_gsQueue.pop()();;

(function() {
  var WebSocket = window.WebSocket || window.MozWebSocket;
  var br = window.brunch || {};
  var ar = br['auto-reload'] || {};
  if (!WebSocket || !ar.enabled) return;

  var cacheBuster = function(url){
    var date = Math.round(Date.now() / 1000).toString();
    url = url.replace(/(\&|\\?)cacheBuster=\d*/, '');
    return url + (url.indexOf('?') >= 0 ? '&' : '?') +'cacheBuster=' + date;
  };

  var reloaders = {
    page: function(){
      window.location.reload(true);
    },

    stylesheet: function(){
      [].slice
        .call(document.querySelectorAll('link[rel="stylesheet"]'))
        .filter(function(link){
          return (link != null && link.href != null);
        })
        .forEach(function(link) {
          link.href = cacheBuster(link.href);
        });
    }
  };
  var port = ar.port || 9485;
  var host = (!br['server']) ? window.location.hostname : br['server'];
  var connection = new WebSocket('ws://' + host + ':' + port);
  connection.onmessage = function(event) {
    var message = event.data;
    var b = window.brunch;
    if (!b || !b['auto-reload'] || !b['auto-reload'].enabled) return;
    if (reloaders[message] != null) {
      reloaders[message]();
    } else {
      reloaders.page();
    }
  };
})();
;

// lib/handlebars/base.js

/*jshint eqnull:true*/
this.Handlebars = {};

(function(Handlebars) {

Handlebars.VERSION = "1.0.rc.1";

Handlebars.helpers  = {};
Handlebars.partials = {};

Handlebars.registerHelper = function(name, fn, inverse) {
  if(inverse) { fn.not = inverse; }
  this.helpers[name] = fn;
};

Handlebars.registerPartial = function(name, str) {
  this.partials[name] = str;
};

Handlebars.registerHelper('helperMissing', function(arg) {
  if(arguments.length === 2) {
    return undefined;
  } else {
    throw new Error("Could not find property '" + arg + "'");
  }
});

var toString = Object.prototype.toString, functionType = "[object Function]";

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  var inverse = options.inverse || function() {}, fn = options.fn;


  var ret = "";
  var type = toString.call(context);

  if(type === functionType) { context = context.call(this); }

  if(context === true) {
    return fn(this);
  } else if(context === false || context == null) {
    return inverse(this);
  } else if(type === "[object Array]") {
    if(context.length > 0) {
      return Handlebars.helpers.each(context, options);
    } else {
      return inverse(this);
    }
  } else {
    return fn(context);
  }
});

Handlebars.K = function() {};

Handlebars.createFrame = Object.create || function(object) {
  Handlebars.K.prototype = object;
  var obj = new Handlebars.K();
  Handlebars.K.prototype = null;
  return obj;
};

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "", data;

  if (options.data) {
    data = Handlebars.createFrame(options.data);
  }

  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      if (data) { data.index = i; }
      ret = ret + fn(context[i], { data: data });
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});

Handlebars.registerHelper('if', function(context, options) {
  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if(!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('unless', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  options.fn = inverse;
  options.inverse = fn;

  return Handlebars.helpers['if'].call(this, context, options);
});

Handlebars.registerHelper('with', function(context, options) {
  return options.fn(context);
});

Handlebars.registerHelper('log', function(context) {
  Handlebars.log(context);
});

}(this.Handlebars));
;
// lib/handlebars/utils.js
Handlebars.Exception = function(message) {
  var tmp = Error.prototype.constructor.apply(this, arguments);

  for (var p in tmp) {
    if (tmp.hasOwnProperty(p)) { this[p] = tmp[p]; }
  }

  this.message = tmp.message;
};
Handlebars.Exception.prototype = new Error();

// Build out our basic SafeString type
Handlebars.SafeString = function(string) {
  this.string = string;
};
Handlebars.SafeString.prototype.toString = function() {
  return this.string.toString();
};

(function() {
  var escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /[&<>"'`]/g;
  var possible = /[&<>"'`]/;

  var escapeChar = function(chr) {
    return escape[chr] || "&amp;";
  };

  Handlebars.Utils = {
    escapeExpression: function(string) {
      // don't escape SafeStrings, since they're already safe
      if (string instanceof Handlebars.SafeString) {
        return string.toString();
      } else if (string == null || string === false) {
        return "";
      }

      if(!possible.test(string)) { return string; }
      return string.replace(badChars, escapeChar);
    },

    isEmpty: function(value) {
      if (typeof value === "undefined") {
        return true;
      } else if (value === null) {
        return true;
      } else if (value === false) {
        return true;
      } else if(Object.prototype.toString.call(value) === "[object Array]" && value.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  };
})();;
// lib/handlebars/runtime.js
Handlebars.VM = {
  template: function(templateSpec) {
    // Just add water
    var container = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          return Handlebars.VM.program(fn, data);
        } else if(programWrapper) {
          return programWrapper;
        } else {
          programWrapper = this.programs[i] = Handlebars.VM.program(fn);
          return programWrapper;
        }
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop
    };

    return function(context, options) {
      options = options || {};
      return templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);
    };
  },

  programWithDepth: function(fn, data, $depth) {
    var args = Array.prototype.slice.call(arguments, 2);

    return function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
  },
  program: function(fn, data) {
    return function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
  },
  noop: function() { return ""; },
  invokePartial: function(partial, name, context, helpers, partials, data) {
    var options = { helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Handlebars.Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    } else if (!Handlebars.compile) {
      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    } else {
      partials[name] = Handlebars.compile(partial, {data: data !== undefined});
      return partials[name](context, options);
    }
  }
};

Handlebars.template = Handlebars.VM.template;
;
;

/*
* EaselJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{};(function(){var c=function(){throw"UID cannot be instantiated";};c._nextID=0;c.get=function(){return c._nextID++};createjs.UID=c})();this.createjs=this.createjs||{};
(function(){var c=function(){throw"Ticker cannot be instantiated.";};c.useRAF=null;c._listeners=null;c._pauseable=null;c._paused=false;c._inited=false;c._startTime=0;c._pausedTime=0;c._ticks=0;c._pausedTicks=0;c._interval=50;c._lastTime=0;c._times=null;c._tickTimes=null;c._rafActive=false;c._timeoutID=null;c.addListener=function(a,l){a!=null&&(c._inited||c.init(),c.removeListener(a),c._pauseable[c._listeners.length]=l==null?true:l,c._listeners.push(a))};c.init=function(){c._inited=true;c._times=[];
c._tickTimes=[];c._pauseable=[];c._listeners=[];c._times.push(c._lastTime=c._startTime=c._getTime());c.setInterval(c._interval)};c.removeListener=function(a){var l=c._listeners;l&&(a=l.indexOf(a),a!=-1&&(l.splice(a,1),c._pauseable.splice(a,1)))};c.removeAllListeners=function(){c._listeners=[];c._pauseable=[]};c.setInterval=function(a){c._interval=a;c._inited&&c._setupTick()};c.getInterval=function(){return c._interval};c.setFPS=function(a){c.setInterval(1E3/a)};c.getFPS=function(){return 1E3/c._interval};
c.getMeasuredFPS=function(a){if(c._times.length<2)return-1;a==null&&(a=c.getFPS()|0);a=Math.min(c._times.length-1,a);return 1E3/((c._times[0]-c._times[a])/a)};c.setPaused=function(a){c._paused=a};c.getPaused=function(){return c._paused};c.getTime=function(a){return c._getTime()-c._startTime-(a?c._pausedTime:0)};c.getTicks=function(a){return c._ticks-(a?c._pausedTicks:0)};c._handleAF=function(){c._rafActive=false;c._setupTick();c._getTime()-c._lastTime>=(c._interval-1)*0.97&&c._tick()};c._handleTimeout=
function(){c.timeoutID=null;c._setupTick();c._tick()};c._setupTick=function(){if(!(c._rafActive||c.timeoutID!=null)){if(c.useRAF){var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;if(a){a(c._handleAF);c._rafActive=true;return}}c.timeoutID=setTimeout(c._handleTimeout,c._interval)}};c._tick=function(){var a=c._getTime();c._ticks++;var l=a-c._lastTime,b=c._paused;b&&(c._pausedTicks++,
c._pausedTime+=l);c._lastTime=a;for(var d=c._pauseable,e=c._listeners.slice(),f=e?e.length:0,g=0;g<f;g++){var i=e[g];i==null||b&&d[g]||(i.tick?i.tick(l,b):i instanceof Function&&i(l,b))}for(c._tickTimes.unshift(c._getTime()-a);c._tickTimes.length>100;)c._tickTimes.pop();for(c._times.unshift(a);c._times.length>100;)c._times.pop()};var b=window.performance&&(performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow);c._getTime=function(){return b&&b.call(performance)||
(new Date).getTime()};createjs.Ticker=c})();this.createjs=this.createjs||{};
(function(){var c=function(a,l,b,d,e,c,g,i,j){this.initialize(a,l,b,d,e,c,g,i,j)},b=c.prototype;b.stageX=0;b.stageY=0;b.rawX=0;b.rawY=0;b.type=null;b.nativeEvent=null;b.onMouseMove=null;b.onMouseUp=null;b.target=null;b.pointerID=0;b.primary=false;b.initialize=function(a,l,b,d,e,c,g,i,j){this.type=a;this.stageX=l;this.stageY=b;this.target=d;this.nativeEvent=e;this.pointerID=c;this.primary=g;this.rawX=i==null?l:i;this.rawY=j==null?b:j};b.clone=function(){return new c(this.type,this.stageX,this.stageY,
this.target,this.nativeEvent,this.pointerID,this.primary,this.rawX,this.rawY)};b.toString=function(){return"[MouseEvent (type="+this.type+" stageX="+this.stageX+" stageY="+this.stageY+")]"};createjs.MouseEvent=c})();this.createjs=this.createjs||{};
(function(){var c=function(a,l,b,d,e,c){this.initialize(a,l,b,d,e,c)},b=c.prototype;c.identity=null;c.DEG_TO_RAD=Math.PI/180;b.a=1;b.b=0;b.c=0;b.d=1;b.tx=0;b.ty=0;b.alpha=1;b.shadow=null;b.compositeOperation=null;b.initialize=function(a,l,b,d,e,c){if(a!=null)this.a=a;this.b=l||0;this.c=b||0;if(d!=null)this.d=d;this.tx=e||0;this.ty=c||0;return this};b.prepend=function(a,l,b,d,e,c){var g=this.tx;if(a!=1||l!=0||b!=0||d!=1){var i=this.a,j=this.c;this.a=i*a+this.b*b;this.b=i*l+this.b*d;this.c=j*a+this.d*
b;this.d=j*l+this.d*d}this.tx=g*a+this.ty*b+e;this.ty=g*l+this.ty*d+c;return this};b.append=function(a,l,b,d,e,c){var g=this.a,i=this.b,j=this.c,k=this.d;this.a=a*g+l*j;this.b=a*i+l*k;this.c=b*g+d*j;this.d=b*i+d*k;this.tx=e*g+c*j+this.tx;this.ty=e*i+c*k+this.ty;return this};b.prependMatrix=function(a){this.prepend(a.a,a.b,a.c,a.d,a.tx,a.ty);this.prependProperties(a.alpha,a.shadow,a.compositeOperation);return this};b.appendMatrix=function(a){this.append(a.a,a.b,a.c,a.d,a.tx,a.ty);this.appendProperties(a.alpha,
a.shadow,a.compositeOperation);return this};b.prependTransform=function(a,l,b,d,e,f,g,i,j){if(e%360)var k=e*c.DEG_TO_RAD,e=Math.cos(k),k=Math.sin(k);else e=1,k=0;if(i||j)this.tx-=i,this.ty-=j;f||g?(f*=c.DEG_TO_RAD,g*=c.DEG_TO_RAD,this.prepend(e*b,k*b,-k*d,e*d,0,0),this.prepend(Math.cos(g),Math.sin(g),-Math.sin(f),Math.cos(f),a,l)):this.prepend(e*b,k*b,-k*d,e*d,a,l);return this};b.appendTransform=function(a,l,b,d,e,f,g,i,j){if(e%360)var k=e*c.DEG_TO_RAD,e=Math.cos(k),k=Math.sin(k);else e=1,k=0;f||
g?(f*=c.DEG_TO_RAD,g*=c.DEG_TO_RAD,this.append(Math.cos(g),Math.sin(g),-Math.sin(f),Math.cos(f),a,l),this.append(e*b,k*b,-k*d,e*d,0,0)):this.append(e*b,k*b,-k*d,e*d,a,l);if(i||j)this.tx-=i*this.a+j*this.c,this.ty-=i*this.b+j*this.d;return this};b.rotate=function(a){var l=Math.cos(a),a=Math.sin(a),b=this.a,d=this.c,c=this.tx;this.a=b*l-this.b*a;this.b=b*a+this.b*l;this.c=d*l-this.d*a;this.d=d*a+this.d*l;this.tx=c*l-this.ty*a;this.ty=c*a+this.ty*l;return this};b.skew=function(a,l){a*=c.DEG_TO_RAD;l*=
c.DEG_TO_RAD;this.append(Math.cos(l),Math.sin(l),-Math.sin(a),Math.cos(a),0,0);return this};b.scale=function(a,l){this.a*=a;this.d*=l;this.tx*=a;this.ty*=l;return this};b.translate=function(a,l){this.tx+=a;this.ty+=l;return this};b.identity=function(){this.alpha=this.a=this.d=1;this.b=this.c=this.tx=this.ty=0;this.shadow=this.compositeOperation=null;return this};b.invert=function(){var a=this.a,l=this.b,b=this.c,d=this.d,c=this.tx,f=a*d-l*b;this.a=d/f;this.b=-l/f;this.c=-b/f;this.d=a/f;this.tx=(b*
this.ty-d*c)/f;this.ty=-(a*this.ty-l*c)/f;return this};b.isIdentity=function(){return this.tx==0&&this.ty==0&&this.a==1&&this.b==0&&this.c==0&&this.d==1};b.decompose=function(a){a==null&&(a={});a.x=this.tx;a.y=this.ty;a.scaleX=Math.sqrt(this.a*this.a+this.b*this.b);a.scaleY=Math.sqrt(this.c*this.c+this.d*this.d);var b=Math.atan2(-this.c,this.d),h=Math.atan2(this.b,this.a);b==h?(a.rotation=h/c.DEG_TO_RAD,this.a<0&&this.d>=0&&(a.rotation+=a.rotation<=0?180:-180),a.skewX=a.skewY=0):(a.skewX=b/c.DEG_TO_RAD,
a.skewY=h/c.DEG_TO_RAD);return a};b.reinitialize=function(a,b,h,d,c,f,g,i,j){this.initialize(a,b,h,d,c,f);this.alpha=g||1;this.shadow=i;this.compositeOperation=j;return this};b.appendProperties=function(a,b,h){this.alpha*=a;this.shadow=b||this.shadow;this.compositeOperation=h||this.compositeOperation;return this};b.prependProperties=function(a,b,h){this.alpha*=a;this.shadow=this.shadow||b;this.compositeOperation=this.compositeOperation||h;return this};b.clone=function(){var a=new c(this.a,this.b,
this.c,this.d,this.tx,this.ty);a.shadow=this.shadow;a.alpha=this.alpha;a.compositeOperation=this.compositeOperation;return a};b.toString=function(){return"[Matrix2D (a="+this.a+" b="+this.b+" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]"};c.identity=new c(1,0,0,1,0,0);createjs.Matrix2D=c})();this.createjs=this.createjs||{};(function(){var c=function(a,b){this.initialize(a,b)},b=c.prototype;b.x=0;b.y=0;b.initialize=function(a,b){this.x=a==null?0:a;this.y=b==null?0:b};b.clone=function(){return new c(this.x,this.y)};b.toString=function(){return"[Point (x="+this.x+" y="+this.y+")]"};createjs.Point=c})();this.createjs=this.createjs||{};(function(){var c=function(a,b,h,d){this.initialize(a,b,h,d)},b=c.prototype;b.x=0;b.y=0;b.width=0;b.height=0;b.initialize=function(a,b,h,d){this.x=a==null?0:a;this.y=b==null?0:b;this.width=h==null?0:h;this.height=d==null?0:d};b.clone=function(){return new c(this.x,this.y,this.width,this.height)};b.toString=function(){return"[Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")]"};createjs.Rectangle=c})();this.createjs=this.createjs||{};(function(){var c=function(a,b,h,d){this.initialize(a,b,h,d)},b=c.prototype;c.identity=null;b.color=null;b.offsetX=0;b.offsetY=0;b.blur=0;b.initialize=function(a,b,h,d){this.color=a;this.offsetX=b;this.offsetY=h;this.blur=d};b.toString=function(){return"[Shadow]"};b.clone=function(){return new c(this.color,this.offsetX,this.offsetY,this.blur)};c.identity=new c("transparent",0,0,0);createjs.Shadow=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype;b.complete=true;b.onComplete=null;b._animations=null;b._frames=null;b._images=null;b._data=null;b._loadCount=0;b._frameHeight=0;b._frameWidth=0;b._numFrames=0;b._regX=0;b._regY=0;b.initialize=function(a){var b,h,d;if(a!=null){if(a.images&&(h=a.images.length)>0){d=this._images=[];for(b=0;b<h;b++){var c=a.images[b];if(typeof c=="string"){var f=c,c=new Image;c.src=f}d.push(c);if(!c.getContext&&!c.complete)this._loadCount++,this.complete=
false,function(a){c.onload=function(){a._handleImageLoad()}}(this)}}if(a.frames!=null)if(a.frames instanceof Array){this._frames=[];d=a.frames;for(b=0,h=d.length;b<h;b++)f=d[b],this._frames.push({image:this._images[f[4]?f[4]:0],rect:new createjs.Rectangle(f[0],f[1],f[2],f[3]),regX:f[5]||0,regY:f[6]||0})}else h=a.frames,this._frameWidth=h.width,this._frameHeight=h.height,this._regX=h.regX||0,this._regY=h.regY||0,this._numFrames=h.count,this._loadCount==0&&this._calculateFrames();if((h=a.animations)!=
null){this._animations=[];this._data={};for(var g in h){a={name:g};f=h[g];if(isNaN(f))if(f instanceof Array){a.frequency=f[3];a.next=f[2];d=a.frames=[];for(b=f[0];b<=f[1];b++)d.push(b)}else a.frequency=f.frequency,a.next=f.next,b=f.frames,d=a.frames=!isNaN(b)?[b]:b.slice(0);else d=a.frames=[f];a.next=d.length<2||a.next==false?null:a.next==null||a.next==true?g:a.next;if(!a.frequency)a.frequency=1;this._animations.push(g);this._data[g]=a}}}};b.getNumFrames=function(a){return a==null?this._frames?this._frames.length:
this._numFrames:(a=this._data[a],a==null?0:a.frames.length)};b.getAnimations=function(){return this._animations.slice(0)};b.getAnimation=function(a){return this._data[a]};b.getFrame=function(a){return this.complete&&this._frames&&(frame=this._frames[a])?frame:null};b.toString=function(){return"[SpriteSheet]"};b.clone=function(){var a=new c;a.complete=this.complete;a._animations=this._animations;a._frames=this._frames;a._images=this._images;a._data=this._data;a._frameHeight=this._frameHeight;a._frameWidth=
this._frameWidth;a._numFrames=this._numFrames;a._loadCount=this._loadCount;return a};b._handleImageLoad=function(){if(--this._loadCount==0)this._calculateFrames(),this.complete=true,this.onComplete&&this.onComplete()};b._calculateFrames=function(){if(!(this._frames||this._frameWidth==0)){this._frames=[];for(var a=0,b=this._frameWidth,h=this._frameHeight,d=0,c=this._images;d<c.length;d++){for(var f=c[d],g=(f.width+1)/b|0,i=(f.height+1)/h|0,i=this._numFrames>0?Math.min(this._numFrames-a,g*i):g*i,j=
0;j<i;j++)this._frames.push({image:f,rect:new createjs.Rectangle(j%g*b,(j/g|0)*h,b,h),regX:this._regX,regY:this._regY});a+=i}this._numFrames=a}};createjs.SpriteSheet=c})();this.createjs=this.createjs||{};
(function(){function c(a,b,d){this.f=a;this.params=b;this.path=d==null?true:d}c.prototype.exec=function(a){this.f.apply(a,this.params)};var b=function(){this.initialize()},a=b.prototype;b.getRGB=function(a,b,d,c){a!=null&&d==null&&(c=b,d=a&255,b=a>>8&255,a=a>>16&255);return c==null?"rgb("+a+","+b+","+d+")":"rgba("+a+","+b+","+d+","+c+")"};b.getHSL=function(a,b,c,e){return e==null?"hsl("+a%360+","+b+"%,"+c+"%)":"hsla("+a%360+","+b+"%,"+c+"%,"+e+")"};b.BASE_64={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,
K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63};b.STROKE_CAPS_MAP=["butt","round","square"];b.STROKE_JOINTS_MAP=["miter","round","bevel"];b._ctx=(createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")).getContext("2d");b.beginCmd=new c(b._ctx.beginPath,
[],false);b.fillCmd=new c(b._ctx.fill,[],false);b.strokeCmd=new c(b._ctx.stroke,[],false);a._strokeInstructions=null;a._strokeStyleInstructions=null;a._fillInstructions=null;a._instructions=null;a._oldInstructions=null;a._activeInstructions=null;a._active=false;a._dirty=false;a.initialize=function(){this.clear();this._ctx=b._ctx};a.draw=function(a){this._dirty&&this._updateInstructions();for(var b=this._instructions,c=0,e=b.length;c<e;c++)b[c].exec(a)};a.drawAsPath=function(a){this._dirty&&this._updateInstructions();
for(var b,c=this._instructions,e=0,f=c.length;e<f;e++)((b=c[e]).path||e==0)&&b.exec(a)};a.moveTo=function(a,b){this._activeInstructions.push(new c(this._ctx.moveTo,[a,b]));return this};a.lineTo=function(a,b){this._dirty=this._active=true;this._activeInstructions.push(new c(this._ctx.lineTo,[a,b]));return this};a.arcTo=function(a,b,d,e,f){this._dirty=this._active=true;this._activeInstructions.push(new c(this._ctx.arcTo,[a,b,d,e,f]));return this};a.arc=function(a,b,d,e,f,g){this._dirty=this._active=
true;g==null&&(g=false);this._activeInstructions.push(new c(this._ctx.arc,[a,b,d,e,f,g]));return this};a.quadraticCurveTo=function(a,b,d,e){this._dirty=this._active=true;this._activeInstructions.push(new c(this._ctx.quadraticCurveTo,[a,b,d,e]));return this};a.bezierCurveTo=function(a,b,d,e,f,g){this._dirty=this._active=true;this._activeInstructions.push(new c(this._ctx.bezierCurveTo,[a,b,d,e,f,g]));return this};a.rect=function(a,b,d,e){this._dirty=this._active=true;this._activeInstructions.push(new c(this._ctx.rect,
[a,b,d,e]));return this};a.closePath=function(){if(this._active)this._dirty=true,this._activeInstructions.push(new c(this._ctx.closePath,[]));return this};a.clear=function(){this._instructions=[];this._oldInstructions=[];this._activeInstructions=[];this._strokeStyleInstructions=this._strokeInstructions=this._fillInstructions=null;this._active=this._dirty=false;return this};a.beginFill=function(a){this._active&&this._newPath();this._fillInstructions=a?[new c(this._setProp,["fillStyle",a],false)]:null;
return this};a.beginLinearGradientFill=function(a,b,d,e,f,g){this._active&&this._newPath();d=this._ctx.createLinearGradient(d,e,f,g);e=0;for(f=a.length;e<f;e++)d.addColorStop(b[e],a[e]);this._fillInstructions=[new c(this._setProp,["fillStyle",d],false)];return this};a.beginRadialGradientFill=function(a,b,d,e,f,g,i,j){this._active&&this._newPath();d=this._ctx.createRadialGradient(d,e,f,g,i,j);e=0;for(f=a.length;e<f;e++)d.addColorStop(b[e],a[e]);this._fillInstructions=[new c(this._setProp,["fillStyle",
d],false)];return this};a.beginBitmapFill=function(a,b){this._active&&this._newPath();var d=this._ctx.createPattern(a,b||"");this._fillInstructions=[new c(this._setProp,["fillStyle",d],false)];return this};a.endFill=function(){return this.beginFill()};a.setStrokeStyle=function(a,h,d,e){this._active&&this._newPath();this._strokeStyleInstructions=[new c(this._setProp,["lineWidth",a==null?"1":a],false),new c(this._setProp,["lineCap",h==null?"butt":isNaN(h)?h:b.STROKE_CAPS_MAP[h]],false),new c(this._setProp,
["lineJoin",d==null?"miter":isNaN(d)?d:b.STROKE_JOINTS_MAP[d]],false),new c(this._setProp,["miterLimit",e==null?"10":e],false)];return this};a.beginStroke=function(a){this._active&&this._newPath();this._strokeInstructions=a?[new c(this._setProp,["strokeStyle",a],false)]:null;return this};a.beginLinearGradientStroke=function(a,b,d,e,f,g){this._active&&this._newPath();d=this._ctx.createLinearGradient(d,e,f,g);e=0;for(f=a.length;e<f;e++)d.addColorStop(b[e],a[e]);this._strokeInstructions=[new c(this._setProp,
["strokeStyle",d],false)];return this};a.beginRadialGradientStroke=function(a,b,d,e,f,g,i,j){this._active&&this._newPath();d=this._ctx.createRadialGradient(d,e,f,g,i,j);e=0;for(f=a.length;e<f;e++)d.addColorStop(b[e],a[e]);this._strokeInstructions=[new c(this._setProp,["strokeStyle",d],false)];return this};a.beginBitmapStroke=function(a,b){this._active&&this._newPath();var d=this._ctx.createPattern(a,b||"");this._strokeInstructions=[new c(this._setProp,["strokeStyle",d],false)];return this};a.endStroke=
function(){this.beginStroke();return this};a.curveTo=a.quadraticCurveTo;a.drawRect=a.rect;a.drawRoundRect=function(a,b,c,e,f){this.drawRoundRectComplex(a,b,c,e,f,f,f,f);return this};a.drawRoundRectComplex=function(a,b,d,e,f,g,i,j){var k=(d<e?d:e)/2,m=0,o=0,n=0,q=0;f<0&&(f*=m=-1);f>k&&(f=k);g<0&&(g*=o=-1);g>k&&(g=k);i<0&&(i*=n=-1);i>k&&(i=k);j<0&&(j*=q=-1);j>k&&(j=k);this._dirty=this._active=true;var k=this._ctx.arcTo,p=this._ctx.lineTo;this._activeInstructions.push(new c(this._ctx.moveTo,[a+d-g,b]),
new c(k,[a+d+g*o,b-g*o,a+d,b+g,g]),new c(p,[a+d,b+e-i]),new c(k,[a+d+i*n,b+e+i*n,a+d-i,b+e,i]),new c(p,[a+j,b+e]),new c(k,[a-j*q,b+e+j*q,a,b+e-j,j]),new c(p,[a,b+f]),new c(k,[a-f*m,b-f*m,a+f,b,f]),new c(this._ctx.closePath));return this};a.drawCircle=function(a,b,c){this.arc(a,b,c,0,Math.PI*2);return this};a.drawEllipse=function(a,b,d,e){this._dirty=this._active=true;var f=d/2*0.5522848,g=e/2*0.5522848,i=a+d,j=b+e,d=a+d/2,e=b+e/2;this._activeInstructions.push(new c(this._ctx.moveTo,[a,e]),new c(this._ctx.bezierCurveTo,
[a,e-g,d-f,b,d,b]),new c(this._ctx.bezierCurveTo,[d+f,b,i,e-g,i,e]),new c(this._ctx.bezierCurveTo,[i,e+g,d+f,j,d,j]),new c(this._ctx.bezierCurveTo,[d-f,j,a,e+g,a,e]));return this};a.drawPolyStar=function(a,b,d,e,f,g){this._dirty=this._active=true;f==null&&(f=0);f=1-f;g==null?g=0:g/=180/Math.PI;var i=Math.PI/e;this._activeInstructions.push(new c(this._ctx.moveTo,[a+Math.cos(g)*d,b+Math.sin(g)*d]));for(var j=0;j<e;j++)g+=i,f!=1&&this._activeInstructions.push(new c(this._ctx.lineTo,[a+Math.cos(g)*d*
f,b+Math.sin(g)*d*f])),g+=i,this._activeInstructions.push(new c(this._ctx.lineTo,[a+Math.cos(g)*d,b+Math.sin(g)*d]));return this};a.decodePath=function(a){for(var c=[this.moveTo,this.lineTo,this.quadraticCurveTo,this.bezierCurveTo],d=[2,2,4,6],e=0,f=a.length,g=[],i=0,j=0,k=b.BASE_64;e<f;){var m=a.charAt(e),o=k[m],n=o>>3,q=c[n];if(!q||o&3)throw"bad path data (@"+e+"): "+m;m=d[n];n||(i=j=0);g.length=0;e++;o=(o>>2&1)+2;for(n=0;n<m;n++){var p=k[a.charAt(e)],s=p>>5?-1:1,p=(p&31)<<6|k[a.charAt(e+1)];o==
3&&(p=p<<6|k[a.charAt(e+2)]);p=s*p/10;n%2?i=p+=i:j=p+=j;g[n]=p;e+=o}q.apply(this,g)}return this};a.clone=function(){var a=new b;a._instructions=this._instructions.slice();a._activeInstructions=this._activeInstructions.slice();a._oldInstructions=this._oldInstructions.slice();if(this._fillInstructions)a._fillInstructions=this._fillInstructions.slice();if(this._strokeInstructions)a._strokeInstructions=this._strokeInstructions.slice();if(this._strokeStyleInstructions)a._strokeStyleInstructions=this._strokeStyleInstructions.slice();
a._active=this._active;a._dirty=this._dirty;a.drawAsPath=this.drawAsPath;return a};a.toString=function(){return"[Graphics]"};a.mt=a.moveTo;a.lt=a.lineTo;a.at=a.arcTo;a.bt=a.bezierCurveTo;a.qt=a.quadraticCurveTo;a.a=a.arc;a.r=a.rect;a.cp=a.closePath;a.c=a.clear;a.f=a.beginFill;a.lf=a.beginLinearGradientFill;a.rf=a.beginRadialGradientFill;a.bf=a.beginBitmapFill;a.ef=a.endFill;a.ss=a.setStrokeStyle;a.s=a.beginStroke;a.ls=a.beginLinearGradientStroke;a.rs=a.beginRadialGradientStroke;a.bs=a.beginBitmapStroke;
a.es=a.endStroke;a.dr=a.drawRect;a.rr=a.drawRoundRect;a.rc=a.drawRoundRectComplex;a.dc=a.drawCircle;a.de=a.drawEllipse;a.dp=a.drawPolyStar;a.p=a.decodePath;a._updateInstructions=function(){this._instructions=this._oldInstructions.slice();this._instructions.push(b.beginCmd);this._fillInstructions&&this._instructions.push.apply(this._instructions,this._fillInstructions);this._strokeInstructions&&(this._instructions.push.apply(this._instructions,this._strokeInstructions),this._strokeStyleInstructions&&
this._instructions.push.apply(this._instructions,this._strokeStyleInstructions));this._instructions.push.apply(this._instructions,this._activeInstructions);this._fillInstructions&&this._instructions.push(b.fillCmd);this._strokeInstructions&&this._instructions.push(b.strokeCmd)};a._getEllipseArc=function(a,b,d,e){var f=d/2*0.5522848,g=e/2*0.5522848,i=a+d,j=b+e,d=a+d/2,e=b+e/2;this._activeInstructions.push(new c(this._ctx.moveTo,[a,e]),new c(this._ctx.bezierCurveTo,[a,e-g,d-f,b,d,b]),new c(this._ctx.bezierCurveTo,
[d+f,b,i,e-g,i,e]),new c(this._ctx.bezierCurveTo,[i,e+g,d+f,j,d,j]),new c(this._ctx.bezierCurveTo,[d-f,j,a,e+g,a,e]));return this};a._newPath=function(){this._dirty&&this._updateInstructions();this._oldInstructions=this._instructions;this._activeInstructions=[];this._active=this._dirty=false};a._setProp=function(a,b){this[a]=b};createjs.Graphics=b})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},b=c.prototype;c.suppressCrossDomainErrors=false;c._hitTestCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c._hitTestCanvas.width=c._hitTestCanvas.height=1;c._hitTestContext=c._hitTestCanvas.getContext("2d");c._nextCacheID=1;b.alpha=1;b.cacheCanvas=null;b.id=-1;b.mouseEnabled=true;b.name=null;b.parent=null;b.regX=0;b.regY=0;b.rotation=0;b.scaleX=1;b.scaleY=1;b.skewX=0;b.skewY=0;b.shadow=null;b.visible=true;b.x=0;
b.y=0;b.compositeOperation=null;b.snapToPixel=false;b.onPress=null;b.onClick=null;b.onDoubleClick=null;b.onMouseOver=null;b.onMouseOut=null;b.onTick=null;b.filters=null;b.cacheID=0;b.mask=null;b.hitArea=null;b._cacheOffsetX=0;b._cacheOffsetY=0;b._cacheScale=1;b._cacheDataURLID=0;b._cacheDataURL=null;b._matrix=null;b.initialize=function(){this.id=createjs.UID.get();this._matrix=new createjs.Matrix2D};b.isVisible=function(){return this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0};b.draw=function(a,
b){var c=this.cacheCanvas;if(b||!c)return false;var d=this._cacheScale;a.drawImage(c,this._cacheOffsetX,this._cacheOffsetY,c.width/d,c.height/d);return true};b.updateContext=function(a){var b,c=this.mask;c&&c.graphics&&(b=c.getMatrix(c._matrix),a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty),c.graphics.drawAsPath(a),a.clip(),b.invert(),a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty));b=this._matrix.identity().appendTransform(this.x,this.y,this.scaleX,this.scaleY,this.rotation,this.skewX,this.skewY,this.regX,this.regY);
createjs.Stage._snapToPixelEnabled&&this.snapToPixel?a.transform(b.a,b.b,b.c,b.d,b.tx+0.5|0,b.ty+0.5|0):a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty);a.globalAlpha*=this.alpha;if(this.compositeOperation)a.globalCompositeOperation=this.compositeOperation;this.shadow&&this._applyShadow(a,this.shadow)};b.cache=function(a,b,c,d,e){e=e||1;if(!this.cacheCanvas)this.cacheCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");this.cacheCanvas.width=Math.ceil(c*e);this.cacheCanvas.height=
Math.ceil(d*e);this._cacheOffsetX=a;this._cacheOffsetY=b;this._cacheScale=e||1;this.updateCache()};b.updateCache=function(a){var b=this.cacheCanvas,h=this._cacheOffsetX,d=this._cacheOffsetY,e=this._cacheScale;if(!b)throw"cache() must be called before updateCache()";var f=b.getContext("2d");f.save();a||f.clearRect(0,0,b.width,b.height);f.globalCompositeOperation=a;f.setTransform(e,0,0,e,-h,-d);this.draw(f,true);this._applyFilters();f.restore();this.cacheID=c._nextCacheID++};b.uncache=function(){this._cacheDataURL=
this.cacheCanvas=null;this.cacheID=this._cacheOffsetX=this._cacheOffsetY=0;this._cacheScale=1};b.getCacheDataURL=function(){if(!this.cacheCanvas)return null;if(this.cacheID!=this._cacheDataURLID)this._cacheDataURL=this.cacheCanvas.toDataURL();return this._cacheDataURL};b.getStage=function(){for(var a=this;a.parent;)a=a.parent;return a instanceof createjs.Stage?a:null};b.localToGlobal=function(a,b){var c=this.getConcatenatedMatrix(this._matrix);if(c==null)return null;c.append(1,0,0,1,a,b);return new createjs.Point(c.tx,
c.ty)};b.globalToLocal=function(a,b){var c=this.getConcatenatedMatrix(this._matrix);if(c==null)return null;c.invert();c.append(1,0,0,1,a,b);return new createjs.Point(c.tx,c.ty)};b.localToLocal=function(a,b,c){a=this.localToGlobal(a,b);return c.globalToLocal(a.x,a.y)};b.setTransform=function(a,b,c,d,e,f,g,i,j){this.x=a||0;this.y=b||0;this.scaleX=c==null?1:c;this.scaleY=d==null?1:d;this.rotation=e||0;this.skewX=f||0;this.skewY=g||0;this.regX=i||0;this.regY=j||0;return this};b.getMatrix=function(a){return(a?
a.identity():new createjs.Matrix2D).appendTransform(this.x,this.y,this.scaleX,this.scaleY,this.rotation,this.skewX,this.skewY,this.regX,this.regY).appendProperties(this.alpha,this.shadow,this.compositeOperation)};b.getConcatenatedMatrix=function(a){a?a.identity():a=new createjs.Matrix2D;for(var b=this;b!=null;)a.prependTransform(b.x,b.y,b.scaleX,b.scaleY,b.rotation,b.skewX,b.skewY,b.regX,b.regY).prependProperties(b.alpha,b.shadow,b.compositeOperation),b=b.parent;return a};b.hitTest=function(a,b){var h=
c._hitTestContext,d=c._hitTestCanvas;h.setTransform(1,0,0,1,-a,-b);this.draw(h);h=this._testHit(h);d.width=0;d.width=1;return h};b.clone=function(){var a=new c;this.cloneProps(a);return a};b.toString=function(){return"[DisplayObject (name="+this.name+")]"};b.cloneProps=function(a){a.alpha=this.alpha;a.name=this.name;a.regX=this.regX;a.regY=this.regY;a.rotation=this.rotation;a.scaleX=this.scaleX;a.scaleY=this.scaleY;a.shadow=this.shadow;a.skewX=this.skewX;a.skewY=this.skewY;a.visible=this.visible;
a.x=this.x;a.y=this.y;a.mouseEnabled=this.mouseEnabled;a.compositeOperation=this.compositeOperation;if(this.cacheCanvas)a.cacheCanvas=this.cacheCanvas.cloneNode(true),a.cacheCanvas.getContext("2d").putImageData(this.cacheCanvas.getContext("2d").getImageData(0,0,this.cacheCanvas.width,this.cacheCanvas.height),0,0)};b._applyShadow=function(a,b){b=b||Shadow.identity;a.shadowColor=b.color;a.shadowOffsetX=b.offsetX;a.shadowOffsetY=b.offsetY;a.shadowBlur=b.blur};b._tick=function(a){if(this.onTick)if(a)this.onTick.apply(this,
a);else this.onTick()};b._testHit=function(a){try{var b=a.getImageData(0,0,1,1).data[3]>1}catch(h){if(!c.suppressCrossDomainErrors)throw"An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";}return b};b._applyFilters=function(){if(this.filters&&this.filters.length!=0&&this.cacheCanvas)for(var a=this.filters.length,b=this.cacheCanvas.getContext("2d"),c=this.cacheCanvas.width,d=this.cacheCanvas.height,e=0;e<a;e++)this.filters[e].applyFilter(b,
0,0,c,d)};createjs.DisplayObject=c})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},b=c.prototype=new createjs.DisplayObject;b.children=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(){this.DisplayObject_initialize();this.children=[]};b.isVisible=function(){return this.visible&&this.alpha>0&&this.children.length&&this.scaleX!=0&&this.scaleY!=0};b.DisplayObject_draw=b.draw;b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return true;for(var c=this.children.slice(0),d=0,e=c.length;d<e;d++){var f=c[d];f.isVisible()&&
(a.save(),f.updateContext(a),f.draw(a),a.restore())}return true};b.addChild=function(a){if(a==null)return a;var b=arguments.length;if(b>1){for(var c=0;c<b;c++)this.addChild(arguments[c]);return arguments[b-1]}a.parent&&a.parent.removeChild(a);a.parent=this;this.children.push(a);return a};b.addChildAt=function(a,b){var c=arguments.length,d=arguments[c-1];if(d<0||d>this.children.length)return arguments[c-2];if(c>2){for(var e=0;e<c-1;e++)this.addChildAt(arguments[e],d+e);return arguments[c-2]}a.parent&&
a.parent.removeChild(a);a.parent=this;this.children.splice(b,0,a);return a};b.removeChild=function(a){var b=arguments.length;if(b>1){for(var c=true,d=0;d<b;d++)c=c&&this.removeChild(arguments[d]);return c}return this.removeChildAt(this.children.indexOf(a))};b.removeChildAt=function(a){var b=arguments.length;if(b>1){for(var c=[],d=0;d<b;d++)c[d]=arguments[d];c.sort(function(a,b){return b-a});for(var e=true,d=0;d<b;d++)e=e&&this.removeChildAt(c[d]);return e}if(a<0||a>this.children.length-1)return false;
if(b=this.children[a])b.parent=null;this.children.splice(a,1);return true};b.removeAllChildren=function(){for(var a=this.children;a.length;)a.pop().parent=null};b.getChildAt=function(a){return this.children[a]};b.sortChildren=function(a){this.children.sort(a)};b.getChildIndex=function(a){return this.children.indexOf(a)};b.getNumChildren=function(){return this.children.length};b.swapChildrenAt=function(a,b){var c=this.children,d=c[a],e=c[b];d&&e&&(c[a]=e,c[b]=d)};b.swapChildren=function(a,b){for(var c=
this.children,d,e,f=0,g=c.length;f<g;f++)if(c[f]==a&&(d=f),c[f]==b&&(e=f),d!=null&&e!=null)break;f!=g&&(c[d]=b,c[e]=a)};b.setChildIndex=function(a,b){var c=this.children,d=c.length;if(!(a.parent!=this||b<0||b>=d)){for(var e=0;e<d;e++)if(c[e]==a)break;e==d||e==b||(c.splice(e,1),b<e&&b--,c.splice(b,0,a))}};b.contains=function(a){for(;a;){if(a==this)return true;a=a.parent}return false};b.hitTest=function(a,b){return this.getObjectUnderPoint(a,b)!=null};b.getObjectsUnderPoint=function(a,b){var c=[],d=
this.localToGlobal(a,b);this._getObjectsUnderPoint(d.x,d.y,c);return c};b.getObjectUnderPoint=function(a,b){var c=this.localToGlobal(a,b);return this._getObjectsUnderPoint(c.x,c.y)};b.clone=function(a){var b=new c;this.cloneProps(b);if(a)for(var h=b.children=[],d=0,e=this.children.length;d<e;d++){var f=this.children[d].clone(a);f.parent=b;h.push(f)}return b};b.toString=function(){return"[Container (name="+this.name+")]"};b.DisplayObject__tick=b._tick;b._tick=function(a){for(var b=this.children.length-
1;b>=0;b--){var c=this.children[b];c._tick&&c._tick(a)}this.DisplayObject__tick(a)};b._getObjectsUnderPoint=function(a,b,h,d){var e=createjs.DisplayObject._hitTestContext,f=createjs.DisplayObject._hitTestCanvas,g=this._matrix,i=d&1&&(this.onPress||this.onClick||this.onDoubleClick)||d&2&&(this.onMouseOver||this.onMouseOut);if(this.cacheCanvas&&i&&(this.getConcatenatedMatrix(g),e.setTransform(g.a,g.b,g.c,g.d,g.tx-a,g.ty-b),e.globalAlpha=g.alpha,this.draw(e),this._testHit(e)))return f.width=0,f.width=
1,this;for(var j=this.children.length-1;j>=0;j--){var k=this.children[j];if(k.isVisible()&&k.mouseEnabled)if(k instanceof c)if(i){if(k=k._getObjectsUnderPoint(a,b))return this}else{if(k=k._getObjectsUnderPoint(a,b,h,d),!h&&k)return k}else if(!d||i||d&1&&(k.onPress||k.onClick||k.onDoubleClick)||d&2&&(k.onMouseOver||k.onMouseOut)){var m=k.hitArea;k.getConcatenatedMatrix(g);m&&(g.appendTransform(m.x+k.regX,m.y+k.regY,m.scaleX,m.scaleY,m.rotation,m.skewX,m.skewY,m.regX,m.regY),g.alpha*=m.alpha/k.alpha);
e.globalAlpha=g.alpha;e.setTransform(g.a,g.b,g.c,g.d,g.tx-a,g.ty-b);(m||k).draw(e);if(this._testHit(e))if(f.width=0,f.width=1,i)return this;else if(h)h.push(k);else return k}}return null};createjs.Container=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype=new createjs.Container;c._snapToPixelEnabled=false;b.autoClear=true;b.canvas=null;b.mouseX=0;b.mouseY=0;b.onMouseMove=null;b.onMouseUp=null;b.onMouseDown=null;b.snapToPixelEnabled=false;b.mouseInBounds=false;b.tickOnUpdate=true;b.mouseMoveOutside=false;b._pointerData=null;b._pointerCount=0;b._primaryPointerID=null;b._mouseOverIntervalID=null;b.Container_initialize=b.initialize;b.initialize=function(a){this.Container_initialize();this.canvas=
a instanceof HTMLCanvasElement?a:document.getElementById(a);this._pointerData={};this._enableMouseEvents(true)};b.update=function(){if(this.canvas){this.autoClear&&this.clear();c._snapToPixelEnabled=this.snapToPixelEnabled;this.tickOnUpdate&&this._tick(arguments.length?arguments:null);var a=this.canvas.getContext("2d");a.save();this.updateContext(a);this.draw(a,false);a.restore()}};b.tick=b.update;b.clear=function(){if(this.canvas){var a=this.canvas.getContext("2d");a.setTransform(1,0,0,1,0,0);a.clearRect(0,
0,this.canvas.width,this.canvas.height)}};b.toDataURL=function(a,b){b||(b="image/png");var c=this.canvas.getContext("2d"),d=this.canvas.width,e=this.canvas.height,f;if(a){f=c.getImageData(0,0,d,e);var g=c.globalCompositeOperation;c.globalCompositeOperation="destination-over";c.fillStyle=a;c.fillRect(0,0,d,e)}var i=this.canvas.toDataURL(b);if(a)c.clearRect(0,0,d,e),c.putImageData(f,0,0),c.globalCompositeOperation=g;return i};b.enableMouseOver=function(a){if(this._mouseOverIntervalID)clearInterval(this._mouseOverIntervalID),
this._mouseOverIntervalID=null;if(a==null)a=20;else if(a<=0)return;var b=this;this._mouseOverIntervalID=setInterval(function(){b._testMouseOver()},1E3/Math.min(50,a))};b.clone=function(){var a=new c(null);this.cloneProps(a);return a};b.toString=function(){return"[Stage (name="+this.name+")]"};b._enableMouseEvents=function(){var a=this,b=window.addEventListener?window:document;b.addEventListener("mouseup",function(b){a._handleMouseUp(b)},false);b.addEventListener("mousemove",function(b){a._handleMouseMove(b)},
false);b.addEventListener("dblclick",function(b){a._handleDoubleClick(b)},false);this.canvas&&this.canvas.addEventListener("mousedown",function(b){a._handleMouseDown(b)},false)};b._getPointerData=function(a){var b=this._pointerData[a];if(!b&&(b=this._pointerData[a]={x:0,y:0},this._primaryPointerID==null))this._primaryPointerID=a;return b};b._handleMouseMove=function(a){if(!a)a=window.event;this._handlePointerMove(-1,a,a.pageX,a.pageY)};b._handlePointerMove=function(a,b,c,d){if(this.canvas){var e=
this._getPointerData(a),f=e.inBounds;this._updatePointerPosition(a,c,d);if(f||e.inBounds||this.mouseMoveOutside){a=new createjs.MouseEvent("onMouseMove",e.x,e.y,this,b,a,a==this._primaryPointerID,e.rawX,e.rawY);if(this.onMouseMove)this.onMouseMove(a);if(e.event&&e.event.onMouseMove)a=a.clone(),a.target=e.event.target,e.event.onMouseMove(a)}}};b._updatePointerPosition=function(a,b,c){var d=this._getElementRect(this.canvas);b-=d.left;c-=d.top;var e=this.canvas.width,f=this.canvas.height;b/=(d.right-
d.left)/e;c/=(d.bottom-d.top)/f;d=this._getPointerData(a);if(d.inBounds=b>=0&&c>=0&&b<=e-1&&c<=f-1)d.x=b,d.y=c;else if(this.mouseMoveOutside)d.x=b<0?0:b>e-1?e-1:b,d.y=c<0?0:c>f-1?f-1:c;d.rawX=b;d.rawY=c;if(a==this._primaryPointerID)this.mouseX=d.x,this.mouseY=d.y,this.mouseInBounds=d.inBounds};b._getElementRect=function(a){var b=a.getBoundingClientRect(),c=(window.pageXOffset||document.scrollLeft||0)-(document.clientLeft||document.body.clientLeft||0),d=(window.pageYOffset||document.scrollTop||0)-
(document.clientTop||document.body.clientTop||0),e=window.getComputedStyle?getComputedStyle(a):a.currentStyle,a=parseInt(e.paddingLeft)+parseInt(e.borderLeftWidth),f=parseInt(e.paddingTop)+parseInt(e.borderTopWidth),g=parseInt(e.paddingRight)+parseInt(e.borderRightWidth),e=parseInt(e.paddingBottom)+parseInt(e.borderBottomWidth);return{left:b.left+c+a,right:b.right+c-g,top:b.top+d+f,bottom:b.bottom+d-e}};b._handleMouseUp=function(a){this._handlePointerUp(-1,a,false)};b._handlePointerUp=function(a,
b,c){var d=this._getPointerData(a),e=new createjs.MouseEvent("onMouseUp",d.x,d.y,this,b,a,a==this._primaryPointerID,d.rawX,d.rawY);if(this.onMouseUp)this.onMouseUp(e);if(d.event&&d.event.onMouseUp)e=e.clone(),e.target=d.event.target,d.event.onMouseUp(e);if(d.target&&d.target.onClick&&this._getObjectsUnderPoint(d.x,d.y,null,true,this._mouseOverIntervalID?3:1)==d.target)d.target.onClick(new createjs.MouseEvent("onClick",d.x,d.y,d.target,b,a,a==this._primaryPointerID,d.rawX,d.rawY));if(c){if(a==this._primaryPointerID)this._primaryPointerID=
null;delete this._pointerData[a]}else d.event=d.target=null};b._handleMouseDown=function(a){this._handlePointerDown(-1,a,false)};b._handlePointerDown=function(a,b,c,d){var e=this._getPointerData(a);d!=null&&this._updatePointerPosition(a,c,d);if(this.onMouseDown)this.onMouseDown(new createjs.MouseEvent("onMouseDown",e.x,e.y,this,b,a,a==this._primaryPointerID,e.rawX,e.rawY));if(c=this._getObjectsUnderPoint(e.x,e.y,null,this._mouseOverIntervalID?3:1)){if(c.onPress&&(a=new createjs.MouseEvent("onPress",
e.x,e.y,c,b,a,a==this._primaryPointerID,e.rawX,e.rawY),c.onPress(a),a.onMouseMove||a.onMouseUp))e.event=a;e.target=c}};b._testMouseOver=function(){if(this._primaryPointerID==-1&&!(this.mouseX==this._mouseOverX&&this.mouseY==this._mouseOverY&&this.mouseInBounds)){var a=null;if(this.mouseInBounds)a=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,3),this._mouseOverX=this.mouseX,this._mouseOverY=this.mouseY;if(this._mouseOverTarget!=a){if(this._mouseOverTarget&&this._mouseOverTarget.onMouseOut)this._mouseOverTarget.onMouseOut(new createjs.MouseEvent("onMouseOut",
this.mouseX,this.mouseY,this._mouseOverTarget));if(a&&a.onMouseOver)a.onMouseOver(new createjs.MouseEvent("onMouseOver",this.mouseX,this.mouseY,a));this._mouseOverTarget=a}}};b._handleDoubleClick=function(a){if(this.onDoubleClick)this.onDoubleClick(new createjs.MouseEvent("onDoubleClick",this.mouseX,this.mouseY,this,a,-1,true));var b=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,this._mouseOverIntervalID?3:1);if(b&&b.onDoubleClick)b.onDoubleClick(new createjs.MouseEvent("onDoubleClick",
this.mouseX,this.mouseY,b,a,-1,true))};createjs.Stage=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype=new createjs.DisplayObject;b.image=null;b.snapToPixel=true;b.sourceRect=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(a){this.DisplayObject_initialize();typeof a=="string"?(this.image=new Image,this.image.src=a):this.image=a};b.isVisible=function(){return this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0&&this.image&&(this.image.complete||this.image.getContext||this.image.readyState>=2)};b.DisplayObject_draw=
b.draw;b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return true;var c=this.sourceRect;c?a.drawImage(this.image,c.x,c.y,c.width,c.height,0,0,c.width,c.height):a.drawImage(this.image,0,0);return true};b.clone=function(){var a=new c(this.image);this.cloneProps(a);return a};b.toString=function(){return"[Bitmap (name="+this.name+")]"};createjs.Bitmap=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype=new createjs.DisplayObject;b.onAnimationEnd=null;b.currentFrame=-1;b.currentAnimation=null;b.paused=true;b.spriteSheet=null;b.snapToPixel=true;b.offset=0;b.currentAnimationFrame=0;b._advanceCount=0;b._animation=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(a){this.DisplayObject_initialize();this.spriteSheet=a};b.isVisible=function(){return this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0&&this.spriteSheet.complete&&
this.currentFrame>=0};b.DisplayObject_draw=b.draw;b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return true;this._normalizeFrame();var c=this.spriteSheet.getFrame(this.currentFrame);if(c!=null){var d=c.rect;a.drawImage(c.image,d.x,d.y,d.width,d.height,-c.regX,-c.regY,d.width,d.height);return true}};b.play=function(){this.paused=false};b.stop=function(){this.paused=true};b.gotoAndPlay=function(a){this.paused=false;this._goto(a)};b.gotoAndStop=function(a){this.paused=true;this._goto(a)};b.advance=
function(){this._animation?this.currentAnimationFrame++:this.currentFrame++;this._normalizeFrame()};b.clone=function(){var a=new c(this.spriteSheet);this.cloneProps(a);return a};b.toString=function(){return"[BitmapAnimation (name="+this.name+")]"};b.DisplayObject__tick=b._tick;b._tick=function(a){var b=this._animation?this._animation.frequency:1;!this.paused&&(++this._advanceCount+this.offset)%b==0&&this.advance();this.DisplayObject__tick(a)};b._normalizeFrame=function(){var a=this._animation;if(a)if(this.currentAnimationFrame>=
a.frames.length){if(a.next?this._goto(a.next):(this.paused=true,this.currentAnimationFrame=a.frames.length-1,this.currentFrame=a.frames[this.currentAnimationFrame]),this.onAnimationEnd)this.onAnimationEnd(this,a.name)}else this.currentFrame=a.frames[this.currentAnimationFrame];else if(this.currentFrame>=this.spriteSheet.getNumFrames()&&(this.currentFrame=0,this.onAnimationEnd))this.onAnimationEnd(this,null)};b.DisplayObject_cloneProps=b.cloneProps;b.cloneProps=function(a){this.DisplayObject_cloneProps(a);
a.onAnimationEnd=this.onAnimationEnd;a.currentFrame=this.currentFrame;a.currentAnimation=this.currentAnimation;a.paused=this.paused;a.offset=this.offset;a._animation=this._animation;a.currentAnimationFrame=this.currentAnimationFrame};b._goto=function(a){if(isNaN(a)){var b=this.spriteSheet.getAnimation(a);if(b)this.currentAnimationFrame=0,this._animation=b,this.currentAnimation=a,this._normalizeFrame()}else this.currentAnimation=this._animation=null,this.currentFrame=a};createjs.BitmapAnimation=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype=new createjs.DisplayObject;b.graphics=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(a){this.DisplayObject_initialize();this.graphics=a?a:new createjs.Graphics};b.isVisible=function(){return Boolean(this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0&&this.graphics)};b.DisplayObject_draw=b.draw;b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return true;this.graphics.draw(a);return true};b.clone=function(a){a=
new c(a&&this.graphics?this.graphics.clone():this.graphics);this.cloneProps(a);return a};b.toString=function(){return"[Shape (name="+this.name+")]"};createjs.Shape=c})();this.createjs=this.createjs||{};
(function(){var c=function(a,b,c){this.initialize(a,b,c)},b=c.prototype=new createjs.DisplayObject;c._workingContext=(createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")).getContext("2d");b.text="";b.font=null;b.color="#000";b.textAlign="left";b.textBaseline="top";b.maxWidth=null;b.outline=false;b.lineHeight=0;b.lineWidth=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(a,b,c){this.DisplayObject_initialize();this.text=a;this.font=b;this.color=c?c:"#000"};
b.isVisible=function(){return Boolean(this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0&&this.text!=null&&this.text!=="")};b.DisplayObject_draw=b.draw;b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return true;this.outline?a.strokeStyle=this.color:a.fillStyle=this.color;a.font=this.font;a.textAlign=this.textAlign||"start";a.textBaseline=this.textBaseline||"alphabetic";this._drawText(a);return true};b.getMeasuredWidth=function(){return this._getWorkingContext().measureText(this.text).width};
b.getMeasuredLineHeight=function(){return this._getWorkingContext().measureText("M").width*1.2};b.getMeasuredHeight=function(){return this._drawText()*(this.lineHeight||this.getMeasuredLineHeight())};b.clone=function(){var a=new c(this.text,this.font,this.color);this.cloneProps(a);return a};b.toString=function(){return"[Text (text="+(this.text.length>20?this.text.substr(0,17)+"...":this.text)+")]"};b.DisplayObject_cloneProps=b.cloneProps;b.cloneProps=function(a){this.DisplayObject_cloneProps(a);a.textAlign=
this.textAlign;a.textBaseline=this.textBaseline;a.maxWidth=this.maxWidth;a.outline=this.outline;a.lineHeight=this.lineHeight;a.lineWidth=this.lineWidth};b._getWorkingContext=function(){var a=c._workingContext;a.font=this.font;a.textAlign=this.textAlign||"start";a.textBaseline=this.textBaseline||"alphabetic";return a};b._drawText=function(a){var b=!!a;b||(a=this._getWorkingContext());for(var c=String(this.text).split(/(?:\r\n|\r|\n)/),d=this.lineHeight||this.getMeasuredLineHeight(),e=0,f=0,g=c.length;f<
g;f++){var i=a.measureText(c[f]).width;if(this.lineWidth==null||i<this.lineWidth)b&&this._drawTextLine(a,c[f],e*d);else{for(var i=c[f].split(/(\s)/),j=i[0],k=1,m=i.length;k<m;k+=2)a.measureText(j+i[k]+i[k+1]).width>this.lineWidth?(b&&this._drawTextLine(a,j,e*d),e++,j=i[k+1]):j+=i[k]+i[k+1];b&&this._drawTextLine(a,j,e*d)}e++}return e};b._drawTextLine=function(a,b,c){this.outline?a.strokeText(b,0,c,this.maxWidth||65535):a.fillText(b,0,c,this.maxWidth||65535)};createjs.Text=c})();this.createjs=this.createjs||{};
(function(){var c=function(){throw"SpriteSheetUtils cannot be instantiated";};c._workingCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c._workingContext=c._workingCanvas.getContext("2d");c.addFlippedFrames=function(b,a,l,h){if(a||l||h){var d=0;a&&c._flip(b,++d,true,false);l&&c._flip(b,++d,false,true);h&&c._flip(b,++d,true,true)}};c.extractFrame=function(b,a){isNaN(a)&&(a=b.getAnimation(a).frames[0]);var l=b.getFrame(a);if(!l)return null;var h=l.rect,d=c._workingCanvas;
d.width=h.width;d.height=h.height;c._workingContext.drawImage(l.image,h.x,h.y,h.width,h.height,0,0,h.width,h.height);l=new Image;l.src=d.toDataURL("image/png");return l};c.mergeAlpha=function(b,a,c){c||(c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"));c.width=Math.max(a.width,b.width);c.height=Math.max(a.height,b.height);var h=c.getContext("2d");h.save();h.drawImage(b,0,0);h.globalCompositeOperation="destination-in";h.drawImage(a,0,0);h.restore();return c};c._flip=
function(b,a,l,h){for(var d=b._images,e=c._workingCanvas,f=c._workingContext,g=d.length/a,i=0;i<g;i++){var j=d[i];j.__tmp=i;e.width=0;e.width=j.width;e.height=j.height;f.setTransform(l?-1:1,0,0,h?-1:1,l?j.width:0,h?j.height:0);f.drawImage(j,0,0);var k=new Image;k.src=e.toDataURL("image/png");k.width=j.width;k.height=j.height;d.push(k)}f=b._frames;e=f.length/a;for(i=0;i<e;i++){var j=f[i],m=j.rect.clone(),k=d[j.image.__tmp+g*a],o={image:k,rect:m,regX:j.regX,regY:j.regY};if(l)m.x=k.width-m.x-m.width,
o.regX=m.width-j.regX;if(h)m.y=k.height-m.y-m.height,o.regY=m.height-j.regY;f.push(o)}l="_"+(l?"h":"")+(h?"v":"");h=b._animations;b=b._data;d=h.length/a;for(i=0;i<d;i++){f=h[i];j=b[f];g={name:f+l,frequency:j.frequency,next:j.next,frames:[]};j.next&&(g.next+=l);f=j.frames;j=0;for(k=f.length;j<k;j++)g.frames.push(f[j]+e*a);b[g.name]=g;h.push(g.name)}};createjs.SpriteSheetUtils=c})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},b=c.prototype;c.ERR_DIMENSIONS="frame dimensions exceed max spritesheet dimensions";c.ERR_RUNNING="a build is already running";b.maxWidth=2048;b.maxHeight=2048;b.spriteSheet=null;b.scale=1;b.padding=1;b._frames=null;b._animations=null;b._data=null;b._nextFrameIndex=0;b._index=0;b._callback=null;b._timeSlice=null;b._timerID=null;b._scale=1;b.initialize=function(){this._frames=[];this._animations={}};b.addFrame=function(a,b,h,d,e,f){if(this._data)throw c.ERR_RUNNING;
b=b||a.bounds||a.nominalBounds;!b&&a.getBounds&&(b=a.getBounds());if(!b)return null;h=h||1;return this._frames.push({source:a,sourceRect:b,scale:h,funct:d,params:e,scope:f,index:this._frames.length,height:b.height*h})-1};b.addAnimation=function(a,b,h,d){if(this._data)throw c.ERR_RUNNING;this._animations[a]={frames:b,next:h,frequency:d}};b.addMovieClip=function(a,b,h){if(this._data)throw c.ERR_RUNNING;var d=a.frameBounds,e=b||a.bounds||a.nominalBounds;!e&&a.getBounds&&(e=a.getBounds());if(!e&&!d)return null;
for(var b=a.timeline.duration,f=0;f<b;f++)this.addFrame(a,d&&d[f]?d[f]:e,h,function(a){var b=this.actionsEnabled;this.actionsEnabled=false;this.gotoAndStop(a);this.actionsEnabled=b},[f],a);var f=a.timeline._labels,a=[],g;for(g in f)a.push({index:f[g],label:g});if(a.length){a.sort(function(a,b){return a.index-b.index});f=0;for(g=a.length;f<g;f++){for(var h=a[f].label,d=f==g-1?b:a[f+1].index,e=[],i=a[f].index;i<d;i++)e.push(i);this.addAnimation(h,e,true)}}};b.build=function(){if(this._data)throw c.ERR_RUNNING;
this._callback=null;for(this._startBuild();this._drawNext(););this._endBuild();return this.spriteSheet};b.buildAsync=function(a,b){if(this._data)throw c.ERR_RUNNING;this._callback=a;this._startBuild();this._timeSlice=Math.max(0.01,Math.min(0.99,b||0.3))*50;var h=this;this._timerID=setTimeout(function(){h._run()},50-this._timeSlice)};b.stopAsync=function(){clearTimeout(this._timerID);this._data=null};b.clone=function(){throw"SpriteSheetBuilder cannot be cloned.";};b.toString=function(){return"[SpriteSheetBuilder]"};
b._startBuild=function(){var a=this.padding||0;this.spriteSheet=null;this._index=0;this._scale=this.scale;var b=[];this._data={images:[],frames:b,animations:this._animations};var h=this._frames.slice();h.sort(function(a,b){return a.height<=b.height?-1:1});if(h[h.length-1].height+a*2>this.maxHeight)throw c.ERR_DIMENSIONS;for(var d=0,e=0,f=0;h.length;){var g=this._fillRow(h,d,f,b,a);if(g.w>e)e=g.w;d+=g.h;if(!g.h||!h.length){var i=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");
i.width=this._getSize(e,this.maxWidth);i.height=this._getSize(d,this.maxHeight);this._data.images[f]=i;g.h||(e=d=0,f++)}}};b._getSize=function(a,b){for(var c=4;Math.pow(2,++c)<a;);return Math.min(b,Math.pow(2,c))};b._fillRow=function(a,b,h,d,e){var f=this.maxWidth,g=this.maxHeight-b,i=e;b+=e;for(var j=0,k=a.length-1;k>=0;k--){var m=a[k],o=this._scale*m.scale,n=m.sourceRect,q=m.source,p=Math.floor(o*n.x-e),s=Math.floor(o*n.y-e),r=Math.ceil(o*n.height+e*2),n=Math.ceil(o*n.width+e*2);if(n>f)throw c.ERR_DIMENSIONS;
if(!(r>g||i+n>f))m.img=h,m.rect=new createjs.Rectangle(i,b,n,r),j=j||r,a.splice(k,1),d[m.index]=[i,b,n,r,h,Math.round(-p+o*q.regX-e),Math.round(-s+o*q.regY-e)],i+=n}return{w:i,h:j}};b._endBuild=function(){this.spriteSheet=new createjs.SpriteSheet(this._data);this._data=null;this._callback&&this._callback(this)};b._run=function(){for(var a=(new Date).getTime()+this._timeSlice,b=false;a>(new Date).getTime();)if(!this._drawNext()){b=true;break}if(b)this._endBuild();else{var c=this;this._timerID=setTimeout(function(){c._run()},
50-this._timeSlice)}};b._drawNext=function(){var a=this._frames[this._index],b=a.scale*this._scale,c=a.rect,d=a.sourceRect,e=this._data.images[a.img].getContext("2d");a.funct&&a.funct.apply(a.scope,a.params);e.save();e.beginPath();e.rect(c.x,c.y,c.width,c.height);e.clip();e.translate(Math.ceil(c.x-d.x*b),Math.ceil(c.y-d.y*b));e.scale(b,b);a.source.draw(e);e.restore();return++this._index<this._frames.length};createjs.SpriteSheetBuilder=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype=new createjs.DisplayObject;b.htmlElement=null;b._style=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(a){typeof a=="string"&&(a=document.getElementById(a));this.DisplayObject_initialize();this.mouseEnabled=false;if(this.htmlElement=a)this._style=a.style,this._style.position="absolute",this._style.transformOrigin=this._style.WebkitTransformOrigin=this._style.msTransformOrigin=this._style.MozTransformOrigin=this._style.OTransformOrigin=
"0% 0%"};b.isVisible=function(){return this.htmlElement!=null};b.draw=function(){if(this.htmlElement!=null){var a=this.getConcatenatedMatrix(this._matrix),b=this.htmlElement;b.style.opacity=""+a.alpha;b.style.visibility=this.visible?"visible":"hidden";b.style.transform=b.style.WebkitTransform=b.style.OTransform=b.style.msTransform=["matrix("+a.a,a.b,a.c,a.d,a.tx+0.5|0,(a.ty+0.5|0)+")"].join(",");b.style.MozTransform=["matrix("+a.a,a.b,a.c,a.d,(a.tx+0.5|0)+"px",(a.ty+0.5|0)+"px)"].join(",");return true}};
b.cache=function(){};b.uncache=function(){};b.updateCache=function(){};b.hitTest=function(){};b.localToGlobal=function(){};b.globalToLocal=function(){};b.localToLocal=function(){};b.clone=function(){var a=new c;this.cloneProps(a);return a};b.toString=function(){return"[DOMElement (name="+this.name+")]"};b._tick=function(a){if(this.htmlElement!=null&&(this.htmlElement.style.visibility="hidden",this.onTick))this.onTick(a)};createjs.DOMElement=c})();this.createjs=this.createjs||{};(function(){var c=function(){this.initialize()},b=c.prototype;b.initialize=function(){};b.getBounds=function(){return new createjs.Rectangle(0,0,0,0)};b.applyFilter=function(){};b.toString=function(){return"[Filter]"};b.clone=function(){return new c};createjs.Filter=c})();this.createjs=this.createjs||{};
(function(){var c=function(){throw"Touch cannot be instantiated";};c.isSupported=function(){return"ontouchstart"in window||window.navigator.msPointerEnabled};c.enable=function(b,a,l){if(!b||!b.canvas||!c.isSupported())return false;b.__touch={pointers:{},multitouch:!a,preventDefault:!l,count:0};"ontouchstart"in window?c._IOS_enable(b):window.navigator.msPointerEnabled&&c._IE_enable(b);return true};c.disable=function(b){b&&("ontouchstart"in window?c._IOS_disable(b):window.navigator.msPointerEnabled&&c._IE_disable(b))};
c._IOS_enable=function(b){var a=b.canvas,l=b.__touch.f=function(a){c._IOS_handleEvent(b,a)};a.addEventListener("touchstart",l,false);a.addEventListener("touchmove",l,false);a.addEventListener("touchend",l,false);a.addEventListener("touchcancel",l,false)};c._IOS_disable=function(b){var a=b.canvas;if(a)b=b.__touch.f,a.removeEventListener("touchstart",b,false),a.removeEventListener("touchmove",b,false),a.removeEventListener("touchend",b,false),a.removeEventListener("touchcancel",b,false)};c._IOS_handleEvent=
function(b,a){if(b){b.__touch.preventDefault&&a.preventDefault&&a.preventDefault();for(var c=a.changedTouches,h=a.type,d=0,e=c.length;d<e;d++){var f=c[d],g=f.identifier;f.target==b.canvas&&(h=="touchstart"?this._handleStart(b,g,a,f.pageX,f.pageY):h=="touchmove"?this._handleMove(b,g,a,f.pageX,f.pageY):(h=="touchend"||h=="touchcancel")&&this._handleEnd(b,g,a))}}};c._IE_enable=function(b){var a=b.canvas,l=b.__touch.f=function(a){c._IE_handleEvent(b,a)};a.addEventListener("MSPointerDown",l,false);window.addEventListener("MSPointerMove",
l,false);window.addEventListener("MSPointerUp",l,false);window.addEventListener("MSPointerCancel",l,false);if(b.__touch.preventDefault)a.style.msTouchAction="none";b.__touch.activeIDs={}};c._IE_disable=function(b){var a=b.__touch.f;window.removeEventListener("MSPointerMove",a,false);window.removeEventListener("MSPointerUp",a,false);window.removeEventListener("MSPointerCancel",a,false);b.canvas&&b.canvas.removeEventListener("MSPointerDown",a,false)};c._IE_handleEvent=function(b,a){if(b){b.__touch.preventDefault&&
a.preventDefault&&a.preventDefault();var c=a.type,h=a.pointerId,d=b.__touch.activeIDs;if(c=="MSPointerDown")a.srcElement==b.canvas&&(d[h]=true,this._handleStart(b,h,a,a.pageX,a.pageY));else if(d[h])if(c=="MSPointerMove")this._handleMove(b,h,a,a.pageX,a.pageY);else if(c=="MSPointerUp"||c=="MSPointerCancel")delete d[h],this._handleEnd(b,h,a)}};c._handleStart=function(b,a,c,h,d){var e=b.__touch;if(e.multitouch||!e.count){var f=e.pointers;f[a]||(f[a]=true,e.count++,b._handlePointerDown(a,c,h,d))}};c._handleMove=
function(b,a,c,h,d){b.__touch.pointers[a]&&b._handlePointerMove(a,c,h,d)};c._handleEnd=function(b,a,c){var h=b.__touch,d=h.pointers;d[a]&&(h.count--,b._handlePointerUp(a,c,true),delete d[a])};createjs.Touch=c})();
;

/**
* PreloadJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
**/this.createjs=this.createjs||{};
(function(){var d=function(){this.init()};d.prototype={};var a=d.prototype;a.loaded=false;a.canceled=false;a.progress=0;a._item=null;a.onProgress=null;a.onLoadStart=null;a.onFileLoad=null;a.onFileProgress=null;a.onComplete=null;a.onError=null;a.getItem=function(){return this._item};a.init=function(){};a.load=function(){};a.cancel=function(){};a._sendLoadStart=function(){if(!this._isCanceled()&&this.onLoadStart)this.onLoadStart({target:this})};a._sendProgress=function(a){if(!this._isCanceled()){var b;if(a instanceof
Number)this.progress=a,b={loaded:this.progress,total:1};else if(b=a,this.progress=a.loaded/a.total,isNaN(this.progress)||this.progress==Infinity)this.progress=0;b.target=this;if(this.onProgress)this.onProgress(b)}};a._sendFileProgress=function(a){if(this._isCanceled())this._cleanUp();else if(this.onFileProgress)a.target=this,this.onFileProgress(a)};a._sendComplete=function(){if(!this._isCanceled()&&this.onComplete)this.onComplete({target:this})};a._sendFileComplete=function(a){if(!this._isCanceled()&&
this.onFileLoad)a.target=this,this.onFileLoad(a)};a._sendError=function(a){if(!this._isCanceled()&&this.onError)a==null&&(a={}),a.target=this,this.onError(a)};a._isCanceled=function(){return window.createjs==null||this.canceled?true:false};a.toString=function(){return"[PreloadJS AbstractLoader]"};createjs.AbstractLoader=d})();this.createjs=this.createjs||{};
(function(){var d=function(b){this.initialize(b)},a=d.prototype=new createjs.AbstractLoader;d.IMAGE="image";d.SVG="svg";d.SOUND="sound";d.JSON="json";d.JAVASCRIPT="javascript";d.CSS="css";d.XML="xml";d.TEXT="text";d.TIMEOUT_TIME=8E3;a.useXHR=true;a.stopOnError=false;a.maintainScriptOrder=true;a.next=null;a.typeHandlers=null;a.extensionHandlers=null;a._loadStartWasDispatched=false;a._maxConnections=1;a._currentLoads=null;a._loadQueue=null;a._loadedItemsById=null;a._loadedItemsBySrc=null;a._targetProgress=
0;a._numItems=0;a._numItemsLoaded=null;a._scriptOrder=null;a._loadedScripts=null;a.TAG_LOAD_OGGS=true;a.initialize=function(b){this._targetProgress=this._numItemsLoaded=this._numItems=0;this._paused=false;this._currentLoads=[];this._loadQueue=[];this._scriptOrder=[];this._loadedScripts=[];this._loadedItemsById={};this._loadedItemsBySrc={};this.typeHandlers={};this.extensionHandlers={};this._loadStartWasDispatched=false;this.useXHR=b!=false&&window.XMLHttpRequest!=null;this.determineCapabilities()};
a.determineCapabilities=function(){var b=createjs.PreloadJS.BrowserDetect;if(b!=null)createjs.PreloadJS.TAG_LOAD_OGGS=b.isFirefox||b.isOpera};d.isBinary=function(b){switch(b){case createjs.PreloadJS.IMAGE:case createjs.PreloadJS.SOUND:return true;default:return false}};a.installPlugin=function(b){if(!(b==null||b.getPreloadHandlers==null)){b=b.getPreloadHandlers();if(b.types!=null)for(var a=0,c=b.types.length;a<c;a++)this.typeHandlers[b.types[a]]=b.callback;if(b.extensions!=null)for(a=0,c=b.extensions.length;a<
c;a++)this.extensionHandlers[b.extensions[a]]=b.callback}};a.setMaxConnections=function(b){this._maxConnections=b;this._paused||this._loadNext()};a.loadFile=function(b,a){b==null?this._sendError({text:"File is null."}):(this._addItem(b),a!==false&&this.setPaused(false))};a.loadManifest=function(b,a){var c;if(b instanceof Array){if(b.length==0){this._sendError({text:"Manifest is empty."});return}c=b}else{if(b==null){this._sendError({text:"Manifest is null."});return}c=[b]}for(var d=0,f=c.length;d<
f;d++)this._addItem(c[d],false);a!==false&&this._loadNext()};a.load=function(){this.setPaused(false)};a.getResult=function(b){return this._loadedItemsById[b]||this._loadedItemsBySrc[b]};a.setPaused=function(b){(this._paused=b)||this._loadNext()};a.close=function(){for(;this._currentLoads.length;)this._currentLoads.pop().cancel();this._scriptOrder.length=0;this._loadedScripts.length=0};a._addItem=function(b){b=this._createLoadItem(b);b!=null&&(this._loadQueue.push(b),this._numItems++,this._updateProgress(),
b.getItem().type==createjs.PreloadJS.JAVASCRIPT&&(this._scriptOrder.push(b.getItem()),this._loadedScripts.push(null)))};a._loadNext=function(){if(!this._paused){if(!this._loadStartWasDispatched)this._sendLoadStart(),this._loadStartWasDispatched=true;if(this._numItems==this._numItemsLoaded)this.loaded=true,this._sendComplete(),this.next&&this.next.load&&this.next.load.apply(this.next);for(;this._loadQueue.length&&this._currentLoads.length<this._maxConnections;)this._loadItem(this._loadQueue.shift())}};
a._loadItem=function(b){b.onProgress=createjs.PreloadJS.proxy(this._handleProgress,this);b.onComplete=createjs.PreloadJS.proxy(this._handleFileComplete,this);b.onError=createjs.PreloadJS.proxy(this._handleFileError,this);this._currentLoads.push(b);b.load()};a._handleFileError=function(b){var b=b.target,a=this._createResultData(b.getItem());this._numItemsLoaded++;this._updateProgress();this._sendError(a);this.stopOnError||(this._removeLoadItem(b),this._loadNext())};a._createResultData=function(b){var a=
{id:b.id,result:null,data:b.data,type:b.type,src:b.src};this._loadedItemsById[b.id]=a;return this._loadedItemsBySrc[b.src]=a};a._handleFileComplete=function(b){var b=b.target,a=b.getItem(),c=this._createResultData(a);this._removeLoadItem(b);c.result=b instanceof createjs.XHRLoader?this._createResult(a,b.getResult()):a.tag;switch(a.type){case createjs.PreloadJS.IMAGE:if(b instanceof createjs.XHRLoader){var d=this;c.result.onload=function(){d._handleFileTagComplete(a,c)};return}break;case createjs.PreloadJS.JAVASCRIPT:if(this.maintainScriptOrder){this._loadedScripts[this._scriptOrder.indexOf(a)]=
a;this._checkScriptLoadOrder(b);return}}this._handleFileTagComplete(a,c)};a._checkScriptLoadOrder=function(){for(var b=this._loadedScripts.length,a=0;a<b;a++){var c=this._loadedScripts[a];if(c===null)break;if(c!==true){var d=this.getResult(c.src),c=this.getResult(c.id);c.result=d.result;this._handleFileTagComplete(d,c);this._loadedScripts[a]=true;a--;b--}}};a._handleFileTagComplete=function(b,a){this._numItemsLoaded++;b.completeHandler&&b.completeHandler(a);this._updateProgress();this._sendFileComplete(a);
this._loadNext()};a._removeLoadItem=function(b){for(var a=this._currentLoads.length,c=0;c<a;c++)if(this._currentLoads[c]==b){this._currentLoads.splice(c,1);break}};a._createResult=function(b,a){var c=null,d;switch(b.type){case createjs.PreloadJS.IMAGE:c=this._createImage();break;case createjs.PreloadJS.SOUND:c=b.tag||this._createAudio();break;case createjs.PreloadJS.CSS:c=this._createLink();break;case createjs.PreloadJS.JAVASCRIPT:c=this._createScript();break;case createjs.PreloadJS.SVG:var c=this._createSVG(),
f=this._createXML(a,"image/svg+xml");c.appendChild(f);break;case createjs.PreloadJS.XML:d=this._createXML(a,"text/xml");break;case createjs.PreloadJS.JSON:case createjs.PreloadJS.TEXT:d=a}if(c){if(b.type==createjs.PreloadJS.CSS)c.href=b.src;else if(b.type!=createjs.PreloadJS.SVG)c.src=b.src;return c}else return d};a._createXML=function(b,a){var c;window.DOMParser?(c=new DOMParser,c=c.parseFromString(b,a)):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async=false,c.loadXML(b));return c};a._handleProgress=
function(b){var b=b.target,a=this._createResultData(b.getItem());a.progress=b.progress;this._sendFileProgress(a);this._updateProgress()};a._updateProgress=function(){var b=this._numItemsLoaded/this._numItems,a=this._numItems-this._numItemsLoaded;if(a>0){for(var c=0,d=0,f=this._currentLoads.length;d<f;d++)c+=this._currentLoads[d].progress;b+=c/a*(a/this._numItems)}this._sendProgress({loaded:b,total:1})};a._createLoadItem=function(a){var c={};switch(typeof a){case "string":c.src=a;break;case "object":a instanceof
HTMLAudioElement?(c.tag=a,c.src=c.tag.src,c.type=createjs.PreloadJS.SOUND):c=a}c.ext=this._getNameAfter(c.src,".");if(!c.type)c.type=this.getType(c.ext);if(c.id==null||c.id=="")c.id=c.src;if(a=this.typeHandlers[c.type]||this.extensionHandlers[c.ext]){a=a(c.src,c.type,c.id,c.data);if(a===false)return null;else if(a!==true){if(a.src!=null)c.src=a.src;if(a.id!=null)c.id=a.id;if(a.tag!=null&&a.tag.load instanceof Function)c.tag=a.tag}c.ext=this._getNameAfter(c.src,".")}a=this.useXHR;switch(c.type){case createjs.PreloadJS.JSON:case createjs.PreloadJS.XML:case createjs.PreloadJS.TEXT:a=
true;break;case createjs.PreloadJS.SOUND:c.ext=="ogg"&&createjs.PreloadJS.TAG_LOAD_OGGS&&(a=false)}return this.useXHR==true&&(c.type==createjs.PreloadJS.IMAGE||c.type==createjs.PreloadJS.SVG)?(c=this._createTagItem(c),c.useXHR=true,c):a?new createjs.XHRLoader(c):c.tag?new createjs.TagLoader(c):this._createTagItem(c)};a._createTagItem=function(a){var c,d="src",e=false;switch(a.type){case createjs.PreloadJS.IMAGE:c=this._createImage();break;case createjs.PreloadJS.SOUND:c=this._createAudio();break;
case createjs.PreloadJS.CSS:d="href";e=true;c=this._createLink();break;case createjs.PreloadJS.JAVASCRIPT:e=true;c=this._createScript();break;case createjs.PreloadJS.SVG:d="data",c=this._createSVG()}a.tag=c;return new createjs.TagLoader(a,d,e)};a.getType=function(a){switch(a){case "jpeg":case "jpg":case "gif":case "png":return createjs.PreloadJS.IMAGE;case "ogg":case "mp3":case "wav":return createjs.PreloadJS.SOUND;case "json":return createjs.PreloadJS.JSON;case "xml":return createjs.PreloadJS.XML;
case "css":return createjs.PreloadJS.CSS;case "js":return createjs.PreloadJS.JAVASCRIPT;case "svg":return createjs.PreloadJS.SVG;default:return createjs.PreloadJS.TEXT}};a._getNameAfter=function(a,c){var d=a.lastIndexOf(c),d=a.substr(d+1),e=d.lastIndexOf(/[\b|\?|\#|\s]/);return e==-1?d:d.substr(0,e)};a._createImage=function(){return document.createElement("img")};a._createSVG=function(){var a=document.createElement("object");a.type="image/svg+xml";return a};a._createAudio=function(){var a=document.createElement("audio");
a.autoplay=false;a.type="audio/ogg";return a};a._createScript=function(){var a=document.createElement("script");a.type="text/javascript";return a};a._createLink=function(){var a=document.createElement("link");a.type="text/css";a.rel="stylesheet";return a};a.toString=function(){return"[PreloadJS]"};d.proxy=function(a,c){return function(d){return a.apply(c,arguments)}};createjs.PreloadJS=d;var c=function(){};c.init=function(){var a=navigator.userAgent;c.isFirefox=a.indexOf("Firefox")>-1;c.isOpera=window.opera!=
null;c.isIOS=a.indexOf("iPod")>-1||a.indexOf("iPhone")>-1||a.indexOf("iPad")>-1};c.init();createjs.PreloadJS.BrowserDetect=c})();this.createjs=this.createjs||{};
(function(){var d=function(a,b,d){this.init(a,b,d)},a=d.prototype=new createjs.AbstractLoader;a._srcAttr=null;a._loadTimeOutTimeout=null;a.tagCompleteProxy=null;a.init=function(a,b,d){this._item=a;this._srcAttr=b||"src";this.useXHR=d==true;this.isAudio=a.tag instanceof HTMLAudioElement;this.tagCompleteProxy=createjs.PreloadJS.proxy(this._handleTagLoad,this)};a.cancel=function(){this.canceled=true;this._clean();var a=this.getItem();if(a!=null)a.src=null};a.load=function(){this.useXHR?this.loadXHR():
this.loadTag()};a.loadXHR=function(){var a=this.getItem(),a=new createjs.XHRLoader(a);a.onProgress=createjs.PreloadJS.proxy(this._handleProgress,this);a.onFileLoad=createjs.PreloadJS.proxy(this._handleXHRComplete,this);a.onComplete=createjs.PreloadJS.proxy(this._handleXHRComplete,this);a.onError=createjs.PreloadJS.proxy(this._handleLoadError,this);a.load()};a._handleXHRComplete=function(a){if(!this._isCanceled()){this._clean();a.target.onFileLoad=null;a.target.onComplete=null;var b=a.target.getItem();
a.target.getResult();b.type==createjs.PreloadJS.IMAGE?(b.tag.onload=createjs.PreloadJS.proxy(this._sendComplete,this),b.tag.src=b.src):(b.tag[this._srcAttr]=b.src,this._sendComplete())}};a._handleLoadError=function(a){a.error&&a.error.code==101?this.loadTag():(this._clean(),this._sendError(a))};a.loadTag=function(){var a=this.getItem(),b=a.tag;clearTimeout(this._loadTimeOutTimeout);this._loadTimeOutTimeout=setTimeout(createjs.PreloadJS.proxy(this._handleLoadTimeOut,this),createjs.PreloadJS.TIMEOUT_TIME);
if(this.isAudio)b.src=null,b.preload="auto",b.setAttribute("data-temp","true");b.onerror=createjs.PreloadJS.proxy(this._handleLoadError,this);b.onprogress=createjs.PreloadJS.proxy(this._handleProgress,this);this.isAudio?(b.onstalled=createjs.PreloadJS.proxy(this._handleStalled,this),b.addEventListener("canplaythrough",this.tagCompleteProxy,false)):b.onload=createjs.PreloadJS.proxy(this._handleTagLoad,this);b[this._srcAttr]=a.src;a.type==createjs.PreloadJS.SVG&&document.getElementsByTagName("body")[0].appendChild(b);
a=a.type==createjs.PreloadJS.SOUND&&a.ext=="ogg"&&createjs.PreloadJS.BrowserDetect.isFirefox;b.load!=null&&!a&&b.load()};a._handleLoadTimeOut=function(){this._clean();this._sendError()};a._handleStalled=function(){};a._handleLoadError=function(){this._clean();this._sendError()};a._handleTagLoad=function(){if(!this._isCanceled()){var a=this.getItem().tag;clearTimeout(this._loadTimeOutTimeout);if(!(this.loaded||this.isAudio&&a.readyState!==4))this.getItem().type==createjs.PreloadJS.SVG&&document.getElementsByTagName("body")[0].removeChild(a),
this.loaded=true,this._clean(),this._sendComplete()}};a._clean=function(){clearTimeout(this._loadTimeOutTimeout);var a=this.getItem().tag;a.onload=null;a.removeEventListener&&a.removeEventListener("canplaythrough",this.tagCompleteProxy,false);a.onstalled=null;a.onprogress=null;a.onerror=null};a._handleProgress=function(a){clearTimeout(this._loadTimeOutTimeout);if(this.isAudio){a=this.getItem();if(a.buffered==null)return;a={loaded:a.buffered.length>0?a.buffered.end(0):0,total:a.duration}}this._sendProgress(a)};
a.toString=function(){return"[PreloadJS TagLoader]"};createjs.TagLoader=d})();this.createjs=this.createjs||{};
(function(){var d=function(a){this.init(a)},a=d.prototype=new createjs.AbstractLoader;a._wasLoaded=false;a._request=null;a._loadTimeOutTimeout=null;a._xhrLevel=null;a.init=function(a){this._item=a;this._createXHR(a)};a.getResult=function(){try{return this._request.responseText}catch(a){}return this._request.response};a.cancel=function(){this.canceled=true;this._clean();this._request.abort()};a.load=function(){if(this._request==null)this.handleError();else{if(this._xhrLevel==1)this._loadTimeOutTimeout=
setTimeout(createjs.PreloadJS.proxy(this.handleTimeout,this),createjs.PreloadJS.TIMEOUT_TIME);this._request.onloadstart=createjs.PreloadJS.proxy(this.handleLoadStart,this);this._request.onprogress=createjs.PreloadJS.proxy(this.handleProgress,this);this._request.onabort=createjs.PreloadJS.proxy(this.handleAbort,this);this._request.onerror=createjs.PreloadJS.proxy(this.handleError,this);this._request.ontimeout=createjs.PreloadJS.proxy(this.handleTimeout,this);this._request.onload=createjs.PreloadJS.proxy(this.handleLoad,
this);this._request.onreadystatechange=createjs.PreloadJS.proxy(this.handleReadyStateChange,this);try{this._request.send()}catch(a){this._sendError({source:a})}}};a.handleProgress=function(a){a.loaded>0&&a.total==0||this._sendProgress({loaded:a.loaded,total:a.total})};a.handleLoadStart=function(){clearTimeout(this._loadTimeOutTimeout);this._sendLoadStart()};a.handleAbort=function(){this._clean();this._sendError()};a.handleError=function(){this._clean();this._sendError()};a.handleReadyStateChange=
function(){this._request.readyState==4&&this.handleLoad()};a._checkError=function(){switch(parseInt(this._request.status)){case 404:case 0:return false}return this._hasResponse()||this._hasTextResponse()||this._hasXMLResponse()};a._hasResponse=function(){return this._request.response!=null};a._hasTextResponse=function(){try{return this._request.responseText!=null}catch(a){return false}};a._hasXMLResponse=function(){try{return this._request.responseXML!=null}catch(a){return false}};a.handleLoad=function(){if(!this.loaded)this.loaded=
true,this._checkError()?(this._clean(),this._sendComplete()):this.handleError()};a.handleTimeout=function(){this._clean();this._sendError()};a._createXHR=function(a){this._xhrLevel=1;if(window.ArrayBuffer)this._xhrLevel=2;if(window.XMLHttpRequest)this._request=new XMLHttpRequest;else try{this._request=new ActiveXObject("MSXML2.XMLHTTP.3.0")}catch(b){return null}a.type==createjs.PreloadJS.TEXT&&this._request.overrideMimeType&&this._request.overrideMimeType("text/plain; charset=x-user-defined");this._request.open("GET",
a.src,true);if(createjs.PreloadJS.isBinary(a.type))this._request.responseType="arraybuffer";return true};a._clean=function(){clearTimeout(this._loadTimeOutTimeout);var a=this._request;a.onloadstart=null;a.onprogress=null;a.onabort=null;a.onerror=null;a.onload=null;a.ontimeout=null;a.onloadend=null;a.onreadystatechange=null;clearInterval(this._checkLoadInterval)};a.toString=function(){return"[PreloadJS XHRLoader]"};createjs.XHRLoader=d})();
;

/**
* SoundJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
**/
this.createjs=this.createjs||{};
(function(){function b(){throw"SoundJS cannot be instantiated";}function f(a,b){this.init(a,b)}function d(){}b.DELIMITER="|";b.AUDIO_TIMEOUT=8E3;b.INTERRUPT_ANY="any";b.INTERRUPT_EARLY="early";b.INTERRUPT_LATE="late";b.INTERRUPT_NONE="none";b.PLAY_INITED="playInited";b.PLAY_SUCCEEDED="playSucceeded";b.PLAY_INTERRUPTED="playInterrupted";b.PLAY_FINISHED="playFinished";b.PLAY_FAILED="playFailed";b.activePlugin=null;b.muted=false;b.pluginsRegistered=false;b.masterVolume=1;b.instances=[];b.instanceHash=
{};b.idHash=null;b.defaultSoundInstance=null;b.getPreloadHandlers=function(){return{callback:b.proxy(b.initLoad,b),types:["sound"],extensions:["mp3","ogg","wav"]}};b.registerPlugins=function(a){b.pluginsRegistered=true;for(var g=0,c=a.length;g<c;g++){var e=a[g];if(e!=null&&e.isSupported())return b.activePlugin=new e,true}return false};b.registerPlugin=function(a){b.pluginsRegistered=true;if(a==null)return false;return a.isSupported()?(b.activePlugin=new a,true):false};b.isReady=function(){return b.activePlugin!=
null};b.getCapabilities=function(){return b.activePlugin==null?null:b.activePlugin.capabilities};b.getCapability=function(a){return b.activePlugin==null?null:b.activePlugin.capabilities[a]};b.initLoad=function(a,g,c,e){if(!b.checkPlugin(true))return false;a=b.parsePath(a,g,c,e);if(a==null)return false;if(c!=null){if(b.idHash==null)b.idHash={};b.idHash[c]=a.src}f.create(a.src,e);c=b.activePlugin.register(a.src,e);if(c!=null){if(c.tag!=null)a.tag=c.tag;else if(c.src)a.src=c.src;if(c.completeHandler!=
null)a.handler=c.completeHandler}return a};b.parsePath=function(a,g,c,e){for(var a=a.split(b.DELIMITER),g={type:g||"sound",id:c,data:e,handler:b.handleSoundReady},c=false,e=b.getCapabilities(),h=0,d=a.length;h<d;h++){var f=a[h],i=f.lastIndexOf("."),k=f.substr(i+1).toLowerCase(),i=f.substr(0,i).split("/").pop();switch(k){case "mp3":e.mp3&&(c=true);break;case "ogg":e.ogg&&(c=true);break;case "wav":e.wav&&(c=true)}if(c)return g.name=i,g.src=f,g.extension=k,g}return null};b.play=function(a,g,c,e,h,f,
d){if(!b.checkPlugin(true))return b.defaultSoundInstance;a=b.getSrcFromId(a);a=b.activePlugin.create(a);try{a.mute(b.muted)}catch(i){}b.playInstance(a,g,c,e,h,f,d)||a.playFailed();return a};b.playInstance=function(a,g,c,e,h,f,d){g=g||b.INTERRUPT_NONE;c==null&&(c=0);e==null&&(e=0);h==null&&(h=0);f==null&&(f=1);d==null&&(d=0);if(c==0){if(!b.beginPlaying(a,g,e,h,f,d))return false}else setTimeout(function(){b.beginPlaying(a,g,e,h,f,d)},c);this.instances.push(a);this.instanceHash[a.uniqueId]=a;return true};
b.beginPlaying=function(a,b,c,e,d,j){if(!f.add(a,b))return false;return!a.beginPlaying(c,e,d,j)?(this.instances.splice(this.instances.indexOf(a),1),delete this.instanceHash[a.uniqueId],false):true};b.checkPlugin=function(a){return b.activePlugin==null&&(a&&!b.pluginsRegistered&&b.registerPlugin(createjs.HTMLAudioPlugin),b.activePlugin==null)?false:true};b.getSrcFromId=function(a){return b.idHash==null||b.idHash[a]==null?a:b.idHash[a]};b.setVolume=function(a,g){if(Number(a)==null)return false;a=Math.max(0,
Math.min(1,a));return b.tellAllInstances("setVolume",g,a)};b.getMasterVolume=function(){return b.masterVolume};b.setMasterVolume=function(a){b.masterVolume=a;return b.tellAllInstances("setMasterVolume",null,a)};b.setMute=function(a){this.muted=a;return b.tellAllInstances("mute",null,a)};b.pause=function(a){return b.tellAllInstances("pause",a)};b.resume=function(a){return b.tellAllInstances("resume",a)};b.stop=function(a){return b.tellAllInstances("stop",a)};b.getInstanceById=function(a){return this.instanceHash[a]};
b.playFinished=function(a){f.remove(a);this.instances.splice(this.instances.indexOf(a),1)};b.tellAllInstances=function(a,b,c){if(this.activePlugin==null)return false;for(var b=this.getSrcFromId(b),e=this.instances.length-1;e>=0;e--){var d=this.instances[e];if(!(b!=null&&d.src!=b))switch(a){case "pause":d.pause();break;case "resume":d.resume();break;case "setVolume":d.setVolume(c);break;case "setMasterVolume":d.setMasterVolume(c);break;case "mute":d.mute(c);break;case "stop":d.stop();break;case "setPan":d.setPan(c)}}return true};
b.proxy=function(a,b){return function(){return a.apply(b,arguments)}};createjs.SoundJS=b;f.channels={};f.create=function(a,b){var c=f.get(a);c==null?f.channels[a]=new f(a,b):c.max+=b};f.add=function(a,b){var c=f.get(a.src);return c==null?false:c.add(a,b)};f.remove=function(a){var b=f.get(a.src);if(b==null)return false;b.remove(a);return true};f.get=function(a){return f.channels[a]};f.prototype={src:null,max:null,length:0,init:function(a,b){this.src=a;this.max=b||1;this.instances=[]},get:function(a){return this.instances[a]},
add:function(a,b){if(!this.getSlot(b,a))return false;this.instances.push(a);this.length++;return true},remove:function(a){a=this.instances.indexOf(a);if(a==-1)return false;this.instances.splice(a,1);this.length--;return true},getSlot:function(a){for(var g,c,e=0,d=this.max||100;e<d;e++){g=this.get(e);if(g==null)return true;else if(a==b.INTERRUPT_NONE)continue;if(e==0)c=g;else if(g.playState==b.PLAY_FINISHED||g==b.PLAY_INTERRUPTED||g==b.PLAY_FAILED)c=g;else if(a==b.INTERRUPT_EARLY&&g.getPosition()<
c.getPosition()||a==b.INTERRUPT_LATE&&g.getPosition()>c.getPosition())c=g}return c!=null?(c.interrupt(),this.remove(c),true):false},toString:function(){return"[SoundJS SoundChannel]"}};b.defaultSoundInstance=new function(){this.isDefault=true;this.pause=this.resume=this.play=this.beginPlaying=this.cleanUp=this.interrupt=this.stop=this.setMasterVolume=this.setVolume=this.mute=this.setPan=this.getPosition=this.setPosition=this.playFailed=function(){return false};this.getVolume=this.getPan=this.getDuration=
function(){return 0};this.playState=b.PLAY_FAILED;this.toString=function(){return"[SoundJS Default Sound Instance]"}};d.init=function(){var a=navigator.userAgent;d.isFirefox=a.indexOf("Firefox")>-1;d.isOpera=window.opera!=null;d.isIOS=a.indexOf("iPod")>-1||a.indexOf("iPhone")>-1||a.indexOf("iPad")>-1};d.init();createjs.SoundJS.BrowserDetect=d})();this.createjs=this.createjs||{};
(function(){function b(){this.init()}function f(a){this.init(a)}function d(a){this.init(a)}b.MAX_INSTANCES=30;b.capabilities=null;b.lastId=0;b.AUDIO_READY="canplaythrough";b.AUDIO_ENDED="ended";b.AUDIO_ERROR="error";b.AUDIO_STALLED="stalled";b.fillChannels=false;b.isSupported=function(){if(createjs.SoundJS.BrowserDetect.isIOS)return false;b.generateCapabilities();return b.tag==null?false:true};b.generateCapabilities=function(){if(b.capabilities==null){var a=b.tag=document.createElement("audio");if(a.canPlayType==
null)return null;b.capabilities={panning:false,volume:true,mp3:a.canPlayType("audio/mp3")!="no"&&a.canPlayType("audio/mp3")!="",ogg:a.canPlayType("audio/ogg")!="no"&&a.canPlayType("audio/ogg")!="",mpeg:a.canPlayType("audio/mpeg")!="no"&&a.canPlayType("audio/mpeg")!="",wav:a.canPlayType("audio/wav")!="no"&&a.canPlayType("audio/wav")!="",channels:b.MAX_INSTANCES}}};b.prototype={capabilities:null,FT:0.0010,channels:null,init:function(){this.capabilities=b.capabilities;this.channels={}},register:function(a,
b){for(var c=d.get(a),e,f=0,j=b||1;f<j;f++)e=this.createTag(a),c.add(e);return{tag:e}},createTag:function(a){var b=document.createElement("audio");b.preload=false;b.src=a;return b},create:function(a){a=new f(a);a.owner=this;return a},toString:function(){return"[HTMLAudioPlugin]"}};createjs.HTMLAudioPlugin=b;f.prototype={src:null,uniqueId:-1,playState:null,owner:null,loaded:false,lastInterrupt:createjs.SoundJS.INTERRUPT_NONE,offset:0,delay:0,volume:1,pan:0,remainingLoops:0,delayTimeout:-1,tag:null,
muted:false,paused:false,onComplete:null,onLoop:null,onReady:null,onPlayFailed:null,onPlayInterrupted:null,endedHandler:null,readyHandler:null,stalledHandler:null,init:function(a){this.uniqueId=createjs.HTMLAudioPlugin.lastId++;this.src=a;this.endedHandler=createjs.SoundJS.proxy(this.handleSoundComplete,this);this.readyHandler=createjs.SoundJS.proxy(this.handleSoundReady,this);this.stalledHandler=createjs.SoundJS.proxy(this.handleSoundStalled,this)},cleanUp:function(){var a=this.tag;if(a!=null){a.pause();
try{a.currentTime=0}catch(b){}a.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_ENDED,this.endedHandler,false);a.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_READY,this.readyHandler,false);d.setInstance(this.src,a);this.tag=null}window.createjs!=null&&createjs.SoundJS.playFinished(this)},interrupt:function(){if(this.tag!=null){this.playState=createjs.SoundJS.PLAY_INTERRUPTED;if(this.onPlayInterrupted)this.onPlayInterrupted(this);this.cleanUp();this.paused=false}},play:function(a,b,c,e,d,
f){this.cleanUp();createjs.SoundJS.playInstance(this,a,b,c,e,d,f)},beginPlaying:function(a,b,c){if(window.createjs!=null){var e=this.tag=d.getInstance(this.src);if(e==null)return this.playFailed(),-1;e.addEventListener(createjs.HTMLAudioPlugin.AUDIO_ENDED,this.endedHandler,false);this.offset=a;this.volume=c;this.updateVolume();this.remainingLoops=b;e.readyState!==4?(e.addEventListener(createjs.HTMLAudioPlugin.AUDIO_READY,this.readyHandler,false),e.addEventListener(createjs.HTMLAudioPlugin.AUDIO_STALLED,
this.stalledHandler,false),e.load()):this.handleSoundReady(null);return 1}},handleSoundStalled:function(){if(this.onPlayFailed!=null)this.onPlayFailed(this);this.cleanUp()},handleSoundReady:function(){if(window.createjs!=null)if(this.playState=createjs.SoundJS.PLAY_SUCCEEDED,this.paused=false,this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_READY,this.readyHandler,false),this.offset>=this.getDuration())this.playFailed();else{if(this.offset>0)this.tag.currentTime=this.offset*0.0010;if(this.remainingLoops==
-1)this.tag.loop=true;this.tag.play()}},pause:function(){this.paused=true;return this.tag!=null?(this.tag.pause(),false):true},resume:function(){this.paused=false;return this.tag!=null?(this.tag.play(),false):true},stop:function(){this.pause();this.playState=createjs.SoundJS.PLAY_FINISHED;this.cleanUp();return true},setMasterVolume:function(){this.updateVolume();return true},setVolume:function(a){this.volume=a;this.updateVolume();return true},updateVolume:function(){return this.tag!=null?(this.tag.volume=
this.muted?0:this.volume*createjs.SoundJS.masterVolume,true):false},getVolume:function(){return this.volume},mute:function(a){this.muted=a;this.updateVolume();return true},setPan:function(){return false},getPan:function(){return 0},getPosition:function(){return this.tag==null?0:this.tag.currentTime*1E3},setPosition:function(a){if(this.tag==null)return false;try{this.tag.currentTime=a*0.0010}catch(b){return false}return true},getDuration:function(){return this.tag==null?0:this.tag.duration*1E3},handleSoundComplete:function(){if(this.remainingLoops!=
0){if(this.remainingLoops--,this.tag.play(),this.onLoop!=null)this.onLoop(this)}else if(window.createjs!=null){this.playState=createjs.SoundJS.PLAY_FINISHED;if(this.onComplete!=null)this.onComplete(this);this.cleanUp()}},playFailed:function(){if(window.createjs!=null){this.playState=createjs.SoundJS.PLAY_FAILED;if(this.onPlayFailed!=null)this.onPlayFailed(this);this.cleanUp()}},toString:function(){return"[HTMLAudioPlugin SoundInstance]"}};d.channels={};d.get=function(a){var b=d.channels[a];b==null&&
(b=d.channels[a]=new d(a));return b};d.getInstance=function(a){a=d.channels[a];return a==null?null:a.get()};d.setInstance=function(a,b){var c=d.channels[a];return c==null?null:c.set(b)};d.prototype={src:null,length:0,available:0,tags:null,init:function(a){this.src=a;this.tags=[]},add:function(a){this.tags.push(a);this.length++;this.available=this.tags.length},get:function(){if(this.tags.length==0)return null;this.available=this.tags.length;var a=this.tags.pop();document.body.appendChild(a);return a},
set:function(a){this.tags.indexOf(a)==-1&&this.tags.push(a);document.body.removeChild(a);this.available=this.tags.length},toString:function(){return"[HTMLAudioPlugin TagChannel]"}}})();
;

/*!
 * VERSION: beta 1.13
 * DATE: 2012-11-14
 * JavaScript (also available in AS3 and AS2)
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(window._gsQueue||(window._gsQueue=[])).push(function(){_gsDefine("plugins.BezierPlugin",["plugins.TweenPlugin"],function(E){var y=function(){E.call(this,"bezier",-1);this._overwriteProps.pop();this._func={};this._round={}},D=y.prototype=new E("bezier",1),H=180/Math.PI,z=[],A=[],B=[],F={},C=function(a,d,g,m){this.a=a;this.b=d;this.c=g;this.d=m;this.da=m-a;this.ca=g-a;this.ba=d-a},I=y.bezierThrough=function(a,d,g,m,j,b){var c={},f=[],e,i,n,j="string"===typeof j?","+j+",":",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,";
null==d&&(d=1);for(i in a[0])f.push(i);z.length=A.length=B.length=0;for(e=f.length;-1<--e;){i=f[e];F[i]=-1!==j.indexOf(","+i+",");n=c;var s=i,p;p=a;var k=i,t=F[i],l=b,q=[],r=void 0,h=void 0,v=void 0,u=void 0,w=void 0,r=void 0;if(l){p=[l].concat(p);for(h=p.length;-1<--h;)if("string"===typeof(r=p[h][k]))"="===r.charAt(1)&&(p[h][k]=l[k]+Number(r.charAt(0)+r.substr(2)))}r=p.length-2;if(0>r)q[0]=new C(p[0][k],0,0,p[-1>r?0:1][k]);else{for(h=0;h<r;h++)v=p[h][k],u=p[h+1][k],q[h]=new C(v,0,0,u),t&&(w=p[h+
2][k],z[h]=(z[h]||0)+(u-v)*(u-v),A[h]=(A[h]||0)+(w-u)*(w-u));q[h]=new C(p[h][k],0,0,p[h+1][k])}p=q;n[s]=p}for(e=z.length;-1<--e;)z[e]=Math.sqrt(z[e]),A[e]=Math.sqrt(A[e]);if(!m){for(e=f.length;-1<--e;)if(F[i]){a=c[f[e]];n=a.length-1;for(j=0;j<n;j++)b=a[j+1].da/A[j]+a[j].da/z[j],B[j]=(B[j]||0)+b*b}for(e=B.length;-1<--e;)B[e]=Math.sqrt(B[e])}for(e=f.length;-1<--e;){i=f[e];a=c[i];j=d;b=g;n=m;i=F[i];s=a.length-1;p=0;for(var k=a[0].a,x=w=u=l=r=u=v=r=h=v=q=l=t=void 0,t=0;t<s;t++)h=a[p],l=h.a,q=h.d,v=a[p+
1].d,i?(u=z[t],w=A[t],x=0.25*(w+u)*j/(n?0.5:B[t]||0.5),r=q-(q-l)*(n?0.5*j:x/u),v=q+(v-q)*(n?0.5*j:x/w),u=q-(r+(v-r)*(3*u/(u+w)+0.5)/4)):(r=q-0.5*(q-l)*j,v=q+0.5*(v-q)*j,u=q-(r+v)/2),r+=u,v+=u,h.c=r,h.b=0!==t?k:k=h.a+0.6*(h.c-h.a),h.da=q-l,h.ca=r-l,h.ba=k-l,b?(l=G(l,k,r,q),a.splice(p,1,l[0],l[1],l[2],l[3]),p+=4):p++,k=v;h=a[p];h.b=k;h.c=k+0.4*(h.d-k);h.da=h.d-h.a;h.ca=h.c-h.a;h.ba=k-h.a;b&&(l=G(h.a,k,h.c,h.d),a.splice(p,1,l[0],l[1],l[2],l[3]))}return c},G=y.cubicToQuadratic=function(a,d,g,m){var j=
{a:a},b={},c={},f={c:m},e=(a+d)/2,i=(d+g)/2,g=(g+m)/2,d=(e+i)/2,i=(i+g)/2,n=(i-d)/8;j.b=e+(a-e)/4;b.b=d+n;j.c=b.a=(j.b+b.b)/2;b.c=c.a=(d+i)/2;c.b=i-n;f.b=g+(m-g)/4;c.c=f.a=(c.b+f.b)/2;return[j,b,c,f]};y.quadraticToCubic=function(a,d,g){return new C(a,(2*d+a)/3,(2*d+g)/3,g)};D.constructor=y;y.API=2;y._cssRegister=function(){var a=window.com.greensock.plugins.CSSPlugin;if(a){var a=a._internals,d=a._parseToProxy,g=a._setPluginRatio,m=a._specialProps,j=a.CSSPropTween;a._registerComplexSpecialProp("bezier",
null,function(a,c,f,e,i,n){c instanceof Array&&(c={values:c});var n=new y,f=c.values,s=f.length-1,p=[],k={},t,l,q;if(0>s)return i;for(t=0;t<=s;t++)q=d(a,f[t],e,i,n,s!==t),p[t]=q.end;for(l in c)k[l]=c[l];k.values=p;i=new j(a,"bezier",0,0,q.pt,2);i.data=q;i.plugin=n;i.setRatio=g;0===k.autoRotate&&(k.autoRotate=!0);k.autoRotate&&!(k.autoRotate instanceof Array)&&(t=!0===k.autoRotate?0:Number(k.autoRotate)*_DEG2RAD,k.autoRotate=null!=q.end.left?[["left","top","rotation",t,!0]]:null!=q.end.x?[["x","y",
"rotation",t,!0]]:!1);k.autoRotate&&(e._transform||(i=m.rotation.parse(a,0,l,e,i,n,{})),q.autoRotate=e._transform);n._onInitTween(q.proxy,k,e._tween);return i})}};D._onInitTween=function(a,d,g){this._target=a;d instanceof Array&&(d={values:d});this._props=[];this._timeRes=null==d.timeResolution?6:parseInt(d.timeResolution);var m=d.values||[],j={},b=m[0],g=d.autoRotate||g.vars.orientToBezier,c,f,e;this._autoRotate=g?g instanceof Array?g:[["x","y","rotation",!0===g?0:Number(g)||0]]:null;for(c in b)this._props.push(c);
for(b=this._props.length;-1<--b;)c=this._props[b],this._overwriteProps.push(c),g=this._func[c]="function"===typeof a[c],j[c]=!g?parseFloat(a[c]):a[c.indexOf("set")||"function"!==typeof a["get"+c.substr(3)]?c:"get"+c.substr(3)](),e||j[c]!==m[0][c]&&(e=j);if("cubic"!==d.type&&"quadratic"!==d.type&&"soft"!==d.type)j=I(m,isNaN(d.curviness)?1:d.curviness,!1,"thruBasic"===d.type,d.correlate,e);else{g=(g=d.type)||"soft";d={};e="cubic"===g?3:2;var g="soft"===g,b=[],i,n,s,p,k,t,l,q,r;g&&j&&(m=[j].concat(m));
if(null==m||m.length<e+1)throw"invalid Bezier data";for(n in m[0])b.push(n);for(t=b.length;-1<--t;){n=b[t];d[n]=k=[];r=0;q=m.length;for(l=0;l<q;l++)i=null==j?m[l][n]:"string"===typeof(s=m[l][n])&&"="===s.charAt(1)?j[n]+Number(s.charAt(0)+s.substr(2)):Number(s),g&&1<l&&l<q-1&&(k[r++]=(i+k[r-2])/2),k[r++]=i;q=r-e+1;for(l=r=0;l<q;l+=e)i=k[l],n=k[l+1],s=k[l+2],p=2===e?0:k[l+3],k[r++]=s=3===e?new C(i,n,s,p):new C(i,(2*n+i)/3,(2*n+s)/3,s);k.length=r}j=d}this._beziers=j;this._segCount=this._beziers[c].length;
if(this._timeRes){b=this._beziers;c=this._timeRes;c=c>>0||6;j=[];n=[];m=s=0;d=c-1;e=[];g=[];for(f in b){i=b[f];k=j;t=c;l=1/t;q=i.length;for(var h=void 0,v=void 0,u=p=r=v=void 0,w=h=void 0,x=void 0,x=u=void 0;-1<--q;){u=i[q];v=u.a;r=u.d-v;p=u.c-v;u=u.b-v;v=0;for(w=1;w<=t;w++)h=l*w,x=1-h,h=v-(v=(h*h*r+3*x*(h*p+x*u))*h),x=q*t+w-1,k[x]=(k[x]||0)+h*h}}b=j.length;for(f=0;f<b;f++)s+=Math.sqrt(j[f]),i=f%c,g[i]=s,i===d&&(m+=s,i=f/c>>0,e[i]=g,n[i]=m,s=0,g=[]);this._length=m;this._lengths=n;this._segments=e;
this._l1=this._li=this._s1=this._si=0;this._l2=this._lengths[0];this._curSeg=this._segments[0];this._s2=this._curSeg[0];this._prec=1/this._curSeg.length}if(g=this._autoRotate){g[0]instanceof Array||(this._autoRotate=g=[g]);for(b=g.length;-1<--b;)for(f=0;3>f;f++)c=g[b][f],this._func[c]="function"===typeof a[c]?a[c.indexOf("set")||"function"!==typeof a["get"+c.substr(3)]?c:"get"+c.substr(3)]:!1}return!0};D.setRatio=function(a){var d=this._segCount,g=this._func,m=this._target,j,b,c,f,e;if(this._timeRes){j=
this._lengths;f=this._curSeg;a*=this._length;b=this._li;if(a>this._l2&&b<d-1){for(d-=1;b<d&&(this._l2=j[++b])<=a;);this._l1=j[b-1];this._li=b;this._curSeg=f=this._segments[b];this._s2=f[this._s1=this._si=0]}else if(a<this._l1&&0<b){for(;0<b&&(this._l1=j[--b])>=a;);0===b&&a<this._l1?this._l1=0:b++;this._l2=j[b];this._li=b;this._curSeg=f=this._segments[b];this._s1=f[(this._si=f.length-1)-1]||0;this._s2=f[this._si]}j=b;a-=this._l1;b=this._si;if(a>this._s2&&b<f.length-1){for(d=f.length-1;b<d&&(this._s2=
f[++b])<=a;);this._s1=f[b-1];this._si=b}else if(a<this._s1&&0<b){for(;0<b&&(this._s1=f[--b])>=a;);0===b&&a<this._s1?this._s1=0:b++;this._s2=f[b];this._si=b}f=(b+(a-this._s1)/(this._s2-this._s1))*this._prec}else j=0>a?0:1<=a?d-1:d*a>>0,f=(a-j*(1/d))*d;d=1-f;for(b=this._props.length;-1<--b;)if(a=this._props[b],c=this._beziers[a][j],e=(f*f*c.da+3*d*(f*c.ca+d*c.ba))*f+c.a,this._round[a]&&(e=e+(0<e?0.5:-0.5)>>0),g[a])m[a](e);else m[a]=e;if(this._autoRotate){var d=this._autoRotate,i,n,s,p,k;for(b=d.length;-1<
--b;)a=d[b][2],p=d[b][3]||0,k=!0===d[b][4]?1:H,c=this._beziers[d[b][0]][j],e=this._beziers[d[b][1]][j],i=c.a+(c.b-c.a)*f,n=c.b+(c.c-c.b)*f,i+=(n-i)*f,n+=(c.c+(c.d-c.c)*f-n)*f,c=e.a+(e.b-e.a)*f,s=e.b+(e.c-e.b)*f,c+=(s-c)*f,s+=(e.c+(e.d-e.c)*f-s)*f,e=Math.atan2(s-c,n-i)*k+p,g[a]?g[a].call(m,e):m[a]=e}};D._roundProps=function(a,d){for(var g=this._overwriteProps,m=g.length;-1<--m;)if(a[g[m]]||a.bezier||a.bezierThrough)this._round[g[m]]=d};D._kill=function(a){var d=this._props,g,m;for(g in this._beziers)if(g in
a){delete this._beziers[g];delete this._func[g];for(m=d.length;-1<--m;)d[m]===g&&d.splice(m,1)}return E.prototype._kill.call(this,a)};E.activate([y]);return y},!0)});window._gsDefine&&_gsQueue.pop()();;

/*!
 * VERSION: beta 1.648
 * DATE: 2012-11-23
 * JavaScript 
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(window._gsQueue||(window._gsQueue=[])).push(function(){_gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(R){var w=function(){R.call(this,"css");this._overwriteProps.length=0},X,Y,s,Z,J={},l=w.prototype=new R("css");l.constructor=w;w.version=1.648;w.API=2;w.defaultTransformPerspective=0;l="px";w.suffixMap={top:l,right:l,bottom:l,left:l,width:l,height:l,fontSize:l,padding:l,margin:l,perspective:l};var $=/(?:\d|\-\d|\.\d|\-\.\d)+/g,ja=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
aa=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,S=/[^\d\-\.]/g,Ba=/(?:\d|\-|\+|=|#|\.)*/g,ba=/opacity *= *([^)]*)/,Ca=/opacity:([^;]*)/,ka=/([A-Z])/g,la=/-([a-z])/gi,ma=function(a,b){return b.toUpperCase()},Da=/(?:Left|Right|Width)/i,Ea=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,Fa=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,E=Math.PI/180,N=180/Math.PI,T={},O=document,P=O.createElement("div"),F=w._internals={_specialProps:J},x=navigator.userAgent,ca,na,oa,pa,qa,K,ra=x.indexOf("Android"),sa=
O.createElement("div");pa=(oa=-1!==x.indexOf("Safari")&&-1===x.indexOf("Chrome")&&(-1===ra||3<Number(x.substr(ra+8,1))))&&6>Number(x.substr(x.indexOf("Version/")+8,1));/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(x);qa=parseFloat(RegExp.$1);sa.innerHTML="<a style='top:1px;opacity:.55;'>a</a>";K=(x=sa.getElementsByTagName("a")[0])?/^0.55/.test(x.style.opacity):!1;var ta=function(a){return ba.test("string"===typeof a?a:(a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100:1},ua=
"",da="",Q=function(a,b){var b=b||P,e=b.style,c,f;if(void 0!==e[a])return a;a=a.charAt(0).toUpperCase()+a.substr(1);c=["O","Moz","ms","Ms","Webkit"];for(f=5;-1<--f&&void 0===e[c[f]+a];);return 0<=f?(da=3===f?"ms":c[f],ua="-"+da.toLowerCase()+"-",da+a):null},U=O.defaultView?O.defaultView.getComputedStyle:function(){},v=w.getStyle=function(a,b,e,c,f){var i;if(!K&&"opacity"===b)return ta(a);!c&&a.style[b]?i=a.style[b]:(e=e||U(a,null))?i=(a=e.getPropertyValue(b.replace(ka,"-$1").toLowerCase()))||e.length?
a:e[b]:a.currentStyle&&(e=a.currentStyle,i=e[b],!i&&"backgroundPosition"===b&&(i=e[b+"X"]+" "+e[b+"Y"]));return null!=f&&(!i||"none"===i||"auto"===i||"auto auto"===i)?f:i},V=function(a,b,e){var c={},f=a._gsOverwrittenClassNamePT,i;if(f&&!e){for(;f;)f.setRatio(0),f=f._next;a._gsOverwrittenClassNamePT=null}if(b=b||U(a,null))if(i=b.length)for(;-1<--i;)c[b[i].replace(la,ma)]=b.getPropertyValue(b[i]);else for(i in b)c[i]=b[i];else if(b=a.currentStyle||a.style)for(i in b)c[i.replace(la,ma)]=b[i];K||(c.opacity=
ta(a));a=ea(a,b,!1);c.rotation=a.rotation*N;c.rotationX=a.rotationX*N;c.rotationY=a.rotationY*N;c.skewX=a.skewX*N;c.scaleX=a.scaleX;c.scaleY=a.scaleY;c.scaleZ=a.scaleZ;c.x=a.x;c.y=a.y;c.z=a.z;c.filters&&delete c.filters;return c},va=function(a,b,e,c){var f={},a=a.style,i,d,g;for(d in e)if("cssText"!==d&&"length"!==d&&isNaN(d)&&b[d]!==(i=e[d]))if(-1===d.indexOf("Origin")&&("number"===typeof i||"string"===typeof i))f[d]=(""===i||"auto"===i||"none"===i)&&"string"===typeof b[d]&&""!==b[d].replace(S,"")?
0:i,void 0!==a[d]&&(g=new fa(a,d,a[d],g));if(c)for(d in c)"className"!==d&&(f[d]=c[d]);return{difs:f,firstMPT:g}},Ga={width:["Left","Right"],height:["Top","Bottom"]},Ha=["marginLeft","marginRight","marginTop","marginBottom"],D=function(a,b,e,c,f){if("px"===c||!c)return e;if("auto"===c||!e)return 0;var i=Da.test(b),d=a,g=P.style,j=0>e;j&&(e=-e);"%"===c&&-1!==b.indexOf("border")?i=e/100*(i?a.clientWidth:a.clientHeight):(g.cssText="border-style:solid; border-width:0; position:absolute; line-height:0;",
"%"===c||"em"===c||!d.appendChild?(d=a.parentNode||O.body,g[i?"width":"height"]=e+c):g[i?"borderLeftWidth":"borderTopWidth"]=e+c,d.appendChild(P),i=parseFloat(P[i?"offsetWidth":"offsetHeight"]),d.removeChild(P),0===i&&!f&&(i=D(a,b,e,c,!0)));return j?-i:i},ga=function(a,b){if(null==a||""===a||"auto"===a||"auto auto"===a)a="0 0";var e=a.split(" "),c=-1!==a.indexOf("left")?"0%":-1!==a.indexOf("right")?"100%":e[0],f=-1!==a.indexOf("top")?"0%":-1!==a.indexOf("bottom")?"100%":e[1];null==f?f="0":"center"===
f&&(f="50%");if("center"===c||isNaN(parseFloat(c)))c="50%";b&&(b.oxp=-1!==c.indexOf("%"),b.oyp=-1!==f.indexOf("%"),b.oxr="="===c.charAt(1),b.oyr="="===f.charAt(1),b.ox=parseFloat(c.replace(S,"")),b.oy=parseFloat(f.replace(S,"")));return c+" "+f+(2<e.length?" "+e[2]:"")},wa=function(a,b){return"string"===typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1")*parseFloat(a.substr(2)):parseFloat(a)-parseFloat(b)},G=function(a,b){return null==a?b:"string"===typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+
"1")*Number(a.substr(2))+b:Number(a)},L=function(a,b){if(null==a)return b;var e=-1===a.indexOf("rad")?E:1,c="="===a.charAt(1),a=Number(a.replace(S,""))*e;return c?a+b:a},ha=function(a,b){var e=(("number"===typeof a?a*E:L(a,b))-b)%(2*Math.PI);e!==e%Math.PI&&(e+=Math.PI*(0>e?2:-2));return b+e},M={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,
0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},ia=function(a){if(!a||""===a)return M.black;if(M[a])return M[a];if("number"===typeof a)return[a>>16,a>>8&255,a&255];if("#"===a.charAt(0)){if(4===a.length)var b=a.charAt(1),e=a.charAt(2),a=a.charAt(3),a="#"+b+b+e+e+a+a;a=parseInt(a.substr(1),16);return[a>>16,a>>8&255,a&255]}a=a.match($)||M.transparent;a[0]=Number(a[0]);a[1]=Number(a[1]);a[2]=Number(a[2]);
3<a.length&&(a[3]=Number(a[3]));return a},H="(?:\\b(?:(?:rgb|rgba)\\(.+?\\))|\\B#.+?\\b";for(l in M)H+="|"+l+"\\b";var H=RegExp(H+")","gi"),xa=function(a,b,e){if(null==a)return function(a){return a};var c=b?(a.match(H)||[""])[0]:"",f=a.split(c).join("").match(aa)||[],i=a.substr(0,a.indexOf(f[0])),d=")"===a.charAt(a.length-1)?")":"",g=-1!==a.indexOf(" ")?" ":",",j=f.length,h=0<j?f[0].replace($,""):"";return b?function(a){"number"===typeof a&&(a+=h);var b=(a.match(H)||[c])[0],a=a.split(b).join("").match(aa)||
[],n=a.length;if(j>n--)for(;++n<j;)a[n]=e?a[(n-1)/2>>0]:f[n];return i+a.join(g)+g+b+d}:function(a){"number"===typeof a&&(a+=h);var a=a.match(aa)||[],b=a.length;if(j>b--)for(;++b<j;)a[b]=e?a[(b-1)/2>>0]:f[b];return i+a.join(g)+d}},x=function(a){a=a.split(",");return function(b,e,c,f,i,d,g){e=(e+"").split(" ");g={};for(c=0;4>c;c++)g[a[c]]=e[c]=e[c]||e[(c-1)/2>>0];return f.parse(b,g,i,d)}};F._setPluginRatio=function(a){this.plugin.setRatio(a);for(var b=this.data,e=b.proxy,c=b.firstMPT,f;c;)f=e[c.v],
c.r?f=0<f?f+0.5>>0:f-0.5>>0:1E-6>f&&-1E-6<f&&(f=0),c.t[c.p]=f,c=c._next;b.autoRotate&&(b.autoRotate.rotation=e.rotation);if(1===a)for(c=b.firstMPT;c;){a=c.t;if(a.type){if(1===a.type){e=a.xs0+a.s+a.xs1;for(b=1;b<a.l;b++)e+=a["xn"+b]+a["xs"+(b+1)];a.e=e}}else a.e=a.s+a.xs0;c=c._next}};var fa=function(a,b,e,c,f){this.t=a;this.p=b;this.v=e;this.r=f;c&&(c._prev=this,this._next=c)};F._parseToProxy=function(a,b,e,c,f,i){var d=c,g={},j={},h=e._transform,k=T,m;e._transform=null;T=b;c=a=e.parse(a,b,c,f);T=
k;i&&(e._transform=h,d&&(d._prev=null,d._prev&&(d._prev._next=null)));for(;c&&c!==d;){if(1>=c.type&&(h=c.p,j[h]=c.s+c.c,g[h]=c.s,i||(m=new fa(c,"s",h,m,c.r),c.c=0),1===c.type))for(e=c.l;0<--e;)k="xn"+e,h=c.p+"_"+k,j[h]=c.data[k],g[h]=c[k],i||(m=new fa(c,k,h,m,c.rxp[k]));c=c._next}return{proxy:g,end:j,firstMPT:m,pt:a}};var q=F.CSSPropTween=function(a,b,e,c,f,i,d,g,j,h,k){this.t=a;this.p=b;this.s=e;this.c=c;this.n=d||"css_"+b;a instanceof q||Z.push(this.n);this.r=g;this.type=i||0;j&&(this.pr=j,X=!0);
this.b=void 0===h?e:h;this.e=void 0===k?e+c:k;f&&(this._next=f,f._prev=this)},W=w.parseComplex=function(a,b,e,c,f,i,d,g,j,h){var d=new q(a,b,0,0,d,h?2:1,null,!1,g,e,c),a=e.split(", ").join(",").split(" "),b=(c+"").split(", ").join(",").split(" "),e=a.length,g=!1!==ca,k,m,n,A,l;e!==b.length&&(a=(i||"").split(" "),e=a.length);d.plugin=j;d.setRatio=h;for(i=0;i<e;i++)if(j=a[i],k=b[i],(h=parseFloat(j))||0===h)d.appendXtra("",h,wa(k,h),k.replace(ja,""),g&&-1!==k.indexOf("px"),!0);else if(f&&("#"===j.charAt(0)||
0===j.indexOf("rgb")||M[j]))j=ia(j),k=ia(k),(h=6<j.length+k.length)&&!K&&0===k[3]?(d["xs"+d.l]+=d.l?" transparent":"transparent",d.e=d.e.split(b[i]).join("transparent")):(d.appendXtra(h?"rgba(":"rgb(",j[0],k[0]-j[0],",",!0,!0).appendXtra("",j[1],k[1]-j[1],",",!0).appendXtra("",j[2],k[2]-j[2],h?",":")",!0),h&&(j=4>j.length?1:j[3],d.appendXtra("",j,(4>k.length?1:k[3])-j,")",!1)));else if(h=j.match($)){n=k.match(ja);if(!n||n.length!==h.length)return d;for(k=m=0;k<h.length;k++)l=h[k],A=j.indexOf(l,m),
d.appendXtra(j.substr(m,A-m),Number(l),wa(n[k],l),"",g&&"px"===j.substr(A+l.length,2),0===k),m=A+l.length;d["xs"+d.l]+=j.substr(m)}else d["xs"+d.l]+=d.l?" "+j:j;if(-1!==c.indexOf("=")&&d.data){c=d.xs0+d.data.s;for(i=1;i<d.l;i++)c+=d["xs"+i]+d.data["xn"+i];d.e=c+d["xs"+i]}d.l||(d.type=-1,d.xs0=d.e);return d.xfirst||d},B=9,l=q.prototype;for(l.l=l.pr=0;0<--B;)l["xn"+B]=0,l["xs"+B]="";l.xs0="";l._next=l._prev=l.xfirst=l.data=l.plugin=l.setRatio=l.rxp=null;l.appendXtra=function(a,b,e,c,f,i){var d=this.l;
this["xs"+d]+=i&&d?" "+a:a||"";if(!e&&0!==d&&!this.plugin)return this["xs"+d]+=b+(c||""),this;this.l++;this.type=this.setRatio?2:1;this["xs"+this.l]=c||"";if(0<d)return this.data["xn"+d]=b+e,this.rxp["xn"+d]=f,this["xn"+d]=b,this.plugin||(this.xfirst=new q(this,"xn"+d,b,e,this.xfirst||this,0,this.n,f,this.pr),this.xfirst.xs0=0),this;this.data={s:b+e};this.rxp={};this.s=b;this.c=e;this.r=f;return this};var ya=function(a,b,e,c,f,i,d){this.p=c?Q(a)||a:a;J[a]=J[this.p]=this;this.format=i||xa(b,f);e&&
(this.parse=e);this.clrs=f;this.dflt=b;this.pr=d||0},p=F._registerComplexSpecialProp=function(a,b,e,c,f,i,d){for(var a=a.split(","),b=b instanceof Array?b:[b],g=a.length;-1<--g;)new ya(a[g],b[g],e,c&&0===g,f,i,d)},F=function(a,b){J[a]||p(a,null,function(a,c,f,i,d,g,j){var h=window.com.greensock.plugins[b];if(!h)return window.console&&console.log("Error: "+b+" js file not loaded."),d;h._cssRegister();return J[f].parse(a,c,f,i,d,g,j)})},l=ya.prototype;l.parseComplex=function(a,b,e,c,f,i){return W(a,
this.p,b,e,this.clrs,this.dflt,c,this.pr,f,i)};l.parse=function(a,b,e,c,f,i){return this.parseComplex(a.style,this.format(v(a,e,s,!1,this.dflt)),this.format(b),f,i)};w.registerSpecialProp=function(a,b,e){p(a,null,function(a,f,i,d,g,j){g=new q(a,i,0,0,g,2,i,!1,e);g.plugin=j;g.setRatio=b(a,f,d._tween,i);return g},!1,!1,null,e)};var za="scaleX scaleY scaleZ x y z skewX rotation rotationX rotationY perspective".split(" "),C=Q("transform"),Ia=ua+"transform",Aa=Q("transformOrigin"),I=null!==Q("perspective"),
ea=function(a,b,e){var c=e?a._gsTransform||{skewY:0}:{skewY:0},f=0>c.scaleX,i=I?parseFloat(v(a,Aa,b,!1,"0 0 0").split(" ")[2])||c.zOrigin||0:0,d,g,j,h,k,m,n,A;C?d=v(a,Ia,b,!0):a.currentStyle&&(d=(d=a.currentStyle.filter.match(Ea))&&4===d.length?d[0].substr(4)+","+Number(d[2].substr(4))+","+Number(d[1].substr(4))+","+d[3].substr(4)+","+(c?c.x:0)+","+(c?c.y:0):null);g=(d||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[];for(b=g.length;-1<--b;)g[b]=Number(g[b]);if(16===g.length){if(f=g[8],d=g[9],j=g[10],h=g[12],
k=g[13],m=g[14],c.zOrigin&&(m=-c.zOrigin,h=f*m-g[12],k=d*m-g[13],m=j*m+c.zOrigin-g[14]),!e||h!==c.x||k!==c.y||m!==c.z){n=g[0];A=g[1];var l=g[2],z=g[3],t=g[4],r=g[5],p=g[6],Ja=g[7];g=g[11];var s=c.rotationX=Math.atan2(p,j),q,x,u,y;s&&(u=Math.cos(-s),y=Math.sin(-s),s=t*u+f*y,q=r*u+d*y,x=p*u+j*y,f=t*-y+f*u,d=r*-y+d*u,j=p*-y+j*u,g=Ja*-y+g*u,t=s,r=q,p=x);if(s=c.rotationY=Math.atan2(f,n))u=Math.cos(-s),y=Math.sin(-s),q=A*u-d*y,x=l*u-j*y,d=A*y+d*u,j=l*y+j*u,g=z*y+g*u,n=n*u-f*y,A=q,l=x;if(s=c.rotation=Math.atan2(A,
r))u=Math.cos(-s),y=Math.sin(-s),n=n*u+t*y,q=A*u+r*y,r=A*-y+r*u,p=l*-y+p*u,A=q;Math.abs(c.rotationY)>Math.PI/2&&(c.rotationY*=-1,c.rotationX+=Math.PI,c.rotation=Math.PI-c.rotation);c.scaleX=Math.sqrt(n*n+A*A);c.scaleY=Math.sqrt(r*r+d*d);c.scaleZ=Math.sqrt(p*p+j*j);c.skewX=0;c.perspective=g?1/g:0;c.x=h;c.y=k;c.z=m}}else if(!I||0===g.length||c.x!==g[4]||c.y!==g[5]||!c.rotationX&&!c.rotationY){h=(d=6<=g.length)?g[0]:1;m=g[1]||0;k=g[2]||0;n=d?g[3]:1;c.x=g[4]||0;c.y=g[5]||0;d=Math.sqrt(h*h+m*m);j=Math.sqrt(n*
n+k*k);h=h||m?Math.atan2(m,h):c.rotation||0;k=k||n?Math.atan2(k,n)+h:c.skewX||0;m=d-Math.abs(c.scaleX||0);n=j-Math.abs(c.scaleY||0);Math.abs(k)>Math.PI/2&&Math.abs(k)<1.5*Math.PI&&(f?(d*=-1,k+=0>=h?Math.PI:-Math.PI,h+=0>=h?Math.PI:-Math.PI):(j*=-1,k+=0>=k?Math.PI:-Math.PI));f=(h-c.rotation)%Math.PI;A=(k-c.skewX)%Math.PI;if(void 0===c.skewX||1E-6<m||-1E-6>m||1E-6<n||-1E-6>n||1E-6<f||-1E-6>f||1E-6<A||-1E-6>A)c.scaleX=d,c.scaleY=j,c.rotation=h,c.skewX=k;I&&(c.rotationX=c.rotationY=c.z=0,c.perspective=
parseFloat(w.defaultTransformPerspective)||0,c.scaleZ=1)}c.zOrigin=i;for(b in c)1E-6>c[b]&&-1E-6<c[b]&&(c[b]=0);e&&(a._gsTransform=c);return c},Ka=function(a){var b=this.data,e=-b.rotation,c=e+b.skewX,f=Math.cos(e)*b.scaleX,e=Math.sin(e)*b.scaleX,i=Math.sin(c)*-b.scaleY,c=Math.cos(c)*b.scaleY,d=1E-6,g=this.t.style,j=this.t.currentStyle,h;if(j){f<d&&f>-d&&(f=0);e<d&&e>-d&&(e=0);i<d&&i>-d&&(i=0);c<d&&c>-d&&(c=0);d=e;e=-i;i=-d;d=j.filter;g.filter="";var k=this.t.offsetWidth;h=this.t.offsetHeight;var m=
"absolute"!==j.position,n="progid:DXImageTransform.Microsoft.Matrix(M11="+f+", M12="+e+", M21="+i+", M22="+c,l=b.x,s=b.y,z,t;null!=b.ox&&(z=(b.oxp?0.01*k*b.ox:b.ox)-k/2,t=(b.oyp?0.01*h*b.oy:b.oy)-h/2,l+=z-(z*f+t*e),s+=t-(z*i+t*c));if(m)z=k/2,t=h/2,n+=", Dx="+(z-(z*f+t*e)+l)+", Dy="+(t-(z*i+t*c)+s)+")";else{var r=8>qa?1:-1;z=b.ieOffsetX||0;t=b.ieOffsetY||0;b.ieOffsetX=Math.round((k-((0>f?-f:f)*k+(0>e?-e:e)*h))/2+l);b.ieOffsetY=Math.round((h-((0>c?-c:c)*h+(0>i?-i:i)*k))/2+s);for(B=0;4>B;B++)k=Ha[B],
h=j[k],h=-1!==h.indexOf("px")?parseFloat(h):D(this.t,k,parseFloat(h),h.replace(Ba,""))||0,l=h!==b[k]?2>B?-b.ieOffsetX:-b.ieOffsetY:2>B?z-b.ieOffsetX:t-b.ieOffsetY,g[k]=(b[k]=Math.round(h-l*(0===B||2===B?1:r)))+"px";n+=", sizingMethod='auto expand')"}g.filter=-1!==d.indexOf("DXImageTransform.Microsoft.Matrix(")?d.replace(Fa,n):n+" "+d;if(0===a||1===a)if(1===f&&0===e&&0===i&&1===c&&(!m||-1!==n.indexOf("Dx=0, Dy=0")))(!ba.test(d)||100===parseFloat(RegExp.$1))&&-1===d.indexOf("gradient(")&&g.removeAttribute("filter")}},
La=function(){var a=this.data,b=a.perspective,e=a.scaleX,c=0,f=0,i=0,d=0,g=a.scaleY,j=0,h=0,k=0,m=0,n=a.scaleZ,l=0,s=0,z=0,t=b?-1/b:0,r=a.rotation,p=a.zOrigin,q,x,v,w,u;r&&(q=Math.cos(r),r=Math.sin(r),v=g*r,c=e*-r,g*=q,e*=q,d=v);if(r=a.rotationY)q=Math.cos(r),r=Math.sin(r),w=n*-r,u=t*-r,f=e*r,j=d*r,n*=q,t*=q,e*=q,d*=q,k=w,s=u;if(r=a.rotationX)q=Math.cos(r),r=Math.sin(r),x=c*q+f*r,v=g*q+j*r,w=m*q+n*r,u=z*q+t*r,f=c*-r+f*q,j=g*-r+j*q,n=m*-r+n*q,t=z*-r+t*q,c=x,g=v,m=w,z=u;p&&(l-=p,i=f*l,h=j*l,l=n*l+p);
i+=a.x;h+=a.y;l+=a.z;1E-6>l&&-1E-6<l&&(l=0);this.t.style[C]="matrix3d("+(1E-6>e&&-1E-6<e?0:e)+","+(1E-6>d&&-1E-6<d?0:d)+","+(1E-6>k&&-1E-6<k?0:k)+","+(1E-6>s&&-1E-6<s?0:s)+","+(1E-6>c&&-1E-6<c?0:c)+","+(1E-6>g&&-1E-6<g?0:g)+","+(1E-6>m&&-1E-6<m?0:m)+","+(1E-6>z&&-1E-6<z?0:z)+","+(1E-6>f&&-1E-6<f?0:f)+","+(1E-6>j&&-1E-6<j?0:j)+","+(1E-6>n&&-1E-6<n?0:n)+","+(1E-6>t&&-1E-6<t?0:t)+","+(1E-6>i&&-1E-6<i?0:i)+","+(1E-6>h&&-1E-6<h?0:h)+","+l+","+(b?1+-l/b:1)+")"},Ma=function(){var a=this.data;if(!a.rotation&&
!a.skewX)this.t.style[C]="matrix("+a.scaleX+",0,0,"+a.scaleY+","+a.x+","+a.y+")";else{var b=a.rotation,e=b-a.skewX,c=Math.cos(b)*a.scaleX,b=Math.sin(b)*a.scaleX,f=Math.sin(e)*-a.scaleY,e=Math.cos(e)*a.scaleY;this.t.style[C]="matrix("+(1E-6>c&&-1E-6<c?0:c)+","+(1E-6>b&&-1E-6<b?0:b)+","+(1E-6>f&&-1E-6<f?0:f)+","+(1E-6>e&&-1E-6<e?0:e)+","+a.x+","+a.y+")"}};p("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective",
null,function(a,b,e,c,f,i,d){if(c._transform)return f;var b=c._transform=ea(a,s,!0),g=a.style,j=za.length,h,k,m,n;if("string"===typeof d.transform&&C)k=g[C],g[C]=d.transform,h=ea(a,null,!1),g[C]=k;else if("object"===typeof d){k=null!=d.rotation?d.rotation:null!=d.rotationZ?d.rotationZ:b.rotation*N;h={scaleX:G(null!=d.scaleX?d.scaleX:d.scale,b.scaleX),scaleY:G(null!=d.scaleY?d.scaleY:d.scale,b.scaleY),scaleZ:G(null!=d.scaleZ?d.scaleZ:d.scale,b.scaleZ),x:G(d.x,b.x),y:G(d.y,b.y),z:G(d.z,b.z),perspective:G(d.transformPerspective,
b.perspective)};h.rotation=null!=d.shortRotation||null!=d.shortRotationZ?ha(d.shortRotation||d.shortRotationZ||0,b.rotation):"number"===typeof k?k*E:L(k,b.rotation);I&&(h.rotationX=null!=d.shortRotationX?ha(d.shortRotationX,b.rotationX):"number"===typeof d.rotationX?d.rotationX*E:L(d.rotationX,b.rotationX),h.rotationY=null!=d.shortRotationY?ha(d.shortRotationY,b.rotationY):"number"===typeof d.rotationY?d.rotationY*E:L(d.rotationY,b.rotationY),1E-6>h.rotationX&&-1E-6<h.rotationX&&(h.rotationX=0),1E-6>
h.rotationY&&-1E-6<h.rotationY&&(h.rotationY=0));h.skewX=null==d.skewX?b.skewX:"number"===typeof d.skewX?d.skewX*E:L(d.skewX,b.skewX);h.skewY=null==d.skewY?b.skewY:"number"===typeof d.skewY?d.skewY*E:L(d.skewY,b.skewY);if(k=h.skewY-b.skewY)h.skewX+=k,h.rotation+=k;1E-6>h.skewY&&-1E-6<h.skewY&&(h.skewY=0);1E-6>h.skewX&&-1E-6<h.skewX&&(h.skewX=0);1E-6>h.rotation&&-1E-6<h.rotation&&(h.rotation=0)}n=b.z||b.rotationX||b.rotationY||h.z||h.rotationX||h.rotationY;!n&&null!=h.scale&&(h.scaleZ=1);if(C){if(oa){na=
!0;if(""===g.zIndex&&(k=v(a,"zIndex",s),"auto"===k||""===k))g.zIndex=0;pa&&(g.WebkitBackfaceVisibility=d.WebkitBackfaceVisibility||(n?"visible":"hidden"))}}else g.zoom=1;f=new q(a,"transform",0,0,f,2);f.setRatio=n&&I?La:C?Ma:Ka;f.plugin=i;f.data=b;for(Z.pop();-1<--j;)if(e=za[j],m=h[e]-b[e],1E-6<m||-1E-6>m||null!=T[e])f=new q(b,e,b[e],m,f),f.xs0=0,f.plugin=i,c._overwriteProps.push(f.n);if((m=d.transformOrigin)||I&&n&&b.zOrigin)C?(m=(m||v(a,e,s,!1,"50% 50%"))+"",e=Aa,f=new q(g,e,0,0,f,-1,"css_transformOrigin"),
f.b=g[e],f.plugin=i,I?(k=b.zOrigin,m=m.split(" "),b.zOrigin=(2<m.length?parseFloat(m[2]):k)||0,f.xs0=f.e=g[e]=m[0]+" "+(m[1]||"50%")+" 0px",f=new q(b,"zOrigin",0,0,f,-1,f.n),f.b=k,f.xs0=f.e=b.zOrigin):f.xs0=f.e=g[e]=m):ga(m+"",b);return f.t===a?(f._next&&(f._next._prev=null),f._next):f},!0);p("boxShadow","0px 0px 0px 0px #999",null,!0,!0);p("borderRadius","0px",function(a,b,e,c,f){var b=this.format(b),c=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],
i=a.style,d,g,j,h,k,m,n,l,q,p,t,r;l=parseFloat(a.offsetWidth);q=parseFloat(a.offsetHeight);b=b.split(" ");for(d=0;d<c.length;d++)this.p.indexOf("border")&&(c[d]=Q(c[d])),h=j=v(a,c[d],s,!1,"0px"),k=g=b[d],m=parseFloat(h),t=h.substr((m+"").length),(r="="===k.charAt(1))?(n=parseInt(k.charAt(0)+"1"),k=k.substr(2),n*=parseFloat(k),p=k.substr((n+"").length-(0>n?1:0))||""):(n=parseFloat(k),p=k.substr((n+"").length)),""===p&&(p=Y[e]||t),p!==t&&(h=D(a,"borderLeft",m,t),m=D(a,"borderTop",m,t),"%"===p?(h=100*
(h/l)+"%",j=100*(m/q)+"%"):"em"===p?(t=D(a,"borderLeft",1,"em"),h=h/t+"em",j=m/t+"em"):(h+="px",j=m+"px"),r&&(k=parseFloat(h)+n+p,g=parseFloat(j)+n+p)),f=W(i,c[d],h+" "+j,k+" "+g,!1,"0px",f);return f},!0,!1,xa("0px 0px 0px 0px",!1,!0));p("backgroundPosition","0 0",null,!1,!1,ga);p("backgroundSize","0 0",null,!1,!1,ga);p("perspective","0px",null,!0);p("perspectiveOrigin","50% 50%",null,!0);p("transformStyle","preserve-3d",null,!0);p("margin",null,x("marginTop,marginRight,marginBottom,marginLeft"));
p("padding",null,x("paddingTop,paddingRight,paddingBottom,paddingLeft"));p("clip","rect(0px,0px,0px,0px)");p("textShadow","0px 0px 0px #999",null,!1,!0);p("autoRound",null,function(a,b,e,c,f){return f});p("border","0px solid #000",function(a,b,e,c,f,i){return this.parseComplex(a.style,this.format(v(a,"borderTopWidth",s,!1,"0px")+" "+v(a,"borderTopStyle",s,!1,"solid")+" "+v(a,"borderTopColor",s,!1,"#000")),this.format(b),f,i)},!1,!0,function(a){var b=a.split(" ");return b[0]+" "+(b[1]||"solid")+" "+
(a.match(H)||["#000"])[0]});var Na=function(a){var b=this.t,a=this.s+this.c*a,e;100===a&&(b.removeAttribute("filter"),e=!v(this.data,"filter"));e||(this.xn1&&(b.filter=b.filter||"alpha(opacity=100)"),b.filter=-1===b.filter.indexOf("opacity")?b.filter+(" alpha(opacity="+(a>>0)+")"):b.filter.replace(ba,"opacity="+(a>>0)))};p("opacity,alpha,autoAlpha","1",function(a,b,e,c,f,i){var d=parseFloat(v(a,"opacity",s,!1,"1")),b=parseFloat(b),g=a.style,j;"autoAlpha"===e&&(j=v(a,"visibility",s),1===d&&"hidden"===
j&&(d=0),f=new q(g,"visibility",0,0,f,-1,null,!1,0,0!==d?"visible":"hidden",0===b?"hidden":"visible"),f.xs0="visible",c._overwriteProps.push(f.n));K?f=new q(g,"opacity",d,b-d,f):(f=new q(g,"opacity",100*d,100*(b-d),f),f.xn1="autoAlpha"===e?1:0,g.zoom=1,f.type=2,f.b="alpha(opacity="+f.s+")",f.e="alpha(opacity="+(f.s+f.c)+")",f.data=a,f.plugin=i,f.setRatio=Na);return f});var Oa=function(a){if(1===a||0===a){this.t.className=1===a?this.e:this.b;for(var a=this.data,b=this.t.style,e=b.removeProperty?"removeProperty":
"removeAttribute";a;){if(a.v)b[a.p]=a.v;else b[e](a.p.replace(ka,"-$1").toLowerCase());a=a._next}}else this.t.className!==this.b&&(this.t.className=this.b)};p("className",null,function(a,b,e,c,f,i,d){var g=a.className,j=a.style.cssText,f=c._classNamePT=new q(a,e,0,0,f,2);f.setRatio=Oa;f.b=g;f.e="="!==b.charAt(1)?b:"+"===b.charAt(0)?g+" "+b.substr(2):g.split(b.substr(2)).join("");c._tween._duration&&(b=V(a,s,!0),a.className=f.e,d=va(a,b,V(a),d),a.className=g,f.data=d.firstMPT,a.style.cssText=j,f=f.xfirst=
c.parse(a,d.difs,f,i));return f});F("bezier","BezierPlugin");F("throwProps","ThrowPropsPlugin");l=w.prototype;l._firstPT=null;l._onInitTween=function(a,b,e){if(!a.nodeType)return!1;this._target=a;this._tween=e;ca=b.autoRound;X=!1;Y=b.suffixMap||w.suffixMap;s=U(a,"");Z=this._overwriteProps;var e=a.style,c,f,i;if(na&&""===e.zIndex&&(c=v(a,"zIndex",s),"auto"===c||""===c))e.zIndex=0;"string"===typeof b&&(f=e.cssText,c=V(a,s),e.cssText=f+";"+b,c=va(a,c,V(a)).difs,!K&&Ca.test(b)&&(c.opacity=parseFloat(RegExp.$1)),
b=c,e.cssText=f);this._firstPT=a=this.parse(a,b,null);if(X){for(;a;){e=a._next;for(b=f;b&&b.pr>a.pr;)b=b._next;(a._prev=b?b._prev:i)?a._prev._next=a:f=a;(a._next=b)?b._prev=a:i=a;a=e}this._firstPT=f}return!0};l.parse=function(a,b,e,c){var f=a.style,i,d,g,j,h,k,m,l;for(i in b){h=b[i];if(d=J[i])e=d.parse(a,h,i,this,e,c,b);else if(d=v(a,i,s)+"",m="string"===typeof h,"color"===i||"fill"===i||"stroke"===i||-1!==i.indexOf("Color")||m&&!h.indexOf("rgb"))m||(h=ia(h),h=(3<h.length?"rgba(":"rgb(")+h.join(",")+
")"),e=W(f,i,d,h,!0,"transparent",e,0,c);else if(m&&(-1!==h.indexOf(" ")||-1!==h.indexOf(",")))e=W(f,i,d,h,!0,null,e,0,c);else{g=parseFloat(d);k=d.substr((g+"").length);if(""===d||"auto"===d)if("width"===i||"height"===i){g=a;l=i;j=s;k=parseFloat("width"===l?g.offsetWidth:g.offsetHeight);l=Ga[l];var p=l.length;for(j=j||U(g,null);-1<--p;)k-=parseFloat(v(g,"padding"+l[p],j,!0))||0,k-=parseFloat(v(g,"border"+l[p]+"Width",j,!0))||0;g=k;k="px"}else g="opacity"!==i?0:1,k="";(l=m&&"="===h.charAt(1))?(j=parseInt(h.charAt(0)+
"1"),h=h.substr(2),j*=parseFloat(h),m=h.substr((j+"").length-(0>j?1:0))||""):(j=parseFloat(h),m=m?h.substr((j+"").length)||"":"");""===m&&(m=Y[i]||k);h=j||0===j?(l?j+g:j)+m:b[i];if(k!==m&&""!==m&&(j||0===j))if(g||0===g)if(g=D(a,i,g,k),"%"===m?(g/=D(a,i,100,"%")/100,100<g&&(g=100)):"em"===m?g/=D(a,i,1,"em"):(j=D(a,i,j,m),m="px"),l&&(j||0===j))h=j+g+m;l&&(j+=g);(g||0===g)&&(j||0===j)?(e=new q(f,i,g,j-g,e,0,"css_"+i,!1!==ca&&("px"===m||"zIndex"===i),0,d,h),e.xs0=m):(e=new q(f,i,j||g||0,0,e,-1,"css_"+
i,!1,0,d,h),e.xs0="display"===i&&"none"===h?d:h)}c&&(e&&!e.plugin)&&(e.plugin=c)}return e};l.setRatio=function(a){var b=this._firstPT,e,c;if(1===a&&(this._tween._time===this._tween._duration||0===this._tween._time))for(;b;)2!==b.type?b.t[b.p]=b.e:b.setRatio(a),b=b._next;else if(a||!(this._tween._time===this._tween._duration||0===this._tween._time)||-1E-6===this._tween._rawPrevTime)for(;b;){e=b.c*a+b.s;b.r?e=0<e?e+0.5>>0:e-0.5>>0:1E-6>e&&-1E-6<e&&(e=0);if(b.type)if(1===b.type)if(c=b.l,2===c)b.t[b.p]=
b.xs0+e+b.xs1+b.xn1+b.xs2;else if(3===c)b.t[b.p]=b.xs0+e+b.xs1+b.xn1+b.xs2+b.xn2+b.xs3;else if(4===c)b.t[b.p]=b.xs0+e+b.xs1+b.xn1+b.xs2+b.xn2+b.xs3+b.xn3+b.xs4;else if(5===c)b.t[b.p]=b.xs0+e+b.xs1+b.xn1+b.xs2+b.xn2+b.xs3+b.xn3+b.xs4+b.xn4+b.xs5;else{e=b.xs0+e+b.xs1;for(c=1;c<b.l;c++)e+=b["xn"+c]+b["xs"+(c+1)];b.t[b.p]=e}else-1===b.type?b.t[b.p]=b.xs0:b.setRatio&&b.setRatio(a);else b.t[b.p]=e+b.xs0;b=b._next}else for(;b;)2!==b.type?b.t[b.p]=b.b:b.setRatio(a),b=b._next};l._linkCSSP=function(a,b,e){a&&
(b&&(b._prev=a),a._next&&(a._next._prev=a._prev),e&&(e._next=a),a._prev?a._prev._next=a._next:this._firstPT===a&&(this._firstPT=a._next),a._next=b,a._prev=e);return a};l._kill=function(a){var b=a,e=!1,c,f;if(a.css_autoAlpha||a.css_alpha){b={};for(f in a)b[f]=a[f];b.css_opacity=1;b.css_autoAlpha&&(b.css_visibility=1)}if(a.css_className&&(c=this._classNamePT))(a=c.xfirst)&&a._prev?this._linkCSSP(a._prev,c._next,a._prev._prev):a===this._firstPT&&(this._firstPT=null),c._next&&this._linkCSSP(c._next,c._next._next,
a._prev),this._target._gsOverwrittenClassNamePT=this._linkCSSP(c,this._target._gsOverwrittenClassNamePT),this._classNamePT=null,e=!0;return R.prototype._kill.call(this,b)||e};R.activate([w]);return w},!0)});window._gsDefine&&_gsQueue.pop()();;

/*!
 * VERSION: beta 0.42
 * DATE: 2012-09-19
 * JavaScript 
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(window._gsQueue||(window._gsQueue=[])).push(function(){_gsDefine("plugins.CSSRulePlugin",["plugins.TweenPlugin","TweenLite"],function(r){var l=function(){r.call(this,"cssRule");this._overwriteProps.pop()},n=l.prototype=new r("cssRule");n.constructor=l;l.API=2;l.suffixMap={top:"px",right:"px",bottom:"px",left:"px",width:"px",height:"px",fontSize:"px",padding:"px",margin:"px"};var p=/[^\d\-\.]/g,A=/(\d|\-|\+|=|#|\.)*/g,L=/(\d|\.)+/g,B=/opacity *= *([^)]*)/,M=/([A-Z])/g,N=/(M11|M12|M21|M22)=[\d\-\.e]+/gi, O=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,q=Math.PI/180,m=document,s=m.createElement("div"),o=navigator.userAgent,C,D,t,E=o.indexOf("Android"),F=m.createElement("div");D=-1!==o.indexOf("Safari")&&-1===o.indexOf("Chrome")&&(-1===E||3<Number(o.substr(E+8,1)));F.innerHTML="<a style='top:1px;opacity:.55;'>a</a>";t=(o=F.getElementsByTagName("a")[0])?/^0.55/.test(o.style.opacity):!1;var G=function(c){if(!c||""===c)return u.black;if(u[c])return u[c];if("number"===typeof c)return[c>>16,c>>8& 255,c&255];if("#"===c.charAt(0)){if(4===c.length)var a=c.charAt(1),d=c.charAt(2),c=c.charAt(3),c="#"+a+a+d+d+c+c;c=parseInt(c.substr(1),16);return[c>>16,c>>8&255,c&255]}return c.match(L)||u.transparent},H=m.defaultView?m.defaultView.getComputedStyle:function(){},x=function(c,a,d,b){return!t&&"opacity"===a?B.test("string"===typeof c?c:(c.currentStyle?c.currentStyle.filter:c.style.filter)||"")?parseFloat(RegExp.$1)/100:1:!b&&c.style[a]?c.style[a]:(d=d||H(c,null))?(c=d.getPropertyValue(a.replace(M,"-$1").toLowerCase()))|| d.length?c:d[a]:c.currentStyle?(d=c.currentStyle,b=d[a],!b&&"backgroundPosition"===a?d[a+"X"]+" "+d[a+"Y"]:b):null},I={scaleX:1,scaleY:1,x:1,y:1,rotation:1,shortRotation:1,skewX:1,skewY:1,scale:1},J="",y="",i=function(c,a){var a=a||m.body||m.documentElement,d=H(a,""),b,e;if(x(a,c))return c;c=c.substr(0,1).toUpperCase()+c.substr(1);b=["O","Moz","ms","Ms","Webkit"];for(e=5;-1<--e&&!x(a,b[e]+c,d););return 0<=e?(y=3===e?"ms":b[e],J="-"+y.toLowerCase()+"-",y+c):null}("transform"),P=J+"transform";l.getRule= function(c){var a=m.all?"rules":"cssRules",d=m.styleSheets,b=d.length,e=":"===c.charAt(0),f,g,h,c=(e?"":",")+c+",";for(e&&(h=[]);-1<--b;){g=d[b][a];for(f=g.length;-1<--f;)if(-1!==(","+g[f].selectorText.split("::").join(":")+",").indexOf(c))if(e)h.push(g[f].style);else return g[f].style}return h};var K=function(c,a){s.cssText=c.cssText;var d=c._gsTransform,b;i?b=x(s,P,null,!0):s.currentStyle&&(b=(b=s.currentStyle.filter.match(N))&&4===b.length?b[0].substr(4)+","+Number(b[2].substr(4))+","+Number(b[1].substr(4))+ ","+b[3].substr(4)+","+(d?d.x:0)+","+(d?d.y:0):null);b=(b||"").replace(/[^\d\-\.e,]/g,"").split(",");var e=6<=b.length,f=e?Number(b[0]):1,g=e?Number(b[1]):0,h=e?Number(b[2]):0,j=e?Number(b[3]):1,d=a?d||{skewY:0}:{skewY:0},k=0>d.scaleX;d.x=e?Number(b[4]):0;d.y=e?Number(b[5]):0;d.scaleX=Math.sqrt(f*f+g*g);d.scaleY=Math.sqrt(j*j+h*h);d.rotation=f||g?Math.atan2(g,f):d.rotation||0;d.skewX=h||j?Math.atan2(h,j)+d.rotation:d.skewX||0;Math.abs(d.skewX)>Math.PI/2&&(k?(d.scaleX*=-1,d.skewX+=0>=d.rotation?Math.PI: -Math.PI,d.rotation+=0>=d.rotation?Math.PI:-Math.PI):(d.scaleY*=-1,d.skewX+=0>=d.skewX?Math.PI:-Math.PI));if(1E-6>d.rotation&&-1E-6<d.rotation&&(f||g))d.rotation=0;if(1E-6>d.skewX&&-1E-6<d.skewX&&(g||h))d.skewX=0;a&&(c._gsTransform=d);return d},z=function(c,a){if(null==c||""===c||"auto"===c)c="0 0";var a=a||{},d=-1!==c.indexOf("left")?"0%":-1!==c.indexOf("right")?"100%":c.split(" ")[0],b=-1!==c.indexOf("top")?"0%":-1!==c.indexOf("bottom")?"100%":c.split(" ")[1];null==b?b="0":"center"===b&&(b="50%"); "center"===d&&(d="50%");a.oxp=-1!==d.indexOf("%");a.oyp=-1!==b.indexOf("%");a.oxr="="===d.charAt(1);a.oyr="="===b.charAt(1);a.ox=parseFloat(d.replace(p,""));a.oy=parseFloat(b.replace(p,""));return a},v=function(c,a){return null==c?a:"string"===typeof c&&1===c.indexOf("=")?parseInt(c.charAt(0)+"1")*Number(c.substr(2))+a:Number(c)},w=function(c,a){var d=-1===c.indexOf("rad")?q:1,b=1===c.indexOf("="),c=Number(c.replace(p,""))*d;return b?c+a:c},u={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192], black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]};n._onInitTween=function(c,a,d){this._style=c;this._tween=d;this._transform=null;if(C&&(""===this._style.zIndex||"auto"===this._style.zIndex))this._style.zIndex=0;this._parseVars(a,c,a.suffixMap|| l.suffixMap);return!0};n._parseVars=function(c,a,d){var b,e,f,g,h,j,k;for(b in c)if(e=c[b],"transform"===b||b===i)this._parseTransform(a,e,d);else if(I[b]||"transformOrigin"===b)this._parseTransform(a,c,d);else{if("alpha"===b||"autoAlpha"===b)b="opacity";else if("margin"===b||"padding"===b){e=(e+"").split(" ");g=e.length;f={};f[b+"Top"]=e[0];f[b+"Right"]=1<g?e[1]:e[0];f[b+"Bottom"]=4===g?e[2]:e[0];f[b+"Left"]=4===g?e[3]:2===g?e[1]:e[0];this._parseVars(f,a,d);continue}else if("backgroundPosition"=== b||"backgroundSize"===b){f=z(e);k=z(g=a[b]||"50% 50%");this._firstPT=f={_next:this._firstPT,t:a,p:b,b:g,f:!1,n:"css_"+b,type:3,s:k.ox,c:f.oxr?f.ox:f.ox-k.ox,ys:k.oy,yc:f.oyr?f.oy:f.oy-k.oy,sfx:f.oxp?"%":"px",ysfx:f.oyp?"%":"px",r:!f.oxp&&!1!==c.autoRound};f.e=f.s+f.c+f.sfx+" "+(f.ys+f.yc)+f.ysfx;continue}else if("border"===b){e=(e+"").split(" ");this._parseVars({borderWidth:e[0],borderStyle:e[1]||"none",borderColor:e[2]||"#000000"},a,d);continue}else if("autoRound"===b)continue;g=a[b];g=null!=g?g+ "":"";this._firstPT=f={_next:this._firstPT,t:a,p:b,b:g,f:!1,n:"css_"+b,sfx:"",r:!1,type:0};"opacity"===b&&null!=c.autoAlpha&&(this._firstPT=f._prev={_next:f,t:a,p:"visibility",f:!1,n:"css_visibility",r:!1,type:-1,b:0!==Number(g)?"visible":"hidden",i:"visible",e:0===Number(e)?"hidden":"visible"},this._overwriteProps.push("css_visibility"));if("color"===b||"fill"===b||"stroke"===b||-1!==b.indexOf("Color")||"string"===typeof e&&!e.indexOf("rgb(")){if(h=G(g),e=G(e),f.e=f.i=(3<e.length?"rgba(":"rgb(")+ e.join(",")+")",f.b=(3<h.length?"rgba(":"rgb(")+h.join(",")+")",f.s=Number(h[0]),f.c=Number(e[0])-f.s,f.gs=Number(h[1]),f.gc=Number(e[1])-f.gs,f.bs=Number(h[2]),f.bc=Number(e[2])-f.bs,f.type=1,3<h.length||3<e.length)if(t)f.as=4>h.length?1:Number(h[3]),f.ac=(4>e.length?1:Number(e[3]))-f.as,f.type=2;else if(0==e[3]&&(f.e=f.i="transparent",f.type=-1),0==h[3])f.b="transparent"}else{h=g.replace(A,"");k=""===g||"auto"===g?"opacity"!==b?0:1:-1===g.indexOf(" ")?parseFloat(g.replace(p,"")):NaN;"string"=== typeof e?(g="="===e.charAt(1),j=e.replace(A,""),e=-1===e.indexOf(" ")?parseFloat(e.replace(p,"")):NaN):(g=!1,j="");""===j&&(j=d[b]||h);f.e=e||0===e?(g?e+k:e)+j:c[b];if(h!==j&&""!==j&&(e||0===e))if(k||0===k)throw"CSSRulePlugin error: starting and ending units don't match on tween of "+b+" ("+h+" vs "+j+")";if((k||0===k)&&(e||0===e)&&(f.c=g?e:e-k))if(f.s=k,f.sfx=j,"opacity"===b)t||(f.type=4,f.p="filter",f.b="alpha(opacity="+100*f.s+")",f.e="alpha(opacity="+100*(f.s+f.c)+")",f.dup=null!=c.autoAlpha, this._style.zoom=1);else{if(!1!==c.autoRound&&("px"===j||"zIndex"===b))f.r=!0}else f.type=-1,f.i="display"===b&&"none"===f.e?f.b:f.e,f.s=f.c=0}this._overwriteProps.push("css_"+b);f._next&&(f._next._prev=f)}};n._parseTransform=function(c,a){if(!this._transform){var d=this._transform=K(c,!0),b,e,f;if("object"===typeof a){b={scaleX:v(null!=a.scaleX?a.scaleX:a.scale,d.scaleX),scaleY:v(null!=a.scaleY?a.scaleY:a.scale,d.scaleY),x:v(a.x,d.x),y:v(a.y,d.y)};null!=a.shortRotation?(b.rotation="number"===typeof a.shortRotation? a.shortRotation*q:w(a.shortRotation,d.rotation),e=(b.rotation-d.rotation)%(2*Math.PI),e!==e%Math.PI&&(e+=Math.PI*(0>e?2:-2)),b.rotation=d.rotation+e):b.rotation=null==a.rotation?d.rotation:"number"===typeof a.rotation?a.rotation*q:w(a.rotation,d.rotation);b.skewX=null==a.skewX?d.skewX:"number"===typeof a.skewX?a.skewX*q:w(a.skewX,d.skewX);b.skewY=null==a.skewY?d.skewY:"number"===typeof a.skewY?a.skewY*q:w(a.skewY,d.skewY);if(e=b.skewY-d.skewY)b.skewX+=e,b.rotation+=e;1E-6>b.skewY&&-1E-6<b.skewY&& (b.skewY=0);1E-6>b.skewX&&-1E-6<b.skewX&&(b.skewX=0);1E-6>b.rotation&&-1E-6<b.rotation&&(b.rotation=0);if(null!=(e=a.transformOrigin))i?(f=i+"Origin",this._firstPT=e={_next:this._firstPT,t:c,p:f,s:0,c:0,n:f,f:!1,r:!1,b:c[f],e:e,i:e,type:-1,sfx:""},e._next&&(e._next._prev=e)):z(e,d)}else if("string"===typeof a&&i)e=c[i],c[i]=a,b=K(c,!1),c[i]=e;else return;if(i){if(D&&(C=!0,""===c.WebkitBackfaceVisibility&&(c.WebkitBackfaceVisibility="hidden"),""===c.zIndex))c.zIndex=0}else c.zoom=1;for(f in I)d[f]!== b[f]&&("shortRotation"!==f&&"scale"!==f)&&(this._firstPT=e={_next:this._firstPT,t:d,p:f,s:d[f],c:b[f]-d[f],n:f,f:!1,r:!1,b:d[f],e:b[f],type:0,sfx:0},e._next&&(e._next._prev=e),this._overwriteProps.push("css_"+f))}};n.setRatio=function(c){var a=this._firstPT,d=1E-6,b,e;if(1===c&&(this._tween._time===this._tween._duration||0===this._tween._time))for(;a;)a.t[a.p]=a.e,a=a._next;else if(c||!(this._tween._time===this._tween._duration||0===this._tween._time))for(;a;)b=a.c*c+a.s,a.r?b=0<b?b+0.5>>0:b-0.5>> 0:b<d&&b>-d&&(b=0),a.type?1===a.type?a.t[a.p]="rgb("+(b>>0)+", "+(a.gs+c*a.gc>>0)+", "+(a.bs+c*a.bc>>0)+")":2===a.type?a.t[a.p]="rgba("+(b>>0)+", "+(a.gs+c*a.gc>>0)+", "+(a.bs+c*a.bc>>0)+", "+(a.as+c*a.ac)+")":-1===a.type?a.t[a.p]=a.i:3===a.type?(e=a.ys+c*a.yc,a.r&&(e=0<e?e+0.5>>0:e-0.5>>0),a.t[a.p]=b+a.sfx+" "+e+a.ysfx):(a.dup&&(a.t.filter=a.t.filter||"alpha(opacity=100)"),a.t.filter=-1===a.t.filter.indexOf("opacity")?a.t.filter+(" alpha(opacity="+(100*b>>0)+")"):a.t.filter.replace(B,"opacity="+ (100*b>>0))):a.t[a.p]=b+a.sfx,a=a._next;else for(;a;)a.t[a.p]=a.b,a=a._next;if(this._transform)if(a=this._transform,i&&!a.rotation&&!a.skewX)this._style[i]=(a.x||a.y?"translate("+a.x+"px,"+a.y+"px) ":"")+(1!==a.scaleX||1!==a.scaleY?"scale("+a.scaleX+","+a.scaleY+")":"")||"translate(0px,0px)";else{b=i?a.rotation:-a.rotation;e=i?b-a.skewX:b+a.skewX;c=Math.cos(b)*a.scaleX;b=Math.sin(b)*a.scaleX;var f=Math.sin(e)*-a.scaleY;e=Math.cos(e)*a.scaleY;c<d&&c>-d&&(c=0);b<d&&b>-d&&(b=0);f<d&&f>-d&&(f=0);e<d&& e>-d&&(e=0);i?this._style[i]="matrix("+c+","+b+","+f+","+e+","+a.x+","+a.y+")":(d=b,b=-f,a=this._style.filter,this._style.filter="",d="progid:DXImageTransform.Microsoft.Matrix(M11="+c+", M12="+b+", M21="+-d+", M22="+e+",sizingMethod='auto expand')",this._style.filter=-1!==a.indexOf("DXImageTransform.Microsoft.Matrix(")?a.replace(O,d):d+" "+a)}};n._kill=function(c){var a=c,d;if(c.autoAlpha||c.alpha){a={};for(d in c)a[d]=c[d];a.opacity=1;a.autoAlpha&&(a.visibility=1)}return r.prototype._kill.call(this, a)};r.activate([l]);return l},!0)});window._gsDefine&&_gsQueue.pop()();;

/*!
 * VERSION: beta 1.0
 * DATE: 2012-06-19
 * JavaScript 
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(window._gsQueue||(window._gsQueue=[])).push(function(){_gsDefine("plugins.ColorPropsPlugin",["plugins.TweenPlugin"],function(i){var g=function(){i.call(this,"colorProps",-1);this._overwriteProps.pop()},j=g.prototype=new i("colorProps",-1),l=/(\d|\.)+/g,k=function(a){return""===a||null==a||"none"===a?h.transparent:h[a]?h[a]:"number"===typeof a?[a>>16,a>>8&255,a&255]:"#"===a.charAt(0)?(4===a.length&&(a="#"+a.charAt(1)+a.charAt(1)+a.charAt(2)+a.charAt(2)+a.charAt(3)+a.charAt(3)),a=parseInt(a.substr(1), 16),[a>>16,a>>8&255,a&255]):a.match(l)||h.transparent},h={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]};j.constructor=g;g.API=2;j._onInitTween=function(a,b){this._target=a;var d,e,f,c;for(d in b){f= k(b[d]);this._firstPT=c={_next:this._firstPT,p:d,f:"function"===typeof a[d],n:d,r:!1};e=k(!c.f?a[d]:a[d.indexOf("set")||"function"!==typeof a["get"+d.substr(3)]?d:"get"+d.substr(3)]());c.s=Number(e[0]);c.c=Number(f[0])-c.s;c.gs=Number(e[1]);c.gc=Number(f[1])-c.gs;c.bs=Number(e[2]);c.bc=Number(f[2])-c.bs;if(c.rgba=3<e.length||3<f.length)c.as=4>e.length?1:Number(e[3]),console.log("as "+c.as),c.ac=(4>f.length?1:Number(f[3]))-c.as;c._next&&(c._next._prev=c)}return!0};j.setRatio=function(a){for(var b= this._firstPT,d;b;){d=(b.rgba?"rgba(":"rgb(")+(b.s+a*b.c>>0)+", "+(b.gs+a*b.gc>>0)+", "+(b.bs+a*b.bc>>0)+(b.rgba?", "+(b.as+a*b.ac):"")+")";if(b.f)this._target[b.p](d);else this._target[b.p]=d;b=b._next}};i.activate([g]);return g},!0)});window._gsDefine&&_gsQueue.pop()();;

/**
 * VERSION: beta 0.11
 * DATE: 2012-10-26
 * JavaScript 
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue||(window._gsQueue=[])).push(function(){_gsDefine("plugins.EaselPlugin",["plugins.TweenPlugin"],function(j){var h=function(){j.call(this,"easel",-1);this._overwriteProps.pop()},k=h.prototype=new j("easel",-1),l=/(\d|\.)+/g,i;_colorProps="redMultiplier greenMultiplier blueMultiplier alphaMultiplier redOffset greenOffset blueOffset alphaOffset".split(" ");_parseColorFilter=function(a,c,d){if(!i&&(i=window.ColorFilter||window.createjs.ColorFilter,!i))throw"EaselPlugin error: The EaselJS ColorFilter JavaScript file wasn't loaded.";
for(var b=a.filters||[],f=b.length,g,e;-1<--f;)if(b[f]instanceof i){g=b[f];break}g||(g=new i,b.push(g),a.filters=b);b=g.clone();if(null!=c.tint)f=_parseColor(c.tint),e=null!=c.tintAmount?Number(c.tintAmount):1,b.redOffset=Number(f[0])*e,b.greenOffset=Number(f[1])*e,b.blueOffset=Number(f[2])*e,b.redMultiplier=b.greenMultiplier=b.blueMultiplier=1-e;else for(e in c)"exposure"!==e&&"brightness"!==e&&(b[e]=Number(c[e]));null!=c.exposure?(b.redOffset=b.greenOffset=b.blueOffset=255*(Number(c.exposure)-1),
b.redMultiplier=b.greenMultiplier=b.blueMultiplier=1):null!=c.brightness&&(e=Number(c.brightness)-1,b.redOffset=b.greenOffset=b.blueOffset=0<e?255*e:0,b.redMultiplier=b.greenMultiplier=b.blueMultiplier=1-Math.abs(e));for(f=8;-1<--f;)e=_colorProps[f],g[e]!==b[e]&&d._addTween(g,e,g[e],b[e],"easel_colorFilter");d._overwriteProps.push("easel_colorFilter");if(!a.cacheID)throw"EaselPlugin warning: for filters to display in EaselJS, you must call the object's cache() method first. "+a;};_parseColor=function(a){return""===
a||null==a||"none"===a?_colorLookup.transparent:_colorLookup[a]?_colorLookup[a]:"number"===typeof a?[a>>16,a>>8&255,a&255]:"#"===a.charAt(0)?(4===a.length&&(a="#"+a.charAt(1)+a.charAt(1)+a.charAt(2)+a.charAt(2)+a.charAt(3)+a.charAt(3)),a=parseInt(a.substr(1),16),[a>>16,a>>8&255,a&255]):a.match(l)||_colorLookup.transparent};_colorLookup={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,
0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]};k.constructor=h;h.API=2;k._onInitTween=function(a,c){this._target=a;var d,b,f;for(d in c)"colorFilter"===d||"tint"===d||"tintAmount"===d||"exposure"===d||"brightness"===d?f||(_parseColorFilter(a,c.colorFilter||c,this),f=!0):null!=a[d]&&(this._firstPT=b={_next:this._firstPT,t:a,p:d,f:"function"===typeof a[d],
n:d,pr:0,type:0},b.s=!b.f?parseFloat(a[d]):a[d.indexOf("set")||"function"!==typeof a["get"+d.substr(3)]?d:"get"+d.substr(3)](),b.c="number"===typeof c[d]?c[d]-b.s:"string"===typeof c[d]?parseFloat(c[d].split("=").join("")):0,b._next&&(b._next._prev=b));return!0};k.setRatio=function(a){for(var c=this._firstPT,d;c;){d=c.c*a+c.s;c.r&&(d=d+(0<d?0.5:-0.5)>>0);if(c.f)c.t[c.p](d);else c.t[c.p]=d;c=c._next}this._target.cacheID&&this._target.updateCache()};j.activate([h]);return h},!0)});
window._gsDefine&&_gsQueue.pop()();;

/*!
 * VERSION: beta 0.14
 * DATE: 2012-06-19
 * JavaScript 
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(window._gsQueue||(window._gsQueue=[])).push(function(){_gsDefine("plugins.RaphaelPlugin",["plugins.TweenPlugin","TweenLite"],function(o){var i=function(){o.call(this,"raphael");this._overwriteProps.pop()},k=i.prototype=new o("raphael");k.constructor=i;i.API=2;var p=/[^\d\-\.]/g,j=Math.PI/180,t=/(\d|\.)+/g,q=function(b){return"number"===typeof b?[b>>16,b>>8&255,b&255]:""===b||null==b||"none"===b||"string"!==typeof b?l.transparent:l[b]?l[b]:"#"===b.charAt(0)?(4===b.length&&(b="#"+b.charAt(1)+b.charAt(1)+ b.charAt(2)+b.charAt(2)+b.charAt(3)+b.charAt(3)),b=parseInt(b.substr(1),16),[b>>16,b>>8&255,b&255]):b.match(t)||l.transparent},r={scaleX:1,scaleY:1,tx:1,ty:1,rotation:1,shortRotation:1,skewX:1,skewY:1,scale:1},s=function(b,a){var c=b.matrix,e=c.a,d=c.b,g=c.c,f=c.d,h=a?b._gsTransform||{skewY:0}:{skewY:0},i=0>h.scaleX;h.tx=c.e-(h.ox||0);h.ty=c.f-(h.oy||0);h.scaleX=Math.sqrt(e*e+d*d);h.scaleY=Math.sqrt(f*f+g*g);h.rotation=e||d?Math.atan2(d,e):h.rotation||0;h.skewX=g||f?Math.atan2(g,f)+h.rotation:h.skewX|| 0;Math.abs(h.skewX)>Math.PI/2&&(i?(h.scaleX*=-1,h.skewX+=0>=h.rotation?Math.PI:-Math.PI,h.rotation+=0>=h.rotation?Math.PI:-Math.PI):(h.scaleY*=-1,h.skewX+=0>=h.skewX?Math.PI:-Math.PI));if(1.0E-6>h.rotation&&-1.0E-6<h.rotation&&(e||d))h.rotation=0;if(1.0E-6>h.skewX&&-1.0E-6<h.skewX&&(d||g))h.skewX=0;a&&(b._gsTransform=h);return h},m=function(b,a){return null==b?a:"string"===typeof b&&1===b.indexOf("=")?Number(b.split("=").join(""))+a:Number(b)},n=function(b,a){var c=-1===b.indexOf("rad")?j:1,e=1=== b.indexOf("="),b=Number(b.replace(p,""))*c;return e?b+a:b},l={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]};k._onInitTween=function(b,a,c){if(!b.attr)return!1;this._target=b;this._tween=c; this._props=b._gsProps=b._gsProps||{};var e,d,g,f;for(e in a)(c=a[e],"transform"===e)?this._parseTransform(b,c):r[e]||"pivot"===e?this._parseTransform(b,a):(d=b.attr(e),this._firstPT=g={_next:this._firstPT,t:this._props,p:e,b:d,f:!1,n:"raphael_"+e,r:!1,type:0},"fill"===e||"stroke"===e?(d=q(d),f=q(c),g.e=c,g.s=Number(d[0]),g.c=Number(f[0])-g.s,g.gs=Number(d[1]),g.gc=Number(f[1])-g.gs,g.bs=Number(d[2]),g.bc=Number(f[2])-g.bs,3<d.length||3<f.length?(g.as=4>d.length?1:Number(d[3]),g.ac=(4>f.length?1: Number(f[3]))-g.as,g.type=2):g.type=1):(d="string"===typeof d?parseFloat(d.replace(p,"")):Number(d),"string"===typeof c?(f="="===c.charAt(1),c=parseFloat(c.replace(p,""))):f=!1,g.e=c||0===c?f?c+d:c:a[e],(d||0===d)&&(c||0===c)&&(g.c=f?c:c-d))?g.s=d:(g.type=-1,g.i=a[e],g.s=g.c=0),this._overwriteProps.push("raphael_"+e),g._next&&(g._next._prev=g));return!0};k._parseTransform=function(b,a){if(!this._transform){var c=this._transform=s(b,!0),e,d,g,f,h;if("object"===typeof a){e={scaleX:m(null!=a.scaleX? a.scaleX:a.scale,c.scaleX),scaleY:m(null!=a.scaleY?a.scaleY:a.scale,c.scaleY),tx:m(a.tx,c.tx),ty:m(a.ty,c.ty)};null!=a.shortRotation?(e.rotation="number"===typeof a.shortRotation?a.shortRotation*j:n(a.shortRotation,c.rotation),d=(e.rotation-c.rotation)%(2*Math.PI),d!==d%Math.PI&&(d+=Math.PI*(0>d?2:-2)),e.rotation=c.rotation+d):e.rotation=null==a.rotation?c.rotation:"number"===typeof a.rotation?a.rotation*j:n(a.rotation,c.rotation);e.skewX=null==a.skewX?c.skewX:"number"===typeof a.skewX?a.skewX*j: n(a.skewX,c.skewX);e.skewY=null==a.skewY?c.skewY:"number"===typeof a.skewY?a.skewY*j:n(a.skewY,c.skewY);if(d=e.skewY-c.skewY)e.skewX+=d,e.rotation+=d;1.0E-6>e.skewY&&-1.0E-6<e.skewY&&(e.skewY=0);1.0E-6>e.skewX&&-1.0E-6<e.skewX&&(e.skewX=0);1.0E-6>e.rotation&&-1.0E-6<e.rotation&&(e.rotation=0);f=a.localPivot||a.globalPivot;"string"===typeof f?(f=f.split(","),d=Number(f[0]),f=Number(f[1])):"object"===typeof f?(d=Number(f.x),f=Number(f.y)):a.localPivot?(f=b.getBBox(!0),d=f.width/2,f=f.height/2):(f=b.getBBox(), d=f.x+f.width/2,f=f.y+f.height/2);a.localPivot?(h=b.matrix,d+=b.attr("x"),f+=b.attr("y"),this._pxl=d,this._pyl=f,this._pxg=d*h.a+f*h.c+h.e-c.tx,this._pyg=d*h.b+f*h.d+h.f-c.ty):(h=b.matrix.invert(),this._pxl=d*h.a+f*h.c+h.e,this._pyl=d*h.b+f*h.d+h.f,this._pxg=d-c.tx,this._pyg=f-c.ty)}else if("string"===typeof a&&_transformProp)f=this._target.transform(),b.transform(a),e=s(b,!1),b.transform(f);else return;for(g in r)c[g]!==e[g]&&("shortRotation"!==g&&"scale"!==g)&&(this._firstPT=d={_next:this._firstPT, t:c,p:g,s:c[g],c:e[g]-c[g],n:g,f:!1,r:!1,b:c[g],e:e[g],type:0},d._next&&(d._next._prev=d),this._overwriteProps.push("raphael_"+g))}};k.setRatio=function(b){for(var a=this._firstPT,c;a;)c=a.c*b+a.s,a.r&&(c=0<c?c+0.5>>0:c-0.5>>0),a.type?1===a.type?a.t[a.p]="rgb("+(c>>0)+", "+(a.gs+b*a.gc>>0)+", "+(a.bs+b*a.bc>>0)+")":2===a.type?a.t[a.p]="rgba("+(c>>0)+", "+(a.gs+b*a.gc>>0)+", "+(a.bs+b*a.bc>>0)+", "+(a.as+b*a.ac)+")":-1===a.type&&(a.t[a.p]=a.i):a.t[a.p]=c,a=a._next;this._target.attr(this._props);if(this._transform){a= this._transform;c=a.rotation;var e=c-a.skewX,b=Math.cos(c)*a.scaleX;c=Math.sin(c)*a.scaleX;var d=Math.sin(e)*-a.scaleY,e=Math.cos(e)*a.scaleY,g=this._pxl,f=this._pyl;1.0E-6>c&&-1.0E-6<c&&(c=0);1.0E-6>d&&-1.0E-6<d&&(d=0);a.ox=this._pxg-(g*b+f*d);a.oy=this._pyg-(g*c+f*e);this._target.transform("m"+b+","+c+","+d+","+e+","+(a.tx+a.ox)+","+(a.ty+a.oy))}};o.activate([i]);return i},!0)});window._gsDefine&&_gsQueue.pop()();;

/**
 * VERSION: beta 1.31
 * DATE: 2012-11-19
 * JavaScript (ActionScript 3 and 2 also available)
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue||(window._gsQueue=[])).push(function(){_gsDefine("plugins.RoundPropsPlugin",["plugins.TweenPlugin"],function(i){var c=function(){i.call(this,"roundProps",-1);this._overwriteProps.length=0},f=c.prototype=new i("roundProps",-1);f.constructor=c;c.API=2;f._onInitTween=function(b,e,d){this._tween=d;return!0};f._onInitAllProps=function(){for(var b=this._tween,e=b.vars.roundProps instanceof Array?b.vars.roundProps:b.vars.roundProps.split(","),d=e.length,c={},f=b._propLookup.roundProps,h,
a,g;-1<--d;)c[e[d]]=1;for(d=e.length;-1<--d;){h=e[d];for(a=b._firstPT;a;)g=a._next,a.pg?a.t._roundProps(c,!0):a.n===h&&(this._add(a.t,h,a.s,a.c),g&&(g._prev=a._prev),a._prev?a._prev._next=g:b._firstPT===a&&(b._firstPT=g),a._next=a._prev=null,b._propLookup[h]=f),a=g}return!1};f._add=function(b,e,d,c){this._addTween(b,e,d,d+c,e,!0);this._overwriteProps.push(e)};i.activate([c]);return c},!0)});window._gsDefine&&_gsQueue.pop()();;

/**
 * VERSION: beta 1.5
 * DATE: 2012-11-16
 * JavaScript 
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue||(window._gsQueue=[])).push(function(){_gsDefine("plugins.ScrollToPlugin",["plugins.TweenPlugin"],function(e){var d=function(){e.call(this,"scrollTo");this._overwriteProps.pop()},c=d.prototype=new e("scrollTo"),f=document.documentElement,g=window,i=d.max=function(a,b){var c="x"===b?"Width":"Height",d="scroll"+c,e="client"+c,h=document.body;return a===g||a===f||a===h?Math.max(f[d],h[d])-Math.max(f[e],h[e]):a[d]-a["offset"+c]},j=e.prototype.setRatio;c.constructor=d;d.API=2;c._onInitTween=
function(a,b,c){this._wdw=a===g;this._target=a;this._tween=c;"object"!==typeof b&&(b={y:b});this._autoKill=b.autoKill;this.x=this.xPrev=this.getX();this.y=this.yPrev=this.getY();null!=b.x?this._addTween(this,"x",this.x,"max"===b.x?i(a,"x"):b.x,"scrollTo_x",!0):this.skipX=!0;null!=b.y?this._addTween(this,"y",this.y,"max"===b.y?i(a,"y"):b.y,"scrollTo_y",!0):this.skipY=!0;return!0};c.getX=function(){return!this._wdw?this._target.scrollLeft:null!=g.pageXOffset?g.pageXOffset:null!=f.scrollLeft?f.scrollLeft:
document.body.scrollLeft};c.getY=function(){return!this._wdw?this._target.scrollTop:null!=g.pageYOffset?g.pageYOffset:null!=f.scrollTop?f.scrollTop:document.body.scrollTop};c._kill=function(a){a.scrollTo_x&&(this.skipX=!0);a.scrollTo_x&&(this.skipY=!0);return e.prototype._kill.call(this,a)};c._checkAutoKill=function(){this._autoKill&&(this.skipX&&this.skipY)&&this._tween.kill()};c.setRatio=function(a){j.call(this,a);var a=this.getX(),b=this.getY();!this.skipX&&a!==this.xPrev&&(this.skipX=!0,this._checkAutoKill());
!this.skipY&&b!==this.yPrev&&(this.skipY=!0,this._checkAutoKill());this._wdw?g.scrollTo(!this.skipX?this.x:a,!this.skipY?this.y:b):(this.skipY||(this._target.scrollTop=this.y),this.skipX||(this._target.scrollLeft=this.x));this.xPrev=this.x;this.yPrev=this.y};e.activate([d]);return d},!0)});window._gsDefine&&_gsQueue.pop()();;

//     Underscore.js 1.3.3
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.3.3';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    if (obj.length === +obj.length) results.length = obj.length;
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = _.toArray(obj).reverse();
    if (context && !initial) iterator = _.bind(iterator, context);
    return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.max.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.min.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      rand = Math.floor(Math.random() * (index + 1));
      shuffled[index] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, val, context) {
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      if (a === void 0) return 1;
      if (b === void 0) return -1;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    var result = {};
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj)                                     return [];
    if (_.isArray(obj))                           return slice.call(obj);
    if (_.isArguments(obj))                       return slice.call(obj);
    if (obj.toArray && _.isFunction(obj.toArray)) return obj.toArray();
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.isArray(obj) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especcialy useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var results = [];
    // The `isSorted` flag is irrelevant if the array only contains two elements.
    if (array.length < 3) isSorted = true;
    _.reduce(initial, function (memo, value, index) {
      if (isSorted ? _.last(memo) !== value || !memo.length : !_.include(memo, value)) {
        memo.push(value);
        results.push(array[index]);
      }
      return memo;
    }, []);
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = _.flatten(slice.call(arguments, 1), true);
    return _.filter(array, function(value){ return !_.include(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more, result;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        result = func.apply(context, args);
      }
      whenDone();
      throttling = true;
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      if (immediate && !timeout) func.apply(context, args);
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var result = {};
    each(_.flatten(slice.call(arguments, 1)), function(key) {
      if (key in obj) result[key] = obj[key];
    });
    return result;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function.
  function eq(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
    if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          // Ensure commutative equality for sparse arrays.
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent.
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  }

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return toString.call(obj) == '[object Arguments]';
  };
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Is a given value a function?
  _.isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
  };

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return _.isNumber(obj) && isFinite(obj);
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Has own property?
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return (''+string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    '\\': '\\',
    "'": "'",
    'r': '\r',
    'n': '\n',
    't': '\t',
    'u2028': '\u2028',
    'u2029': '\u2029'
  };

  for (var p in escapes) escapes[escapes[p]] = p;
  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  var unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(unescaper, function(match, escape) {
      return escapes[escape];
    });
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    settings = _.defaults(settings || {}, _.templateSettings);

    // Compile the template source, taking care to escape characters that
    // cannot be included in a string literal and then unescape them in code
    // blocks.
    var source = "__p+='" + text
      .replace(escaper, function(match) {
        return '\\' + escapes[match];
      })
      .replace(settings.escape || noMatch, function(match, code) {
        return "'+\n_.escape(" + unescape(code) + ")+\n'";
      })
      .replace(settings.interpolate || noMatch, function(match, code) {
        return "'+\n(" + unescape(code) + ")+\n'";
      })
      .replace(settings.evaluate || noMatch, function(match, code) {
        return "';\n" + unescape(code) + "\n;__p+='";
      }) + "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __p='';" +
      "var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" +
      source + "return __p;\n";

    var render = new Function(settings.variable || 'obj', '_', source);
    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for build time
    // precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' +
      source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      var wrapped = this._wrapped;
      method.apply(wrapped, arguments);
      var length = wrapped.length;
      if ((name == 'shift' || name == 'splice') && length === 0) delete wrapped[0];
      return result(wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

}).call(this);
;

