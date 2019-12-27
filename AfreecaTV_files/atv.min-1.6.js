/*!
 atv.js v1.6
 AfreecaTv common library 2019-07-11 
*/
!function(a){String.prototype.trim===a&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),String.prototype.trimLeft===a&&(String.prototype.trimLeft=function(){return this.replace(/^\s*/g,"")}),String.prototype.trimRight===a&&(String.prototype.trimRight=function(){return this.replace(/\s*$/g,"")}),Array.prototype.reduce===a&&(Array.prototype.reduce=function(b){if(void 0===this||null===this)throw new TypeError;var c,d=Object(this),e=d.length>>>0,f=0;if("function"!=typeof b)throw new TypeError;if(0===e&&1===arguments.length)throw new TypeError;if(arguments.length>=2)c=arguments[1];else for(;;){if(f in d){c=d[f++];break}if(++f>=e)throw new TypeError}for(;f<e;)f in d&&(c=b.call(a,c,d[f],f++,d));return c}),Array.prototype.indexOf===a&&(Array.prototype.indexOf=function(a,b){for(var c=b||0,d=this.length;c<d;c++)if(this[c]===a)return c;return-1}),Array.prototype.unset===a&&(Array.prototype.unset=function(a){-1!==this.indexOf(a)&&this.splice(this.indexOf(a),1)}),Array.prototype.unique===a&&(Array.prototype.unique=function(){var a=[];a:for(var b=0,c=this.length;b<c;b++){for(var d=0,e=a.length;d<e;d++)if(a[d]==this[b])continue a;a[a.length]=this[b]}return a}),Array.prototype.list===a&&(Array.prototype.list=function(){for(var a=this.length,b=arguments.length-a,c=b>0&&"string"!=typeof arguments[arguments.length-1]?arguments[arguments.length-1]:window;a--;)c[arguments[a]]=this[a];if(c!=window&&b--,b>0)for(b+=this.length;b-- >this.length;)c[arguments[b]]=null}),Array.prototype.filter===a&&(Array.prototype.filter=function(a){"use strict";if(void 0===this||null===this)throw new TypeError;var b=Object(this),c=b.length>>>0;if("function"!=typeof a)throw new TypeError;for(var d=[],e=arguments[1],f=0;f<c;f++)if(f in b){var g=b[f];a.call(e,g,f,b)&&d.push(g)}return d}),Array.prototype.chunk===a&&(Array.prototype.chunk=function(a){var b=this;return[].concat.apply([],b.map(function(c,d){return d%a?[]:[b.slice(d,d+a)]}))}),Function.prototype.bind===a&&(Function.prototype.bind=function(a){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),c=this,d=function(){},e=function(){return c.apply(this instanceof d&&a?this:a,b.concat(Array.prototype.slice.call(arguments)))};return d.prototype=this.prototype,e.prototype=new d,e})}(),function(win){function f(a){return a<10?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g,h=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,g=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;c<f;c+=1)g[c]=str(c,i)||"null";return e=0===g.length?"[]":gap?"[\n"+gap+g.join(",\n"+gap)+"\n"+h+"]":"["+g.join(",")+"]",gap=h,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;c<f;c+=1)"string"==typeof(d=rep[c])&&(e=str(d,i))&&g.push(quote(d)+(gap?": ":":")+e);else for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i))&&g.push(quote(d)+(gap?": ":":")+e);return e=0===g.length?"{}":gap?"{\n"+gap+g.join(",\n"+gap)+"\n"+h+"}":"{"+g.join(",")+"}",gap=h,e}}void 0===win.JSON&&(win.JSON={});var JSON=win.JSON;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;d<c;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)if(Object.hasOwnProperty.call(e,c))if(void 0!==(d=walk(e,c)))e[c]=d;else try{delete e[c]}catch(a){}return reviver.call(a,b,e)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(window),function(a){function b(a,b,c){var d,e=void 0===c||c;for(d in b)a[d]&&!e||(a[d]=b[d]);return a}function c(a){try{var b=s.prototype.instance;("booleen"==typeof a||"object"!=typeof a&&!g(a))&&(a={})}catch(a){}return b.merge(b,a,!1)}function d(a){var b=!1;if(!b)var c=setInterval(function(){"complete"===u.readyState&&(clearInterval(c),b=!0,a&&a())},50)}function e(a,b){setTimeout(a,++b>=0?b:1)}function f(a){return null===a?String(a):v[w.call(a)]||"object"}function g(a){return"function"===f(a)}function h(a){return"object"===f(a)}function i(a){return a instanceof Array}function j(a){return/^(true|1)$/i.test(a)}function k(a,b){if(a){var c;if(h(a)&&i(a))for(var d=0;d<a.length&&void 0===(c=b(a[d],d));d++);else h(a)&&b(a,0);return c}}function l(a,b){return-1<a.indexOf(b)}function m(a){for(var b=[],c=0;c<a.length;c++)""!==a[c]&&null!==a[c]&&void 0!==a[c]&&b.push(a[c]);return b}function n(a,b){var c=[];return k(a,function(a){for(var d in b)b[d]===a[d]&&c.push(a)}),c}function o(a,b){return(a+"&"+b).replace(/[&?]{1,2}/,"?")}function p(a){var b,c=a||"",d={},e=[],f=c.substr(c.indexOf("?")+1).split("&");for(b=0;b<f.length;b+=1)e=f[b].split("="),d[e[0]]=e[1];return d}function q(a){return t.urlParameter.hasOwnProperty(a)?decodeURIComponent(t.urlParameter[a]):null}function r(a,b,c){var d=[],c=c||"&";for(var e in a)if(a.hasOwnProperty(e)){var f=b?b+"["+e+"]":e;"object"==typeof a[e]?d.push(r(a[e],e)):d.push(encodeURIComponent(f)+"="+encodeURIComponent(a[e]))}return d.join(c)}a.console=a.console||{log:function(){},debug:function(){}};var s=function(){if(s.prototype.instance)return s.prototype.instance;s.prototype.instance=this};s.prototype.toString=function(){return"[object Atv]"};var t=a.atv||new s,u=a.document||u.documentElement;if(void 0!==a.atv)return!1;a.atv=t,"function"==typeof define&&define.amd&&define("atv",function(){return a.atv}),t.merge=b,t.extend=c,t.extend({version:"1.5",debug:!1,description:"Afreeca Common Tools "}),t.extend({ready:d,defer:e});var v={},w=v.toString;t.extend({each:k,contains:l,compact:m,isBoolean:j,findWhere:n});var x=u.location.href.indexOf("#"),y=0<x?u.location.href.substr(0,x):u.location.href;t.extend({urlParameter:p(y),parseUrl:p,getParam:q,appendQuery:o,serialize:r}),t.randomArray=function(a){return a.sort(function(a,b){return.5-Math.random()})},t.isBoolean=function(a){return/^(true|1)$/i.test(a)},t.rand=function(a,b){return Math.floor(Math.random()*(b+1-a)+a)},empty=function(){}}(window,document),function(a,b){function c(a,b,c,d){var e=new Date,f=parseInt(d)||1;e.setDate(e.getDate()+f),document.cookie=a+"="+escape(b)+"; path=/; expires="+e.toGMTString()+"; domain="+c+";"}function d(a){var c,d=null;return document.cookie&&(c=document.cookie.split(";"),b.each(c,function(b){new RegExp("^("+escape(a)+"=)","g").test(b.trim())&&(d=unescape(b.trim().split("=")[1]))})),d}function e(a,b){var c=new Date;c.setDate(c.getDate()-1),document.cookie=a+"= ; expires="+c.toGMTString()+"; path=/; domain="+b+";"}function f(a,b){try{var c,d=new Number(a),e=b||0;c=e?/(\d)(?=(\d{3})+\.)/g:/(\d)(?=(\d{3})+$)/g}catch(a){}return d.toFixed(e).replace(c,"$1,")}function g(a,b,c){try{var d=0,e=a.substring(0),f=void 0===c?"..":c;if(null===e)return 0;for(var g=0;g<e.length;g++){var h=e.charCodeAt(g);if((d+=h>0&&h<256&&"\r"!==h?1:2)>b){e=e.substr(0,g)+f;break}}}catch(a){}return e}function h(a){var b,c,d=0;for(b=0;b<a.length;b+=1)c=escape(a.charAt(b)).length,c>3&&d++,d++;return d}function i(a){try{var b=a||new Date}catch(a){}return Math.round(b.getTime()/1e3)}function j(a,b){try{var c=b||new Date,d=a||"yy-mm-dd h:i:s",e={"m+":c.getMonth()+1,"d+":c.getDate(),"h+":c.getHours(),"i+":c.getMinutes(),"s+":c.getSeconds(),"q+":Math.floor((c.getMonth()+3)/3),S:c.getMilliseconds()};/(y)+/i.test(d)&&(szYear=2<RegExp.lastMatch.length?c.getFullYear():((new Date).getFullYear()+"").substr(2),d=d.replace(RegExp.lastMatch,szYear));for(var f in e)new RegExp("("+f+")").test(d)&&(d=d.replace(RegExp.$1,2>(""+e[f]).length?"0"+e[f]:e[f]))}catch(a){}return d}function k(a){var b=a||j(),c=b.match(/\d+/g),d=c[0],e=c[1],f=c[2],g=c[3]||0,h=c[4]||0,i=c[5]||0,k=new Date;return d=3>d.length?k.getFullYear().toString().substr(0,2)+d:d,+new Date(d,e-1,f,g,h,i)/1e3}function l(a,b){for(var c=[];b>0;c[--b]=a);return c.join("")}function m(){for(var a,b,c,d,e,f=0,g=arguments[f++],h=[],i="";g;){if(b=/^[^\x25]+/.exec(g))h.push(b[0]);else if(b=/^\x25{2}/.exec(g))h.push("%");else{if(!(b=/^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(g)))throw"Huh ?!";if(null===(a=arguments[b[1]||f++])||void 0===a)throw"Too few arguments.";if(/[^s]/.test(b[7])&&"number"!=typeof a)throw"Expecting number but found "+typeof a;switch(b[7]){case"b":a=a.toString(2);break;case"c":a=String.fromCharCode(a);break;case"d":a=parseInt(a);break;case"s":a=(a=String(a))&&b[6]?a.substring(0,b[6]):a;break;case"u":a=Math.abs(a);break;case"x":a=a.toString(16);break;case"X":a=a.toString(16).toUpperCase()}a=/[def]/.test(b[7])&&b[2]&&a>=0?"+"+a:a,d=b[3]?"0"===b[3]?"0":b[3].charAt(1):" ",e=b[5]-String(a).length-i.length,c=b[5]?l(d,e):"",h.push(i+(b[4]?a+c:c+a))}g=g.substring(b[0].length)}return h.join("")}b.ua=a.navigator.userAgent,b.extend({isHandset:function(){return!!/android|iphone|ipot|ipad/i.test(b.ua)},os:function(){var a="windows";return/android/i.test(b.ua)?a="android":/iphone|ipad|ipot/i.test(b.ua)&&(a="ios"),a}(),browser:function(){return/msie/i.test(b.ua)||/(Trident)(?:.*rv:([\w.]+))?/i.test(atv.ua)?"IE":/firefox/i.test(b.ua)?"FF":/opera/i.test(b.ua)?"OP":/chrome/i.test(b.ua)?"CR":/netscape/i.test(b.ua)?"NC":/safari/i.test(b.ua)?"SA":"Etc"}()});var n=a.document||n.documentElement,o={routes:[],beforeHash:null,nInterval:50,navigate:function(){var a=o.getHash(),c=b.each(o.routes,function(b){if(a!==(o.beforeHash||"")&&a===b.hash)return b.callback.call(b),!0});null===o.beforeHash&&void 0===c&&b.each(o.routes,function(a){if(""===a.hash)return a.callback.call(a),!1}),o.beforeHash=a},bindEvent:function(){a.addEventListener?a.addEventListener("hashchange",function(){o.navigate()},!1):window.attachEvent&&setInterval(function(){o.beforeHash!==location.hash&&o.navigate()},o.nInterval)},getUrl:function(){var a=n.location.href.indexOf("#");return 0<a?n.location.href.substr(0,a):n.location.href},getHash:function(){return a.location.hash.substring(1)}};b.extend({getUrl:o.getUrl,getHash:o.getHash,route:{register:function(a,b){return atv.each(o.routes,function(b,c){if(a===b.hash)return!0})||o.routes.push({hash:a,run:!1,callback:b||function(){}}),this},remove:function(a){var b=atv.each(o.routes,function(b,c){if(a===b.hash)return c});return isNaN(b)||o.routes.splice(b,1),this},ready:function(){o.bindEvent(),o.navigate()},getAll:function(){return o.routes},getHash:o.getHash,getLastHash:function(){return o.beforeHash}}}),b.extend({setCookie:c,getCookie:d,releaseCookie:e}),b.extend({toMoneyFormat:f,toByteCutter:g,countByte:h,sprintf:m}),b.extend({getUnixTime:i,toTimestamp:k,toDateFormat:j}),b.cutString=b.toByteCutter,b.insertIframe=function(a,c){try{var d=document.createElement("iframe"),e=b.merge({frameborder:0,id:"_insertIframe"},a),c=c||!1,f=document.body||document.getElementsByTagName("body")[0];try{for(var g in e)d.hasOwnProperty(g)&&d.setAttribute(g,e[g])}catch(a){d.id=e.id,d.frameborder=0}return d.src=e.src||"",c&&(d.style.height=0,d.style.width=0,d.onload=function(){setTimeout(function(){try{f.removeChild(d)}catch(a){}},1e4)}),f.appendChild(d),!0}catch(a){return!1}},b.newPopup=function(a,c,d){var e={left:10,top:10,width:1024,height:768,marginwidth:0,marginheight:0,resizable:1,scrollbars:"no"};return e=b.merge(e,d||{}),window.open(a,c,b.serialize(e,"",","))}}(window,atv),function(a){function doneback(a,b,c,d){c.complete.call(null,a,b,d)}function createStandardXhr(){try{return new XMLHttpRequest}catch(a){}}function createActiveXhr(){try{return new XMLHttpRequest}catch(a){try{return ieXdom=!0,new XDomainRequest}catch(a){return new ActiveXObject("Microsoft.XMLHTTP")}}}function ajax(def){void 0===a&&(a=this.atv);var xhr,opt=a.merge({},def||{});for(k in settings)void 0===opt[k]&&(opt[k]=settings[k]);opt.crossDomain=/^((?:f|ht)tp(?:s)?:)?\/\/([^\/]+)/i.test(opt.url)&&RegExp.lastParen!==window.location.host,xhr=opt.crossDomain?createActiveXhr():createStandardXhr();var dataType=opt.dataType.toLowerCase(),mime=opt.accepts[dataType],oHeaders={},abortTimeout=empty,xhrSuccess;"get"!==opt.type.toLowerCase()&&(oHeaders["Content-Type"]="application/x-www-form-urlencoded",opt.hasOwnProperty("charset")&&(oHeaders["Content-Type"]+="; charset="+opt.charset.toUpperCase())),"overrideMimeType"in xhr&&xhr.overrideMimeType(mime),loadCompleted[opt.url]={load:!1,data:null},xhrSuccess=function(){var result,error;clearTimeout(abortTimeout);try{switch(result=xhr.responseText,dataType){case"text":case"html":case"jsonp":case"script":break;case"xml":result=xhr.responseXML;break;case"json":result=/^\s*$/.test(result)?null:JSON.parse(result.replace(/\s+/g," "))}}catch(e){try{result=eval("("+xhr.responseText+")")}catch(b){error=e,a.debug}}loadCompleted[opt.url]={load:!0,data:a.debug?result:null},error?doneback(error,xhr,opt,{ready:xhr.readyState||0,status:xhr.status||"",message:"parse error"}):doneback(result,xhr,opt,"success")},xhr.onreadystatechange=function(){4===xhr.readyState&&(xhr.onreadystatechange=empty,xhr.status>=200&&xhr.status<300||304===xhr.status?xhrSuccess():doneback({},xhr,opt,{ready:xhr.readyState,status:xhr.status,message:"error"}))},0<opt.timeout&&(abortTimeout=setTimeout(function(){xhr.abort()},1e3*opt.timeout)),ieXdom&&(xhr.onload=xhrSuccess,xhr.ontimeout=function(){xhr.abort(),doneback({},xhr,opt,{ready:0,status:"",message:"timeout"})},xhr.onerror=function(){doneback({},xhr,opt,{ready:0,status:"",message:"error"})},xhr.timeout=1e3*opt.timeout),!1===opt.cache&&(opt.url=a.appendQuery(opt.url,"_="+Date.now())),xhr.open(opt.type,opt.url,opt.sync||!0);try{for(k in oHeaders)xhr.setRequestHeader(k,oHeaders[k])}catch(a){}if(opt.crossDomain&&opt.xhrFields&&"withCredentials"in xhr)for(k in opt.xhrFields)try{xhr[k]=opt.xhrFields[k]}catch(a){}return xhr.send(opt.data),xhr}function loadJs(b){var c,d,e,f=document.getElementsByTagName("head")[0]||document.documentElement,g={},h=["charset","async"];d="string"==typeof b?a.merge({},{url:b}):a.merge({},b||{}),e=/(callback=)+/i.test(d.url),e&&/(callback)+=\?(&|$)/.test(d.url)&&(d.url=d.url.replace(/(callback)+=\?(&|$)/,"callback=_jsonp"+ ++loadId+"$2")),/(var=)+/i.test(d.url);for(k in settings)void 0===d[k]&&(d[k]=settings[k]);if(3>d.url.length)return!1;loadCompleted[d.url]={load:!1,data:null},c=document.createElement("script"),c.type="text/javascript",c.src=d.url,c.onerror=function(){settings.complete.call(null,{},g,"onerror")};for(var i in d)a.contains(i,h)&&c.hasOwnProperty(i)&&c.setAttribute(i,d[i]);d.hasOwnProperty("charset")&&c.setAttribute("charset",d.charset);var j=a.parseUrl(d.url).callback,l=function(){try{"function"!=typeof window[j]?(loadCompleted[d.url]={load:!0,data:a.debug?window[j]:null},doneback(e&&"object"==typeof window[j]?window[j]:{},g,d,"success")):delete window[j]}catch(b){a.debug}};return e&&(window[j]=function(b){try{loadCompleted[d.url]={load:!0,data:a.debug?b:null},c&&f.removeChild(c)}catch(a){}doneback(b,g,d,"success")}),c.readyState?c.onreadystatechange=function(){/(loaded|complete)/.test(this.readyState)&&l()}:c.onload=l,f.appendChild(c),!0}void 0===a&&(a=atv);var loadCompleted={},loadId=0,empty=function(){},settings={type:"get",dataType:"json",data:null,accepts:{script:"text/javascript, application/javascript",json:"text/html, application/json",jsonp:"text/html, application/json",xml:"text/xml, application/xml",text:"text/plain"},complete:empty,charset:"utf-8",crossDomain:!1},ieXdom=!1;a.extend({loadCompleted:loadCompleted,loader:{ajax:ajax,post:function(b){return ajax(a.merge({type:"post"},b||{}))},loadJs:loadJs}}),a.loadJs=a.loader.loadJs,a.extend({evt:{fire:function(a,b){if(document.createEventObject){var c=document.createEventObject();return a.fireEvent("on"+b,c)}var c=document.createEvent("HTMLEvents");return c.initEvent(b,!0,!0),!a.dispatchEvent(c)}}})}(atv),function(a){function b(a){var b,c,e,f,g,h,i,j="",k=0;do{b=a.charCodeAt(k++),c=a.charCodeAt(k++),e=a.charCodeAt(k++),f=b>>2,g=(3&b)<<4|c>>4,h=(15&c)<<2|e>>6,i=63&e,isNaN(c)?h=i=64:isNaN(e)&&(i=64),j=j+d.charAt(f)+d.charAt(g)+d.charAt(h)+d.charAt(i)}while(k<a.length);return j}function c(a){var b,c,e,f,g,h,i,j="",k=0;a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{f=d.indexOf(a.charAt(k++)),g=d.indexOf(a.charAt(k++)),h=d.indexOf(a.charAt(k++)),i=d.indexOf(a.charAt(k++)),b=f<<2|g>>4,c=(15&g)<<4|h>>2,e=(3&h)<<6|i,j+=String.fromCharCode(b),64!=h&&(j+=String.fromCharCode(c)),64!=i&&(j+=String.fromCharCode(e))}while(k<a.length);return j}var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";a.extend({encodeBase64:b,decodeBase64:c})}(atv);