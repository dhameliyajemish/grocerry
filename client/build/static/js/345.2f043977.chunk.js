"use strict";(globalThis.webpackChunkgrocerapp=globalThis.webpackChunkgrocerapp||[]).push([[345],{817(e,t,r){r.d(t,{GE:()=>c,Gb:()=>d,XD:()=>i,bV:()=>l,iY:()=>n,lB:()=>o,xm:()=>p});var a=r(2721),s=r(1191);const o=(e,t)=>async r=>{try{const t=await a.lB().then(e=>e.data);e(t)}catch(o){var s;console.error("Fetch Order History error:",o),t&&t((null===(s=o.response)||void 0===s?void 0:s.data)||o)}},i=(e,t,r)=>async o=>{try{const r=await a.XD(e).then(e=>e.data);o({type:s.M,data:r}),t(r)}catch(n){var i;console.error("Fetch Order error:",n),r&&r((null===(i=n.response)||void 0===i?void 0:i.data)||n)}},n=(e,t,r,s)=>async()=>{try{await a.iY(e,t),r()}catch(i){var o;console.error("Update Order error:",i),s&&s((null===(o=i.response)||void 0===o?void 0:o.data)||i)}},d=(e,t,r)=>async o=>{try{const r=await a.Gb(e).then(e=>e.data);o({type:s.t,data:r}),t()}catch(n){var i;console.error("Fetch Orders error:",n),r&&r((null===(i=n.response)||void 0===i?void 0:i.data)||n)}},l=(e,t,r,s)=>async()=>{try{const s=await a.wh(e,t).then(e=>e.data);r(s)}catch(i){var o;if(console.error("Post Order error:",i),i.response&&(401===i.response.status||403===i.response.status))return localStorage.clear(),void(window.location.href="/login?error=session_expired");s&&s((null===(o=i.response)||void 0===o?void 0:o.data)||i)}},c=(e,t,r)=>async()=>{try{const{order_id:r}=await a.GE(e).then(e=>e.data);t(r)}catch(o){var s;console.error("Verify Razorpay error:",o),r&&r((null===(s=o.response)||void 0===s?void 0:s.data)||o)}},p=(e,t,r,s)=>async()=>{try{const{order_id:s}=await a.ZN(e,t).then(e=>e.data);r(s)}catch(i){var o;if(console.error("Post Order COD error:",i),i.response&&(401===i.response.status||403===i.response.status))return localStorage.clear(),void(window.location.href="/login?error=session_expired");s&&s((null===(o=i.response)||void 0===o?void 0:o.data)||i)}}},8952(e,t,r){r.d(t,{CH:()=>o,Z4:()=>i,cS:()=>n});var a=r(2721),s=r(1562);const o=(e,t,r)=>async o=>{try{const r=await a.CH(e).then(e=>e.data);o({type:s.a,data:r}),t()}catch(n){var i;console.error("Fetch Shipments error:",n),r&&r((null===(i=n.response)||void 0===i?void 0:i.data)||n)}},i=(e,t,r)=>async o=>{try{const r=await a.Z4(e).then(e=>e.data);o({type:s.k,data:r}),t(r)}catch(d){var i,n;const e=(null===(i=d.response)||void 0===i||null===(n=i.data)||void 0===n?void 0:n.message)||d.message||"Failed to fetch shipment details";r({message:e})}},n=(e,t,r,s)=>async()=>{try{await a.cS(e,t),r()}catch(n){var o,i;const e=(null===(o=n.response)||void 0===o||null===(i=o.data)||void 0===i?void 0:i.message)||n.message||"Failed to update shipment";s({message:e})}}},7520(e,t,r){r.r(t),r.d(t,{default:()=>k});const a="shipmentId_wrapper__LuQ4o",s="shipmentId_sub__n1uw7",o="shipmentId_full-progress__gfUx5",i="shipmentId_progress__LAfme",n="shipmentId_img__+6uWi",d="shipmentId_status__EsK8V",l="shipmentId_review-container__NowHV",c="shipmentId_review-card__1fVjo",p="shipmentId_review-header__8brxu",u="shipmentId_review-img__l-isY",m="shipmentId_review-title__s0C8J",h="shipmentId_stars-container__1I3BS",v="shipmentId_star__u52Gt",f="shipmentId_star-active__Jiese",g="shipmentId_review-textarea__5V1PN",y="shipmentId_submit-review-btn__Qr+Im",x="shipmentId_reviewed-state__nZec9",b="shipmentId_reviewed-badge__dAZd6";var _=r(9643),w=r(7192),E=r(5880),j=r(4807),D=r(8952);const C=r.p+"static/media/delivery.16892d23912d51cf8e30.png";var I=r(2721),N=r(817),R=r(514),S=r(6507);const k=()=>{const{id:e}=(0,w.g)(),t=(0,E.d4)(e=>e.shipping.fetched),r=(0,E.d4)(e=>e.orders.fetched),k=(0,E.wA)(),[O,$]=(0,_.useState)(!0),L=(0,w.Zp)(),[A,F]=(0,_.useState)([]),[T,Y]=(0,_.useState)({}),[P,V]=(0,_.useState)({}),[z,U]=(0,_.useState)({});(0,_.useEffect)(()=>{const r=()=>{$(!1)};t&&t.order_id===e?r():k((0,D.Z4)(e,r,e=>{$(!1),L("/404")}))},[k,e,L,t]),(0,_.useEffect)(()=>{"DELIVERED"===(null===t||void 0===t?void 0:t.status)&&(k((0,N.XD)(t.order_id,()=>{},()=>{})),(0,I.gY)(t.order_id).then(e=>{let{data:t}=e;return F(t.map(e=>e.product_id))}).catch(e=>console.error("Failed to fetch reviews:",e)))},[t,k]);if(O)return(0,S.jsx)(j.A,{});const G={CREATED:"Your order has been Created.",PROCESSING:"Your order is being Processed.",PACKED:"Your order has been Packed.",OUT_FOR_DELIVERY:"Your order is Out for Delivery.",DELIVERED:"Your order has been Delivered.",RETURNED:"Your order has been Returned.",CANCELLED:"Your order has been Cancelled."}[null===t||void 0===t?void 0:t.status]||"Order status unavailable";return(0,S.jsxs)("div",{className:a,children:[(0,S.jsx)("div",{className:"heading",children:(0,S.jsx)("h1",{children:"Track Shipping"})}),(0,S.jsxs)("div",{className:s,children:["Order ",(0,S.jsxs)("span",{children:["#",null===t||void 0===t?void 0:t.order_id]})]}),(0,S.jsx)("div",{className:o,children:(0,S.jsx)("div",{className:i,style:{width:(()=>{switch(null===t||void 0===t?void 0:t.status){case"CREATED":return 20;case"PROCESSING":return 40;case"PACKED":return 60;case"OUT_FOR_DELIVERY":return 85;case"DELIVERED":case"CANCELLED":return 100;default:return 5}})()+"%",background:"CANCELLED"===(null===t||void 0===t?void 0:t.status)?"linear-gradient(90deg, #ef4444, #dc2626)":void 0},children:"CANCELLED"!==(null===t||void 0===t?void 0:t.status)&&(0,S.jsx)("img",{className:n,style:{transform:"RETURNED"===(null===t||void 0===t?void 0:t.status)?"scaleX(-1)":""},src:C,alt:"Delivery"})})}),(0,S.jsx)("div",{className:d,children:(0,S.jsxs)("p",{children:[(0,S.jsx)("strong",{children:"Delivery Update:"})," ","CANCELLED"===(null===t||void 0===t?void 0:t.status)?(0,S.jsx)("span",{style:{color:"#dc2626",fontWeight:"bold"},children:"\u274c Order Cancelled"}):G]})}),"DELIVERED"===(null===t||void 0===t?void 0:t.status)&&r&&r.products&&(0,S.jsxs)("div",{className:l,children:[(0,S.jsx)("h2",{style:{fontSize:"1.3rem",color:"#333"},children:"\u2b50 Rate Your Experience"}),r.products.map(e=>{const r=e.product_id||e.id,a=A.includes(r),s=T[r]||0;return(0,S.jsxs)("div",{className:c,children:[(0,S.jsxs)("div",{className:p,children:[(0,S.jsx)("img",{src:e.image,alt:e.name,className:u}),(0,S.jsx)("div",{className:m,children:e.name})]}),a?(0,S.jsxs)("div",{className:x,children:[(0,S.jsx)("div",{style:{color:"#FF9900",fontSize:"24px"},children:"\u2b50\u2b50\u2b50\u2b50\u2b50"}),(0,S.jsx)("div",{style:{fontStyle:"italic",color:"#666"},children:"Thanks for your feedback!"}),(0,S.jsx)("span",{className:b,children:"\u2705 Reviewed"})]}):(0,S.jsxs)("form",{onSubmit:r=>(async(e,r)=>{e.preventDefault();const a=r.product_id||r.id,s=T[a]||0,o=P[a]||"";if(0===s)return R.oR.error("Please select a rating.");U(e=>({...e,[a]:!0}));try{await(0,I.h6)({order_id:t.order_id,product_id:a,rating:s,comment:o}),R.oR.success("Review submitted successfully!"),F(e=>[...e,a])}catch(d){var i,n;R.oR.error((null===d||void 0===d||null===(i=d.response)||void 0===i||null===(n=i.data)||void 0===n?void 0:n.message)||"Failed to submit review")}finally{U(e=>({...e,[a]:!1}))}})(r,e),style:{display:"flex",flexDirection:"column",gap:"10px"},children:[(0,S.jsx)("div",{className:h,children:[1,2,3,4,5].map(e=>(0,S.jsx)("span",{className:`${v} ${e<=s?f:""}`,onClick:()=>Y(t=>({...t,[r]:e})),children:"\u2605"},e))}),(0,S.jsx)("textarea",{className:g,placeholder:"Write your review here...",value:P[r]||"",onChange:e=>V(t=>({...t,[r]:e.target.value})),maxLength:500}),(0,S.jsx)("button",{type:"submit",className:y,disabled:z[r],children:z[r]?"Submitting...":"Submit Review"})]})]},r)})]}),(0,S.jsx)("div",{style:{marginTop:"30px",display:"flex",gap:"10px",justifyContent:"center"},children:(0,S.jsxs)("button",{onClick:()=>{const e={CREATED:"created!",PROCESSING:"processing...",PACKED:"packed!",OUT_FOR_DELIVERY:"out for delivery!",DELIVERED:"delivered! \u2705",RETURNED:"returned.",CANCELLED:"cancelled."}[null===t||void 0===t?void 0:t.status]||(null===t||void 0===t?void 0:t.status),r=`${`Hello! Greetings from Grocerry. \n\nMy Order ID is: #${null===t||void 0===t?void 0:t.order_id}\nOrder Status: ${e}`}\n\nTrack your order here: ${`${window.location.origin}/shipping/${null===t||void 0===t?void 0:t.order_id}`}`,a=null!==t&&void 0!==t&&t.phone_number?t.phone_number.replace(/\D/g,""):"",s=a?`https://wa.me/${a}/?text=${encodeURIComponent(r)}`:`https://wa.me/?text=${encodeURIComponent(r)}`;window.open(s,"_blank")},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 20px",backgroundColor:"#25D366",color:"white",border:"none",borderRadius:"5px",cursor:"pointer",fontSize:"14px"},children:[(0,S.jsx)("span",{children:"\ud83d\udcf1"})," Share on WhatsApp"]})})]})}},514(e,t,r){r.d(t,{oR:()=>k});var a=r(9643);let s={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||s},i=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,l=(e,t)=>{let r="",a="",s="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+i+";":a+="f"==o[1]?l(i,o):o+"{"+l(i,"k"==o[1]?"":t)+"}":"object"==typeof i?a+=l(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o="-"==o[1]?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=l.p?l.p(o,i):o+":"+i+";")}return r+(t&&s?t+"{"+s+"}":s)+a},c={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e},u=(e,t,r,a,s)=>{let o=p(e),u=c[o]||(c[o]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(o));if(!c[u]){let t=o!==e?e:(e=>{let t,r,a=[{}];for(;t=i.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(d," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(d," ").trim();return a[0]})(e);c[u]=l(s?{["@keyframes "+u]:t}:t,r?"":"."+u)}let m=r&&c.g;return r&&(c.g=c[u]),((e,t,r,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(c[u],t,a,m),u};function m(e){let t=this||{},r=e.call?e(t.p):e;return u(r.unshift?r.raw?((e,t,r)=>e.reduce((e,a,s)=>{let o=t[s];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":l(e,""):!1===e?"":e}return e+a+(null==o?"":o)},""))(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,o(t.target),t.g,t.o,t.k)}m.bind({g:1});let h,v,f,g=m.bind({k:1});function y(e,t){let r=this||{};return function(){let a=arguments;function s(o,i){let n=Object.assign({},o),d=n.className||s.className;r.p=Object.assign({theme:v&&v()},n),r.o=/go\d/.test(d),n.className=m.apply(r,a)+(d?" "+d:""),t&&(n.ref=i);let l=e;return e[0]&&(l=n.as||e,delete n.as),f&&l[0]&&f(n),h(l,n)}return t?t(s):s}}var x=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,b=(()=>{let e=0;return()=>(++e).toString()})(),_=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),w="default",E=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return E(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},j=[],D={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},I=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:w;C[t]=E(C[t]||D,e),j.forEach(e=>{let[r,a]=e;r===t&&a(C[t])})},N=e=>Object.keys(C).forEach(t=>I(e,t)),R=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w;return t=>{I(t,e)}},S=e=>(t,r)=>{let a=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"blank",r=arguments.length>2?arguments[2]:void 0;return{createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||b()}}(t,e,r);return R(a.toasterId||(e=>Object.keys(C).find(t=>C[t].toasts.some(t=>t.id===e)))(a.id))({type:2,toast:a}),a.id},k=(e,t)=>S("blank")(e,t);k.error=S("error"),k.success=S("success"),k.loading=S("loading"),k.custom=S("custom"),k.dismiss=(e,t)=>{let r={type:3,toastId:e};t?R(t)(r):N(r)},k.dismissAll=e=>k.dismiss(void 0,e),k.remove=(e,t)=>{let r={type:4,toastId:e};t?R(t)(r):N(r)},k.removeAll=e=>k.remove(void 0,e),k.promise=(e,t,r)=>{let a=k.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?x(t.success,e):void 0;return s?k.success(s,{id:a,...r,...null==r?void 0:r.success}):k.dismiss(a),e}).catch(e=>{let s=t.error?x(t.error,e):void 0;s?k.error(s,{id:a,...r,...null==r?void 0:r.error}):k.dismiss(a)}),e};var O=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,$=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,L=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,A=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${O} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${$} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,F=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,T=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${F} 1s linear infinite;
`,Y=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,P=g`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,V=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Y} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${P} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,z=y("div")`
  position: absolute;
`,U=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,G=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Z=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${G} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,H=e=>{let{toast:t}=e,{icon:r,type:s,iconTheme:o}=t;return void 0!==r?"string"==typeof r?a.createElement(Z,null,r):r:"blank"===s?null:a.createElement(U,null,a.createElement(T,{...o}),"loading"!==s&&a.createElement(z,null,"error"===s?a.createElement(A,{...o}):a.createElement(V,{...o})))},K=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,M=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,W=y("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,X=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;a.memo(e=>{let{toast:t,position:r,style:s,children:o}=e,i=t.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=_()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[K(r),M(r)];return{animation:t?`${g(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(t.position||r||"top-center",t.visible):{opacity:0},n=a.createElement(H,{toast:t}),d=a.createElement(X,{...t.ariaProps},x(t.message,t));return a.createElement(W,{className:t.className,style:{...i,...s,...t.style}},"function"==typeof o?o({icon:n,message:d}):a.createElement(a.Fragment,null,n,d))});!function(e,t,r,a){l.p=t,h=e,v=r,f=a}(a.createElement);m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`}}]);
//# sourceMappingURL=345.2f043977.chunk.js.map