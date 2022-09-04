const os=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function i(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerpolicy&&(l.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?l.credentials="include":r.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(r){if(r.ep)return;r.ep=!0;const l=i(r);fetch(r.href,l)}};os();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ft=window,ye=Ft.ShadowRoot&&(Ft.ShadyCSS===void 0||Ft.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_e=Symbol(),Ze=new WeakMap;class di{constructor(t,i,n){if(this._$cssResult$=!0,n!==_e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(ye&&t===void 0){const n=i!==void 0&&i.length===1;n&&(t=Ze.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&Ze.set(i,t))}return t}toString(){return this.cssText}}const as=o=>new di(typeof o=="string"?o:o+"",void 0,_e),it=(o,...t)=>{const i=o.length===1?o[0]:t.reduce((n,r,l)=>n+(c=>{if(c._$cssResult$===!0)return c.cssText;if(typeof c=="number")return c;throw Error("Value passed to 'css' function must be a 'css' function result: "+c+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[l+1],o[0]);return new di(i,o,_e)},ls=(o,t)=>{ye?o.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet):t.forEach(i=>{const n=document.createElement("style"),r=Ft.litNonce;r!==void 0&&n.setAttribute("nonce",r),n.textContent=i.cssText,o.appendChild(n)})},Ke=ye?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let i="";for(const n of t.cssRules)i+=n.cssText;return as(i)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ce;const Wt=window,Je=Wt.trustedTypes,hs=Je?Je.emptyScript:"",Qe=Wt.reactiveElementPolyfillSupport,ge={toAttribute(o,t){switch(t){case Boolean:o=o?hs:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let i=o;switch(t){case Boolean:i=o!==null;break;case Number:i=o===null?null:Number(o);break;case Object:case Array:try{i=JSON.parse(o)}catch{i=null}}return i}},pi=(o,t)=>t!==o&&(t==t||o==o),ue={attribute:!0,type:String,converter:ge,reflect:!1,hasChanged:pi};class ot extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var i;(i=this.h)!==null&&i!==void 0||(this.h=[]),this.h.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((i,n)=>{const r=this._$Ep(n,i);r!==void 0&&(this._$Ev.set(r,n),t.push(r))}),t}static createProperty(t,i=ue){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const n=typeof t=="symbol"?Symbol():"__"+t,r=this.getPropertyDescriptor(t,n,i);r!==void 0&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,i,n){return{get(){return this[i]},set(r){const l=this[t];this[i]=r,this.requestUpdate(t,l,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||ue}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const i=this.properties,n=[...Object.getOwnPropertyNames(i),...Object.getOwnPropertySymbols(i)];for(const r of n)this.createProperty(r,i[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const r of n)i.unshift(Ke(r))}else t!==void 0&&i.push(Ke(t));return i}static _$Ep(t,i){const n=i.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(i=>i(this))}addController(t){var i,n;((i=this._$ES)!==null&&i!==void 0?i:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)===null||n===void 0||n.call(t))}removeController(t){var i;(i=this._$ES)===null||i===void 0||i.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i])})}createRenderRoot(){var t;const i=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return ls(i,this.constructor.elementStyles),i}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(i=>{var n;return(n=i.hostConnected)===null||n===void 0?void 0:n.call(i)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var n;return(n=i.hostDisconnected)===null||n===void 0?void 0:n.call(i)})}attributeChangedCallback(t,i,n){this._$AK(t,n)}_$EO(t,i,n=ue){var r;const l=this.constructor._$Ep(t,n);if(l!==void 0&&n.reflect===!0){const c=(((r=n.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?n.converter:ge).toAttribute(i,n.type);this._$El=t,c==null?this.removeAttribute(l):this.setAttribute(l,c),this._$El=null}}_$AK(t,i){var n;const r=this.constructor,l=r._$Ev.get(t);if(l!==void 0&&this._$El!==l){const c=r.getPropertyOptions(l),m=typeof c.converter=="function"?{fromAttribute:c.converter}:((n=c.converter)===null||n===void 0?void 0:n.fromAttribute)!==void 0?c.converter:ge;this._$El=l,this[l]=m.fromAttribute(i,c.type),this._$El=null}}requestUpdate(t,i,n){let r=!0;t!==void 0&&(((n=n||this.constructor.getPropertyOptions(t)).hasChanged||pi)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),n.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,n))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((r,l)=>this[l]=r),this._$Ei=void 0);let i=!1;const n=this._$AL;try{i=this.shouldUpdate(n),i?(this.willUpdate(n),(t=this._$ES)===null||t===void 0||t.forEach(r=>{var l;return(l=r.hostUpdate)===null||l===void 0?void 0:l.call(r)}),this.update(n)):this._$Ek()}catch(r){throw i=!1,this._$Ek(),r}i&&this._$AE(n)}willUpdate(t){}_$AE(t){var i;(i=this._$ES)===null||i===void 0||i.forEach(n=>{var r;return(r=n.hostUpdated)===null||r===void 0?void 0:r.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((i,n)=>this._$EO(n,this[n],i)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}ot.finalized=!0,ot.elementProperties=new Map,ot.elementStyles=[],ot.shadowRootOptions={mode:"open"},Qe==null||Qe({ReactiveElement:ot}),((ce=Wt.reactiveElementVersions)!==null&&ce!==void 0?ce:Wt.reactiveElementVersions=[]).push("1.4.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var de;const qt=window,lt=qt.trustedTypes,ti=lt?lt.createPolicy("lit-html",{createHTML:o=>o}):void 0,F=`lit$${(Math.random()+"").slice(9)}$`,vi="?"+F,cs=`<${vi}>`,ht=document,At=(o="")=>ht.createComment(o),bt=o=>o===null||typeof o!="object"&&typeof o!="function",fi=Array.isArray,us=o=>fi(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",$t=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ei=/-->/g,ii=/>/g,et=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),si=/'/g,ni=/"/g,mi=/^(?:script|style|textarea|title)$/i,ds=o=>(t,...i)=>({_$litType$:o,strings:t,values:i}),X=ds(1),W=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),ri=new WeakMap,ps=(o,t,i)=>{var n,r;const l=(n=i==null?void 0:i.renderBefore)!==null&&n!==void 0?n:t;let c=l._$litPart$;if(c===void 0){const m=(r=i==null?void 0:i.renderBefore)!==null&&r!==void 0?r:null;l._$litPart$=c=new Ct(t.insertBefore(At(),m),m,void 0,i!=null?i:{})}return c._$AI(o),c},at=ht.createTreeWalker(ht,129,null,!1),vs=(o,t)=>{const i=o.length-1,n=[];let r,l=t===2?"<svg>":"",c=$t;for(let p=0;p<i;p++){const v=o[p];let b,g,y=-1,_=0;for(;_<v.length&&(c.lastIndex=_,g=c.exec(v),g!==null);)_=c.lastIndex,c===$t?g[1]==="!--"?c=ei:g[1]!==void 0?c=ii:g[2]!==void 0?(mi.test(g[2])&&(r=RegExp("</"+g[2],"g")),c=et):g[3]!==void 0&&(c=et):c===et?g[0]===">"?(c=r!=null?r:$t,y=-1):g[1]===void 0?y=-2:(y=c.lastIndex-g[2].length,b=g[1],c=g[3]===void 0?et:g[3]==='"'?ni:si):c===ni||c===si?c=et:c===ei||c===ii?c=$t:(c=et,r=void 0);const Z=c===et&&o[p+1].startsWith("/>")?" ":"";l+=c===$t?v+cs:y>=0?(n.push(b),v.slice(0,y)+"$lit$"+v.slice(y)+F+Z):v+F+(y===-2?(n.push(void 0),p):Z)}const m=l+(o[i]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ti!==void 0?ti.createHTML(m):m,n]};class wt{constructor({strings:t,_$litType$:i},n){let r;this.parts=[];let l=0,c=0;const m=t.length-1,p=this.parts,[v,b]=vs(t,i);if(this.el=wt.createElement(v,n),at.currentNode=this.el.content,i===2){const g=this.el.content,y=g.firstChild;y.remove(),g.append(...y.childNodes)}for(;(r=at.nextNode())!==null&&p.length<m;){if(r.nodeType===1){if(r.hasAttributes()){const g=[];for(const y of r.getAttributeNames())if(y.endsWith("$lit$")||y.startsWith(F)){const _=b[c++];if(g.push(y),_!==void 0){const Z=r.getAttribute(_.toLowerCase()+"$lit$").split(F),w=/([.?@])?(.*)/.exec(_);p.push({type:1,index:l,name:w[2],strings:Z,ctor:w[1]==="."?ms:w[1]==="?"?ys:w[1]==="@"?_s:Zt})}else p.push({type:6,index:l})}for(const y of g)r.removeAttribute(y)}if(mi.test(r.tagName)){const g=r.textContent.split(F),y=g.length-1;if(y>0){r.textContent=lt?lt.emptyScript:"";for(let _=0;_<y;_++)r.append(g[_],At()),at.nextNode(),p.push({type:2,index:++l});r.append(g[y],At())}}}else if(r.nodeType===8)if(r.data===vi)p.push({type:2,index:l});else{let g=-1;for(;(g=r.data.indexOf(F,g+1))!==-1;)p.push({type:7,index:l}),g+=F.length-1}l++}}static createElement(t,i){const n=ht.createElement("template");return n.innerHTML=t,n}}function ct(o,t,i=o,n){var r,l,c,m;if(t===W)return t;let p=n!==void 0?(r=i._$Cl)===null||r===void 0?void 0:r[n]:i._$Cu;const v=bt(t)?void 0:t._$litDirective$;return(p==null?void 0:p.constructor)!==v&&((l=p==null?void 0:p._$AO)===null||l===void 0||l.call(p,!1),v===void 0?p=void 0:(p=new v(o),p._$AT(o,i,n)),n!==void 0?((c=(m=i)._$Cl)!==null&&c!==void 0?c:m._$Cl=[])[n]=p:i._$Cu=p),p!==void 0&&(t=ct(o,p._$AS(o,t.values),p,n)),t}class fs{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:n},parts:r}=this._$AD,l=((i=t==null?void 0:t.creationScope)!==null&&i!==void 0?i:ht).importNode(n,!0);at.currentNode=l;let c=at.nextNode(),m=0,p=0,v=r[0];for(;v!==void 0;){if(m===v.index){let b;v.type===2?b=new Ct(c,c.nextSibling,this,t):v.type===1?b=new v.ctor(c,v.name,v.strings,this,t):v.type===6&&(b=new Es(c,this,t)),this.v.push(b),v=r[++p]}m!==(v==null?void 0:v.index)&&(c=at.nextNode(),m++)}return l}m(t){let i=0;for(const n of this.v)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,i),i+=n.strings.length-2):n._$AI(t[i])),i++}}class Ct{constructor(t,i,n,r){var l;this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=n,this.options=r,this._$C_=(l=r==null?void 0:r.isConnected)===null||l===void 0||l}get _$AU(){var t,i;return(i=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&i!==void 0?i:this._$C_}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=ct(this,t,i),bt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==W&&this.$(t):t._$litType$!==void 0?this.T(t):t.nodeType!==void 0?this.k(t):us(t)?this.O(t):this.$(t)}S(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}$(t){this._$AH!==$&&bt(this._$AH)?this._$AA.nextSibling.data=t:this.k(ht.createTextNode(t)),this._$AH=t}T(t){var i;const{values:n,_$litType$:r}=t,l=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=wt.createElement(r.h,this.options)),r);if(((i=this._$AH)===null||i===void 0?void 0:i._$AD)===l)this._$AH.m(n);else{const c=new fs(l,this),m=c.p(this.options);c.m(n),this.k(m),this._$AH=c}}_$AC(t){let i=ri.get(t.strings);return i===void 0&&ri.set(t.strings,i=new wt(t)),i}O(t){fi(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let n,r=0;for(const l of t)r===i.length?i.push(n=new Ct(this.S(At()),this.S(At()),this,this.options)):n=i[r],n._$AI(l),r++;r<i.length&&(this._$AR(n&&n._$AB.nextSibling,r),i.length=r)}_$AR(t=this._$AA.nextSibling,i){var n;for((n=this._$AP)===null||n===void 0||n.call(this,!1,!0,i);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var i;this._$AM===void 0&&(this._$C_=t,(i=this._$AP)===null||i===void 0||i.call(this,t))}}class Zt{constructor(t,i,n,r,l){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=i,this._$AM=r,this.options=l,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=$}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,n,r){const l=this.strings;let c=!1;if(l===void 0)t=ct(this,t,i,0),c=!bt(t)||t!==this._$AH&&t!==W,c&&(this._$AH=t);else{const m=t;let p,v;for(t=l[0],p=0;p<l.length-1;p++)v=ct(this,m[n+p],i,p),v===W&&(v=this._$AH[p]),c||(c=!bt(v)||v!==this._$AH[p]),v===$?t=$:t!==$&&(t+=(v!=null?v:"")+l[p+1]),this._$AH[p]=v}c&&!r&&this.P(t)}P(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t!=null?t:"")}}class ms extends Zt{constructor(){super(...arguments),this.type=3}P(t){this.element[this.name]=t===$?void 0:t}}const gs=lt?lt.emptyScript:"";class ys extends Zt{constructor(){super(...arguments),this.type=4}P(t){t&&t!==$?this.element.setAttribute(this.name,gs):this.element.removeAttribute(this.name)}}class _s extends Zt{constructor(t,i,n,r,l){super(t,i,n,r,l),this.type=5}_$AI(t,i=this){var n;if((t=(n=ct(this,t,i,0))!==null&&n!==void 0?n:$)===W)return;const r=this._$AH,l=t===$&&r!==$||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,c=t!==$&&(r===$||l);l&&this.element.removeEventListener(this.name,this,r),c&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,n;typeof this._$AH=="function"?this._$AH.call((n=(i=this.options)===null||i===void 0?void 0:i.host)!==null&&n!==void 0?n:this.element,t):this._$AH.handleEvent(t)}}class Es{constructor(t,i,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){ct(this,t)}}const oi=qt.litHtmlPolyfillSupport;oi==null||oi(wt,Ct),((de=qt.litHtmlVersions)!==null&&de!==void 0?de:qt.litHtmlVersions=[]).push("2.3.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pe,ve;class H extends ot{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,i;const n=super.createRenderRoot();return(t=(i=this.renderOptions).renderBefore)!==null&&t!==void 0||(i.renderBefore=n.firstChild),n}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ps(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return W}}H.finalized=!0,H._$litElement$=!0,(pe=globalThis.litElementHydrateSupport)===null||pe===void 0||pe.call(globalThis,{LitElement:H});const ai=globalThis.litElementPolyfillSupport;ai==null||ai({LitElement:H});((ve=globalThis.litElementVersions)!==null&&ve!==void 0?ve:globalThis.litElementVersions=[]).push("3.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gi=o=>t=>typeof t=="function"?((i,n)=>(customElements.define(i,n),n))(o,t):((i,n)=>{const{kind:r,elements:l}=n;return{kind:r,elements:l,finisher(c){customElements.define(i,c)}}})(o,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $s=(o,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,o)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,o)}};function C(o){return(t,i)=>i!==void 0?((n,r,l)=>{r.constructor.createProperty(l,n)})(o,t,i):$s(o,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function I(o){return C({...o,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ts=({finisher:o,descriptor:t})=>(i,n)=>{var r;if(n===void 0){const l=(r=i.originalKey)!==null&&r!==void 0?r:i.key,c=t!=null?{kind:"method",placement:"prototype",key:l,descriptor:t(i.key)}:{...i,key:l};return o!=null&&(c.finisher=function(m){o(m,l)}),c}{const l=i.constructor;t!==void 0&&Object.defineProperty(i,n,t(n)),o==null||o(l,n)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function yi(o,t){return Ts({descriptor:i=>{const n={get(){var r,l;return(l=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(o))!==null&&l!==void 0?l:null},enumerable:!0,configurable:!0};if(t){const r=typeof i=="symbol"?Symbol():"__"+i;n.get=function(){var l,c;return this[r]===void 0&&(this[r]=(c=(l=this.renderRoot)===null||l===void 0?void 0:l.querySelector(o))!==null&&c!==void 0?c:null),this[r]}}return n}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var fe;((fe=window.HTMLSlotElement)===null||fe===void 0?void 0:fe.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ee={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},$e=o=>(...t)=>({_$litDirective$:o,values:t});class Te{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,n){this._$Ct=t,this._$AM=i,this._$Ci=n}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pt=$e(class extends Te{constructor(o){var t;if(super(o),o.type!==Ee.ATTRIBUTE||o.name!=="style"||((t=o.strings)===null||t===void 0?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(o){return Object.keys(o).reduce((t,i)=>{const n=o[i];return n==null?t:t+`${i=i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(o,[t]){const{style:i}=o.element;if(this.vt===void 0){this.vt=new Set;for(const n in t)this.vt.add(n);return this.render(t)}this.vt.forEach(n=>{t[n]==null&&(this.vt.delete(n),n.includes("-")?i.removeProperty(n):i[n]="")});for(const n in t){const r=t[n];r!=null&&(this.vt.add(n),n.includes("-")?i.setProperty(n,r):i[n]=r)}return W}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _i=$e(class extends Te{constructor(o){var t;if(super(o),o.type!==Ee.ATTRIBUTE||o.name!=="class"||((t=o.strings)===null||t===void 0?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(t=>o[t]).join(" ")+" "}update(o,[t]){var i,n;if(this.nt===void 0){this.nt=new Set,o.strings!==void 0&&(this.st=new Set(o.strings.join(" ").split(/\s/).filter(l=>l!=="")));for(const l in t)t[l]&&!(!((i=this.st)===null||i===void 0)&&i.has(l))&&this.nt.add(l);return this.render(t)}const r=o.element.classList;this.nt.forEach(l=>{l in t||(r.remove(l),this.nt.delete(l))});for(const l in t){const c=!!t[l];c===this.nt.has(l)||((n=this.st)===null||n===void 0?void 0:n.has(l))||(c?(r.add(l),this.nt.add(l)):(r.remove(l),this.nt.delete(l)))}return W}});var As=Object.defineProperty,bs=Object.getOwnPropertyDescriptor,ws=(o,t,i,n)=>{for(var r=n>1?void 0:n?bs(t,i):t,l=o.length-1,c;l>=0;l--)(c=o[l])&&(r=(n?c(t,i,r):c(r))||r);return n&&r&&As(t,i,r),r};const Ps=["checkered","striped"];class Ae extends H{constructor(){super(...arguments),this.background="striped"}render(){return X`
      <div id="background" class=${_i({[Cs(this.background)]:!0})}></div>
    `}}Ae.styles=it`
    #background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }

    .striped {
      background: repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 10px,
        rgba(4, 60, 94, 0.1) 10px,
        rgba(4, 60, 94, 0.1) 20px
      );
    }

    .checkered {
      background: repeating-conic-gradient(
        transparent 0 90deg,
        rgba(4, 60, 94, 0.1) 0 180deg)
      0 0/30px 30px round;
    }

    html[data-theme='dark'] {
      .striped {
        background: repeating-linear-gradient(
          -45deg,
          #00080f,
          #00080f 10px,
          #15232e 10px,
          #15232e 20px,
        );
      }

      .checkered {
        background: repeating-conic-gradient(
          #00080f 0 90deg,
          #15232e 0 180deg) 
        0 0/30px 30px round;
      }
    }
  `;ws([C()],Ae.prototype,"background",2);const Ss=o=>Ps.includes(o),Cs=o=>Ss(o)?o:"striped";customElements.get("image-comparison-viewer-background")||customElements.define("image-comparison-viewer-background",Ae);var xs=Object.defineProperty,Os=Object.getOwnPropertyDescriptor,ut=(o,t,i,n)=>{for(var r=n>1?void 0:n?Os(t,i):t,l=o.length-1,c;l>=0;l--)(c=o[l])&&(r=(n?c(t,i,r):c(r))||r);return n&&r&&xs(t,i,r),r};class q extends H{constructor(){super(...arguments),this.width=0,this.height=0,this.zoom=0,this.x=0,this.y=0,this.comparisonX=.5}getTransform(){const{x:t,y:i,zoom:n,comparisonX:r}=this,l=li(r);return`scale(${n}) translate(calc(${l*100}% + ${t/n}px), ${i/n}px)`}render(){const{width:t,height:i,comparisonX:n}=this,r=li(n);return X`
      <div class="image-mask" style=${Pt({width:`${t}px`,height:`${i}px`,transform:this.getTransform()})}>
        <div class="image-mask-inner" style=${Pt({transform:`translate(${r*-100}%, 0)`})}>
          <slot></slot>
        </div>
      </div>
    `}}q.styles=it`
    .image-mask {
      overflow: hidden;
      z-index: 1;
    }

    .image-mask-inner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  `;ut([C({type:Number})],q.prototype,"width",2);ut([C({type:Number})],q.prototype,"height",2);ut([C({type:Number})],q.prototype,"zoom",2);ut([C({type:Number})],q.prototype,"x",2);ut([C({type:Number})],q.prototype,"y",2);ut([C({type:Number})],q.prototype,"comparisonX",2);const li=o=>o<0||o>1?(console.warn(`x must be a number between 0 and 1. You provided ${o}.`),o<0?0:1):o;customElements.get("image-comparison-viewer-mask")||customElements.define("image-comparison-viewer-mask",q);class Ei extends H{render(){return X`
      <slot></slot>
    `}}Ei.styles=it`
    :host {
      position: absolute;
      transform-origin: 0%;
      z-index: 1;
      transform-origin: center;
      width: 100%;
      height: 100%;
    }
  `;customElements.get("image-comparison-viewer-images")||customElements.define("image-comparison-viewer-images",Ei);var $i={exports:{}};/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */(function(o){(function(t,i,n,r){var l=["","webkit","Moz","MS","ms","o"],c=i.createElement("div"),m="function",p=Math.round,v=Math.abs,b=Date.now;function g(e,s,a){return setTimeout(Kt(e,a),s)}function y(e,s,a){return Array.isArray(e)?(_(e,a[s],a),!0):!1}function _(e,s,a){var h;if(!!e)if(e.forEach)e.forEach(s,a);else if(e.length!==r)for(h=0;h<e.length;)s.call(a,e[h],h,e),h++;else for(h in e)e.hasOwnProperty(h)&&s.call(a,e[h],h,e)}function Z(e,s,a){var h="DEPRECATED METHOD: "+s+`
`+a+` AT 
`;return function(){var u=new Error("get-stack-trace"),d=u&&u.stack?u.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=t.console&&(t.console.warn||t.console.log);return f&&f.call(t.console,h,d),e.apply(this,arguments)}}var w;typeof Object.assign!="function"?w=function(s){if(s===r||s===null)throw new TypeError("Cannot convert undefined or null to object");for(var a=Object(s),h=1;h<arguments.length;h++){var u=arguments[h];if(u!==r&&u!==null)for(var d in u)u.hasOwnProperty(d)&&(a[d]=u[d])}return a}:w=Object.assign;var we=Z(function(s,a,h){for(var u=Object.keys(a),d=0;d<u.length;)(!h||h&&s[u[d]]===r)&&(s[u[d]]=a[u[d]]),d++;return s},"extend","Use `assign`."),bi=Z(function(s,a){return we(s,a,!0)},"merge","Use `assign`.");function O(e,s,a){var h=s.prototype,u;u=e.prototype=Object.create(h),u.constructor=e,u._super=h,a&&w(u,a)}function Kt(e,s){return function(){return e.apply(s,arguments)}}function Jt(e,s){return typeof e==m?e.apply(s&&s[0]||r,s):e}function Pe(e,s){return e===r?s:e}function Ot(e,s,a){_(Nt(s),function(h){e.addEventListener(h,a,!1)})}function It(e,s,a){_(Nt(s),function(h){e.removeEventListener(h,a,!1)})}function Se(e,s){for(;e;){if(e==s)return!0;e=e.parentNode}return!1}function K(e,s){return e.indexOf(s)>-1}function Nt(e){return e.trim().split(/\s+/g)}function nt(e,s,a){if(e.indexOf&&!a)return e.indexOf(s);for(var h=0;h<e.length;){if(a&&e[h][a]==s||!a&&e[h]===s)return h;h++}return-1}function Mt(e){return Array.prototype.slice.call(e,0)}function Ce(e,s,a){for(var h=[],u=[],d=0;d<e.length;){var f=s?e[d][s]:e[d];nt(u,f)<0&&h.push(e[d]),u[d]=f,d++}return a&&(s?h=h.sort(function(A,S){return A[s]>S[s]}):h=h.sort()),h}function Ut(e,s){for(var a,h,u=s[0].toUpperCase()+s.slice(1),d=0;d<l.length;){if(a=l[d],h=a?a+u:s,h in e)return h;d++}return r}var wi=1;function Pi(){return wi++}function xe(e){var s=e.ownerDocument||e;return s.defaultView||s.parentWindow||t}var Si=/mobile|tablet|ip(ad|hone|od)|android/i,Oe="ontouchstart"in t,Ci=Ut(t,"PointerEvent")!==r,xi=Oe&&Si.test(navigator.userAgent),pt="touch",Oi="pen",Qt="mouse",Ii="kinect",Ni=25,P=1,J=2,E=4,x=8,Dt=1,vt=2,ft=4,mt=8,gt=16,D=vt|ft,Q=mt|gt,Ie=D|Q,Ne=["x","y"],Rt=["clientX","clientY"];function N(e,s){var a=this;this.manager=e,this.callback=s,this.element=e.element,this.target=e.options.inputTarget,this.domHandler=function(h){Jt(e.options.enable,[e])&&a.handler(h)},this.init()}N.prototype={handler:function(){},init:function(){this.evEl&&Ot(this.element,this.evEl,this.domHandler),this.evTarget&&Ot(this.target,this.evTarget,this.domHandler),this.evWin&&Ot(xe(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&It(this.element,this.evEl,this.domHandler),this.evTarget&&It(this.target,this.evTarget,this.domHandler),this.evWin&&It(xe(this.element),this.evWin,this.domHandler)}};function Mi(e){var s,a=e.options.inputClass;return a?s=a:Ci?s=ee:xi?s=kt:Oe?s=ie:s=Ht,new s(e,Ui)}function Ui(e,s,a){var h=a.pointers.length,u=a.changedPointers.length,d=s&P&&h-u===0,f=s&(E|x)&&h-u===0;a.isFirst=!!d,a.isFinal=!!f,d&&(e.session={}),a.eventType=s,Di(e,a),e.emit("hammer.input",a),e.recognize(a),e.session.prevInput=a}function Di(e,s){var a=e.session,h=s.pointers,u=h.length;a.firstInput||(a.firstInput=Me(s)),u>1&&!a.firstMultiple?a.firstMultiple=Me(s):u===1&&(a.firstMultiple=!1);var d=a.firstInput,f=a.firstMultiple,T=f?f.center:d.center,A=s.center=Ue(h);s.timeStamp=b(),s.deltaTime=s.timeStamp-d.timeStamp,s.angle=te(T,A),s.distance=Lt(T,A),Ri(a,s),s.offsetDirection=Re(s.deltaX,s.deltaY);var S=De(s.deltaTime,s.deltaX,s.deltaY);s.overallVelocityX=S.x,s.overallVelocityY=S.y,s.overallVelocity=v(S.x)>v(S.y)?S.x:S.y,s.scale=f?ki(f.pointers,h):1,s.rotation=f?Hi(f.pointers,h):0,s.maxPointers=a.prevInput?s.pointers.length>a.prevInput.maxPointers?s.pointers.length:a.prevInput.maxPointers:s.pointers.length,Li(a,s);var L=e.element;Se(s.srcEvent.target,L)&&(L=s.srcEvent.target),s.target=L}function Ri(e,s){var a=s.center,h=e.offsetDelta||{},u=e.prevDelta||{},d=e.prevInput||{};(s.eventType===P||d.eventType===E)&&(u=e.prevDelta={x:d.deltaX||0,y:d.deltaY||0},h=e.offsetDelta={x:a.x,y:a.y}),s.deltaX=u.x+(a.x-h.x),s.deltaY=u.y+(a.y-h.y)}function Li(e,s){var a=e.lastInterval||s,h=s.timeStamp-a.timeStamp,u,d,f,T;if(s.eventType!=x&&(h>Ni||a.velocity===r)){var A=s.deltaX-a.deltaX,S=s.deltaY-a.deltaY,L=De(h,A,S);d=L.x,f=L.y,u=v(L.x)>v(L.y)?L.x:L.y,T=Re(A,S),e.lastInterval=s}else u=a.velocity,d=a.velocityX,f=a.velocityY,T=a.direction;s.velocity=u,s.velocityX=d,s.velocityY=f,s.direction=T}function Me(e){for(var s=[],a=0;a<e.pointers.length;)s[a]={clientX:p(e.pointers[a].clientX),clientY:p(e.pointers[a].clientY)},a++;return{timeStamp:b(),pointers:s,center:Ue(s),deltaX:e.deltaX,deltaY:e.deltaY}}function Ue(e){var s=e.length;if(s===1)return{x:p(e[0].clientX),y:p(e[0].clientY)};for(var a=0,h=0,u=0;u<s;)a+=e[u].clientX,h+=e[u].clientY,u++;return{x:p(a/s),y:p(h/s)}}function De(e,s,a){return{x:s/e||0,y:a/e||0}}function Re(e,s){return e===s?Dt:v(e)>=v(s)?e<0?vt:ft:s<0?mt:gt}function Lt(e,s,a){a||(a=Ne);var h=s[a[0]]-e[a[0]],u=s[a[1]]-e[a[1]];return Math.sqrt(h*h+u*u)}function te(e,s,a){a||(a=Ne);var h=s[a[0]]-e[a[0]],u=s[a[1]]-e[a[1]];return Math.atan2(u,h)*180/Math.PI}function Hi(e,s){return te(s[1],s[0],Rt)+te(e[1],e[0],Rt)}function ki(e,s){return Lt(s[0],s[1],Rt)/Lt(e[0],e[1],Rt)}var zi={mousedown:P,mousemove:J,mouseup:E},Yi="mousedown",Vi="mousemove mouseup";function Ht(){this.evEl=Yi,this.evWin=Vi,this.pressed=!1,N.apply(this,arguments)}O(Ht,N,{handler:function(s){var a=zi[s.type];a&P&&s.button===0&&(this.pressed=!0),a&J&&s.which!==1&&(a=E),this.pressed&&(a&E&&(this.pressed=!1),this.callback(this.manager,a,{pointers:[s],changedPointers:[s],pointerType:Qt,srcEvent:s}))}});var Xi={pointerdown:P,pointermove:J,pointerup:E,pointercancel:x,pointerout:x},ji={2:pt,3:Oi,4:Qt,5:Ii},Le="pointerdown",He="pointermove pointerup pointercancel";t.MSPointerEvent&&!t.PointerEvent&&(Le="MSPointerDown",He="MSPointerMove MSPointerUp MSPointerCancel");function ee(){this.evEl=Le,this.evWin=He,N.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}O(ee,N,{handler:function(s){var a=this.store,h=!1,u=s.type.toLowerCase().replace("ms",""),d=Xi[u],f=ji[s.pointerType]||s.pointerType,T=f==pt,A=nt(a,s.pointerId,"pointerId");d&P&&(s.button===0||T)?A<0&&(a.push(s),A=a.length-1):d&(E|x)&&(h=!0),!(A<0)&&(a[A]=s,this.callback(this.manager,d,{pointers:a,changedPointers:[s],pointerType:f,srcEvent:s}),h&&a.splice(A,1))}});var Fi={touchstart:P,touchmove:J,touchend:E,touchcancel:x},Wi="touchstart",qi="touchstart touchmove touchend touchcancel";function ke(){this.evTarget=Wi,this.evWin=qi,this.started=!1,N.apply(this,arguments)}O(ke,N,{handler:function(s){var a=Fi[s.type];if(a===P&&(this.started=!0),!!this.started){var h=Bi.call(this,s,a);a&(E|x)&&h[0].length-h[1].length===0&&(this.started=!1),this.callback(this.manager,a,{pointers:h[0],changedPointers:h[1],pointerType:pt,srcEvent:s})}}});function Bi(e,s){var a=Mt(e.touches),h=Mt(e.changedTouches);return s&(E|x)&&(a=Ce(a.concat(h),"identifier",!0)),[a,h]}var Gi={touchstart:P,touchmove:J,touchend:E,touchcancel:x},Zi="touchstart touchmove touchend touchcancel";function kt(){this.evTarget=Zi,this.targetIds={},N.apply(this,arguments)}O(kt,N,{handler:function(s){var a=Gi[s.type],h=Ki.call(this,s,a);!h||this.callback(this.manager,a,{pointers:h[0],changedPointers:h[1],pointerType:pt,srcEvent:s})}});function Ki(e,s){var a=Mt(e.touches),h=this.targetIds;if(s&(P|J)&&a.length===1)return h[a[0].identifier]=!0,[a,a];var u,d,f=Mt(e.changedTouches),T=[],A=this.target;if(d=a.filter(function(S){return Se(S.target,A)}),s===P)for(u=0;u<d.length;)h[d[u].identifier]=!0,u++;for(u=0;u<f.length;)h[f[u].identifier]&&T.push(f[u]),s&(E|x)&&delete h[f[u].identifier],u++;if(!!T.length)return[Ce(d.concat(T),"identifier",!0),T]}var Ji=2500,ze=25;function ie(){N.apply(this,arguments);var e=Kt(this.handler,this);this.touch=new kt(this.manager,e),this.mouse=new Ht(this.manager,e),this.primaryTouch=null,this.lastTouches=[]}O(ie,N,{handler:function(s,a,h){var u=h.pointerType==pt,d=h.pointerType==Qt;if(!(d&&h.sourceCapabilities&&h.sourceCapabilities.firesTouchEvents)){if(u)Qi.call(this,a,h);else if(d&&ts.call(this,h))return;this.callback(s,a,h)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});function Qi(e,s){e&P?(this.primaryTouch=s.changedPointers[0].identifier,Ye.call(this,s)):e&(E|x)&&Ye.call(this,s)}function Ye(e){var s=e.changedPointers[0];if(s.identifier===this.primaryTouch){var a={x:s.clientX,y:s.clientY};this.lastTouches.push(a);var h=this.lastTouches,u=function(){var d=h.indexOf(a);d>-1&&h.splice(d,1)};setTimeout(u,Ji)}}function ts(e){for(var s=e.srcEvent.clientX,a=e.srcEvent.clientY,h=0;h<this.lastTouches.length;h++){var u=this.lastTouches[h],d=Math.abs(s-u.x),f=Math.abs(a-u.y);if(d<=ze&&f<=ze)return!0}return!1}var Ve=Ut(c.style,"touchAction"),Xe=Ve!==r,je="compute",Fe="auto",se="manipulation",tt="none",yt="pan-x",_t="pan-y",zt=is();function ne(e,s){this.manager=e,this.set(s)}ne.prototype={set:function(e){e==je&&(e=this.compute()),Xe&&this.manager.element.style&&zt[e]&&(this.manager.element.style[Ve]=e),this.actions=e.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var e=[];return _(this.manager.recognizers,function(s){Jt(s.options.enable,[s])&&(e=e.concat(s.getTouchAction()))}),es(e.join(" "))},preventDefaults:function(e){var s=e.srcEvent,a=e.offsetDirection;if(this.manager.session.prevented){s.preventDefault();return}var h=this.actions,u=K(h,tt)&&!zt[tt],d=K(h,_t)&&!zt[_t],f=K(h,yt)&&!zt[yt];if(u){var T=e.pointers.length===1,A=e.distance<2,S=e.deltaTime<250;if(T&&A&&S)return}if(!(f&&d)&&(u||d&&a&D||f&&a&Q))return this.preventSrc(s)},preventSrc:function(e){this.manager.session.prevented=!0,e.preventDefault()}};function es(e){if(K(e,tt))return tt;var s=K(e,yt),a=K(e,_t);return s&&a?tt:s||a?s?yt:_t:K(e,se)?se:Fe}function is(){if(!Xe)return!1;var e={},s=t.CSS&&t.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(a){e[a]=s?t.CSS.supports("touch-action",a):!0}),e}var Yt=1,M=2,rt=4,j=8,z=j,Et=16,R=32;function Y(e){this.options=w({},this.defaults,e||{}),this.id=Pi(),this.manager=null,this.options.enable=Pe(this.options.enable,!0),this.state=Yt,this.simultaneous={},this.requireFail=[]}Y.prototype={defaults:{},set:function(e){return w(this.options,e),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(e){if(y(e,"recognizeWith",this))return this;var s=this.simultaneous;return e=Vt(e,this),s[e.id]||(s[e.id]=e,e.recognizeWith(this)),this},dropRecognizeWith:function(e){return y(e,"dropRecognizeWith",this)?this:(e=Vt(e,this),delete this.simultaneous[e.id],this)},requireFailure:function(e){if(y(e,"requireFailure",this))return this;var s=this.requireFail;return e=Vt(e,this),nt(s,e)===-1&&(s.push(e),e.requireFailure(this)),this},dropRequireFailure:function(e){if(y(e,"dropRequireFailure",this))return this;e=Vt(e,this);var s=nt(this.requireFail,e);return s>-1&&this.requireFail.splice(s,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(e){return!!this.simultaneous[e.id]},emit:function(e){var s=this,a=this.state;function h(u){s.manager.emit(u,e)}a<j&&h(s.options.event+We(a)),h(s.options.event),e.additionalEvent&&h(e.additionalEvent),a>=j&&h(s.options.event+We(a))},tryEmit:function(e){if(this.canEmit())return this.emit(e);this.state=R},canEmit:function(){for(var e=0;e<this.requireFail.length;){if(!(this.requireFail[e].state&(R|Yt)))return!1;e++}return!0},recognize:function(e){var s=w({},e);if(!Jt(this.options.enable,[this,s])){this.reset(),this.state=R;return}this.state&(z|Et|R)&&(this.state=Yt),this.state=this.process(s),this.state&(M|rt|j|Et)&&this.tryEmit(s)},process:function(e){},getTouchAction:function(){},reset:function(){}};function We(e){return e&Et?"cancel":e&j?"end":e&rt?"move":e&M?"start":""}function qe(e){return e==gt?"down":e==mt?"up":e==vt?"left":e==ft?"right":""}function Vt(e,s){var a=s.manager;return a?a.get(e):e}function U(){Y.apply(this,arguments)}O(U,Y,{defaults:{pointers:1},attrTest:function(e){var s=this.options.pointers;return s===0||e.pointers.length===s},process:function(e){var s=this.state,a=e.eventType,h=s&(M|rt),u=this.attrTest(e);return h&&(a&x||!u)?s|Et:h||u?a&E?s|j:s&M?s|rt:M:R}});function Xt(){U.apply(this,arguments),this.pX=null,this.pY=null}O(Xt,U,{defaults:{event:"pan",threshold:10,pointers:1,direction:Ie},getTouchAction:function(){var e=this.options.direction,s=[];return e&D&&s.push(_t),e&Q&&s.push(yt),s},directionTest:function(e){var s=this.options,a=!0,h=e.distance,u=e.direction,d=e.deltaX,f=e.deltaY;return u&s.direction||(s.direction&D?(u=d===0?Dt:d<0?vt:ft,a=d!=this.pX,h=Math.abs(e.deltaX)):(u=f===0?Dt:f<0?mt:gt,a=f!=this.pY,h=Math.abs(e.deltaY))),e.direction=u,a&&h>s.threshold&&u&s.direction},attrTest:function(e){return U.prototype.attrTest.call(this,e)&&(this.state&M||!(this.state&M)&&this.directionTest(e))},emit:function(e){this.pX=e.deltaX,this.pY=e.deltaY;var s=qe(e.direction);s&&(e.additionalEvent=this.options.event+s),this._super.emit.call(this,e)}});function re(){U.apply(this,arguments)}O(re,U,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[tt]},attrTest:function(e){return this._super.attrTest.call(this,e)&&(Math.abs(e.scale-1)>this.options.threshold||this.state&M)},emit:function(e){if(e.scale!==1){var s=e.scale<1?"in":"out";e.additionalEvent=this.options.event+s}this._super.emit.call(this,e)}});function oe(){Y.apply(this,arguments),this._timer=null,this._input=null}O(oe,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[Fe]},process:function(e){var s=this.options,a=e.pointers.length===s.pointers,h=e.distance<s.threshold,u=e.deltaTime>s.time;if(this._input=e,!h||!a||e.eventType&(E|x)&&!u)this.reset();else if(e.eventType&P)this.reset(),this._timer=g(function(){this.state=z,this.tryEmit()},s.time,this);else if(e.eventType&E)return z;return R},reset:function(){clearTimeout(this._timer)},emit:function(e){this.state===z&&(e&&e.eventType&E?this.manager.emit(this.options.event+"up",e):(this._input.timeStamp=b(),this.manager.emit(this.options.event,this._input)))}});function ae(){U.apply(this,arguments)}O(ae,U,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[tt]},attrTest:function(e){return this._super.attrTest.call(this,e)&&(Math.abs(e.rotation)>this.options.threshold||this.state&M)}});function le(){U.apply(this,arguments)}O(le,U,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:D|Q,pointers:1},getTouchAction:function(){return Xt.prototype.getTouchAction.call(this)},attrTest:function(e){var s=this.options.direction,a;return s&(D|Q)?a=e.overallVelocity:s&D?a=e.overallVelocityX:s&Q&&(a=e.overallVelocityY),this._super.attrTest.call(this,e)&&s&e.offsetDirection&&e.distance>this.options.threshold&&e.maxPointers==this.options.pointers&&v(a)>this.options.velocity&&e.eventType&E},emit:function(e){var s=qe(e.offsetDirection);s&&this.manager.emit(this.options.event+s,e),this.manager.emit(this.options.event,e)}});function jt(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}O(jt,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[se]},process:function(e){var s=this.options,a=e.pointers.length===s.pointers,h=e.distance<s.threshold,u=e.deltaTime<s.time;if(this.reset(),e.eventType&P&&this.count===0)return this.failTimeout();if(h&&u&&a){if(e.eventType!=E)return this.failTimeout();var d=this.pTime?e.timeStamp-this.pTime<s.interval:!0,f=!this.pCenter||Lt(this.pCenter,e.center)<s.posThreshold;this.pTime=e.timeStamp,this.pCenter=e.center,!f||!d?this.count=1:this.count+=1,this._input=e;var T=this.count%s.taps;if(T===0)return this.hasRequireFailures()?(this._timer=g(function(){this.state=z,this.tryEmit()},s.interval,this),M):z}return R},failTimeout:function(){return this._timer=g(function(){this.state=R},this.options.interval,this),R},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==z&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}});function V(e,s){return s=s||{},s.recognizers=Pe(s.recognizers,V.defaults.preset),new he(e,s)}V.VERSION="2.0.7",V.defaults={domEvents:!1,touchAction:je,enable:!0,inputTarget:null,inputClass:null,preset:[[ae,{enable:!1}],[re,{enable:!1},["rotate"]],[le,{direction:D}],[Xt,{direction:D},["swipe"]],[jt],[jt,{event:"doubletap",taps:2},["tap"]],[oe]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ss=1,Be=2;function he(e,s){this.options=w({},V.defaults,s||{}),this.options.inputTarget=this.options.inputTarget||e,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=e,this.input=Mi(this),this.touchAction=new ne(this,this.options.touchAction),Ge(this,!0),_(this.options.recognizers,function(a){var h=this.add(new a[0](a[1]));a[2]&&h.recognizeWith(a[2]),a[3]&&h.requireFailure(a[3])},this)}he.prototype={set:function(e){return w(this.options,e),e.touchAction&&this.touchAction.update(),e.inputTarget&&(this.input.destroy(),this.input.target=e.inputTarget,this.input.init()),this},stop:function(e){this.session.stopped=e?Be:ss},recognize:function(e){var s=this.session;if(!s.stopped){this.touchAction.preventDefaults(e);var a,h=this.recognizers,u=s.curRecognizer;(!u||u&&u.state&z)&&(u=s.curRecognizer=null);for(var d=0;d<h.length;)a=h[d],s.stopped!==Be&&(!u||a==u||a.canRecognizeWith(u))?a.recognize(e):a.reset(),!u&&a.state&(M|rt|j)&&(u=s.curRecognizer=a),d++}},get:function(e){if(e instanceof Y)return e;for(var s=this.recognizers,a=0;a<s.length;a++)if(s[a].options.event==e)return s[a];return null},add:function(e){if(y(e,"add",this))return this;var s=this.get(e.options.event);return s&&this.remove(s),this.recognizers.push(e),e.manager=this,this.touchAction.update(),e},remove:function(e){if(y(e,"remove",this))return this;if(e=this.get(e),e){var s=this.recognizers,a=nt(s,e);a!==-1&&(s.splice(a,1),this.touchAction.update())}return this},on:function(e,s){if(e!==r&&s!==r){var a=this.handlers;return _(Nt(e),function(h){a[h]=a[h]||[],a[h].push(s)}),this}},off:function(e,s){if(e!==r){var a=this.handlers;return _(Nt(e),function(h){s?a[h]&&a[h].splice(nt(a[h],s),1):delete a[h]}),this}},emit:function(e,s){this.options.domEvents&&ns(e,s);var a=this.handlers[e]&&this.handlers[e].slice();if(!(!a||!a.length)){s.type=e,s.preventDefault=function(){s.srcEvent.preventDefault()};for(var h=0;h<a.length;)a[h](s),h++}},destroy:function(){this.element&&Ge(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}};function Ge(e,s){var a=e.element;if(!!a.style){var h;_(e.options.cssProps,function(u,d){h=Ut(a.style,d),s?(e.oldCssProps[h]=a.style[h],a.style[h]=u):a.style[h]=e.oldCssProps[h]||""}),s||(e.oldCssProps={})}}function ns(e,s){var a=i.createEvent("Event");a.initEvent(e,!0,!0),a.gesture=s,s.target.dispatchEvent(a)}w(V,{INPUT_START:P,INPUT_MOVE:J,INPUT_END:E,INPUT_CANCEL:x,STATE_POSSIBLE:Yt,STATE_BEGAN:M,STATE_CHANGED:rt,STATE_ENDED:j,STATE_RECOGNIZED:z,STATE_CANCELLED:Et,STATE_FAILED:R,DIRECTION_NONE:Dt,DIRECTION_LEFT:vt,DIRECTION_RIGHT:ft,DIRECTION_UP:mt,DIRECTION_DOWN:gt,DIRECTION_HORIZONTAL:D,DIRECTION_VERTICAL:Q,DIRECTION_ALL:Ie,Manager:he,Input:N,TouchAction:ne,TouchInput:kt,MouseInput:Ht,PointerEventInput:ee,TouchMouseInput:ie,SingleTouchInput:ke,Recognizer:Y,AttrRecognizer:U,Tap:jt,Pan:Xt,Swipe:le,Pinch:re,Rotate:ae,Press:oe,on:Ot,off:It,each:_,merge:bi,extend:we,assign:w,inherit:O,bindFn:Kt,prefixed:Ut});var rs=typeof t!="undefined"?t:typeof self!="undefined"?self:{};rs.Hammer=V,typeof r=="function"&&r.amd?r(function(){return V}):o.exports?o.exports=V:t[n]=V})(window,document,"Hammer")})($i);var hi=$i.exports;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Is=o=>o.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tt=(o,t)=>{var i,n;const r=o._$AN;if(r===void 0)return!1;for(const l of r)(n=(i=l)._$AO)===null||n===void 0||n.call(i,t,!1),Tt(l,t);return!0},Bt=o=>{let t,i;do{if((t=o._$AM)===void 0)break;i=t._$AN,i.delete(o),o=t}while((i==null?void 0:i.size)===0)},Ti=o=>{for(let t;t=o._$AM;o=t){let i=t._$AN;if(i===void 0)t._$AN=i=new Set;else if(i.has(o))break;i.add(o),Us(t)}};function Ns(o){this._$AN!==void 0?(Bt(this),this._$AM=o,Ti(this)):this._$AM=o}function Ms(o,t=!1,i=0){const n=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(n))for(let l=i;l<n.length;l++)Tt(n[l],!1),Bt(n[l]);else n!=null&&(Tt(n,!1),Bt(n));else Tt(this,o)}const Us=o=>{var t,i,n,r;o.type==Ee.CHILD&&((t=(n=o)._$AP)!==null&&t!==void 0||(n._$AP=Ms),(i=(r=o)._$AQ)!==null&&i!==void 0||(r._$AQ=Ns))};class Ds extends Te{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,n){super._$AT(t,i,n),Ti(this),this.isConnected=t._$AU}_$AO(t,i=!0){var n,r;t!==this.isConnected&&(this.isConnected=t,t?(n=this.reconnected)===null||n===void 0||n.call(this):(r=this.disconnected)===null||r===void 0||r.call(this)),i&&(Tt(this,t),Bt(this))}setValue(t){if(Is(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Rs=()=>new Ls;class Ls{}const me=new WeakMap,Hs=$e(class extends Ds{render(o){return $}update(o,[t]){var i;const n=t!==this.Y;return n&&this.Y!==void 0&&this.rt(void 0),(n||this.lt!==this.dt)&&(this.Y=t,this.ct=(i=o.options)===null||i===void 0?void 0:i.host,this.rt(this.dt=o.element)),$}rt(o){var t;if(typeof this.Y=="function"){const i=(t=this.ct)!==null&&t!==void 0?t:globalThis;let n=me.get(i);n===void 0&&(n=new WeakMap,me.set(i,n)),n.get(this.Y)!==void 0&&this.Y.call(this.ct,void 0),n.set(this.Y,o),o!==void 0&&this.Y.call(this.ct,o)}else this.Y.value=o}get lt(){var o,t,i;return typeof this.Y=="function"?(t=me.get((o=this.ct)!==null&&o!==void 0?o:globalThis))===null||t===void 0?void 0:t.get(this.Y):(i=this.Y)===null||i===void 0?void 0:i.value}disconnected(){this.lt===this.dt&&this.rt(void 0)}reconnected(){this.rt(this.dt)}});var ks=Object.defineProperty,zs=Object.getOwnPropertyDescriptor,xt=(o,t,i,n)=>{for(var r=n>1?void 0:n?zs(t,i):t,l=o.length-1,c;l>=0;l--)(c=o[l])&&(r=(n?c(t,i,r):c(r))||r);return n&&r&&ks(t,i,r),r};const ci=o=>[o.clientX,o.clientY],ui=o=>[o.touches[0].clientX,o.touches[0].clientY];class st extends H{constructor(){super(...arguments),this.active=!1,this.x=0,this.y=0,this.startingPosition={x:0,y:0},this.preventDefault=!1,this.moveStart=(t,i,n)=>{n.defaultPrevented||(this.preventDefault&&n.preventDefault(),this.active=!0,this.startingPosition={x:t-this.x,y:i-this.y},this.requestUpdate())},this.handleMouseDown=this.buildListener(ci,this.moveStart),this.handleTouchStart=this.buildListener(ui,this.moveStart),this.move=(t,i,n)=>{this.active&&!n.defaultPrevented&&(this.preventDefault&&n.preventDefault(),this.x=t-this.startingPosition.x,this.y=i-this.startingPosition.y,this.requestUpdate())},this.handleMouseMove=this.buildListener(ci,this.move),this.handleTouchMove=this.buildListener(ui,this.move),this.end=()=>{this.active=!1,this.requestUpdate()}}buildListener(t,i){return n=>{const[r,l]=t(n);i(r,l,n)}}setupListeners(t){t.addEventListener("mousedown",i=>this.handleMouseDown(i)),t.addEventListener("touchstart",i=>this.handleTouchStart(i)),window.addEventListener("mousemove",this.handleMouseMove),window.addEventListener("touchmove",this.handleTouchMove),window.addEventListener("touchend",this.end),window.addEventListener("mouseup",this.end)}disconnectedCallback(){this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("touchstart",this.handleTouchStart),window.removeEventListener("mousemove",this.handleMouseMove),window.removeEventListener("touchmove",this.handleTouchMove),window.removeEventListener("mouseup",this.end),window.removeEventListener("touchend",this.end)}}xt([I()],st.prototype,"active",2);xt([I()],st.prototype,"x",2);xt([I()],st.prototype,"y",2);xt([I()],st.prototype,"startingPosition",2);xt([I()],st.prototype,"preventDefault",2);var Ys=Object.defineProperty,Vs=Object.getOwnPropertyDescriptor,B=(o,t,i,n)=>{for(var r=n>1?void 0:n?Vs(t,i):t,l=o.length-1,c;l>=0;l--)(c=o[l])&&(r=(n?c(t,i,r):c(r))||r);return n&&r&&Ys(t,i,r),r};class Xs extends Event{constructor(t){super("dragger-change-event",{bubbles:!0,cancelable:!0}),this.detail={x:t}}}const js=({imageSize:[o,t],position:[i,n],zoom:r})=>{let m={transform:`translate(calc(${i}px), calc(${n}px))`};return t>0&&(m.height=`${t*r}px`),o>0&&(m.width=`${o*r}px`),m};class k extends st{constructor(){super(),this.draggerRef=Rs(),this.imageSize=[0,0],this.position=[0,0],this.initialValue=.5,this.zoom=1,this.x=0,this.comparisonx=.5,this.width=0,this.preventDefault=!0}getWidth(){var t;return((t=this.containerEl)==null?void 0:t.getBoundingClientRect().width)||0}isValidImageSize(){const{imageSize:t}=this;return!!t&&t[0]>0&&t[1]>0}firstUpdated(t){this.setupListeners(this.draggerRef.value),this.comparisonx=this.initialValue;const i=this.getWidth();this.x=this.comparisonx*i}updated(t){const{x:i,comparisonx:n}=this;if(t.has("imageSize")&&this.isValidImageSize()){const r=this.getWidth();this.x=this.comparisonx*r}if(t.has("x")){const r=this.getWidth();r>10&&(this.comparisonx=Fs(i,r)/r)}if(t.has("zoom")){const r=this.getWidth();this.x=this.comparisonx*r}t.has("comparisonx")&&n!==t.get("comparisonx")&&this.dispatchEvent(new Xs(this.comparisonx))}render(){const{comparisonx:t,active:i,imageSize:n,draggerRef:r,zoom:l,position:c}=this,m=this.getWidth(),p=t*m,v=m<100;return X`
      <div id="container" style=${Pt(js({imageSize:n,zoom:l,position:c}))}>
        <div
          id="handle"
          ${Hs(r)}
          class=${_i({active:i,small:v})}
          style=${Pt({transform:`translate(${p}px, 0)`})}
        >
          <div class="handle-dot top"></div>
          <div id="handle-bar"></div>
          <div class="handle-dot bottom"></div>
        </div>
      </div>
    `}}k.styles=it`
    #container {
      position: relative;
      z-index: 2;
    }
    #handle {
      margin: 0;
      padding: 0;
      height: 100%;
      position: absolute;
      z-index: 2;
      width: 40px;
      height: 100%;
      position: absolute;
      margin-left: calc(-40px / 2);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: grab;
    }

    #handle:hover #handle-bar,
    #handle.active #handle-bar {
      border: 1px solid #006aa0;
      background: #0284c7;
      width: 4px;
    }

    #handle-bar {
      transition-duration: 0.1s;
      background: white;
      border: 1px solid #043C5E;
      width: 4px;
      height: calc(100% - 10px);
    }

    .handle-dot {
      border: 1px solid #DF3373;
      background:  #FB5895;
      transition-duration: 0.1s;
      border-radius: 50%;
      border: 1px solid #043C5E;
      width: 10px;
      height: 10px;
      background: white;
      position: absolute;
      top: -5px;
      left: 50%;
      margin-left: -6px;
    }

    .handle-dot.bottom {
      top: calc(100% - 5px);
    }

    #handle.small > .handle-dot {
      width: 5px;
      height: 5px;
      top: -2.5px;
      margin-left: -3px;
    }
    #handle.small > .handle-dot.bottom {
      top: calc(100% - 2.5px);
    }

    #handle.small > #handle-bar {
      width: 2px;
      height: calc(100% - 5px);
    }
  `;B([C({type:Object})],k.prototype,"imageSize",2);B([C({type:Object})],k.prototype,"position",2);B([C({type:Number})],k.prototype,"initialValue",2);B([C({type:Number})],k.prototype,"zoom",2);B([I()],k.prototype,"x",2);B([I()],k.prototype,"comparisonx",2);B([I()],k.prototype,"width",2);B([yi("#container")],k.prototype,"containerEl",2);const Fs=(o,t)=>o<0?0:o>t?t:o;customElements.get("image-comparison-viewer-dragger-handle")||customElements.define("image-comparison-viewer-dragger-handle",k);var Ws=Object.defineProperty,qs=Object.getOwnPropertyDescriptor,dt=(o,t,i,n)=>{for(var r=n>1?void 0:n?qs(t,i):t,l=o.length-1,c;l>=0;l--)(c=o[l])&&(r=(n?c(t,i,r):c(r))||r);return n&&r&&Ws(t,i,r),r};class G extends st{constructor(){super(),this.background="striped",this.zoom=1,this.comparisonx=.5,this.handleDrag=({detail:n})=>{this.comparisonx=n.x,this.requestUpdate()},this.setupListeners(this);const t=()=>this.requestUpdate();this.observer=new MutationObserver(n=>{n.forEach(r=>{r.type==="attributes"&&t()})});const i=new hi.Manager(this);i.add(new hi.Pinch({threshold:0})),i.on("pinch",function(n){console.log(n)}),i.on("rotate",function(n){console.log(n)})}getChildNodes(){var t;return((t=this.mainSlot)==null?void 0:t.assignedNodes({flatten:!0}).filter(i=>i.tagName==="IMG"))||[]}handleSlotchange(){const t=()=>this.requestUpdate(),i=this.getChildNodes();i.length>2?console.warn("Only two images are supported"):(this.imageSize=void 0,this.images=i,this.observer.disconnect(),t(),this.images.forEach(n=>{this.observer.observe(n,{attributes:!0})}))}getImageTransform(){const t=this.x/this.zoom,i=this.y/this.zoom;return`scale(${this.zoom}) translate(calc(${t}px), calc(${i}px))`}renderImage(t){if(t){const i=this.getImageTransform(),n=Pt({transform:i});return X`<img style=${n} src="${t.src}" />`}return null}getRect(){var i;let t=this.parentElement;if(t===null&&(t=(i=this.getRootNode())==null?void 0:i.host),t===null)throw new Error("Parent of drag handle is null");return t.getBoundingClientRect()}updated(t){if(t.has("images")){const{images:i}=this,n=(i==null?void 0:i[0])||(i==null?void 0:i[1]);n&&(n.onload=()=>{this&&(this.imageSize=[n.width,n.height])})}}render(){var m,p,v,b;const{imageSize:t,background:i,comparisonx:n,zoom:r,x:l,y:c}=this;return X`
      <slot name="background">
        <image-comparison-viewer-background background=${i}></image-comparison-viewer-background>
      </slot>
      <image-comparison-viewer-images>
        <slot id="slot" @slotchange=${this.handleSlotchange}></slot>
        <div class="center-container">
         ${this.renderImage((m=this.images)==null?void 0:m[0])}
         </div>
         <div class="center-container">
         <image-comparison-viewer-mask comparisonX=${n} width=${(p=this.images)==null?void 0:p[1].width} height=${(v=this.images)==null?void 0:v[1].height} zoom=${r} x=${l} y=${c}>
          <img src="${(b=this.images)==null?void 0:b[1].src}" />
         </image-comparison-viewer-mask>
         </div>
      </image-comparison-viewer-images>
      ${t&&X`
        <div class="center-container">
          <image-comparison-viewer-dragger-handle 
            zoom=${r} 
            initialValue=${n} 
            @dragger-change-event=${this.handleDrag}
            .imageSize=${t}
            .position=${[l,c]}
          >
          </image-comparison-viewer-dragger-handle>
        </div>
      `}
    `}}G.styles=it`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      height: 100%;
      transform-origin: center;
      touch-action: manipulation;
      cursor: grab;
    }
    
    ::slotted(img) {
      display: none;
    }

    img {
      display: block;
      user-drag: none;  
      user-select: none;
      -moz-user-select: none;
      -webkit-user-drag: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }

    .center-container {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #handle-container {
      position: absolute;
      top: 0;
      left: 0;
    }
  `;dt([C()],G.prototype,"background",2);dt([C({type:Number})],G.prototype,"zoom",2);dt([I()],G.prototype,"comparisonx",2);dt([I()],G.prototype,"images",2);dt([I()],G.prototype,"imageSize",2);dt([yi("#slot")],G.prototype,"mainSlot",2);customElements.get("image-comparison-viewer")||customElements.define("image-comparison-viewer",G);var Bs=Object.defineProperty,Gs=Object.getOwnPropertyDescriptor,Ai=(o,t,i,n)=>{for(var r=n>1?void 0:n?Gs(t,i):t,l=o.length-1,c;l>=0;l--)(c=o[l])&&(r=(n?c(t,i,r):c(r))||r);return n&&r&&Bs(t,i,r),r};class Zs extends Event{constructor(t,i){super("filter-change-event",{bubbles:!0,cancelable:!0}),this.detail={name:t,value:i}}}let Gt=class extends H{constructor(){super(...arguments),this.values={},this.handleChange=o=>{const t=o.target;this.dispatchEvent(new Zs(t.name,t.value))}}render(){const{values:o,handleChange:t}=this;return X`
      <div>
        <label>Zoom</label>
        <input type="range" min="0.1" max="4" step="0.01" name="zoom" value="${o.zoom}" @input=${t} />
      </div>
      <div>
        <label>Background</label>
        <select @change=${t} name="background" value=${o.background}>
        <option>striped</option>
        <option>checkered</option>
        </select>
      </div>
    `}};Gt.styles=it`
    :host {
      display: flex;
    }
  `;Ai([C({type:Object})],Gt.prototype,"values",2);Gt=Ai([gi("image-comparison-viewer-filters")],Gt);var Ks=Object.defineProperty,Js=Object.getOwnPropertyDescriptor,be=(o,t,i,n)=>{for(var r=n>1?void 0:n?Js(t,i):t,l=o.length-1,c;l>=0;l--)(c=o[l])&&(r=(n?c(t,i,r):c(r))||r);return n&&r&&Ks(t,i,r),r};let St=class extends H{constructor(){super(...arguments),this.values={background:"striped",zoom:1},this.handleChange=({detail:o})=>{this.values[o.name]=o.value,this.requestUpdate()},this.imageKind="jellyfish",this.switch=()=>{this.imageKind=this.imageKind==="jellyfish"?"dog":"jellyfish"}}render(){const{imageKind:o,handleChange:t,values:i}=this;return X`
      <div id="container">
        <image-comparison-viewer zoom=${i.zoom} background="${i.background}">
          <img src="./assets/${o}-a.jpg" />
          <img src="./assets/${o}-b.jpg" />
        </image-comparison-viewer>
      </div id="container">
      <image-comparison-viewer-filters @filter-change-event=${t} .values=${i}></image-comparison-viewer-filters>
      <hr />
      Showing ${o} as the image. <br />
      <button @click=${this.switch}>Switch the image to ${o==="jellyfish"?"dog":"jellyfish"}</button>
    `}};St.styles=it`
    :host {
    }

    #container {
      height: 500px; 
      border: 1px solid rgba(0,0,0,0.2);
    }

    #filters {
      display: flex;
    }
  `;be([I()],St.prototype,"values",2);be([I()],St.prototype,"imageKind",2);St=be([gi("image-comparison-viewer-app")],St);
