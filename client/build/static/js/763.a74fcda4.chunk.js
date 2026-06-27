"use strict";(globalThis.webpackChunkgrocerapp=globalThis.webpackChunkgrocerapp||[]).push([[763],{817(e,t,r){r.d(t,{GE:()=>c,Gb:()=>d,XD:()=>i,bV:()=>l,iY:()=>n,lB:()=>s,xm:()=>p});var a=r(2721),o=r(1191);const s=(e,t)=>async r=>{try{const t=await a.lB().then(e=>e.data);e(t)}catch(s){var o;console.error("Fetch Order History error:",s),t&&t((null===(o=s.response)||void 0===o?void 0:o.data)||s)}},i=(e,t,r)=>async s=>{try{const r=await a.XD(e).then(e=>e.data);s({type:o.M,data:r}),t(r)}catch(n){var i;console.error("Fetch Order error:",n),r&&r((null===(i=n.response)||void 0===i?void 0:i.data)||n)}},n=(e,t,r,o)=>async()=>{try{await a.iY(e,t),r()}catch(i){var s;console.error("Update Order error:",i),o&&o((null===(s=i.response)||void 0===s?void 0:s.data)||i)}},d=(e,t,r)=>async s=>{try{const r=await a.Gb(e).then(e=>e.data);s({type:o.t,data:r}),t()}catch(n){var i;console.error("Fetch Orders error:",n),r&&r((null===(i=n.response)||void 0===i?void 0:i.data)||n)}},l=(e,t,r,o)=>async()=>{try{const o=await a.wh(e,t).then(e=>e.data);r(o)}catch(i){var s;if(console.error("Post Order error:",i),i.response&&(401===i.response.status||403===i.response.status))return localStorage.clear(),void(window.location.href="/login?error=session_expired");o&&o((null===(s=i.response)||void 0===s?void 0:s.data)||i)}},c=(e,t,r)=>async()=>{try{const{order_id:r}=await a.GE(e).then(e=>e.data);t(r)}catch(s){var o;console.error("Verify Razorpay error:",s),r&&r((null===(o=s.response)||void 0===o?void 0:o.data)||s)}},p=(e,t,r,o)=>async()=>{try{const{order_id:o}=await a.ZN(e,t).then(e=>e.data);r(o)}catch(i){var s;if(console.error("Post Order COD error:",i),i.response&&(401===i.response.status||403===i.response.status))return localStorage.clear(),void(window.location.href="/login?error=session_expired");o&&o((null===(s=i.response)||void 0===s?void 0:s.data)||i)}}},1763(e,t,r){r.r(t),r.d(t,{default:()=>M});var a=r(9643),o=r(5880),s=r(817);const i={wrapper:"order_wrapper__Eu1p4"};var n=r(5931),d=r(2721),l=r(514);const c="reviewModal_modal-overlay__KARzr",p="reviewModal_modal-content__GAUdY",u="reviewModal_close-btn__b0oEb",m="reviewModal_modal-title__7L4-I",h="reviewModal_product-list__eNaTE",f="reviewModal_product-item__7kkC4",g="reviewModal_product-image__EcBWr",v="reviewModal_product-info__LRBHI",x="reviewModal_product-name__gXXjw",y="reviewModal_review-action__RgLiS",b="reviewModal_reviewed-badge__sV4nR",w="reviewModal_rate-btn__8Y6oc",_="reviewModal_review-form__rY6BL",j="reviewModal_stars__18xiy",N="reviewModal_star__KRi2m",k="reviewModal_active__-P8Ms",C="reviewModal_comment-input__pxRa5",S="reviewModal_submit-btn__lwgaj",E="reviewModal_cancel-btn__+neoo";var $=r(6507);const R=e=>{let{order:t,onClose:r}=e;const[o,s]=(0,a.useState)([]),[i,n]=(0,a.useState)(!0),[R,M]=(0,a.useState)(null),[O,D]=(0,a.useState)(0),[A,z]=(0,a.useState)(""),[L,F]=(0,a.useState)(!1);(0,a.useEffect)(()=>{(async()=>{try{const{data:e}=await(0,d.gY)(t.order_id);s(e.map(e=>e.product_id))}catch(e){console.error("Failed to load reviews:",e)}finally{n(!1)}})()},[t]);const I=async e=>{if(e.preventDefault(),0===O)return l.oR.error("Please select a rating.");F(!0);try{await(0,d.h6)({order_id:t.order_id,product_id:R.product_id||R.id,rating:O,comment:A}),l.oR.success("Review submitted successfully!"),s([...o,R.product_id||R.id]),M(null),D(0),z("")}catch(i){var r,a;l.oR.error((null===i||void 0===i||null===(r=i.response)||void 0===r||null===(a=r.data)||void 0===a?void 0:a.message)||"Failed to submit review")}finally{F(!1)}};return(0,$.jsx)("div",{className:c,onClick:r,children:(0,$.jsxs)("div",{className:p,onClick:e=>e.stopPropagation(),children:[(0,$.jsx)("button",{className:u,onClick:r,children:"\xd7"}),(0,$.jsxs)("h2",{className:m,children:["Review Order #",t.order_id]}),i?(0,$.jsx)("p",{children:"Loading products..."}):(0,$.jsx)("div",{className:h,children:t.products.map(e=>{const t=e.product_id||e.id,r=o.includes(t),a=R&&(R.product_id||R.id)===t;return(0,$.jsxs)("div",{className:f,children:[(0,$.jsx)("img",{src:e.image,alt:e.name,className:g}),(0,$.jsxs)("div",{className:v,children:[(0,$.jsx)("div",{className:x,children:e.name}),!a&&(0,$.jsx)("div",{className:y,children:r?(0,$.jsx)("span",{className:b,children:"\u2705 Reviewed"}):(0,$.jsx)("button",{className:w,onClick:()=>{M(e),D(0),z("")},children:"\u2b50 Write Review"})}),a&&(0,$.jsxs)("form",{className:_,onSubmit:I,children:[(0,$.jsx)("div",{className:j,children:[1,2,3,4,5].map(e=>(0,$.jsx)("span",{className:`${N} ${e<=O?k:""}`,onClick:()=>D(e),children:"\u2605"},e))}),(0,$.jsx)("textarea",{className:C,placeholder:"Write your experience with this product...",value:A,onChange:e=>z(e.target.value),maxLength:500}),(0,$.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,$.jsx)("button",{type:"submit",className:S,disabled:L,children:L?"Submitting...":"Submit"}),(0,$.jsx)("button",{type:"button",className:E,onClick:()=>M(null),children:"Cancel"})]})]})]})]},t)})})]})})},M=()=>{const e=(0,o.wA)(),[t,r]=(0,a.useState)([]),[c,p]=(0,a.useState)(!0),[u,m]=(0,a.useState)(null),h=(0,a.useCallback)(()=>{p(!0),e((0,s.lB)(e=>{r(e),p(!1)},e=>{console.log(e),p(!1)}))},[e]);(0,a.useEffect)(()=>{h()},[h]);return c?(0,$.jsx)("div",{className:i.wrapper,children:"Loading..."}):(0,$.jsxs)("div",{className:i.wrapper,children:[(0,$.jsx)("div",{className:"heading-wrapper",children:(0,$.jsx)("h1",{className:"heading",children:"Your Orders"})}),0===t.length?(0,$.jsx)("div",{children:"No orders found."}):(0,$.jsx)("div",{className:i.ordersList,children:t.map(e=>(0,$.jsxs)("div",{className:i.orderCard,style:{border:"1px solid #ddd",padding:"15px",marginBottom:"15px",borderRadius:"8px"},children:[(0,$.jsxs)("div",{className:i.orderHeader,style:{display:"flex",justifyContent:"space-between",marginBottom:"10px"},children:[(0,$.jsxs)("span",{children:[(0,$.jsx)("strong",{children:"Order ID:"})," ",e.order_id]}),(0,$.jsxs)("span",{children:[(0,$.jsx)("strong",{children:"Status:"})," ",e.status]}),(0,$.jsxs)("span",{children:[(0,$.jsx)("strong",{children:"Date:"})," ",new Date(e.ordered_at).toLocaleDateString()]})]}),(0,$.jsx)("div",{style:{marginBottom:"10px"},children:(0,$.jsxs)("span",{children:[(0,$.jsx)("strong",{children:"Payment Method:"})," ",e.payment_method]})}),(0,$.jsxs)("div",{className:i.orderTotal,style:{marginBottom:"10px",fontSize:"1.1em",fontWeight:"bold"},children:["Total: ",e.total," \u20b9"]}),(0,$.jsxs)("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap"},children:[(0,$.jsx)(n.N_,{to:`/orders/${e.order_id}`,className:"btn1",children:"View Details"}),(0,$.jsx)(n.N_,{to:`/shipping/${e.order_id}`,className:"btn2",children:"Track Shipment"}),(0,$.jsx)("button",{onClick:()=>{const t=`\ud83d\udce6 Order #${e.order_id}\nTotal: \u20b9${e.total}\nStatus: ${e.status}\n\nTrack: ${window.location.origin}/shipping/${e.order_id}`;window.open(`https://wa.me/?text=${encodeURIComponent(t)}`,"_blank")},style:{backgroundColor:"#25D366",color:"white",border:"none",padding:"8px 12px",borderRadius:"5px",cursor:"pointer",fontSize:"12px"},children:"\ud83d\udcf1 Share"}),"DELIVERED"===e.status&&(0,$.jsx)("button",{onClick:()=>m(e),style:{backgroundColor:"#FF9900",color:"white",border:"none",padding:"8px 12px",borderRadius:"5px",cursor:"pointer",fontSize:"12px",fontWeight:"bold"},children:"\u2b50 Write Review"}),("CREATED"===e.status||"PROCESSING"===e.status||"PACKED"===e.status)&&(0,$.jsx)("button",{onClick:()=>(async e=>{if(window.confirm("Are you sure you want to cancel this order?"))try{await(0,d.mJ)(e),l.oR.success("Order Cancelled Successfully"),h()}catch(a){var t,r;l.oR.error((null===a||void 0===a||null===(t=a.response)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.message)||"Failed to cancel order")}})(e.order_id),style:{backgroundColor:"#ef4444",color:"white",border:"none",padding:"8px 12px",borderRadius:"5px",cursor:"pointer",fontSize:"12px"},children:"Cancel Order"})]})]},e.order_id))}),u&&(0,$.jsx)(R,{order:u,onClose:()=>m(null)})]})}},514(e,t,r){r.d(t,{oR:()=>M});var a=r(9643);let o={data:""},s=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o},i=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,l=(e,t)=>{let r="",a="",o="";for(let s in e){let i=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+i+";":a+="f"==s[1]?l(i,s):s+"{"+l(i,"k"==s[1]?"":t)+"}":"object"==typeof i?a+=l(i,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=i&&(s="-"==s[1]?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=l.p?l.p(s,i):s+":"+i+";")}return r+(t&&o?t+"{"+o+"}":o)+a},c={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e},u=(e,t,r,a,o)=>{let s=p(e),u=c[s]||(c[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!c[u]){let t=s!==e?e:(e=>{let t,r,a=[{}];for(;t=i.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(d," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(d," ").trim();return a[0]})(e);c[u]=l(o?{["@keyframes "+u]:t}:t,r?"":"."+u)}let m=r&&c.g;return r&&(c.g=c[u]),((e,t,r,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(c[u],t,a,m),u};function m(e){let t=this||{},r=e.call?e(t.p):e;return u(r.unshift?r.raw?((e,t,r)=>e.reduce((e,a,o)=>{let s=t[o];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":l(e,""):!1===e?"":e}return e+a+(null==s?"":s)},""))(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,s(t.target),t.g,t.o,t.k)}m.bind({g:1});let h,f,g,v=m.bind({k:1});function x(e,t){let r=this||{};return function(){let a=arguments;function o(s,i){let n=Object.assign({},s),d=n.className||o.className;r.p=Object.assign({theme:f&&f()},n),r.o=/go\d/.test(d),n.className=m.apply(r,a)+(d?" "+d:""),t&&(n.ref=i);let l=e;return e[0]&&(l=n.as||e,delete n.as),g&&l[0]&&g(n),h(l,n)}return t?t(o):o}}var y=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,b=(()=>{let e=0;return()=>(++e).toString()})(),w=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),_="default",j=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return j(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},N=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},S=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:_;C[t]=j(C[t]||k,e),N.forEach(e=>{let[r,a]=e;r===t&&a(C[t])})},E=e=>Object.keys(C).forEach(t=>S(e,t)),$=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_;return t=>{S(t,e)}},R=e=>(t,r)=>{let a=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"blank",r=arguments.length>2?arguments[2]:void 0;return{createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||b()}}(t,e,r);return $(a.toasterId||(e=>Object.keys(C).find(t=>C[t].toasts.some(t=>t.id===e)))(a.id))({type:2,toast:a}),a.id},M=(e,t)=>R("blank")(e,t);M.error=R("error"),M.success=R("success"),M.loading=R("loading"),M.custom=R("custom"),M.dismiss=(e,t)=>{let r={type:3,toastId:e};t?$(t)(r):E(r)},M.dismissAll=e=>M.dismiss(void 0,e),M.remove=(e,t)=>{let r={type:4,toastId:e};t?$(t)(r):E(r)},M.removeAll=e=>M.remove(void 0,e),M.promise=(e,t,r)=>{let a=M.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?y(t.success,e):void 0;return o?M.success(o,{id:a,...r,...null==r?void 0:r.success}):M.dismiss(a),e}).catch(e=>{let o=t.error?y(t.error,e):void 0;o?M.error(o,{id:a,...r,...null==r?void 0:r.error}):M.dismiss(a)}),e};var O=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,A=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,z=x("div")`
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
    animation: ${D} 0.15s ease-out forwards;
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
    animation: ${A} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,L=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,F=x("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${L} 1s linear infinite;
`,I=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,T=v`
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
}`,B=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${T} 0.2s ease-out forwards;
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
`,P=x("div")`
  position: absolute;
`,W=x("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Y=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=x("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Y} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,V=e=>{let{toast:t}=e,{icon:r,type:o,iconTheme:s}=t;return void 0!==r?"string"==typeof r?a.createElement(G,null,r):r:"blank"===o?null:a.createElement(W,null,a.createElement(F,{...s}),"loading"!==o&&a.createElement(P,null,"error"===o?a.createElement(z,{...s}):a.createElement(B,{...s})))},H=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,X=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,K=x("div")`
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
`,U=x("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;a.memo(e=>{let{toast:t,position:r,style:o,children:s}=e,i=t.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,o]=w()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[H(r),X(r)];return{animation:t?`${v(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(t.position||r||"top-center",t.visible):{opacity:0},n=a.createElement(V,{toast:t}),d=a.createElement(U,{...t.ariaProps},y(t.message,t));return a.createElement(K,{className:t.className,style:{...i,...o,...t.style}},"function"==typeof s?s({icon:n,message:d}):a.createElement(a.Fragment,null,n,d))});!function(e,t,r,a){l.p=t,h=e,f=r,g=a}(a.createElement);m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`}}]);
//# sourceMappingURL=763.a74fcda4.chunk.js.map