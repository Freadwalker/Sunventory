!function(C,n,A,S){"use strict";n=void 0!==n&&n.Math==Math?n:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),C.fn.transition=function(){var u,r=C(this),p=r.selector||"",g=(new Date).getTime(),v=[],b=arguments,y=b[0],h=[].slice.call(arguments,1),w="string"==typeof y;n.requestAnimationFrame||n.mozRequestAnimationFrame||n.webkitRequestAnimationFrame||n.msRequestAnimationFrame;return r.each(function(t){var d,s,e,c,i,a,n,o,m,f=C(this),l=this;(m={initialize:function(){d=m.get.settings.apply(l,b),c=d.className,e=d.error,i=d.metadata,o="."+d.namespace,n="module-"+d.namespace,s=f.data(n)||m,a=m.get.animationEndEvent(),!1===(w=w&&m.invoke(y))&&(m.verbose("Converted arguments into settings object",d),d.interval?m.delay(d.animate):m.animate(),m.instantiate())},instantiate:function(){m.verbose("Storing instance of module",m),s=m,f.data(n,s)},destroy:function(){m.verbose("Destroying previous module for",l),f.removeData(n)},refresh:function(){m.verbose("Refreshing display type on next animation"),delete m.displayType},forceRepaint:function(){m.verbose("Forcing element repaint");var n=f.parent(),e=f.next();0===e.length?f.detach().appendTo(n):f.detach().insertBefore(e)},repaint:function(){m.verbose("Repainting element");l.offsetWidth},delay:function(n){var e,i=m.get.animationDirection();i=i||(m.can.transition()?m.get.direction():"static"),n=n!==S?n:d.interval,e="auto"==d.reverse&&i==c.outward||1==d.reverse?(r.length-t)*d.interval:t*d.interval,m.debug("Delaying animation by",e),setTimeout(m.animate,e)},animate:function(n){if(d=n||d,!m.is.supported())return m.error(e.support),!1;if(m.debug("Preparing animation",d.animation),m.is.animating()){if(d.queue)return!d.allowRepeats&&m.has.direction()&&m.is.occurring()&&!0!==m.queuing?m.debug("Animation is currently occurring, preventing queueing same animation",d.animation):m.queue(d.animation),!1;if(!d.allowRepeats&&m.is.occurring())return m.debug("Animation is already occurring, will not execute repeated animation",d.animation),!1;m.debug("New animation started, completing previous early",d.animation),s.complete()}m.can.animate()?m.set.animating(d.animation):m.error(e.noAnimation,d.animation,l)},reset:function(){m.debug("Resetting animation to beginning conditions"),m.remove.animationCallbacks(),m.restore.conditions(),m.remove.animating()},queue:function(n){m.debug("Queueing animation of",n),m.queuing=!0,f.one(a+".queue"+o,function(){m.queuing=!1,m.repaint(),m.animate.apply(this,d)})},complete:function(n){m.debug("Animation complete",d.animation),m.remove.completeCallback(),m.remove.failSafe(),m.is.looping()||(m.is.outward()?(m.verbose("Animation is outward, hiding element"),m.restore.conditions(),m.hide()):m.is.inward()?(m.verbose("Animation is outward, showing element"),m.restore.conditions(),m.show()):(m.verbose("Static animation completed"),m.restore.conditions(),d.onComplete.call(l)))},force:{visible:function(){var n=f.attr("style"),e=m.get.userStyle(),i=m.get.displayType(),t=e+"display: "+i+" !important;",a=f.css("display"),o=n===S||""===n;a!==i?(m.verbose("Overriding default display to show element",i),f.attr("style",t)):o&&f.removeAttr("style")},hidden:function(){var n=f.attr("style"),e=f.css("display"),i=n===S||""===n;"none"===e||m.is.hidden()?i&&f.removeAttr("style"):(m.verbose("Overriding default display to hide element"),f.css("display","none"))}},has:{direction:function(n){var i=!1;return"string"==typeof(n=n||d.animation)&&(n=n.split(" "),C.each(n,function(n,e){e!==c.inward&&e!==c.outward||(i=!0)})),i},inlineDisplay:function(){var n=f.attr("style")||"";return C.isArray(n.match(/display.*?;/,""))}},set:{animating:function(n){var e;m.remove.completeCallback(),n=n||d.animation,e=m.get.animationClass(n),m.save.animation(e),m.force.visible(),m.remove.hidden(),m.remove.direction(),m.start.animation(e)},duration:function(n,e){!(e="number"==typeof(e=e||d.duration)?e+"ms":e)&&0!==e||(m.verbose("Setting animation duration",e),f.css({"animation-duration":e}))},direction:function(n){(n=n||m.get.direction())==c.inward?m.set.inward():m.set.outward()},looping:function(){m.debug("Transition set to loop"),f.addClass(c.looping)},hidden:function(){f.addClass(c.transition).addClass(c.hidden)},inward:function(){m.debug("Setting direction to inward"),f.removeClass(c.outward).addClass(c.inward)},outward:function(){m.debug("Setting direction to outward"),f.removeClass(c.inward).addClass(c.outward)},visible:function(){f.addClass(c.transition).addClass(c.visible)}},start:{animation:function(n){n=n||m.get.animationClass(),m.debug("Starting tween",n),f.addClass(n).one(a+".complete"+o,m.complete),d.useFailSafe&&m.add.failSafe(),m.set.duration(d.duration),d.onStart.call(l)}},save:{animation:function(n){m.cache||(m.cache={}),m.cache.animation=n},displayType:function(n){"none"!==n&&f.data(i.displayType,n)},transitionExists:function(n,e){C.fn.transition.exists[n]=e,m.verbose("Saving existence of transition",n,e)}},restore:{conditions:function(){var n=m.get.currentAnimation();n&&(f.removeClass(n),m.verbose("Removing animation class",m.cache)),m.remove.duration()}},add:{failSafe:function(){var n=m.get.duration();m.timer=setTimeout(function(){f.triggerHandler(a)},n+d.failSafeDelay),m.verbose("Adding fail safe timer",m.timer)}},remove:{animating:function(){f.removeClass(c.animating)},animationCallbacks:function(){m.remove.queueCallback(),m.remove.completeCallback()},queueCallback:function(){f.off(".queue"+o)},completeCallback:function(){f.off(".complete"+o)},display:function(){f.css("display","")},direction:function(){f.removeClass(c.inward).removeClass(c.outward)},duration:function(){f.css("animation-duration","")},failSafe:function(){m.verbose("Removing fail safe timer",m.timer),m.timer&&clearTimeout(m.timer)},hidden:function(){f.removeClass(c.hidden)},visible:function(){f.removeClass(c.visible)},looping:function(){m.debug("Transitions are no longer looping"),m.is.looping()&&(m.reset(),f.removeClass(c.looping))},transition:function(){f.removeClass(c.visible).removeClass(c.hidden)}},get:{settings:function(n,e,i){return"object"==typeof n?C.extend(!0,{},C.fn.transition.settings,n):"function"==typeof i?C.extend({},C.fn.transition.settings,{animation:n,onComplete:i,duration:e}):"string"==typeof e||"number"==typeof e?C.extend({},C.fn.transition.settings,{animation:n,duration:e}):"object"==typeof e?C.extend({},C.fn.transition.settings,e,{animation:n}):"function"==typeof e?C.extend({},C.fn.transition.settings,{animation:n,onComplete:e}):C.extend({},C.fn.transition.settings,{animation:n})},animationClass:function(n){var e=n||d.animation,i=m.can.transition()&&!m.has.direction()?m.get.direction()+" ":"";return c.animating+" "+c.transition+" "+i+e},currentAnimation:function(){return!(!m.cache||m.cache.animation===S)&&m.cache.animation},currentDirection:function(){return m.is.inward()?c.inward:c.outward},direction:function(){return m.is.hidden()||!m.is.visible()?c.inward:c.outward},animationDirection:function(n){var i;return"string"==typeof(n=n||d.animation)&&(n=n.split(" "),C.each(n,function(n,e){e===c.inward?i=c.inward:e===c.outward&&(i=c.outward)})),i||!1},duration:function(n){return!1===(n=n||d.duration)&&(n=f.css("animation-duration")||0),"string"==typeof n?-1<n.indexOf("ms")?parseFloat(n):1e3*parseFloat(n):n},displayType:function(n){return n=n===S||n,d.displayType?d.displayType:(n&&f.data(i.displayType)===S&&m.can.transition(!0),f.data(i.displayType))},userStyle:function(n){return(n=n||f.attr("style")||"").replace(/display.*?;/,"")},transitionExists:function(n){return C.fn.transition.exists[n]},animationStartEvent:function(){var n,e=A.createElement("div"),i={animation:"animationstart",OAnimation:"oAnimationStart",MozAnimation:"mozAnimationStart",WebkitAnimation:"webkitAnimationStart"};for(n in i)if(e.style[n]!==S)return i[n];return!1},animationEndEvent:function(){var n,e=A.createElement("div"),i={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"mozAnimationEnd",WebkitAnimation:"webkitAnimationEnd"};for(n in i)if(e.style[n]!==S)return i[n];return!1}},can:{transition:function(n){var e,i,t,a,o,r,s=d.animation,l=m.get.transitionExists(s),u=m.get.displayType(!1);if(l===S||n){if(m.verbose("Determining whether animation exists"),e=f.attr("class"),i=f.prop("tagName"),a=(t=C("<"+i+" />").addClass(e).insertAfter(f)).addClass(s).removeClass(c.inward).removeClass(c.outward).addClass(c.animating).addClass(c.transition).css("animationName"),o=t.addClass(c.inward).css("animationName"),u||(u=t.attr("class",e).removeAttr("style").removeClass(c.hidden).removeClass(c.visible).show().css("display"),m.verbose("Determining final display state",u),m.save.displayType(u)),t.remove(),a!=o)m.debug("Direction exists for animation",s),r=!0;else{if("none"==a||!a)return void m.debug("No animation defined in css",s);m.debug("Static animation found",s,u),r=!1}m.save.transitionExists(s,r)}return l!==S?l:r},animate:function(){return m.can.transition()!==S}},is:{animating:function(){return f.hasClass(c.animating)},inward:function(){return f.hasClass(c.inward)},outward:function(){return f.hasClass(c.outward)},looping:function(){return f.hasClass(c.looping)},occurring:function(n){return n="."+(n=n||d.animation).replace(" ","."),0<f.filter(n).length},visible:function(){return f.is(":visible")},hidden:function(){return"hidden"===f.css("visibility")},supported:function(){return!1!==a}},hide:function(){m.verbose("Hiding element"),m.is.animating()&&m.reset(),l.blur(),m.remove.display(),m.remove.visible(),m.set.hidden(),m.force.hidden(),d.onHide.call(l),d.onComplete.call(l)},show:function(n){m.verbose("Showing element",n),m.remove.hidden(),m.set.visible(),m.force.visible(),d.onShow.call(l),d.onComplete.call(l)},toggle:function(){m.is.visible()?m.hide():m.show()},stop:function(){m.debug("Stopping current animation"),f.triggerHandler(a)},stopAll:function(){m.debug("Stopping all animation"),m.remove.queueCallback(),f.triggerHandler(a)},clear:{queue:function(){m.debug("Clearing animation queue"),m.remove.queueCallback()}},enable:function(){m.verbose("Starting animation"),f.removeClass(c.disabled)},disable:function(){m.debug("Stopping animation"),f.addClass(c.disabled)},setting:function(n,e){if(m.debug("Changing setting",n,e),C.isPlainObject(n))C.extend(!0,d,n);else{if(e===S)return d[n];C.isPlainObject(d[n])?C.extend(!0,d[n],e):d[n]=e}},internal:function(n,e){if(C.isPlainObject(n))C.extend(!0,m,n);else{if(e===S)return m[n];m[n]=e}},debug:function(){!d.silent&&d.debug&&(d.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,d.name+":"),m.debug.apply(console,arguments)))},verbose:function(){!d.silent&&d.verbose&&d.debug&&(d.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,d.name+":"),m.verbose.apply(console,arguments)))},error:function(){d.silent||(m.error=Function.prototype.bind.call(console.error,console,d.name+":"),m.error.apply(console,arguments))},performance:{log:function(n){var e,i;d.performance&&(i=(e=(new Date).getTime())-(g||e),g=e,v.push({Name:n[0],Arguments:[].slice.call(n,1)||"",Element:l,"Execution Time":i})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,500)},display:function(){var n=d.name+":",i=0;g=!1,clearTimeout(m.performance.timer),C.each(v,function(n,e){i+=e["Execution Time"]}),n+=" "+i+"ms",p&&(n+=" '"+p+"'"),1<r.length&&(n+=" ("+r.length+")"),(console.group!==S||console.table!==S)&&0<v.length&&(console.groupCollapsed(n),console.table?console.table(v):C.each(v,function(n,e){console.log(e.Name+": "+e["Execution Time"]+"ms")}),console.groupEnd()),v=[]}},invoke:function(t,n,e){var a,o,i,r=s;return n=n||h,e=l||e,"string"==typeof t&&r!==S&&(t=t.split(/[\. ]/),a=t.length-1,C.each(t,function(n,e){var i=n!=a?e+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(C.isPlainObject(r[i])&&n!=a)r=r[i];else{if(r[i]!==S)return o=r[i],!1;if(!C.isPlainObject(r[e])||n==a)return r[e]!==S&&(o=r[e]),!1;r=r[e]}})),C.isFunction(o)?i=o.apply(e,n):o!==S&&(i=o),C.isArray(u)?u.push(i):u!==S?u=[u,i]:i!==S&&(u=i),o!==S&&o}}).initialize()}),u!==S?u:this},C.fn.transition.exists={},C.fn.transition.settings={name:"Transition",silent:!1,debug:!1,verbose:!1,performance:!0,namespace:"transition",interval:0,reverse:"auto",onStart:function(){},onComplete:function(){},onShow:function(){},onHide:function(){},useFailSafe:!0,failSafeDelay:100,allowRepeats:!1,displayType:!1,animation:"fade",duration:!1,queue:!0,metadata:{displayType:"display"},className:{animating:"animating",disabled:"disabled",hidden:"hidden",inward:"in",loading:"loading",looping:"looping",outward:"out",transition:"transition",visible:"visible"},error:{noAnimation:"Element is no longer attached to DOM. Unable to animate.  Use silent setting to surpress this warning in production.",repeated:"That animation is already occurring, cancelling repeated animation",method:"The method you called is not defined",support:"This browser does not support CSS animations"}}}(jQuery,window,document);