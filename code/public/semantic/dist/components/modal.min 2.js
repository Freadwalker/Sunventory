!function(j,q,L,N){"use strict";q=void 0!==q&&q.Math==Math?q:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),j.fn.modal=function(w){var C,e=j(this),F=j(q),M=j(L),x=j("body"),H=e.selector||"",A=(new Date).getTime(),O=[],D=w,T="string"==typeof D,z=[].slice.call(arguments,1),E=q.requestAnimationFrame||q.mozRequestAnimationFrame||q.webkitRequestAnimationFrame||q.msRequestAnimationFrame||function(e){setTimeout(e,0)};return e.each(function(){var i,t,e,o,a,n,r,s,c,l=j.isPlainObject(w)?j.extend(!0,{},j.fn.modal.settings,w):j.extend({},j.fn.modal.settings),d=l.selector,u=l.className,m=l.namespace,f=l.error,g="."+m,h="module-"+m,v=j(this),b=j(l.context),p=v.find(d.close),y=this,k=v.data(h),S=!1;c={initialize:function(){c.verbose("Initializing dimmer",b),c.create.id(),c.create.dimmer(),c.refreshModals(),c.bind.events(),l.observeChanges&&c.observeChanges(),c.instantiate()},instantiate:function(){c.verbose("Storing instance of modal"),k=c,v.data(h,k)},create:{dimmer:function(){var e={debug:l.debug,variation:!l.centered&&"top aligned",dimmerName:"modals"},n=j.extend(!0,e,l.dimmerSettings);j.fn.dimmer!==N?(c.debug("Creating dimmer"),o=b.dimmer(n),l.detachable?(c.verbose("Modal is detachable, moving content into dimmer"),o.dimmer("add content",v)):c.set.undetached(),a=o.dimmer("get dimmer")):c.error(f.dimmer)},id:function(){r=(Math.random().toString(16)+"000000000").substr(2,8),n="."+r,c.verbose("Creating unique id for element",r)}},destroy:function(){c.verbose("Destroying previous modal"),v.removeData(h).off(g),F.off(n),a.off(n),p.off(g),b.dimmer("destroy")},observeChanges:function(){"MutationObserver"in q&&((s=new MutationObserver(function(e){c.debug("DOM tree modified, refreshing"),c.refresh()})).observe(y,{childList:!0,subtree:!0}),c.debug("Setting up mutation observer",s))},refresh:function(){c.remove.scrolling(),c.cacheSizes(),c.can.useFlex()||c.set.modalOffset(),c.set.screenHeight(),c.set.type()},refreshModals:function(){t=v.siblings(d.modal),i=t.add(v)},attachEvents:function(e,n){var i=j(e);n=j.isFunction(c[n])?c[n]:c.toggle,0<i.length?(c.debug("Attaching modal events to element",e,n),i.off(g).on("click"+g,n)):c.error(f.notFound,e)},bind:{events:function(){c.verbose("Attaching events"),v.on("click"+g,d.close,c.event.close).on("click"+g,d.approve,c.event.approve).on("click"+g,d.deny,c.event.deny),F.on("resize"+n,c.event.resize)},scrollLock:function(){o.get(0).addEventListener("touchmove",c.event.preventScroll,{passive:!1})}},unbind:{scrollLock:function(){o.get(0).removeEventListener("touchmove",c.event.preventScroll,{passive:!1})}},get:{id:function(){return(Math.random().toString(16)+"000000000").substr(2,8)}},event:{approve:function(){S||!1===l.onApprove.call(y,j(this))?c.verbose("Approve callback returned false cancelling hide"):(S=!0,c.hide(function(){S=!1}))},preventScroll:function(e){e.preventDefault()},deny:function(){S||!1===l.onDeny.call(y,j(this))?c.verbose("Deny callback returned false cancelling hide"):(S=!0,c.hide(function(){S=!1}))},close:function(){c.hide()},click:function(e){if(l.closable){var n=0<j(e.target).closest(d.modal).length,i=j.contains(L.documentElement,e.target);!n&&i&&c.is.active()&&(c.debug("Dimmer clicked, hiding all modals"),c.remove.clickaway(),l.allowMultiple?c.hide():c.hideAll())}else c.verbose("Dimmer clicked but closable setting is disabled")},debounce:function(e,n){clearTimeout(c.timer),c.timer=setTimeout(e,n)},keyboard:function(e){27==e.which&&(l.closable?(c.debug("Escape key pressed hiding modal"),c.hide()):c.debug("Escape key pressed, but closable is set to false"),e.preventDefault())},resize:function(){o.dimmer("is active")&&(c.is.animating()||c.is.active())&&E(c.refresh)}},toggle:function(){c.is.active()||c.is.animating()?c.hide():c.show()},show:function(e){e=j.isFunction(e)?e:function(){},c.refreshModals(),c.set.dimmerSettings(),c.set.dimmerStyles(),c.showModal(e)},hide:function(e){e=j.isFunction(e)?e:function(){},c.refreshModals(),c.hideModal(e)},showModal:function(e){e=j.isFunction(e)?e:function(){},c.is.animating()||!c.is.active()?(c.showDimmer(),c.cacheSizes(),c.can.useFlex()?c.remove.legacy():(c.set.legacy(),c.set.modalOffset(),c.debug("Using non-flex legacy modal positioning.")),c.set.screenHeight(),c.set.type(),c.set.clickaway(),!l.allowMultiple&&c.others.active()?c.hideOthers(c.showModal):(l.allowMultiple&&l.detachable&&v.detach().appendTo(a),l.onShow.call(y),l.transition&&j.fn.transition!==N&&v.transition("is supported")?(c.debug("Showing modal with css animations"),v.transition({debug:l.debug,animation:l.transition+" in",queue:l.queue,duration:l.duration,useFailSafe:!0,onComplete:function(){l.onVisible.apply(y),l.keyboardShortcuts&&c.add.keyboardShortcuts(),c.save.focus(),c.set.active(),l.autofocus&&c.set.autofocus(),e()}})):c.error(f.noTransition))):c.debug("Modal is already visible")},hideModal:function(e,n){e=j.isFunction(e)?e:function(){},c.debug("Hiding modal"),!1!==l.onHide.call(y,j(this))?(c.is.animating()||c.is.active())&&(l.transition&&j.fn.transition!==N&&v.transition("is supported")?(c.remove.active(),v.transition({debug:l.debug,animation:l.transition+" out",queue:l.queue,duration:l.duration,useFailSafe:!0,onStart:function(){c.others.active()||n||c.hideDimmer(),l.keyboardShortcuts&&c.remove.keyboardShortcuts()},onComplete:function(){l.onHidden.call(y),c.remove.dimmerStyles(),c.restore.focus(),e()}})):c.error(f.noTransition)):c.verbose("Hide callback returned false cancelling hide")},showDimmer:function(){o.dimmer("is animating")||!o.dimmer("is active")?(c.debug("Showing dimmer"),o.dimmer("show")):c.debug("Dimmer already visible")},hideDimmer:function(){o.dimmer("is animating")||o.dimmer("is active")?(c.unbind.scrollLock(),o.dimmer("hide",function(){c.remove.clickaway(),c.remove.screenHeight()})):c.debug("Dimmer is not visible cannot hide")},hideAll:function(e){var n=i.filter("."+u.active+", ."+u.animating);e=j.isFunction(e)?e:function(){},0<n.length&&(c.debug("Hiding all visible modals"),c.hideDimmer(),n.modal("hide modal",e))},hideOthers:function(e){var n=t.filter("."+u.active+", ."+u.animating);e=j.isFunction(e)?e:function(){},0<n.length&&(c.debug("Hiding other modals",t),n.modal("hide modal",e,!0))},others:{active:function(){return 0<t.filter("."+u.active).length},animating:function(){return 0<t.filter("."+u.animating).length}},add:{keyboardShortcuts:function(){c.verbose("Adding keyboard shortcuts"),M.on("keyup"+g,c.event.keyboard)}},save:{focus:function(){0<j(L.activeElement).closest(v).length||(e=j(L.activeElement).blur())}},restore:{focus:function(){e&&0<e.length&&e.focus()}},remove:{active:function(){v.removeClass(u.active)},legacy:function(){v.removeClass(u.legacy)},clickaway:function(){a.off("click"+n)},dimmerStyles:function(){a.removeClass(u.inverted),o.removeClass(u.blurring)},bodyStyle:function(){""===x.attr("style")&&(c.verbose("Removing style attribute"),x.removeAttr("style"))},screenHeight:function(){c.debug("Removing page height"),x.css("height","")},keyboardShortcuts:function(){c.verbose("Removing keyboard shortcuts"),M.off("keyup"+g)},scrolling:function(){o.removeClass(u.scrolling),v.removeClass(u.scrolling)}},cacheSizes:function(){v.addClass(u.loading);var e=v.prop("scrollHeight"),n=v.outerWidth(),i=v.outerHeight();c.cache!==N&&0===i||(c.cache={pageHeight:j(L).outerHeight(),width:n,height:i+l.offset,scrollHeight:e+l.offset,contextHeight:"body"==l.context?j(q).height():o.height()},c.cache.topOffset=-c.cache.height/2),v.removeClass(u.loading),c.debug("Caching modal and container sizes",c.cache)},can:{useFlex:function(){return"auto"==l.useFlex?l.detachable&&!c.is.ie():l.useFlex},fit:function(){var e=c.cache.contextHeight,n=c.cache.contextHeight/2,i=c.cache.topOffset,t=c.cache.scrollHeight,o=c.cache.height,a=l.padding;return o<t?n+i+t+a<e:o+2*a<e}},is:{active:function(){return v.hasClass(u.active)},ie:function(){return!q.ActiveXObject&&"ActiveXObject"in q||"ActiveXObject"in q},animating:function(){return v.transition("is supported")?v.transition("is animating"):v.is(":visible")},scrolling:function(){return o.hasClass(u.scrolling)},modernBrowser:function(){return!(q.ActiveXObject||"ActiveXObject"in q)}},set:{autofocus:function(){var e=v.find("[tabindex], :input").filter(":visible"),n=e.filter("[autofocus]"),i=0<n.length?n.first():e.first();0<i.length&&i.focus()},clickaway:function(){a.on("click"+n,c.event.click)},dimmerSettings:function(){if(j.fn.dimmer!==N){var e={debug:l.debug,dimmerName:"modals",closable:"auto",useFlex:c.can.useFlex(),variation:!l.centered&&"top aligned",duration:{show:l.duration,hide:l.duration}},n=j.extend(!0,e,l.dimmerSettings);l.inverted&&(n.variation=n.variation!==N?n.variation+" inverted":"inverted"),b.dimmer("setting",n)}else c.error(f.dimmer)},dimmerStyles:function(){l.inverted?a.addClass(u.inverted):a.removeClass(u.inverted),l.blurring?o.addClass(u.blurring):o.removeClass(u.blurring)},modalOffset:function(){var e=c.cache.width,n=c.cache.height;v.css({marginTop:l.centered&&c.can.fit()?-n/2:0,marginLeft:-e/2}),c.verbose("Setting modal offset for legacy mode")},screenHeight:function(){c.can.fit()?x.css("height",""):(c.debug("Modal is taller than page content, resizing page height"),x.css("height",c.cache.height+2*l.padding))},active:function(){v.addClass(u.active)},scrolling:function(){o.addClass(u.scrolling),v.addClass(u.scrolling),c.unbind.scrollLock()},legacy:function(){v.addClass(u.legacy)},type:function(){c.can.fit()?(c.verbose("Modal fits on screen"),c.others.active()||c.others.animating()||(c.remove.scrolling(),c.bind.scrollLock())):(c.verbose("Modal cannot fit on screen setting to scrolling"),c.set.scrolling())},undetached:function(){o.addClass(u.undetached)}},setting:function(e,n){if(c.debug("Changing setting",e,n),j.isPlainObject(e))j.extend(!0,l,e);else{if(n===N)return l[e];j.isPlainObject(l[e])?j.extend(!0,l[e],n):l[e]=n}},internal:function(e,n){if(j.isPlainObject(e))j.extend(!0,c,e);else{if(n===N)return c[e];c[e]=n}},debug:function(){!l.silent&&l.debug&&(l.performance?c.performance.log(arguments):(c.debug=Function.prototype.bind.call(console.info,console,l.name+":"),c.debug.apply(console,arguments)))},verbose:function(){!l.silent&&l.verbose&&l.debug&&(l.performance?c.performance.log(arguments):(c.verbose=Function.prototype.bind.call(console.info,console,l.name+":"),c.verbose.apply(console,arguments)))},error:function(){l.silent||(c.error=Function.prototype.bind.call(console.error,console,l.name+":"),c.error.apply(console,arguments))},performance:{log:function(e){var n,i;l.performance&&(i=(n=(new Date).getTime())-(A||n),A=n,O.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:y,"Execution Time":i})),clearTimeout(c.performance.timer),c.performance.timer=setTimeout(c.performance.display,500)},display:function(){var e=l.name+":",i=0;A=!1,clearTimeout(c.performance.timer),j.each(O,function(e,n){i+=n["Execution Time"]}),e+=" "+i+"ms",H&&(e+=" '"+H+"'"),(console.group!==N||console.table!==N)&&0<O.length&&(console.groupCollapsed(e),console.table?console.table(O):j.each(O,function(e,n){console.log(n.Name+": "+n["Execution Time"]+"ms")}),console.groupEnd()),O=[]}},invoke:function(t,e,n){var o,a,i,r=k;return e=e||z,n=y||n,"string"==typeof t&&r!==N&&(t=t.split(/[\. ]/),o=t.length-1,j.each(t,function(e,n){var i=e!=o?n+t[e+1].charAt(0).toUpperCase()+t[e+1].slice(1):t;if(j.isPlainObject(r[i])&&e!=o)r=r[i];else{if(r[i]!==N)return a=r[i],!1;if(!j.isPlainObject(r[n])||e==o)return r[n]!==N&&(a=r[n]),!1;r=r[n]}})),j.isFunction(a)?i=a.apply(n,e):a!==N&&(i=a),j.isArray(C)?C.push(i):C!==N?C=[C,i]:i!==N&&(C=i),a}},T?(k===N&&c.initialize(),c.invoke(D)):(k!==N&&k.invoke("destroy"),c.initialize())}),C!==N?C:this},j.fn.modal.settings={name:"Modal",namespace:"modal",useFlex:"auto",offset:0,silent:!1,debug:!1,verbose:!1,performance:!0,observeChanges:!1,allowMultiple:!1,detachable:!0,closable:!0,autofocus:!0,inverted:!1,blurring:!1,centered:!0,dimmerSettings:{closable:!1,useCSS:!0},keyboardShortcuts:!0,context:"body",queue:!1,duration:500,transition:"scale",padding:50,onShow:function(){},onVisible:function(){},onHide:function(){return!0},onHidden:function(){},onApprove:function(){return!0},onDeny:function(){return!0},selector:{close:"> .close",approve:".actions .positive, .actions .approve, .actions .ok",deny:".actions .negative, .actions .deny, .actions .cancel",modal:".ui.modal"},error:{dimmer:"UI Dimmer, a required component is not included in this page",method:"The method you called is not defined.",notFound:"The element you specified could not be found"},className:{active:"active",animating:"animating",blurring:"blurring",inverted:"inverted",legacy:"legacy",loading:"loading",scrolling:"scrolling",undetached:"undetached"}}}(jQuery,window,document);