/*
 MiniBar 0.4.0
 http://mobius.ovh/

 Released under the MIT license
*/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(p){var f=0;return function(){return f<p.length?{done:!1,value:p[f++]}:{done:!0}}};$jscomp.arrayIterator=function(p){return{next:$jscomp.arrayIteratorImpl(p)}};$jscomp.makeIterator=function(p){var f="undefined"!=typeof Symbol&&Symbol.iterator&&p[Symbol.iterator];return f?f.call(p):$jscomp.arrayIterator(p)};
(function(p){var f=window,k=document,D=k.body,F={x:"left",y:"top"},r={x:"width",y:"height"},n={x:"scrollLeft",y:"scrollTop"},u={x:"scrollWidth",y:"scrollHeight"},G={x:"offsetWidth",y:"offsetHeight"},E={x:"pageX",y:"pageY"},y={barType:"default",minBarSize:10,alwaysShowBars:!1,horizontalMouseScroll:!1,scrollX:!0,scrollY:!0,navButtons:!1,scrollAmount:10,mutationObserver:{attributes:!1,childList:!0,subtree:!0},onInit:function(){},onUpdate:function(){},onStart:function(){},onScroll:function(){},onEnd:function(){},
classes:{container:"mb-container",content:"mb-content",track:"mb-track",bar:"mb-bar",visible:"mb-visible",progress:"mb-progress",hover:"mb-hover",scrolling:"mb-scrolling",textarea:"mb-textarea",wrapper:"mb-wrapper",nav:"mb-nav",btn:"mb-button",btns:"mb-buttons",increase:"mb-increase",decrease:"mb-decrease",item:"mb-item",itemVisible:"mb-item-visible",itemPartial:"mb-item-partial",itemHidden:"mb-item-hidden"}},w=function(a,b){for(var c=Object(a),d=1;d<arguments.length;d++){var e=arguments[d];if(null!=
e)for(var h in e)Object.prototype.hasOwnProperty.call(e,h)&&(c[h]=e[h])}return c},m=function(a,b,c){a.addEventListener(b,c,!1)},q=function(a,b,c){if("[object Object]"===Object.prototype.toString.call(a))for(var d in a)Object.prototype.hasOwnProperty.call(a,d)&&b.call(c,d,a[d]);else{d=0;for(var e=a.length;d<e;d++)b.call(c,d,a[d])}},z=function(a,b){var c=a&&a.style,d="[object Object]"===Object.prototype.toString.call(b);if(c){if(!b)return f.getComputedStyle(a);d&&q(b,function(a,b){a in c||(a="-webkit-"+
a);c[a]=b+("string"==typeof b?"":"opacity"===a?"":"px")})}},A=function(a){a=a.getBoundingClientRect();var b=k.documentElement||D.parentNode||D,c=void 0!==f.pageXOffset?f.pageXOffset:b.scrollLeft;b=void 0!==f.pageYOffset?f.pageYOffset:b.scrollTop;return{x:a.left+c,y:a.top+b,x2:a.left+a.width+c,y2:a.top+a.height+b,height:Math.round(a.height),width:Math.round(a.width)}},I=function(a,b,c){var d;return function(){var e=this,h=arguments,H=c&&!d;clearTimeout(d);d=setTimeout(function(){d=null;c||a.apply(e,
h)},b);H&&a.apply(e,h)}},x=f.requestAnimationFrame||function(){var a=0;return f.webkitRequestAnimationFrame||f.mozRequestAnimationFrame||function(b){var c,d=(new Date).getTime();return c=Math.max(0,16-(d-a)),a=d+c,setTimeout(function(){b(d+c)},c)}}(),t;(t=f.cancelAnimationFrame)||(clearTimeout(void 0),t=void 0);var B=t,J=function(){var a=0,b=k.createElement("div");return b.style.cssText="width: 100; height: 100; overflow: scroll; position: absolute; top: -9999;",k.body.appendChild(b),a=b.offsetWidth-
b.clientWidth,k.body.removeChild(b),a},g={contains:function(a,b){if(a)return a.classList?a.classList.contains(b):!!a.className&&!!a.className.match(new RegExp("(\\s|^)"+b+"(\\s|$)"))},add:function(a,b){g.contains(a,b)||(a.classList?a.classList.add(b):a.className=a.className.trim()+" "+b)},remove:function(a,b){g.contains(a,b)&&(a.classList?a.classList.remove(b):a.className=a.className.replace(new RegExp("(^|\\s)"+b.split(" ").join("|")+"(\\s|$)","gi")," "))},toggle:function(a,b,c){(c=this.contains(a,
b)?!0!==c&&"remove":!1!==c&&"add")&&this[c](a,b)}};t=function(a,b){this.container="string"===typeof a?k.querySelector(a):a;this.config=y;b?this.config=w({},y,b):f.MiniBarOptions&&(this.config=w({},y,f.MiniBarOptions));this.css=f.getComputedStyle(this.container);this.size=J();this.textarea="textarea"===this.container.nodeName.toLowerCase();this.bars={x:{},y:{}};this.tracks={x:{},y:{}};this.lastY=this.lastX=0;this.scrollDirection={x:0,y:0};this.events={};q("update scroll mouseenter mousedown mousemove mouseup wheel".split(" "),
function(a,b){this.events[b]=this[b].bind(this)},this);this.events.debounce=I(this.events.update,50);this.init()};var l=t.prototype;l.init=function(){var a=this,b=a.config,c=a.events;if(!a.initialised){if(a.textarea)a.content=a.container,a.container=k.createElement("div"),g.add(a.container,b.classes.textarea),a.wrapper=k.createElement("div"),g.add(a.wrapper,b.classes.wrapper),a.container.appendChild(a.wrapper),a.content.parentNode.insertBefore(a.container,a.content),a.content.addEventListener("input",
function(b){a.update()});else for(a.content=k.createElement("div");a.container.firstChild;)a.content.appendChild(a.container.firstChild);g.add(a.container,b.classes.container);g.add(a.content,b.classes.content);b.alwaysShowBars&&g.add(a.container,b.classes.visible);q(a.tracks,function(d,e){a.bars[d].node=k.createElement("div");e.node=k.createElement("div");g.add(e.node,b.classes.track);g.add(e.node,b.classes.track+"-"+d);g.add(a.bars[d].node,b.classes.bar);e.node.appendChild(a.bars[d].node);if(b.navButtons){var h=
k.createElement("button"),v=k.createElement("button"),f=k.createElement("div"),C=b.scrollAmount;h.className=b.classes.btn+" "+b.classes.decrease;v.className=b.classes.btn+" "+b.classes.increase;f.className=b.classes.btns+" "+b.classes.btns+"-"+d;f.appendChild(h);f.appendChild(e.node);f.appendChild(v);a.container.appendChild(f);g.add(a.container,b.classes.nav);m(f,"mousedown",function(b){var c=b.target;B(a.frame);if(c===v||c===h){var e=a.content[n[d]],f=function(b){switch(a.content[n[d]]=e,c){case h:e-=
C;break;case v:e+=C}a.frame=x(f)};f()}});m(f,"mouseup",function(b){b=b.target;var c=5*C;B(a.frame);b!==v&&b!==h||a.scrollBy(b===h?-c:c,d)})}else a.container.appendChild(e.node);"progress"===b.barType?(g.add(e.node,b.classes.progress),m(e.node,"mousedown",c.mousedown)):m(a.bars[d].node,"mousedown",c.mousedown);m(e.node,"mouseenter",function(c){g.add(a.container,b.classes.hover+"-"+d)});m(e.node,"mouseleave",function(c){a.down||g.remove(a.container,b.classes.hover+"-"+d)})});a.textarea?a.wrapper.appendChild(a.content):
a.container.appendChild(a.content);"static"===a.css.position&&(a.manualPosition=!0,a.container.style.position="relative");if(b.observableItems){var d=this.getItems();if(d.length&&"IntersectionObserver"in window){a.items=d;for(var e=[],h=0;1>h;h+=.01)e.push(h);h=function(a,c){a.forEach(function(a){var c=a.target,d=a.intersectionRatio;a=a.isIntersecting;var e=!a&&0>=d,h=a&&0<d&&1>d;c.classList.toggle(b.classes.itemVisible,a&&1<=d);c.classList.toggle(b.classes.itemPartial,h);c.classList.toggle(b.classes.itemHidden,
e)})};this.intersectionObserver=new IntersectionObserver(h,{root:null,rootMargin:"0px",threshold:e});q(d,function(b,c){a.intersectionObserver.observe(c)})}}a.update();m(a.content,"scroll",c.scroll);m(a.container,"mouseenter",c.mouseenter);b.horizontalMouseScroll&&m(a.content,"wheel",c.wheel);m(f,"resize",c.debounce);m(k,"DOMContentLoaded",c.update);m(f,"load",c.update);"MutationObserver"in window&&(h=function(b,c){for(var d=$jscomp.makeIterator(b),e=d.next();!e.done;e=d.next())if(e=e.value,"childList"==
e.type&&a.intersectionObserver){for(var h=$jscomp.makeIterator(e.addedNodes),f=h.next();!f.done;f=h.next())f=f.value,a.intersectionObserver.observe(f);e=$jscomp.makeIterator(e.removedNodes);for(f=e.next();!f.done;f=e.next())f=f.value,a.intersectionObserver.unobserve(f)}a.intersectionObserver&&(a.items=a.getItems());a.update()},this.mutationObserver=new MutationObserver(h),this.mutationObserver.observe(this.content,this.config.mutationObserver));a.initialised=!0;setTimeout(function(){a.config.onInit.call(a,
a.getData())},10)}};l.scroll=function(a){a=this.getData(!0);a.scrollLeft>this.lastX?this.scrollDirection.x=1:a.scrollLeft<this.lastX&&(this.scrollDirection.x=-1);a.scrollTop>this.lastY?this.scrollDirection.y=1:a.scrollTop<this.lastY&&(this.scrollDirection.y=-1);this.updateBars();this.config.onScroll.call(this,a);this.lastX=a.scrollLeft;this.lastY=a.scrollTop};l.getItems=function(){var a=this.config,b;"string"===typeof a.observableItems&&(b=this.content.querySelectorAll(a.observableItems));if(a.observableItems instanceof
HTMLCollection||a.observableItems instanceof NodeList)b=[].slice.call(a.observableItems);return b};l.getData=function(a){a=this.content;return{scrollTop:a.scrollTop,scrollLeft:a.scrollLeft,scrollHeight:a.scrollHeight,scrollWidth:a.scrollWidth,offsetWidth:a.offsetWidth,offsetHeight:a.offsetHeight,containerRect:this.rect,barSize:this.size}};l.scrollTo=function(a,b){b=b||"y";var c=this.getData(),d;"string"===typeof a?"start"===a?d=-c[n[b]]:"end"===a&&(d=c[u[b]]-c[G[b]]-c[n[b]]):d=a-c[n[b]];this.scrollBy(d,
b)};l.scrollBy=function(a,b,c,d){b=b||"y";if(0===c)this.content[n[b]]+=a;else{void 0===c&&(c=250);d=d||function(a,b,c,d){a/=d;return-c*a*(a-2)+b};var e=this,f=Date.now(),g=e.content[n[b]],k=function(){var h=Date.now()-f;h>c?(B(e.frame),e.content[n[b]]=Math.ceil(g+a)):(e.content[n[b]]=Math.ceil(d(h,g,a,c)),e.frame=x(k))};e.frame=k()}};l.wheel=function(a){a.preventDefault();this.scrollBy(100*a.deltaY,"x")};l.mouseenter=function(a){this.updateBars()};l.mousedown=function(a){a.preventDefault();var b=
this.config,c=a.target===this["progress"===b.barType?"tracks":"bars"].x.node?"x":"y";this.down=!0;this.currentAxis=c;this.update();g.add(this.container,b.classes.visible);g.add(this.container,b.classes.scrolling+"-"+c);"progress"===b.barType?(this.origin={x:a.pageX-this.tracks[c].x,y:a.pageY-this.tracks[c].y},this.mousemove(a)):this.origin={x:a.pageX-this.bars[c].x,y:a.pageY-this.bars[c].y};m(k,"mousemove",this.events.mousemove);m(k,"mouseup",this.events.mouseup)};l.mousemove=function(a){a.preventDefault();
var b=this,c=this.origin,d=this.currentAxis,e=b.tracks[d],f="progress"===b.config.barType;a=(f?a[E[d]]-e[d]:a[E[d]]-c[d]-e[d])/e[r[d]];var g=f?a*(b.content[u[d]]-b.rect[r[d]]):a*b[u[d]];x(function(){b.content[n[d]]=g})};l.mouseup=function(a){var b=this.config,c=this.events;g.toggle(this.container,b.classes.visible,b.alwaysShowBars);g.remove(this.container,b.classes.scrolling+"-"+this.currentAxis);g.contains(a.target,b.classes.bar)||(g.remove(this.container,b.classes.hover+"-x"),g.remove(this.container,
b.classes.hover+"-y"));this.currentAxis=null;this.down=!1;k.removeEventListener("mousemove",c.mousemove);k.removeEventListener("mouseup",c.mouseup)};l.update=function(){var a=this,b=a.config,c=a.content,d=a.size;a.rect=A(a.container);a.scrollTop=c.scrollTop;a.scrollLeft=c.scrollLeft;a.scrollHeight=c.scrollHeight;a.scrollWidth=c.scrollWidth;a.offsetWidth=c.offsetWidth;a.offsetHeight=c.offsetHeight;a.clientWidth=c.clientWidth;a.clientHeight=c.clientHeight;var e=a.scrollWidth>a.offsetWidth&&!a.textarea,
f=a.scrollHeight>a.offsetHeight;g.toggle(a.container,"mb-scroll-x",e&&b.scrollX&&!b.hideBars);g.toggle(a.container,"mb-scroll-y",f&&b.scrollY&&!b.hideBars);z(c,{overflowX:e?"auto":"",overflowY:f?"auto":"",marginBottom:e?-d:"",paddingBottom:e?d:"",marginRight:f?-d:"",paddingRight:f&&!b.hideBars?d:""});a.scrollX=e;a.scrollY=f;q(a.tracks,function(b,c){w(c,A(c.node));w(a.bars[b],A(a.bars[b].node))});a.updateBars();a.wrapperPadding=0;a.textarea&&(b=z(a.wrapper),a.wrapperPadding=parseInt(b.paddingTop,10)+
parseInt(b.paddingBottom,10),!a.down&&a.content.selectionStart>=a.content.value.length&&(a.content.scrollTop=a.scrollHeight+1E3));this.config.onUpdate.call(this,this.getData())};l.updateBar=function(a){var b=this,c={},d=b.config,e=b.tracks[a][r[a]],f=b.rect[r[a]]-b.wrapperPadding,g=e/b[u[a]],k=b.content[n[a]]/(b[u[a]]-f);"progress"===d.barType?c[r[a]]=Math.floor(e*k):(c[r[a]]=Math.max(Math.floor(g*f),d.minBarSize),c[F[a]]=Math.floor((e-c[r[a]])*k));x(function(){z(b.bars[a].node,c)})};l.updateBars=
function(){q(this.bars,function(a,b){this.updateBar(a)},this)};l.destroy=function(){var a=this.config,b=this.container;if(this.initialised){b.removeEventListener("mouseenter",this.events.mouseenter);f.removeEventListener("resize",this.events.debounce);g.remove(b,a.classes.visible);g.remove(b,a.classes.container);g.remove(b,a.classes.nav);for(q(this.tracks,function(c,d){b.removeChild(a.navButtons?d.node.parentNode:d.node);g.remove(b,"mb-scroll-"+c)});this.content.firstChild;)b.appendChild(this.content.firstChild);
b.removeChild(this.content);this.manualPosition&&(b.style.position="");this.bars={x:{},y:{}};this.tracks={x:{},y:{}};this.content=null;this.mutationObserver&&(this.mutationObserver.disconnect(),this.mutationObserver=!1);a.observableItems&&(this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=!1),q(this.items,function(b,d){var c=d.node||d;c.classList.remove(a.classes.item);c.classList.remove(a.classes.itemVisible);c.classList.remove(a.classes.itemPartial);c.classList.remove(a.classes.itemHidden)}));
this.initialised=!1}};p.MiniBar=t})(this);