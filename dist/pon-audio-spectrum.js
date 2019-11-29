!function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=0)}([function(t,n,e){"use strict";e.r(n);var r,o=function(){function t(t,n){var e=this;void 0===n&&(n=128),this.ready=!1,this.analyserNode=null,this.audioSource=null,this.spectrum=[],this.howl=t,this.fftSize=n,this.spectrumArray=new Uint8Array(n/2);var r=Howler.ctx.createAnalyser();this.analyserNode=r,this.analyserNode.fftSize=this.fftSize,this.howl.on("play",(function(){var t=e.howl._sounds[0]._node.bufferSource;e.audioSource=t,console.log(e.audioSource.connect(r)),e.ready=!0}))}return Object.defineProperty(t.prototype,"isReady",{get:function(){return this.ready},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"length",{get:function(){var t=Math.floor(.1*this.spectrumArray.length);return Math.floor(.8*this.spectrumArray.length)-t},enumerable:!0,configurable:!0}),t.prototype.destroy=function(){if(null!=this.audioSource&&null!=this.analyserNode)try{this.audioSource.disconnect(this.analyserNode)}catch(t){console.error(t)}this.audioSource=null,this.analyserNode=null,this.ready=!1},t.prototype.getSpectrumArray=function(){var t=this.spectrumArray,n=this.spectrum,e=0;if(this.ready&&null!=this.analyserNode){this.analyserNode.getByteFrequencyData(t);for(var r=Math.floor(.1*t.length),o=Math.floor(.8*t.length),i=r;i<o;i++)n[e++]=t[i]/256}return this.spectrum},t}();!function(t){t[t.Solid=0]="Solid",t[t.Block=1]="Block"}(r||(r={})),"undefined"!=typeof window&&(window.PonAudioVisualizerType=r);var i,a=r,s=function(){function t(t){this.type=a.Solid,this.options=t,this._canvas=document.createElement("canvas");var n=this.canvas.getContext("2d");if(null==n)throw Error("Cannot get context 2d");this._context=n}return Object.defineProperty(t.prototype,"canvas",{get:function(){return this._canvas},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"context",{get:function(){return this._context},enumerable:!0,configurable:!0}),t.prototype.draw=function(t){throw Error("extends me!")},t.prototype.applyOptions=function(t,n){var e=this;Object.keys(n).forEach((function(r){null!=t[r]?e[r]=t[r]:e[r]=n[r]}))},t}(),c=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)},function(t,n){function e(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}),l=function(t){function n(n){var e=t.call(this,n)||this;if(e.type=a.Solid,e.applyOptions(n,{barWidth:15,barHeight:400,colors:["#00FF00","#FF0000"],margin:2,gradientStops:null}),e.canvas.height=e.barHeight,null==e.gradientStops){var r=e.gradientStops=[];e.colors.forEach((function(t,n){var o=0;n>0&&(o=n/(e.colors.length-1)),r[n]=o}))}return e.gradient=e.context.createLinearGradient(e.barWidth,e.barHeight,0,0),e.colors.forEach((function(t,n){e.gradient.addColorStop(e.gradientStops[n],t)})),e}return c(n,t),n.prototype.draw=function(t){var n=this.canvas,e=this.context,r=this.barWidth,o=this.margin;n.width=(r+o)*t.length-o,e.fillStyle=this.gradient,e.clearRect(0,0,this.canvas.width,this.canvas.height);for(var i=0;i<t.length;i++){var a=n.height*t[i];e.fillRect((r+o)*i,n.height-a,r,n.height)}},n}(s),u=function(){var t=function(n,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(n,e)};return function(n,e){function r(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}(),h=function(t){function n(n){var e=t.call(this,n)||this;e.type=a.Block,e.stepedColors=[],e.remnantStartPoints=[],e.remnantCurrentPoints=[],e.remnantTicks=[],e.applyOptions(n,{blockWidth:15,blockHeight:8,blockCount:40,marginh:2,marginv:2,colors:["#00FF00","#FFFF00","#FF0000"],colorSteps:[20,30,40]}),e.canvas.height=(e.blockHeight+e.marginv)*e.blockCount-e.marginv;for(var r=0,o=0;o<e.blockCount;o++)e.colorSteps[r]<=o&&++r>=e.colors.length&&(r=e.colors.length-1),e.stepedColors[o]=e.colors[r];return window.tmp={s:e.remnantStartPoints,c:e.remnantCurrentPoints,t:e.remnantTicks},e}return u(n,t),n.prototype.draw=function(t){var n=Date.now();this.canvas.width=(this.blockWidth+this.marginh)*t.length-this.marginh,this.context.clearRect(0,0,this.canvas.width,this.canvas.height);for(var e=0;e<t.length;e++){for(var r=this.canvas.height*t[e],o=Math.floor(r/(this.blockHeight+this.marginh)),i=0;i<o;i++)this.drawBlock(e,i);null==this.remnantStartPoints[e]&&(this.remnantStartPoints[e]=0,this.remnantCurrentPoints[e]=0,this.remnantTicks[e]=n),this.remnantCurrentPoints[e]<=o&&(this.remnantStartPoints[e]=o,this.remnantCurrentPoints[e]=o,this.remnantTicks[e]=n),this.remnantCurrentPoints[e]>=0&&this.drawBlock(e,this.remnantCurrentPoints[e])}this.updateRemnantPoints(n)},n.prototype.drawBlock=function(t,n){var e=(this.blockWidth+this.marginh)*t,r=this.canvas.height-this.blockHeight-(this.blockHeight+this.marginv)*n;this.context.fillStyle=this.stepedColors[n],this.context.fillRect(e,r,this.blockWidth,this.blockHeight)},n.prototype.updateRemnantPoints=function(t){for(var n=0;n<this.remnantStartPoints.length;n++){var e=this.remnantStartPoints[n],r=this.remnantTicks[n];if(!(e<=0||r<=0)){var o=t-r-128;if(o<=0)this.remnantCurrentPoints[n]=e;else{var i=e-Math.floor(o/64);this.remnantCurrentPoints[n]=i,i<0&&(this.remnantStartPoints[n]=0,this.remnantCurrentPoints[n]=0,this.remnantTicks[n]=0)}}}},n}(s),f=function(){function t(){}return t.create=function(t,n){switch(t){case a.Solid:return new l(n);case a.Block:return new h(n)}throw new Error("Unknown PonAudioVisualizerType. ("+t+")")},t.visualizers={},t}(),p=function(){function t(t,n){this.analyser=null,this.visualizer=null,this.visualizerType=t,this.visualizer=f.create(t,n)}return Object.defineProperty(t.prototype,"canvas",{get:function(){return null!=this.visualizer?this.visualizer.canvas:null},enumerable:!0,configurable:!0}),t.prototype.destroy=function(){null!=this.analyser&&this.analyser.destroy()},t.prototype.setAudio=function(t){this.analyser=new o(t)},Object.defineProperty(t.prototype,"isReady",{get:function(){return null!=this.analyser&&this.analyser.isReady&&null!=this.visualizer},enumerable:!0,configurable:!0}),t.prototype.draw=function(){null!=this.analyser&&null!=this.visualizer&&this.analyser.isReady&&this.visualizer.draw(this.analyser.getSpectrumArray())},t}();n.default=p;"undefined"!=typeof window&&(window.PonAudioSpectrum=p)}]);